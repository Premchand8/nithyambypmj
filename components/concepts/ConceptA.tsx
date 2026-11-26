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
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <nav className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.22em] text-white/85 md:flex">
          {links.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={page === id ? "text-white" : "hover:text-white"}
            >
              {label}
            </button>
          ))}
        </nav>
        <button type="button" onClick={() => onNavigate("home")} className="mx-auto md:mx-0">
          <Image
            src={brand.logos.light}
            alt="Nithyam by PMJ Jewels"
            width={220}
            height={70}
            className="h-10 w-auto md:h-12"
            priority
          />
        </button>
        <div className="flex items-center gap-4">
          <BagSearchIcons tone="dark" />
          <button
            type="button"
            className="hidden text-[11px] uppercase tracking-[0.22em] text-white/85 md:inline"
            onClick={() => onNavigate("shop")}
          >
            Collection
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ onNavigate }: Pick<ConceptProps, "onNavigate">) {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0A] px-5 py-12 text-center text-white/60 md:px-8">
      <Image
        src={brand.logos.light}
        alt=""
        width={180}
        height={56}
        className="mx-auto h-8 w-auto opacity-90"
      />
      <p className="mt-4 font-[family-name:var(--font-display)] text-sm italic text-white/70">
        {brand.parentLine}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-5 text-[11px] uppercase tracking-[0.18em]">
        <button type="button" onClick={() => onNavigate("shop")}>
          Shop
        </button>
        <button type="button" onClick={() => onNavigate("about")}>
          About
        </button>
        <button type="button" onClick={() => onNavigate("contact")}>
          Contact
        </button>
      </div>
      <p className="mt-8 text-xs">Phase 1 stakeholder preview · not a live storefront</p>
    </footer>
  );
}

export function ConceptA({
  page,
  onNavigate,
  activeProduct,
  onSelectProduct,
}: ConceptProps) {
  return (
    <div className="concept-a min-h-full bg-[#0A0A0A] text-[#F4F4F6] [--font-display:var(--font-cormorant)]">
      <Nav page={page} onNavigate={onNavigate} />

      {page === "home" && (
        <>
          <section className="relative min-h-[100svh] overflow-hidden">
            <Image
              src={heroImages.A}
              alt="Nithyam handcrafted silver"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/80" />
            <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pb-16 pt-28 text-center">
              <Image
                src={brand.logos.light}
                alt="Nithyam"
                width={420}
                height={130}
                className="h-16 w-auto animate-[fadeUp_900ms_ease_both] md:h-24"
                priority
              />
              <h1 className="mt-8 max-w-xl font-[family-name:var(--font-cormorant)] text-3xl font-light tracking-[0.08em] text-white md:text-5xl">
                Silver, shaped for the sacred
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
                Handcrafted silver by PMJ Jewels — quiet reverence, lasting craft.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate("shop")}
                  className="border border-white/50 bg-white/5 px-7 py-3 text-[11px] uppercase tracking-[0.24em] text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
                >
                  Explore Collection
                </button>
                <WhatsAppButton variant="outline" className="border-white/40 text-white" />
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#B8883A]">
                Featured
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl text-white">
                Selected pieces
              </h2>
              <p className="mt-3 text-sm text-white/60">
                A curated look at Nithyam silver — prices shown are samples for preview.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.slice(0, 6).map((p) => (
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

          <section className="border-y border-white/10 bg-[#121212] px-5 py-16 md:px-8">
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              {sampleTestimonials.map((t) => (
                <figure key={t.name} className="text-center">
                  <blockquote className="font-[family-name:var(--font-cormorant)] text-xl italic text-white/85">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-4 text-xs uppercase tracking-[0.16em] text-white/50">
                    {t.name} · <SampleBadge className="align-middle" />
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
            <div className="border-b border-white/15 pb-8 text-center">
              <h1 className="font-[family-name:var(--font-cormorant)] text-4xl text-white md:text-5xl">
                The Collection
              </h1>
              <p className="mt-3 text-sm text-white/60">
                Sample catalogue for stakeholder review
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
        <section className="px-5 pb-20 pt-28 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={activeProduct.image}
                alt={activeProduct.name}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
                priority
              />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#B8883A]">
                {activeProduct.sku}
              </p>
              <h1 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl text-white md:text-5xl">
                {activeProduct.name}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/65">
                {activeProduct.blurb}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <p className="text-2xl text-white">
                  {formatSamplePrice(activeProduct.samplePriceInr)}
                </p>
                <SampleBadge />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <WhatsAppButton sku={activeProduct.sku} />
                <button
                  type="button"
                  onClick={() => onNavigate("shop")}
                  className="border border-white/30 px-5 py-3 text-sm text-white/80"
                >
                  Back to shop
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {page === "about" && (
        <section className="px-5 pb-20 pt-28 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
            <div className="relative min-h-[420px] overflow-hidden">
              <Image
                src={heroImages.about}
                alt="Nithyam craft"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#B8883A]">
                Our story
              </p>
              <h1 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl text-white">
                Nithyam
              </h1>
              <p className="mt-5 text-sm leading-7 text-white/70">
                Nithyam is handcrafted silver by PMJ Jewels. This preview page uses only
                brand language from the logo lockup — no invented certifications or
                founding claims. Full brand narrative can be added once stakeholders
                confirm copy.
              </p>
              <WhatsAppButton className="mt-8" variant="outline" />
            </div>
          </div>
        </section>
      )}

      {page === "contact" && (
        <section className="px-5 pb-20 pt-28 md:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl text-white">
              Contact
            </h1>
            <p className="mt-4 text-sm text-white/65">
              Placeholder details for layout review — replace with live contact when ready.
            </p>
            <div className="mt-10 space-y-3 border border-white/15 px-6 py-8 text-sm text-white/80">
              <p>{brand.placeholders.email}</p>
              <p>WhatsApp {brand.placeholders.whatsappDisplay} (dummy)</p>
              <p>{brand.placeholders.city}</p>
            </div>
            <WhatsAppButton className="mt-8" />
          </div>
        </section>
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
