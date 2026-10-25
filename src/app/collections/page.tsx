import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { COLLECTIONS, getProductsByCollection } from "@/data/products";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Collections Archive — 925 Sterling Silver | SILVERPRISM",
  description:
    "Explore the signature sterling silver collections from SILVERPRISM manufacturing. Sculpted silver, geometric prisms, bridal heirlooms, and minimalist staples.",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
      {/* Header */}
      <header className="max-w-3xl pb-12 border-b border-[#E2E4E6]">
        <p className="eyebrow text-[#B7A078]">The Silver Archives</p>
        <h1 className="display-lg mt-3 text-[#171717]">Signature Collections</h1>
        <p className="mt-4 text-sm md:text-base text-[#35383A] leading-relaxed font-light">
          Each SILVERPRISM collection embodies a distinct design philosophy, precision-engineered
          using solid 925 deoxidized silver grain and protected by anti-tarnish rhodium barrier coating.
        </p>
      </header>

      {/* Collections Stack */}
      <div className="mt-16 space-y-20">
        {COLLECTIONS.map((col, idx) => {
          const isReversed = idx % 2 === 1;
          const products = getProductsByCollection(col.slug);

          return (
            <Reveal key={col.slug}>
              <div
                className={`grid gap-12 lg:grid-cols-12 items-center ${
                  isReversed ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Visual */}
                <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#E8EAEB] [direction:ltr]">
                  <Link href={`/collections/${col.slug}`} className="block h-full group">
                    <img
                      src={col.image}
                      alt={col.title}
                      className="h-full w-full object-cover img-zoom group-hover:scale-[1.03]"
                    />
                  </Link>
                </div>

                {/* Information */}
                <div className="lg:col-span-5 [direction:ltr]">
                  <span className="font-display text-2xl text-[#B7A078] font-bold">
                    {col.num}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-medium mt-2 text-[#171717]">
                    <Link
                      href={`/collections/${col.slug}`}
                      className="hover:text-[#B7A078] transition-colors"
                    >
                      {col.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-sm text-[#35383A] leading-relaxed">
                    {col.description}
                  </p>

                  <div className="mt-6 flex items-center gap-6 text-xs text-[#35383A]/70 uppercase tracking-widest font-sans">
                    <span>{products.length} Active SKUs</span>
                    <span>•</span>
                    <span>Retail & Wholesale</span>
                  </div>

                  <div className="mt-8">
                    <Link
                      href={`/collections/${col.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#171717] text-[#FAF9F6] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#B7A078] transition-colors"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
