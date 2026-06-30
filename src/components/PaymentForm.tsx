"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "@/lib/cart-context";

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentFormProps {
  shippingInfo: ShippingInfo;
}

const elementStyle = {
  style: {
    base: {
      fontSize: "14px",
      color: "#0D0D0B",
      fontFamily: "inherit",
      "::placeholder": {
        color: "#9CA3AF",
      },
    },
    invalid: {
      color: "#ef4444",
    },
  },
};

export default function PaymentForm({ shippingInfo }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { clearCart } = useCart();

  const [nameOnCard, setNameOnCard] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) return;

    setLoading(true);
    setError(null);

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      sessionStorage.getItem("clientSecret") as string,
      {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: nameOnCard,
            email: shippingInfo.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.zipCode,
              country: "US",
            },
          },
        },
      }
    );

    if (stripeError) {
      setError(stripeError.message || "Payment failed. Please try again.");
      setLoading(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        const res = await fetch("/api/orders/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
        });

        const data = await res.json();

        if (data.orderId) {
          sessionStorage.removeItem("shippingInfo");
          sessionStorage.removeItem("clientSecret");
          clearCart();
          router.push(`/checkout/success?orderId=${data.orderId}`);
        } else {
          setError(
            "Payment succeeded but order creation failed. Please contact support."
          );
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setError(
          "Payment succeeded but order creation failed. Please contact support."
        );
        setLoading(false);
      }
    } else {
      setError("Payment was not completed.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label className="uppercase text-[10px] tracking-[0.2em] text-gray-500">
          Card Number
        </label>
        <div className="mt-2 h-12 w-full border border-gray-300 px-4 flex items-center focus-within:border-black transition">
          <CardNumberElement
            options={{
              ...elementStyle,
              placeholder: "1234 5678 9012 3456",
            }}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="uppercase text-[10px] tracking-[0.2em] text-gray-500">
          Name on Card
        </label>
        <input
          required
          value={nameOnCard}
          onChange={(e) => setNameOnCard(e.target.value)}
          placeholder="JOHN DOE"
          className="mt-2 h-12 w-full border border-gray-300 px-4 text-[14px] focus:outline-none focus:border-black"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="uppercase text-[10px] tracking-[0.2em] text-gray-500">
            Expiry Date
          </label>
          <div className="mt-2 h-12 w-full border border-gray-300 px-4 flex items-center focus-within:border-black transition">
            <CardExpiryElement options={elementStyle} className="w-full" />
          </div>
        </div>

        <div>
          <label className="uppercase text-[10px] tracking-[0.2em] text-gray-500">
            CVV
          </label>
          <div className="mt-2 h-12 w-full border border-gray-300 px-4 flex items-center focus-within:border-black transition">
            <CardCvcElement options={elementStyle} className="w-full" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 py-4 border-t border-gray-200 text-[10px] uppercase tracking-[0.14em] text-gray-500">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2"></rect>
            <path d="M7 11V7a5 5 0 0110 0v4"></path>
          </svg>
          SSL Encrypted
        </div>
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          Secure Payment
        </div>
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="1 4 1 10 7 10"></polyline>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
          </svg>
          30-Day Returns
        </div>
      </div>

      {error && <p className="text-red-500 text-[13px]">{error}</p>}

      <button
        disabled={!stripe || loading}
        className="h-14 w-full bg-black text-white uppercase text-[11px] tracking-[0.2em] hover:bg-[#1b1b1b] transition disabled:opacity-50"
      >
        {loading ? "Processing..." : "Submit Payment"}
      </button>
    </form>
  );
}