# Homepage Design

Date: 2026-08-03

## Purpose

Build the St. Joseph Hospital marketing homepage at `/`. The visual design, copy, section order, and icons are specified exactly by a reference HTML file (a one-off static export the user provided). The implementation must be a proper Next.js 16 App Router page following this repo's feature-based architecture (see `CLAUDE.md`), fully responsive across mobile/tablet/desktop (the reference file is a fixed-width desktop export and does not itself define responsive behavior), and add scroll-triggered reveal, count-up stats, and scroll parallax on top of the reference design.

No automated tests are required for this work; the user will verify manually in a browser. Playwright is available and may optionally be used during implementation to sanity-check rendering, but it is not a deliverable.

## Non-goals

- No other marketing pages (About, Career, Gallery, etc.) — only the homepage. Nav items that map to in-page sections use anchor links (`#services`, `#accommodation`, `#about`, `#contact`), matching the reference. Nav items that map to pages this app doesn't have yet (e.g. Career, e-Channeling, Accommodation booking) are plain `<a>` tags pointing at the existing live site URLs, exactly as in the reference HTML, until those pages are built in this app.
- No CMS, no data fetching, no forms, no backend — this is a static marketing page.
- No dark mode design pass (the reference is light-theme only; the default Next.js dark-mode scaffolding in `globals.css` will be removed/simplified since it doesn't apply to this design).

## Architecture

### Routing

- `src/app/(marketing)/layout.tsx` — thin layout wrapping homepage (and future marketing pages) with `SiteHeader` / `SiteFooter`.
- `src/app/(marketing)/page.tsx` — thin route file that renders `<HomePage />` from the `home` feature. Route group `(marketing)` adds no URL segment, so this serves `/`.
- Root `src/app/layout.tsx` stays minimal (html/body shell, fonts, metadata).

### Feature: `src/features/home/`

- `components/Hero.tsx` — top banner, headline, CTA buttons, hero image, floating decorative blobs, parallax.
- `components/StatsBar.tsx` — 4-stat row with count-up numbers.
- `components/Welcome.tsx` — intro/about section with image + checklist.
- `components/Services.tsx` — 9 service cards grid.
- `components/Doctors.tsx` — doctors section with image + copy + CTA.
- `components/WhyChooseUs.tsx` — 6 reason cards.
- `components/Testimonials.tsx` — 3 patient story cards.
- `components/CtaBanner.tsx` — closing call-to-action banner.
- `index.ts` — exports `HomePage`, composing the sections above in order.

### Shared layout & UI

- `src/components/layout/SiteHeader.tsx` — top contact bar + logo + nav + mobile hamburger menu (`'use client'` only for the menu toggle state, isolated to a small leaf component: `SiteHeader` stays a Server Component that renders a client `MobileNavToggle`/`MobileMenu` leaf).
- `src/components/layout/SiteFooter.tsx` — footer with logo, link columns, contact info, social icons, legal bar.
- `src/components/ui/RevealOnScroll.tsx` — `'use client'` leaf. Wraps children, applies fade+slide-up when scrolled into view (IntersectionObserver), mirrors the reference site's `data-reveal`/`data-delay` behavior. Accepts a `delayMs` prop.
- `src/components/ui/AnimatedCounter.tsx` — `'use client'` leaf. Counts up from 0 to a target value with an easing curve when it enters the viewport (reuses an IntersectionObserver, or composes with `RevealOnScroll`'s visibility). Accepts `target`, `prefix`, `suffix`.

### Shared hooks

- `src/hooks/useScrollParallax.ts` — `'use client'` hook returning a translateY offset derived from scroll position (via a scroll listener batched with `requestAnimationFrame`), clamped to a small range, disabled under `prefers-reduced-motion`. Used by `Hero` for the decorative blobs and hero image.

### Config

- `src/config/navigation.ts` — typed array of `{ label, href }` nav items, consumed by `SiteHeader` (and the footer's quick-links, to avoid duplicating the list).

### Assets

- `public/images/logo.png` — decoded from the base64 PNG embedded in the reference HTML (pixel-identical to the source; no network fetch needed).
- `public/images/hero.jpg`, `public/images/welcome.jpg`, `public/images/doctors.jpg` — real photos sourced from sjhospital.lk (home page, gallery, or about page — whichever has the best-matching photo for each slot), downloaded during implementation and referenced via `next/image`.

## Visual system

- Colors (Tailwind v4 `@theme` in `globals.css`): primary purple `#4A2A82` / dark purple `#3A2168` / mid purple `#5E3AA6`, accent cyan `#33B4E5` / `#1683B5`, neutral surface `#F4F6FA`, ink `#1E1B2E`, muted text `#5B6472`.
- Fonts via `next/font/google`: **Plus Jakarta Sans** (body/UI text) and **Sora** (headings), replacing the scaffold's Geist fonts.
- Icons: inline SVG (feather/lucide-style paths), ported directly from the reference — these are generic open-source icon shapes, not brand assets.

## Responsiveness (new — not present in the fixed-width reference)

Rebuilt with Tailwind breakpoints (`sm`, `md`, `lg`, `xl`):
- Nav: full inline nav ≥ `lg`; hamburger + slide-down panel below `lg`.
- Top contact bar: wraps/hides secondary items on small screens.
- Hero: two-column (copy + image) ≥ `lg`, stacks single-column below, headline scales down (`text-4xl` → `text-6xl` range).
- Stats bar: 4 → 2 → 1 columns across breakpoints.
- Services grid: 4 → 2 → 1 columns.
- Why Choose Us: 3 → 2 → 1 columns (`lg` → `sm` → base), consistent with the other card grids.
- Testimonials: 3 → 1 columns.
- CTA banner and Doctors section: two-column → stacked.
- Footer: 4-column → 2 → 1.

## Interactivity

- **Reveal on scroll:** `RevealOnScroll` mirrors the reference's fade+translateY-on-intersect behavior, staggered via per-item delay, matching the reference's section-by-section reveal choreography.
- **Count-up stats:** triggers once, when the stat enters the viewport, counting to the target value (24/7, 10000, 2h, 100%) with an eased ramp, matching the reference's counter behavior.
- **Scroll parallax (new):** hero's floating decorative blobs and hero image shift at a fraction of scroll speed as the user scrolls past the hero, for a subtle depth effect. Implemented with `useScrollParallax`; disabled when `prefers-reduced-motion: reduce` is set.
- **Floating blobs:** pure CSS `@keyframes` (no JS), ported as-is from the reference.
- **Mobile nav:** small client leaf toggling an open/closed boolean; closes on link click or outside click.

## Content fidelity & cleanup

- All copy, section order, stat values, testimonials, and service/reason descriptions are ported from the reference file as-is, with two categories of correction:
  1. **Mojibake fixes** — the reference file has UTF-8 mis-decoding artifacts: `Â·` → `·`, `Â©` → `©`, garbled star-rating glyphs (`âââââ`) → clean 5-star rating (rendered as inline SVG stars, not the ambiguous unicode glyph, for crisp rendering across platforms).
  2. **Em dash removal** — per explicit instruction, the character `—` must not appear anywhere in the shipped content; any place that would naturally use one is rewritten with a comma, period, or the middle dot `·` instead.

## Error handling

Not applicable in the traditional sense (no data fetching, no user input, no external calls at runtime). The only "failure mode" is a missing/broken image asset at build time, which `next/image` will surface as a build/runtime error immediately, making it visible.

## Testing / verification

No automated tests are requested. Verification is manual: the user will run `npm run dev` and check the page across breakpoints themselves. Playwright (available via MCP) may optionally be used during implementation as a self-check (e.g., confirming the page renders without console errors, screenshotting a couple of breakpoints) but is not a required deliverable and no test files will be added to the repo for this.
