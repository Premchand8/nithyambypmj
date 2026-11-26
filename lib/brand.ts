/**
 * Brand tokens derived from provided Nithyam logos and product photography.
 * Logo-2 indigo #302850 · logo white/black · silver metallics · forest green & marigold from lifestyle shots.
 * Tagline text taken from the logo lockup: "Handcrafted Silver by PMJ JEWELS".
 */

export const brand = {
  name: "Nithyam",
  parentLine: "Handcrafted Silver by PMJ Jewels",
  shortParent: "by PMJ Jewels",
  logos: {
    /** Original lockups (black canvas) */
    lightOnBlack: "/references/nithyam_logo_final_9jul-1.png",
    indigoOnBlack: "/references/nithyam_logo_final_9jul-2.png",
    /** Knocked-out backgrounds for UI use */
    light: "/references/nithyam_logo_white.png",
    indigo: "/references/nithyam_logo_indigo.png",
  },
  colours: {
    black: "#0A0A0A",
    charcoal: "#161616",
    indigo: "#302850",
    indigoSoft: "#4A3F6B",
    silver: "#C0C0C8",
    silverMuted: "#9A9AA3",
    mist: "#F4F4F6",
    paper: "#FAFAFB",
    forest: "#1B3022",
    moss: "#285850",
    marigold: "#C9893A",
    blush: "#D4A5A5",
  },
  /** Placeholder contact — not a live business detail */
  placeholders: {
    whatsapp: "919999999999",
    email: "hello@nithyam.example",
    phone: "+91 00000 00000",
    city: "Hyderabad, India",
  },
} as const;

export const designs = [
  {
    id: "A" as const,
    label: "Classic Luxury",
    subtitle: "Formal, centred, high-contrast serif",
  },
  {
    id: "B" as const,
    label: "Modern Minimal",
    subtitle: "Airy space, asymmetric silver grid",
  },
  {
    id: "C" as const,
    label: "Premium Editorial",
    subtitle: "Magazine scale type & photography",
  },
  {
    id: "D" as const,
    label: "Contemporary Indian",
    subtitle: "Forest green, lotus, cultural warmth",
  },
];

export const previewPages = [
  { id: "home" as const, label: "Home" },
  { id: "shop" as const, label: "Shop" },
  { id: "product" as const, label: "Product" },
  { id: "about" as const, label: "About" },
  { id: "contact" as const, label: "Contact" },
];

export const STORAGE_KEY = "nithyam-selected-design";
