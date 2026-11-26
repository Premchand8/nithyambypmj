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
import { SilverRatesView } from "@/components/shared/SilverRatesView";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import type { ConceptProps } from "./types";

const links = [
  { id: "home" as const, label: "Home" },
  { id: "shop" as const, label: "Collection" },
  { id: "about" as const, label: "Our Craft" },
  { id: "contact" as const, label: "Visit" },
];

const crumbLabels = {
  shop: "Collection",
  about: "Our Craft",
  contact: "Visit",
};

function LotusMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M32 10c2 6 4 10 4 14s-1.5 7-4 10c-2.5-3-4-6-4-10s2-8 4-14Z" />
      <path d="M20 16c4 5 7 9 8 13s0 7-2 11c-4-2-7-5-9-9s-1-9 3-15Z" />
      <path d="M44 16c-4 5-7 9-8 13s0 7 2 11c4-2 7-5 9-9s1-9-3-15Z" />
      <path d="M32 34v20" />
      <path d="M24 48h16" opacity="0.5" />
    </svg>
  );
}

/** Persona D — Contemporary Indian: forest immersion, lotus, storytelling sections */
export function ConceptD({
  page,
  onNavigate,
  onBack,
  activeProduct,
  onOpenProduct,
}: ConceptProps) {
  const headerTone = page === "home" ? "overlay" : "solid-forest";
  const crumbs = buildPageCrumbs({
    page,
    labels: crumbLabels,
    productName: activeProduct.name,
    onNavigate,
  });

  return (
    <div
      className={`relative bg-[#1B3022] text-[#F4F4F6] [--font-display:var(--font-cormorant)] ${
        page === "product" ? "h-svh overflow-hidden" : "min-h-dvh"
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
            src={heroImages.DAlt}
            alt="Silver Krishna jhoola in a mandir setting"
            position="center 42%"
            overlayClassName="bg-gradient-to-t from-[#1B3022] via-[#1B3022]/50 to-black/25"
          >
            <div className="flex flex-1 flex-col items-center justify-end px-6 pb-16 pt-28 text-center sm:pb-20 md:pb-24">
              <h1 className="max-w-2xl font-[family-name:var(--font-cormorant)] text-3xl leading-tight text-[#F8F4EC] animate-[fadeUp_900ms_ease_both] sm:text-4xl md:text-6xl">
                Silver for the home mandir
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#D5D8C8] md:text-base">
                Handcrafted silver jewellery by PMJ Jewels — rooted in ritual, finished for
                today.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("shop")}
                className="mt-8 bg-[#C9893A] px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#1B3022] transition hover:brightness-105"
              >
                Explore the collection
              </button>
            </div>
          </HeroBanner>

          {/* Storytelling: image left / copy right — not a product grid shell */}
          <section className="grid lg:grid-cols-2">
            <div className="relative min-h-[52svh] overflow-hidden lg:min-h-[80svh]">
              <Image
                src={heroImages.D}
                alt="Nithyam silver swans — sculptural detail"
                fill
                className="object-cover"
                style={{ objectPosition: "center 40%" }}
                sizes="50vw"
              />
            </div>
            <div className="flex flex-col justify-center bg-[#15261B] px-6 py-16 sm:px-10 lg:px-16">
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-[#F8F4EC] md:text-4xl">
                Sacred and sculptural
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#D5D8C8]/90">
                Forest studio light, oxidised silver, rose petals at the edge of the frame —
                the photography sets the colour story for this concept.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("shop")}
                className="mt-8 w-fit text-xs uppercase tracking-[0.18em] text-[#E8C17A] underline underline-offset-8"
              >
                Browse the pieces
              </button>
            </div>
          </section>

          <section className="px-5 py-16 md:px-10 md:py-20">
            <div className="mx-auto max-w-6xl">
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#E8C17A]">
                  From the workshop
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl text-[#F8F4EC]">
                  Featured pieces
                </h2>
              </div>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredProducts.slice(0, 6).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    tone="forest"
                    onOpen={onOpenProduct}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="border-y border-[#E8C17A]/20 bg-[#15261B] px-5 py-16 md:px-10">
            <figure className="mx-auto max-w-2xl text-center">
              <blockquote className="font-[family-name:var(--font-cormorant)] text-2xl italic text-[#F4F4F6]/90 md:text-3xl">
                “{sampleTestimonials[0].quote}”
              </blockquote>
              <figcaption className="mt-4 text-xs uppercase tracking-[0.16em] text-[#C0C0C8]/70">
                {sampleTestimonials[0].name} · <SampleBadge />
              </figcaption>
            </figure>
          </section>
        </>
      )}

      {page === "shop" && (
        <section className="px-5 pb-16 pt-8 md:px-10 md:pb-20 md:pt-10">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <Breadcrumbs
                items={crumbs}
                tone="forest"
                className="[&_ol]:justify-center"
              />
              <h1 className="font-[family-name:var(--font-cormorant)] text-3xl text-[#F8F4EC] md:text-5xl">
                Our collection
              </h1>
              <p className="mt-2 text-sm text-[#D5D8C8]/80">Sample pricing only</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-10 md:grid-cols-3 md:gap-x-6 md:gap-y-10">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  tone="forest"
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
            <Breadcrumbs items={crumbs} tone="forest" />
            <div className="mt-2 grid min-h-0 flex-1 gap-4 overflow-y-auto md:grid-cols-2 md:items-stretch md:gap-6 md:overflow-hidden">
              <div className="relative flex min-h-[42svh] items-center justify-center overflow-hidden border border-[#E8C17A]/25 bg-[#15261B] md:min-h-0">
                <Image
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  fill
                  className="object-contain p-3 sm:p-4"
                  sizes="(max-width:768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center md:overflow-y-auto">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#E8C17A]">
                  {activeProduct.sku}
                </p>
                <h1 className="mt-2 font-[family-name:var(--font-cormorant)] text-2xl text-[#F8F4EC] sm:text-3xl md:text-4xl">
                  {activeProduct.name}
                </h1>
                <p className="mt-3 text-sm leading-6 text-[#D5D8C8]/85">
                  {activeProduct.blurb}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <p className="text-xl text-[#F8F4EC]">
                    {formatSamplePrice(activeProduct.samplePriceInr)}
                  </p>
                  <SampleBadge />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <WhatsAppButton
                    sku={activeProduct.sku}
                    className="!bg-[#C9893A] !px-4 !py-2.5 !text-xs !text-[#1B3022]"
                  />
                  <button
                    type="button"
                    onClick={() => onBack("shop")}
                    className="border border-[#E8C17A]/40 px-4 py-2.5 text-xs text-[#F8F4EC]"
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
          <div className="mx-auto max-w-4xl text-center">
            <Breadcrumbs
              items={crumbs}
              tone="forest"
              className="[&_ol]:justify-center"
            />
            <LotusMark className="mx-auto h-12 w-12 text-[#E8C17A]" />
            <h1 className="mt-6 font-[family-name:var(--font-cormorant)] text-4xl text-[#F8F4EC] md:text-5xl">
              Our craft
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#D5D8C8]/90">
              Nithyam is handcrafted silver jewellery by PMJ Jewels. The lotus wordmark and
              ceremonial photography set the tone — we will share more of our craft story
              here soon.
            </p>
            <div className="relative mx-auto mt-12 aspect-[16/9] max-w-3xl overflow-hidden border border-[#E8C17A]/20">
              <Image
                src={heroImages.about}
                alt="Nithyam craft"
                fill
                className="object-cover"
                sizes="800px"
              />
            </div>
          </div>
        </section>
      )}

      {page === "contact" && (
        <section className="px-5 pb-20 pt-10 md:px-10 md:pb-24">
          <div className="mx-auto mb-6 max-w-xl">
            <Breadcrumbs
              items={crumbs}
              tone="forest"
              className="[&_ol]:justify-center"
            />
          </div>
          <div className="mx-auto max-w-xl border border-[#E8C17A]/25 bg-[#15261B] px-6 py-12 text-center md:px-10">
            <LotusMark className="mx-auto h-10 w-10 text-[#E8C17A]" />
            <h1 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-[#F8F4EC]">
              Visit and enquire
            </h1>
            <p className="mt-4 text-sm text-[#D5D8C8]/80">
              Sample contact details for layout review
            </p>
            <div className="mt-8 space-y-2 text-sm text-[#F4F4F6]/85">
              <p>{brand.placeholders.email}</p>
              <p>WhatsApp {brand.placeholders.whatsappDisplay} (sample number)</p>
              <p>{brand.placeholders.city}</p>
            </div>
            <WhatsAppButton className="mt-8 !bg-[#C9893A] !text-[#1B3022]" />
          </div>
        </section>
      )}

      {page === "silver" && (
        <SilverRatesView
          tone="forest"
          crumbs={crumbs}
          onBack={() => onBack("home")}
        />
      )}

      {page !== "product" ? (
        <footer className="border-t border-[#E8C17A]/15 px-5 py-10 text-center md:px-8">
          <p className="text-xs uppercase tracking-[0.16em] text-[#C0C0C8]/70">
            {brand.parentLine}
          </p>
        </footer>
      ) : null}
    </div>
  );
}
