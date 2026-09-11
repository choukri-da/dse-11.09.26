import { asc } from "drizzle-orm";

import { CartBadge } from "@/components/cart-badge";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { db } from "@/db";
import { products } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await db.select().from(products).orderBy(asc(products.name));

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nike Store</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {items.length} products from the database
          </p>
        </div>
        <CartBadge />
      </header>

      {items.length === 0 ? (
        <p className="text-neutral-500">
          No products yet. Run <code>npm run db:seed</code> to load sample data.
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <li
              key={product.id}
              className="flex flex-col justify-between rounded-xl border border-neutral-200 p-5 dark:border-neutral-800"
            >
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-500">
                  {product.category}
                </p>
                <h2 className="mt-1 font-semibold">{product.name}</h2>
                <p className="mt-2 text-sm text-neutral-500">
                  {product.description}
                </p>
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    ${product.price}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {product.stock} in stock
                  </span>
                </div>
                <AddToCartButton
                  id={product.id}
                  name={product.name}
                  price={product.price}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
