"use client";

import { useEffect, useId, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import {
  formatDisplayDate,
  formatInr,
  getSampleSilverRates,
} from "@/lib/silverRates";

type Props = {
  tone?: "light" | "dark";
};

/**
 * Slim header rate trigger → centred premium rates modal
 * (aligned columns, calm jewellery-site typography).
 */
export function SilverRateControl({ tone = "dark" }: Props) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const rates = getSampleSilverRates();
  const isDark = tone === "dark";

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const trigger = isDark
    ? "text-white/90 hover:text-white"
    : "text-[#302850] hover:text-[#241E3D]";
  const triggerRule = isDark ? "border-white/25" : "border-[#302850]/25";
  const modal = isDark
    ? "border-white/12 bg-[#0C0C0C] text-[#F4F4F6]"
    : "border-[#E8E4E2] bg-[#FFFCFA] text-[#161616]";
  const muted = isDark ? "text-white/50" : "text-[#6B6B73]";
  const hairline = isDark ? "border-white/10" : "border-[#E6E1DC]";
  const headBg = isDark ? "bg-white/[0.04]" : "bg-[#F4F0EC]";
  const accent = isDark ? "text-[#E8C17A]" : "text-[#302850]";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`inline-flex h-9 items-center gap-1.5 border-b px-0.5 transition ${trigger} ${triggerRule}`}
      >
        <span className="text-[10px] uppercase tracking-[0.18em] opacity-75">
          Ag
        </span>
        <span className="text-[12px] font-medium tabular-nums tracking-tight">
          {formatInr(rates.today.perGramInr, 1)}
          <span className="font-normal opacity-60">/g</span>
        </span>
        <ChevronDown
          className={`h-3 w-3 opacity-60 transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            aria-label="Close silver rates"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={`relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-md border sm:rounded-sm ${modal}`}
          >
            <div
              className={`flex shrink-0 items-start justify-between gap-4 border-b px-5 py-4 sm:px-6 sm:py-5 ${hairline}`}
            >
              <div>
                <p
                  id={titleId}
                  className="text-[11px] uppercase tracking-[0.22em]"
                >
                  Silver rate
                </p>
                <p className={`mt-1.5 text-sm ${muted}`}>
                  {rates.city} · {rates.purityLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={`-mr-1 -mt-0.5 rounded-sm p-1.5 transition hover:opacity-100 ${muted}`}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              <div className={`border-b pb-5 ${hairline}`}>
                <p
                  className={`text-[10px] uppercase tracking-[0.2em] ${muted}`}
                >
                  Today · {formatDisplayDate(rates.today.date)}
                </p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className={`text-3xl font-light tabular-nums tracking-tight sm:text-4xl ${accent}`}>
                      {formatInr(rates.today.perGramInr, 1)}
                    </p>
                    <p className={`mt-1 text-xs ${muted}`}>per gram</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg tabular-nums tracking-tight">
                      {formatInr(rates.today.perKgInr)}
                    </p>
                    <p className={`mt-1 text-xs ${muted}`}>per kilogram</p>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-[10px] uppercase tracking-[0.2em]">
                Last 10 days
              </p>

              <div className={`mt-3 overflow-hidden border ${hairline}`}>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className={`${headBg} ${muted}`}>
                      <th className="px-3 py-2.5 text-left text-[10px] font-medium uppercase tracking-[0.14em]">
                        Date
                      </th>
                      <th className="px-3 py-2.5 text-right text-[10px] font-medium uppercase tracking-[0.14em]">
                        Per gram
                      </th>
                      <th className="px-3 py-2.5 text-right text-[10px] font-medium uppercase tracking-[0.14em]">
                        Per kg
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rates.history.map((row) => (
                      <tr
                        key={row.date}
                        className={`border-t ${hairline}`}
                      >
                        <td className={`px-3 py-2.5 ${muted}`}>
                          {formatDisplayDate(row.date)}
                        </td>
                        <td className="px-3 py-2.5 text-right tabular-nums">
                          {formatInr(row.perGramInr, 1)}
                        </td>
                        <td
                          className={`px-3 py-2.5 text-right tabular-nums ${muted}`}
                        >
                          {formatInr(row.perKgInr)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className={`mt-4 text-[11px] leading-relaxed ${muted}`}>
                {rates.disclaimer}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
