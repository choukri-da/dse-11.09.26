import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="relative flex flex-col justify-between overflow-hidden bg-dark-900 px-6 py-10 sm:px-10 lg:w-1/2 lg:py-14">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
        />

        <div className="relative">
          <Link href="/" aria-label="Nike home" className="inline-flex">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange">
              <Image src="/logo.svg" alt="Nike" width={28} height={10} />
            </span>
          </Link>
        </div>

        <div className="relative mt-10 max-w-md lg:mt-0">
          <h2 className="text-heading-3 text-light-100 sm:text-heading-2">
            Just Do It
          </h2>
          <p className="mt-4 text-body text-light-400 sm:text-lead">
            Join millions of athletes and fitness enthusiasts who trust Nike for
            their performance needs.
          </p>
          <div
            className="mt-8 flex items-center gap-2"
            role="presentation"
            aria-hidden="true"
          >
            <span className="h-2 w-2 rounded-full bg-light-100" />
            <span className="h-2 w-2 rounded-full bg-light-100/40" />
            <span className="h-2 w-2 rounded-full bg-light-100/40" />
          </div>
        </div>

        <p className="relative mt-10 text-footnote text-light-400 lg:mt-0">
          © 2024 Nike. All rights reserved.
        </p>
      </aside>

      <main className="flex flex-1 items-center justify-center bg-light-100 px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
