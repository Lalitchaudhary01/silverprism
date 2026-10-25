"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Building2,
  Lock,
  ArrowRight,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatINR } from "@/data/products";

export default function CheckoutPage() {
  const {
    cartProducts,
    subtotal,
    totalItemCount,
    allMoqSatisfied,
    userRole,
    placeOrder,
  } = useStore();

  const isWholesale = userRole === "wholesale_approved";

  // Form State
  const [formData, setFormData] = useState({
    name: isWholesale ? "Rajesh Singhania" : "",
    companyName: isWholesale ? "Aura Luxury Jewels Pvt Ltd" : "",
    gstin: isWholesale ? "27AABCA1234D1Z5" : "",
    poNumber: isWholesale ? "PO-2026-SP-901" : "",
    email: isWholesale ? "rajesh@aurajewels.in" : "",
    phone: isWholesale ? "+91 98201 44890" : "",
    address: isWholesale ? "Shop 14, Linking Road, Bandra West" : "",
    city: isWholesale ? "Mumbai" : "",
    state: isWholesale ? "Maharashtra" : "",
    pincode: isWholesale ? "400050" : "",
    paymentMethod: isWholesale ? "bank_transfer" : "razorpay",
  });

  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "SILVER10") {
      const discount = Math.round(subtotal * 0.1);
      setCouponDiscount(discount);
      setCouponMessage("Coupon SILVER10 applied: 10% discount!");
    } else {
      setCouponMessage("Invalid promo code. Try 'SILVER10'");
    }
  };

  const finalSubtotal = Math.max(0, subtotal - couponDiscount);
  const taxAmount = Math.round(finalSubtotal * 0.03); // 3% IGST for Silver Jewellery
  const grandTotal = finalSubtotal + taxAmount;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isWholesale && !allMoqSatisfied) {
      alert("Minimum order quantities must be satisfied for wholesale checkout.");
      return;
    }

    if (!formData.name || !formData.email || !formData.address || !formData.pincode) {
      alert("Please provide the required delivery information.");
      return;
    }

    const orderId = placeOrder({
      type: isWholesale ? "wholesale" : "retail",
      customerName: isWholesale
        ? `${formData.companyName} (Attn: ${formData.name})`
        : formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      poNumber: isWholesale ? formData.poNumber : undefined,
      gstin: isWholesale ? formData.gstin : undefined,
      items: cartProducts.map((p) => ({
        product: p.product,
        quantity: p.quantity,
        unitPrice: p.unitPrice,
        lineTotal: p.lineTotal,
        variantName: p.variantName,
      })),
      subtotal: finalSubtotal,
      tax: taxAmount,
      shipping: 0,
      total: grandTotal,
      paymentMethod:
        formData.paymentMethod === "razorpay"
          ? "Razorpay Payment Gateway (Simulated)"
          : formData.paymentMethod === "bank_transfer"
          ? "NEFT / RTGS Wire Transfer"
          : "Commercial Terms Net 30 Days",
      paymentStatus: isWholesale ? "Terms 30 Days" : "Paid",
      fulfillmentStatus: "Processing",
    });

    setConfirmedOrderId(orderId);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
      {/* Header */}
      <div className="pb-8 border-b border-[#E2E4E6] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-[#B7A078]">
              {isWholesale ? "B2B Commercial Procurement" : "Secure Checkout"}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              <Lock className="h-3 w-3" /> 256-Bit SSL Encrypted
            </span>
          </div>
          <h1 className="display-lg mt-2 text-[#171717]">
            {isWholesale ? "Wholesale Order & Invoicing" : "Complete Acquisition"}
          </h1>
        </div>
      </div>

      {cartProducts.length === 0 && !confirmedOrderId ? (
        <div className="py-24 text-center border-b border-[#E2E4E6]">
          <p className="font-display text-2xl font-light text-[#171717]">
            Your shopping bag has no items
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block px-8 py-3 bg-[#171717] text-[#FAF9F6] text-xs uppercase tracking-[0.2em] font-semibold"
          >
            Explore Catalogue
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-16 lg:grid-cols-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleOrderSubmit} className="space-y-10">
              {/* Step 1: Customer / Company Details */}
              <div className="bg-white border border-[#E2E4E6] p-6 md:p-8 rounded shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#E2E4E6]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#171717] text-white text-xs font-bold">
                    1
                  </span>
                  <h3 className="font-display text-lg font-semibold text-[#171717]">
                    {isWholesale ? "Business & Entity Credentials" : "Customer Information"}
                  </h3>
                </div>

                {isWholesale && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                        Registered Company / Store Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                      />
                    </div>
                    <div>
                      <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                        GSTIN / Tax Registration *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.gstin}
                        onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                        className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                      />
                    </div>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                      {isWholesale ? "Procurement Contact Name *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Aditi Kapoor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                      Email Address (for order tracking) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="aditi@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                      Mobile Number (for Courier Dispatch) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                    />
                  </div>
                  {isWholesale && (
                    <div>
                      <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                        Purchase Order (PO) Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.poNumber}
                        onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
                        className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2: Delivery & Shipping Address */}
              <div className="bg-white border border-[#E2E4E6] p-6 md:p-8 rounded shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#E2E4E6]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#171717] text-white text-xs font-bold">
                    2
                  </span>
                  <h3 className="font-display text-lg font-semibold text-[#171717]">
                    Insured Shipping Address
                  </h3>
                </div>

                <div>
                  <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                    Street Address & Suite / Landmark *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Floor 4, Crescent Tower, BKC"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Mumbai"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Maharashtra"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                    />
                  </div>
                  <div>
                    <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                      Postal PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="400051"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-white border border-[#E2E4E6] p-6 md:p-8 rounded shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#E2E4E6]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#171717] text-white text-xs font-bold">
                    3
                  </span>
                  <h3 className="font-display text-lg font-semibold text-[#171717]">
                    Payment & Settlement Terms
                  </h3>
                </div>

                {isWholesale ? (
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-3.5 border border-[#B7A078] bg-[#B7A078]/10 rounded cursor-pointer">
                      <input
                        type="radio"
                        name="payMethod"
                        value="bank_transfer"
                        checked={formData.paymentMethod === "bank_transfer"}
                        onChange={() => setFormData({ ...formData, paymentMethod: "bank_transfer" })}
                        className="mt-1 accent-[#171717]"
                      />
                      <div>
                        <p className="font-semibold text-xs text-[#171717]">
                          Direct Bank Wire (NEFT / RTGS)
                        </p>
                        <p className="text-[11px] text-[#35383A] mt-0.5">
                          Formal Proforma Invoice generated instantly with HDFC / ICICI Bank clearing coordinates.
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 border border-[#E2E4E6] bg-white rounded cursor-pointer">
                      <input
                        type="radio"
                        name="payMethod"
                        value="net_30"
                        checked={formData.paymentMethod === "net_30"}
                        onChange={() => setFormData({ ...formData, paymentMethod: "net_30" })}
                        className="mt-1 accent-[#171717]"
                      />
                      <div>
                        <p className="font-semibold text-xs text-[#171717]">
                          Commercial Credit Terms (Net 30 Days)
                        </p>
                        <p className="text-[11px] text-[#35383A] mt-0.5">
                          Pre-approved trade revolving credit line active for Aura Luxury Jewels.
                        </p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-3.5 border border-[#171717] bg-[#FAF9F6] rounded cursor-pointer">
                      <input
                        type="radio"
                        name="payMethod"
                        value="razorpay"
                        checked={formData.paymentMethod === "razorpay"}
                        onChange={() => setFormData({ ...formData, paymentMethod: "razorpay" })}
                        className="mt-1 accent-[#171717]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-xs text-[#171717]">
                            Razorpay Secure Online Payment Gateway
                          </p>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                            UPI · Cards · NetBanking
                          </span>
                        </div>
                        <p className="text-[11px] text-[#35383A] mt-0.5">
                          Simulated live integration with server-side signature verification.
                        </p>
                      </div>
                    </label>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-[#171717] text-[#FAF9F6] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#B7A078] transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <span>
                  {isWholesale
                    ? `Issue B2B Order & Proforma (${formatINR(grandTotal)})`
                    : `Pay & Place Order (${formatINR(grandTotal)})`}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E2E4E6] p-8 rounded shadow-xs space-y-5 sticky top-28">
              <h3 className="font-display text-xl font-medium text-[#171717]">
                Order Items ({totalItemCount})
              </h3>

              <div className="divide-y divide-[#E2E4E6] max-h-72 overflow-y-auto pr-1">
                {cartProducts.map(({ product, quantity, unitPrice, lineTotal }) => (
                  <div key={product.slug} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-10 shrink-0 bg-[#E8EAEB] overflow-hidden rounded">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-[#171717] line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-[10px] text-[#35383A]">
                          Qty: {quantity} · {formatINR(unitPrice)} each
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold tabular-nums text-[#171717]">
                      {formatINR(lineTotal)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Coupon Code for Retail */}
              {!isWholesale && (
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (try SILVER10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-[#FAF9F6] border border-[#E2E4E6] px-3 py-2 text-xs outline-none focus:border-[#171717]"
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="px-4 py-2 bg-[#171717] text-white text-xs font-semibold uppercase tracking-wider rounded"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMessage && (
                    <p className={`text-[11px] mt-1 ${couponDiscount > 0 ? "text-emerald-700" : "text-amber-800"}`}>
                      {couponMessage}
                    </p>
                  )}
                </div>
              )}

              <div className="border-t border-[#E2E4E6] pt-4 space-y-2 text-xs text-[#35383A]">
                <div className="flex justify-between">
                  <span>Gross Subtotal</span>
                  <span className="font-semibold text-[#171717] tabular-nums">
                    {formatINR(subtotal)}
                  </span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Promo Discount (SILVER10)</span>
                    <span className="tabular-nums">-{formatINR(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Armored Insured Freight</span>
                  <span className="text-emerald-700 font-semibold">Free Delivery</span>
                </div>
                <div className="flex justify-between">
                  <span>Precious Metals GST (3%)</span>
                  <span className="tabular-nums">{formatINR(taxAmount)}</span>
                </div>
              </div>

              <div className="border-t border-[#E2E4E6] pt-4 flex justify-between items-baseline font-bold text-base text-[#171717]">
                <span>Total Amount</span>
                <span className="text-xl tabular-nums">{formatINR(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {confirmedOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#171717]/75 backdrop-blur-xs" />
          <div className="relative w-full max-w-xl bg-white border border-[#B7A078] p-8 md:p-10 shadow-2xl rounded text-center animate-in zoom-in-95 duration-300">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <p className="eyebrow text-[#B7A078]">
              {isWholesale ? "Wholesale Order Confirmed" : "Order Placed Successfully"}
            </p>
            <h2 className="display-lg mt-2 text-[#171717]">
              {isWholesale ? "Proforma Invoice Dispatched" : "Thank you for choosing SILVERPRISM"}
            </h2>

            <div className="mt-4 p-4 bg-[#FAF9F6] border border-[#E2E4E6] rounded text-left text-xs space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-[#35383A]">Order Reference:</span>
                <span className="font-bold text-[#171717]">{confirmedOrderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#35383A]">Channel:</span>
                <span className="font-semibold text-[#171717] uppercase">
                  {isWholesale ? "B2B Wholesale Partner" : "Retail Customer B2C"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#35383A]">Total Amount:</span>
                <span className="font-bold text-emerald-800">{formatINR(grandTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#35383A]">Shipping to:</span>
                <span className="text-[#171717] truncate max-w-[240px]">
                  {formData.address}, {formData.city} ({formData.pincode})
                </span>
              </div>
            </div>

            <p className="mt-5 text-xs text-[#35383A] leading-relaxed">
              {isWholesale
                ? `An automated GST Proforma invoice and bank wire details have been sent to ${formData.email}. This order is now visible in the SilverPrism Admin fulfillment portal.`
                : `A confirmation receipt with armored courier tracking has been sent to ${formData.email}.`}
            </p>

            <div className="mt-8 pt-6 border-t border-[#E2E4E6] flex flex-col sm:flex-row gap-3">
              <Link
                href="/admin"
                className="flex-1 py-3 bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#B7A078] transition-colors"
              >
                Inspect in Admin Panel
              </Link>
              <Link
                href="/shop"
                className="flex-1 py-3 border border-[#E2E4E6] text-[#171717] text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#E8EAEB] transition-colors"
              >
                Return to Catalogue
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
