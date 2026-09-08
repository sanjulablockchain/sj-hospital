# Trilingual (English / Sinhala / Tamil) support: decisions so far

Status: **brainstorming in progress.** No code written. This file exists so the
work survives a session boundary, which is exactly what it failed to do the
first time round.

## History

An earlier session created the worktree `.claude/worktrees/trilingual-i18n`
(branch `worktree-trilingual-i18n`, locked) and stopped before producing any
design. That branch sat on `4051fbf`, clean, with zero commits. No spec, no
plan, no `i18n` or `locale` code in `src/`. The conversation itself is gone.
This file is the replacement for it.

## Codebase facts the design has to respect

- Next.js **16.2.11**, React 19.2.4, App Router, TypeScript strict.
- No `src/proxy.ts` yet. `cacheComponents` is **off**, so the previous caching
  model applies.
- 18 top-level routes plus `services/[slug]`. Each route owns a `layout.tsx`
  that carries its metadata.
- Copy is already half-extracted: ~7,200 lines across `src/features/*/data/*.ts`.
- Each of those data files has a companion `.test.ts` asserting on literal
  English strings. Those tests must be reworked, not deleted.
- ~15,500 lines of TSX still hold labels, button text, aria-labels and headings
  inline. These are the bulk of the extraction work.
- Control precedent to mirror: `ThemeToggleButton` sits in `ThemedHeader`, and
  `ThemeMenuToggle` sits inside `MobileNavPanel`. The language switcher should
  be the same pairing.
- `ThemedHeader` measures its own children to decide when to collapse to the
  mobile layout, so longer Sinhala and Tamil nav labels feed that logic rather
  than breaking it.

## Decisions taken

1. **Coverage: full parity, all 18 routes.** Every `data/*.ts` content file and
   every hardcoded TSX string. Not a chrome-only release.

2. **URL scheme: path prefix, English unprefixed.**
   `/contact-us` (English), `/si/contact-us`, `/ta/contact-us`.
   Consequences: an `app/[locale]` restructure, a `src/proxy.ts` for locale
   redirect, `hreflang` alternates in every layout, per-locale sitemap entries.
   Existing URLs and inbound links keep working, which ruled out prefixing all
   three.

3. **Translation sourcing: I draft, a human reviews before launch.** First-pass
   Sinhala and Tamil for every string, held in reviewable per-locale files with
   a per-file review-status field. Nothing ships to production unreviewed. This
   is a hard gate, not a formality: the health-tips content covers symptoms,
   first aid and emergency guidance.

## Still open

- Content file shape: per-feature per-locale files vs central catalogs, and how
  the existing literal-string `.test.ts` files adapt (likely a key-parity test
  across the three locales instead of English assertions).
- Locale detection: does a first-time visitor get auto-redirected on
  `Accept-Language`, or does English always serve with the switcher visible?
  Auto-redirect has known SEO and back-button costs.
- Fonts: Noto Sans Sinhala and Noto Sans Tamil, subsetting strategy, weights,
  and how they pair with the current brand type. Both scripts need more
  line-height than Latin.
- Text expansion in the chrome: nav labels, CTA buttons, and the header's
  collapse measurement at compact widths.
- Switcher UI: label style (EN / සිං / தமிழ் vs full language names), and
  whether it is a toggle group or a menu.
- What deliberately stays untranslated: brand name, doctor names, email
  addresses, some proper nouns.
- Rollout: do Sinhala and Tamil go live together once reviewed, or per-page as
  review completes.

## Next step

Resume the brainstorming skill at "still open" above, one question at a time,
then write the full design doc, then the implementation plan. No code before
the plan is approved.
