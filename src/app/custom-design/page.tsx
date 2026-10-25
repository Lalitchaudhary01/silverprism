"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Cpu, Sparkles, Layers, ArrowRight } from "lucide-react";

export default function CustomDesignPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
      {/* Header */}
      <header className="max-w-3xl pb-12 border-b border-[#E2E4E6]">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] text-[#B7A078] text-[10px] uppercase tracking-[0.2em] font-bold rounded mb-4">
          <Sparkles className="h-3 w-3" />
          <span>Bespoke CAD & Prototyping</span>
        </div>
        <h1 className="display-lg text-[#171717]">
          PRECISION CAD
          <br />
          <span className="text-[#B7A078] italic">& BESPOKE DESIGN.</span>
        </h1>
        <p className="mt-4 text-sm md:text-base text-[#35383A] leading-relaxed font-light">
          Whether you need a one-of-a-kind statement heirloom or an exclusive 50-piece
          boutique capsule, our master CAD sculptors translate sketches into production-ready
          3D models with 25-micron printing accuracy.
        </p>
      </header>

      {/* 5-Step Process */}
      <div className="mt-16">
        <h2 className="font-display text-2xl font-medium text-[#171717]">
          The 5-Stage Prototyping Pipeline
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              step: "01",
              title: "Conceptual Sketch",
              desc: "Hand-drawn ideation, aesthetic references, and dimension scoping.",
            },
            {
              step: "02",
              title: "MatrixGold 3D CAD",
              desc: "Digital sculpting with calculated metal weight, stone seats, and tolerances.",
            },
            {
              step: "03",
              title: "DLP Wax Printing",
              desc: "25-micron ultra-high definition resin printing ready for direct burnout.",
            },
            {
              step: "04",
              title: "Induction Casting",
              desc: "Vacuum deoxidized 925 sterling silver casting under inert argon gas.",
            },
            {
              step: "05",
              title: "Hand-Set & Polish",
              desc: "Microscopic stone setting, 2.0-micron electroplating, and hallmarking.",
            },
          ].map((item) => (
            <div key={item.step} className="p-6 bg-white border border-[#E2E4E6] rounded">
              <span className="font-display text-2xl text-[#B7A078] font-bold">
                {item.step}
              </span>
              <h3 className="font-display text-lg font-medium mt-2 text-[#171717]">
                {item.title}
              </h3>
              <p className="text-xs text-[#35383A] mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Form & Studio Visual */}
      <div className="mt-20 grid gap-12 lg:grid-cols-12 items-center">
        <div className="lg:col-span-6 overflow-hidden aspect-[4/3] bg-[#E8EAEB] rounded">
          <img
            src="/assets/detail.jpg"
            alt="Macro jewel setting"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="lg:col-span-6 bg-white border border-[#E2E4E6] p-8 md:p-10 rounded">
          <h3 className="font-display text-2xl font-medium text-[#171717]">
            Start a Bespoke Project
          </h3>
          <p className="mt-1 text-xs text-[#35383A]">
            Tell us about your custom design requirements to receive a 3D feasibility assessment.
          </p>

          {submitted ? (
            <div className="mt-6 p-6 bg-emerald-50 border border-emerald-300 text-center rounded">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
              <h4 className="font-display text-lg font-medium text-emerald-900 mt-2">
                Custom CAD Request Initiated
              </h4>
              <p className="text-xs text-emerald-800 mt-1">
                A design engineer will review your brief within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-[#171717] text-white text-xs uppercase tracking-wider rounded"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                  Your Name / Brand *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@domain.com"
                  className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                  Design Description & Reference Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide ring size, stone dimensions, target metal, or upload links..."
                  className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2 text-xs outline-none focus:border-[#171717] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#171717] text-[#FAF9F6] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#B7A078] transition-colors"
              >
                Request Custom CAD Consultation
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
