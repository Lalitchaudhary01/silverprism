"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserCheck, Shield, ShoppingBag, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { useStore, UserRole } from "@/context/StoreContext";

export function RoleSwitcherBar() {
  const { userRole, setUserRole, wholesaleSavings, showToast } = useStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleSelectRole = (newRole: UserRole) => {
    setUserRole(newRole);
    // If user is on our-story or other static content and switches to B2B, provide helpful feedback
    if (newRole === "wholesale_pending" && pathname === "/our-story") {
      showToast("Switched to Pending B2B. Opening Application Tracker...");
      router.push("/wholesale/pending");
    } else if (newRole === "wholesale_approved" && pathname === "/our-story") {
      showToast("Switched to Approved B2B. Opening Wholesale Portal...");
      router.push("/wholesale");
    }
  };

  return (
    <div className="hidden md:block bg-[#171717] text-[#FAF9F6] border-b border-[#2A2D2F] px-4 py-2 text-xs select-none">
      <div className="mx-auto max-w-[1440px] flex flex-wrap items-center justify-between gap-3">
        {/* Left: Interactive Demo Mode Tag */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex h-2 w-2 rounded-full bg-[#B7A078] animate-ping shrink-0" />
          <span className="eyebrow text-[#C8CBCD] text-[10px]">
            Live Dual-Channel Architecture:
          </span>
          <span className="font-medium text-[#FAF9F6]">
            {userRole === "retail" && "B2C Public Retail Customer"}
            {userRole === "wholesale_pending" && "B2B Wholesale Applicant (Under KYC Review)"}
            {userRole === "wholesale_approved" && "Authorized Wholesale Partner (45% OFF & MOQ Active)"}
            {userRole === "admin" && "Executive Admin & Manufacturer Portal"}
          </span>

          {userRole === "wholesale_approved" && (
            <span className="bg-[#52B788]/20 text-[#52B788] border border-[#52B788]/50 px-2 py-0.5 text-[10px] font-bold rounded">
              Tier 1 Trade Pricing Active
            </span>
          )}

          {userRole === "wholesale_pending" && (
            <Link
              href="/wholesale/pending"
              className="text-[#E5A93C] underline text-[10px] hover:text-white flex items-center gap-1"
            >
              <span>View Review Dossier</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </Link>
          )}

          {userRole === "wholesale_approved" && (
            <Link
              href="/wholesale"
              className="text-[#52B788] underline text-[10px] hover:text-white flex items-center gap-1"
            >
              <span>Open B2B Portal</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </Link>
          )}
        </div>

        {/* Right: Switcher Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[#C8CBCD] text-[10px] mr-1 hidden sm:inline">
            Switch Persona:
          </span>

          {/* 1. Retail (B2C) Button */}
          <button
            type="button"
            onClick={() => handleSelectRole("retail")}
            className={`px-3 py-1.5 text-[11px] font-medium transition-all rounded cursor-pointer ${
              userRole === "retail"
                ? "bg-[#FAF9F6] text-[#171717] font-bold shadow-md ring-2 ring-[#B7A078]"
                : "bg-[#25282A] text-[#C8CBCD] hover:bg-[#35383A] hover:text-[#FAF9F6]"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <ShoppingBag className="h-3 w-3" />
              <span>Retail (B2C)</span>
            </span>
          </button>

          {/* 2. Pending B2B Button */}
          <button
            type="button"
            onClick={() => handleSelectRole("wholesale_pending")}
            className={`px-3 py-1.5 text-[11px] font-medium transition-all rounded cursor-pointer ${
              userRole === "wholesale_pending"
                ? "bg-[#E5A93C] text-[#1A1204] font-bold shadow-md ring-2 ring-[#E5A93C]/50"
                : "bg-[#25282A] text-[#C8CBCD] hover:bg-[#35383A] hover:text-[#FAF9F6]"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              <span>Pending B2B</span>
              <span className="text-[9px] bg-black/20 px-1 py-0.2 rounded">Review</span>
            </span>
          </button>

          {/* 3. Approved B2B Button */}
          <button
            type="button"
            onClick={() => handleSelectRole("wholesale_approved")}
            className={`px-3 py-1.5 text-[11px] font-medium transition-all rounded cursor-pointer ${
              userRole === "wholesale_approved"
                ? "bg-[#52B788] text-[#081C15] font-bold shadow-md ring-2 ring-[#52B788]/50"
                : "bg-[#25282A] text-[#C8CBCD] hover:bg-[#35383A] hover:text-[#FAF9F6]"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <UserCheck className="h-3 w-3" />
              <span>Approved B2B (Wholesale)</span>
              <span className="text-[9px] bg-black/20 px-1 py-0.2 rounded font-mono">45% OFF</span>
            </span>
          </button>

          {/* 4. Admin Link */}
          <Link
            href="/admin"
            onClick={() => setUserRole("admin")}
            className={`px-2.5 py-1.5 text-[11px] font-medium transition-all rounded ${
              userRole === "admin"
                ? "bg-[#B7A078] text-[#171717] font-bold shadow-md"
                : "bg-[#25282A] text-[#C8CBCD] hover:bg-[#35383A] hover:text-[#FAF9F6]"
            }`}
          >
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Admin</span>
              <ArrowRight className="h-2.5 w-2.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
