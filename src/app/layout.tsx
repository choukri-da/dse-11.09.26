import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
const jost = Jost({
  variable:'--font-jost',
  subsets : ['latin'],

})

export const metadata: Metadata = {
  title: "Nike Store",
  description: "Nike products rendered from Neon Postgres with Drizzle ORM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jost.className} antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
