"use client";

import { ChevronRight } from "lucide-react";
import { formatInr, getSampleSilverRates } from "@/lib/silverRates";

type Props = {
  tone?: "light" | "dark";
  /** Opens the silver rates page/view */
  onOpen: () => void;
  /** Compact chip for mobile under-hamburger placement */
  placement?: "header" | "under-menu";
};

/**
 * Silver rate trigger — opens the dedicated silver rates page.
 * Header (desktop) or under-hamburger (mobile).
 */
export function SilverRateControl({
  tone = "dark",
  onOpen,
  placement = "header",
}: Props) {
  const rates = getSampleSilverRates();
  const isDark = tone === "dark";
  const underMenu = placement === "under-menu";

  const colour = isDark
    ? "text-white/90 hover:text-white"
    : "text-[#302850] hover:text-[#241E3D]";

  if (underMenu) {
    const chip = isDark
      ? "border-white/20 bg-black/55 text-white shadow-sm backdrop-blur-md"
      : "border-[#E8E4E2] bg-[#FAF8F7]/95 text-[#302850] shadow-sm backdrop-blur-md";
    return (
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Today’s silver rate, Hyderabad, ${formatInr(rates.today.perGramInr, 1)} per gram. Open silver rates.`}
        className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1.5 transition ${chip}`}
      >
        <span className="text-[10px] uppercase tracking-[0.14em] opacity-80">
          Silver
        </span>
        <span className="text-[12px] font-medium tabular-nums tracking-tight">
          {formatInr(rates.today.perGramInr, 1)}
          <span className="font-normal opacity-65">/g</span>
        </span>
        <ChevronRight className="h-3 w-3 opacity-60" aria-hidden />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Today’s silver rate, Hyderabad, ${formatInr(rates.today.perGramInr, 1)} per gram. Open silver rates.`}
      className={`inline-flex h-9 items-center gap-1.5 border-b px-0.5 transition ${colour} ${
        isDark ? "border-white/30" : "border-[#302850]/30"
      }`}
    >
      <span className="text-[10px] uppercase tracking-[0.16em] opacity-80">
        Silver rate
      </span>
      <span className="text-[13px] font-medium tabular-nums tracking-tight">
        {formatInr(rates.today.perGramInr, 1)}
        <span className="font-normal opacity-65">/g</span>
      </span>
      <ChevronRight className="h-3 w-3 opacity-60" aria-hidden />
    </button>
  );
}
