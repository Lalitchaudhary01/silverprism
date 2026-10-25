"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  FileCheck2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Phone,
  MessageSquare,
  Package,
  Layers,
  Sparkles,
  Download,
  ExternalLink,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatINR, PRODUCTS } from "@/data/products";

const SAMPLE_KITS = [
  {
    id: "sample-solitaire-tennis",
    name: "Solitaire Ring & Tennis Bracelet Touch-and-Feel Sample Kit",
    sku: "KIT-SMP-01",
    pieces: "2 Finished Pieces (Solitaire Ring + 7-Carat Tennis Bracelet)",
    price: 24500,
    retailValue: 46500,
    material: "925 Sterling Silver + 2.0µ Rhodium Finish",
    diamonds: "DEF Color / VVS1 Lab-Grown Diamonds (IGI Dossier Included)",
    leadTime: "Ships in 24 Hours",
    image:
      "https://cdn.shopify.com/s/files/1/0898/4372/8695/files/TennisBraceletSilver.webp?v=1738734919",
  },
  {
    id: "sample-ring-tray",
    name: "Master Silver Casting & Plating Calibration Tray",
    sku: "KIT-SMP-02",
    pieces: "8 Ring Shanks (Round, Oval, Emerald, Pear, Cushion)",
    price: 32000,
    retailValue: 68000,
    material: "Solid 925 Sterling Silver (Mirror + Brushed + Satin Finishes)",
    diamonds: "Color & Cut Calibration CZ / Lab Accents",
    leadTime: "Ships in 24 Hours",
    image:
      "https://cdn.shopify.com/s/files/1/0898/4372/8695/files/10CtOvalTennisBraceletSilver.webp?v=1738735399",
  },
  {
    id: "sample-diamond-gauge",
    name: "IGI Certified Lab Diamond Master Dossier & Grading Pack",
    sku: "KIT-SMP-03",
    pieces: "1 Master Sample + Physical IGI Laser Inscription Viewer",
    price: 18500,
    retailValue: 35000,
    material: "Factory Calibration Tooling & Presentation Case",
    diamonds: "1.00ct Round Brilliant Ideal Cut Lab Diamond Sample",
    leadTime: "Ships in 24 Hours",
    image:
      "https://cdn.shopify.com/s/files/1/0898/4372/8695/files/3_4ProngTennisRoundNecklaceYellowGold_1.webp?v=1738736367",
  },
];

export default function PendingWholesalePage() {
  const { userRole, setUserRole, addToCart, showToast } = useStore();
  const router = useRouter();
  const [fastTrackLoading, setFastTrackLoading] = useState(false);

  const handleInstantApprove = () => {
    setFastTrackLoading(true);
    setTimeout(() => {
      setUserRole("wholesale_approved");
      showToast("🎉 Application APP-8042 Approved! Welcome to SilverPrism Wholesale B2B.");
      router.push("/wholesale");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16 font-sans">
      {/* Top Banner & Fast-Track Bar */}
      <div className="bg-gradient-to-r from-[#2B1F0A] via-[#3D2C0E] to-[#2B1F0A] text-[#FAF9F6] p-6 md:p-8 rounded-[4px] border border-[#D4A359]/40 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E5A93C]/20 border border-[#E5A93C]/50 text-[#FCE8B3] text-[10px] uppercase font-bold tracking-wider rounded">
              <Clock className="h-3.5 w-3.5 text-[#E5A93C] animate-spin" />
              <span>B2B Wholesale Application Status: Under Verification</span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl text-white font-medium tracking-wide">
              Kavya Silver Atelier · Trade Account #APP-8042
            </h1>
            <p className="text-xs md:text-sm text-[#D8C7A5] max-w-2xl leading-relaxed">
              Your business credentials (GSTIN: 07AAACK8891B1Z2) are currently being reviewed by our B2B compliance team. In this demo mode, you can inspect the application queue or approve instantly.
            </p>
          </div>

          {/* Instant Approval CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleInstantApprove}
              disabled={fastTrackLoading}
              className="px-6 py-3.5 bg-[#E5A93C] hover:bg-[#F5B94E] text-[#1A1204] font-bold text-xs uppercase tracking-[0.16em] rounded shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="h-4 w-4 fill-[#1A1204]" />
              <span>{fastTrackLoading ? "Activating B2B Account..." : "⚡ Fast-Track Instant Approval (Demo)"}</span>
            </button>
            <Link
              href="/shop"
              className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded border border-white/20 transition-colors text-center"
            >
              Preview Sample Catalog →
            </Link>
          </div>
        </div>
      </div>

      {/* 4-Stage Application Timeline Tracker */}
      <div className="mt-10 bg-white border border-[#E2E4E6] p-6 md:p-8 rounded-[4px] shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E4E6]">
          <div>
            <h2 className="font-display text-lg md:text-xl font-medium text-[#171717]">
              Real-Time Verification Progress
            </h2>
            <p className="text-xs text-[#35383A] mt-0.5">
              Estimated verification turnaround: 2 to 4 business hours.
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#B7A078] font-bold bg-[#FAF9F6] px-3 py-1 border border-[#E2E4E6] rounded">
            Stage 2 of 4 Active
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Step 1: Completed */}
          <div className="p-4 bg-[#F8FAF9] border border-[#A7D7C5] rounded-[3px] relative">
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>1. Application Logged</span>
            </div>
            <p className="text-xs font-semibold text-[#171717] mt-2">Trade Profile Created</p>
            <p className="text-[11px] text-[#555] mt-1">Submitted on 25 Oct 2026 via B2B Gateway.</p>
            <span className="inline-block mt-3 text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-mono">
              COMPLETED
            </span>
          </div>

          {/* Step 2: In Progress */}
          <div className="p-4 bg-[#FFFBF0] border-2 border-[#D4A359] rounded-[3px] relative shadow-xs">
            <div className="flex items-center gap-2 text-[#996D14] text-xs font-bold uppercase tracking-wider">
              <Clock className="h-4 w-4 text-[#D4A359] animate-spin shrink-0" />
              <span>2. KYC & GSTIN Review</span>
            </div>
            <p className="text-xs font-semibold text-[#171717] mt-2">Document Validation</p>
            <p className="text-[11px] text-[#555] mt-1">
              Verifying GSTIN 07AAACK8891B1Z2 with Government Portal.
            </p>
            <span className="inline-block mt-3 text-[10px] text-[#996D14] bg-[#FCE8B3] px-2 py-0.5 rounded font-mono font-bold animate-pulse">
              IN PROGRESS (~2h)
            </span>
          </div>

          {/* Step 3: Queued */}
          <div className="p-4 bg-[#FAFAFA] border border-[#E2E4E6] rounded-[3px] relative">
            <div className="flex items-center gap-2 text-[#888] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-[#AAA] shrink-0" />
              <span>3. Credit Line Allocation</span>
            </div>
            <p className="text-xs font-semibold text-[#171717] mt-2">Trade Margin Tier</p>
            <p className="text-[11px] text-[#555] mt-1">
              Assigning Tier 1 (45% OFF) and Net 30 days settlement limit.
            </p>
            <span className="inline-block mt-3 text-[10px] text-[#666] bg-[#EEE] px-2 py-0.5 rounded font-mono">
              QUEUED
            </span>
          </div>

          {/* Step 4: Queued */}
          <div className="p-4 bg-[#FAFAFA] border border-[#E2E4E6] rounded-[3px] relative">
            <div className="flex items-center gap-2 text-[#888] text-xs font-bold uppercase tracking-wider">
              <Layers className="h-4 w-4 text-[#AAA] shrink-0" />
              <span>4. Factory Access</span>
            </div>
            <p className="text-xs font-semibold text-[#171717] mt-2">Bulk Matrix Unlocked</p>
            <p className="text-[11px] text-[#555] mt-1">
              Full CAD custom quotes, bulk CSV line sheet, and volume MOQs.
            </p>
            <span className="inline-block mt-3 text-[10px] text-[#666] bg-[#EEE] px-2 py-0.5 rounded font-mono">
              PENDING ACTIVATION
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Business Dossier + Account Executive */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Left: Applicant Business Profile */}
        <div className="lg:col-span-7 bg-white border border-[#E2E4E6] p-6 md:p-8 rounded-[4px] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E4E6]">
            <h3 className="font-display text-lg font-medium text-[#171717] flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#B7A078]" />
              <span>Registered Business Dossier</span>
            </h3>
            <span className="text-xs text-[#B7A078] font-bold">Verified on File</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-[#FAF9F6] border border-[#E8EAEB] rounded">
              <span className="eyebrow block text-[#766F64] text-[9.5px]">Legal Business Entity</span>
              <span className="font-semibold text-sm text-[#171717] mt-0.5 block">
                Kavya Silver Atelier
              </span>
            </div>

            <div className="p-3 bg-[#FAF9F6] border border-[#E8EAEB] rounded">
              <span className="eyebrow block text-[#766F64] text-[9.5px]">GSTIN / Tax ID</span>
              <span className="font-mono font-semibold text-sm text-[#171717] mt-0.5 block">
                07AAACK8891B1Z2
              </span>
            </div>

            <div className="p-3 bg-[#FAF9F6] border border-[#E8EAEB] rounded">
              <span className="eyebrow block text-[#766F64] text-[9.5px]">Authorized Contact</span>
              <span className="font-medium text-sm text-[#171717] mt-0.5 block">
                Kavya Sharma (Director)
              </span>
            </div>

            <div className="p-3 bg-[#FAF9F6] border border-[#E8EAEB] rounded">
              <span className="eyebrow block text-[#766F64] text-[9.5px]">Business Phone</span>
              <span className="font-medium text-sm text-[#171717] mt-0.5 block">
                +91 98112 55210
              </span>
            </div>

            <div className="p-3 bg-[#FAF9F6] border border-[#E8EAEB] rounded">
              <span className="eyebrow block text-[#766F64] text-[9.5px]">Business Model</span>
              <span className="font-medium text-xs text-[#171717] mt-0.5 block">
                Online Jewellery Boutique & Multi-Brand Store
              </span>
            </div>

            <div className="p-3 bg-[#FAF9F6] border border-[#E8EAEB] rounded">
              <span className="eyebrow block text-[#766F64] text-[9.5px]">Projected Sourcing Volume</span>
              <span className="font-medium text-xs text-[#171717] mt-0.5 block">
                ₹10 Lakhs – ₹25 Lakhs / month
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#FAF9F6] border border-[#E8EAEB] rounded text-xs">
            <span className="eyebrow block text-[#766F64] text-[9.5px]">Storefront / Registered Address</span>
            <span className="text-[#171717] mt-0.5 block">
              B-42 Defence Colony, Ring Road, New Delhi 110024
            </span>
          </div>

          {/* Fast-Track Simulation Trigger */}
          <div className="p-4 bg-[#FFF9ED] border border-[#F2D794] rounded text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-[#805809]">Evaluating as an agency or client reviewer?</p>
              <p className="text-[#805809]/80 text-[11px] mt-0.5">
                Skip the verification queue to test the approved B2B ordering and MOQ checkout immediately.
              </p>
            </div>
            <button
              type="button"
              onClick={handleInstantApprove}
              className="px-4 py-2 bg-[#171717] hover:bg-[#B7A078] text-white text-xs font-bold uppercase tracking-wider rounded shrink-0 transition-colors cursor-pointer"
            >
              Approve Now (Demo) →
            </button>
          </div>
        </div>

        {/* Right: Assigned B2B Trade Executive */}
        <div className="lg:col-span-5 bg-white border border-[#E2E4E6] p-6 md:p-8 rounded-[4px] shadow-xs space-y-6">
          <div className="pb-3 border-b border-[#E2E4E6]">
            <span className="eyebrow text-[#B7A078] text-[10px]">Dedicated Trade Desk</span>
            <h3 className="font-display text-lg font-medium text-[#171717] mt-0.5">
              Your Account Executive
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-[#171717] text-[#B7A078] flex items-center justify-center font-display text-xl font-bold border-2 border-[#B7A078]">
              VM
            </div>
            <div>
              <h4 className="font-semibold text-sm text-[#171717]">Vikram Mehta</h4>
              <p className="text-xs text-[#766F64]">VP, B2B Trade & Bullion Operations</p>
              <p className="text-[11px] text-[#B7A078] font-mono mt-0.5">SilverPrism Manufacturing Hub</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-[#FAF9F6] border border-[#E8EAEB] rounded">
              <span className="text-[#766F64] flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#B7A078]" />
                <span>Direct Line:</span>
              </span>
              <a href="tel:+919820100293" className="font-mono font-bold text-[#171717] hover:underline">
                +91 98201 00293
              </a>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-[#FAF9F6] border border-[#E8EAEB] rounded">
              <span className="text-[#766F64] flex items-center gap-2">
                <MessageSquare className="h-3.5 w-3.5 text-[#52B788]" />
                <span>WhatsApp Trade Desk:</span>
              </span>
              <span className="text-emerald-700 font-semibold">Online · Avg reply: 5 mins</span>
            </div>
          </div>

          <div className="p-4 bg-[#FAF9F6] border border-[#E2E4E6] rounded text-xs space-y-2">
            <p className="font-semibold text-[#171717]">Need emergency dispatch or priority batch?</p>
            <p className="text-[11px] text-[#555] leading-relaxed">
              Our factory casting floor operates on 48-hour rapid cycles for registered retail jewelers. Call Vikram directly for bespoke gemstone sourcing or custom casting stamps.
            </p>
          </div>
        </div>
      </div>

      {/* Sample Ordering Section: Try Before Bulk Wholesale */}
      <div className="mt-14 pt-10 border-t border-[#E2E4E6]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E2E4E6]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#B7A078]/15 text-[#8C6D37] text-[10px] uppercase font-bold tracking-wider rounded mb-2">
              <Package className="h-3 w-3" />
              <span>Pending Applicant Privilege</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-[#171717] font-medium">
              Order Quality Touch-and-Feel Sample Kits
            </h2>
            <p className="text-xs md:text-sm text-[#35383A] mt-1 max-w-2xl">
              Inspect our 2.0µ anti-tarnish rhodium plating, diamond prong settings, and BIS hallmark before placing bulk wholesale purchase orders. No minimum quantity required for sample kits.
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs text-[#B7A078] hover:text-[#171717] font-bold uppercase tracking-wider flex items-center gap-1"
          >
            <span>Browse Full Product Catalog</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* 3 Sample Kits Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_KITS.map((kit) => (
            <div
              key={kit.id}
              className="bg-white border border-[#E2E4E6] hover:border-[#B7A078] rounded-[4px] overflow-hidden flex flex-col justify-between transition-all group shadow-xs hover:shadow-md"
            >
              <div>
                <div className="relative aspect-[4/3] bg-[#E8EAEB] overflow-hidden">
                  <img
                    src={kit.image}
                    alt={kit.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/80 text-white px-2 py-0.5 text-[9px] uppercase font-bold rounded">
                    {kit.sku}
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-[#B7A078] text-[#171717] px-2 py-0.5 text-[9px] uppercase font-bold rounded">
                    {kit.leadTime}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-display text-base font-medium text-[#171717] leading-snug">
                    {kit.name}
                  </h3>

                  <div className="space-y-1.5 text-[11px] text-[#555]">
                    <p>
                      <strong>Included:</strong> {kit.pieces}
                    </p>
                    <p>
                      <strong>Material:</strong> {kit.material}
                    </p>
                    <p>
                      <strong>Diamonds:</strong> {kit.diamonds}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-[#E2E4E6] flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-lg font-bold text-[#171717] tabular-nums">
                      {formatINR(kit.price)}
                    </span>
                    <span className="text-xs text-[#888] line-through ml-2 tabular-nums">
                      {formatINR(kit.retailValue)}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    Retailer Sample Rate
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(PRODUCTS[0].slug, 1)}
                  className="w-full py-2.5 bg-[#171717] hover:bg-[#B7A078] text-white text-xs uppercase font-bold tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Package className="h-3.5 w-3.5" />
                  <span>Order Sample Pack</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
