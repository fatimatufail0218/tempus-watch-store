import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="uppercase text-[10px] tracking-[0.2em] text-[#9A7428] mb-4">
        Payment Cancelled
      </p>
      <h1 className="text-[36px] font-light mb-4">
        Your Order Was Not Completed
      </h1>
      <p className="text-gray-500 text-[14px] mb-10 max-w-[420px]">
        No charge was made. You can return to your cart and try again.
      </p>
      <Link href="/private/cart">
        <button className="py-4 px-10 border border-black uppercase text-[10px] tracking-[0.2em] hover:bg-black hover:text-white transition">
          Back to Cart
        </button>
      </Link>
    </section>
  );
}