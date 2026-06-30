import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const metadata = session.metadata!;
      const userId = parseInt(metadata.userId);
      const items = JSON.parse(metadata.items) as Array<{
        id: number;
        name: string;
        image: string;
        price: number;
        quantity: number;
      }>;
      const shippingInfo = JSON.parse(metadata.shippingInfo);
      const subtotal = parseInt(metadata.subtotal);
      const tax = parseInt(metadata.tax);
      const total = (session.amount_total ?? 0) / 100;

      const orderId = `TMP-${Math.floor(100000 + Math.random() * 900000)}`;

      let paymentMethod = "Card";
      if (session.payment_intent) {
        const paymentIntent = await stripe.paymentIntents.retrieve(
          session.payment_intent as string,
          { expand: ["payment_method"] }
        );
        const pm = paymentIntent.payment_method as Stripe.PaymentMethod;
        if (pm?.card) {
          paymentMethod = `${pm.card.brand.toUpperCase()} ending in ${pm.card.last4}`;
        }
      }

      await prisma.order.create({
        data: {
          orderId,
          userId,
          firstName: shippingInfo.firstName,
          lastName: shippingInfo.lastName,
          email: shippingInfo.email,
          phone: shippingInfo.phone || null,
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
          country: shippingInfo.country,
          subtotal,
          shipping: 0,
          tax,
          total: Math.round(total),
          status: "CONFIRMED",
          stripeSessionId: session.id,
          paymentMethod,
          items: {
            create: items.map((item) => ({
              productId: item.id,
              name: item.name,
              image: item.image,
              price: item.price,
              quantity: item.quantity,
            })),
          },
        },
      });

      console.log("Order created:", orderId);
    } catch (err) {
      console.error("Failed to create order:", err);
    }
  }

  return NextResponse.json({ received: true });
}