import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { COLLECTIONS, getProductsByCollection } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const col = COLLECTIONS.find((c) => c.slug === slug);
  if (!col) return { title: "Collection Not Found | SILVERPRISM" };

  return {
    title: `${col.title} — 925 Silver Jewellery | SILVERPRISM`,
    description: col.description,
  };
}

export default async function CollectionSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const col = COLLECTIONS.find((c) => c.slug === slug);
  if (!col) notFound();

  const products = getProductsByCollection(slug);

  return (
    <>
      {/* Cinematic Hero */}
      <section className="relative h-[65vh] min-h-[460px] overflow-hidden bg-[#171717] text-[#FAF9F6]">
        <img
          src={col.image}
          alt={col.title}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(23,23,23,0.3) 30%, rgba(23,23,23,0.85) 100%)" }}
        />

        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-16 md:px-12">
          <p className="eyebrow text-[#B7A078]">Collection {col.num}</p>
          <h1 className="display-xl mt-3 max-w-4xl">{col.title}</h1>
          <p className="mt-4 max-w-xl text-[#C8CBCD] text-sm md:text-base leading-relaxed">
            {col.description}
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="flex justify-between items-center pb-6 border-b border-[#E2E4E6]">
          <h2 className="font-display text-2xl font-medium">Pieces in this Collection</h2>
          <span className="eyebrow text-[#35383A]">{products.length} Designs</span>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:gap-x-8 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
