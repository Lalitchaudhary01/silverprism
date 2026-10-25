"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Plus,
  Minus,
  ChevronDown,
  ShieldCheck,
  Building2,
  Cpu,
  CheckCircle2,
  FileSpreadsheet,
  Lock,
  Zap,
} from "lucide-react";
import { Product, formatINR, calculateWholesaleItemPrice } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addToCart, toggleWishlist, isWishlisted, userRole, setUserRole, showToast } = useStore();
  const isWholesale = userRole === "wholesale_approved";
  const isPending = userRole === "wholesale_pending";
  const wished = isWishlisted(product.slug);

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id || ""
  );
  const [quantity, setQuantity] = useState(isWholesale ? product.moq : 1);
  const [openAccordion, setOpenAccordion] = useState<string | null>("metallurgy");

  const toggleSection = (id: string) => {
    setOpenAccordion((cur) => (cur === id ? null : id));
  };

  const calculatedWholesaleUnitPrice = calculateWholesaleItemPrice(product, quantity);

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="eyebrow mb-8 text-[#35383A]/70 text-[11px]">
        <Link href="/shop" className="hover:text-[#171717] transition-colors">
          Jewellery Catalogue
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/collections/${product.collection}`}
          className="hover:text-[#171717] transition-colors"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#171717] font-semibold">{product.name}</span>
      </nav>

      {/* Main Grid: Gallery + Specifications */}
      <div className="grid gap-12 lg:grid-cols-12">
        {/* Left: Gallery (Thumbnails + Main) */}
        <div className="lg:col-span-7 grid gap-4 md:grid-cols-[90px_1fr]">
          {/* Thumbnails */}
          <div className="order-2 flex gap-3 md:order-1 md:flex-col">
            {product.images.map((img, idx) => (
              <button
                key={img + idx}
                type="button"
                onClick={() => setSelectedImgIndex(idx)}
                className={`aspect-[4/5] w-20 overflow-hidden border transition-all ${
                  selectedImgIndex === idx
                    ? "border-[#171717] ring-1 ring-[#171717] opacity-100"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Visual */}
          <div className="order-1 md:order-2 aspect-[4/5] overflow-hidden bg-[#E8EAEB] relative">
            <img
              src={product.images[selectedImgIndex]}
              alt={product.name}
              className="h-full w-full object-cover animate-in fade-in duration-400"
            />
            {!product.inStock && (
              <span className="eyebrow absolute top-4 left-4 bg-[#171717]/90 text-white px-3 py-1.5 text-xs">
                Backordered / Custom Production Only
              </span>
            )}
          </div>
        </div>

        {/* Right: Technical Specs & Commerce Operations */}
        <div className="lg:col-span-5">
          <div className="flex items-center justify-between text-xs">
            <span className="eyebrow text-[#B7A078] font-bold">
              {product.category}
            </span>
            <span className="font-mono text-xs text-[#35383A]">
              SKU: {product.sku}
            </span>
          </div>

          <h1 className="mt-3 font-display text-3xl md:text-4xl font-medium leading-tight text-[#171717]">
            {product.name}
          </h1>

          {/* Pricing Matrix (Tri-Mode: Retail / Pending / Approved) */}
          <div className="mt-6 p-5 bg-[#E8EAEB]/40 border border-[#E2E4E6] rounded">
            {isWholesale ? (
              <div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-bold text-[#171717] tabular-nums">
                      {formatINR(calculatedWholesaleUnitPrice)}
                    </span>
                    <span className="ml-2 text-sm text-[#35383A]/70 line-through tabular-nums">
                      {formatINR(product.retailPrice)}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-[#52B788] text-[#081C15] text-[10px] font-bold uppercase tracking-wider rounded">
                    Wholesale B2B Rate
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#35383A]">
                  Factory unit price. Minimum order quantity:{" "}
                  <strong>{product.moq} units</strong>.
                </p>

                {/* Tiered discounts table */}
                {product.volumeDiscounts.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#E2E4E6]">
                    <p className="text-[11px] font-semibold text-[#171717] uppercase tracking-wider mb-2">
                      Volume Discount Tiers (Per Order)
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      {product.volumeDiscounts.map((tier) => (
                        <div
                          key={tier.minQty}
                          className={`p-2 border rounded ${
                            quantity >= tier.minQty
                              ? "bg-[#52B788]/20 border-[#52B788] font-semibold text-[#0C2417]"
                              : "bg-white border-[#E2E4E6] text-[#35383A]"
                          }`}
                        >
                          <p className="text-[10px] text-[#35383A]">
                            {tier.minQty}+ units
                          </p>
                          <p className="text-xs text-[#171717] font-bold">
                            {tier.discountPercent}% Extra Off
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : isPending ? (
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-bold text-[#171717] tabular-nums">
                      {formatINR(product.retailPrice)}
                    </span>
                    <span className="ml-2 text-xs text-[#766F64]">
                      Retail Sample Rate (incl. GST)
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-[#E5A93C] text-[#1A1204] text-[10px] font-bold uppercase tracking-wider rounded flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    <span>Review in Progress</span>
                  </span>
                </div>

                <div className="p-3 bg-[#FFFBF0] border border-[#F2D794] rounded text-xs space-y-2">
                  <div className="flex items-center justify-between text-[#805809]">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5 text-[#D4A359]" />
                      <span>Wholesale B2B Rate: ~{formatINR(product.wholesalePrice)} / unit</span>
                    </span>
                    <span className="font-bold text-[10px] bg-[#FCE8B3] px-2 py-0.5 rounded">
                      Save 45%
                    </span>
                  </div>
                  <p className="text-[11px] text-[#805809]/80 leading-relaxed">
                    Trade Application #APP-8042 is under KYC verification. You can order a 1-piece quality sample at the retail rate, or approve immediately for testing.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setUserRole("wholesale_approved");
                      showToast("🎉 Application approved! Wholesale pricing unlocked.");
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#171717] hover:text-[#805809] underline"
                  >
                    <Zap className="h-3 w-3 fill-current" />
                    <span>⚡ One-Click Instant Approval (Demo)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#171717] tabular-nums">
                    {formatINR(product.retailPrice)}
                  </span>
                  <span className="text-xs text-[#35383A]/70">
                    Inclusive of all taxes & BIS Hallmarking
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#35383A]">
                  Complimentary insured courier delivery across India.
                </p>
              </div>
            )}
          </div>

          <p className="mt-6 text-sm text-[#35383A] leading-relaxed">
            {product.description}
          </p>

          {/* Variant Selection */}
          {product.variants.length > 1 && (
            <div className="mt-6">
              <label className="eyebrow block text-[10px] text-[#35383A] mb-2">
                Select Variant / Size
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`px-4 py-2 text-xs border font-medium transition-all ${
                      selectedVariantId === v.id
                        ? "border-[#171717] bg-[#171717] text-[#FAF9F6]"
                        : "border-[#E2E4E6] bg-white text-[#171717] hover:border-[#171717]"
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Diamond Specs Box (Raul Diamonds Reference) */}
          {product.diamondSpecs && (
            <div className="mt-6 border border-[#E0DBD2] rounded-[3px] bg-white overflow-hidden shadow-xs">
              <div className="bg-[#F7F6F3] px-3.5 py-2 border-b border-[#E0DBD2] flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#786848]">
                  Diamond Specifications · The Standard
                </span>
                <span className="text-[9px] bg-[#B7A078]/20 text-[#171717] px-2 py-0.5 rounded font-semibold">
                  {product.diamondSpecs.certification}
                </span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-y divide-[#EDE9E2] text-xs">
                <div className="p-2.5">
                  <span className="text-[10px] uppercase text-[#888] block">Stone Type</span>
                  <span className="font-semibold text-[#171717]">{product.diamondSpecs.stoneType}</span>
                </div>
                <div className="p-2.5">
                  <span className="text-[10px] uppercase text-[#888] block">Shape</span>
                  <span className="font-semibold text-[#171717]">{product.diamondSpecs.shape}</span>
                </div>
                <div className="p-2.5">
                  <span className="text-[10px] uppercase text-[#888] block">Carat Weight</span>
                  <span className="font-semibold text-[#171717]">{product.diamondSpecs.caratWeight}</span>
                </div>
                <div className="p-2.5">
                  <span className="text-[10px] uppercase text-[#888] block">Color Grade</span>
                  <span className="font-semibold text-[#171717]">{product.diamondSpecs.colorGrade}</span>
                </div>
                <div className="p-2.5">
                  <span className="text-[10px] uppercase text-[#888] block">Clarity</span>
                  <span className="font-semibold text-[#171717]">{product.diamondSpecs.clarityGrade}</span>
                </div>
                <div className="p-2.5">
                  <span className="text-[10px] uppercase text-[#888] block">Cut Grade</span>
                  <span className="font-semibold text-[#171717]">{product.diamondSpecs.cutGrade}</span>
                </div>
              </div>
            </div>
          )}

          {/* Technical Specifications DL */}
          <dl className="mt-6 divide-y divide-[#E2E4E6] border-y border-[#E2E4E6] text-xs">
            <div className="flex justify-between py-2.5">
              <dt className="text-[#35383A]/70">Material & Purity</dt>
              <dd className="font-medium text-[#171717]">{product.material}</dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-[#35383A]/70">Micron Finish</dt>
              <dd className="font-medium text-[#171717]">{product.finish}</dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-[#35383A]/70">Net Weight</dt>
              <dd className="font-medium text-[#171717]">
                {product.netWeightGrams} grams (± 0.2g tolerance)
              </dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-[#35383A]/70">Dimensions</dt>
              <dd className="font-medium text-[#171717]">{product.dimensions}</dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-[#35383A]/70">Stone Specification</dt>
              <dd className="font-medium text-[#171717]">{product.stoneDetails}</dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-[#35383A]/70">Hallmark Certification</dt>
              <dd className="font-medium text-[#786848] font-bold">{product.hallmark}</dd>
            </div>
          </dl>

          {/* Quantity Selector & Action Controls */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Controller */}
              <div className="inline-flex items-center border border-[#E2E4E6] h-12 bg-white px-2">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) =>
                      Math.max(isWholesale ? product.moq : 1, q - (isWholesale ? 5 : 1))
                    )
                  }
                  className="p-2 hover:bg-[#E8EAEB] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-14 text-center text-sm font-semibold tabular-nums outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + (isWholesale ? 5 : 1))}
                  className="p-2 hover:bg-[#E8EAEB] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                type="button"
                onClick={() => addToCart(product.slug, isPending ? 1 : quantity, selectedVariantId)}
                className="flex-1 h-12 bg-[#171717] text-[#FAF9F6] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#B7A078] transition-colors flex items-center justify-center gap-2 shadow cursor-pointer"
              >
                <span>
                  {isWholesale
                    ? `Add Wholesale Batch (${quantity} pcs · ${formatINR(calculatedWholesaleUnitPrice * quantity)})`
                    : isPending
                    ? `Order 1-Pc Sample (${formatINR(product.retailPrice)})`
                    : `Add to Shopping Bag (${formatINR(product.retailPrice * quantity)})`}
                </span>
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.slug)}
                className="h-12 w-12 border border-[#E2E4E6] grid place-items-center bg-white hover:border-[#171717] transition-colors"
                aria-label="Wishlist toggle"
              >
                <Heart
                  className={`h-5 w-5 ${
                    wished ? "fill-[#B7A078] stroke-[#B7A078]" : "stroke-[#171717]"
                  }`}
                />
              </button>
            </div>

            {/* Quick Bulk Quantity Increments in Wholesale Mode */}
            {isWholesale && (
              <div className="flex items-center gap-2 text-xs pt-1">
                <span className="text-[#35383A] text-[11px]">Quick Order:</span>
                {[product.moq, 15, 25, 50].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuantity(num)}
                    className="px-2.5 py-1 bg-[#E8EAEB] text-[#171717] font-semibold text-[11px] rounded hover:bg-[#B7A078] transition-colors"
                  >
                    {num} units
                  </button>
                ))}
              </div>
            )}

            {/* Raul Diamonds Trust Guarantee Strip */}
            <div className="mt-5 pt-4 border-t border-[#E2E4E6] grid grid-cols-2 gap-2.5 text-[10px] md:text-[11px] uppercase tracking-wider text-[#171717] font-semibold">
              <div className="flex items-center gap-2">
                <span className="text-[#B7A078] text-[9px]">◆</span>
                <span>IGI Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#B7A078] text-[9px]">◆</span>
                <span>Free Insured Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#B7A078] text-[9px]">◆</span>
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#B7A078] text-[9px]">◆</span>
                <span>Lifetime Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#B7A078] text-[9px]">◆</span>
                <span>Price Match</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#B7A078] text-[9px]">◆</span>
                <span>Free Resizing</span>
              </div>
            </div>
          </div>

          {/* Technical Accordions */}
          <div className="mt-12 divide-y divide-[#E2E4E6] border-t border-[#E2E4E6]">
            {/* Metallurgy */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => toggleSection("metallurgy")}
                className="w-full flex items-center justify-between text-left py-1"
              >
                <span className="eyebrow text-[#171717]">
                  Metallurgy & Manufacturing Process
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openAccordion === "metallurgy" ? "rotate-180 text-[#B7A078]" : ""
                  }`}
                />
              </button>
              {openAccordion === "metallurgy" && (
                <p className="mt-3 text-xs text-[#35383A] leading-relaxed">
                  Engineered using high-density induction vacuum casting to eliminate internal
                  porosity. Plated with a minimum of 2.0 microns hard white rhodium and sealed
                  with anti-tarnish e-coating to resist oxidation.
                </p>
              )}
            </div>

            {/* Wholesale & OEM */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => toggleSection("wholesale")}
                className="w-full flex items-center justify-between text-left py-1"
              >
                <span className="eyebrow text-[#171717]">
                  Wholesale Supply & OEM Customization
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openAccordion === "wholesale" ? "rotate-180 text-[#B7A078]" : ""
                  }`}
                />
              </button>
              {openAccordion === "wholesale" && (
                <p className="mt-3 text-xs text-[#35383A] leading-relaxed">
                  Wholesale partners may request custom metal alloy finishes (18K Yellow Gold
                  Vermeil, Rose Gold, or Black Ruthenium) and custom laser engraved logos for
                  orders above 25 units.
                </p>
              )}
            </div>

            {/* Logistics */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => toggleSection("logistics")}
                className="w-full flex items-center justify-between text-left py-1"
              >
                <span className="eyebrow text-[#171717]">
                  Armored Shipping & Insurance
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openAccordion === "logistics" ? "rotate-180 text-[#B7A078]" : ""
                  }`}
                />
              </button>
              {openAccordion === "logistics" && (
                <p className="mt-3 text-xs text-[#35383A] leading-relaxed">
                  Every order is packed in tamper-evident security parcels and shipped via
                  armored priority courier with door-to-door transit insurance. Dispatch within
                  2–4 business days.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-32 pt-16 border-t border-[#E2E4E6]">
          <div className="flex justify-between items-end pb-8">
            <div>
              <p className="eyebrow text-[#B7A078]">Coordinating Designs</p>
              <h2 className="display-lg mt-2 text-[#171717]">Complementary Pieces</h2>
            </div>
            <Link href="/shop" className="link-silver text-[#171717]">
              View All Catalogue
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:gap-x-8 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
