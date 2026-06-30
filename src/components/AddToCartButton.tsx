"use client";

import { useCart } from "@/lib/cart-context";

interface AddToCartButtonProps {
  id: number;
  name: string;
  image: string;
  price: number;
  collection?: string | null;
}

export default function AddToCartButton({
  id,
  name,
  image,
  price,
  collection,
}: AddToCartButtonProps) {
  const { items, addToCart } = useCart();
  const isInCart = items.some((item) => item.id === id);

  return (
    <button
      onClick={() => addToCart({ id, name, image, price, collection })}
      disabled={isInCart}
      className={`w-full py-4 uppercase tracking-[0.25em] text-[10px] transition flex items-center justify-center gap-2 ${
        isInCart
          ? "bg-black text-white border border-black cursor-default"
          : "border border-[#868685] hover:bg-black hover:text-white"
      }`}
    >
      {isInCart ? (
        <>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          In Cart
        </>
      ) : (
        "Add To Cart"
      )}
    </button>
  );
}