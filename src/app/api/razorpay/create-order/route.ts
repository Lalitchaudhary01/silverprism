import { NextResponse } from "next/server";
import { PRODUCTS, calculateWholesaleItemPrice } from "@/data/products";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, role, poNumber } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart items are required for order creation" },
        { status: 400 }
      );
    }

    const isWholesale = role === "wholesale_approved";

    // Server-side recalculation of subtotal to prevent client manipulation
    let calculatedSubtotal = 0;
    for (const item of items) {
      const product = PRODUCTS.find((p) => p.slug === item.slug);
      if (!product) {
        return NextResponse.json(
          { error: `Invalid product in cart: ${item.slug}` },
          { status: 400 }
        );
      }

      if (isWholesale && item.quantity < product.moq) {
        return NextResponse.json(
          {
            error: `Minimum order quantity of ${product.moq} units not met for ${product.name}`,
          },
          { status: 400 }
        );
      }

      const unitPrice = isWholesale
        ? calculateWholesaleItemPrice(product, item.quantity)
        : product.retailPrice;

      calculatedSubtotal += unitPrice * item.quantity;
    }

    const tax = Math.round(calculatedSubtotal * 0.03); // 3% IGST for Silver Jewellery
    const totalAmount = calculatedSubtotal + tax;
    const amountInPaise = totalAmount * 100;

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Check if live or test Razorpay credentials are configured
    if (keyId && keySecret) {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const rzpResponse = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
          notes: {
            channel: isWholesale ? "B2B_Wholesale" : "B2C_Retail",
            poNumber: poNumber || "N/A",
          },
        }),
      });

      const rzpData = await rzpResponse.json();
      if (!rzpResponse.ok) {
        return NextResponse.json({ error: rzpData.error?.description || "Razorpay API error" }, { status: 500 });
      }

      return NextResponse.json({
        orderId: rzpData.id,
        amount: rzpData.amount,
        currency: rzpData.currency,
        keyId,
        isSimulated: false,
      });
    }

    // Demo Mode fallback when environment variables are not yet configured
    const simulatedOrderId = "order_sim_" + Math.random().toString(36).substring(2, 12);
    return NextResponse.json({
      orderId: simulatedOrderId,
      amount: amountInPaise,
      currency: "INR",
      keyId: "rzp_test_demo_mode",
      isSimulated: true,
      message: "Server validated order created. Running in safe demonstration mode.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to initialize order" },
      { status: 500 }
    );
  }
}
