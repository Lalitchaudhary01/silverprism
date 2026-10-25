"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UserCheck,
  Building2,
  Package,
  Heart,
  Clock,
  ArrowRight,
  Shield,
  FileText,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatINR } from "@/data/products";

export default function AccountPage() {
  const { userRole, setUserRole, orders, wishlist, applications } = useStore();

  const isWholesale = userRole === "wholesale_approved";
  const isPending = userRole === "wholesale_pending";

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
      {/* Header */}
      <div className="pb-8 border-b border-[#E2E4E6] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-[#B7A078]">Client Account & Trade Portal</p>
          <h1 className="display-lg mt-1 text-[#171717]">
            {isWholesale ? "Wholesale Partner Portal" : "Customer Overview"}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#35383A]">Active Access:</span>
          <span className="px-2.5 py-1 bg-[#171717] text-white text-[11px] font-semibold uppercase tracking-wider rounded">
            {userRole === "retail" && "Retail (B2C)"}
            {userRole === "wholesale_pending" && "Wholesale (Pending)"}
            {userRole === "wholesale_approved" && "Wholesale Authorized (B2B)"}
            {userRole === "admin" && "Admin Executive"}
          </span>
        </div>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#E2E4E6] p-6 rounded shadow-xs space-y-4">
            <h3 className="font-display text-xl font-medium text-[#171717]">
              Account Profile
            </h3>

            {isWholesale ? (
              <div className="space-y-2 text-xs text-[#35383A]">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#52B788]/20 text-[#0C2417] text-[10px] uppercase font-bold rounded">
                  <UserCheck className="h-3 w-3 text-[#52B788]" />
                  <span>Authorized Wholesale Partner</span>
                </div>
                <p className="font-semibold text-sm text-[#171717] mt-1">
                  Aura Luxury Jewels Pvt Ltd
                </p>
                <p>Contact: Rajesh Singhania (Managing Director)</p>
                <p>Email: rajesh@aurajewels.in</p>
                <p className="font-mono">GSTIN: 27AABCA1234D1Z5</p>
                <p className="text-[#52B788] font-bold">Credit Limit: ₹15,00,000 (Net 30)</p>
                <Link
                  href="/wholesale"
                  className="mt-2 block text-center py-2 bg-[#52B788] text-[#081C15] font-bold uppercase tracking-wider text-[11px] rounded"
                >
                  Open Bulk Matrix Order Sheet →
                </Link>
              </div>
            ) : isPending ? (
              <div className="space-y-2 text-xs text-[#35383A]">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#E5A93C]/20 text-[#1A1204] text-[10px] uppercase font-bold rounded">
                  <Clock className="h-3 w-3 text-[#E5A93C]" />
                  <span>Wholesale Application In Review</span>
                </div>
                <p className="font-semibold text-sm text-[#171717] mt-1">
                  Kavya Silver Atelier
                </p>
                <p>Applicant: Kavya Sharma</p>
                <p className="font-mono">GSTIN: 07AAACK8891B1Z2</p>
                <p className="text-[#996D14] font-medium">Status: KYC Verification In Progress (~2h)</p>
                <div className="pt-2 flex flex-col gap-1.5">
                  <Link
                    href="/wholesale/pending"
                    className="text-center py-1.5 bg-[#FAF9F6] border border-[#E2E4E6] text-[#171717] font-semibold text-[11px] rounded hover:border-black"
                  >
                    View Verification Tracker →
                  </Link>
                  <button
                    type="button"
                    onClick={() => setUserRole("wholesale_approved")}
                    className="text-center py-1.5 bg-[#E5A93C] text-[#1A1204] font-bold uppercase tracking-wider text-[10px] rounded cursor-pointer"
                  >
                    ⚡ Fast-Track Instant Approval (Demo)
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs text-[#35383A]">
                <p className="font-semibold text-sm text-[#171717]">Client Session</p>
                <p>Shopping mode: Public Direct Consumer (B2C)</p>
                <p>Complimentary express insured shipping on all orders.</p>
                <Link
                  href="/for-retailers"
                  className="mt-2 block text-center py-2 bg-[#171717] text-white font-semibold uppercase tracking-wider text-[11px] rounded hover:bg-[#B7A078] transition-colors"
                >
                  Apply for Wholesale Account →
                </Link>
              </div>
            )}

            <div className="pt-4 border-t border-[#E2E4E6] space-y-2 text-xs">
              <Link
                href="/wishlist"
                className="flex items-center justify-between text-[#171717] hover:text-[#B7A078]"
              >
                <span>Saved Wishlist Pieces</span>
                <span className="font-bold">{wishlist.length}</span>
              </Link>
              <Link
                href="/cart"
                className="flex items-center justify-between text-[#171717] hover:text-[#B7A078]"
              >
                <span>Active Bag Items</span>
                <span className="font-bold">View Cart</span>
              </Link>
            </div>
          </div>

          {/* Quick Switch Helper */}
          <div className="p-5 bg-[#E8EAEB]/40 border border-[#E2E4E6] rounded text-xs space-y-3">
            <p className="font-semibold text-[#171717]">Dual Commerce Simulation</p>
            <p className="text-[#35383A] leading-relaxed text-[11px]">
              Switch user personas to test how the platform transforms pricing, MOQs, and checkout rules.
            </p>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => setUserRole("retail")}
                className="w-full text-left px-3 py-1.5 bg-white border text-[11px] rounded hover:border-[#171717]"
              >
                Switch to Retail Customer (B2C)
              </button>
              <button
                type="button"
                onClick={() => setUserRole("wholesale_approved")}
                className="w-full text-left px-3 py-1.5 bg-[#B7A078] text-[#171717] font-bold text-[11px] rounded"
              >
                Switch to Approved Wholesaler (B2B)
              </button>
              <Link
                href="/admin"
                className="w-full text-center px-3 py-1.5 bg-[#171717] text-white text-[11px] font-semibold rounded block"
              >
                Open Admin Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Order History */}
        <div className="lg:col-span-8 bg-white border border-[#E2E4E6] p-6 md:p-8 rounded shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E4E6]">
            <div>
              <h3 className="font-display text-xl font-medium text-[#171717]">
                Recent Orders & Consignments
              </h3>
              <p className="text-xs text-[#35383A] mt-0.5">
                Track status, invoices, and delivery courier details.
              </p>
            </div>
            <Link
              href="/shop"
              className="text-xs text-[#B7A078] font-bold uppercase tracking-wider hover:underline"
            >
              Order New Pieces →
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#35383A]">
              No orders have been recorded on this device yet.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 border border-[#E2E4E6] rounded space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-[#E2E4E6] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#171717]">
                        {order.id}
                      </span>
                      <span className="text-[#35383A]/60">•</span>
                      <span className="text-[#35383A]">{order.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          order.type === "wholesale"
                            ? "bg-[#B7A078]/20 text-[#B7A078]"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.type} Channel
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          order.fulfillmentStatus === "Delivered"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.fulfillmentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-2 text-xs">
                    {order.items.map((i, idx) => (
                      <div key={idx} className="flex justify-between text-[#35383A]">
                        <span>
                          {i.quantity}x {i.product.name}
                        </span>
                        <span className="font-medium text-[#171717] tabular-nums">
                          {formatINR(i.lineTotal)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#E2E4E6] flex justify-between items-center text-xs">
                    <span className="text-[#35383A]">
                      Payment: <strong>{order.paymentMethod}</strong> ({order.paymentStatus})
                    </span>
                    <span className="text-sm font-bold text-[#171717] tabular-nums">
                      Total: {formatINR(order.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
