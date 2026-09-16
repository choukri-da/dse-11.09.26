import { redirect } from "next/navigation";

import { signOut } from "@/lib/auth/actions";
import { getServerSession } from "@/lib/auth/session";

export default async function CheckoutPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/sign-in?redirect=/checkout");
  }

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-start gap-6 px-4 py-16 sm:px-6 lg:px-10">
      <h1 className="text-heading-3 text-dark-900">Checkout</h1>
      <p className="text-body text-dark-700">{session.user.email}</p>
      <form action={signOut}>
        <button
          type="submit"
          className="rounded-full bg-dark-900 px-6 py-3 text-body-medium text-light-100 transition-opacity hover:opacity-90"
        >
          Sign out
        </button>
      </form>
    </main>
  );
}
