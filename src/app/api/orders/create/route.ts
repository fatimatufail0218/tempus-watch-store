import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { paymentIntentId } = await req.json();

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: "Missing payment intent ID" },
        { status: 400 }
      );
    }

    // Pehle se yeh order bana to nahi chuka (duplicate-safety)
    const existing = await prisma.order.findUnique({
      where: { stripeSessionId: paymentIntentId },
    });
    if (existing) {
      return NextResponse.json({ orderId: existing.orderId });
    }

    // Stripe se seedha confirm karte hain ke payment wakai successful hai
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId,
      { expand: ["payment_method"] }
    );

    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    const metadata = paymentIntent.metadata;
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
    const shipping = parseInt(metadata.shipping);
    const total = parseInt(metadata.total);

    let paymentMethod = "Card";
    const pm = paymentIntent.payment_method as Stripe.PaymentMethod;
    if (pm?.card) {
      paymentMethod = `${pm.card.brand.toUpperCase()} ending in ${pm.card.last4}`;
    }

    const orderId = `TMP-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = await prisma.order.create({
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
        shipping,
        tax,
        total,
        status: "CONFIRMED",
        stripeSessionId: paymentIntentId,
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

    return NextResponse.json({ orderId: order.orderId });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}