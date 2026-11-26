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

function Nav({
  page,
  onNavigate,
}: Pick<ConceptProps, "page" | "onNavigate">) {
  const links = [
    ["home", "Home"],
    ["shop", "Collection"],
    ["about", "Our Craft"],
    ["contact", "Visit"],
  ] as const;

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <button type="button" onClick={() => onNavigate("home")} className="flex items-center gap-2">
          <Image
            src={brand.logos.light}
            alt="Nithyam by PMJ Jewels"
            width={200}
            height={60}
            className="h-10 w-auto"
            priority
          />
        </button>
        <nav className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-[#F4F4F6]/85 md:flex">
          {links.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={
                page === id
                  ? "text-[#E8C17A]"
                  : "hover:text-[#E8C17A]"
              }
            >
              {label}
            </button>
          ))}
        </nav>
        <BagSearchIcons tone="dark" />
      </div>
    </header>
  );
}

export function ConceptD({
  page,
  onNavigate,
  activeProduct,
  onSelectProduct,
}: ConceptProps) {
  return (
    <div className="concept-d min-h-full bg-[#1B3022] text-[#F4F4F6] [--font-display:var(--font-cormorant)]">
      <Nav page={page} onNavigate={onNavigate} />

      {page === "home" && (
        <>
          <section className="relative min-h-[100svh] overflow-hidden">
            <Image
              src={heroImages.D}
              alt="Nithyam contemporary Indian silver"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(27,48,34,0.25),rgba(27,48,34,0.82))]" />
            <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pb-20 pt-28 text-center">
              <LotusMark className="mb-4 h-12 w-12 text-[#E8C17A] animate-[fadeUp_700ms_ease_both]" />
              <Image
                src={brand.logos.light}
                alt="Nithyam"
                width={380}
                height={120}
                className="h-14 w-auto md:h-20"
                priority
              />
              <h1 className="mt-8 max-w-2xl font-[family-name:var(--font-cormorant)] text-4xl leading-tight text-[#F8F4EC] md:text-6xl">
                Silver for the home shrine
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#D5D8C8] md:text-base">
                Contemporary Indian devotion — handcrafted silver by PMJ Jewels, rooted in
                ritual, finished for today.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate("shop")}
                  className="bg-[#C9893A] px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-[#1B3022] transition hover:brightness-105"
                >
                  Discover the collection
                </button>
                <WhatsAppButton
                  variant="outline"
                  className="border-[#E8C17A]/50 text-[#F8F4EC]"
                />
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden px-5 py-20 md:px-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 8c1.5 4 3 7 3 10s-1 5-3 7c-2-2-3-4-3-7s1.5-6 3-10z' fill='%23E8C17A' fill-opacity='0.9'/%3E%3C/svg%3E\")",
              }}
            />
            <div className="relative mx-auto max-w-6xl">
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#E8C17A]">
                  Sacred & sculptural
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl text-[#F8F4EC]">
                  From the atelier
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

          <section className="border-y border-[#E8C17A]/20 bg-[#15261B] px-5 py-16 md:px-8">
            <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
              {sampleTestimonials.map((t) => (
                <figure key={t.name} className="text-center">
                  <LotusMark className="mx-auto mb-3 h-7 w-7 text-[#E8C17A]/70" />
                  <blockquote className="font-[family-name:var(--font-cormorant)] text-xl italic text-[#F4F4F6]/90">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-4 text-xs uppercase tracking-[0.16em] text-[#C0C0C8]/70">
                    {t.name} · <SampleBadge />
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </>
      )}

      {page === "shop" && (
        <section className="px-5 pb-20 pt-28 md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center text-center">
              <LotusMark className="h-10 w-10 text-[#E8C17A]" />
              <h1 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-[#F8F4EC] md:text-5xl">
                Collection
              </h1>
              <p className="mt-3 text-sm text-[#D5D8C8]/80">
                Sample prices for stakeholder preview
              </p>
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
        <section className="px-5 pb-20 pt-28 md:px-8">
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
                  Back to collection
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {page === "about" && (
        <section className="px-5 pb-20 pt-28 md:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <LotusMark className="mx-auto h-12 w-12 text-[#E8C17A]" />
            <h1 className="mt-6 font-[family-name:var(--font-cormorant)] text-4xl text-[#F8F4EC] md:text-5xl">
              Our craft
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#D5D8C8]/90">
              Nithyam is handcrafted silver by PMJ Jewels. The lotus in the wordmark and
              the ceremonial photography guide this concept’s palette — forest greens and
              marigold warmth drawn from the product imagery. Extended heritage narrative
              and any certifications will be added only when confirmed.
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
        <section className="px-5 pb-20 pt-28 md:px-8">
          <div className="mx-auto max-w-xl border border-[#E8C17A]/25 bg-[#15261B] px-6 py-12 text-center md:px-10">
            <LotusMark className="mx-auto h-10 w-10 text-[#E8C17A]" />
            <h1 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-[#F8F4EC]">
              Visit & enquire
            </h1>
            <p className="mt-4 text-sm text-[#D5D8C8]/80">
              Placeholder contact for layout review
            </p>
            <div className="mt-8 space-y-2 text-sm text-[#F4F4F6]/85">
              <p>{brand.placeholders.email}</p>
              <p>{brand.placeholders.phone}</p>
              <p>{brand.placeholders.city}</p>
            </div>
            <WhatsAppButton
              className="mt-8 !bg-[#C9893A] !text-[#1B3022]"
            />
          </div>
        </section>
      )}

      <footer className="border-t border-[#E8C17A]/15 px-5 py-10 text-center md:px-8">
        <Image
          src={brand.logos.light}
          alt=""
          width={160}
          height={50}
          className="mx-auto h-8 w-auto opacity-90"
        />
        <p className="mt-4 text-xs tracking-[0.16em] text-[#C0C0C8]/70 uppercase">
          {brand.parentLine}
        </p>
        <p className="mt-3 text-xs text-[#C0C0C8]/50">
          Phase 1 stakeholder preview
        </p>
      </footer>
    </div>
  );
}
