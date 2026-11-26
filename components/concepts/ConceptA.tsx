"use client";

import Image from "next/image";
import { brand } from "@/lib/brand";
import {
  featuredProducts,
  formatSamplePrice,
  heroImages,
  products,
  sampleTestimonials,
} from "@/lib/products";
import { Breadcrumbs, buildPageCrumbs } from "@/components/shared/Breadcrumbs";
import { HeroBanner } from "@/components/shared/HeroBanner";
import { ProductCard } from "@/components/shared/ProductCard";
import { SampleBadge } from "@/components/shared/SampleBadge";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import type { ConceptProps } from "./types";

const links = [
  { id: "home" as const, label: "Home" },
  { id: "shop" as const, label: "Collection" },
  { id: "about" as const, label: "Our story" },
  { id: "contact" as const, label: "Contact" },
];

/** Persona A — Classic Luxury: centred maison, gold on black, full-viewport hero */
const crumbLabels = {
  shop: "Collection",
  about: "Our story",
  contact: "Contact",
};

export function ConceptA({
  page,
  onNavigate,
  onBack,
  activeProduct,
  onOpenProduct,
}: ConceptProps) {
  const headerTone = page === "home" ? "overlay" : "solid-dark";
  const crumbs = buildPageCrumbs({
    page,
    labels: crumbLabels,
    productName: activeProduct.name,
    onNavigate,
  });

  return (
    <div
      className={`relative bg-[#0A0A0A] text-[#F4F4F6] [--font-display:var(--font-cormorant)] ${
        page === "shop" || page === "product"
          ? "h-svh overflow-hidden"
          : "min-h-full"
      }`}
    >
      <SiteHeader
        page={page}
        onNavigate={onNavigate}
        links={links}
        logoSrc={brand.logos.light}
        tone={headerTone}
      />

      {page === "home" && (
        <>
          <HeroBanner
            src={heroImages.A}
            alt="Nithyam silver craft — Krishna jhoola detail"
            position="center 40%"
            overlayClassName="bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.15)_0%,rgba(10,10,10,0.72)_75%)]"
          >
            <div className="flex flex-1 flex-col items-center justify-end px-6 pb-16 pt-28 text-center sm:pb-20 md:pb-24">
              <h1 className="max-w-2xl font-[family-name:var(--font-cormorant)] text-3xl font-light leading-snug tracking-[0.04em] text-white animate-[fadeUp_900ms_ease_both] sm:text-4xl md:text-5xl">
                Heirloom silver, crafted with grace
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                Handcrafted silver jewellery for the sacred home.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("shop")}
                className="mt-8 border border-[#B8883A] bg-[#B8883A]/10 px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] text-[#E8C17A] transition hover:bg-[#B8883A] hover:text-[#0A0A0A]"
              >
                Explore the collection
              </button>
            </div>
          </HeroBanner>

          <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-24">
            <div className="mx-auto max-w-xl text-center">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#B8883A]">
                Chosen pieces
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-white md:text-5xl">
                From our collection
              </h2>
            </div>
            <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {featuredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  tone="dark"
                  onOpen={onOpenProduct}
                />
              ))}
            </div>
          </section>

          <section className="border-y border-[#B8883A]/20 bg-[#0F0F0F] px-5 py-16 md:px-10 md:py-20">
            <figure className="mx-auto max-w-2xl text-center">
              <blockquote className="font-[family-name:var(--font-cormorant)] text-2xl italic leading-relaxed text-white/85 md:text-3xl">
                “{sampleTestimonials[0].quote}”
              </blockquote>
              <figcaption className="mt-5 text-[10px] uppercase tracking-[0.2em] text-white/45">
                {sampleTestimonials[0].name} · <SampleBadge />
              </figcaption>
            </figure>
          </section>
        </>
      )}

      {page === "shop" && (
        <section className="flex h-[calc(100svh-4.5rem)] flex-col overflow-hidden px-4 pb-3 pt-3 sm:h-[calc(100svh-5rem)] sm:px-6 md:px-8 md:pb-4 md:pt-4">
          <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col">
            <div className="shrink-0 text-center">
              <Breadcrumbs
                items={crumbs}
                tone="gold"
                className="[&_ol]:justify-center"
              />
              <h1 className="font-[family-name:var(--font-cormorant)] text-xl text-white sm:text-2xl md:text-3xl">
                Our collection
              </h1>
            </div>
            <div className="mt-3 grid min-h-0 flex-1 grid-cols-2 gap-2 overflow-y-auto auto-rows-[minmax(7.5rem,1fr)] sm:grid-cols-3 md:mt-4 md:auto-rows-[minmax(0,1fr)] md:grid-cols-4 md:gap-3 md:overflow-hidden">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  tone="dark"
                  layout="compact"
                  onOpen={onOpenProduct}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {page === "product" && (
        <section className="flex h-[calc(100svh-4.5rem)] flex-col overflow-hidden px-4 pb-3 pt-3 sm:h-[calc(100svh-5rem)] sm:px-6 md:px-8 md:pb-4 md:pt-4">
          <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col">
            <Breadcrumbs items={crumbs} tone="gold" />
            <div className="mt-2 grid min-h-0 flex-1 gap-4 overflow-y-auto md:grid-cols-2 md:items-stretch md:gap-6 md:overflow-hidden">
              <div className="relative min-h-[38svh] overflow-hidden border border-[#B8883A]/25 md:min-h-0">
                <Image
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center py-1 md:overflow-hidden">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#B8883A]">
                  {activeProduct.sku}
                </p>
                <h1 className="mt-2 font-[family-name:var(--font-cormorant)] text-2xl text-white sm:text-3xl md:text-4xl">
                  {activeProduct.name}
                </h1>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/65 line-clamp-3 md:line-clamp-4">
                  {activeProduct.blurb}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <p className="text-xl text-[#E8C17A]">
                    {formatSamplePrice(activeProduct.samplePriceInr)}
                  </p>
                  <SampleBadge />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <WhatsAppButton
                    sku={activeProduct.sku}
                    className="!px-4 !py-2.5 !text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => onBack("shop")}
                    className="border border-white/25 px-4 py-2.5 text-xs text-white/80"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {page === "about" && (
        <section className="px-5 pb-20 pt-10 md:px-10 md:pb-24">
          <div className="mx-auto max-w-6xl">
            <Breadcrumbs items={crumbs} tone="gold" />
          </div>
          <div className="mx-auto mt-2 grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="relative min-h-[22rem] overflow-hidden sm:min-h-[28rem]">
              <Image
                src={heroImages.about}
                alt="Nithyam craft"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#B8883A]">
                Our story
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-white md:text-5xl">
                Nithyam
              </h1>
              <p className="mt-6 text-sm leading-8 text-white/70">
                Nithyam is handcrafted silver jewellery by PMJ Jewels — crafted with care
                for the sacred home. We will share more of our story here soon.
              </p>
            </div>
          </div>
        </section>
      )}

      {page === "contact" && (
        <section className="flex min-h-[70svh] flex-col items-center justify-center px-5 py-20 text-center md:px-10">
          <Breadcrumbs items={crumbs} tone="gold" className="[&_ol]:justify-center" />
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#B8883A]">
            Get in touch
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-white md:text-5xl">
            Contact us
          </h1>
          <div className="mt-10 space-y-2 text-sm text-white/75">
            <p>{brand.placeholders.email}</p>
            <p>WhatsApp {brand.placeholders.whatsappDisplay} (sample number)</p>
            <p>{brand.placeholders.city}</p>
          </div>
          <WhatsAppButton className="mt-10" />
        </section>
      )}

      {page !== "shop" && page !== "product" ? (
        <footer className="border-t border-[#B8883A]/15 px-5 py-10 text-center md:px-10">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
            {brand.parentLine}
          </p>
        </footer>
      ) : null}
    </div>
  );
}
