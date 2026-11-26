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
      {/* Internal stakeholder chrome — not part of the public site concepts */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#121216]/95 text-white backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-3 py-3 md:px-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                Internal stakeholder preview
              </p>
              <p className="text-sm text-white/85">
                Nithyam Phase 1 · compare four homepage concepts
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {hydrated && selected ? (
                <span className="inline-flex items-center gap-1.5 rounded-sm border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-200">
                  <Check className="h-3.5 w-3.5" />
                  Selected: Design {selected} —{" "}
                  {designs.find((d) => d.id === selected)?.label}
                </span>
              ) : (
                <span className="text-xs text-white/45">No design selected yet</span>
              )}
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="rounded-sm bg-white px-3 py-1.5 text-xs font-medium text-black transition hover:bg-white/90"
              >
                Select This Design
              </button>
              <button
                type="button"
                onClick={resetSelection}
                className="inline-flex items-center gap-1 rounded-sm border border-white/20 px-3 py-1.5 text-xs text-white/80 hover:bg-white/5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="tablist"
              aria-label="Design concepts"
              className="flex flex-wrap gap-1.5"
            >
              {designs.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  role="tab"
                  aria-selected={activeDesign === d.id}
                  onClick={() => {
                    setActiveDesign(d.id);
                    setPage("home");
                  }}
                  className={`rounded-sm px-3 py-2 text-left transition ${
                    activeDesign === d.id
                      ? "bg-white text-black"
                      : "bg-white/5 text-white/75 hover:bg-white/10"
                  }`}
                >
                  <span className="block text-xs font-semibold tracking-wide">
                    {d.id}. {d.label}
                  </span>
                  <span className="mt-0.5 hidden text-[10px] opacity-70 sm:block">
                    {d.subtitle}
                  </span>
                </button>
              ))}
            </div>

            <div
              role="tablist"
              aria-label="Page preview"
              className="flex flex-wrap gap-1"
            >
              {previewPages.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={page === p.id}
                  onClick={() => setPage(p.id)}
                  className={`rounded-sm px-2.5 py-1.5 text-[11px] uppercase tracking-[0.12em] ${
                    page === p.id
                      ? "bg-[#302850] text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-white/40">
            Viewing <span className="text-white/70">{activeMeta.label}</span>
            {" · "}
            This chrome is for internal review only and is not part of the public website.
            No winning design is pre-selected.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px]">
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
          <div className="w-full max-w-md rounded-sm border border-white/15 bg-[#1A1A1F] p-6 text-white shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="confirm-select-title" className="text-lg font-medium">
                  Confirm design selection?
                </h2>
                <p className="mt-2 text-sm text-white/65">
                  Save <strong>Design {activeDesign} — {activeMeta.label}</strong> to this
                  browser (localStorage). Stakeholders can reset anytime. This does not
                  publish or prefer a winner across the team.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setConfirmOpen(false)}
                className="rounded-sm p-1 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-sm border border-white/20 px-4 py-2 text-sm text-white/80"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSelection}
                className="rounded-sm bg-white px-4 py-2 text-sm font-medium text-black"
              >
                Confirm selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
