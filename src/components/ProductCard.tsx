"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Layers, ShieldCheck, Lock } from "lucide-react";
import { Product, formatINR } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted, userRole } = useStore();
  const wished = isWishlisted(product.slug);
  const isWholesale = userRole === "wholesale_approved";
  const isPending = userRole === "wholesale_pending";

  return (
    <article className="group relative flex flex-col justify-between">
      <div>
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#E8EAEB]">
          <Link
            href={`/product/${product.slug}`}
            aria-label={product.name}
            className="block h-full w-full relative"
          >
            {/* Main Image */}
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover img-zoom group-hover:scale-[1.03]"
            />

            {/* Secondary Hover Image */}
            {product.images[1] && (
              <img
                src={product.images[1]}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
            )}
          </Link>

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
            {!product.inStock && (
              <span className="eyebrow bg-[#171717]/90 text-[#FAF9F6] px-2.5 py-1 text-[9px]">
                Sold out
              </span>
            )}
            {product.isNew && product.inStock && (
              <span className="eyebrow bg-[#FAF9F6]/95 text-[#171717] px-2.5 py-1 text-[9px] shadow-xs">
                New Design
              </span>
            )}
            {isWholesale && (
              <span className="eyebrow bg-[#52B788] text-[#081C15] px-2.5 py-1 text-[9px] font-bold shadow-xs">
                MOQ: {product.moq} pcs · B2B Active
              </span>
            )}
            {isPending && (
              <span className="eyebrow bg-[#E5A93C] text-[#1A1204] px-2.5 py-1 text-[9px] font-bold shadow-xs flex items-center gap-1">
                <Lock className="h-2.5 w-2.5" />
                <span>B2B Review</span>
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => toggleWishlist(product.slug)}
            aria-pressed={wished}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center text-[#171717] bg-[#FAF9F6]/85 backdrop-blur-xs transition-transform hover:scale-110 z-10 rounded-full shadow-xs"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                wished ? "fill-[#B7A078] stroke-[#B7A078]" : "stroke-[#171717]"
              }`}
            />
          </button>

          {/* Quick Add Button */}
          {product.inStock && (
            <button
              type="button"
              onClick={() => addToCart(product.slug, isWholesale ? product.moq : 1)}
              className="eyebrow absolute inset-x-3 bottom-3 flex h-11 items-center justify-center gap-2 bg-[#FAF9F6]/95 text-[#171717] opacity-0 translate-y-2 transition-all duration-400 hover:bg-[#171717] hover:text-[#FAF9F6] group-hover:opacity-100 group-hover:translate-y-0 focus-visible:opacity-100 max-md:opacity-100 max-md:translate-y-0 z-10 shadow-sm cursor-pointer"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>
                {isWholesale
                  ? `Quick Add (MOQ ${product.moq})`
                  : isPending
                  ? "Order 1-Pc Sample"
                  : "Quick Add to Bag"}
              </span>
            </button>
          )}
        </div>

        {/* Product Meta */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-[#35383A]">
            <span className="eyebrow text-[#B7A078] text-[9.5px]">
              {product.category}
            </span>
            <span className="font-mono text-[10px] text-[#35383A]/70">
              {product.sku}
            </span>
          </div>

          <h3 className="mt-1 font-display text-lg leading-tight font-medium">
            <Link
              href={`/product/${product.slug}`}
              className="hover:text-[#B7A078] transition-colors"
            >
              {product.name}
            </Link>
          </h3>

          <p className="mt-1 text-xs text-[#35383A] line-clamp-1">
            {product.material} · {product.finish}
          </p>
        </div>
      </div>

      {/* Pricing Section (Tri-Mode: Retail / Pending / Approved) */}
      <div className="mt-3 pt-3 border-t border-[#E2E4E6] flex items-baseline justify-between">
        {isWholesale ? (
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-[#171717] tabular-nums">
                {formatINR(product.wholesalePrice)}
              </span>
              <span className="text-xs text-[#35383A]/60 line-through tabular-nums">
                {formatINR(product.retailPrice)}
              </span>
            </div>
            <p className="text-[10px] text-[#52B788] font-bold">
              Wholesale B2B Rate (excl. GST)
            </p>
          </div>
        ) : isPending ? (
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-medium text-[#171717] tabular-nums">
                {formatINR(product.retailPrice)}
              </span>
              <span className="text-[10px] text-[#766F64]">Retail</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-[#996D14] font-medium mt-0.5">
              <Lock className="h-2.5 w-2.5 shrink-0" />
              <span>Wholesale: ~{formatINR(product.wholesalePrice)} (Pending)</span>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-base font-medium text-[#171717] tabular-nums">
              {formatINR(product.retailPrice)}
            </span>
            <p className="text-[10px] text-[#35383A]/60">
              Retail Price · incl. GST
            </p>
          </div>
        )}

        <span className="text-[10px] text-[#35383A]/70">
          {product.netWeightGrams}g 925
        </span>
      </div>
    </article>
  );
}
