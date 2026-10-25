"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function Toast() {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 bg-[#171717] text-[#FAF9F6] px-5 py-3.5 shadow-2xl border border-[#B7A078]/40 rounded-sm">
        <CheckCircle2 className="h-4 w-4 text-[#B7A078] shrink-0" />
        <span className="text-xs uppercase tracking-[0.16em] font-medium font-sans">
          {toastMessage}
        </span>
      </div>
    </div>
  );
}
