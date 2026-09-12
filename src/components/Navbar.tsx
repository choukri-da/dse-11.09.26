"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  links?: NavLink[];
  cartCount?: number;
}

const defaultLinks: NavLink[] = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Kids", href: "/kids" },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ links = defaultLinks, cartCount = 0 }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-light-300 bg-light-100">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10"
      >
        <Link href="/" aria-label="Nike home" className="shrink-0">
          <Image
            src="/logo.svg"
            alt="Nike"
            width={60}
            height={22}
            priority
            className="brightness-0"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-body text-dark-900 transition-colors hover:text-dark-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-8 md:flex">
          <button
            type="button"
            className="text-body text-dark-900 transition-colors hover:text-dark-700"
          >
            Search
          </button>
          <button
            type="button"
            className="text-body text-dark-900 transition-colors hover:text-dark-700"
          >
            My Cart ({cartCount})
          </button>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="flex flex-col gap-1.5 p-1 md:hidden"
        >
          <span
            className={`block h-0.5 w-6 bg-dark-900 transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-dark-900 transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-dark-900 transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-light-300 bg-light-100 md:hidden"
      >
        <ul className="flex flex-col gap-4 px-4 py-6 sm:px-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-body text-dark-900 transition-colors hover:text-dark-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center gap-6 pt-2 text-body text-dark-900">
            <button type="button" className="hover:text-dark-700">
              Search
            </button>
            <button type="button" className="hover:text-dark-700">
              My Cart ({cartCount})
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
