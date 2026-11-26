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
import { HeroBanner } from "@/components/shared/HeroBanner";
import { ProductCard } from "@/components/shared/ProductCard";
import { SampleBadge } from "@/components/shared/SampleBadge";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import type { ConceptProps } from "./types";

const links = [
  { id: "home" as const, label: "Home" },
  { id: "shop" as const, label: "Lookbook" },
  { id: "about" as const, label: "Our story" },
  { id: "contact" as const, label: "Contact" },
];

/** Persona C — Premium Editorial: magazine masthead, oversized type, lookbook */
export function ConceptC({
  page,
  onNavigate,
  activeProduct,
  onSelectProduct,
}: ConceptProps) {
  const headerTone = page === "home" ? "overlay" : "solid-dark";

  return (
    <div className="relative min-h-full bg-[#111111] text-[#EDEDED] [--font-display:var(--font-instrument)]">
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
            src={heroImages.C}
            alt="Nithyam divine trinity — editorial hero"
            position="center 30%"
            overlayClassName="bg-gradient-to-t from-black via-black/50 to-black/40"
          >
            <div className="flex flex-1 flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 md:px-12 md:pb-24">
              <h1 className="max-w-4xl font-[family-name:var(--font-instrument)] text-5xl leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                The silver
                <br />
                chapter.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                Handcrafted silver jewellery by PMJ Jewels — photography first.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("shop")}
                className="mt-8 w-fit bg-white px-6 py-3.5 text-[11px] uppercase tracking-[0.22em] text-black"
              >
                Open the lookbook
              </button>
            </div>
          </HeroBanner>

          <section className="px-5 py-16 sm:px-8 md:px-12 md:py-24">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#1F6B4F]">
                  In focus
                </p>
                <h2 className="mt-4 font-[family-name:var(--font-instrument)] text-4xl leading-tight md:text-5xl">
                  Pieces in frame
                </h2>
                <p className="mt-4 text-sm text-white/55">Sample pricing only.</p>
              </div>
              <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:gap-12">
                {featuredProducts.slice(0, 4).map((p, i) => (
                  <div key={p.id} className={i % 2 === 1 ? "sm:mt-14" : undefined}>
                    <ProductCard
                      product={p}
                      tone="dark"
                      layout="editorial"
                      onOpen={(item) => {
                        onSelectProduct(item);
                        onNavigate("product");
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative min-h-[70svh] overflow-hidden">
            <Image
              src={heroImages.CAlt}
              alt="Editorial lifestyle accent"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex min-h-[70svh] items-end px-5 py-14 sm:px-8 md:px-12">
              <div className="max-w-3xl">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#C4898E]">
                  What patrons say
                </p>
                <p className="mt-4 font-[family-name:var(--font-instrument)] text-3xl leading-snug md:text-4xl">
                  “{sampleTestimonials[0].quote}”
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/45">
                  {sampleTestimonials[0].name} · <SampleBadge />
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {page === "shop" && (
        <section className="px-5 pb-20 pt-10 sm:px-8 md:px-12 md:pb-24">
          <h1 className="font-[family-name:var(--font-instrument)] text-5xl md:text-7xl">
            Lookbook
          </h1>
          <p className="mt-3 text-sm text-white/55">Sample catalogue only</p>
          <div className="mt-12 columns-1 gap-8 sm:columns-2 lg:mt-14 lg:columns-3">
            {products.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className="mb-8 block w-full break-inside-avoid text-left"
                onClick={() => {
                  onSelectProduct(p);
                  onNavigate("product");
                }}
              >
                <div
                  className={`relative overflow-hidden ${
                    i % 3 === 0
                      ? "aspect-[3/4]"
                      : i % 3 === 1
                        ? "aspect-square"
                        : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <p className="font-[family-name:var(--font-instrument)] text-xl">
                    {p.name}
                  </p>
                  <span className="shrink-0 text-xs text-white/50">
                    {formatSamplePrice(p.samplePriceInr)}
                  </span>
                </div>
                <SampleBadge className="mt-1" />
              </button>
            ))}
          </div>
        </section>
      )}

      {page === "product" && (
        <section className="grid md:min-h-[calc(100svh-4.25rem)] md:grid-cols-2">
          <div className="relative min-h-[50vh] md:min-h-full">
            <Image
              src={activeProduct.image}
              alt={activeProduct.name}
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-14 sm:px-10 md:px-14">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#C4898E]">
              Feature · {activeProduct.sku}
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-instrument)] text-4xl leading-none sm:text-5xl md:text-6xl">
              {activeProduct.name}
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
              {activeProduct.blurb}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <p className="text-2xl">
                {formatSamplePrice(activeProduct.samplePriceInr)}
              </p>
              <SampleBadge />
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <WhatsAppButton sku={activeProduct.sku} />
              <button
                type="button"
                onClick={() => onNavigate("shop")}
                className="border border-white/25 px-5 py-3 text-sm"
              >
                Return to lookbook
              </button>
            </div>
          </div>
        </section>
      )}

      {page === "about" && (
        <section className="px-5 pb-20 pt-10 sm:px-8 md:px-12 md:pb-24">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
            <h1 className="font-[family-name:var(--font-instrument)] text-5xl leading-none md:text-7xl lg:text-8xl">
              About
            </h1>
            <div>
              <p className="text-base leading-8 text-white/70">
                Nithyam is handcrafted silver jewellery by PMJ Jewels. A fuller brand story
                will follow on this page soon.
              </p>
              <div className="relative mt-10 aspect-[4/5] overflow-hidden">
                <Image
                  src={heroImages.about}
                  alt="About Nithyam"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {page === "contact" && (
        <section className="flex min-h-[70svh] flex-col justify-center px-5 py-20 sm:px-8 md:px-12">
          <h1 className="font-[family-name:var(--font-instrument)] text-5xl md:text-7xl lg:text-8xl">
            Do get in touch
          </h1>
          <p className="mt-6 max-w-md text-sm text-white/60">
            Sample contact details for layout review. WhatsApp uses a sample number.
          </p>
          <div className="mt-10 space-y-2 text-lg text-white/80">
            <p>{brand.placeholders.email}</p>
            <p>WhatsApp {brand.placeholders.whatsappDisplay} (sample number)</p>
            <p>{brand.placeholders.city}</p>
          </div>
          <WhatsAppButton className="mt-10 w-fit" />
        </section>
      )}

      <footer className="border-t border-white/10 px-5 py-8 text-[11px] uppercase tracking-[0.2em] text-white/40 sm:px-8 md:px-12">
        {brand.parentLine} · stakeholder preview
      </footer>
    </div>
  );
}
