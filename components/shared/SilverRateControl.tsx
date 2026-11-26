"use client";

import { ChevronRight } from "lucide-react";
import { formatInr, getSampleSilverRates } from "@/lib/silverRates";

type Props = {
  tone?: "light" | "dark";
  /** Opens the silver rates page/view */
  onOpen: () => void;
  /** Compact chip for mobile header left */
  placement?: "header" | "under-menu";
};

/**
 * Silver rate trigger — opens the dedicated silver rates page.
 * Desktop: labelled control. Mobile: compact price chip.
 */
export function SilverRateControl({
  tone = "dark",
  onOpen,
  placement = "header",
}: Props) {
  const rates = getSampleSilverRates();
  const isDark = tone === "dark";
  const compact = placement === "under-menu";

  const colour = isDark
    ? "text-white/90 hover:text-white"
    : "text-[#302850] hover:text-[#241E3D]";

  if (compact) {
    const chip = isDark
      ? "border-white/25 bg-black/45 text-white backdrop-blur-sm"
      : "border-[#E8E4E2] bg-[#FAF8F7]/90 text-[#302850] backdrop-blur-sm";
    return (
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Today’s silver rate, Hyderabad, ${formatInr(rates.today.perGramInr, 1)} per gram. Open silver rates.`}
        className={`inline-flex max-w-full items-center gap-0.5 rounded-sm border px-1.5 py-1 transition ${chip}`}
      >
        <span className="text-[10px] font-medium tabular-nums tracking-tight">
          {formatInr(rates.today.perGramInr, 1)}
          <span className="font-normal opacity-65">/g</span>
        </span>
        <ChevronRight className="h-2.5 w-2.5 shrink-0 opacity-55" aria-hidden />
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
