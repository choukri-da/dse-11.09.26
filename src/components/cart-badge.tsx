"use client";

import { useSyncExternalStore } from "react";

import { useCartStore } from "@/store/cart";

function subscribe(onChange: () => void) {
  const unsubscribeStore = useCartStore.subscribe(onChange);
  const unsubscribeHydration = useCartStore.persist.onFinishHydration(onChange);
  return () => {
    unsubscribeStore();
    unsubscribeHydration();
  };
}

function getSnapshot() {
  return useCartStore
    .getState()
    .items.reduce((sum, item) => sum + item.quantity, 0);
}

export function CartBadge() {
  const count = useSyncExternalStore(subscribe, getSnapshot, () => 0);

  return (
    <span className="rounded-full border border-neutral-300 px-3 py-1 text-sm dark:border-neutral-700">
      Cart: {count}
    </span>
  );
}
