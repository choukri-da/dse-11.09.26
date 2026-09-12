import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const products = [
  {
    title: "Nike Air Force 1 Mid '07",
    description: "Men's Shoes",
    meta: "6 Colour",
    price: "$98.30",
    image: "/shoes/shoe-1.jpg",
    badge: "Best Seller",
  },
  {
    title: "Nike Court Vision Low Next Nature",
    description: "Men's Shoes",
    meta: "4 Colour",
    price: "$98.30",
    image: "/shoes/shoe-2.webp",
    badge: "Extra 20% off",
  },
  {
    title: "Nike Air Force 1 PLT.AF.ORM",
    description: "Women's Shoes",
    meta: "6 Colour",
    price: "$98.30",
    image: "/shoes/shoe-3.webp",
    badge: "Extra 10% off",
  },
];

export default function Home() {
  return (
    <>
      <Navbar cartCount={2} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-10">
        <h1 className="text-heading-3 text-dark-900 sm:text-heading-2">
          Latest shoes
        </h1>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.title} href="#" {...product} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
