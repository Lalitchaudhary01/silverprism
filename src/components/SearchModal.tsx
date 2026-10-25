"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { PRODUCTS, formatINR } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, userRole } = useStore();
  const [query, setQuery] = useState("");
  const isWholesale = userRole === "wholesale_approved";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        onClick={() => {
          setIsSearchOpen(false);
          setQuery("");
        }}
        className="fixed inset-0 bg-[#171717]/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] border border-[#E2E4E6] shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200 z-10">
        <div className="flex items-center justify-between border-b border-[#E2E4E6] pb-4">
          <div className="flex items-center gap-3 flex-1">
            <Search className="h-5 w-5 text-[#B7A078]" />
            <input
              type="text"
              autoFocus
              placeholder="Search by product name, SKU (e.g. SP-BRC), or metal..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-lg md:text-xl font-display outline-none text-[#171717] placeholder:text-[#35383A]/50"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setIsSearchOpen(false);
              setQuery("");
            }}
            className="p-1 text-[#35383A] hover:text-[#171717] transition-colors"
          >
            <X className="h-6 w-6 stroke-[1.25]" />
          </button>
        </div>

        {/* Results Area */}
        <div className="mt-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === "" ? (
            <div className="py-8 text-center">
              <p className="eyebrow text-[#B7A078]">Suggested Categories & Terms</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                {[
                  "Sterling Silver Cuff",
                  "Moissanite Ring",
                  "925 Earrings",
                  "SP-BRC-001",
                  "Tennis Bracelet",
                  "Rhodium Plated",
                ].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 bg-[#E8EAEB] text-xs uppercase tracking-[0.15em] text-[#35383A] hover:bg-[#171717] hover:text-[#FAF9F6] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-display text-2xl font-light">No pieces match &ldquo;{query}&rdquo;</p>
              <p className="mt-2 text-sm text-[#35383A]">
                Try searching for rings, cuff, silver, or SKU codes.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#E2E4E6]">
              {results.map((product) => (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  onClick={() => {
                    setIsSearchOpen(false);
                    setQuery("");
                  }}
                  className="flex items-center gap-4 py-3.5 group hover:bg-[#E8EAEB]/40 px-2 transition-colors"
                >
                  <div className="h-16 w-14 shrink-0 bg-[#E8EAEB] overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="eyebrow text-[9.5px] text-[#B7A078]">
                      {product.category} · {product.sku}
                    </p>
                    <h4 className="font-display text-base group-hover:text-[#B7A078] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#35383A] line-clamp-1">
                      {product.material}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums text-[#171717]">
                      {formatINR(isWholesale ? product.wholesalePrice : product.retailPrice)}
                    </p>
                    {isWholesale && (
                      <span className="text-[10px] text-[#B7A078] font-bold">
                        B2B (MOQ {product.moq})
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
