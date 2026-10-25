"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { PRODUCTS, Product, calculateWholesaleItemPrice } from "@/data/products";

export type UserRole = "retail" | "wholesale_pending" | "wholesale_approved" | "admin";

export interface CartItem {
  slug: string;
  quantity: number;
  variantId?: string;
}

export interface WholesaleApplication {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  gstin: string;
  businessType: string;
  annualVolume: string;
  address: string;
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
}

export interface OrderRecord {
  id: string;
  type: "retail" | "wholesale";
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  poNumber?: string;
  gstin?: string;
  items: {
    product: Product;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    variantName?: string;
  }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "Paid" | "Pending Verification" | "Terms 30 Days";
  fulfillmentStatus: "Pending" | "Processing" | "Dispatched" | "Delivered";
  createdAt: string;
}

interface StoreContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  cart: CartItem[];
  wishlist: string[];
  orders: OrderRecord[];
  applications: WholesaleApplication[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isRoleSwitcherOpen: boolean;
  setIsRoleSwitcherOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  addToCart: (slug: string, quantity?: number, variantId?: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  submitApplication: (app: Omit<WholesaleApplication, "id" | "status" | "appliedAt">) => void;
  updateApplicationStatus: (id: string, status: "approved" | "rejected") => void;
  placeOrder: (orderData: Omit<OrderRecord, "id" | "createdAt">) => string;
  updateOrderStatus: (id: string, status: OrderRecord["fulfillmentStatus"]) => void;
  
  // Computed values
  cartProducts: {
    product: Product;
    quantity: number;
    variantName?: string;
    unitPrice: number;
    retailUnitPrice: number;
    lineTotal: number;
    moqMet: boolean;
  }[];
  totalItemCount: number;
  subtotal: number;
  retailComparisonSubtotal: number;
  wholesaleSavings: number;
  allMoqSatisfied: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const ROLE_STORAGE_KEY = "silverprism_role_v1";
const CART_STORAGE_KEY = "silverprism_cart_v1";
const WISHLIST_STORAGE_KEY = "silverprism_wishlist_v1";
const ORDERS_STORAGE_KEY = "silverprism_orders_v1";
const APPS_STORAGE_KEY = "silverprism_apps_v1";

const INITIAL_APPLICATIONS: WholesaleApplication[] = [
  {
    id: "APP-8041",
    businessName: "Aura Luxury Jewels",
    contactName: "Rajesh Singhania",
    email: "rajesh@aurajewels.in",
    phone: "+91 98201 44890",
    gstin: "27AABCA1234D1Z5",
    businessType: "Multi-Brand Retail Store",
    annualVolume: "₹25L – ₹50L",
    address: "Shop 14, Linking Road, Bandra West, Mumbai",
    status: "approved",
    appliedAt: "24 Oct 2026",
  },
  {
    id: "APP-8042",
    businessName: "Kavya Silver Atelier",
    contactName: "Kavya Sharma",
    email: "procurement@kavyasilver.com",
    phone: "+91 98112 55210",
    gstin: "07AAACK8891B1Z2",
    businessType: "Online Jewellery Boutique",
    annualVolume: "₹10L – ₹25L",
    address: "B-42 Defence Colony, New Delhi",
    status: "pending",
    appliedAt: "25 Oct 2026",
  },
];

const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: "ORD-9410",
    type: "wholesale",
    customerName: "Aura Luxury Jewels",
    email: "rajesh@aurajewels.in",
    phone: "+91 98201 44890",
    address: "Shop 14, Linking Road, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    poNumber: "PO-AURA-2026-88",
    gstin: "27AABCA1234D1Z5",
    items: [
      {
        product: PRODUCTS[0],
        quantity: 10,
        unitPrice: 9975, // 5% volume discount
        lineTotal: 99750,
      },
      {
        product: PRODUCTS[1],
        quantity: 5,
        unitPrice: 13800,
        lineTotal: 69000,
      },
    ],
    subtotal: 168750,
    tax: 5062, // 3% IGST on Silver Jewellery
    shipping: 0,
    total: 173812,
    paymentMethod: "Bank Wire Transfer (NEFT/RTGS)",
    paymentStatus: "Paid",
    fulfillmentStatus: "Processing",
    createdAt: "24 Oct 2026, 11:30 AM",
  },
  {
    id: "ORD-9382",
    type: "retail",
    customerName: "Meera Deshmukh",
    email: "meera.d@gmail.com",
    phone: "+91 99870 12345",
    address: "702 Sea Breeze Apartments, Worli Sea Face",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400030",
    items: [
      {
        product: PRODUCTS[2],
        quantity: 1,
        unitPrice: 14800,
        lineTotal: 14800,
      },
    ],
    subtotal: 14800,
    tax: 444,
    shipping: 0,
    total: 15244,
    paymentMethod: "Razorpay (Credit Card)",
    paymentStatus: "Paid",
    fulfillmentStatus: "Dispatched",
    createdAt: "23 Oct 2026, 04:15 PM",
  },
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRoleState] = useState<UserRole>("retail");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);
  const [applications, setApplications] = useState<WholesaleApplication[]>(INITIAL_APPLICATIONS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem(ROLE_STORAGE_KEY) as UserRole;
      if (savedRole) setUserRoleState(savedRole);

      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedApps = localStorage.getItem(APPS_STORAGE_KEY);
      if (savedApps) setApplications(JSON.parse(savedApps));
    } catch (e) {
      console.warn("Storage loading error:", e);
    }
    setIsMounted(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(ROLE_STORAGE_KEY, userRole);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(applications));
    } catch (e) {
      console.warn("Storage save error:", e);
    }
  }, [userRole, cart, wishlist, orders, applications, isMounted]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((cur) => (cur === message ? null : cur));
    }, 3200);
  };

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    const label =
      role === "retail"
        ? "Switched to B2C Retail Mode"
        : role === "wholesale_pending"
        ? "Wholesale Mode: Application Pending"
        : role === "wholesale_approved"
        ? "Wholesale Mode: B2B Pricing & MOQ Unlocked"
        : "Switched to Admin Executive Mode";
    showToast(label);
  };

  const addToCart = (slug: string, quantity = 1, variantId?: string) => {
    const product = PRODUCTS.find((p) => p.slug === slug);
    if (!product) return;

    // In wholesale approved mode, default minimum add quantity to product MOQ if specified
    const addQty =
      userRole === "wholesale_approved" && quantity === 1
        ? Math.max(1, product.moq)
        : quantity;

    setCart((prev) => {
      const matchIndex = prev.findIndex(
        (i) => i.slug === slug && i.variantId === variantId
      );
      if (matchIndex > -1) {
        return prev.map((item, idx) =>
          idx === matchIndex ? { ...item, quantity: item.quantity + addQty } : item
        );
      }
      return [...prev, { slug, quantity: addQty, variantId }];
    });

    showToast(`Added ${addQty}x "${product.name}" to cart`);
    setIsCartOpen(true);
  };

  const updateQuantity = (slug: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(slug);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.slug === slug ? { ...i, quantity } : i))
    );
  };

  const removeFromCart = (slug: string) => {
    setCart((prev) => prev.filter((i) => i.slug !== slug));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (slug: string) => {
    const item = PRODUCTS.find((p) => p.slug === slug);
    const wasWished = wishlist.includes(slug);
    if (wasWished) {
      setWishlist((prev) => prev.filter((s) => s !== slug));
      if (item) showToast(`Removed "${item.name}" from wishlist`);
    } else {
      setWishlist((prev) => [...prev, slug]);
      if (item) showToast(`Saved "${item.name}" to wishlist`);
    }
  };

  const isWishlisted = (slug: string) => wishlist.includes(slug);

  const submitApplication = (appData: Omit<WholesaleApplication, "id" | "status" | "appliedAt">) => {
    const newApp: WholesaleApplication = {
      ...appData,
      id: "APP-" + Math.floor(1000 + Math.random() * 9000),
      status: "pending",
      appliedAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
    setApplications((prev) => [newApp, ...prev]);
    setUserRoleState("wholesale_pending");
    showToast("Wholesale application submitted for review");
  };

  const updateApplicationStatus = (id: string, status: "approved" | "rejected") => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    showToast(`Application ${id} marked as ${status}`);
    if (status === "approved" && userRole === "wholesale_pending") {
      setUserRoleState("wholesale_approved");
    }
  };

  const placeOrder = (orderData: Omit<OrderRecord, "id" | "createdAt">): string => {
    const newId = "ORD-" + Math.floor(1000 + Math.random() * 9000);
    const newRecord: OrderRecord = {
      ...orderData,
      id: newId,
      createdAt: new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };
    setOrders((prev) => [newRecord, ...prev]);
    clearCart();
    return newId;
  };

  const updateOrderStatus = (id: string, status: OrderRecord["fulfillmentStatus"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, fulfillmentStatus: status } : o))
    );
    showToast(`Order ${id} status updated to ${status}`);
  };

  // Compute cart breakdown with wholesale discount intelligence
  const isWholesaleApproved = userRole === "wholesale_approved";

  const cartProducts = useMemo(() => {
    return cart
      .map((item) => {
        const product = PRODUCTS.find((p) => p.slug === item.slug);
        if (!product) return null;

        const variant = product.variants.find((v) => v.id === item.variantId);
        const unitPrice = isWholesaleApproved
          ? calculateWholesaleItemPrice(product, item.quantity)
          : product.retailPrice;

        const lineTotal = unitPrice * item.quantity;
        const moqMet = !isWholesaleApproved || item.quantity >= product.moq;

        return {
          product,
          quantity: item.quantity,
          variantName: variant?.name,
          unitPrice,
          retailUnitPrice: product.retailPrice,
          lineTotal,
          moqMet,
        };
      })
      .filter((i): i is NonNullable<typeof i> => i !== null);
  }, [cart, isWholesaleApproved]);

  const totalItemCount = useMemo(() => {
    return cart.reduce((acc, i) => acc + i.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cartProducts.reduce((acc, i) => acc + i.lineTotal, 0);
  }, [cartProducts]);

  const retailComparisonSubtotal = useMemo(() => {
    return cartProducts.reduce((acc, i) => acc + i.retailUnitPrice * i.quantity, 0);
  }, [cartProducts]);

  const wholesaleSavings = useMemo(() => {
    return Math.max(0, retailComparisonSubtotal - subtotal);
  }, [retailComparisonSubtotal, subtotal]);

  const allMoqSatisfied = useMemo(() => {
    if (!isWholesaleApproved) return true;
    return cartProducts.every((i) => i.moqMet);
  }, [cartProducts, isWholesaleApproved]);

  return (
    <StoreContext.Provider
      value={{
        userRole,
        setUserRole,
        cart,
        wishlist,
        orders,
        applications,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isRoleSwitcherOpen,
        setIsRoleSwitcherOpen,
        toastMessage,
        showToast,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted,
        submitApplication,
        updateApplicationStatus,
        placeOrder,
        updateOrderStatus,
        cartProducts,
        totalItemCount,
        subtotal,
        retailComparisonSubtotal,
        wholesaleSavings,
        allMoqSatisfied,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
