import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Cpu,
  Gem,
  CheckCircle2,
  Sparkles,
  Layers,
} from "lucide-react";
import { COLLECTIONS, PRODUCTS, MANUFACTURING_CAPABILITIES } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 8);

  return (
    <>
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[92vh] flex items-center bg-[#171717] text-[#FAF9F6] overflow-hidden">
        {/* Background Visual */}
        <img
          src="/assets/hero.jpg"
          alt="Sterling silver fine jewellery campaign"
          className="absolute inset-0 h-full w-full object-cover object-[35%_center] opacity-80 animate-slow-zoom"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--scrim-hero)" }}
        />

        <div className="relative mx-auto flex h-full w-full max-w-[1440px] items-center px-6 py-28 md:px-12 md:py-36">
          <div className="max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xs border border-white/20 text-[#B7A078] text-[10px] uppercase tracking-[0.25em] font-medium mb-6">
              <Sparkles className="h-3 w-3" />
              <span>Haute Joaillerie & Manufacturing</span>
            </div>

            <h1 className="display-xl text-[#FAF9F6] font-normal leading-[0.98]">
              BEYOND ORDINARY.
              <br />
              <span className="text-[#C8CBCD] font-light italic">
                CRAFTED TO LAST.
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-[#C8CBCD] text-base md:text-lg leading-relaxed font-light">
              Discover thoughtfully designed sterling silver jewellery, backed by
              integrated manufacturing expertise and an uncompromising commitment to
              structural detail.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="px-8 py-4 bg-[#FAF9F6] text-[#171717] text-xs uppercase tracking-[0.2em] font-semibold transition-all hover:bg-[#B7A078] hover:text-[#171717] shadow-lg flex items-center gap-2"
              >
                <span>Explore Collections</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/for-retailers"
                className="px-8 py-4 border border-white/30 text-[#FAF9F6] text-xs uppercase tracking-[0.2em] font-medium transition-all hover:border-white hover:bg-white/10 flex items-center gap-2"
              >
                <Building2 className="h-4 w-4 text-[#B7A078]" />
                <span>Partner with Us (B2B)</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom subtle detail indicator */}
        <div className="absolute bottom-6 left-6 md:left-12 hidden sm:flex items-center gap-4 text-xs text-[#C8CBCD]/60 tracking-[0.2em] uppercase font-sans">
          <span>925 Hallmarked</span>
          <span className="text-[#B7A078]">•</span>
          <span>Zero-Porosity Cast</span>
          <span className="text-[#B7A078]">•</span>
          <span>B2C & B2B Dual Commerce</span>
        </div>
      </section>

      {/* 2. Brand Trust Strip */}
      <section className="border-b border-[#E2E4E6] bg-white py-10 px-6 md:px-12">
        <div className="mx-auto max-w-[1440px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 shrink-0 rounded-full bg-[#171717] text-[#B7A078] flex items-center justify-center">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-display text-base font-semibold text-[#171717]">
                Manufacturing Expertise
              </h4>
              <p className="mt-1 text-xs text-[#35383A] leading-relaxed">
                Induction vacuum casting, 25-micron DLP printing, and multi-stage hand polishing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 shrink-0 rounded-full bg-[#171717] text-[#B7A078] flex items-center justify-center">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-display text-base font-semibold text-[#171717]">
                Retail & Wholesale
              </h4>
              <p className="mt-1 text-xs text-[#35383A] leading-relaxed">
                Single unified catalogue powering both individual consumers and bulk B2B retailer accounts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 shrink-0 rounded-full bg-[#171717] text-[#B7A078] flex items-center justify-center">
              <Gem className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-display text-base font-semibold text-[#171717]">
                Custom Design Capabilities
              </h4>
              <p className="mt-1 text-xs text-[#35383A] leading-relaxed">
                OEM/ODM private-label development with guaranteed mold exclusivity and NDA compliance.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 shrink-0 rounded-full bg-[#171717] text-[#B7A078] flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-display text-base font-semibold text-[#171717]">
                Secure Ordering & Logistics
              </h4>
              <p className="mt-1 text-xs text-[#35383A] leading-relaxed">
                Server-side verified checkout with Razorpay and 100% insured armored courier transit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Collection */}
      <section className="mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-[#E2E4E6]">
          <div>
            <p className="eyebrow text-[#B7A078]">The Silver Archives</p>
            <h2 className="display-lg mt-3 text-[#171717]">Shop by Collection</h2>
          </div>
          <p className="text-sm text-[#35383A] max-w-sm">
            Curated silhouettes engineered to showcase the tactile depth of solid 925 sterling silver.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS.map((col, idx) => (
            <Reveal key={col.slug} delay={idx * 80}>
              <Link
                href={`/collections/${col.slug}`}
                className="group block overflow-hidden bg-white border border-[#E2E4E6] hover:border-[#171717] transition-colors"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#E8EAEB] relative">
                  <img
                    src={col.image}
                    alt={col.title}
                    loading="lazy"
                    className="h-full w-full object-cover img-zoom group-hover:scale-[1.04]"
                  />
                  <span className="eyebrow absolute top-4 left-4 bg-[#171717]/80 text-[#FAF9F6] px-2.5 py-1 text-[9px]">
                    {col.num}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-medium group-hover:text-[#B7A078] transition-colors">
                    {col.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#35383A] line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#E2E4E6] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#35383A]/70">
                      {col.pieceCount} pieces
                    </span>
                    <span className="link-silver text-[#171717]">Explore</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. Featured Pieces (Live Dual-Channel Grid) */}
      <section className="bg-white border-y border-[#E2E4E6] py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-[#E2E4E6]">
            <div>
              <p className="eyebrow text-[#B7A078]">Selected Inventory</p>
              <h2 className="display-lg mt-3 text-[#171717]">Featured Pieces</h2>
              <p className="mt-2 text-xs text-[#35383A]">
                Sample inventory for demonstration — live retail & wholesale calculations.
              </p>
            </div>
            <Link
              href="/shop"
              className="px-6 py-3 border border-[#171717] text-xs uppercase tracking-[0.2em] font-semibold text-[#171717] hover:bg-[#171717] hover:text-[#FAF9F6] transition-all self-start md:self-auto"
            >
              View Complete Catalogue
            </Link>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:gap-x-8 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Manufacturing Showcase: "FROM CONCEPT TO CRAFTSMANSHIP" */}
      <section className="bg-[#171717] text-[#FAF9F6] py-24 md:py-36">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="grid gap-16 lg:grid-cols-12 items-center">
            {/* Left Content */}
            <Reveal className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-[#B7A078] text-xs uppercase tracking-[0.25em] font-medium">
                <Cpu className="h-4 w-4" />
                <span>State-of-the-Art Production</span>
              </div>

              <h2 className="display-lg font-normal leading-[1.05]">
                FROM CONCEPT
                <br />
                <span className="text-[#B7A078] italic">TO CRAFTSMANSHIP.</span>
              </h2>

              <p className="text-sm md:text-base text-[#C8CBCD] leading-relaxed max-w-xl font-light">
                SILVERPRISM operates an integrated jewellery atelier and mass production
                facility. We provide international retail brands and private labels with
                reliable metallurgical casting, rapid 3D CAD prototyping, and certified
                micron plating.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "OEM / ODM Private Labeling",
                  "25-Micron DLP Wax Printing",
                  "Vacuum Pressure Induction Casting",
                  "Micro-Pavé Stereo Hand Setting",
                  "Anti-Tarnish Rhodium Micron Plating",
                  "BIS Laser Hallmarking Guarantee",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-[#FAF9F6]">
                    <CheckCircle2 className="h-4 w-4 text-[#B7A078] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  href="/manufacturing"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#B7A078] text-[#171717] text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors"
                >
                  <span>Explore Manufacturing</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            {/* Right Visual Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] overflow-hidden bg-[#25282A]">
                <img
                  src="/assets/story.jpg"
                  alt="Jewellery master artisan bench"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-[4/5] overflow-hidden bg-[#25282A] mt-8">
                <img
                  src="/assets/detail.jpg"
                  alt="Precision stone setting under microscope"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. B2B Partnership Section: "BUILT FOR BUSINESSES THAT AIM HIGHER" */}
      <section className="bg-[#FAF9F6] py-24 md:py-36 border-b border-[#E2E4E6]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="bg-[#1C1F21] text-[#FAF9F6] p-8 md:p-16 border border-[#2A2D2F] relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-[#B7A078]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-2xl">
              <p className="eyebrow text-[#B7A078]">Wholesale Trade Portal</p>
              <h2 className="display-lg mt-4 text-[#FAF9F6] leading-[1.08]">
                BUILT FOR BUSINESSES
                <br />
                THAT AIM HIGHER.
              </h2>
              <p className="mt-6 text-sm text-[#C8CBCD] leading-relaxed">
                Whether you are an independent fine jewellery boutique, an established
                department store, or an e-commerce jewellery label, SilverPrism gives you
                direct factory wholesale rates, low minimum order quantities, and custom packaging.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-6">
                <div>
                  <p className="text-2xl font-display text-[#B7A078]">35%–50%</p>
                  <p className="text-xs text-[#C8CBCD] mt-1">Below Retail MSRP Margins</p>
                </div>
                <div>
                  <p className="text-2xl font-display text-[#B7A078]">Low MOQ</p>
                  <p className="text-xs text-[#C8CBCD] mt-1">Starting from 5 units per SKU</p>
                </div>
                <div>
                  <p className="text-2xl font-display text-[#B7A078]">Net 30 Terms</p>
                  <p className="text-xs text-[#C8CBCD] mt-1">Available for verified retailers</p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/for-retailers"
                  className="px-8 py-4 bg-[#B7A078] text-[#171717] text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors"
                >
                  Apply for a Wholesale Account
                </Link>
                <Link
                  href="/shop"
                  className="px-8 py-4 border border-white/30 text-white text-xs uppercase tracking-[0.2em] font-medium hover:border-white transition-colors"
                >
                  Browse Wholesale Catalogue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
