import { z } from "zod";

export const emailSchema = z.string().trim().toLowerCase().email().max(254);
export const passwordSchema = z.string().min(8).max(128);
export const redirectToSchema = z
  .string()
  .optional()
  .transform((value) =>
    value && value.startsWith("/") && !value.startsWith("//")
      ? value
      : undefined,
  );

export const signUpSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: emailSchema,
  password: passwordSchema,
  redirectTo: redirectToSchema,
});

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  redirectTo: redirectToSchema,
  remember: z.literal("on").optional().transform((value) => value === "on"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type AuthActionState =
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }
  | { ok: true }
  | null;
