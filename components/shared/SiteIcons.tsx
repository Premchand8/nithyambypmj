"use client";

import { Search, ShoppingBag } from "lucide-react";
import { DesignSwitcher } from "@/components/preview/DesignSwitcher";
import { SilverRateControl } from "@/components/shared/SilverRateControl";

/** Top-right tools: silver rate, search, bag, subtle design switcher */
export function BagSearchIcons({
  className = "",
  tone = "light",
  showDesignSwitcher = true,
}: {
  className?: string;
  tone?: "light" | "dark";
  showDesignSwitcher?: boolean;
}) {
  const colour = tone === "dark" ? "text-white" : "text-current";
  return (
    <div className={`flex items-center gap-1 sm:gap-2 ${colour} ${className}`}>
      <SilverRateControl tone={tone} />
      <button
        type="button"
        aria-label="Search (visual preview)"
        className="hidden rounded-sm p-1.5 opacity-80 transition hover:opacity-100 sm:inline-flex"
      >
        <Search className="h-4 w-4" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        aria-label="Bag (visual preview)"
        className="relative rounded-sm p-1.5 opacity-80 transition hover:opacity-100"
      >
        <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
        <span className="absolute -right-0.5 -top-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#302850] px-0.5 text-[9px] text-white">
          0
        </span>
      </button>
      {showDesignSwitcher ? <DesignSwitcher tone={tone} /> : null}
    </div>
  );
}
