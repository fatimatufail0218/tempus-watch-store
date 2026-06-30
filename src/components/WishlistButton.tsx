"use client";

import { useWishlist } from "@/lib/wishlist-context";

interface WishlistButtonProps {
  id: number;
  name: string;
  image: string;
  price: number;
  collection?: string | null;
}

export default function WishlistButton({
  id,
  name,
  image,
  price,
  collection,
}: WishlistButtonProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(id);

  return (
    <button
      onClick={() => toggleWishlist({ id, name, image, price, collection })}
      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition"
      aria-label="Toggle wishlist"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={inWishlist ? "#9A7428" : "none"}
        stroke={inWishlist ? "#9A7428" : "currentColor"}
        strokeWidth="1.5"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
}