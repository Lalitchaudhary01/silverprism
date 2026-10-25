"use client";

import React, { useState } from "react";
import {
  Cpu,
  CheckCircle2,
  FileCheck2,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { MANUFACTURING_CAPABILITIES } from "@/data/products";

export default function ManufacturingPage() {
  const [form, setForm] = useState({
    brandName: "",
    contactName: "",
    email: "",
    category: "Rings",
    targetQty: "50–100 units",
    metalSpec: "925 Sterling Silver + 2.0μm Rhodium",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
      {/* Header */}
      <header className="max-w-3xl pb-12 border-b border-[#E2E4E6]">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] text-[#B7A078] text-[10px] uppercase tracking-[0.2em] font-bold rounded mb-4">
          <Cpu className="h-3 w-3" />
          <span>Industrial Manufacturing Division</span>
        </div>
        <h1 className="display-lg text-[#171717]">
          FROM CONCEPT
          <br />
          <span className="text-[#B7A078] italic">TO CRAFTSMANSHIP.</span>
        </h1>
        <p className="mt-4 text-sm md:text-base text-[#35383A] leading-relaxed font-light">
          SILVERPRISM operates an integrated jewellery engineering plant combining German
          induction vacuum casting, micro-DLP 3D wax printing, and multi-micron hard
          electroplating for international brands and discerning retail networks.
        </p>
      </header>

      {/* 6 Core Capabilities Grid */}
      <div className="mt-16 space-y-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {MANUFACTURING_CAPABILITIES.map((cap) => (
            <div
              key={cap.id}
              className="bg-white border border-[#E2E4E6] p-8 flex flex-col justify-between rounded shadow-xs hover:border-[#171717] transition-colors"
            >
              <div>
                <span className="font-display text-2xl text-[#B7A078] font-bold">
                  {cap.number}
                </span>
                <h3 className="font-display text-xl font-medium mt-2 text-[#171717]">
                  {cap.title}
                </h3>
                <p className="eyebrow text-[#B7A078] text-[9px] mt-1">
                  {cap.subtitle}
                </p>
                <p className="mt-4 text-xs text-[#35383A] leading-relaxed">
                  {cap.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E4E6]">
                <p className="text-[10px] uppercase tracking-wider text-[#35383A]/70 font-semibold mb-2">
                  Technical Parameters:
                </p>
                <ul className="space-y-1.5 text-xs text-[#171717]">
                  {cap.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[11px]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#B7A078] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Manufacturing RFQ Quote Request Section */}
      <div className="mt-24 bg-[#171717] text-[#FAF9F6] p-8 md:p-16 rounded border border-[#2A2D2F]">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-4">
            <span className="eyebrow text-[#B7A078]">Request Factory Quotation</span>
            <h2 className="display-lg text-[#FAF9F6]">
              Commission Custom OEM / ODM Production
            </h2>
            <p className="text-xs md:text-sm text-[#C8CBCD] leading-relaxed">
              Submit your technical specifications or design brief. Our engineering
              team will calculate metal weights, stone setting counts, tooling costs,
              and deliver a formal production quote within 48 business hours.
            </p>

            <div className="pt-4 space-y-3 text-xs text-[#C8CBCD]">
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-[#B7A078]" />
                <span>Strict Non-Disclosure Agreement (NDA) Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#B7A078]" />
                <span>Exclusive Mould Rights Retained by Buyer</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#25282A] p-6 md:p-8 rounded border border-white/10">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle2 className="h-12 w-12 text-[#B7A078] mx-auto" />
                <h3 className="font-display text-2xl font-medium mt-4">
                  Enquiry Logged with Technical Division
                </h3>
                <p className="text-xs text-[#C8CBCD] mt-2 max-w-sm mx-auto">
                  Thank you, {form.contactName}. Reference RFQ-2026-{Math.floor(1000 + Math.random() * 9000)} has been created for {form.brandName}.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-[#B7A078] text-[#171717] text-xs uppercase tracking-wider font-bold rounded"
                >
                  Submit Another Project
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="eyebrow block text-[10px] text-[#C8CBCD] mb-1">
                      Brand or Atelier Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.brandName}
                      onChange={(e) => setForm({ ...form, brandName: e.target.value })}
                      placeholder="e.g. Solstice Jewels Ltd"
                      className="w-full bg-[#171717] border border-white/20 px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#B7A078]"
                    />
                  </div>
                  <div>
                    <label className="eyebrow block text-[10px] text-[#C8CBCD] mb-1">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.contactName}
                      onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      placeholder="e.g. Priya Nambiar"
                      className="w-full bg-[#171717] border border-white/20 px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#B7A078]"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="eyebrow block text-[10px] text-[#C8CBCD] mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="design@brand.com"
                      className="w-full bg-[#171717] border border-white/20 px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#B7A078]"
                    />
                  </div>
                  <div>
                    <label className="eyebrow block text-[10px] text-[#C8CBCD] mb-1">
                      Jewellery Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full bg-[#171717] border border-white/20 px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#B7A078] cursor-pointer"
                    >
                      <option value="Rings">Rings & Bands</option>
                      <option value="Pendants">Pendants & Medallions</option>
                      <option value="Earrings">Earrings & Drops</option>
                      <option value="Cuffs">Solid Cuffs & Torques</option>
                      <option value="Chains">Chains & Articulated Links</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="eyebrow block text-[10px] text-[#C8CBCD] mb-1">
                      Estimated Production Quantity
                    </label>
                    <select
                      value={form.targetQty}
                      onChange={(e) => setForm({ ...form, targetQty: e.target.value })}
                      className="w-full bg-[#171717] border border-white/20 px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#B7A078] cursor-pointer"
                    >
                      <option value="25–50 units">25 – 50 units (Pilot Trial)</option>
                      <option value="50–100 units">50 – 100 units</option>
                      <option value="100–500 units">100 – 500 units (Standard Run)</option>
                      <option value="500+ units">500+ units (Enterprise Commercial)</option>
                    </select>
                  </div>

                  <div>
                    <label className="eyebrow block text-[10px] text-[#C8CBCD] mb-1">
                      Preferred Metallurgy & Finish
                    </label>
                    <select
                      value={form.metalSpec}
                      onChange={(e) => setForm({ ...form, metalSpec: e.target.value })}
                      className="w-full bg-[#171717] border border-white/20 px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#B7A078] cursor-pointer"
                    >
                      <option value="925 Sterling Silver + 2.0μm Rhodium">925 Silver + 2.0μm Rhodium</option>
                      <option value="925 Silver + 18K Yellow Gold Vermeil (2.5μm)">925 Silver + 18K Yellow Gold Vermeil</option>
                      <option value="925 Silver + 18K Rose Gold Plated">925 Silver + 18K Rose Gold</option>
                      <option value="Dual Tone Black Ruthenium & Silver">Dual Tone Black Ruthenium & Silver</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="eyebrow block text-[10px] text-[#C8CBCD] mb-1">
                    Design Brief / Dimensions / Stone Notes
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Describe design features, stone sizes, target piece price, or delivery timeline..."
                    className="w-full bg-[#171717] border border-white/20 px-3.5 py-2 text-xs text-white outline-none focus:border-[#B7A078] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#B7A078] text-[#171717] text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors"
                >
                  Submit Project for Feasibility Analysis
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
