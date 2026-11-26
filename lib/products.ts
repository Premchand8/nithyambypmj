import type { Product } from "./types";

/** Catalogue uses real asset files; names/prices are sample preview copy only. */
export const products: Product[] = [
  {
    id: "p1",
    sku: "01",
    name: "Divine Trinity Idols",
    image: "/references/01.webp",
    samplePriceInr: 18999,
    blurb: "Lakshmi, Ganesha & Saraswati in antique silver finish.",
  },
  {
    id: "p2",
    sku: "04",
    name: "Krishna Jhoola",
    image: "/references/04.webp",
    samplePriceInr: 24999,
    blurb: "Ornate peacock-arch swing with fine oxidised detailing.",
  },
  {
    id: "p3",
    sku: "SIDL909767",
    name: "Silver Idol SIDL909767",
    image: "/references/SIDL909767.webp",
    samplePriceInr: 12999,
    blurb: "Hand-finished silver idol from the Nithyam collection.",
  },
  {
    id: "p4",
    sku: "SGFT920794",
    name: "Gift Set SGFT920794",
    image: "/references/SGFT920794.webp",
    samplePriceInr: 9999,
    blurb: "Gift-ready silver set for festive occasions.",
  },
  {
    id: "p5",
    sku: "SIDL923050",
    name: "Silver Idol SIDL923050",
    image: "/references/SIDL923050.webp",
    samplePriceInr: 15999,
    blurb: "Intricate craftsmanship in sterling silver.",
  },
  {
    id: "p6",
    sku: "07",
    name: "Featured Piece 07",
    image: "/references/07.webp",
    samplePriceInr: 14999,
    blurb: "Signature silver piece for the home shrine.",
  },
  {
    id: "p7",
    sku: "SACS913290",
    name: "Accent Piece SACS913290",
    image: "/references/SACS913290.webp",
    samplePriceInr: 8799,
    blurb: "Sculptural silver accent with refined finish.",
  },
  {
    id: "p8",
    sku: "SIDE800414",
    name: "Silver Piece SIDE800414",
    image: "/references/SIDE800414.webp",
    samplePriceInr: 11299,
    blurb: "Detailed silver work for everyday reverence.",
  },
  {
    id: "p9",
    sku: "SGFT1101523",
    name: "Gift Set SGFT1101523",
    image: "/references/SGFT1101523.webp",
    samplePriceInr: 11999,
    blurb: "Curated silver gift ensemble.",
  },
  {
    id: "p10",
    sku: "SPJS1039500",
    name: "Silver Piece SPJS1039500",
    image: "/references/SPJS1039500.webp",
    samplePriceInr: 13999,
    blurb: "Polished silver with traditional motifs.",
  },
  {
    id: "p11",
    sku: "02",
    name: "Lifestyle Feature 02",
    image: "/references/02.webp",
    samplePriceInr: 16999,
    blurb: "Photographed in a quiet, ceremonial setting.",
  },
  {
    id: "p12",
    sku: "03",
    name: "Lifestyle Feature 03",
    image: "/references/03.webp",
    samplePriceInr: 17999,
    blurb: "Silver craftsmanship for sacred spaces.",
  },
];

export const featuredProducts = products.slice(0, 6);
export const heroImages = {
  A: "/references/04.webp",
  B: "/references/SIDL909767.webp",
  C: "/references/01.webp",
  D: "/references/07.webp",
  shopBanner: "/references/SGFT920794.webp",
  about: "/references/02.webp",
};

export const sampleTestimonials = [
  {
    quote: "The oxidised finish feels heirloom — quiet luxury for our pooja room.",
    name: "Ananya R.",
    note: "Sample testimonial",
  },
  {
    quote: "Packaging and detail exceeded what I expected for silver idols.",
    name: "Karthik M.",
    note: "Sample testimonial",
  },
  {
    quote: "A thoughtful gift — craftsmanship shows in every petal and chain.",
    name: "Meera S.",
    note: "Sample testimonial",
  },
];

export function formatSamplePrice(inr: number) {
  return `₹${inr.toLocaleString("en-IN")}`;
}

export function whatsappEnquiryUrl(sku?: string) {
  const text = sku
    ? `Hello Nithyam, I would like to enquire about ${sku}.`
    : "Hello Nithyam, I would like to enquire about your silver collection.";
  return `https://wa.me/919999999999?text=${encodeURIComponent(text)}`;
}
