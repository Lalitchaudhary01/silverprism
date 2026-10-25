"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  Download,
  Filter,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Zap,
  Printer,
  ChevronRight,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS, Product, formatINR, DIAMOND_SHAPES } from "@/data/products";
import ForRetailersPage from "../for-retailers/page";
import PendingWholesalePage from "./pending/page";

export default function WholesalePage() {
  const { userRole, setUserRole, addToCart, setIsCartOpen, showToast } = useStore();

  // If in Pending role, show the dedicated Pending Application view
  if (userRole === "wholesale_pending") {
    return <PendingWholesalePage />;
  }

  // If in Retail role, show the B2B Partnership Overview & Application form
  if (userRole === "retail") {
    return (
      <div>
        {/* Banner nudging user that they can simulate approved wholesale */}
        <div className="bg-[#171717] text-[#FAF9F6] py-3 px-6 text-center text-xs border-b border-[#B7A078]">
          <div className="mx-auto max-w-[1440px] flex flex-wrap items-center justify-center gap-3">
            <span className="text-[#C8CBCD]">
              You are viewing the Wholesale Overview in B2C Retail Mode.
            </span>
            <button
              type="button"
              onClick={() => setUserRole("wholesale_approved")}
              className="px-3 py-1 bg-[#52B788] text-[#081C15] font-bold uppercase tracking-wider text-[11px] rounded shadow-xs hover:bg-[#74C69D] transition-colors cursor-pointer"
            >
              ⚡ Switch to Approved B2B Wholesale Mode
            </button>
          </div>
        </div>
        <ForRetailersPage />
      </div>
    );
  }

  // userRole === "wholesale_approved" or "admin" -> Master Wholesale B2B Portal & Bulk Matrix
  return <ApprovedWholesalePortal />;
}

function ApprovedWholesalePortal() {
  const { addToCart, setIsCartOpen, showToast } = useStore();

  // State for matrix quantities: { [slug]: number }
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    // Pre-populate first 3 items with their MOQ for instant demonstration
    initial[PRODUCTS[0].slug] = PRODUCTS[0].moq;
    initial[PRODUCTS[1].slug] = PRODUCTS[1].moq;
    return initial;
  });

  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [shapeFilter, setShapeFilter] = useState<string>("All");
  const [lineSheetOpen, setLineSheetOpen] = useState(false);

  const handleQtyChange = (slug: string, delta: number, minMoq: number) => {
    setQuantities((prev) => {
      const current = prev[slug] || 0;
      let next = current + delta;
      if (next < 0) next = 0;
      // If setting from 0 to positive, start at minMoq
      if (current === 0 && delta > 0) next = minMoq;
      // If decreasing below minMoq, set to 0
      if (next > 0 && next < minMoq) next = 0;
      return { ...prev, [slug]: next };
    });
  };

  const setExplicitQty = (slug: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [slug]: Math.max(0, qty) }));
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (categoryFilter !== "All" && p.category !== categoryFilter) return false;
      if (shapeFilter !== "All") {
        const itemShape = p.diamondSpecs?.shape || "";
        const itemName = p.name.toLowerCase();
        const target = shapeFilter.toLowerCase();
        if (!itemShape.toLowerCase().includes(target) && !itemName.includes(target)) return false;
      }
      return true;
    });
  }, [categoryFilter, shapeFilter]);

  // Compute live matrix order totals
  const matrixStats = useMemo(() => {
    let totalUnits = 0;
    let totalSilverGrams = 0;
    let totalWholesalePO = 0;
    let totalRetailMSRP = 0;
    let activeItemCount = 0;

    for (const [slug, qty] of Object.entries(quantities)) {
      if (qty > 0) {
        const product = PRODUCTS.find((p) => p.slug === slug);
        if (product) {
          totalUnits += qty;
          totalSilverGrams += product.netWeightGrams * qty;
          totalWholesalePO += product.wholesalePrice * qty;
          totalRetailMSRP += product.retailPrice * qty;
          activeItemCount += 1;
        }
      }
    }

    const estimatedRetailMargin = Math.max(0, totalRetailMSRP - totalWholesalePO);
    const marginPercent =
      totalRetailMSRP > 0 ? ((estimatedRetailMargin / totalRetailMSRP) * 100).toFixed(1) : "0.0";

    return {
      totalUnits,
      totalSilverGrams: Math.round(totalSilverGrams * 10) / 10,
      totalWholesalePO,
      totalRetailMSRP,
      estimatedRetailMargin,
      marginPercent,
      activeItemCount,
    };
  }, [quantities]);

  const handleAddAllToPO = () => {
    let addedCount = 0;
    for (const [slug, qty] of Object.entries(quantities)) {
      if (qty > 0) {
        addToCart(slug, qty);
        addedCount += qty;
      }
    }
    if (addedCount > 0) {
      showToast(`Added ${addedCount} wholesale pieces across designs to Purchase Order!`);
      setIsCartOpen(true);
    } else {
      showToast("Please specify quantities (minimum MOQ) before adding to PO.");
    }
  };

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16 font-sans">
      {/* Verified Partner Dashboard Header */}
      <div className="bg-[#171717] text-[#FAF9F6] p-6 md:p-8 rounded-[4px] border border-[#2A2D2F] shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#52B788]/20 border border-[#52B788]/50 text-[#95D5B2] text-[10px] uppercase font-bold tracking-wider rounded">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#52B788]" />
              <span>Authorized Wholesale Account #SP-B2B-9041</span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-medium tracking-wide text-white">
              Aura Luxury Jewels Pvt Ltd · Bandra West, Mumbai
            </h1>
            <p className="text-xs md:text-sm text-[#C8CBCD] max-w-2xl leading-relaxed">
              Factory-direct procurement pricing with 2.0-micron anti-tarnish rhodium plating, IGI certified lab-grown diamonds, and live MOQ inventory checkout.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setLineSheetOpen(true)}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded border border-white/20 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-[#B7A078]" />
              <span>Download Line Sheet (CSV)</span>
            </button>
            <Link
              href="/custom-design"
              className="px-4 py-2.5 bg-[#B7A078] hover:bg-[#C9B28A] text-[#171717] text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Custom OEM CAD Quote</span>
            </Link>
          </div>
        </div>

        {/* Wholesale Partner KPI Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-[#25282A] border border-[#35383A] rounded">
            <span className="eyebrow block text-[#C8CBCD] text-[9.5px]">Available Credit Limit</span>
            <span className="font-bold text-base text-white mt-1 block tabular-nums">
              ₹13,26,188 <span className="text-[10px] text-[#52B788] font-normal">/ ₹15L</span>
            </span>
          </div>

          <div className="p-3.5 bg-[#25282A] border border-[#35383A] rounded">
            <span className="eyebrow block text-[#C8CBCD] text-[9.5px]">Active Trade Terms</span>
            <span className="font-bold text-base text-[#52B788] mt-1 block">
              Net 30 Days (RTGS)
            </span>
          </div>

          <div className="p-3.5 bg-[#25282A] border border-[#35383A] rounded">
            <span className="eyebrow block text-[#C8CBCD] text-[9.5px]">Avg. Retail Gross Margin</span>
            <span className="font-bold text-base text-[#B7A078] mt-1 block">
              43.8% OFF MSRP
            </span>
          </div>

          <div className="p-3.5 bg-[#25282A] border border-[#35383A] rounded">
            <span className="eyebrow block text-[#C8CBCD] text-[9.5px]">Production Turnaround</span>
            <span className="font-bold text-base text-white mt-1 block">
              48h Direct Dispatch
            </span>
          </div>
        </div>
      </div>

      {/* Bulk Quick-Order Matrix Header & Filters */}
      <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E2E4E6]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#B7A078]/15 text-[#8C6D37] text-[10px] uppercase font-bold tracking-wider rounded mb-1">
            <FileSpreadsheet className="h-3 w-3" />
            <span>Industrial Order Sheet</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-[#171717] font-medium">
            Bulk Quick-Order Matrix
          </h2>
          <p className="text-xs md:text-sm text-[#35383A] mt-1">
            Enter required batch quantities directly across designs. Volume discounts apply automatically.
          </p>
        </div>

        {/* Quick Shape & Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-[#E2E4E6] text-xs font-medium rounded outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Rings">Rings</option>
            <option value="Necklaces">Necklaces</option>
            <option value="Bracelets">Bracelets</option>
            <option value="Earrings">Earrings</option>
          </select>

          <select
            value={shapeFilter}
            onChange={(e) => setShapeFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-[#E2E4E6] text-xs font-medium rounded outline-none cursor-pointer"
          >
            <option value="All">All Diamond Shapes</option>
            {DIAMOND_SHAPES.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name} Shape
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="mt-6 bg-white border border-[#E2E4E6] rounded-[4px] shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-[#FAF9F6] border-b border-[#E2E4E6] text-[#766F64] text-[10px] uppercase tracking-wider">
              <th className="py-3 px-4 font-bold">Design & SKU</th>
              <th className="py-3 px-4 font-bold">Specs (Shape / Carat)</th>
              <th className="py-3 px-4 font-bold">Silver Wt.</th>
              <th className="py-3 px-4 font-bold">Retail MSRP</th>
              <th className="py-3 px-4 font-bold text-[#171717]">Wholesale Unit</th>
              <th className="py-3 px-4 font-bold text-center">MOQ</th>
              <th className="py-3 px-4 font-bold text-center">Batch Order Qty</th>
              <th className="py-3 px-4 font-bold text-right">Line Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E4E6]">
            {filteredProducts.map((product) => {
              const qty = quantities[product.slug] || 0;
              const lineTotal = qty * product.wholesalePrice;
              const hasQty = qty > 0;

              return (
                <tr
                  key={product.id}
                  className={`transition-colors hover:bg-[#FAF9F6] ${
                    hasQty ? "bg-[#B7A078]/5" : ""
                  }`}
                >
                  {/* Thumbnail & Product Name */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded bg-[#E8EAEB] overflow-hidden shrink-0 border border-[#E2E4E6]">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/product/${product.slug}`}
                          className="font-display font-medium text-[#171717] hover:text-[#B7A078] text-sm block"
                        >
                          {product.name}
                        </Link>
                        <span className="font-mono text-[10px] text-[#766F64]">
                          {product.sku}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Diamond Specs */}
                  <td className="py-3 px-4">
                    <span className="font-medium text-[#171717] block">
                      {product.diamondSpecs?.shape || "Brilliant Cut"}
                    </span>
                    <span className="text-[10px] text-[#766F64]">
                      {product.diamondSpecs?.caratWeight || "1.50 ctw"} · {product.diamondSpecs?.clarityGrade || "VVS1"}
                    </span>
                  </td>

                  {/* Silver Weight */}
                  <td className="py-3 px-4 font-mono text-[#35383A]">
                    {product.netWeightGrams}g (925)
                  </td>

                  {/* Retail MSRP */}
                  <td className="py-3 px-4 tabular-nums text-[#766F64] line-through">
                    {formatINR(product.retailPrice)}
                  </td>

                  {/* Wholesale Unit Rate */}
                  <td className="py-3 px-4 tabular-nums">
                    <span className="font-bold text-sm text-[#171717] block">
                      {formatINR(product.wholesalePrice)}
                    </span>
                    <span className="text-[9.5px] text-[#52B788] font-bold">
                      Save {Math.round(((product.retailPrice - product.wholesalePrice) / product.retailPrice) * 100)}%
                    </span>
                  </td>

                  {/* MOQ */}
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 bg-[#FAF9F6] border border-[#E2E4E6] text-[10px] font-mono font-bold text-[#171717] rounded">
                      {product.moq} pcs
                    </span>
                  </td>

                  {/* Quantity Stepper */}
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center border border-[#E2E4E6] rounded bg-white overflow-hidden shadow-xs">
                      <button
                        type="button"
                        onClick={() => handleQtyChange(product.slug, -product.moq, product.moq)}
                        className="px-2.5 py-1 text-[#555] hover:bg-gray-100 transition-colors cursor-pointer"
                        title="Reduce by MOQ"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <input
                        type="number"
                        min="0"
                        step={product.moq}
                        value={qty}
                        onChange={(e) => setExplicitQty(product.slug, parseInt(e.target.value) || 0)}
                        className="w-14 text-center text-xs font-bold text-[#171717] outline-none py-1 tabular-nums"
                      />
                      <button
                        type="button"
                        onClick={() => handleQtyChange(product.slug, product.moq, product.moq)}
                        className="px-2.5 py-1 text-[#555] hover:bg-gray-100 transition-colors cursor-pointer"
                        title="Add MOQ"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </td>

                  {/* Line Total */}
                  <td className="py-3 px-4 text-right tabular-nums">
                    <span
                      className={`font-bold text-sm ${
                        hasQty ? "text-[#171717]" : "text-[#999]"
                      }`}
                    >
                      {formatINR(lineTotal)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Floating Sticky Bottom Purchase Order Summary Bar */}
      <div className="sticky bottom-4 z-30 mt-8 bg-[#171717] text-[#FAF9F6] p-5 md:p-6 rounded-[4px] border border-[#35383A] shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Order Metrics Breakdown */}
          <div className="flex flex-wrap items-center gap-6 text-xs w-full lg:w-auto justify-between lg:justify-start">
            <div>
              <span className="eyebrow block text-[#C8CBCD] text-[9.5px]">Selected Units</span>
              <span className="text-base font-bold text-white tabular-nums">
                {matrixStats.totalUnits} pcs
                <span className="text-xs text-[#888] font-normal ml-1">
                  ({matrixStats.activeItemCount} designs)
                </span>
              </span>
            </div>

            <div className="hidden sm:block h-8 w-px bg-white/10" />

            <div>
              <span className="eyebrow block text-[#C8CBCD] text-[9.5px]">Pure Silver Consignment</span>
              <span className="text-base font-bold text-[#B7A078] tabular-nums">
                {matrixStats.totalSilverGrams}g 925
              </span>
            </div>

            <div className="hidden sm:block h-8 w-px bg-white/10" />

            <div>
              <span className="eyebrow block text-[#C8CBCD] text-[9.5px]">Est. Retail Profit</span>
              <span className="text-base font-bold text-[#52B788] tabular-nums">
                +{formatINR(matrixStats.estimatedRetailMargin)}
                <span className="text-xs text-[#52B788]/80 font-normal ml-1">
                  ({matrixStats.marginPercent}%)
                </span>
              </span>
            </div>

            <div className="hidden sm:block h-8 w-px bg-white/10" />

            <div>
              <span className="eyebrow block text-[#C8CBCD] text-[9.5px]">Total Wholesale PO</span>
              <span className="text-xl font-bold text-white tabular-nums">
                {formatINR(matrixStats.totalWholesalePO)}
              </span>
            </div>
          </div>

          {/* Add All To PO Button */}
          <button
            type="button"
            onClick={handleAddAllToPO}
            className="w-full lg:w-auto px-8 py-3.5 bg-[#52B788] hover:bg-[#74C69D] text-[#081C15] font-bold text-xs uppercase tracking-[0.18em] rounded shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Add Selected ({matrixStats.totalUnits}) to Purchase Order →</span>
          </button>
        </div>
      </div>

      {/* Line Sheet Preview Modal */}
      {lineSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white max-w-2xl w-full p-6 md:p-8 rounded-[4px] shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E4E6]">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-[#B7A078]" />
                <h3 className="font-display text-lg font-medium text-[#171717]">
                  SilverPrism 2026 Wholesale Digital Line Sheet
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLineSheetOpen(false)}
                className="text-gray-400 hover:text-black font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#35383A]">
              <p>
                The digital line sheet contains all 24 production SKU codes, metal fineness (92.5% silver), diamond 4Cs calibrations (DEF/VVS1), packaging specs, and tiered pricing from 5 to 100+ units.
              </p>
              <div className="p-3 bg-[#FAF9F6] border border-[#E2E4E6] rounded space-y-1 font-mono text-[11px]">
                <p>• Format: CSV / Microsoft Excel Compatible</p>
                <p>• Includes: SKU, Diamond Weight, Silver Wt, Wholesale Unit, MOQ, Lead Time</p>
                <p>• Hallmarking Accreditation: BIS Laser Certified</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#E2E4E6]">
              <button
                type="button"
                onClick={() => setLineSheetOpen(false)}
                className="px-4 py-2 border border-[#E2E4E6] text-xs font-semibold rounded hover:bg-gray-50"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast("📥 Downloading SilverPrism_Wholesale_LineSheet_2026.csv");
                  setLineSheetOpen(false);
                }}
                className="px-5 py-2 bg-[#171717] hover:bg-[#B7A078] text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-2 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export CSV File</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
