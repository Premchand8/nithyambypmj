"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BagSearchIcons } from "@/components/shared/SiteIcons";
import { SilverRateControl } from "@/components/shared/SilverRateControl";
import type { PreviewPage } from "@/lib/types";

export type NavLink = {
  id: PreviewPage;
  label: string;
};

type Tone =
  | "overlay"
  | "overlay-light"
  | "solid-light"
  | "solid-dark"
  | "solid-forest";

type Props = {
  page: PreviewPage;
  onNavigate: (page: PreviewPage) => void;
  links: readonly NavLink[];
  logoSrc: string;
  tone?: Tone;
  className?: string;
};

const toneStyles: Record<
  Tone,
  {
    bar: string;
    link: string;
    linkActive: string;
    icon: "light" | "dark";
    menu: string;
    menuLink: string;
    /** Mobile strip under the header (silver rate) */
    mobileStrip: string;
  }
> = {
  overlay: {
    bar: "pointer-events-none absolute inset-x-0 top-0 z-40 bg-gradient-to-b from-black/45 via-black/15 to-transparent",
    link: "text-white/80 hover:text-white",
    linkActive: "text-white",
    icon: "dark",
    menu: "border-white/15 bg-[#0A0A0A]/95 text-white",
    menuLink: "text-white/80 hover:bg-white/10 hover:text-white",
    mobileStrip: "border-white/10 bg-black/50 text-white backdrop-blur-md",
  },
  "overlay-light": {
    bar: "pointer-events-none absolute inset-x-0 top-0 z-40 bg-gradient-to-b from-[#FAF8F7]/95 via-[#FAF8F7]/50 to-transparent",
    link: "text-[#5A5A63] hover:text-[#0A0A0A]",
    linkActive: "text-[#0A0A0A]",
    icon: "light",
    menu: "border-[#E8E4E2] bg-[#FAF8F7]/98 text-[#161616]",
    menuLink: "text-[#3A3A42] hover:bg-black/5",
    mobileStrip: "border-[#E8E4E2]/80 bg-[#FAF8F7]/92 text-[#161616] backdrop-blur-md",
  },
  "solid-light": {
    bar: "sticky top-0 z-40 border-b border-[#E8E4E2] bg-[#FAF8F7]/95 backdrop-blur-md",
    link: "text-[#5A5A63] hover:text-[#0A0A0A]",
    linkActive:
      "text-[#0A0A0A] underline decoration-[#D4A5A5] underline-offset-8",
    icon: "light",
    menu: "border-[#E8E4E2] bg-[#FAF8F7] text-[#161616]",
    menuLink: "text-[#3A3A42] hover:bg-black/5",
    mobileStrip: "border-[#E8E4E2] bg-[#FAF8F7]/95 text-[#161616]",
  },
  "solid-dark": {
    bar: "sticky top-0 z-40 border-b border-white/10 bg-[#111111]/95 backdrop-blur-md",
    link: "text-white/60 hover:text-white",
    linkActive: "text-white",
    icon: "dark",
    menu: "border-white/10 bg-[#111111] text-white",
    menuLink: "text-white/80 hover:bg-white/10",
    mobileStrip: "border-white/10 bg-[#111111]/95 text-white",
  },
  "solid-forest": {
    bar: "sticky top-0 z-40 border-b border-[#E8C17A]/20 bg-[#1B3022]/95 backdrop-blur-md",
    link: "text-[#F4F4F6]/70 hover:text-[#E8C17A]",
    linkActive: "text-[#E8C17A]",
    icon: "dark",
    menu: "border-[#E8C17A]/20 bg-[#15261B] text-[#F4F4F6]",
    menuLink: "text-[#F4F4F6]/85 hover:bg-white/5",
    mobileStrip: "border-[#E8C17A]/20 bg-[#1B3022]/95 text-[#F4F4F6]",
  },
};

/** Header: large centered Nithyam logo; nav left / tools right for balance */
export function SiteHeader({
  page,
  onNavigate,
  links,
  logoSrc,
  tone = "overlay",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const styles = toneStyles[tone];

  useEffect(() => {
    setOpen(false);
  }, [page]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function go(id: PreviewPage) {
    onNavigate(id);
    setOpen(false);
  }

  const pe = "pointer-events-auto";

  return (
    <header className={`${styles.bar} ${className}`}>
      <div className="relative mx-auto flex h-[4.5rem] w-full max-w-[1400px] items-center px-4 sm:h-20 sm:px-6 md:px-8">
        {/* True viewport-centred logo (not skewed by asymmetric side tools) */}
        <button
          type="button"
          onClick={() => go("home")}
          className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 ${pe}`}
          aria-label="Nithyam home"
        >
          <Image
            src={logoSrc}
            alt="Nithyam by PMJ Jewels"
            width={320}
            height={96}
            className="h-11 w-auto max-w-[min(52vw,260px)] object-contain sm:h-12 sm:max-w-[280px] md:h-14 md:max-w-[320px]"
            priority
          />
        </button>

        <nav
          className={`relative z-20 hidden min-w-0 items-center gap-5 pr-[min(30vw,180px)] lg:flex xl:gap-7 ${pe}`}
          aria-label="Primary"
        >
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              className={`whitespace-nowrap text-[11px] uppercase tracking-[0.18em] transition ${
                page === link.id ? styles.linkActive : styles.link
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div
          className={`relative z-20 ml-auto flex items-center justify-end gap-0.5 pl-2 sm:gap-2 sm:pl-[min(30vw,200px)] ${pe}`}
        >
          {/* Desktop: silver rate stays top-right */}
          <div className="hidden lg:block">
            <SilverRateControl tone={styles.icon} />
          </div>
          <BagSearchIcons tone={styles.icon} />
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-sm lg:hidden ${styles.link}`}
            aria-expanded={open}
            aria-controls="site-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile: silver rate under the menu/header — clear of tools + WhatsApp float */}
      <div
        className={`pointer-events-auto border-b lg:hidden ${styles.mobileStrip} ${pe}`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center px-4 py-2 sm:px-6">
          <SilverRateControl tone={styles.icon} />
        </div>
      </div>

      {open ? (
        <div
          id="site-mobile-nav"
          className={`pointer-events-auto absolute inset-x-0 top-full z-50 border-b shadow-xl ${styles.menu}`}
        >
          <nav className="mx-auto flex max-w-[1400px] flex-col px-4 py-3 sm:px-6 md:px-8">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className={`rounded-sm px-3 py-3 text-left text-sm tracking-wide ${styles.menuLink} ${
                  page === link.id ? "font-medium" : ""
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
