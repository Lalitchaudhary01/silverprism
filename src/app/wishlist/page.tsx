"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const wishedProducts = PRODUCTS.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
      <div className="pb-8 border-b border-[#E2E4E6]">
        <p className="eyebrow text-[#B7A078]">Personal Archives</p>
        <h1 className="display-lg mt-1 text-[#171717]">Saved Pieces ({wishedProducts.length})</h1>
        <p className="text-xs text-[#35383A] mt-1">
          Pieces saved to your device for future consideration or bulk procurement.
        </p>
      </div>

      {wishedProducts.length === 0 ? (
        <div className="py-24 text-center border-b border-[#E2E4E6]">
          <p className="font-display text-2xl font-light text-[#171717]">
            Your wishlist is empty
          </p>
          <p className="mt-2 text-xs text-[#35383A]">
            Click the heart icon on any piece to save it to your curated list.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block px-7 py-3 bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold"
          >
            Explore Catalogue
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:gap-x-8 lg:grid-cols-4">
          {wishedProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
