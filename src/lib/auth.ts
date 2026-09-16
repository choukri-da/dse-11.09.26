import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import {
  AUTH_SESSION_COOKIE,
  cookieAttributes,
  isProduction,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth/cookies";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  session: {
    expiresIn: SESSION_MAX_AGE_SECONDS,
    updateAge: 60 * 60 * 24,
  },
  advanced: {
    database: {
      generateId: "uuid",
    },
    useSecureCookies: isProduction,
    cookiePrefix: "auth",
    cookies: {
      session_token: {
        name: AUTH_SESSION_COOKIE,
      },
    },
    defaultCookieAttributes: cookieAttributes,
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
