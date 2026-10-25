"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How does the dual B2C / B2B customer model work on SilverPrism?",
    a: "SilverPrism operates a single unified architecture. Retail consumers can browse and buy single pieces with inclusive GST and insured delivery. Verified B2B wholesale buyers unlock tiered factory prices (35%–50% off retail) with minimum order quantities (MOQ starting at 5 units) and commercial invoice terms.",
  },
  {
    q: "How do I gain access to wholesale pricing?",
    a: "Navigate to the 'For Retailers' page and submit the Wholesale Application with your business details and GSTIN. For demonstration purposes, you can also toggle 'Approved B2B (Wholesale)' instantly via the top Role Switcher Bar.",
  },
  {
    q: "What is the purity standard of the silver used?",
    a: "All jewellery is manufactured from 92.5% pure sterling silver grain alloyed with certified anti-fire-scale deoxidizers. Every production batch is XRF spectrometer tested and laser hallmarked by the Bureau of Indian Standards (BIS).",
  },
  {
    q: "What electroplating specifications do you offer for OEM production?",
    a: "We offer hard white rhodium (up to 2.0 microns), 18K yellow gold vermeil (up to 2.5 microns), rose gold, and black ruthenium. All finishes receive an electrophoretic clear ceramic barrier coat tested for 96 hours of salt-spray resistance.",
  },
  {
    q: "How does payment processing and Razorpay work in this application?",
    a: "The platform integrates server-side Razorpay order generation and cryptographic HMAC SHA256 payment signature verification. In this demo, test credentials or simulated checkout confirms transactions without charging actual bank accounts. Full API code is structured in /api/razorpay.",
  },
  {
    q: "What are the shipping and export insurance terms?",
    a: "Domestic shipments are dispatched via armored logistics providers with 100% door-to-door transit insurance. International export consignments include harmonized customs declarations and DHL Express courier tracking.",
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-[960px] px-6 py-20 md:px-12 md:py-28">
      <header className="pb-12 border-b border-[#E2E4E6] text-center">
        <p className="eyebrow text-[#B7A078]">Trade Knowledgebase</p>
        <h1 className="display-lg mt-2 text-[#171717]">Frequently Asked Questions</h1>
        <p className="mt-3 text-sm text-[#35383A]">
          Answers to retail purchasing, wholesale MOQs, hallmarking, and payment integration.
        </p>
      </header>

      <div className="mt-12 divide-y divide-[#E2E4E6] border-y border-[#E2E4E6]">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="py-6">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left group"
              >
                <span className="font-display text-xl font-medium text-[#171717] group-hover:text-[#B7A078] transition-colors">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-[#35383A] transition-transform duration-300 ml-4 shrink-0 ${
                    isOpen ? "rotate-180 text-[#B7A078]" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <p className="mt-4 text-xs md:text-sm text-[#35383A] leading-relaxed animate-in fade-in duration-300">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-16 p-8 bg-[#E8EAEB]/40 border border-[#E2E4E6] text-center rounded">
        <h3 className="font-display text-2xl font-medium text-[#171717]">
          Have a Custom Manufacturing Question?
        </h3>
        <p className="mt-2 text-xs text-[#35383A]">
          Contact our technical team for alloy specifications, CAD prototyping, or bulk quote requests.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block px-6 py-3 bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#B7A078] transition-colors"
        >
          Contact Trade Desk
        </Link>
      </div>
    </div>
  );
}
