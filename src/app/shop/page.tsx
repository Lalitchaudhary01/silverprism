"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { SlidersHorizontal, X, Building2, CheckCircle2, Sparkles, Gem } from "lucide-react";
import { PRODUCTS, CATEGORIES, DIAMOND_SHAPES, Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";

const PRICE_TIERS = [
  { id: "u1000", label: "Under $1,000", test: (p: number) => p < 1000 },
  { id: "1000-3000", label: "$1,000 – $3,000", test: (p: number) => p >= 1000 && p <= 3000 },
  { id: "3000-6000", label: "$3,000 – $6,000", test: (p: number) => p >= 3000 && p <= 6000 },
  { id: "o6000", label: "$6,000 & Above", test: (p: number) => p > 6000 },
];

export default function ShopPage() {
  const { userRole, setUserRole, showToast } = useStore();
  const isWholesale = userRole === "wholesale_approved";
  const isPending = userRole === "wholesale_pending";

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedShape, setSelectedShape] = useState<string>("All");
  const [selectedPriceTier, setSelectedPriceTier] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredItems = useMemo(() => {
    let result = PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) {
        return false;
      }
      // Diamond Shape filter
      if (selectedShape !== "All") {
        const itemShape = item.diamondSpecs?.shape || "";
        const itemName = item.name.toLowerCase();
        const target = selectedShape.toLowerCase();
        const match = itemShape.toLowerCase().includes(target) || itemName.includes(target);
        if (!match) return false;
      }
      // Price filter
      const priceToCheck = isWholesale ? item.wholesalePrice : item.retailPrice;
      if (selectedPriceTier) {
        const tier = PRICE_TIERS.find((t) => t.id === selectedPriceTier);
        if (tier && !tier.test(priceToCheck)) return false;
      }
      // Stock filter
      if (inStockOnly && !item.inStock) {
        return false;
      }
      return true;
    });

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) =>
        (isWholesale ? a.wholesalePrice : a.retailPrice) -
        (isWholesale ? b.wholesalePrice : b.retailPrice)
      );
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) =>
        (isWholesale ? b.wholesalePrice : b.retailPrice) -
        (isWholesale ? a.wholesalePrice : a.retailPrice)
      );
    }

    return result;
  }, [selectedCategories, selectedShape, selectedPriceTier, inStockOnly, sortBy, isWholesale]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedShape("All");
    setSelectedPriceTier(null);
    setInStockOnly(false);
  };

  const hasFilters = selectedCategories.length > 0 || selectedShape !== "All" || selectedPriceTier !== null || inStockOnly;

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-20 font-sans">
      {/* Page Title & B2B Channel Indicator (Tri-Mode) */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-[#E2E4E6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-[#B7A078]">Fine Jewellery & Manufacturing</span>
            {isWholesale ? (
              <span className="px-2.5 py-0.5 bg-[#52B788] text-[#081C15] text-[10px] uppercase font-bold tracking-wider rounded">
                B2B Wholesale Portal
              </span>
            ) : isPending ? (
              <span className="px-2.5 py-0.5 bg-[#E5A93C] text-[#1A1204] text-[10px] uppercase font-bold tracking-wider rounded">
                B2B Preview · Application Under Review
              </span>
            ) : (
              <span className="px-2.5 py-0.5 bg-black text-white text-[10px] uppercase font-bold tracking-wider rounded">
                Direct Client Atelier
              </span>
            )}
          </div>
          <h1 className="font-display text-3xl md:text-5xl mt-2 text-[#171717] font-light tracking-wide">
            {isWholesale
              ? "Wholesale Trade Inventory"
              : isPending
              ? "Wholesale Sample Catalogue"
              : "The Complete Collection"}
          </h1>
          <p className="mt-2 text-xs md:text-sm text-[#35383A] max-w-2xl leading-relaxed">
            {isWholesale
              ? "Industrial direct manufacturing inventory. Lab-grown diamonds calibrated to E–F Color and VVS1 Clarity, IGI certified, with automatic volume tier discounts (10+, 25+, 50+ units)."
              : isPending
              ? "Previewing wholesale inventory for trade verification. Wholesale tier pricing is locked. You can order single-piece retailer quality samples or fast-track approval."
              : "Shop handcrafted lab-grown diamond tennis bracelets, IGI certified solitaire engagement rings, Toi et Moi pairings, and fine jewellery. Free insured FedEx/DHL delivery."}
          </p>
        </div>

        {/* Persona Switcher / Info CTAs */}
        {isWholesale ? (
          <div className="bg-[#FAF9F6] p-4 border border-[#52B788] rounded-[3px] flex items-center gap-3 text-xs text-[#171717] shadow-xs">
            <CheckCircle2 className="h-5 w-5 text-[#52B788] shrink-0" />
            <div>
              <p className="font-semibold">Wholesale Mode Active</p>
              <Link
                href="/wholesale"
                className="text-[#52B788] font-bold hover:underline"
              >
                Open Bulk Quick-Order Matrix Sheet →
              </Link>
            </div>
          </div>
        ) : isPending ? (
          <div className="bg-[#FFFBF0] p-4 border border-[#D4A359] rounded-[3px] flex items-center gap-3 shadow-xs">
            <Building2 className="h-5 w-5 text-[#D4A359] shrink-0" />
            <div className="text-xs">
              <p className="font-semibold text-[#805809]">Application #APP-8042 In Review</p>
              <button
                type="button"
                onClick={() => {
                  setUserRole("wholesale_approved");
                  showToast("🎉 Application approved! Wholesale rates unlocked.");
                }}
                className="text-[#171717] font-bold hover:underline cursor-pointer block mt-0.5"
              >
                ⚡ Fast-Track Instant Approval (Demo) →
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#FAF9F6] p-4 border border-[#B7A078]/40 rounded-[3px] flex items-center gap-3 shadow-xs">
            <Building2 className="h-5 w-5 text-[#B7A078] shrink-0" />
            <div className="text-xs">
              <p className="font-semibold text-[#171717]">Jewellery Retailer or Wholesaler?</p>
              <button
                type="button"
                onClick={() => setUserRole("wholesale_approved")}
                className="text-[#B7A078] font-bold hover:underline cursor-pointer"
              >
                Switch to B2B mode to view factory wholesale rates →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Diamond Shape Filter Bar (Raul Diamonds Reference) */}
      <div className="py-5 border-b border-[#E2E4E6] overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-[11px] uppercase tracking-[0.16em] font-bold text-[#786848] mr-2">
            Shop by Shape:
          </span>
          <button
            type="button"
            onClick={() => setSelectedShape("All")}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-[2px] border transition-all cursor-pointer ${
              selectedShape === "All"
                ? "bg-[#171717] text-white border-[#171717]"
                : "bg-white text-[#35383A] border-[#E2E4E6] hover:border-[#171717]"
            }`}
          >
            All Shapes
          </button>
          {DIAMOND_SHAPES.map((shape) => (
            <button
              key={shape.name}
              type="button"
              onClick={() => setSelectedShape(shape.name)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-[2px] border transition-all cursor-pointer ${
                selectedShape === shape.name
                  ? "bg-[#171717] text-white border-[#171717]"
                  : "bg-white text-[#35383A] border-[#E2E4E6] hover:border-[#171717]"
              }`}
            >
              <span className="text-[10px] text-[#B7A078]">{shape.icon}</span>
              <span>{shape.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Top Filter Bar */}
      <div className="flex items-center justify-between border-b border-[#E2E4E6] py-3.5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="eyebrow flex items-center gap-2 lg:hidden text-[#171717] cursor-pointer"
          >
            <SlidersHorizontal className="h-4 w-4 stroke-[1.25]" />
            <span>Filters</span>
          </button>

          <p className="eyebrow text-[#35383A] text-[11px]">
            {filteredItems.length} {filteredItems.length === 1 ? "design" : "designs"} available
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-[#B7A078] hover:underline font-medium cursor-pointer ml-2"
            >
              Reset Filters
            </button>
          )}
        </div>

        <label className="eyebrow flex items-center gap-3 text-[#171717]">
          <span className="text-[#35383A]/70 text-[10px]">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="eyebrow bg-transparent outline-none cursor-pointer border-b border-[#171717] pb-0.5 text-xs"
          >
            <option value="featured">Featured Selection</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </label>
      </div>

      {/* Main Layout: Sidebar + Grid */}
      <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-7">
          {/* Categories */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#786848] mb-3">
              Jewellery Category
            </h4>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className="flex cursor-pointer items-center gap-2.5 text-xs text-[#171717] hover:text-[#B7A078] transition-colors"
                >
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 accent-[#171717]"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => {
                      setSelectedCategories((prev) =>
                        prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
                      );
                    }}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#786848] mb-3">
              Price Range ({isWholesale ? "Wholesale" : "Retail"})
            </h4>
            <div className="space-y-2">
              {PRICE_TIERS.map((tier) => (
                <label
                  key={tier.id}
                  className="flex cursor-pointer items-center gap-2.5 text-xs text-[#171717] hover:text-[#B7A078] transition-colors"
                >
                  <input
                    type="radio"
                    name="price_filter"
                    className="h-3.5 w-3.5 accent-[#171717]"
                    checked={selectedPriceTier === tier.id}
                    onChange={() => setSelectedPriceTier(tier.id)}
                  />
                  <span>{tier.label}</span>
                </label>
              ))}
              {selectedPriceTier && (
                <button
                  type="button"
                  onClick={() => setSelectedPriceTier(null)}
                  className="text-[10px] text-[#B7A078] hover:underline block pt-1"
                >
                  Clear Price Filter
                </button>
              )}
            </div>
          </div>

          {/* Stock Availability */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#786848] mb-3">
              Stock & Production
            </h4>
            <div>
              <label className="flex cursor-pointer items-center gap-2.5 text-xs text-[#171717]">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 accent-[#171717]"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <span>Ready to Ship in 24h</span>
              </label>
            </div>
          </div>

          {/* Manufacturing Standard Box */}
          <div className="p-4 bg-[#FAF9F6] border border-[#E0DBD2] rounded-[3px] text-xs space-y-2">
            <p className="font-display font-medium text-base text-[#171717]">
              The Raul Standard
            </p>
            <p className="text-[11px] text-[#555] leading-relaxed">
              Every diamond is precision calibrated: E–F Color, VVS1 Clarity, and Excellent/Ideal symmetry with IGI grading.
            </p>
            <div className="pt-2 text-[10px] text-[#786848] font-bold space-y-1">
              <p>◆ Free Insured Shipping</p>
              <p>◆ 30-Day Returns</p>
              <p>◆ Lifetime Warranty</p>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main>
          {filteredItems.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-[#E2E4E6] rounded p-8">
              <p className="font-display text-2xl text-[#171717]">No pieces match your filters</p>
              <p className="mt-2 text-xs text-[#35383A]">
                Try adjusting your diamond shape or category selections.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 px-6 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold rounded"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {filteredItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative ml-auto h-full w-full max-w-xs bg-white p-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E4E6]">
              <span className="eyebrow font-bold text-[#171717]">Filters</span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-[#35383A]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {/* Category */}
              <div>
                <h4 className="eyebrow text-[#B7A078] text-[10px]">Category</h4>
                <div className="mt-3 space-y-2">
                  {CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => {
                          setSelectedCategories((prev) =>
                            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
                          );
                        }}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Diamond Shape */}
              <div>
                <h4 className="eyebrow text-[#B7A078] text-[10px]">Diamond Shape</h4>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedShape("All")}
                    className={`px-2.5 py-1 text-[11px] rounded border ${
                      selectedShape === "All" ? "bg-black text-white" : "bg-gray-100"
                    }`}
                  >
                    All
                  </button>
                  {DIAMOND_SHAPES.map((shape) => (
                    <button
                      key={shape.name}
                      type="button"
                      onClick={() => setSelectedShape(shape.name)}
                      className={`px-2.5 py-1 text-[11px] rounded border ${
                        selectedShape === shape.name ? "bg-black text-white" : "bg-gray-100"
                      }`}
                    >
                      {shape.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="mt-8 w-full py-3 bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold"
            >
              Apply Filters ({filteredItems.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
