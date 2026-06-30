"use client";

import Link from "next/link";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <section className="max-w-[1000px] mx-auto px-6 py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <p className="uppercase text-[10px] tracking-[0.2em] text-[#9A7428] mb-4">
          Saved For Later
        </p>
        <h1 className="text-[32px] font-light mb-6">
          Your wishlist is empty
        </h1>
        <p className="text-gray-500 text-[14px] mb-10 max-w-[400px]">
          Save timepieces you love and come back to them anytime.
        </p>
        <Link href="/">
          <button className="py-4 px-10 border border-black uppercase text-[10px] tracking-[0.2em] hover:bg-black hover:text-white transition">
            Explore Collection
          </button>
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-20">
      <p className="uppercase text-[10px] tracking-[0.14em] text-gray-400 mb-3">
        Home / Wishlist
      </p>
      <h1 className="text-[40px] md:text-[48px] font-light mb-12">
        Your Wishlist
      </h1>

      <div className="flex flex-col">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-6 py-8 border-b border-gray-200"
          >
            <Link
              href={`/products/${item.id}`}
              className="shrink-0 w-full sm:w-[140px] h-[160px] overflow-hidden bg-gray-50"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </Link>

            <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0">
              <div>
                {item.collection && (
                  <p className="uppercase text-[10px] tracking-[0.2em] text-[#9A7428] mb-2">
                    {item.collection}
                  </p>
                )}
                <Link href={`/products/${item.id}`}>
                  <h2 className="text-[18px] font-light hover:text-[#9A7428] transition">
                    {item.name}
                  </h2>
                </Link>
                <p className="text-[14px] text-gray-600 mt-2">
                  ${item.price}
                </p>
              </div>

              <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-3">
                <button
                  onClick={() => {
                    addToCart({
                      id: item.id,
                      name: item.name,
                      image: item.image,
                      price: item.price,
                      collection: item.collection,
                    });
                  }}
                  className="py-3 px-6 bg-black text-white uppercase text-[10px] tracking-[0.2em] hover:bg-[#1b1b1b] transition whitespace-nowrap"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-[10px] uppercase tracking-[0.14em] text-gray-400 hover:text-black transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}