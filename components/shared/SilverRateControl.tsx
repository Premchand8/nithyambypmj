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
 * Header “Silver rate” control → shopper-clear modal:
 * Today’s silver rate · Hyderabad, ₹/gram + ₹/kg, last 10 days table.
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
  const triggerRule = isDark ? "border-white/30" : "border-[#302850]/30";
  const modal = isDark
    ? "border-white/12 bg-[#0C0C0C] text-[#F4F4F6]"
    : "border-[#E8E4E2] bg-[#FFFCFA] text-[#161616]";
  const muted = isDark ? "text-white/55" : "text-[#5F5F67]";
  const hairline = isDark ? "border-white/10" : "border-[#E6E1DC]";
  const headBg = isDark ? "bg-white/[0.04]" : "bg-[#F4F0EC]";
  const accent = isDark ? "text-[#E8C17A]" : "text-[#302850]";
  const tile = isDark ? "bg-white/[0.04]" : "bg-[#F7F3EF]";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`Today’s silver rate, Hyderabad, ${formatInr(rates.today.perGramInr, 1)} per gram`}
        className={`inline-flex h-8 items-center gap-1.5 border-b px-0.5 transition sm:h-9 ${trigger} ${triggerRule}`}
      >
        <span className="text-[10px] uppercase tracking-[0.16em] opacity-80">
          Silver rate
        </span>
        <span className="text-[12px] font-medium tabular-nums tracking-tight sm:text-[13px]">
          {formatInr(rates.today.perGramInr, 1)}
          <span className="font-normal opacity-65">/g</span>
        </span>
        <ChevronDown
          className={`h-3 w-3 shrink-0 opacity-60 transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 pb-[5.5rem] sm:items-center sm:p-6 sm:pb-6">
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
            className={`relative z-10 flex max-h-[min(85vh,calc(100svh-6.5rem))] w-full max-w-xl flex-col overflow-hidden rounded-t-md border sm:max-h-[min(92vh,40rem)] sm:rounded-sm ${modal}`}
          >
            <div
              className={`flex shrink-0 items-start justify-between gap-4 border-b px-5 py-5 sm:px-7 sm:py-6 ${hairline}`}
            >
              <div className="min-w-0 pr-2">
                <h2
                  id={titleId}
                  className="text-base font-medium leading-snug tracking-tight sm:text-lg"
                >
                  Today’s silver rate · {rates.city}
                </h2>
                <p className={`mt-1.5 text-sm ${muted}`}>
                  {formatDisplayDate(rates.today.date)} · {rates.purityLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={`-mr-1 -mt-0.5 shrink-0 rounded-sm p-1.5 transition hover:opacity-100 ${muted}`}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className={`rounded-sm px-4 py-4 ${tile}`}>
                  <p className={`text-xs ${muted}`}>Price per gram</p>
                  <p
                    className={`mt-2 text-2xl font-medium tabular-nums tracking-tight sm:text-3xl ${accent}`}
                  >
                    {formatInr(rates.today.perGramInr, 1)}
                  </p>
                  <p className={`mt-1 text-xs ${muted}`}>₹ / gram</p>
                </div>
                <div className={`rounded-sm px-4 py-4 ${tile}`}>
                  <p className={`text-xs ${muted}`}>Price per kilogram</p>
                  <p className="mt-2 text-2xl font-medium tabular-nums tracking-tight sm:text-3xl">
                    {formatInr(rates.today.perKgInr)}
                  </p>
                  <p className={`mt-1 text-xs ${muted}`}>₹ / kg</p>
                </div>
              </div>

              <h3 className="mt-7 text-sm font-medium tracking-tight">
                Last 10 days
              </h3>
              <p className={`mt-1 text-xs ${muted}`}>
                Hyderabad · same purity
              </p>

              <div className={`mt-3 overflow-x-auto border ${hairline}`}>
                <table className="w-full min-w-[20rem] border-collapse text-sm">
                  <caption className="sr-only">
                    Silver rates for the last 10 days in Hyderabad
                  </caption>
                  <thead>
                    <tr className={`${headBg}`}>
                      <th
                        scope="col"
                        className={`px-3 py-3 text-left text-xs font-medium ${muted} sm:px-4`}
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className={`px-3 py-3 text-right text-xs font-medium ${muted} sm:px-4`}
                      >
                        ₹ / gram
                      </th>
                      <th
                        scope="col"
                        className={`px-3 py-3 text-right text-xs font-medium ${muted} sm:px-4`}
                      >
                        ₹ / kg
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rates.history.map((row) => (
                      <tr key={row.date} className={`border-t ${hairline}`}>
                        <td className="px-3 py-3 whitespace-nowrap sm:px-4">
                          {formatDisplayDate(row.date)}
                        </td>
                        <td className="px-3 py-3 text-right tabular-nums sm:px-4">
                          {formatInr(row.perGramInr, 1)}
                        </td>
                        <td
                          className={`px-3 py-3 text-right tabular-nums sm:px-4 ${muted}`}
                        >
                          {formatInr(row.perKgInr)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className={`mt-4 text-xs leading-relaxed ${muted}`}>
                {rates.disclaimer}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
