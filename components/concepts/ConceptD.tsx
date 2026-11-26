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
  { id: "shop" as const, label: "Collection" },
  { id: "about" as const, label: "Our Craft" },
  { id: "contact" as const, label: "Visit" },
];

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
  activeProduct,
  onSelectProduct,
}: ConceptProps) {
  const headerTone = page === "home" ? "overlay" : "solid-forest";

  return (
    <div className="relative min-h-full bg-[#1B3022] text-[#F4F4F6] [--font-display:var(--font-cormorant)]">
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
            alt="Nithyam silver idols on forest green"
            position="center 35%"
            overlayClassName="bg-gradient-to-t from-[#1B3022] via-[#1B3022]/55 to-black/35"
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
            <div className="relative min-h-[50svh] lg:min-h-[80svh]">
              <Image
                src={heroImages.D}
                alt="Nithyam gift silver on green"
                fill
                className="object-cover"
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
                    onOpen={(item) => {
                      onSelectProduct(item);
                      onNavigate("product");
                    }}
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
        <section className="px-5 pb-20 pt-10 md:px-10 md:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="font-[family-name:var(--font-cormorant)] text-4xl text-[#F8F4EC] md:text-5xl">
                Our collection
              </h1>
              <p className="mt-3 text-sm text-[#D5D8C8]/80">Sample pricing only</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  tone="forest"
                  onOpen={(item) => {
                    onSelectProduct(item);
                    onNavigate("product");
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {page === "product" && (
        <section className="px-5 pb-20 pt-10 md:px-10 md:pb-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden border border-[#E8C17A]/25">
              <Image
                src={activeProduct.image}
                alt={activeProduct.name}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#E8C17A]">
                {activeProduct.sku}
              </p>
              <h1 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl text-[#F8F4EC] md:text-5xl">
                {activeProduct.name}
              </h1>
              <p className="mt-5 text-sm leading-7 text-[#D5D8C8]/85">
                {activeProduct.blurb}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <p className="text-2xl text-[#F8F4EC]">
                  {formatSamplePrice(activeProduct.samplePriceInr)}
                </p>
                <SampleBadge />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <WhatsAppButton
                  sku={activeProduct.sku}
                  className="!bg-[#C9893A] !text-[#1B3022]"
                />
                <button
                  type="button"
                  onClick={() => onNavigate("shop")}
                  className="border border-[#E8C17A]/40 px-5 py-3 text-sm text-[#F8F4EC]"
                >
                  Return to collection
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {page === "about" && (
        <section className="px-5 pb-20 pt-10 md:px-10 md:pb-24">
          <div className="mx-auto max-w-4xl text-center">
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

      <footer className="border-t border-[#E8C17A]/15 px-5 py-10 text-center md:px-8">
        <p className="text-xs uppercase tracking-[0.16em] text-[#C0C0C8]/70">
          {brand.parentLine}
        </p>
      </footer>
    </div>
  );
}
