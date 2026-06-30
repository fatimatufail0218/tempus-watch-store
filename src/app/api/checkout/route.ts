import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to checkout" },
        { status: 401 }
      );
    }

    const { items, shippingInfo } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );
    const tax = Math.round(subtotal * 0.08);
    const shipping = 0;
    const total = subtotal + tax + shipping;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // cents mein
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      receipt_email: shippingInfo.email,
      metadata: {
        userId: String((session.user as { id: string | number }).id),
        items: JSON.stringify(
          items.map(
            (item: {
              id: number;
              name: string;
              image: string;
              price: number;
              quantity: number;
            }) => ({
              id: item.id,
              name: item.name,
              image: item.image,
              price: item.price,
              quantity: item.quantity,
            })
          )
        ),
        shippingInfo: JSON.stringify(shippingInfo),
        subtotal: String(subtotal),
        tax: String(tax),
        shipping: String(shipping),
        total: String(total),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe payment intent error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}