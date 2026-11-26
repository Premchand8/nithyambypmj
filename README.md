# Nithyam by PMJ Jewels - Phase 1 Design Preview

Internal stakeholder app to compare **four distinct homepage concepts** for Nithyam (handcrafted silver by PMJ Jewels).

| ID | Concept |
|----|---------|
| A | Classic Luxury |
| B | Modern Minimal |
| C | Premium Editorial |
| D | Contemporary Indian |

Phase 1 is **frontend only** - no payments, auth, inventory, or checkout. WhatsApp enquiry, bag, and search are visual/UI wiring. Sample prices and testimonials are labelled as sample.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Brand references

Assets live in `public/references/` (logos + product/lifestyle photography from ToWebP + chat attachments - see `public/references/SOURCES.md`).

Colour/typography cues were derived from photography (no stakeholder hex handoff required):

- Logo lockups - black/white, indigo `#302850`, serif wordmark, tagline *Handcrafted Silver by PMJ JEWELS*
- Studio photos - forest/emerald backdrops (`#1B3022`, `#245448`), oxidised silver greys, soft rose florals (`#D4A5A5`), warm gold bokeh (`#B8883A`), gem accents (emerald `#1F6B4F`, ruby `#7A1F2B`)
- Per-concept palettes in `lib/brand.ts` → `conceptPalettes`

Dummy WhatsApp for enquire UI: **+91 98765 43210**

## Design switcher (internal)

There is **no top stakeholder bar**. A subtle layers icon beside the shopping bag opens a compact popover to switch Designs A-D, save selection, or reset. Selection is stored in `localStorage` key `nithyam-selected-design`. Site navigation handles page previews (Home / Shop / Product / About / Contact).
