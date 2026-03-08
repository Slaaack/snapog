import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  try {
    const event = stripe.webhooks.constructEvent(body, sig || "", webhookSecret);

    switch (event.type) {
      case "checkout.session.completed":
        console.log("Checkout completed:", event.data.object);
        break;
      case "customer.subscription.deleted":
        console.log("Subscription cancelled:", event.data.object);
        break;
      default:
        console.log("Unhandled event:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
