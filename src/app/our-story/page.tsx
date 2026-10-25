import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, ShieldCheck, Gem, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story — Metallurgical Precision & Craft | SILVERPRISM",
  description:
    "Learn how SILVERPRISM fuses contemporary luxury jewellery design with industrial manufacturing integrity, certified BIS hallmarking, and responsible metallurgy.",
};

export default function OurStoryPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
      {/* Header */}
      <header className="max-w-4xl pb-12 border-b border-[#E2E4E6]">
        <p className="eyebrow text-[#B7A078]">The Silver House</p>
        <h1 className="display-xl mt-4 text-[#171717] font-normal leading-[1.02]">
          METALLURGICAL PRECISION.
          <br />
          <span className="text-[#B7A078] italic">TIMELESS DEVOTION.</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-[#35383A] leading-relaxed font-light">
          SILVERPRISM was founded to bridge the divide between master jewellery artistry
          and industrial manufacturing reliability. We craft sterling silver pieces that
          carry the weight of heirloom objects, built to accompany modern life without
          compromising structural integrity.
        </p>
      </header>

      {/* Campaign Visual Banner */}
      <div className="mt-16 aspect-[21/9] overflow-hidden bg-[#171717] rounded">
        <img
          src="/assets/campaign.jpg"
          alt="SilverPrism campaign portrait"
          className="h-full w-full object-cover object-[center_35%]"
        />
      </div>

      {/* Dual Story Narrative */}
      <div className="mt-20 grid gap-16 lg:grid-cols-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="eyebrow text-[#B7A078]">The Atelier Philosophy</span>
          <h2 className="display-lg text-[#171717]">
            Rethinking Sterling Silver
          </h2>
          <p className="text-sm text-[#35383A] leading-relaxed">
            Silver is too often treated as an ephemeral fashion metal. At SilverPrism,
            we cast with the same rigorous tolerances applied to platinum and fine gold.
            Every grain of metal is certified 92.5% pure, alloyed with oxygen-free
            master deoxidizers to resist internal fire-scale and micro-porosity.
          </p>
          <p className="text-sm text-[#35383A] leading-relaxed">
            Our multi-tank electroplating plant seals each creation in up to 2.5 microns
            of hard rhodium and gold vermeil, ensuring that our silver shines with
            the deep, cold brilliance of fine jewellery.
          </p>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="aspect-[4/5] overflow-hidden bg-[#E8EAEB] rounded">
            <img
              src="/assets/story.jpg"
              alt="Artisan at jewellery workbench"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-[#E8EAEB] rounded mt-8">
            <img
              src="/assets/detail.jpg"
              alt="Hand setting stones under microscope"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="mt-24 p-8 md:p-14 bg-white border border-[#E2E4E6] rounded">
        <h3 className="font-display text-2xl font-medium text-[#171717] mb-8">
          The SilverPrism Standards
        </h3>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl text-[#B7A078]">01</p>
            <h4 className="font-display text-lg font-semibold mt-1 text-[#171717]">
              Zero-Porosity Metallurgy
            </h4>
            <p className="text-xs text-[#35383A] mt-2 leading-relaxed">
              Using computerized German vacuum induction casting machines, our castings
              achieve maximum metallurgical density, eliminating surface pinholes.
            </p>
          </div>

          <div>
            <p className="font-display text-2xl text-[#B7A078]">02</p>
            <h4 className="font-display text-lg font-semibold mt-1 text-[#171717]">
              Certified BIS Hallmarking
            </h4>
            <p className="text-xs text-[#35383A] mt-2 leading-relaxed">
              Every production batch undergoes X-Ray Fluorescence (XRF) spectrometer
              assays to guarantee precise 925 fineness before receiving laser hallmarks.
            </p>
          </div>

          <div>
            <p className="font-display text-2xl text-[#B7A078]">03</p>
            <h4 className="font-display text-lg font-semibold mt-1 text-[#171717]">
              Dual-Channel Transparency
            </h4>
            <p className="text-xs text-[#35383A] mt-2 leading-relaxed">
              We serve discerning retail customers with bespoke packaging while supplying
              retail stores and wholesale distributors with factory-direct pricing.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E2E4E6] flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-display text-lg font-medium text-[#171717]">
            Experience our manufacturing capabilities firsthand.
          </p>
          <div className="flex gap-4">
            <Link
              href="/shop"
              className="px-6 py-3 bg-[#171717] text-[#FAF9F6] text-xs uppercase tracking-wider font-semibold hover:bg-[#B7A078] transition-colors"
            >
              Shop Catalogue
            </Link>
            <Link
              href="/for-retailers"
              className="px-6 py-3 border border-[#171717] text-[#171717] text-xs uppercase tracking-wider font-semibold hover:bg-[#171717] hover:text-white transition-colors"
            >
              B2B Partnerships
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
