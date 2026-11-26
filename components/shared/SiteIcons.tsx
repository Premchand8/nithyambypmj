"use client";

import { Search, ShoppingBag } from "lucide-react";
import { DesignSwitcher } from "@/components/preview/DesignSwitcher";

/** Top-right tools: search, bag, subtle design switcher (silver rate lives in SiteHeader) */
export function BagSearchIcons({
  className = "",
  tone = "light",
  showDesignSwitcher = true,
  compact = false,
}: {
  className?: string;
  tone?: "light" | "dark";
  showDesignSwitcher?: boolean;
  /** Tighter icon hits for mobile header */
  compact?: boolean;
}) {
  const colour = tone === "dark" ? "text-white" : "text-current";
  const pad = compact ? "p-1" : "p-1.5";
  const icon = compact ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div
      className={`flex items-center ${compact ? "gap-0" : "gap-1 sm:gap-2"} ${colour} ${className}`}
    >
      <button
        type="button"
        aria-label="Search (visual preview)"
        className={`hidden rounded-sm opacity-80 transition hover:opacity-100 sm:inline-flex ${pad}`}
      >
        <Search className={icon} strokeWidth={1.5} />
      </button>
      <button
        type="button"
        aria-label="Bag (visual preview)"
        className={`relative rounded-sm opacity-80 transition hover:opacity-100 ${pad}`}
      >
        <ShoppingBag className={icon} strokeWidth={1.5} />
        <span className="absolute -right-0.5 -top-0.5 flex h-3 min-w-3 items-center justify-center rounded-full bg-[#302850] px-0.5 text-[8px] leading-none text-white">
          0
        </span>
      </button>
      {showDesignSwitcher ? <DesignSwitcher tone={tone} /> : null}
    </div>
  );
}
