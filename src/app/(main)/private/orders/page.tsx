import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getOrdersByUserId } from "@/lib/queries/orders";
import OrderCard from "@/components/OrderCard";

export default async function OrdersPage() {
  const session = await auth();

  console.log("FULL SESSION OBJECT:", JSON.stringify(session, null, 2));

  if (!session?.user) {
    redirect("/login");
  }

  const userId = Number(session.user.id);
  console.log("USER ID:", userId);

  const orders = await getOrdersByUserId(userId);

  return (
    
    <section className="max-w-[1300px] mx-auto px-6 py-20">
      <h1 className="text-[36px] font-light mb-2">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-[14px] mt-10">
          You haven't placed any orders yet.
        </p>
      ) : (
        <>
          <p className="text-[#9A7428] text-[13px] mb-10">
            {orders.length} {orders.length === 1 ? "order" : "orders"} found
          </p>

          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}