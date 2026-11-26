"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  formatDisplayDate,
  formatInr,
  getSampleSilverRates,
} from "@/lib/silverRates";

type Props = {
  tone?: "light" | "dark";
};

/** Top-right silver price chip → panel with today’s Hyderabad rate + 10-day table */
export function SilverRateControl({ tone = "dark" }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const rates = getSampleSilverRates();
  const isDark = tone === "dark";

  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const chip = isDark
    ? "border-white/25 bg-white/10 text-white hover:bg-white/15"
    : "border-[#302850]/20 bg-white/80 text-[#302850] hover:bg-white";
  const panel = isDark
    ? "border-white/15 bg-[#0F0F0F] text-[#F4F4F6] shadow-2xl"
    : "border-[#E8E4E2] bg-[#FAF8F7] text-[#161616] shadow-2xl";
  const muted = isDark ? "text-white/55" : "text-[#6B6B73]";
  const tableBorder = isDark ? "border-white/10" : "border-[#E8E4E2]";
  const rowAlt = isDark ? "bg-white/[0.03]" : "bg-black/[0.02]";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={open ? titleId : undefined}
        className={`inline-flex max-w-[9.5rem] flex-col items-end rounded-sm border px-2 py-1 transition sm:max-w-none sm:px-2.5 ${chip}`}
      >
        <span className="text-[9px] uppercase tracking-[0.14em] opacity-80">
          Silver
        </span>
        <span className="text-[11px] font-medium tabular-nums leading-tight sm:text-xs">
          {formatInr(rates.today.perGramInr, 1)}
          <span className="opacity-70">/g</span>
        </span>
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/45 sm:bg-transparent"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={`fixed inset-x-3 top-[4.75rem] z-[70] max-h-[min(78vh,36rem)] overflow-auto rounded-sm border p-4 sm:absolute sm:inset-x-auto sm:right-0 sm:top-[calc(100%+0.5rem)] sm:w-[22rem] sm:max-h-[min(70vh,34rem)] sm:p-5 ${panel}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p
                  id={titleId}
                  className="text-[11px] uppercase tracking-[0.18em]"
                >
                  Silver rate · {rates.city}
                </p>
                <p className={`mt-1 text-xs ${muted}`}>
                  {rates.purityLabel} · {rates.unitLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={`rounded-sm p-1 opacity-70 transition hover:opacity-100 ${muted}`}
                aria-label="Close silver rates"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className={`mt-4 rounded-sm border px-3 py-3 ${tableBorder}`}>
              <p className={`text-[10px] uppercase tracking-[0.16em] ${muted}`}>
                Today · {formatDisplayDate(rates.today.date)}
              </p>
              <p className="mt-1 text-2xl font-medium tabular-nums tracking-tight">
                {formatInr(rates.today.perGramInr, 1)}
                <span className={`ml-1 text-sm font-normal ${muted}`}>
                  / gram
                </span>
              </p>
              <p className={`mt-1 text-xs tabular-nums ${muted}`}>
                {formatInr(rates.today.perKgInr)} / kg
              </p>
            </div>

            <p className="mt-5 text-[11px] uppercase tracking-[0.16em]">
              Last 10 days
            </p>
            <div className={`mt-2 overflow-hidden rounded-sm border ${tableBorder}`}>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b ${tableBorder} ${muted}`}>
                    <th className="px-3 py-2 font-medium">Date</th>
                    <th className="px-3 py-2 text-right font-medium">₹ / gram</th>
                    <th className="hidden px-3 py-2 text-right font-medium sm:table-cell">
                      ₹ / kg
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rates.history.map((row, i) => (
                    <tr
                      key={row.date}
                      className={`border-b last:border-b-0 ${tableBorder} ${
                        i % 2 === 1 ? rowAlt : ""
                      }`}
                    >
                      <td className="px-3 py-2">{formatDisplayDate(row.date)}</td>
                      <td className="px-3 py-2 text-right tabular-nums">
                        {formatInr(row.perGramInr, 1)}
                      </td>
                      <td
                        className={`hidden px-3 py-2 text-right tabular-nums sm:table-cell ${muted}`}
                      >
                        {formatInr(row.perKgInr)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className={`mt-3 text-[10px] leading-relaxed ${muted}`}>
              {rates.disclaimer}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
