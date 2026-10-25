"use client";

import React, { useState } from "react";
import { CheckCircle2, Building2, Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
      <header className="max-w-3xl pb-12 border-b border-[#E2E4E6]">
        <p className="eyebrow text-[#B7A078]">Atelier & Trade Office</p>
        <h1 className="display-lg mt-2 text-[#171717]">Get in Touch</h1>
        <p className="mt-3 text-sm text-[#35383A] leading-relaxed">
          For retail styling questions, wholesale account support, or custom OEM
          casting inquiries.
        </p>
      </header>

      <div className="mt-16 grid gap-16 lg:grid-cols-12">
        {/* Form */}
        <div className="lg:col-span-7 bg-white border border-[#E2E4E6] p-8 md:p-10 rounded shadow-xs">
          <h3 className="font-display text-2xl font-medium text-[#171717]">
            Send an Enquiry
          </h3>
          <p className="text-xs text-[#35383A] mt-1">
            Our trade desk responds to all messages within 24 hours.
          </p>

          {submitted ? (
            <div className="mt-8 p-8 bg-emerald-50 border border-emerald-300 text-center rounded">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
              <h4 className="font-display text-xl font-medium text-emerald-900 mt-3">
                Message Sent to Trade Concierge
              </h4>
              <p className="text-xs text-emerald-800 mt-2">
                Thank you for your enquiry. A client representative will respond promptly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-wider rounded"
              >
                Send Another Message
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sameer Varma"
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
                    placeholder="sameer@domain.com"
                    className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                  />
                </div>
              </div>

              <div>
                <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                  Enquiry Type
                </label>
                <select className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717] cursor-pointer">
                  <option value="Wholesale Partnership">Wholesale B2B Partnership</option>
                  <option value="Custom OEM Manufacturing">Custom OEM Manufacturing</option>
                  <option value="Retail Order Inquiry">Retail Order & Sizing Assistance</option>
                  <option value="Export Logistics">Export & Consignment Freight</option>
                </select>
              </div>

              <div>
                <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us how we can assist your jewellery requirements..."
                  className="w-full bg-[#FAF9F6] border border-[#E2E4E6] px-3.5 py-2 text-xs outline-none focus:border-[#171717] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#171717] text-[#FAF9F6] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#B7A078] transition-colors"
              >
                Transmit Enquiry
              </button>
            </form>
          )}
        </div>

        {/* Trade Office Info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="eyebrow text-[#B7A078]">Headquarters & Plant</span>
            <h3 className="font-display text-2xl font-medium mt-2 text-[#171717]">
              SILVERPRISM Manufacturing Plant
            </h3>
            <p className="text-xs text-[#35383A] mt-2 leading-relaxed">
              Plot 48, SEEPZ Special Economic Zone, Andheri East, Mumbai, Maharashtra 400096, India.
            </p>
          </div>

          <div className="space-y-4 text-xs text-[#35383A]">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#B7A078]" />
              <span>trade@silverprism.lovable.app</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[#B7A078]" />
              <span>+91 (0) 22 2829 4500 (Trade Desk)</span>
            </div>
          </div>

          <div className="p-6 bg-[#E8EAEB]/40 border border-[#E2E4E6] rounded text-xs space-y-2">
            <p className="font-semibold text-[#171717]">Visiting Hours</p>
            <p className="text-[#35383A]">
              Trade showroom visits and factory walkthroughs are available by advance appointment for registered corporate buyers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
