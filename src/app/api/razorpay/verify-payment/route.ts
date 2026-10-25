import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { error: "Missing required payment credentials" },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // If key secret is configured, perform strict HMAC SHA256 verification
    if (keySecret) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json(
          { verified: false, error: "Invalid payment cryptographic signature" },
          { status: 400 }
        );
      }

      return NextResponse.json({
        verified: true,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        status: "Paid",
      });
    }

    // In demo mode without configured credentials
    return NextResponse.json({
      verified: true,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id || "pay_demo_test",
      status: "Paid (Simulated)",
      demoNotice: "Simulated verification completed. Configure RAZORPAY_KEY_SECRET for live cryptographic checks.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { verified: false, error: err?.message || "Verification failed" },
      { status: 500 }
    );
  }
}
