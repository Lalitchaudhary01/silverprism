import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PRODUCTS, getProduct } from "@/data/products";
import { ProductDetailClient } from "./ProductDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product Not Found | SILVERPRISM" };

  return {
    title: `${product.name} (${product.sku}) — 925 Silver | SILVERPRISM`,
    description: product.description,
  };
}

export default async function ProductSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const relatedProducts = PRODUCTS.filter(
    (p) => p.slug !== product.slug && (p.category === product.category || p.collection === product.collection)
  ).slice(0, 4);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
