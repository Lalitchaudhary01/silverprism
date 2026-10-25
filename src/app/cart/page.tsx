"use client";

import React from "react";
import Link from "next/link";
import { Plus, Minus, Trash2, ArrowRight, AlertCircle, CheckCircle2, Building2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatINR } from "@/data/products";

export default function CartPage() {
  const {
    cartProducts,
    updateQuantity,
    removeFromCart,
    subtotal,
    retailComparisonSubtotal,
    wholesaleSavings,
    totalItemCount,
    allMoqSatisfied,
    userRole,
  } = useStore();

  const isWholesale = userRole === "wholesale_approved";

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
      {/* Header */}
      <div className="pb-8 border-b border-[#E2E4E6] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="eyebrow text-[#B7A078]">Order Summary</p>
            {isWholesale && (
              <span className="px-2 py-0.5 bg-[#B7A078] text-[#171717] text-[10px] uppercase font-bold tracking-wider rounded">
                B2B Wholesale Channel
              </span>
            )}
          </div>
          <h1 className="display-lg mt-2 text-[#171717]">Your Shopping Bag</h1>
        </div>
        <p className="eyebrow text-[#35383A]">
          {totalItemCount} {totalItemCount === 1 ? "Item" : "Total Units"}
        </p>
      </div>

      {cartProducts.length === 0 ? (
        <div className="py-24 text-center border-b border-[#E2E4E6]">
          <p className="font-display text-3xl font-light text-[#171717]">
            Your shopping bag is empty
          </p>
          <p className="mt-3 text-sm text-[#35383A]">
            Discover fine sterling silver jewellery crafted with manufacturing precision.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block px-8 py-3.5 bg-[#171717] text-[#FAF9F6] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#B7A078] transition-colors"
          >
            Explore Catalogue
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid gap-16 lg:grid-cols-12">
          {/* Cart Table */}
          <div className="lg:col-span-8 space-y-6">
            {/* MOQ Banner if Wholesale */}
            {isWholesale && !allMoqSatisfied && (
              <div className="p-4 bg-amber-50 border border-amber-300 text-amber-900 rounded flex items-start gap-3 text-xs">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Wholesale MOQ Threshold Notice</h4>
                  <p className="mt-1 text-xs">
                    Wholesale factory pricing requires meeting the Minimum Order Quantity (MOQ)
                    specified for each design. Please update item quantities below to proceed to B2B checkout.
                  </p>
                </div>
              </div>
            )}

            <div className="divide-y divide-[#E2E4E6] border-y border-[#E2E4E6]">
              {cartProducts.map(({ product, quantity, unitPrice, retailUnitPrice, lineTotal, moqMet, variantName }) => (
                <div
                  key={product.slug}
                  className="py-6 flex flex-col sm:flex-row gap-6 items-start justify-between"
                >
                  <div className="flex gap-5 items-start">
                    <div className="h-28 w-24 shrink-0 bg-[#E8EAEB] overflow-hidden rounded">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="eyebrow text-[#B7A078] text-[9.5px]">
                          {product.category}
                        </span>
                        <span className="font-mono text-xs text-[#35383A]/70">
                          {product.sku}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-medium mt-1 text-[#171717]">
                        <Link
                          href={`/product/${product.slug}`}
                          className="hover:text-[#B7A078] transition-colors"
                        >
                          {product.name}
                        </Link>
                      </h3>
                      {variantName && (
                        <p className="text-xs text-[#35383A] mt-0.5">
                          Variant: {variantName}
                        </p>
                      )}
                      <p className="text-xs text-[#35383A] mt-1">
                        {product.material} ({product.netWeightGrams}g)
                      </p>

                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-base font-bold text-[#171717] tabular-nums">
                          {formatINR(unitPrice)} / unit
                        </span>
                        {isWholesale && (
                          <span className="text-xs text-[#35383A]/60 line-through tabular-nums">
                            {formatINR(retailUnitPrice)} MSRP
                          </span>
                        )}
                      </div>

                      {/* Wholesale MOQ indicator */}
                      {isWholesale && (
                        <div className="mt-2 text-xs">
                          {moqMet ? (
                            <span className="text-emerald-700 flex items-center gap-1 font-medium text-[11px]">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Minimum order of {product.moq} units satisfied
                            </span>
                          ) : (
                            <span className="text-amber-800 font-semibold text-[11px] bg-amber-100 px-2 py-0.5 rounded">
                              MOQ is {product.moq} pcs (Add {product.moq - quantity} more)
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                    <div className="inline-flex items-center border border-[#E2E4E6] bg-white h-10 px-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.slug, quantity - 1)}
                        className="p-1 hover:bg-[#E8EAEB] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-10 text-center text-xs font-semibold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.slug, quantity + 1)}
                        className="p-1 hover:bg-[#E8EAEB] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-base font-bold text-[#171717] tabular-nums">
                        {formatINR(lineTotal)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.slug)}
                        className="text-xs text-[#35383A]/70 hover:text-red-600 transition-colors mt-2 flex items-center gap-1 sm:ml-auto"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-[#E2E4E6] p-8 rounded shadow-xs space-y-6 sticky top-28">
              <h3 className="font-display text-2xl font-medium text-[#171717]">
                Order Calculation
              </h3>

              {isWholesale && wholesaleSavings > 0 && (
                <div className="p-4 bg-[#B7A078]/15 border border-[#B7A078]/40 rounded text-xs space-y-1">
                  <p className="font-semibold text-[#171717]">
                    Wholesale B2B Discount Applied:
                  </p>
                  <p className="text-base font-bold text-[#B7A078] tabular-nums">
                    {formatINR(wholesaleSavings)} Total Savings
                  </p>
                  <p className="text-[10px] text-[#35383A]">
                    Compared to Retail Consumer MSRP ({formatINR(retailComparisonSubtotal)})
                  </p>
                </div>
              )}

              <div className="space-y-3 text-xs text-[#35383A] border-b border-[#E2E4E6] pb-5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#171717] tabular-nums text-sm">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Armored Insured Shipping</span>
                  <span className="text-emerald-700 font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (3% Silver)</span>
                  <span className="font-medium tabular-nums">
                    {formatINR(Math.round(subtotal * 0.03))}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-base font-bold text-[#171717] pt-1">
                <span>Total Payable</span>
                <span className="text-xl tabular-nums">
                  {formatINR(subtotal + Math.round(subtotal * 0.03))}
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={(e) => {
                  if (isWholesale && !allMoqSatisfied) {
                    e.preventDefault();
                    alert("Please satisfy minimum order quantities before proceeding.");
                  }
                }}
                className={`w-full flex items-center justify-center gap-2 py-4 text-xs uppercase tracking-[0.2em] font-bold transition-all shadow ${
                  isWholesale && !allMoqSatisfied
                    ? "bg-[#35383A]/40 text-[#FAF9F6] cursor-not-allowed"
                    : "bg-[#171717] text-[#FAF9F6] hover:bg-[#B7A078]"
                }`}
              >
                <span>
                  {isWholesale ? "Proceed to Wholesale B2B Checkout" : "Proceed to Checkout"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <p className="text-[11px] text-[#35383A]/70 text-center leading-relaxed">
                {isWholesale
                  ? "B2B payment terms: Bank Transfer / NEFT or approved Net 30 days."
                  : "Secure simulated payment powered by Razorpay. 100% money-back guarantee."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
