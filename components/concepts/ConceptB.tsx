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
    <header className="sticky top-0 z-20 border-b border-[#E6E6EA] bg-[#FAF8F7]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <button type="button" onClick={() => onNavigate("home")}>
          <Image
            src={brand.logos.indigo}
            alt="Nithyam by PMJ Jewels"
            width={200}
            height={60}
            className="h-9 w-auto"
            priority
          />
        </button>
        <nav className="hidden items-center gap-7 text-xs tracking-[0.08em] text-[#3A3A42] md:flex">
          {links.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={
                page === id
                  ? "text-[#0A0A0A] underline decoration-[#302850] underline-offset-8"
                  : "hover:text-[#0A0A0A]"
              }
            >
              {label}
            </button>
          ))}
        </nav>
        <BagSearchIcons tone="light" className="text-[#161616]" />
      </div>
    </header>
  );
}

export function ConceptB({
  page,
  onNavigate,
  activeProduct,
  onSelectProduct,
}: ConceptProps) {
  return (
    <div className="concept-b min-h-full bg-[#FAF8F7] text-[#161616] [--font-display:var(--font-outfit)]">
      <Nav page={page} onNavigate={onNavigate} />

      {page === "home" && (
        <>
          <section className="relative min-h-[88svh] overflow-hidden bg-[#ECECEF]">
            <Image
              src={heroImages.B}
              alt="Nithyam silver"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F7] via-[#FAF8F7]/88 to-transparent md:via-[#FAF8F7]/55" />
            <div className="relative z-10 flex min-h-[88svh] max-w-xl flex-col justify-center px-6 py-20 md:px-14">
              <Image
                src={brand.logos.indigo}
                alt="Nithyam"
                width={280}
                height={90}
                className="h-12 w-auto animate-[fadeUp_800ms_ease_both]"
                priority
              />
              <h1 className="mt-8 font-[family-name:var(--font-outfit)] text-4xl font-light leading-[1.1] tracking-tight text-[#0A0A0A] md:text-6xl">
                Less noise.
                <br />
                More silver.
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#5A5A63]">
                A modern reading of Nithyam — handcrafted silver by PMJ Jewels, presented
                with calm space and precise detail.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate("shop")}
                  className="bg-[#302850] px-6 py-3 text-xs tracking-[0.16em] text-white uppercase transition hover:bg-[#241E3D]"
                >
                  Shop pieces
                </button>
                <WhatsAppButton variant="outline" className="border-[#302850]/30 text-[#302850]" />
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4A5A5]">
                  New
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-light">
                  Quiet favourites
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("shop")}
                className="text-xs tracking-[0.14em] uppercase text-[#302850]"
              >
                View all →
              </button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
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

          <section className="border-y border-[#E6E6EA] bg-white px-5 py-16 md:px-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-8 md:flex-row md:items-stretch">
              {sampleTestimonials.slice(0, 2).map((t) => (
                <figure
                  key={t.name}
                  className="flex-1 border-l border-[#D4A5A5] pl-5"
                >
                  <blockquote className="text-base leading-relaxed text-[#3A3A42]">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-4 text-xs tracking-wide text-[#9A9AA3]">
                    {t.name} · <SampleBadge />
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </>
      )}

      {page === "shop" && (
        <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <h1 className="font-[family-name:var(--font-outfit)] text-3xl font-light md:text-4xl">
            Shop
          </h1>
          <p className="mt-2 text-sm text-[#6B6B73]">
            Sample pricing for preview only
          </p>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
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
        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-12 md:px-8">
          <div className="relative aspect-square overflow-hidden bg-[#ECECEF] md:col-span-7">
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
        <section className="mx-auto max-w-3xl px-5 py-20 md:px-8">
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-light">
            About Nithyam
          </h1>
          <p className="mt-6 text-base leading-8 text-[#4A4A52]">
            Nithyam presents handcrafted silver by PMJ Jewels. This About page is layout
            scaffolding only — brand story and credentials will be confirmed with
            stakeholders before launch. No certifications or business claims are asserted
            here.
          </p>
          <div className="relative mt-10 aspect-[16/10] overflow-hidden">
            <Image
              src={heroImages.about}
              alt="Nithyam"
              fill
              className="object-cover"
              sizes="800px"
            />
          </div>
        </section>
      )}

      {page === "contact" && (
        <section className="mx-auto max-w-lg px-5 py-20 md:px-8">
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-light">
            Contact
          </h1>
          <p className="mt-3 text-sm text-[#6B6B73]">
            Placeholder fields for UI review
          </p>
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="w-full border border-[#D0D0D6] bg-white px-4 py-3 text-sm outline-none focus:border-[#302850]"
              placeholder="Name"
              aria-label="Name"
            />
            <input
              className="w-full border border-[#D0D0D6] bg-white px-4 py-3 text-sm outline-none focus:border-[#302850]"
              placeholder="Email"
              aria-label="Email"
            />
            <textarea
              className="min-h-28 w-full border border-[#D0D0D6] bg-white px-4 py-3 text-sm outline-none focus:border-[#302850]"
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
          <div className="mt-8">
            <WhatsAppButton className="w-full" />
          </div>
          <p className="mt-6 text-xs text-[#9A9AA3]">
            {brand.placeholders.email} · WhatsApp {brand.placeholders.whatsappDisplay}{" "}
            (dummy) · {brand.placeholders.city}
          </p>
        </section>
      )}

      <footer className="border-t border-[#E6E6EA] px-5 py-10 text-center text-xs text-[#9A9AA3] md:px-8">
        <p>{brand.parentLine}</p>
        <p className="mt-2">Phase 1 stakeholder preview</p>
      </footer>
    </div>
  );
}
