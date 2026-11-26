# Nithyam by PMJ Jewels — Phase 1 Design Preview

Internal stakeholder app to compare **four distinct homepage concepts** for Nithyam (handcrafted silver by PMJ Jewels).

| ID | Concept |
|----|---------|
| A | Classic Luxury |
| B | Modern Minimal |
| C | Premium Editorial |
| D | Contemporary Indian |

Phase 1 is **frontend only** — no payments, auth, inventory, or checkout. WhatsApp enquiry, bag, and search are visual/UI wiring. Sample prices and testimonials are labelled as sample.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Brand references

Assets live in `public/references/` (logos + product/lifestyle photography supplied for this project).

Colour/typography cues were derived from:

- Logo lockups (`nithyam_logo_final_9jul-1.png`, `nithyam_logo_final_9jul-2.png`) — black/white, indigo `#302850`, high-contrast serif wordmark, tagline *Handcrafted Silver by PMJ JEWELS*
- Product photography — silver metallics, forest greens, marigold accents

## Stakeholder chrome

Top bar (tabs, page previews, **Select This Design**, confirm dialog, reset) is **internal only** and not part of the public site concepts. Selection is stored in `localStorage` key `nithyam-selected-design`.
