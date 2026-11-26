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
  { id: "about" as const, label: "Maison" },
  { id: "contact" as const, label: "Contact" },
];

/** Persona A — Classic Luxury: centred maison, gold on black, full-viewport hero */
export function ConceptA({
  page,
  onNavigate,
  activeProduct,
  onSelectProduct,
}: ConceptProps) {
  const headerTone = page === "home" ? "overlay" : "solid-dark";

  return (
    <div className="relative min-h-full bg-[#0A0A0A] text-[#F4F4F6] [--font-display:var(--font-cormorant)]">
      <SiteHeader
        page={page}
        onNavigate={onNavigate}
        links={links}
        logoSrc={brand.logos.light}
        tone={headerTone}
        logoCentered
      />

      {page === "home" && (
        <>
          <HeroBanner
            src={heroImages.A}
            alt="Nithyam silver craft — Krishna jhoola detail"
            position="center 40%"
            overlayClassName="bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.2)_0%,rgba(10,10,10,0.75)_75%)]"
          >
            <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-20 text-center md:pb-20 md:pt-24">
              <div className="mb-5 h-px w-14 bg-[#B8883A]/80" />
              <Image
                src={brand.logos.light}
                alt="Nithyam"
                width={440}
                height={140}
                className="h-16 w-auto max-w-[85vw] object-contain animate-[fadeUp_900ms_ease_both] md:h-24"
                priority
              />
              <p className="mt-5 text-[10px] uppercase tracking-[0.32em] text-[#E8C17A] sm:text-[11px]">
                {brand.parentLine}
              </p>
              <h1 className="mt-7 max-w-2xl font-[family-name:var(--font-cormorant)] text-3xl font-light leading-snug tracking-[0.04em] text-white sm:text-4xl md:text-5xl">
                Heirloom silver, quietly radiant
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                A classic maison presentation of handcrafted silver for the sacred home.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate("shop")}
                  className="border border-[#B8883A] bg-[#B8883A]/10 px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] text-[#E8C17A] transition hover:bg-[#B8883A] hover:text-[#0A0A0A]"
                >
                  View the collection
                </button>
                <WhatsAppButton variant="outline" className="border-white/30 text-white" />
              </div>
              <div className="mt-9 h-px w-14 bg-[#B8883A]/80" />
            </div>
          </HeroBanner>

          <section className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-24">
            <div className="mx-auto max-w-xl text-center">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#B8883A]">
                Signature pieces
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-white md:text-5xl">
                The cabinet
              </h2>
            </div>
            <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {featuredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  tone="dark"
                  onOpen={(item) => {
                    onSelectProduct(item);
                    onNavigate("product");
                  }}
                />
              ))}
            </div>
          </section>

          <section className="border-y border-[#B8883A]/20 bg-[#0F0F0F] px-5 py-16 md:px-10 md:py-20">
            <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3 md:gap-12">
              {sampleTestimonials.map((t) => (
                <figure key={t.name} className="text-center">
                  <div className="mx-auto mb-5 h-px w-10 bg-[#B8883A]/60" />
                  <blockquote className="font-[family-name:var(--font-cormorant)] text-xl italic leading-relaxed text-white/85">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-5 text-[10px] uppercase tracking-[0.2em] text-white/45">
                    {t.name} · <SampleBadge />
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </>
      )}

      {page === "shop" && (
        <section className="px-5 pb-20 pt-10 md:px-10 md:pb-24">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#B8883A]">
              Catalogue
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl text-white md:text-6xl">
              Collection
            </h1>
            <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  tone="dark"
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
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="relative aspect-[4/5] overflow-hidden border border-[#B8883A]/25">
              <Image
                src={activeProduct.image}
                alt={activeProduct.name}
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#B8883A]">
                {activeProduct.sku}
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-white md:text-5xl">
                {activeProduct.name}
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/65">
                {activeProduct.blurb}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <p className="text-2xl text-[#E8C17A]">
                  {formatSamplePrice(activeProduct.samplePriceInr)}
                </p>
                <SampleBadge />
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <WhatsAppButton sku={activeProduct.sku} />
                <button
                  type="button"
                  onClick={() => onNavigate("shop")}
                  className="border border-white/25 px-5 py-3 text-sm text-white/80"
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
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
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
                The maison
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-white md:text-5xl">
                Nithyam
              </h1>
              <p className="mt-6 text-sm leading-8 text-white/70">
                Handcrafted silver by PMJ Jewels. This preview uses only confirmed brand
                language from the logo lockup — full maison narrative arrives after
                stakeholder copy approval.
              </p>
            </div>
          </div>
        </section>
      )}

      {page === "contact" && (
        <section className="flex min-h-[70svh] flex-col items-center justify-center px-5 py-20 text-center md:px-10">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#B8883A]">
            Enquire
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-white md:text-5xl">
            Contact
          </h1>
          <div className="mt-10 space-y-2 text-sm text-white/75">
            <p>{brand.placeholders.email}</p>
            <p>WhatsApp {brand.placeholders.whatsappDisplay} (dummy)</p>
            <p>{brand.placeholders.city}</p>
          </div>
          <WhatsAppButton className="mt-10" />
        </section>
      )}

      <footer className="border-t border-[#B8883A]/15 px-5 py-12 text-center md:px-10">
        <Image
          src={brand.logos.light}
          alt=""
          width={160}
          height={48}
          className="mx-auto h-8 w-auto object-contain opacity-90"
        />
        <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-white/40">
          {brand.parentLine} · Phase 1 preview
        </p>
      </footer>
    </div>
  );
}
