import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar cartCount={2} />
      {children}
      <Footer />
    </>
  );
}
