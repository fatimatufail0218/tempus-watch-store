"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <section className="max-w-[1000px] mx-auto px-6 py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <p className="uppercase text-[10px] tracking-[0.2em] text-[#9A7428] mb-4">
          Your Bag
        </p>
        <h1 className="text-[32px] font-light mb-6">Your cart is empty</h1>
        <p className="text-gray-500 text-[14px] mb-10 max-w-[400px]">
          Browse our collection and find a timepiece worth wearing.
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
    <section className="max-w-[1300px] mx-auto px-6 py-20">
      <p className="uppercase text-[10px] tracking-[0.14em] text-gray-400 mb-3">
        Home / Cart
      </p>
      <h1 className="text-[40px] md:text-[48px] font-light mb-12">
        Your Bag
      </h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-12">
        {/* Items list */}
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

              <div className="flex flex-1 flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-4">
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
                  </div>
                  <p className="text-[15px] text-gray-700 shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition text-[14px]"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-[13px]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition text-[14px]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[10px] uppercase tracking-[0.14em] text-gray-400 hover:text-black transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary box */}
        <div className="border border-gray-200 p-8 h-fit">
          <h3 className="uppercase text-[12px] tracking-[0.2em] mb-6">
            Order Summary
          </h3>

          <div className="flex justify-between text-[14px] text-gray-600 mb-3">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[14px] text-gray-600 mb-6">
            <span>Shipping</span>
            <span className="text-[#9A7428]">Free</span>
          </div>

          <div className="w-full h-px bg-gray-200 mb-6"></div>

          <div className="flex justify-between text-[16px] font-medium mb-8">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={() => router.push("/checkout")}
            className="w-full py-4 bg-black text-white uppercase text-[10px] tracking-[0.2em] hover:bg-[#1b1b1b] transition"
          >
            Proceed to Checkout
          </button>

          <Link href="/">
            <button className="w-full mt-3 py-4 border border-gray-300 uppercase text-[10px] tracking-[0.2em] hover:border-gray-400 transition">
              ← Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}