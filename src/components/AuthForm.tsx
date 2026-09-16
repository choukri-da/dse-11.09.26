"use client";

import { useState } from "react";

export interface AuthFormProps {
  mode: "sign-in" | "sign-up";
}

export function AuthForm({ mode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isSignUp = mode === "sign-up";

  const inputClass =
    "w-full rounded-xl border border-light-300 bg-light-100 px-4 py-3 text-body text-dark-900 placeholder:text-dark-500 focus:border-dark-900 focus:outline-none";

  return (
    <form className="flex flex-col gap-5" noValidate>
      {isSignUp && (
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-caption text-dark-900">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Enter your full name"
            className={inputClass}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-caption text-dark-900">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="johndoe@gmail.com"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-caption text-dark-900">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            required
            minLength={8}
            placeholder="minimum 8 characters"
            className={`${inputClass} pr-12`}
            aria-describedby={isSignUp ? "password-hint" : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex items-center px-4 text-dark-700 transition-colors hover:text-dark-900"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
              {showPassword && <path d="m3 3 18 18" />}
            </svg>
          </button>
        </div>
        {isSignUp && (
          <p id="password-hint" className="text-footnote text-dark-700">
            Use at least 8 characters.
          </p>
        )}
      </div>

      {!isSignUp && (
        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-caption text-dark-700">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 rounded border-light-300 accent-dark-900"
            />
            Remember me
          </label>
          <a
            href="/forgot-password"
            className="text-caption text-dark-900 underline underline-offset-4 hover:text-dark-700"
          >
            Forgot password?
          </a>
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-full bg-dark-900 px-6 py-4 text-body-medium text-light-100 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-900"
      >
        {isSignUp ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
}

export default AuthForm;
