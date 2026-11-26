"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { designs, previewPages } from "@/lib/brand";
import {
  clearSelectedDesign,
  readSelectedDesign,
  writeSelectedDesign,
} from "@/lib/selection";
import { products } from "@/lib/products";
import type { DesignId, PreviewPage, Product } from "@/lib/types";
import { ConceptA } from "@/components/concepts/ConceptA";
import { ConceptB } from "@/components/concepts/ConceptB";
import { ConceptC } from "@/components/concepts/ConceptC";
import { ConceptD } from "@/components/concepts/ConceptD";

export function StakeholderChrome() {
  const [activeDesign, setActiveDesign] = useState<DesignId>("A");
  const [page, setPage] = useState<PreviewPage>("home");
  const [selected, setSelected] = useState<DesignId | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product>(products[0]);

  useEffect(() => {
    const stored = readSelectedDesign();
    setSelected(stored);
    if (stored) setActiveDesign(stored);
    setHydrated(true);
  }, []);

  const activeMeta = useMemo(
    () => designs.find((d) => d.id === activeDesign)!,
    [activeDesign],
  );

  function confirmSelection() {
    writeSelectedDesign(activeDesign);
    setSelected(activeDesign);
    setConfirmOpen(false);
  }

  function resetSelection() {
    clearSelectedDesign();
    setSelected(null);
  }

  const conceptProps = {
    page,
    onNavigate: setPage,
    activeProduct,
    onSelectProduct: setActiveProduct,
  };

  return (
    <div className="min-h-svh bg-[#0E0E10]">
      {/* Internal-only chrome — slim bar; design switcher is a right-side select */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#111114]/95 text-white backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-[1600px] items-center gap-3 px-4 md:px-6">
          <p className="min-w-0 shrink truncate text-sm font-medium tracking-wide text-white/90">
            Nithyam · Phase 1
          </p>

          <div
            className="ml-2 hidden min-w-0 items-center gap-0.5 md:flex"
            aria-label="Page preview"
          >
            {previewPages.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPage(p.id)}
                className={`rounded px-2.5 py-1 text-[11px] tracking-wide transition ${
                  page === p.id
                    ? "bg-white/15 text-white"
                    : "text-white/45 hover:text-white/80"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            {hydrated && selected ? (
              <span className="hidden items-center gap-1 rounded border border-emerald-400/25 bg-emerald-400/10 px-2 py-1 text-[11px] text-emerald-200 xl:inline-flex">
                <Check className="h-3 w-3" />
                Saved {selected}
              </span>
            ) : null}

            <label className="flex items-center gap-2 text-xs text-white/55">
              <span className="sr-only md:not-sr-only md:inline">Design</span>
              <select
                value={activeDesign}
                aria-label="Switch design concept A through D"
                onChange={(e) => {
                  setActiveDesign(e.target.value as DesignId);
                  setPage("home");
                }}
                className="cursor-pointer rounded border border-white/20 bg-[#1A1A1F] py-1.5 pl-2 pr-8 text-xs text-white outline-none focus:border-white/40"
              >
                {designs.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.id} — {d.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="rounded bg-white px-3 py-1.5 text-xs font-medium whitespace-nowrap text-black hover:bg-white/90"
            >
              Select This Design
            </button>
            <button
              type="button"
              onClick={resetSelection}
              aria-label="Reset selection"
              className="rounded border border-white/15 p-1.5 text-white/70 hover:bg-white/5 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="flex gap-1 overflow-x-auto border-t border-white/5 px-4 py-2 md:hidden">
          {previewPages.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPage(p.id)}
              className={`shrink-0 rounded px-2.5 py-1 text-[11px] ${
                page === p.id ? "bg-white/15 text-white" : "text-white/45"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full">
        {activeDesign === "A" && <ConceptA {...conceptProps} />}
        {activeDesign === "B" && <ConceptB {...conceptProps} />}
        {activeDesign === "C" && <ConceptC {...conceptProps} />}
        {activeDesign === "D" && <ConceptD {...conceptProps} />}
      </div>

      {confirmOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-select-title"
        >
          <div className="w-full max-w-md rounded border border-white/15 bg-[#1A1A1F] p-6 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="confirm-select-title" className="text-lg font-medium">
                  Confirm design selection?
                </h2>
                <p className="mt-2 text-sm text-white/65">
                  Save{" "}
                  <strong>
                    Design {activeDesign} — {activeMeta.label}
                  </strong>{" "}
                  in this browser (localStorage). No winner is published for the team.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setConfirmOpen(false)}
                className="rounded p-1 text-white/60 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded border border-white/20 px-4 py-2 text-sm text-white/80"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSelection}
                className="rounded bg-white px-4 py-2 text-sm font-medium text-black"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
