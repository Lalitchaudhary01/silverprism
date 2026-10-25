"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  Calendar,
  X,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Building2,
  ArrowRight,
} from "lucide-react";

export function Footer() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD $");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "11:00 AM",
    type: "Virtual Video Consultation",
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  return (
    <>
      <footer className="bg-[#121212] text-[#FAF9F6] border-t border-white/10 font-sans">
        {/* ======================================================== */}
        {/* BRAND NAVIGATION GRID (From SilverPrism Platform)        */}
        {/* ======================================================== */}
        <div className="mx-auto max-w-[1440px] px-6 pt-16 pb-12 md:px-12 border-b border-white/10">
          <div className="grid gap-12 md:grid-cols-12">
            {/* Brand Column */}
            <div className="md:col-span-4">
              <Link
                href="/"
                className="inline-block font-display text-2xl md:text-3xl tracking-[0.2em] font-medium hover:opacity-85 transition-opacity"
              >
                SILVERPRISM
              </Link>
              <p className="mt-2 text-xs text-[#C8CBCD] italic">
                Crafted with Precision. Designed to Shine.
              </p>
              <p className="mt-4 text-xs text-[#C8CBCD]/70 leading-relaxed max-w-sm">
                Industrial jewellery manufacturing, direct-to-consumer fine jewellery, and
                authorized B2B wholesale platform.
              </p>

              <div className="mt-5">
                <Link
                  href="/for-retailers"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#B7A078] text-[#171717] text-[11px] font-bold uppercase tracking-[0.16em] rounded hover:bg-white transition-colors"
                >
                  <Building2 className="h-3 w-3" />
                  <span>Wholesale B2B Portal</span>
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs text-[#C8CBCD]">
              <div>
                <p className="eyebrow text-[#B7A078] mb-4 text-[10px]">Catalogue</p>
                <ul className="space-y-2.5">
                  <li>
                    <Link href="/shop" className="hover:text-white transition-colors">
                      All Jewellery
                    </Link>
                  </li>
                  <li>
                    <Link href="/collections" className="hover:text-white transition-colors">
                      Collections Directory
                    </Link>
                  </li>
                  <li>
                    <Link href="/collections/sculpted-silver" className="hover:text-white transition-colors">
                      Sculpted Silver
                    </Link>
                  </li>
                  <li>
                    <Link href="/collections/geometric-prism" className="hover:text-white transition-colors">
                      Geometric Prism
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="eyebrow text-[#B7A078] mb-4 text-[10px]">Manufacturing</p>
                <ul className="space-y-2.5">
                  <li>
                    <Link href="/manufacturing" className="hover:text-white transition-colors">
                      OEM & ODM Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/custom-design" className="hover:text-white transition-colors">
                      CAD Prototyping
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin" className="text-[#B7A078] hover:underline flex items-center gap-1 font-semibold">
                      <span>Admin Console</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/orders" className="hover:text-white transition-colors">
                      Track Order & Invoices
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="eyebrow text-[#B7A078] mb-4 text-[10px]">Client Concierge</p>
                <ul className="space-y-2.5">
                  <li>
                    <Link href="/our-story" className="hover:text-white transition-colors">
                      Our Craft Story
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white transition-colors">
                      Trade Office
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-white transition-colors">
                      Wholesale FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/account" className="hover:text-white transition-colors">
                      Client Account
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DEDICATED CONSULTATION & CONTACT ACTION SECTION (Image) */}
        {/* ======================================================== */}
        <div className="mx-auto max-w-[620px] px-6 py-14 text-center">
          {/* Atelier Address */}
          <p className="text-xs md:text-sm text-[#C8CBCD] tracking-wide">
            160 June St, #2R, Worcester, MA 01602
          </p>
          <p className="mt-1 text-xs text-[#C8CBCD]/70 font-light italic">
            Open by appointment only
          </p>

          {/* Dual Action Buttons: Call Us & Email Us */}
          <div className="mt-7 grid grid-cols-2 gap-3.5">
            <a
              href="tel:+15087999800"
              className="flex items-center justify-center gap-2 py-3.5 px-4 border border-white/25 bg-white/5 text-[#FAF9F6] text-xs uppercase tracking-[0.22em] font-semibold hover:border-white hover:bg-white/10 transition-all rounded-xs"
            >
              <Phone className="h-3.5 w-3.5 text-[#B7A078]" />
              <span>Call Us</span>
            </a>

            <a
              href="mailto:concierge@silverprism.com"
              className="flex items-center justify-center gap-2 py-3.5 px-4 border border-white/25 bg-white/5 text-[#FAF9F6] text-xs uppercase tracking-[0.22em] font-semibold hover:border-white hover:bg-white/10 transition-all rounded-xs"
            >
              <Mail className="h-3.5 w-3.5 text-[#B7A078]" />
              <span>Email Us</span>
            </a>
          </div>

          {/* Book A Free Consultation Button (Full Width White) */}
          <button
            type="button"
            onClick={() => setIsConsultationOpen(true)}
            className="mt-3.5 w-full py-4 px-6 bg-white text-[#121212] text-xs uppercase tracking-[0.24em] font-bold hover:bg-[#B7A078] hover:text-[#121212] transition-colors shadow-md rounded-xs"
          >
            Book a Free Consultation
          </button>

          {/* 4 Circular Social Icons */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="h-11 w-11 rounded-full border border-white/20 bg-white/5 grid place-items-center text-[#FAF9F6] hover:bg-white hover:text-[#121212] hover:border-white transition-all"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="h-11 w-11 rounded-full border border-white/20 bg-white/5 grid place-items-center text-[#FAF9F6] hover:bg-white hover:text-[#121212] hover:border-white transition-all"
            >
              <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* Pinterest */}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="h-11 w-11 rounded-full border border-white/20 bg-white/5 grid place-items-center text-[#FAF9F6] hover:bg-white hover:text-[#121212] hover:border-white transition-all"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="h-11 w-11 rounded-full border border-white/20 bg-white/5 grid place-items-center text-[#FAF9F6] hover:bg-white hover:text-[#121212] hover:border-white transition-all"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-white/10" />

          {/* 6 Diamond Trust Points Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-left text-[11px] md:text-xs tracking-wider uppercase font-semibold text-[#FAF9F6]">
            <div className="flex items-center gap-2">
              <span className="text-[#B7A078] text-[9px]">◆</span>
              <span>IGI CERTIFIED</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#B7A078] text-[9px]">◆</span>
              <span>FREE INSURED SHIPPING</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#B7A078] text-[9px]">◆</span>
              <span>30-DAY RETURNS</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#B7A078] text-[9px]">◆</span>
              <span>LIFETIME WARRANTY</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#B7A078] text-[9px]">◆</span>
              <span>PRICE MATCH GUARANTEE</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#B7A078] text-[9px]">◆</span>
              <span>FREE RING RESIZING</span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-white/10" />

          {/* Currency Dropdown Selector */}
          <div className="relative inline-block text-center">
            <button
              type="button"
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#FAF9F6] hover:text-[#B7A078] transition-colors py-1 px-3 border border-white/15 rounded-xs"
            >
              <span className="text-sm">🇺🇸</span>
              <span>{selectedCurrency}</span>
              <ChevronDown className="h-3 w-3 stroke-[2]" />
            </button>

            {isCurrencyOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-36 bg-[#1C1F21] border border-white/20 shadow-xl rounded py-1 z-20 text-xs">
                {[
                  { flag: "🇺🇸", label: "USD $" },
                  { flag: "🇮🇳", label: "INR ₹" },
                  { flag: "🇬🇧", label: "GBP £" },
                  { flag: "🇪🇺", label: "EUR €" },
                  { flag: "🇦🇪", label: "AED د.إ" },
                ].map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => {
                      setSelectedCurrency(c.label);
                      setIsCurrencyOpen(false);
                    }}
                    className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-white/10 text-white"
                  >
                    <span>{c.flag}</span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Copyright & Legal Links */}
          <div className="mt-6 text-xs text-[#9E9E9E] space-y-2 font-light">
            <p>© 2026 Raul Diamonds LLC. All rights reserved.</p>
            <div className="flex justify-center gap-6 text-[11px] text-[#A0A0A0]">
              <Link href="/faq" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/faq" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/faq" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Authentic Payment Badges Strip & Live Chat Button (Pixel-Matched to Screenshot) */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {/* AMEX */}
            <div className="h-6 w-10 bg-[#002663] text-white text-[8px] font-black rounded-[3px] flex items-center justify-center tracking-tighter">
              AMEX
            </div>

            {/* Apple Pay */}
            <div className="h-6 px-2 bg-white text-black text-[10px] font-semibold rounded-[3px] flex items-center gap-0.5">
              <span className="text-[12px] leading-none mb-0.5"></span>
              <span className="text-[9px] font-semibold tracking-tight">Pay</span>
            </div>

            {/* Diners Club */}
            <div className="h-6 w-10 bg-[#004B87] text-white text-[8px] font-bold rounded-[3px] flex items-center justify-center">
              <div className="flex items-center -space-x-1">
                <span className="h-3 w-3 rounded-full border border-white inline-block"></span>
                <span className="h-3 w-3 rounded-full border border-white inline-block"></span>
              </div>
            </div>

            {/* Discover */}
            <div className="h-6 px-1.5 bg-white text-[#111] text-[8px] font-extrabold rounded-[3px] flex items-center border border-gray-200">
              <span>DISC</span>
              <span className="h-2 w-2 rounded-full bg-[#FF6000] mx-[1px] inline-block"></span>
              <span>VER</span>
            </div>

            {/* Google Pay */}
            <div className="h-6 px-2 bg-white text-[#5f6368] text-[9px] font-medium rounded-[3px] flex items-center gap-0.5 border border-gray-200">
              <span className="font-bold text-[#4285F4]">G</span>
              <span className="text-gray-700 font-medium">Pay</span>
            </div>

            {/* Mastercard */}
            <div className="h-6 w-9 bg-[#222222] rounded-[3px] flex items-center justify-center">
              <div className="flex items-center -space-x-1.5">
                <span className="h-3.5 w-3.5 rounded-full bg-[#EB001B] inline-block" />
                <span className="h-3.5 w-3.5 rounded-full bg-[#F79E1B] inline-block opacity-90" />
              </div>
            </div>

            {/* PayPal */}
            <div className="h-6 px-2 bg-white text-[#003087] text-[9px] font-black italic rounded-[3px] flex items-center border border-gray-200">
              <span className="text-[#003087]">Pay</span>
              <span className="text-[#0079C1]">Pal</span>
            </div>

            {/* Shop Pay */}
            <div className="h-6 px-2 bg-[#5A31F4] text-white text-[9px] font-bold rounded-[3px] flex items-center">
              shop
            </div>

            {/* Live Chat Bubble Icon Button */}
            <button
              type="button"
              onClick={() => alert("Connecting you with our Private Atelier Concierge...")}
              aria-label="Open live concierge chat"
              className="h-6 w-6 rounded-full border border-white/30 text-white grid place-items-center hover:bg-white hover:text-black transition-colors ml-1.5 cursor-pointer"
            >
              <MessageCircle className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* BOOK A FREE CONSULTATION MODAL DIALOG                     */}
      {/* ======================================================== */}
      {isConsultationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsConsultationOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
          />

          <div className="relative w-full max-w-lg bg-[#FAF9F6] text-[#171717] p-8 md:p-10 shadow-2xl rounded border border-[#B7A078] z-10 animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsConsultationOpen(false)}
              className="absolute right-5 top-5 p-1 text-[#35383A] hover:text-[#171717]"
            >
              <X className="h-5 w-5" />
            </button>

            {bookingSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="h-12 w-12 text-[#B7A078] mx-auto" />
                <h3 className="font-display text-2xl font-medium mt-4">
                  Consultation Booked
                </h3>
                <p className="text-xs text-[#35383A] mt-2 leading-relaxed">
                  Thank you, <strong>{bookingForm.name}</strong>. Your session for{" "}
                  <strong>{bookingForm.date || "your requested date"}</strong> at{" "}
                  <strong>{bookingForm.time}</strong> has been scheduled. A private invitation has been emailed to{" "}
                  <strong>{bookingForm.email}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setBookingSubmitted(false);
                    setIsConsultationOpen(false);
                  }}
                  className="mt-6 px-6 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-[#B7A078]"
                >
                  Close Confirmation
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <p className="eyebrow text-[#B7A078] text-[10px]">Private Atelier Session</p>
                  <h3 className="font-display text-2xl font-medium mt-1">
                    Book a Free Consultation
                  </h3>
                  <p className="text-xs text-[#35383A] mt-1">
                    Meet with our jewellery specialists for diamond sizing, bespoke engagement rings, or wholesale procurement.
                  </p>
                </div>

                <div>
                  <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                    Consultation Type
                  </label>
                  <select
                    value={bookingForm.type}
                    onChange={(e) => setBookingForm({ ...bookingForm, type: e.target.value })}
                    className="w-full bg-white border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717] cursor-pointer"
                  >
                    <option value="Virtual Video Consultation">Virtual Video Consultation (Zoom / Meet)</option>
                    <option value="Atelier Private Viewing (Worcester)">Atelier Private Viewing (Worcester, MA)</option>
                    <option value="Wholesale B2B Line Review">Wholesale B2B Commercial Line Review</option>
                    <option value="Custom CAD Bridal Commission">Custom CAD Bridal Commission</option>
                  </select>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rachel Adams"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full bg-white border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                    />
                  </div>

                  <div>
                    <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rachel@example.com"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="w-full bg-white border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="w-full bg-white border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717]"
                    />
                  </div>

                  <div>
                    <label className="eyebrow block text-[10px] text-[#35383A] mb-1">
                      Time Slot
                    </label>
                    <select
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                      className="w-full bg-white border border-[#E2E4E6] px-3.5 py-2.5 text-xs outline-none focus:border-[#171717] cursor-pointer"
                    >
                      <option value="10:00 AM EST">10:00 AM EST</option>
                      <option value="11:30 AM EST">11:30 AM EST</option>
                      <option value="02:00 PM EST">02:00 PM EST</option>
                      <option value="04:30 PM EST">04:30 PM EST</option>
                      <option value="06:00 PM EST">06:00 PM EST</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#171717] text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#B7A078] transition-colors rounded shadow mt-2"
                >
                  Confirm Free Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
