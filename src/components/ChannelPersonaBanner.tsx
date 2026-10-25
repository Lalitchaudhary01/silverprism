"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Lock,
  FileSpreadsheet,
  Zap,
  Package,
  Layers,
  PhoneCall,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function ChannelPersonaBanner() {
  const { userRole, setUserRole, showToast } = useStore();
  const pathname = usePathname();
  const router = useRouter();

  // If in admin view, don't show the storefront persona banner
  if (pathname.startsWith("/admin")) return null;

  const handleInstantApprove = () => {
    setUserRole("wholesale_approved");
    showToast("🎉 Application APP-8042 instantly approved! Wholesale B2B rates unlocked.");
    router.push("/wholesale");
  };

  if (userRole === "wholesale_pending") {
    return (
      <aside
        aria-label="Pending Wholesale Review Notice"
        className="w-full bg-gradient-to-r from-[#2B1F0A] via-[#3D2C0E] to-[#2B1F0A] text-[#F5E6CC] border-b border-[#D4A359]/40 py-2.5 px-4 shadow-sm"
      >
        <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          {/* Left: Applicant Status Details */}
          <div className="flex items-center gap-2.5 flex-wrap text-center md:text-left justify-center md:justify-start">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#E5A93C] animate-ping shrink-0" />
            <span className="px-2 py-0.5 bg-[#E5A93C]/20 border border-[#E5A93C]/50 text-[#FCE8B3] text-[10px] uppercase font-bold tracking-wider rounded">
              B2B Review In Progress
            </span>
            <span className="font-semibold text-white">
              Application #APP-8042 (Kavya Silver Atelier · GSTIN: 07AAACK8891B1Z2)
            </span>
            <span className="hidden lg:inline text-[#D8C7A5]">
              — Wholesale rates are locked pending trade license verification (~2-4h).
            </span>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <Link
              href="/wholesale/pending"
              className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 text-[#FAF9F6] text-[11px] font-medium rounded border border-white/20 transition-colors"
            >
              <Clock className="h-3 w-3 text-[#E5A93C]" />
              <span>Track Application</span>
            </Link>

            <button
              type="button"
              onClick={handleInstantApprove}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E5A93C] hover:bg-[#F5B94E] text-[#1A1204] text-[11px] font-bold uppercase tracking-wider rounded transition-colors shadow-xs"
            >
              <Zap className="h-3 w-3 fill-[#1A1204]" />
              <span>⚡ Instant Demo Approval</span>
            </button>
          </div>
        </div>
      </aside>
    );
  }

  if (userRole === "wholesale_approved") {
    return (
      <aside
        aria-label="Approved Wholesale Partner Status"
        className="w-full bg-gradient-to-r from-[#0C2417] via-[#123321] to-[#0C2417] text-[#D8F3DC] border-b border-[#52B788]/40 py-2.5 px-4 shadow-sm"
      >
        <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          {/* Left: Verified Partner Stats */}
          <div className="flex items-center gap-2.5 flex-wrap text-center md:text-left justify-center md:justify-start">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#52B788] shrink-0" />
            <span className="px-2 py-0.5 bg-[#52B788]/20 border border-[#52B788]/60 text-[#95D5B2] text-[10px] uppercase font-bold tracking-wider rounded">
              Verified Wholesale Partner #SP-B2B-9041
            </span>
            <span className="font-semibold text-white">
              Aura Luxury Jewels Pvt Ltd (Tier 1 Wholesale Account)
            </span>
            <span className="hidden lg:inline text-[#B7E4C7]">
              · Trade Discount: <strong className="text-white">45% OFF MSRP</strong> · MOQ Active · Credit Limit: ₹15L (Net 30)
            </span>
          </div>

          {/* Right: Quick Wholesale Portals */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <Link
              href="/wholesale"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#52B788] hover:bg-[#74C69D] text-[#081C15] text-[11px] font-bold uppercase tracking-wider rounded transition-colors shadow-xs"
            >
              <FileSpreadsheet className="h-3 w-3" />
              <span>Bulk Quick-Order Matrix</span>
              <ArrowRight className="h-3 w-3" />
            </Link>

            <Link
              href="/custom-design"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium rounded border border-white/20 transition-colors"
            >
              <Layers className="h-3 w-3 text-[#95D5B2]" />
              <span>Custom OEM CAD</span>
            </Link>
          </div>
        </div>
      </aside>
    );
  }

  // Retail (B2C) Mode
  return (
    <aside
      aria-label="Direct Consumer Retail Atelier Notice"
      className="w-full bg-[#FAF7F0] text-[#4A453C] border-b border-[#E8DFD0] py-2 px-4 text-xs"
    >
      <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap text-center md:text-left justify-center md:justify-start">
          <Sparkles className="h-3.5 w-3.5 text-[#B7A078] shrink-0" />
          <span className="px-2 py-0.2 bg-[#B7A078]/15 text-[#8C6D37] text-[10px] uppercase font-bold tracking-wider rounded">
            Retail Atelier Mode
          </span>
          <span className="text-[#2B2925] font-medium">
            Fine Jewellery direct to consumers · 100% Certified 925 Silver & Lab Diamonds
          </span>
          <span className="hidden xl:inline text-[#766F64]">
            · Free Insured Pan-India Express Delivery · 15-Day Return Policy · Luxury Velvet Box Included
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/for-retailers"
            className="text-[11px] text-[#8C6D37] hover:text-[#171717] font-semibold underline underline-offset-2 transition-colors"
          >
            Are you a jewellery retailer? Apply for Wholesale B2B →
          </Link>
        </div>
      </div>
    </aside>
  );
}
