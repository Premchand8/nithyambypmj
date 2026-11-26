"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BagSearchIcons } from "@/components/shared/SiteIcons";
import type { PreviewPage } from "@/lib/types";

export type NavLink = {
  id: PreviewPage;
  label: string;
};

type Tone = "overlay" | "solid-light" | "solid-dark" | "solid-forest";

type Props = {
  page: PreviewPage;
  onNavigate: (page: PreviewPage) => void;
  links: readonly NavLink[];
  logoSrc: string;
  /** overlay = absolute over hero; solid-* = sticky bar */
  tone?: Tone;
  /** Center the logo (classic maison). Default: logo left. */
  logoCentered?: boolean;
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
  }
> = {
  overlay: {
    bar: "absolute inset-x-0 top-0 z-30 bg-gradient-to-b from-black/55 to-transparent",
    link: "text-white/75 hover:text-white",
    linkActive: "text-white",
    icon: "dark",
    menu: "border-white/15 bg-[#0A0A0A]/95 text-white",
    menuLink: "text-white/80 hover:bg-white/10 hover:text-white",
  },
  "solid-light": {
    // Sit below stakeholder chrome (h-14 + mobile page row)
    bar: "sticky top-[5.75rem] z-30 border-b border-[#E8E4E2] bg-[#FAF8F7]/95 backdrop-blur-md sm:top-14",
    link: "text-[#5A5A63] hover:text-[#0A0A0A]",
    linkActive: "text-[#0A0A0A] underline decoration-[#D4A5A5] underline-offset-8",
    icon: "light",
    menu: "border-[#E8E4E2] bg-[#FAF8F7] text-[#161616]",
    menuLink: "text-[#3A3A42] hover:bg-black/5",
  },
  "solid-dark": {
    bar: "sticky top-[5.75rem] z-30 border-b border-white/10 bg-[#111111]/95 backdrop-blur-md sm:top-14",
    link: "text-white/60 hover:text-white",
    linkActive: "text-white",
    icon: "dark",
    menu: "border-white/10 bg-[#111111] text-white",
    menuLink: "text-white/80 hover:bg-white/10",
  },
  "solid-forest": {
    bar: "sticky top-[5.75rem] z-30 border-b border-[#E8C17A]/20 bg-[#1B3022]/95 backdrop-blur-md sm:top-14",
    link: "text-[#F4F4F6]/70 hover:text-[#E8C17A]",
    linkActive: "text-[#E8C17A]",
    icon: "dark",
    menu: "border-[#E8C17A]/20 bg-[#15261B] text-[#F4F4F6]",
    menuLink: "text-[#F4F4F6]/85 hover:bg-white/5",
  },
};

/**
 * Site header for concept canvases (not stakeholder chrome).
 * Fixes: alignment, logo size, wrap, mobile drawer, z-index over hero, no overflow clip.
 */
export function SiteHeader({
  page,
  onNavigate,
  links,
  logoSrc,
  tone = "overlay",
  logoCentered = false,
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
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function go(id: PreviewPage) {
    onNavigate(id);
    setOpen(false);
  }

  const logo = (
    <button
      type="button"
      onClick={() => go("home")}
      className="relative z-10 flex shrink-0 items-center"
      aria-label="Nithyam home"
    >
      <Image
        src={logoSrc}
        alt="Nithyam by PMJ Jewels"
        width={200}
        height={60}
        className="h-8 w-auto max-w-[140px] object-contain object-left sm:h-9 sm:max-w-[180px] md:h-10 md:max-w-[200px]"
        priority
      />
    </button>
  );

  const desktopNav = (
    <nav
      className="hidden items-center gap-6 lg:flex xl:gap-8"
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
  );

  return (
    <header className={`${styles.bar} ${className}`}>
      <div className="relative mx-auto flex h-16 w-full max-w-[1400px] items-center gap-3 px-4 sm:px-6 md:h-[4.25rem] md:px-8">
        {logoCentered ? (
          <>
            <div className="flex min-w-0 flex-1 items-center">{desktopNav}</div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {logo}
            </div>
            <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
              <BagSearchIcons
                tone={styles.icon}
                className="hidden sm:flex"
              />
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
          </>
        ) : (
          <>
            {logo}
            <div className="ml-auto flex items-center gap-3 sm:gap-5">
              {desktopNav}
              <BagSearchIcons tone={styles.icon} className="hidden sm:flex" />
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
          </>
        )}
      </div>

      {/* Mobile drawer — portals visually under header, full width, no clip */}
      {open ? (
        <div
          id="site-mobile-nav"
          className={`absolute inset-x-0 top-full z-40 border-b shadow-xl ${styles.menu}`}
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
            <div className="mt-2 flex items-center justify-between border-t border-current/10 px-3 py-3 sm:hidden">
              <span className="text-xs opacity-60">Bag & search</span>
              <BagSearchIcons tone={styles.icon} />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
