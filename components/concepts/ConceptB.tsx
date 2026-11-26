"use client";

import Image from "next/image";
import { brand } from "@/lib/brand";
import {
  featuredProducts,
  formatSamplePrice,
  heroImages,
  products,
} from "@/lib/products";
import { Breadcrumbs, buildPageCrumbs } from "@/components/shared/Breadcrumbs";
import { ProductCard } from "@/components/shared/ProductCard";
import { SampleBadge } from "@/components/shared/SampleBadge";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import type { ConceptProps } from "./types";

const links = [
  { id: "home" as const, label: "Home" },
  { id: "shop" as const, label: "Shop" },
  { id: "about" as const, label: "About" },
  { id: "contact" as const, label: "Contact" },
];

const crumbLabels = {
  shop: "Shop",
  about: "About",
  contact: "Contact",
};

/** Persona B — Modern Minimal: sticky light nav, split 100svh hero, airy grids */
export function ConceptB({
  page,
  onNavigate,
  onBack,
  activeProduct,
  onOpenProduct,
}: ConceptProps) {
  const headerTone = page === "home" ? "overlay-light" : "solid-light";
  const crumbs = buildPageCrumbs({
    page,
    labels: crumbLabels,
    productName: activeProduct.name,
    onNavigate,
  });

  return (
    <div
      className={`relative bg-[#FAF8F7] text-[#161616] [--font-display:var(--font-outfit)] ${
        page === "product" ? "h-svh overflow-hidden" : "min-h-full"
      }`}
    >
      <SiteHeader
        page={page}
        onNavigate={onNavigate}
        links={links}
        logoSrc={brand.logos.indigo}
        tone={headerTone}
      />

      {page === "home" && (
        <>
          {/* Exact viewport split — header overlays; no height eaten */}
          <section className="grid h-svh max-h-svh min-h-svh w-full supports-[height:100dvh]:h-dvh supports-[height:100dvh]:max-h-dvh supports-[height:100dvh]:min-h-dvh lg:grid-cols-2">
            <div className="relative flex min-h-0 flex-col justify-end bg-[#FAF8F7] px-6 pb-14 pt-28 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20 xl:px-20">
              <h1 className="max-w-md font-[family-name:var(--font-outfit)] text-4xl font-light leading-[1.08] tracking-tight text-[#0A0A0A] md:text-5xl xl:text-6xl">
                Silver,
                <br />
                simply shown.
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#5A5A63]">
                Oxidised finishes, soft rose light — jewellery without the noise.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("shop")}
                className="mt-8 w-fit bg-[#302850] px-7 py-3.5 text-xs uppercase tracking-[0.16em] text-white transition hover:bg-[#241E3D]"
              >
                Shop the collection
              </button>
            </div>
            <div className="relative min-h-[42%] overflow-hidden lg:min-h-0">
              <Image
                src={heroImages.B}
                alt="Polished silver bangles on linen — lifestyle"
                fill
                priority
                className="object-cover"
                style={{ objectPosition: "68% 42%" }}
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4A5A5]">
                  Fresh picks
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-light">
                  Favourites for now
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("shop")}
                className="shrink-0 text-xs uppercase tracking-[0.14em] text-[#302850]"
              >
                View all →
              </button>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-14 md:grid-cols-4 md:gap-x-8">
              {featuredProducts.slice(0, 4).map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  layout="minimal"
                  onOpen={onOpenProduct}
                />
              ))}
            </div>
          </section>

          <section className="grid min-h-[60svh] lg:grid-cols-2">
            <div className="relative min-h-[44svh] overflow-hidden lg:min-h-full">
              <Image
                src={heroImages.BProduct}
                alt="Nithyam silver idol — close crop"
                fill
                className="object-cover"
                style={{ objectPosition: "center 28%" }}
                sizes="50vw"
              />
            </div>
            <div className="flex flex-col justify-center bg-white px-6 py-14 sm:px-10 lg:px-16">
              <h2 className="max-w-sm font-[family-name:var(--font-outfit)] text-3xl font-light leading-snug">
                Let the piece speak for itself.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-[#5A5A63]">
                A clean layout that puts the silver first.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("about")}
                className="mt-8 w-fit text-xs uppercase tracking-[0.16em] text-[#302850] underline underline-offset-8"
              >
                Know Nithyam
              </button>
            </div>
          </section>
        </>
      )}

      {page === "shop" && (
        <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
          <Breadcrumbs items={crumbs} tone="light" />
          <h1 className="font-[family-name:var(--font-outfit)] text-3xl font-light md:text-4xl">
            Shop
          </h1>
          <p className="mt-1 text-sm text-[#6B6B73]">Sample pricing only</p>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-10 md:grid-cols-3 md:gap-x-6 md:gap-y-10">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                layout="compact"
                onOpen={onOpenProduct}
              />
            ))}
          </div>
        </section>
      )}

      {page === "product" && (
        <section className="mx-auto flex h-[calc(100svh-4.5rem)] w-full max-w-6xl flex-col overflow-hidden px-4 pb-3 pt-3 sm:h-[calc(100svh-5rem)] sm:px-6 md:px-8 md:pb-4 md:pt-4">
          <Breadcrumbs items={crumbs} tone="light" />
          <div className="mt-2 grid min-h-0 flex-1 gap-4 overflow-y-auto md:grid-cols-12 md:items-stretch md:gap-6 md:overflow-hidden">
            <div className="relative flex min-h-[42svh] items-center justify-center bg-[#ECECEF] md:col-span-7 md:min-h-0">
              <Image
                src={activeProduct.image}
                alt={activeProduct.name}
                fill
                className="object-contain p-3 sm:p-5"
                sizes="(max-width:768px) 100vw, 60vw"
                priority
              />
            </div>
            <div className="flex flex-col justify-center md:col-span-5 md:overflow-y-auto">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#9A9AA3]">
                {activeProduct.sku}
              </p>
              <h1 className="mt-2 font-[family-name:var(--font-outfit)] text-2xl font-light sm:text-3xl">
                {activeProduct.name}
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#5A5A63]">
                {activeProduct.blurb}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <p className="text-lg">
                  {formatSamplePrice(activeProduct.samplePriceInr)}
                </p>
                <SampleBadge />
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <WhatsAppButton
                  sku={activeProduct.sku}
                  className="!px-4 !py-2.5 !text-xs"
                />
                <button
                  type="button"
                  onClick={() => onBack("shop")}
                  className="border border-[#D0D0D6] px-4 py-2.5 text-xs"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {page === "about" && (
        <section className="mx-auto max-w-2xl px-5 py-20 md:px-8 md:py-24">
          <Breadcrumbs items={crumbs} tone="light" />
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-light">
            About us
          </h1>
          <p className="mt-8 text-base leading-8 text-[#4A4A52]">
            Nithyam is handcrafted silver jewellery by PMJ Jewels. More of our story will
            appear here shortly.
          </p>
        </section>
      )}

      {page === "contact" && (
        <section className="mx-auto max-w-md px-5 py-20 md:px-8 md:py-24">
          <Breadcrumbs items={crumbs} tone="light" />
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-light">
            Contact us
          </h1>
          <form className="mt-10 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              className="w-full border border-[#E0DCD9] bg-white px-4 py-3 text-sm outline-none focus:border-[#302850]"
              placeholder="Your name"
              aria-label="Your name"
            />
            <input
              className="w-full border border-[#E0DCD9] bg-white px-4 py-3 text-sm outline-none focus:border-[#302850]"
              placeholder="Email address"
              aria-label="Email address"
            />
            <textarea
              className="min-h-28 w-full border border-[#E0DCD9] bg-white px-4 py-3 text-sm outline-none focus:border-[#302850]"
              placeholder="Your message"
              aria-label="Your message"
            />
            <button
              type="submit"
              className="w-full bg-[#302850] py-3 text-xs uppercase tracking-[0.16em] text-white"
            >
              Send message (preview)
            </button>
          </form>
          <WhatsAppButton className="mt-6 w-full" />
          <p className="mt-6 text-xs text-[#9A9AA3]">
            WhatsApp {brand.placeholders.whatsappDisplay} (sample number)
          </p>
        </section>
      )}

      {page !== "product" ? (
        <footer className="border-t border-[#E8E4E2] px-5 py-10 text-center text-xs text-[#9A9AA3]">
          {brand.parentLine}
        </footer>
      ) : null}
    </div>
  );
}
