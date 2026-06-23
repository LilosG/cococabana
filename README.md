# Coco Cabana — Rooftop Bar

Marketing site for Coco Cabana, the rooftop bar at The Brick Hotel, Oceanside, CA. Part of the Grind & Prosper Hospitality portfolio, built and maintained by Lilos Growth.

## Venue facts

- **Address:** 408 Pier View Way, Oceanside, CA 92054
- **Phone:** (858) 304-7725
- **Reservations:** [Toast](https://tables.toasttab.com/restaurants/92e5306b-e932-4406-876b-91277626cb5c)
- **Brand name:** "Coco Cabana" for readable text/SEO/nav. "COCOCABANA" reserved for stylized wordmark treatments only.

This is a standalone identity for Coco Cabana. The venue shares a building with Lobby Tiki Bar, but this site does not reference or describe Lobby Tiki Bar.

## Stack

- [Astro](https://astro.build) 6.4.7 (static output)
- [Tailwind CSS](https://tailwindcss.com) v4 via `@tailwindcss/vite`
- [@astrojs/vercel](https://docs.astro.build/en/guides/integrations-guide/vercel/) adapter
- Deployed via Vercel, repo under the LilosG GitHub org

## Brand tokens

Defined in `src/styles/global.css` under `@theme`:

| Token | Value | Use |
|---|---|---|
| `--color-brand-blush` | `#cfb8ae` | Primary brand accent — sampled directly from the logo file |
| `--color-brand-blush-dark` | `#b89a8e` | Hover/depth states |
| `--color-brand-cream` | `#faf5ea` | Primary light anchor |
| `--color-brand-charcoal` | `#2b2420` | Primary dark anchor/text |
| `--color-brand-navy` | `#1c3a5e` | Secondary accent — Moroccan tile wall |
| `--color-brand-copper` | `#b8743f` | Secondary accent — bar fixtures |
| `--color-brand-sage` | `#8a9b6e` | Secondary accent — succulent strands |

Font families are currently a system-font placeholder pending pairing selection — do not ship a page against real fonts without confirming that first.

All element-selector base styles live in `@layer base` in `global.css`. Nothing goes outside `@layer base/components/utilities` — unlayered CSS breaks the cascade against Tailwind's layer order.

## Project structure

```
src/
├── layouts/Layout.astro   — shared shell, nav, transparentNav prop
├── styles/global.css      — design tokens + base layer
├── pages/                 — one file per route
└── content.config.ts      — content collections (none defined yet)
public/
└── cococabana-logo.png    — real logo asset
```

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Status

Foundation validated — install/build/dev all confirmed clean. No real page content yet beyond a validation placeholder at `/`. Homepage section planning in progress.
