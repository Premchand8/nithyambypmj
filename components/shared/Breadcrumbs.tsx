"use client";

import { ChevronRight } from "lucide-react";
import type { PreviewPage } from "@/lib/types";

export type BreadcrumbItem = {
  label: string;
  /** Omit onClick on the current (last) crumb */
  onClick?: () => void;
};

type CrumbLabels = {
  shop: string;
  about: string;
  contact: string;
};

/** Home › Shop › Product (and About / Contact / Silver) - no crumbs on home */
export function buildPageCrumbs(options: {
  page: PreviewPage;
  labels: CrumbLabels;
  productName?: string;
  onNavigate: (page: PreviewPage) => void;
}): BreadcrumbItem[] {
  const { page, labels, productName, onNavigate } = options;
  if (page === "home") return [];

  const home: BreadcrumbItem = {
    label: "Home",
    onClick: () => onNavigate("home"),
  };

  if (page === "shop") {
    return [home, { label: labels.shop }];
  }
  if (page === "product") {
    return [
      home,
      { label: labels.shop, onClick: () => onNavigate("shop") },
      { label: productName ?? "Product" },
    ];
  }
  if (page === "about") {
    return [home, { label: labels.about }];
  }
  if (page === "silver") {
    return [home, { label: "Silver rate" }];
  }
  return [home, { label: labels.contact }];
}

type Tone = "light" | "dark" | "gold" | "forest";

const toneStyles: Record<
  Tone,
  { wrap: string; link: string; current: string; sep: string }
> = {
  light: {
    wrap: "text-[#6B6B73]",
    link: "hover:text-[#0A0A0A]",
    current: "text-[#0A0A0A]",
    sep: "text-[#C8C4C0]",
  },
  dark: {
    wrap: "text-white/45",
    link: "hover:text-white",
    current: "text-white/85",
    sep: "text-white/25",
  },
  gold: {
    wrap: "text-white/45",
    link: "hover:text-[#E8C17A]",
    current: "text-[#E8C17A]",
    sep: "text-[#B8883A]/50",
  },
  forest: {
    wrap: "text-[#D5D8C8]/55",
    link: "hover:text-[#E8C17A]",
    current: "text-[#E8C17A]",
    sep: "text-[#E8C17A]/35",
  },
};

type Props = {
  items: BreadcrumbItem[];
  tone?: Tone;
  className?: string;
};

/** Trail for Shop / Product / About / Contact - Home is always the root crumb */
export function Breadcrumbs({ items, tone = "light", className = "" }: Props) {
  if (items.length === 0) return null;
  const styles = toneStyles[tone];

  return (
    <nav
      aria-label="Breadcrumb"
      className={`mb-2 ${styles.wrap} ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] uppercase tracking-[0.14em] sm:text-[11px]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="inline-flex items-center gap-1.5">
              {i > 0 ? (
                <ChevronRight
                  className={`h-3 w-3 shrink-0 ${styles.sep}`}
                  aria-hidden
                />
              ) : null}
              {isLast || !item.onClick ? (
                <span
                  className={isLast ? styles.current : undefined}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className={`transition ${styles.link}`}
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
