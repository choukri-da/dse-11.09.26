import { config } from "dotenv";

config({ path: ".env.local" });

import { db } from "./index";
import { products, type NewProduct } from "./schema";

const nikeProducts: NewProduct[] = [
  {
    name: "Nike Air Force 1 '07",
    slug: "nike-air-force-1-07",
    description:
      "The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best.",
    category: "Lifestyle",
    price: "115.00",
    imageUrl:
      "https://static.nike.com/a/images/t_default/air-force-1-07-shoes.png",
    stock: 42,
  },
  {
    name: "Nike Air Max 90",
    slug: "nike-air-max-90",
    description:
      "Nothing as fly, nothing as comfortable, nothing as proven. The Nike Air Max 90 stays true to its OG running roots.",
    category: "Lifestyle",
    price: "140.00",
    imageUrl: "https://static.nike.com/a/images/t_default/air-max-90-shoes.png",
    stock: 28,
  },
  {
    name: "Nike Pegasus 41",
    slug: "nike-pegasus-41",
    description:
      "A springy ride for every run, the Pegasus 41 keeps the responsive feel you love with an extra boost of energy return.",
    category: "Running",
    price: "145.00",
    imageUrl: "https://static.nike.com/a/images/t_default/pegasus-41-shoes.png",
    stock: 63,
  },
  {
    name: "Nike Dunk Low Retro",
    slug: "nike-dunk-low-retro",
    description:
      "Created for the hardwood but taken to the streets, this '80s basketball icon returns with crisp overlays and original team colours.",
    category: "Lifestyle",
    price: "125.00",
    imageUrl: "https://static.nike.com/a/images/t_default/dunk-low-shoes.png",
    stock: 17,
  },
  {
    name: "Nike Tech Fleece Hoodie",
    slug: "nike-tech-fleece-hoodie",
    description:
      "Premium Tech Fleece fabric delivers lightweight warmth in a clean, modern silhouette you can wear all year.",
    category: "Apparel",
    price: "130.00",
    imageUrl:
      "https://static.nike.com/a/images/t_default/tech-fleece-hoodie.png",
    stock: 35,
  },
  {
    name: "Nike Dri-FIT ADV TechKnit Ultra",
    slug: "nike-dri-fit-adv-techknit-ultra",
    description:
      "Engineered knit zones and Dri-FIT ADV technology keep you cool and dry when the pace picks up.",
    category: "Apparel",
    price: "80.00",
    imageUrl:
      "https://static.nike.com/a/images/t_default/dri-fit-adv-techknit.png",
    stock: 54,
  },
  {
    name: "Nike Everyday Plus Cushioned Socks",
    slug: "nike-everyday-plus-cushioned-socks",
    description:
      "Sweat-wicking fabric with extra cushioning under the foot for comfort mile after mile. Pack of three.",
    category: "Accessories",
    price: "22.00",
    imageUrl:
      "https://static.nike.com/a/images/t_default/everyday-plus-socks.png",
    stock: 120,
  },
  {
    name: "Nike Brasilia 9.5 Training Backpack",
    slug: "nike-brasilia-95-training-backpack",
    description:
      "Durable polyester with a padded laptop sleeve and a large main compartment for everything gym day demands.",
    category: "Accessories",
    price: "55.00",
    imageUrl: "https://static.nike.com/a/images/t_default/brasilia-backpack.png",
    stock: 71,
  },
];

async function seed() {
  await db.delete(products);
  await db.insert(products).values(nikeProducts);
  console.log(`Seeded ${nikeProducts.length} products.`);
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
