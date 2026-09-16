import Footer from "@/components/Footer";
import GuestSessionInit from "@/components/GuestSessionInit";
import Navbar from "@/components/Navbar";

export default function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GuestSessionInit />
      <Navbar cartCount={2} />
      {children}
      <Footer />
    </>
  );
}
