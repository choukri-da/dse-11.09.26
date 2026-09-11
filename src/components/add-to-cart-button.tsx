"use client";

import { useCartStore } from "@/store/cart";

type Props = {
  id: string;
  name: string;
  price: string;
};

export function AddToCartButton({ id, name, price }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      type="button"
      onClick={() => addItem({ id, name, price })}
      className="w-full rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
    >
      Add to cart
    </button>
  );
}
