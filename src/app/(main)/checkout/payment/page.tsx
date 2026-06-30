"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe-client";
import { useCart } from "@/lib/cart-context";
import PaymentForm from "@/components/PaymentForm";

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const { items, totalPrice } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const tax = Math.round(totalPrice * 0.08);
  const total = totalPrice + tax;

  useEffect(() => {
    const shippingDataRaw = sessionStorage.getItem("shippingInfo");

    if (!shippingDataRaw || items.length === 0) {
      router.push("/checkout");
      return;
    }

    const parsed = JSON.parse(shippingDataRaw);
    setShippingInfo(parsed);

    const existingSecret = sessionStorage.getItem("clientSecret");
    if (existingSecret) {
      setClientSecret(existingSecret);
      return;
    }

    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, shippingInfo: parsed }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          sessionStorage.setItem("clientSecret", data.clientSecret);
          setClientSecret(data.clientSecret);
        } else {
          setError(data.error || "Something went wrong");
        }
      })
      .catch(() => setError("Something went wrong"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
        
      <section className="max-w-[600px] mx-auto px-6 py-32 text-center">
        <p className="text-red-500 text-[14px] mb-6">{error}</p>
        <button
          onClick={() => router.push("/checkout")}
          className="py-4 px-10 border border-black uppercase text-[10px] tracking-[0.2em] hover:bg-black hover:text-white transition"
        >
          ← Back to Shipping
        </button>
      </section>
    );
  }

  if (!clientSecret || !shippingInfo) {
    return (
      <section className="max-w-[600px] mx-auto px-6 py-32 text-center">
        <p className="text-gray-500 text-[14px]">Preparing payment...</p>
      </section>
    );
  }

  return (
    <section className="max-w-[1300px] mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[36px] font-light">Payment Details</h1>
        <Link
          href="/checkout"
          className="uppercase text-[10px] tracking-[0.14em] text-[#9A7428] hover:text-black transition"
        >
          ← Edit Shipping
        </Link>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-12">
        <div className="flex flex-col gap-8">
          {/* Shipping summary box */}
          <div className="bg-[#FAFAF7] p-6">
            <p className="text-[14px] font-medium">
              {shippingInfo.firstName} {shippingInfo.lastName}
            </p>
            <p className="text-[13px] text-gray-600 mt-1">
              {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}{" "}
              {shippingInfo.zipCode}
            </p>
            <p className="text-[13px] text-gray-600 mt-1">
              {shippingInfo.email}
            </p>
          </div>

          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
                variables: {
                  colorPrimary: "#000000",
                  fontFamily: "inherit",
                  borderRadius: "0px",
                },
              },
            }}
          >
            <PaymentForm shippingInfo={shippingInfo} />
          </Elements>
        </div>

        {/* Order Summary */}
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