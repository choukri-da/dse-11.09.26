"use server";

import { APIError } from "better-auth/api";
import { eq } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/lib/db";
import { guest, type Guest } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import {
  cookieAttributes,
  GUEST_SESSION_COOKIE,
  guestCookieOptions,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth/cookies";
import {
  signInSchema,
  signUpSchema,
  type AuthActionState,
} from "@/lib/auth/validation";

function parseFormData<T extends z.ZodType>(
  schema: T,
  formData: FormData,
): { success: true; data: z.infer<T> } | { success: false; fieldErrors: Record<string, string[]> } {
  const result = schema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success) {
    return { success: true, data: result.data };
  }

  const fieldErrors = Object.entries(result.error.flatten().fieldErrors).reduce<
    Record<string, string[]>
  >((errors, [field, messages]) => {
    if (Array.isArray(messages)) {
      errors[field] = messages.map(String);
    }
    return errors;
  }, {});

  return {
    success: false,
    fieldErrors,
  };
}

export async function signUp(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = parseFormData(signUpSchema, formData);

  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const { name, email, password, redirectTo } = parsed.data;
  let response: Awaited<ReturnType<typeof auth.api.signUpEmail>>;

  try {
    response = await auth.api.signUpEmail({
      body: { name, email, password },
      headers: await headers(),
    });
  } catch (error) {
    if (error instanceof APIError) {
      return { ok: false, error: error.message };
    }

    return { ok: false, error: "Unable to create account" };
  }

  await mergeGuestCartWithUserCart(response.user.id);
  redirect(redirectTo ?? "/");
}

export async function signIn(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = parseFormData(signInSchema, formData);

  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const { email, password, redirectTo } = parsed.data;
  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    });
  } catch (error) {
    if (error instanceof APIError) {
      if (error.statusCode === 401 || error.statusCode === 403) {
        return { ok: false, error: "Invalid email or password." };
      }

      return { ok: false, error: error.message };
    }

    return { ok: false, error: "Invalid email or password." };
  }

  redirect(redirectTo ?? "/");
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/");
}

export async function guestSession(): Promise<Guest | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(GUEST_SESSION_COOKIE)?.value;

  if (!sessionToken) {
    return null;
  }

  const [session] = await db
    .select()
    .from(guest)
    .where(eq(guest.sessionToken, sessionToken))
    .limit(1);

  if (!session || session.expiresAt <= new Date()) {
    if (session) {
      await db.delete(guest).where(eq(guest.id, session.id));
    }
    return null;
  }

  return session;
}

export async function createGuestSession(): Promise<{ sessionToken: string }> {
  const existingSession = await guestSession();

  if (existingSession) {
    return { sessionToken: existingSession.sessionToken };
  }

  const sessionToken = crypto.randomUUID();
  await db.insert(guest).values({
    sessionToken,
    expiresAt: new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000),
  });

  const cookieStore = await cookies();
  cookieStore.set(GUEST_SESSION_COOKIE, sessionToken, guestCookieOptions);

  return { sessionToken };
}

export async function mergeGuestCartWithUserCart(
  userId: string,
): Promise<{ merged: boolean }> {
  const parsedUserId = z.string().uuid().safeParse(userId);

  if (!parsedUserId.success) {
    throw new Error("Invalid user ID");
  }

  const session = await guestSession();

  if (!session) {
    return { merged: false };
  }

  // Reassign guest-owned cart and order records here once those tables exist.
  await db.delete(guest).where(eq(guest.id, session.id));
  const cookieStore = await cookies();
  cookieStore.set(GUEST_SESSION_COOKIE, "", { ...cookieAttributes, maxAge: 0 });

  return { merged: true };
}
