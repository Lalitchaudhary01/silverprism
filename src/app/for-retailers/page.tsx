"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  Percent,
  Layers,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function ForRetailersPage() {
  const { userRole, setUserRole, submitApplication, applications } = useStore();

  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    gstin: "",
    businessType: "Multi-Brand Jewellery Retailer",
    annualVolume: "₹10L – ₹25L",
    address: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.email || !formData.phone) {
      alert("Please fill in the required business details.");
      return;
    }
    submitApplication(formData);
    setSubmitted(true);
  };

  const isApproved = userRole === "wholesale_approved";
  const isPending = userRole === "wholesale_pending";

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
      {/* Header */}
      <header className="max-w-3xl pb-12 border-b border-[#E2E4E6]">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B7A078]/15 border border-[#B7A078]/30 text-[#B7A078] text-[10px] uppercase tracking-[0.2em] font-bold rounded mb-4">
          <Building2 className="h-3 w-3" />
          <span>B2B Wholesale & Partner Network</span>
        </div>
        <h1 className="display-lg text-[#171717]">
          BUILT FOR BUSINESSES
          <br />
          <span className="text-[#B7A078] italic">THAT AIM HIGHER.</span>
        </h1>
        <p className="mt-4 text-sm md:text-base text-[#35383A] leading-relaxed font-light">
          Partner directly with SILVERPRISM to source factory-certified 925 sterling
          silver jewellery. Enjoy preferential tiered pricing, low MOQs, and proprietary
          manufacturing capabilities.
        </p>
      </header>

      {/* Status Alert if in Pending or Approved State */}
      {isApproved && (
        <div className="mt-8 p-6 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-sm flex items-start gap-4">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-base">Authorized Wholesale Account Active</h3>
            <p className="text-xs text-emerald-800 mt-1">
              Your business is approved for wholesale pricing, volume discount tiers, and bulk order checkout.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="/shop"
                className="px-4 py-2 bg-emerald-700 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-emerald-800 transition-colors"
              >
                Browse Wholesale Catalogue
              </Link>
              <Link
                href="/admin"
                className="px-4 py-2 border border-emerald-700 text-emerald-800 text-xs uppercase tracking-wider font-semibold rounded hover:bg-emerald-100 transition-colors"
              >
                View Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}

      {isPending && (
        <div className="mt-8 p-6 bg-amber-50 border border-amber-300 text-amber-900 rounded-sm flex items-start gap-4">
          <Clock className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-base">Wholesale Application Under Review</h3>
            <p className="text-xs text-amber-800 mt-1">
              Your trade application has been submitted to the SilverPrism manufacturing team. For demonstration testing, you can approve this application immediately via the top <strong>Role Switcher Bar</strong> or in the <strong>Admin Dashboard</strong>.
            </p>
            <button
              type="button"
              onClick={() => setUserRole("wholesale_approved")}
              className="mt-3 px-4 py-2 bg-[#B7A078] text-[#171717] text-xs font-bold uppercase tracking-wider rounded hover:bg-[#171717] hover:text-white transition-colors"
            >
              Simulate Instant Wholesale Approval →
            </button>
          </div>
        </div>
      )}

      {/* Grid: Advantages + Application Form */}
      <div className="mt-16 grid gap-16 lg:grid-cols-12">
        {/* Left: Wholesale Advantages */}
        <div className="lg:col-span-6 space-y-10">
          <div>
            <h3 className="font-display text-2xl font-medium text-[#171717]">
              Why Retailers Partner with SilverPrism
            </h3>
            <p className="mt-2 text-xs text-[#35383A] leading-relaxed">
              We eliminate traditional middleman markups by connecting your business
              directly to our certified casting and electroplating facilities.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="p-5 border border-[#E2E4E6] bg-white rounded">
              <Percent className="h-6 w-6 text-[#B7A078]" />
              <h4 className="font-display text-base font-semibold mt-3 text-[#171717]">
                35%–50% Trade Margins
              </h4>
              <p className="text-xs text-[#35383A] mt-1 leading-relaxed">
                Wholesale pricing pegged directly to metal and stone weights, giving you
                healthy retail gross margins.
              </p>
            </div>

            <div className="p-5 border border-[#E2E4E6] bg-white rounded">
              <Layers className="h-6 w-6 text-[#B7A078]" />
              <h4 className="font-display text-base font-semibold mt-3 text-[#171717]">
                Accessible MOQs
              </h4>
              <p className="text-xs text-[#35383A] mt-1 leading-relaxed">
                Start stocking premium silver collections with minimum order quantities as low
                as 5 units per design.
              </p>
            </div>

            <div className="p-5 border border-[#E2E4E6] bg-white rounded">
              <ShieldCheck className="h-6 w-6 text-[#B7A078]" />
              <h4 className="font-display text-base font-semibold mt-3 text-[#171717]">
                BIS Hallmarked
              </h4>
              <p className="text-xs text-[#35383A] mt-1 leading-relaxed">
                Every unit is government-accredited and laser hallmarked to guarantee 92.5%
                pure silver fineness.
              </p>
            </div>

            <div className="p-5 border border-[#E2E4E6] bg-white rounded">
              <Sparkles className="h-6 w-6 text-[#B7A078]" />
              <h4 className="font-display text-base font-semibold mt-3 text-[#171717]">
                Custom OEM Branding
              </h4>
              <p className="text-xs text-[#35383A] mt-1 leading-relaxed">
                Optional custom logo laser engraving and branded velour packaging available for
                qualifying partner orders.
              </p>
            </div>
          </div>

          {/* Testimonial / Client Proof */}
          <div className="p-6 bg-[#171717] text-[#FAF9F6] rounded">
            <p className="font-display text-lg italic text-[#C8CBCD]">
              &ldquo;SilverPrism has transformed our silver jewellery assortment. Their 2.0-micron
              rhodium finish never tarnishes on display, and their reorder turnaround is under
              10 business days.&rdquo;
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between text-xs text-[#B7A078]">
              <span>— Rajesh Singhania, MD</span>
              <span>Aura Luxury Jewels (Bandra, Mumbai)</span>
            </div>
          </div>
        </div>

        {/* Right: Application Form */}
        <div className="lg:col-span-6 bg-white border border-[#E2E4E6] p-8 md:p-10 rounded shadow-xs">
          <h3 className="font-display text-2xl font-medium text-[#171717]">
            Wholesale Account Application
          </h3>
          <p className="mt-1 text-xs text-[#35383A]">
            Complete this form to apply for wholesale pricing access. Applications are verified within 24 business hours.
          </p>

          {submitted ? (
            <div className="mt-8 p-6 bg-emerald-50 border border-emerald-300 text-center rounded">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
              <h4 className="font-display text-xl font-medium text-emerald-900 mt-3">
                Application Received Successfully
              </h4>
              <p className="text-xs text-emerald-800 mt-2 max-w-sm mx-auto">
                Thank you for applying. Your application has been logged into the SilverPrism Admin queue.
              </p>
              <button
                type="button"
                onClick={() => setUserRole("wholesale_approved")}
                className="mt-6 px-6 py-2.5 bg-[#171717] text-[#FAF9F6] text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#B7A078] transition-colors"
              >
                Switch to Approved Wholesale Mode (Demo)
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                    Company / Trade Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Maya Jewels Pvt Ltd"
                    className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="e.g. Vikram Mehta"
                    className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="procurement@brand.com"
                    className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98200 12345"
                    className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                    GSTIN / Tax ID (Optional for Demo)
                  </label>
                  <input
                    type="text"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                    placeholder="27AAACR1234M1Z8"
                    className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                    Business Model
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717] cursor-pointer"
                  >
                    <option value="Multi-Brand Jewellery Retailer">Multi-Brand Jewellery Retailer</option>
                    <option value="Online Jewellery Boutique">Online Jewellery Boutique</option>
                    <option value="Regional Chain / Department Store">Regional Chain / Department Store</option>
                    <option value="Wholesale Distributor">Wholesale Distributor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                  Estimated Monthly Sourcing Volume
                </label>
                <select
                  value={formData.annualVolume}
                  onChange={(e) => setFormData({ ...formData, annualVolume: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717] cursor-pointer"
                >
                  <option value="Under ₹5 Lakhs">Under ₹5 Lakhs / month</option>
                  <option value="₹5L – ₹15L / month">₹5 Lakhs – ₹15 Lakhs / month</option>
                  <option value="₹15L – ₹30L / month">₹15 Lakhs – ₹30 Lakhs / month</option>
                  <option value="₹30L+ / month">₹30 Lakhs+ / month (Enterprise VIP)</option>
                </select>
              </div>

              <div>
                <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                  Store Address / Head Office
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address, city, state"
                  className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2 text-xs outline-none focus:border-[#171717] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#171717] text-[#FAF9F6] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#B7A078] transition-colors"
              >
                Submit Wholesale Application
              </button>

              <p className="text-[10px] text-[#35383A]/70 text-center">
                Instant simulated validation. No financial liabilities in demo mode.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
