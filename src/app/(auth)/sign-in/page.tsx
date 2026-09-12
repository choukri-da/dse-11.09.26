import Link from "next/link";
import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import SocialProviders from "@/components/SocialProviders";

export const metadata: Metadata = {
  title: "Sign In | Nike Store",
  description: "Sign in to your Nike account",
};

export default function SignInPage() {
  return (
    <section className="flex flex-col gap-8">
      <p className="text-caption text-dark-700 sm:text-right">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-dark-900 underline underline-offset-4 hover:text-dark-700"
        >
          Sign Up
        </Link>
      </p>

      <header className="text-center">
        <h1 className="text-heading-3 text-dark-900 sm:text-heading-2">
          Welcome Back!
        </h1>
        <p className="mt-2 text-body text-dark-700">
          Sign in to continue your fitness journey
        </p>
      </header>

      <SocialProviders action="sign-in" />

      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-light-300" />
        <span className="text-caption text-dark-700">Or sign in with</span>
        <span className="h-px flex-1 bg-light-300" />
      </div>

      <AuthForm mode="sign-in" />

      <p className="text-center text-footnote text-dark-700">
        By signing in, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-4">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-4">
          Privacy Policy
        </Link>
      </p>
    </section>
  );
}
