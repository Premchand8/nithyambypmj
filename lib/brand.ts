/**
 * Brand tokens derived from Nithyam logos + product photography
 * (ToWebP pack and chat attachments — same imagery).
 *
 * Photo direction confirmed: forest/emerald studio backdrops, oxidised silver,
 * soft rose/pink florals, warm gold bokeh, occasional ruby/emerald gem accents.
 * Logo indigo #302850 kept as a secondary brand cue from logo lockup.
 * Tagline from logo: "Handcrafted Silver by PMJ JEWELS".
 */

export const brand = {
  name: "Nithyam",
  parentLine: "Handcrafted Silver by PMJ Jewels",
  shortParent: "by PMJ Jewels",
  logos: {
    lightOnBlack: "/references/nithyam_logo_final_9jul-1.png",
    indigoOnBlack: "/references/nithyam_logo_final_9jul-2.png",
    light: "/references/nithyam_logo_white.png",
    indigo: "/references/nithyam_logo_indigo.png",
  },
  /** Shared photography-derived tokens */
  colours: {
    black: "#0A0A0A",
    charcoal: "#161616",
    indigo: "#302850",
    silver: "#C0C0C8",
    silverMuted: "#8A8A92",
    oxidized: "#6E6E74",
    mist: "#F3F1F2",
    paper: "#FAF8F7",
    forest: "#1B3022",
    emerald: "#245448",
    moss: "#183C24",
    gold: "#B8883A",
    goldSoft: "#E8C17A",
    rose: "#D4A5A5",
    roseDeep: "#C4898E",
    ruby: "#7A1F2B",
    gemEmerald: "#1F6B4F",
  },
  /**
   * Per-concept palettes (A–D) — distinct emphases from the same photo set.
   * Not just hue swaps: each concept leans on different layout + accent pairing.
   */
  conceptPalettes: {
    A: {
      label: "Classic Luxury",
      bg: "#0A0A0A",
      surface: "#121212",
      fg: "#F4F4F6",
      muted: "rgba(244,244,246,0.6)",
      accent: "#B8883A",
      accentSoft: "#E8C17A",
      metal: "#C0C0C8",
    },
    B: {
      label: "Modern Minimal",
      bg: "#FAF8F7",
      surface: "#FFFFFF",
      fg: "#161616",
      muted: "#6B6B73",
      accent: "#302850",
      accentSoft: "#D4A5A5",
      metal: "#8A8A92",
    },
    C: {
      label: "Premium Editorial",
      bg: "#111111",
      surface: "#1A1A1A",
      fg: "#EDEDED",
      muted: "rgba(237,237,237,0.55)",
      accent: "#1F6B4F",
      accentSoft: "#C4898E",
      metal: "#C0C0C8",
    },
    D: {
      label: "Contemporary Indian",
      bg: "#1B3022",
      surface: "#15261B",
      fg: "#F8F4EC",
      muted: "#D5D8C8",
      accent: "#C9893A",
      accentSoft: "#E8C17A",
      floral: "#D4A5A5",
      metal: "#C0C0C8",
    },
  },
  /** Dummy contact for preview UI only */
  placeholders: {
    whatsapp: "919876543210",
    whatsappDisplay: "+91 98765 43210",
    email: "hello@nithyam.example",
    phone: "+91 98765 43210",
    city: "Hyderabad, India",
  },
} as const;

export const designs = [
  {
    id: "A" as const,
    label: "Classic Luxury",
    subtitle: "Centred classic look · gold on black · ceremonial",
  },
  {
    id: "B" as const,
    label: "Modern Minimal",
    subtitle: "Split hero · light navigation · airy shop",
  },
  {
    id: "C" as const,
    label: "Premium Editorial",
    subtitle: "Magazine masthead · bold type · lookbook",
  },
  {
    id: "D" as const,
    label: "Contemporary Indian",
    subtitle: "Forest immersion · lotus · storytelling",
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
