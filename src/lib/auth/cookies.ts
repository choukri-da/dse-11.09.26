export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
export const AUTH_SESSION_COOKIE = "auth_session";
export const GUEST_SESSION_COOKIE = "guest_session";
export const isProduction = process.env.NODE_ENV === "production";
export const cookieAttributes = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "strict" as const,
  path: "/",
};
export const guestCookieOptions = {
  ...cookieAttributes,
  maxAge: SESSION_MAX_AGE_SECONDS,
};
