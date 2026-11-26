"use client";

import Image from "next/image";
import { brand } from "@/lib/brand";
import {
  featuredProducts,
  formatSamplePrice,
  heroImages,
  products,
} from "@/lib/products";
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

/** Persona B — Modern Minimal: sticky light nav, split 100svh hero, airy grids */
export function ConceptB({
  page,
  onNavigate,
  activeProduct,
  onSelectProduct,
}: ConceptProps) {
  const headerTone = page === "home" ? "overlay-light" : "solid-light";

  return (
    <div className="relative min-h-full bg-[#FAF8F7] text-[#161616] [--font-display:var(--font-outfit)]">
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
            <div className="relative flex min-h-0 flex-col justify-center bg-[#FAF8F7] px-6 pb-10 pt-20 sm:px-10 lg:px-16 xl:px-20">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#D4A5A5]">
                Handcrafted silver
              </p>
              <h1 className="mt-6 max-w-md font-[family-name:var(--font-outfit)] text-4xl font-light leading-[1.08] tracking-tight text-[#0A0A0A] md:text-5xl xl:text-6xl">
                Silver,
                <br />
                simply shown.
              </h1>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#5A5A63]">
                A calm, modern storefront for Nithyam — oxidised finishes, soft rose light,
                nothing in the way.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate("shop")}
                  className="bg-[#302850] px-7 py-3.5 text-xs uppercase tracking-[0.16em] text-white transition hover:bg-[#241E3D]"
                >
                  Shop now
                </button>
                <WhatsAppButton
                  variant="outline"
                  className="border-[#302850]/25 text-[#302850]"
                />
              </div>
            </div>
            <div className="relative min-h-[40%] lg:min-h-0">
              <Image
                src={heroImages.B}
                alt="Silver jewellery on black — lifestyle"
                fill
                priority
                className="object-cover"
                style={{ objectPosition: "center 45%" }}
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4A5A5]">
                  Edit
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-light">
                  Four essentials
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("shop")}
                className="shrink-0 text-xs uppercase tracking-[0.14em] text-[#302850]"
              >
                All →
              </button>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-14 md:grid-cols-4 md:gap-x-8">
              {featuredProducts.slice(0, 4).map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  layout="minimal"
                  onOpen={(item) => {
                    onSelectProduct(item);
                    onNavigate("product");
                  }}
                />
              ))}
            </div>
          </section>

          <section className="grid min-h-[60svh] lg:min-h-[70svh] lg:grid-cols-2">
            <div className="relative min-h-[40svh] lg:min-h-full">
              <Image
                src={heroImages.BProduct}
                alt="Nithyam silver idol"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div className="flex flex-col justify-center bg-white px-6 py-14 sm:px-10 lg:px-16">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4A5A5]">
                Craft note
              </p>
              <h2 className="mt-4 max-w-sm font-[family-name:var(--font-outfit)] text-3xl font-light leading-snug">
                Space for the piece to speak.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-[#5A5A63]">
                Minimal layout, maximal metal. Sample pricing supports stakeholder review —
                live catalogue later.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("about")}
                className="mt-8 w-fit text-xs uppercase tracking-[0.16em] text-[#302850] underline underline-offset-8"
              >
                About Nithyam
              </button>
            </div>
          </section>
        </>
      )}

      {page === "shop" && (
        <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-light">
            Shop
          </h1>
          <p className="mt-2 text-sm text-[#6B6B73]">Sample prices</p>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-12 md:grid-cols-4">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                layout="minimal"
                onOpen={(item) => {
                  onSelectProduct(item);
                  onNavigate("product");
                }}
              />
            ))}
          </div>
        </section>
      )}

      {page === "product" && (
        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-12 md:gap-10 md:px-8 md:py-14">
          <div className="relative aspect-square bg-[#ECECEF] md:col-span-7">
            <Image
              src={activeProduct.image}
              alt={activeProduct.name}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 60vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#9A9AA3]">
              {activeProduct.sku}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-outfit)] text-3xl font-light">
              {activeProduct.name}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[#5A5A63]">
              {activeProduct.blurb}
            </p>
            <div className="mt-6 flex items-center gap-2">
              <p className="text-xl">
                {formatSamplePrice(activeProduct.samplePriceInr)}
              </p>
              <SampleBadge />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton sku={activeProduct.sku} />
              <button
                type="button"
                onClick={() => onNavigate("shop")}
                className="border border-[#D0D0D6] px-5 py-3 text-sm"
              >
                All pieces
              </button>
            </div>
          </div>
        </section>
      )}

      {page === "about" && (
        <section className="mx-auto max-w-2xl px-5 py-20 md:px-8 md:py-24">
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-light">
            About
          </h1>
          <p className="mt-8 text-base leading-8 text-[#4A4A52]">
            Nithyam is handcrafted silver by PMJ Jewels. This About page is layout only —
            no invented certifications or founding claims.
          </p>
        </section>
      )}

      {page === "contact" && (
        <section className="mx-auto max-w-md px-5 py-20 md:px-8 md:py-24">
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-light">
            Contact
          </h1>
          <form className="mt-10 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              className="w-full border border-[#E0DCD9] bg-white px-4 py-3 text-sm outline-none focus:border-[#302850]"
              placeholder="Name"
              aria-label="Name"
            />
            <input
              className="w-full border border-[#E0DCD9] bg-white px-4 py-3 text-sm outline-none focus:border-[#302850]"
              placeholder="Email"
              aria-label="Email"
            />
            <textarea
              className="min-h-28 w-full border border-[#E0DCD9] bg-white px-4 py-3 text-sm outline-none focus:border-[#302850]"
              placeholder="Message"
              aria-label="Message"
            />
            <button
              type="submit"
              className="w-full bg-[#302850] py-3 text-xs uppercase tracking-[0.16em] text-white"
            >
              Send (preview)
            </button>
          </form>
          <WhatsAppButton className="mt-6 w-full" />
          <p className="mt-6 text-xs text-[#9A9AA3]">
            WhatsApp {brand.placeholders.whatsappDisplay} (dummy)
          </p>
        </section>
      )}

      <footer className="border-t border-[#E8E4E2] px-5 py-10 text-center text-xs text-[#9A9AA3]">
        {brand.parentLine} · Phase 1 preview
      </footer>
    </div>
  );
}
