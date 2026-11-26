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
import { ProductCard } from "@/components/shared/ProductCard";
import { SampleBadge } from "@/components/shared/SampleBadge";
import { BagSearchIcons } from "@/components/shared/SiteIcons";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import type { ConceptProps } from "./types";

function Nav({
  page,
  onNavigate,
}: Pick<ConceptProps, "page" | "onNavigate">) {
  const links = [
    ["home", "Home"],
    ["shop", "Shop"],
    ["about", "About"],
    ["contact", "Contact"],
  ] as const;

  return (
    <header className="absolute inset-x-0 top-0 z-20 mix-blend-difference">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 text-white md:px-10">
        <nav className="hidden gap-5 text-[10px] uppercase tracking-[0.3em] md:flex">
          {links.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={page === id ? "opacity-100" : "opacity-70 hover:opacity-100"}
            >
              {label}
            </button>
          ))}
        </nav>
        <button type="button" onClick={() => onNavigate("home")} className="md:absolute md:left-1/2 md:-translate-x-1/2">
          <span className="font-[family-name:var(--font-instrument)] text-2xl tracking-[0.35em]">
            NITHYAM
          </span>
        </button>
        <BagSearchIcons tone="dark" />
      </div>
    </header>
  );
}

export function ConceptC({
  page,
  onNavigate,
  activeProduct,
  onSelectProduct,
}: ConceptProps) {
  return (
    <div className="concept-c min-h-full bg-[#111111] text-[#EDEDED] [--font-display:var(--font-instrument)]">
      <Nav page={page} onNavigate={onNavigate} />

      {page === "home" && (
        <>
          <section className="relative min-h-[100svh] overflow-hidden">
            <Image
              src={heroImages.C}
              alt="Nithyam editorial hero"
              fill
              priority
              className="object-cover scale-105 animate-[slowZoom_18s_ease_forwards]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />
            <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-16 pt-28 md:px-10">
              <Image
                src={brand.logos.light}
                alt="Nithyam"
                width={360}
                height={110}
                className="h-14 w-auto md:h-20"
                priority
              />
              <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-instrument)] text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
                The silver
                <br />
                issue.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                An editorial preview of handcrafted silver by PMJ Jewels — photography
                first, type oversized, commerce quiet.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate("shop")}
                  className="bg-white px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-black"
                >
                  Enter the lookbook
                </button>
                <WhatsAppButton variant="outline" className="border-white/40 text-white" />
              </div>
            </div>
          </section>

          <section className="px-5 py-20 md:px-10">
            <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
              <div className="md:col-span-4 md:sticky md:top-24 md:self-start">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#1F6B4F]">
                  Volume 01
                </p>
                <h2 className="mt-4 font-[family-name:var(--font-instrument)] text-4xl leading-tight md:text-5xl">
                  Pieces in frame
                </h2>
                <p className="mt-4 text-sm text-white/55">
                  Sample prices accompany each frame for stakeholder cost context.
                </p>
              </div>
              <div className="grid gap-14 sm:grid-cols-2 md:col-span-8">
                {featuredProducts.slice(0, 4).map((p, i) => (
                  <div
                    key={p.id}
                    className={i % 2 === 1 ? "sm:mt-16" : undefined}
                  >
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

          <section className="border-t border-[#1F6B4F]/35 bg-[#0E1210] px-5 py-16 md:px-10">
            <div className="mx-auto max-w-5xl">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#C4898E]">
                In their words
              </p>
              <p className="mt-4 font-[family-name:var(--font-instrument)] text-3xl leading-snug md:text-4xl">
                “{sampleTestimonials[0].quote}”
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/45">
                {sampleTestimonials[0].name} · <SampleBadge />
              </p>
            </div>
          </section>
        </>
      )}

      {page === "shop" && (
        <section className="px-5 pb-20 pt-28 md:px-10">
          <h1 className="font-[family-name:var(--font-instrument)] text-5xl md:text-7xl">
            Lookbook
          </h1>
          <p className="mt-3 text-sm text-white/55">Sample catalogue</p>
          <div className="mt-14 columns-1 gap-8 sm:columns-2 lg:columns-3">
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
                    i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
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
                  <span className="text-xs text-white/50">
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
        <section className="grid min-h-[100svh] md:grid-cols-2">
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
          <div className="flex flex-col justify-center px-6 py-16 md:px-14">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#C4898E]">
              Feature · {activeProduct.sku}
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-instrument)] text-5xl leading-none md:text-6xl">
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
                Back to lookbook
              </button>
            </div>
          </div>
        </section>
      )}

      {page === "about" && (
        <section className="px-5 pb-20 pt-28 md:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
            <h1 className="font-[family-name:var(--font-instrument)] text-6xl leading-none md:text-8xl">
              About
            </h1>
            <div>
              <p className="text-base leading-8 text-white/70">
                Nithyam is handcrafted silver by PMJ Jewels. Editorial layout only —
                long-form heritage copy and verified credentials will replace this
                placeholder once approved.
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
        <section className="flex min-h-[80svh] flex-col justify-center px-5 py-24 md:px-10">
          <h1 className="font-[family-name:var(--font-instrument)] text-6xl md:text-8xl">
            Say hello
          </h1>
          <p className="mt-6 max-w-md text-sm text-white/60">
            Placeholder contact for preview. WhatsApp enquiry is visual wiring only.
          </p>
          <div className="mt-10 space-y-2 text-lg text-white/80">
            <p>{brand.placeholders.email}</p>
            <p>WhatsApp {brand.placeholders.whatsappDisplay} (dummy)</p>
            <p>{brand.placeholders.city}</p>
          </div>
          <WhatsAppButton className="mt-10 w-fit" />
        </section>
      )}

      <footer className="border-t border-white/10 px-5 py-8 text-[11px] uppercase tracking-[0.2em] text-white/40 md:px-10">
        {brand.parentLine} · stakeholder preview
      </footer>
    </div>
  );
}
