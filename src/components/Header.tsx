"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, User, Menu, X, Building2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { RoleSwitcherBar } from "./RoleSwitcherBar";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemCount, wishlist, setIsCartOpen, setIsSearchOpen, userRole } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isDarkHero = isHome && !isScrolled;

  return (
    <>
      {/* Top Interactive Role Switcher Banner */}
      <RoleSwitcherBar />

      <header
        className={`sticky top-0 z-40 transition-colors duration-400 ${
          isDarkHero
            ? "bg-[#171717]/90 text-[#FAF9F6] backdrop-blur-md border-b border-white/10"
            : "bg-[#FAF9F6]/95 text-[#171717] backdrop-blur-md border-b border-[#E2E4E6] shadow-xs"
        }`}
      >
        {/* Top Announcement Bar */}
        <div
          className={`text-center py-2 text-[11px] uppercase tracking-[0.22em] font-medium border-b transition-colors ${
            isDarkHero
              ? "bg-[#171717] text-[#C8CBCD] border-white/10"
              : "bg-[#E8EAEB]/80 text-[#35383A] border-[#E2E4E6]"
          }`}
        >
          <span>Fine Jewellery Manufacturing</span>
          <span className="mx-2 text-[#B7A078]">|</span>
          <span>Retail & Wholesale Enquiries Welcome</span>
        </div>

        {/* Main Navigation Bar */}
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-12">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-10">
            <Link
              href="/"
              className="group flex flex-col font-display text-2xl md:text-3xl tracking-[0.2em] font-medium transition-opacity hover:opacity-85"
            >
              <span>SILVERPRISM</span>
              <span
                className={`text-[8.5px] uppercase tracking-[0.38em] -mt-1 font-sans ${
                  isDarkHero ? "text-[#C8CBCD]" : "text-[#B7A078]"
                }`}
              >
                Crafted with Precision
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[12px] uppercase tracking-[0.18em] font-medium">
              <Link
                href="/collections"
                className={`transition-colors hover:text-[#B7A078] ${
                  pathname.startsWith("/collections") ? "text-[#B7A078]" : ""
                }`}
              >
                Collections
              </Link>
              <Link
                href="/shop"
                className={`transition-colors hover:text-[#B7A078] ${
                  pathname === "/shop" ? "text-[#B7A078]" : ""
                }`}
              >
                Shop Jewellery
              </Link>
              <Link
                href="/for-retailers"
                className={`flex items-center gap-1.5 transition-colors hover:text-[#B7A078] ${
                  pathname === "/for-retailers" ? "text-[#B7A078]" : ""
                }`}
              >
                <Building2 className="h-3.5 w-3.5 text-[#B7A078]" />
                <span>For Retailers</span>
              </Link>
              <Link
                href="/manufacturing"
                className={`transition-colors hover:text-[#B7A078] ${
                  pathname === "/manufacturing" ? "text-[#B7A078]" : ""
                }`}
              >
                Manufacturing
              </Link>
              <Link
                href="/custom-design"
                className={`transition-colors hover:text-[#B7A078] ${
                  pathname === "/custom-design" ? "text-[#B7A078]" : ""
                }`}
              >
                Custom Design
              </Link>
              <Link
                href="/our-story"
                className={`transition-colors hover:text-[#B7A078] ${
                  pathname === "/our-story" ? "text-[#B7A078]" : ""
                }`}
              >
                Our Story
              </Link>
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Wholesale Active Tag */}
            {userRole === "wholesale_approved" && (
              <Link
                href="/wholesale"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#B7A078]/15 border border-[#B7A078] text-[#B7A078] text-[10px] uppercase tracking-[0.18em] font-bold rounded"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#B7A078]" />
                <span>Wholesale B2B Active</span>
              </Link>
            )}

            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search catalogue"
              className="p-1 hover:text-[#B7A078] transition-colors"
            >
              <Search className="h-[18px] w-[18px] stroke-[1.5]" />
            </button>

            {/* Account / B2B Portal */}
            <Link
              href="/account"
              aria-label="Account & Orders"
              className="hidden sm:block p-1 hover:text-[#B7A078] transition-colors"
            >
              <User className="h-[18px] w-[18px] stroke-[1.5]" />
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative p-1 hover:text-[#B7A078] transition-colors"
            >
              <Heart className="h-[18px] w-[18px] stroke-[1.5]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#B7A078] text-[9px] font-bold text-[#171717]">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping bag"
              className="relative p-1 hover:text-[#B7A078] transition-colors"
            >
              <ShoppingBag className="h-[18px] w-[18px] stroke-[1.5]" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#171717] text-[9px] font-bold text-[#FAF9F6]">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 stroke-[1.5]" />
              ) : (
                <Menu className="h-6 w-6 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#171717]/95 text-[#FAF9F6] pt-36 px-8 flex flex-col justify-between pb-12 animate-in fade-in duration-300 lg:hidden">
          <nav className="flex flex-col gap-5 text-xl font-display font-light">
            <Link href="/collections" className="hover:text-[#B7A078] transition-colors">
              Collections
            </Link>
            <Link href="/shop" className="hover:text-[#B7A078] transition-colors">
              Shop Jewellery
            </Link>
            <Link href="/for-retailers" className="hover:text-[#B7A078] transition-colors flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#B7A078]" />
              <span>For Retailers & Wholesale</span>
            </Link>
            <Link href="/manufacturing" className="hover:text-[#B7A078] transition-colors">
              Manufacturing Capabilities
            </Link>
            <Link href="/custom-design" className="hover:text-[#B7A078] transition-colors">
              Custom CAD & OEM Design
            </Link>
            <Link href="/our-story" className="hover:text-[#B7A078] transition-colors">
              Our Story
            </Link>
            <div className="h-px bg-white/10 my-3" />
            <Link href="/account" className="text-sm font-sans tracking-[0.2em] uppercase text-[#C8CBCD]">
              Client Account & Orders
            </Link>
            <Link href="/admin" className="text-sm font-sans tracking-[0.2em] uppercase text-[#B7A078]">
              Admin Dashboard
            </Link>
            <Link href="/contact" className="text-sm font-sans tracking-[0.2em] uppercase text-[#C8CBCD]">
              Contact & Concierge
            </Link>
          </nav>

          <div className="text-xs text-[#C8CBCD] uppercase tracking-[0.2em]">
            SILVERPRISM · Contemporary Manufacturing
          </div>
        </div>
      )}
    </>
  );
}
