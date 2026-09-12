import Image from "next/image";
import Link from "next/link";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocial {
  label: string;
  href: string;
  icon: string;
}

export interface FooterProps {
  columns?: FooterColumn[];
  socials?: FooterSocial[];
  legalLinks?: FooterLink[];
  location?: string;
  copyright?: string;
}

const defaultColumns: FooterColumn[] = [
  {
    title: "Featured",
    links: [
      { label: "Air Force 1", href: "#" },
      { label: "Huarache", href: "#" },
      { label: "Air Max 90", href: "#" },
      { label: "Air Max 95", href: "#" },
    ],
  },
  {
    title: "Shoes",
    links: [
      { label: "All Shoes", href: "#" },
      { label: "Custom Shoes", href: "#" },
      { label: "Jordan Shoes", href: "#" },
      { label: "Running Shoes", href: "#" },
    ],
  },
  {
    title: "Clothing",
    links: [
      { label: "All Clothing", href: "#" },
      { label: "Modest Wear", href: "#" },
      { label: "Hoodies & Pullovers", href: "#" },
      { label: "Shirts & Tops", href: "#" },
    ],
  },
  {
    title: "Kids'",
    links: [
      { label: "Infant & Toddler Shoes", href: "#" },
      { label: "Kids' Shoes", href: "#" },
      { label: "Kids' Jordan Shoes", href: "#" },
      { label: "Kids' Basketball Shoes", href: "#" },
    ],
  },
];

const defaultSocials: FooterSocial[] = [
  { label: "X", href: "#", icon: "/x.svg" },
  { label: "Facebook", href: "#", icon: "/facebook.svg" },
  { label: "Instagram", href: "#", icon: "/instagram.svg" },
];

const defaultLegalLinks: FooterLink[] = [
  { label: "Guides", href: "#" },
  { label: "Terms of Sale", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Nike Privacy Policy", href: "#" },
];

export function Footer({
  columns = defaultColumns,
  socials = defaultSocials,
  legalLinks = defaultLegalLinks,
  location = "Croatia",
  copyright = "© 2025 Nike, Inc. All Rights Reserved",
}: FooterProps) {
  return (
    <footer className="bg-dark-900 text-light-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <Link href="/" aria-label="Nike home" className="shrink-0">
            <Image
              src="/logo.svg"
              alt="Nike"
              width={80}
              height={29}
            />
          </Link>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-16">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-body-medium text-light-100">
                  {column.title}
                </h2>
                <ul className="mt-6 flex flex-col gap-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-body text-dark-500 transition-colors hover:text-light-100"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <ul className="flex items-center gap-4">
            {socials.map((social) => (
              <li key={social.label}>
                <Link
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full bg-light-100 transition-opacity hover:opacity-80"
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={18}
                    height={18}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-dark-700/40 pt-8 sm:mt-16 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-2 text-footnote text-light-100">
              <Image
                src="/globe.svg"
                alt=""
                width={12}
                height={12}
                aria-hidden="true"
                className="brightness-0 invert"
              />
              {location}
            </span>
            <span className="text-footnote text-dark-500">{copyright}</span>
          </div>

          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-footnote text-dark-500 transition-colors hover:text-light-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
