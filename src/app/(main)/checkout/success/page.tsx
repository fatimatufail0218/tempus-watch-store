import Link from "next/link";
import { prisma } from "@/lib/db";

interface SuccessPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { orderId } = await searchParams;

  const order = orderId
    ? await prisma.order.findUnique({ where: { orderId } })
    : null;

  return (
    <section className="max-w-[500px] mx-auto px-6 py-20">
      <div className="text-center mb-10">
        <h1 className="text-[44px] font-light">
          Thank <span className="italic text-[#9A7428]">You!</span>
        </h1>

        {order ? (
          <>
            <p className="text-[14px] text-gray-600 mt-4">
              Your order <span className="font-medium text-black">{order.orderId}</span>{" "}
              has been placed.
            </p>
            <p className="text-[14px] text-gray-600 mt-1">
              Confirmation sent to{" "}
              <span className="font-medium text-black">{order.email}</span>
            </p>
          </>
        ) : (
          <p className="text-[14px] text-gray-600 mt-4">
            Your order has been placed successfully.
          </p>
        )}
      </div>

      {order && (
        <div className="bg-[#FAFAF7] p-8 mb-6">
          <h3 className="uppercase text-[12px] tracking-[0.2em] mb-6">
            Order Summary
          </h3>

          <div className="flex justify-between text-[14px] text-gray-600 mb-3">
            <span>Subtotal</span>
            <span>${order.subtotal}</span>
          </div>
          <div className="flex justify-between text-[14px] text-gray-600 mb-3">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? "Free" : `$${order.shipping}`}</span>
          </div>
          <div className="flex justify-between text-[14px] text-gray-600 mb-6">
            <span>Tax (8%)</span>
            <span>${order.tax}</span>
          </div>

          <div className="w-full h-px bg-gray-200 mb-6"></div>

          <div className="flex justify-between text-[16px] font-medium">
            <span>Total Paid</span>
            <span>${order.total}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Link href="/private/orders">
          <button className="w-full py-4 bg-black text-white uppercase text-[10px] tracking-[0.2em] hover:bg-[#1b1b1b] transition">
            View My Orders
          </button>
        </Link>

        <Link href="/">
          <button className="w-full py-4 border border-gray-300 uppercase text-[10px] tracking-[0.2em] hover:border-gray-400 transition">
            Back to Home
          </button>
        </Link>

        <Link href="/">
          <button className="w-full py-4 border border-gray-300 uppercase text-[10px] tracking-[0.2em] hover:border-gray-400 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    </section>
  );
}