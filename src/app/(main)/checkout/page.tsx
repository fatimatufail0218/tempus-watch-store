"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const shipping = 0;
  const tax = Math.round(totalPrice * 0.08);
  const total = totalPrice + shipping + tax;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);
    sessionStorage.setItem("shippingInfo", JSON.stringify(form));
    router.push("/checkout/payment");
  };

  if (items.length === 0) {
    return (
      <section className="max-w-[1000px] mx-auto px-6 py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-[32px] font-light mb-6">Your cart is empty</h1>
        <button
          onClick={() => router.push("/")}
          className="py-4 px-10 border border-black uppercase text-[10px] tracking-[0.2em] hover:bg-black hover:text-white transition"
        >
          Explore Collection
        </button>
      </section>
    );
  }

  return (
    <section className="max-w-[1300px] mx-auto px-6 py-20">
      <h1 className="text-[36px] font-light mb-12">Shipping Information</h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="uppercase text-[10px] tracking-[0.2em] text-gray-500">
                First Name
              </label>
              <input
                required
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                className="mt-2 h-12 w-full border border-gray-300 px-4 text-[14px] focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="uppercase text-[10px] tracking-[0.2em] text-gray-500">
                Last Name
              </label>
              <input
                required
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="mt-2 h-12 w-full border border-gray-300 px-4 text-[14px] focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="uppercase text-[10px] tracking-[0.2em] text-gray-500">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-2 h-12 w-full border border-gray-300 px-4 text-[14px] focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="uppercase text-[10px] tracking-[0.2em] text-gray-500">
                Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="mt-2 h-12 w-full border border-gray-300 px-4 text-[14px] focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="uppercase text-[10px] tracking-[0.2em] text-gray-500">
              Address
            </label>
            <input
              required
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="123 Main Street, Apt 4B"
              className="mt-2 h-12 w-full border border-gray-300 px-4 text-[14px] focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <label className="uppercase text-[10px] tracking-[0.2em] text-gray-500">
                City
              </label>
              <input
                required
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="New York"
                className="mt-2 h-12 w-full border border-gray-300 px-4 text-[14px] focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="uppercase text-[10px] tracking-[0.2em] text-gray-500">
                State
              </label>
              <input
                required
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="NY"
                className="mt-2 h-12 w-full border border-gray-300 px-4 text-[14px] focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="uppercase text-[10px] tracking-[0.2em] text-gray-500">
                Zip Code
              </label>
              <input
                required
                name="zipCode"
                value={form.zipCode}
                onChange={handleChange}
                placeholder="10001"
                className="mt-2 h-12 w-full border border-gray-300 px-4 text-[14px] focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="uppercase text-[10px] tracking-[0.2em] text-gray-500">
              Country
            </label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="mt-2 h-12 w-full border border-gray-300 px-4 text-[14px] focus:outline-none focus:border-black"
            >
              <option>United States</option>
              <option>Pakistan</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
            </select>
          </div>

          <button
            disabled={loading}
            className="mt-4 h-14 w-full bg-black text-white uppercase text-[11px] tracking-[0.2em] hover:bg-[#1b1b1b] transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Continue to Payment →"}
          </button>
        </form>

        <div className="border border-gray-200 p-8 h-fit">
          <h3 className="uppercase text-[12px] tracking-[0.2em] mb-6">
            Order Summary ({items.length} items)
          </h3>

          <div className="flex flex-col gap-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="w-14 h-14 shrink-0 overflow-hidden bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  {item.collection && (
                    <p className="uppercase text-[9px] tracking-[0.15em] text-[#9A7428]">
                      {item.collection}
                    </p>
                  )}
                  <p className="text-[13px]">{item.name}</p>
                  <p className="text-[13px] text-gray-500">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-gray-200 mb-4"></div>

          <div className="flex justify-between text-[14px] text-gray-600 mb-3">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[14px] text-gray-600 mb-3">
            <span>Shipping</span>
            <span className="text-[#9A7428]">Free</span>
          </div>
          <div className="flex justify-between text-[14px] text-gray-600 mb-6">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="w-full h-px bg-gray-200 mb-6"></div>

          <div className="flex justify-between text-[16px] font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}