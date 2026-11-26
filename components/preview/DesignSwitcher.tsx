"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Layers, RotateCcw } from "lucide-react";
import { designs } from "@/lib/brand";
import { usePreview } from "@/components/preview/PreviewContext";

type Props = {
  tone?: "light" | "dark";
};

/** Subtle internal switcher - sits beside bag; not public-site chrome */
export function DesignSwitcher({ tone = "dark" }: Props) {
  const {
    activeDesign,
    setActiveDesign,
    selected,
    hydrated,
    confirmSelection,
    resetSelection,
  } = usePreview();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const colour = tone === "dark" ? "text-white" : "text-current";

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

  return (
    <div ref={rootRef} className={`relative ${colour}`}>
      <button
        type="button"
        aria-label="Switch design concept"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="rounded-sm p-1.5 opacity-70 transition hover:opacity-100"
        title="Design concepts"
      >
        <Layers className="h-4 w-4" strokeWidth={1.5} />
      </button>

      {open ? (
        <div
          id={menuId}
          role="dialog"
          aria-label="Design concepts"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[70] w-[min(18rem,calc(100vw-2rem))] rounded-md border border-black/10 bg-white p-2 text-[#161616] shadow-xl"
        >
          <p className="px-2 pb-1.5 pt-1 text-[10px] uppercase tracking-[0.16em] text-[#8A8A92]">
            Design preview
          </p>
          <ul className="space-y-0.5">
            {designs.map((d) => {
              const active = activeDesign === d.id;
              return (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDesign(d.id);
                      setOpen(false);
                    }}
                    className={`flex w-full items-start gap-2 rounded-sm px-2 py-2 text-left transition ${
                      active ? "bg-[#F3F1F2]" : "hover:bg-[#F7F5F4]"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        active
                          ? "border-[#302850] bg-[#302850] text-white"
                          : "border-[#D0D0D6]"
                      }`}
                    >
                      {active ? <Check className="h-2.5 w-2.5" /> : null}
                    </span>
                    <span>
                      <span className="block text-xs font-medium">
                        {d.id}. {d.label}
                      </span>
                      <span className="mt-0.5 block text-[10px] leading-snug text-[#8A8A92]">
                        {d.subtitle}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-2 flex items-center gap-1 border-t border-[#EFEFEF] pt-2">
            <button
              type="button"
              onClick={() => {
                confirmSelection();
                setOpen(false);
              }}
              className="flex-1 rounded-sm bg-[#161616] px-2 py-1.5 text-[11px] font-medium text-white hover:bg-black"
            >
              Select this design
            </button>
            <button
              type="button"
              onClick={() => {
                resetSelection();
              }}
              aria-label="Reset saved selection"
              className="rounded-sm border border-[#E6E6EA] p-1.5 text-[#6B6B73] hover:bg-[#F7F5F4]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
          {hydrated && selected ? (
            <p className="mt-1.5 px-1 text-[10px] text-[#8A8A92]">
              Saved on this browser: Design {selected}
            </p>
          ) : (
            <p className="mt-1.5 px-1 text-[10px] text-[#8A8A92]">
              For internal review only · no favourite chosen
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
