"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  Users,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  Shield,
  Layers,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { useStore, OrderRecord } from "@/context/StoreContext";
import { PRODUCTS, formatINR } from "@/data/products";

export default function AdminDashboardPage() {
  const {
    orders,
    applications,
    updateApplicationStatus,
    updateOrderStatus,
    userRole,
    setUserRole,
  } = useStore();

  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "applications" | "products">("overview");
  const [orderFilter, setOrderFilter] = useState<"all" | "wholesale" | "retail">("all");

  // Calculate Metrics
  const retailOrders = orders.filter((o) => o.type === "retail");
  const wholesaleOrders = orders.filter((o) => o.type === "wholesale");

  const retailRevenue = retailOrders.reduce((acc, o) => acc + o.total, 0);
  const wholesaleRevenue = wholesaleOrders.reduce((acc, o) => acc + o.total, 0);
  const totalRevenue = retailRevenue + wholesaleRevenue;

  const pendingApps = applications.filter((a) => a.status === "pending");
  const pendingOrders = orders.filter((o) => o.fulfillmentStatus === "Pending" || o.fulfillmentStatus === "Processing");

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === "wholesale") return o.type === "wholesale";
    if (orderFilter === "retail") return o.type === "retail";
    return true;
  });

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#E2E4E6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="eyebrow text-[#B7A078]">Enterprise Administration</span>
          </div>
          <h1 className="display-lg mt-1 text-[#171717]">SilverPrism Command Console</h1>
          <p className="text-xs text-[#35383A] mt-1">
            Manufacturing Operations · Wholesale Partner Accounts · Retail Fulfillment
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            className="px-4 py-2 border border-[#E2E4E6] bg-white text-[#171717] text-xs font-semibold rounded hover:bg-[#E8EAEB] transition-colors"
          >
            Storefront View
          </Link>
          <button
            type="button"
            onClick={() => setUserRole("wholesale_approved")}
            className="px-4 py-2 bg-[#B7A078] text-[#171717] text-xs font-bold rounded hover:bg-[#171717] hover:text-white transition-colors"
          >
            Switch to Wholesale Partner
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white border border-[#E2E4E6] p-6 rounded shadow-xs">
          <div className="flex justify-between items-start text-xs text-[#35383A]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">
              Gross Platform Revenue
            </span>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#171717] tabular-nums">
            {formatINR(totalRevenue)}
          </p>
          <div className="mt-2 text-[11px] text-[#35383A]/80 flex gap-2">
            <span>Wholesale: <strong>{formatINR(wholesaleRevenue)}</strong></span>
            <span>•</span>
            <span>Retail: <strong>{formatINR(retailRevenue)}</strong></span>
          </div>
        </div>

        <div className="bg-white border border-[#E2E4E6] p-6 rounded shadow-xs">
          <div className="flex justify-between items-start text-xs text-[#35383A]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">
              Total Placed Orders
            </span>
            <Package className="h-4 w-4 text-[#B7A078]" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#171717] tabular-nums">
            {orders.length}
          </p>
          <p className="mt-2 text-[11px] text-amber-700 font-medium">
            {pendingOrders.length} orders awaiting fulfillment
          </p>
        </div>

        <div className="bg-white border border-[#E2E4E6] p-6 rounded shadow-xs">
          <div className="flex justify-between items-start text-xs text-[#35383A]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">
              Wholesale Applications
            </span>
            <Building2 className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#171717] tabular-nums">
            {applications.length}
          </p>
          <p className="mt-2 text-[11px] text-indigo-700 font-medium">
            {pendingApps.length} pending verification review
          </p>
        </div>

        <div className="bg-white border border-[#E2E4E6] p-6 rounded shadow-xs">
          <div className="flex justify-between items-start text-xs text-[#35383A]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">
              Active Master SKUs
            </span>
            <Layers className="h-4 w-4 text-gray-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-[#171717] tabular-nums">
            {PRODUCTS.length}
          </p>
          <p className="mt-2 text-[11px] text-emerald-700 font-medium">
            Zero-porosity cast & hallmarked
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-10 flex border-b border-[#E2E4E6] gap-8 text-xs font-semibold uppercase tracking-wider">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === "overview"
              ? "border-[#171717] text-[#171717]"
              : "border-transparent text-[#35383A]/70 hover:text-[#171717]"
          }`}
        >
          Operations Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("applications")}
          className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === "applications"
              ? "border-[#171717] text-[#171717]"
              : "border-transparent text-[#35383A]/70 hover:text-[#171717]"
          }`}
        >
          <span>Wholesale Applications</span>
          {pendingApps.length > 0 && (
            <span className="px-1.5 py-0.2 bg-amber-500 text-white text-[10px] rounded-full">
              {pendingApps.length}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("orders")}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === "orders"
              ? "border-[#171717] text-[#171717]"
              : "border-transparent text-[#35383A]/70 hover:text-[#171717]"
          }`}
        >
          Order Fulfillment ({orders.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("products")}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === "products"
              ? "border-[#171717] text-[#171717]"
              : "border-transparent text-[#35383A]/70 hover:text-[#171717]"
          }`}
        >
          Catalogue & Inventory ({PRODUCTS.length})
        </button>
      </div>

      {/* TAB 1: OPERATIONS OVERVIEW */}
      {activeTab === "overview" && (
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Applications awaiting action */}
          <div className="lg:col-span-6 bg-white border border-[#E2E4E6] p-6 rounded shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E4E6]">
              <h3 className="font-display text-lg font-semibold text-[#171717]">
                Pending Wholesale Applications
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab("applications")}
                className="text-xs text-[#B7A078] hover:underline font-semibold"
              >
                View all ({applications.length}) →
              </button>
            </div>

            {pendingApps.length === 0 ? (
              <p className="text-xs text-[#35383A] py-6 text-center">
                All retail partnership applications have been reviewed.
              </p>
            ) : (
              <div className="space-y-3">
                {pendingApps.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 border border-[#E2E4E6] rounded flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="font-semibold text-xs text-[#171717]">
                        {app.businessName}
                      </p>
                      <p className="text-[11px] text-[#35383A]">
                        {app.contactName} · {app.email} · {app.annualVolume}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => updateApplicationStatus(app.id, "approved")}
                        className="px-3 py-1.5 bg-emerald-700 text-white text-[11px] font-semibold rounded hover:bg-emerald-800"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => updateApplicationStatus(app.id, "rejected")}
                        className="px-3 py-1.5 bg-gray-200 text-[#171717] text-[11px] font-semibold rounded hover:bg-gray-300"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Orders Overview */}
          <div className="lg:col-span-6 bg-white border border-[#E2E4E6] p-6 rounded shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E4E6]">
              <h3 className="font-display text-lg font-semibold text-[#171717]">
                Live Orders Pipeline
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className="text-xs text-[#B7A078] hover:underline font-semibold"
              >
                Manage all ({orders.length}) →
              </button>
            </div>

            <div className="divide-y divide-[#E2E4E6]">
              {orders.slice(0, 4).map((order) => (
                <div key={order.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#171717]">
                        {order.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          order.type === "wholesale"
                            ? "bg-[#B7A078]/20 text-[#B7A078]"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#35383A] mt-0.5">
                      {order.customerName} · {order.items.length} items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm tabular-nums text-[#171717]">
                      {formatINR(order.total)}
                    </p>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        order.fulfillmentStatus === "Delivered"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {order.fulfillmentStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WHOLESALE APPLICATIONS */}
      {activeTab === "applications" && (
        <div className="mt-8 bg-white border border-[#E2E4E6] rounded shadow-xs overflow-hidden">
          <div className="p-6 border-b border-[#E2E4E6]">
            <h3 className="font-display text-lg font-semibold text-[#171717]">
              B2B Partner Verification & Authorizations
            </h3>
            <p className="text-xs text-[#35383A] mt-0.5">
              Review company credentials, GSTIN registration, and authorize wholesale pricing access.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F6] border-b border-[#E2E4E6] text-[#35383A] font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">ID / Date</th>
                  <th className="py-3.5 px-6">Business Entity</th>
                  <th className="py-3.5 px-6">Contact & GSTIN</th>
                  <th className="py-3.5 px-6">Target Volume</th>
                  <th className="py-3.5 px-6">Review Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E4E6]">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-[#FAF9F6]/80 transition-colors">
                    <td className="py-4 px-6 font-mono text-[11px]">
                      <span className="font-semibold text-[#171717]">{app.id}</span>
                      <p className="text-[#35383A]/70 text-[10px]">{app.appliedAt}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-[#171717]">{app.businessName}</p>
                      <p className="text-[#35383A] text-[11px]">{app.businessType}</p>
                    </td>
                    <td className="py-4 px-6 text-[11px]">
                      <p>{app.contactName} ({app.phone})</p>
                      <p className="text-[#35383A]/70 font-mono">{app.gstin || "GST Pending"}</p>
                    </td>
                    <td className="py-4 px-6 font-medium text-[#171717]">
                      {app.annualVolume}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                          app.status === "approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : app.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      {app.status !== "approved" && (
                        <button
                          type="button"
                          onClick={() => updateApplicationStatus(app.id, "approved")}
                          className="px-3 py-1 bg-emerald-700 text-white rounded text-[10px] font-bold hover:bg-emerald-800"
                        >
                          Approve
                        </button>
                      )}
                      {app.status !== "rejected" && (
                        <button
                          type="button"
                          onClick={() => updateApplicationStatus(app.id, "rejected")}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded text-[10px] font-bold hover:bg-red-200"
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ORDER FULFILLMENT */}
      {activeTab === "orders" && (
        <div className="mt-8 bg-white border border-[#E2E4E6] rounded shadow-xs overflow-hidden">
          <div className="p-6 border-b border-[#E2E4E6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-semibold text-[#171717]">
                Order Management & Dispatch
              </h3>
              <p className="text-xs text-[#35383A]">
                Inspect retail card transactions and wholesale B2B proformas.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOrderFilter("all")}
                className={`px-3 py-1.5 text-xs rounded font-medium ${
                  orderFilter === "all" ? "bg-[#171717] text-white" : "bg-[#FAF9F6] border"
                }`}
              >
                All Orders ({orders.length})
              </button>
              <button
                type="button"
                onClick={() => setOrderFilter("wholesale")}
                className={`px-3 py-1.5 text-xs rounded font-medium ${
                  orderFilter === "wholesale" ? "bg-[#B7A078] text-[#171717] font-bold" : "bg-[#FAF9F6] border"
                }`}
              >
                Wholesale ({wholesaleOrders.length})
              </button>
              <button
                type="button"
                onClick={() => setOrderFilter("retail")}
                className={`px-3 py-1.5 text-xs rounded font-medium ${
                  orderFilter === "retail" ? "bg-[#171717] text-white" : "bg-[#FAF9F6] border"
                }`}
              >
                Retail ({retailOrders.length})
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F6] border-b border-[#E2E4E6] text-[#35383A] font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Order Ref</th>
                  <th className="py-3.5 px-6">Customer / Entity</th>
                  <th className="py-3.5 px-6">Channel</th>
                  <th className="py-3.5 px-6">Total Amount</th>
                  <th className="py-3.5 px-6">Payment Term</th>
                  <th className="py-3.5 px-6">Fulfillment State</th>
                  <th className="py-3.5 px-6 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E4E6]">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF9F6]/80 transition-colors">
                    <td className="py-4 px-6 font-mono">
                      <span className="font-bold text-[#171717]">{order.id}</span>
                      <p className="text-[10px] text-[#35383A]/70">{order.createdAt}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-[#171717]">{order.customerName}</p>
                      <p className="text-[#35383A] text-[11px] truncate max-w-[200px]">
                        {order.address}, {order.city}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          order.type === "wholesale"
                            ? "bg-[#B7A078]/20 text-[#B7A078]"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold tabular-nums text-sm text-[#171717]">
                      {formatINR(order.total)}
                    </td>
                    <td className="py-4 px-6 text-[11px]">
                      <p className="font-medium text-[#171717]">{order.paymentMethod}</p>
                      <span className="text-[10px] text-emerald-700 font-semibold">
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                          order.fulfillmentStatus === "Delivered"
                            ? "bg-emerald-100 text-emerald-800"
                            : order.fulfillmentStatus === "Dispatched"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.fulfillmentStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <select
                        value={order.fulfillmentStatus}
                        onChange={(e) =>
                          updateOrderStatus(
                            order.id,
                            e.target.value as OrderRecord["fulfillmentStatus"]
                          )
                        }
                        className="bg-white border border-[#E2E4E6] px-2 py-1 text-[11px] font-medium outline-none rounded cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CATALOGUE & INVENTORY */}
      {activeTab === "products" && (
        <div className="mt-8 bg-white border border-[#E2E4E6] rounded shadow-xs overflow-hidden">
          <div className="p-6 border-b border-[#E2E4E6] flex justify-between items-center">
            <div>
              <h3 className="font-display text-lg font-semibold text-[#171717]">
                Master Jewellery Catalogue & Price Rules
              </h3>
              <p className="text-xs text-[#35383A]">
                Single source of truth with separate retail vs factory wholesale pricing & MOQs.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F6] border-b border-[#E2E4E6] text-[#35383A] font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">SKU / Visual</th>
                  <th className="py-3.5 px-6">Design Title</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Retail MSRP</th>
                  <th className="py-3.5 px-6">Wholesale Rate</th>
                  <th className="py-3.5 px-6">MOQ</th>
                  <th className="py-3.5 px-6 text-right">Inventory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E4E6]">
                {PRODUCTS.map((p) => (
                  <tr key={p.sku} className="hover:bg-[#FAF9F6]/80 transition-colors">
                    <td className="py-3 px-6 flex items-center gap-3">
                      <div className="h-10 w-8 bg-[#E8EAEB] shrink-0 overflow-hidden rounded">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#171717]">
                        {p.sku}
                      </span>
                    </td>
                    <td className="py-3 px-6 font-medium text-[#171717]">
                      <Link href={`/product/${p.slug}`} className="hover:text-[#B7A078]">
                        {p.name}
                      </Link>
                    </td>
                    <td className="py-3 px-6 text-[#35383A]">{p.category}</td>
                    <td className="py-3 px-6 font-semibold tabular-nums text-[#171717]">
                      {formatINR(p.retailPrice)}
                    </td>
                    <td className="py-3 px-6 font-bold tabular-nums text-[#B7A078]">
                      {formatINR(p.wholesalePrice)}
                    </td>
                    <td className="py-3 px-6 font-semibold">{p.moq} pcs</td>
                    <td className="py-3 px-6 text-right font-medium">
                      {p.inStock ? (
                        <span className="text-emerald-700">{p.inventoryCount} in stock</span>
                      ) : (
                        <span className="text-red-600 font-bold">Out of stock</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
