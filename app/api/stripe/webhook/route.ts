// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { updateSubscriptionLevel } from "@/lib/actions/profile.actions";
import { revalidatePath } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  console.log("💰 Webhook received");

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return new NextResponse("Missing signature", { status: 400 });
  }
  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");
    if (!sig) {
      return new NextResponse("Missing signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("💰 PaymentIntent metadata:", paymentIntent.metadata);

        const userId = paymentIntent.metadata.userId;
        const plan = paymentIntent.metadata.plan;

        if (userId) {
          try {
            await updateSubscriptionLevel(plan as "free" | "lifetime", userId);
            console.log(`✅ Successfully upgraded user ${userId} to ${plan}`);
            revalidatePath("/", "layout");
          } catch (supabaseError) {
            console.error("❌ Failed to update subscription:", supabaseError);
          }
        } else {
          console.warn(
            "⚠️ No userId in metadata for PaymentIntent",
            paymentIntent.id
          );
        }

        break;
      }

      default:
        // Handle other event types safely
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
        break;
    }

    return new NextResponse("Success", { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("❌ Webhook processing error:", err.message || err);
    return new NextResponse(`Webhook Error: ${err.message || err}`, {
      status: 400,
    });
  }
}
