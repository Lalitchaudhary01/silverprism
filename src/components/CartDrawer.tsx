"use client";

import React from "react";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatINR } from "@/data/products";

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
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

  if (!isCartOpen) return null;

  const isWholesale = userRole === "wholesale_approved";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#171717]/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] text-[#171717] flex flex-col shadow-2xl border-l border-[#E2E4E6] animate-in slide-in-from-right duration-500">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E4E6]">
            <div>
              <h2 className="font-display text-2xl font-medium">
                Shopping Bag ({totalItemCount})
              </h2>
              {isWholesale && (
                <p className="text-[11px] text-[#B7A078] font-medium mt-0.5">
                  B2B Wholesale Channel Active
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1 hover:text-[#B7A078] transition-colors"
              aria-label="Close cart"
            >
              <X className="h-6 w-6 stroke-[1.25]" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {cartProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <p className="font-display text-2xl font-light">Your bag is empty</p>
                <p className="mt-2 text-sm text-[#35383A]">
                  Discover pieces engineered with precision.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6"
                >
                  <Link
                    href="/shop"
                    className="inline-block px-7 py-3 bg-[#171717] text-[#FAF9F6] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#B7A078] transition-colors"
                  >
                    Explore Catalogue
                  </Link>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Wholesale alert if MOQ not met */}
                {isWholesale && !allMoqSatisfied && (
                  <div className="p-3 bg-amber-50 border border-amber-300 text-amber-800 text-xs flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">MOQ Requirement Notice</p>
                      <p className="text-[11px] mt-0.5">
                        Some items do not meet minimum order quantities. Please adjust to continue wholesale checkout.
                      </p>
                    </div>
                  </div>
                )}

                <ul className="divide-y divide-[#E2E4E6]">
                  {cartProducts.map(({ product, quantity, unitPrice, lineTotal, moqMet, variantName }) => (
                    <li key={product.slug} className="py-5 flex gap-4">
                      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-[#E8EAEB]">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <p className="eyebrow text-[9.5px] text-[#B7A078]">
                                {product.category} · {product.sku}
                              </p>
                              <h4 className="font-display text-base font-medium mt-0.5">
                                <Link
                                  href={`/product/${product.slug}`}
                                  onClick={() => setIsCartOpen(false)}
                                  className="hover:text-[#B7A078] transition-colors"
                                >
                                  {product.name}
                                </Link>
                              </h4>
                              {variantName && (
                                <p className="text-[11px] text-[#35383A] mt-0.5">
                                  Variant: {variantName}
                                </p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(product.slug)}
                              className="text-[#35383A]/60 hover:text-[#171717] p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="text-sm font-semibold tabular-nums">
                              {formatINR(unitPrice)}
                            </span>
                            {isWholesale && (
                              <span className="text-[11px] text-[#35383A]/60 line-through tabular-nums">
                                {formatINR(product.retailPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity and MOQ warning */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-[#E2E4E6] bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.slug, quantity - 1)}
                              className="p-1.5 hover:bg-[#E8EAEB] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-xs tabular-nums font-medium">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.slug, quantity + 1)}
                              className="p-1.5 hover:bg-[#E8EAEB] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <span className="text-sm font-medium tabular-nums">
                            {formatINR(lineTotal)}
                          </span>
                        </div>

                        {/* Wholesale MOQ indicator */}
                        {isWholesale && (
                          <div className="mt-1.5 text-[10px]">
                            {moqMet ? (
                              <span className="text-emerald-700 flex items-center gap-1 font-medium">
                                <CheckCircle2 className="h-3 w-3" /> MOQ of {product.moq} met
                              </span>
                            ) : (
                              <span className="text-amber-700 font-semibold">
                                Min MOQ is {product.moq} units ({product.moq - quantity} needed)
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer Summary */}
          {cartProducts.length > 0 && (
            <div className="border-t border-[#E2E4E6] px-6 py-5 bg-[#E8EAEB]/40 space-y-4">
              {isWholesale && wholesaleSavings > 0 && (
                <div className="p-3 bg-[#B7A078]/15 border border-[#B7A078]/30 text-[#171717] rounded text-xs flex justify-between items-center">
                  <span className="font-medium">Total B2B Savings:</span>
                  <span className="font-bold text-[#B7A078] tabular-nums">
                    {formatINR(wholesaleSavings)} saved
                  </span>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-[#35383A]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#171717] tabular-nums text-sm">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Shipping & Armored Freight</span>
                  <span className="text-emerald-700 font-medium">Complimentary Insured</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>GST (3% Precious Metals)</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={(e) => {
                    if (isWholesale && !allMoqSatisfied) {
                      e.preventDefault();
                      alert("Please fulfill minimum order quantities (MOQ) before proceeding to wholesale checkout.");
                      return;
                    }
                    setIsCartOpen(false);
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-all ${
                    isWholesale && !allMoqSatisfied
                      ? "bg-[#35383A]/40 text-[#FAF9F6] cursor-not-allowed"
                      : "bg-[#171717] text-[#FAF9F6] hover:bg-[#B7A078]"
                  }`}
                >
                  <span>
                    {isWholesale ? "Proceed to B2B Checkout" : "Proceed to Checkout"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full block text-center py-2.5 border border-[#E2E4E6] text-xs uppercase tracking-[0.18em] text-[#35383A] hover:border-[#171717] hover:text-[#171717] transition-colors"
                >
                  View Full Cart & Volume Breakdown
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
