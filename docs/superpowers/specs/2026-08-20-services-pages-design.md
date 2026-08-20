# Services Pages — Design

Date: 2026-08-20
Branch: `worktree-services-pages`

## Goal

Rebuild `/services` and add a detail page for every service, matching two
Claude Design references:

- `C:\Users\User\Documents\Designs\sj-hospital\SJ Hospital Services.html` — the index
- `C:\Users\User\Documents\Designs\sj-hospital\SJ Hospital Service Pages.html` — the detail template

Both are bundled artifacts. Decode as described in the `home-design-reference`
memory: line 390 (`lines[389]`) JSON-parses into the rendered DOM; line 378 is the
asset map; styling is almost entirely inline `style` attributes with
`style-hover="…"` pairs for hover states.

## Decisions

| Decision | Choice |
|---|---|
| Design shell | The home page's themed system (Bricolage Grotesque + Manrope, `sj-theme` dark/light, `#2CA6F0` accent), **not** the purple `SiteHeader`/`SiteFooter` marketing shell |
| Shell code | Promote the home design system to shared components; both home and services consume one implementation |
| Detail coverage | All 24 services get a full detail page |
| Routing | Real routes `/services/<slug>`, server-rendered, per-service metadata |
| Existing page | Replaced; `features/services` old components deleted |

## Reference reconciliation

The references carry **two** service arrays that overlap inconsistently:

- Index ref: 24 entries with `title, group, hours, cta, desc, tags[], facts[]`
- Detail ref: 11 entries with `slug, title, group, cta, lede, aboutHead, body1,
  body2, strip[], covers[], conditions[], facts[], location, steps[4], prep[],
  team[], faq[]`

Titles diverge across the two (`"Accident & emergency unit"` vs
`"Accident & emergency"`; `"Physiotherapy & rehabilitation"` appears in both with
different `hours`). They are merged into **one catalog** of 24 entries, keyed by
slug, holding both the directory fields and the detail fields. The index-ref
title wins for the directory row; the detail-ref title wins for the `<h1>` and
`<title>` — both are stored so neither view has to mutate strings.

The detail ref's 11 authored services are ported verbatim. The remaining 13 are
authored fresh — see "Authored content" below.

## Data model

`src/features/services/types.ts`

```ts
export type ServiceGroup =
  | "Emergency" | "Surgical" | "Diagnostics"
  | "Clinics" | "Women & children" | "At home";

export type KeyValue = { k: string; v: string };
export type Step = { no: string; title: string; desc: string };
export type TeamMember = { role: string; note: string };
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  title: string;          // detail <h1>
  directoryTitle: string; // directory row
  group: ServiceGroup;
  hours: string;
  cta: string;
  desc: string;           // directory accordion body
  tags: string[];
  facts: KeyValue[];
  lede: string;
  aboutHead: string;
  body1: string;
  body2: string;
  strip: KeyValue[];      // 4 hero stats
  covers: string[];
  conditions: string[];
  location: string;
  steps: Step[];          // exactly 4
  prep: string[];
  team: TeamMember[];
  faq: Faq[];
  authored: boolean;      // true = copy written by us, needs clinical review
};
```

`src/features/services/data/services.ts` exports `services: Service[]` (24, in the
index ref's order) plus `getService(slug)`, `serviceSlugs`, and
`relatedServices(slug)` (the ref's `[1,2,3].map(o => SERVICES[(idx+o) % len])`).

`src/features/services/data/groups.ts` exports the filter order:
`["All", "Emergency", "Surgical", "Diagnostics", "Clinics", "Women & children", "At home"]`.

Group counts, verified against the index reference — the filter chips must show
these, and they sum to 24:

| Group | Count |
|---|---|
| Emergency | 2 |
| Surgical | 6 |
| Diagnostics | 3 |
| Clinics | 5 |
| Women & children | 4 |
| At home | 4 |

### Catalog

Ported verbatim from the detail ref (11):

| # | Slug | Group |
|---|---|---|
| 1 | `accident-emergency` | Emergency |
| 4 | `general-surgery` | Surgical |
| 5 | `endoscopy` | Surgical |
| 11 | `obstetrics-maternity` | Women & children |
| 13 | `paediatrics` | Women & children |
| 14 | `laboratory` | Diagnostics |
| 15 | `radiology` | Diagnostics |
| 17 | `physiotherapy` | Clinics |
| 20 | `pharmacy` | At home |
| 22 | `home-visits` | At home |
| 24 | `inpatient-rooms` | Clinics |

Authored by us (13), `authored: true`:

| # | Slug | Group |
|---|---|---|
| 2 | `intensive-critical-care` | Emergency |
| 3 | `outpatient-department` | Clinics |
| 6 | `orthopaedic-surgery` | Surgical |
| 7 | `ent-surgery` | Surgical |
| 8 | `urology` | Surgical |
| 9 | `ophthalmology` | Surgical |
| 10 | `dental-surgery` | Clinics |
| 12 | `gynaecology` | Women & children |
| 16 | `cardiac-screening` | Diagnostics |
| 18 | `dermatology-wound-clinic` | Clinics |
| 19 | `vaccination-clinic` | Women & children |
| 21 | `medicine-delivery` | At home |
| 23 | `telemedicine` | At home |

## Routing

`/services` moves out of the `(marketing)` route group — that layout injects the
purple `SiteHeader`/`SiteFooter`, and leaving the old segment in place would
collide on the same URL.

```
src/app/services/layout.tsx          # themed shell wrapper
src/app/services/page.tsx            # index
src/app/services/[slug]/page.tsx     # detail
src/app/services/[slug]/not-found.tsx
```

Next 16 specifics:

- `params` is a Promise: `const { slug } = await params` — in the page **and**
  `generateMetadata`.
- `generateStaticParams()` returns all 24 slugs so every detail page prerenders.
- Unknown slug → `notFound()`.
- No `cookies`/`headers`/`searchParams` are read, so no `<Suspense>` boundary is
  required. Filter state lives in client state, not the URL.
- Read the bundled guide in `node_modules/next/dist/docs/` before writing the
  route files rather than coding from memory.

`src/app/(marketing)/services/` is deleted, along with
`features/services/components/{MainServicesGrid,DepartmentGrid,DepartmentIcons}.tsx`
once nothing imports them.

## Shared shell

Today the home design system is scoped by `[data-home]` in `globals.css`
(28 `--home-*` custom properties, the `.sj-invert` / `.sj-accentify` / `.sj-link`
/ `.sj-row` / `.sj-row-fill` / `.sj-bento` hover utilities, and the
`[data-stagger-armed]` / `[data-stagger-revealed]` reveal), and the theme store
reads `#home-root`. Only four files reference those hooks: `globals.css`,
`HomePage.tsx`, `HomeThemeScript.tsx`, `useHomeTheme.tsx`.

Changes:

1. Rename the scope hook `[data-home]` → `[data-sj]` and `#home-root` →
   `#sj-root` throughout `globals.css` and the four files. Keep every
   `--home-*` variable name as-is — renaming ~28 tokens across the whole home
   feature is churn with no benefit and real regression risk.
2. Move to shared locations:
   - `src/components/theme/ThemeScript.tsx` (from `HomeThemeScript`)
   - `src/components/theme/useSiteTheme.tsx` (from `useHomeTheme`; storage key
     stays `sj-home-theme` so a visitor's saved theme survives)
   - `src/components/theme/ThemeToggleButton.tsx`
   - `src/components/layout/ThemedShell.tsx` — renders the `#sj-root` div with
     `data-sj`, `data-theme="dark"`, `suppressHydrationWarning`, the theme
     script and provider
   - `src/components/ui/{Reveal,RevealStagger,ParallaxLayer}.tsx`
   - `src/components/layout/MobileNavPanel.tsx`
   - `src/components/ui/BrandIcons.tsx` (the social/util icons in
     `features/home/components/icons.tsx`)
3. `src/components/layout/ThemedHeader.tsx` and `ThemedFooter.tsx` —
   parameterised by nav items, footer link columns and the book href. The refs
   genuinely differ here (the services header nav is
   `Services / Facilities / Health Checks / Admissions / International Patient Care`
   pointing at in-page anchors; the services footer columns are
   `Centres of excellence / Full directory / Department of surgery / …`), so the
   markup is shared and only the data differs.
4. `features/home` is refactored to consume all of the above. **The home page's
   rendered markup must not change** — this is a move-and-parameterise, not a
   redesign. `data-home` → `data-sj` is the only attribute change, and
   `globals.css` is updated in the same commit.

Neither reference header is sticky (both sit inside the hero), so the existing
`[data-home] section[id] { scroll-margin-top: 0 }` rule — becoming
`[data-sj] …` — applies correctly to the services pages too.

## Index page — `/services`

Thirteen sections, in reference order:

1. **`#top` hero** — fixed-dark, exterior render with parallax, header + nav +
   theme toggle, headline, "Open the directory →" CTA.
2. **`#jump`** — 4 cards: `9 units / Centres of excellence`,
   `24 services / Full directory`, `3 packages / Health checks`,
   `4 steps / Admissions`, each anchoring to its section.
3. **`#centres`** — 9 centres of excellence (`01`–`09`), each with name, desc and
   a lead line, linking into `#directory`.
4. **`#directory`** — the core. Group filter chips showing counts
   (`All (24)`, `Emergency (2)`, …), a heading that switches between
   `"Everything we treat"` and `"<Group> services"`, an `"N of 24 services"`
   count, and 24 accordion rows numbered `/01`–`/24`. An open row reveals desc,
   tags, facts and the service's CTA. **Deviation from the ref:** each row also
   links to `/services/<slug>`, since detail pages now exist.
5. **`#surgical`** — Department of surgery, 12 name/note pairs.
6. **`#diagnostics`** — 8 entries with name, note and turnaround.
7. **`#packages`** — 3 health-check packages (Essential 9,500 / Comprehensive
   18,500 / Executive & cardiac 32,000 LKR), the middle one accent-filled.
8. **`#admissions`** — 4 steps, "Bring with you", "Payment & insurance",
   "The rooms".
9. **`#facilities`** — 4 `data-fac` cards plus the 10 comforts chips.
10. **`#pharmacy`** — authorized-stock section.
11. **`#international`** — 6 numbered items, "Ten minutes from the airport".
12. **`#book`** — CTA with "Browse services →".
13. **`footer #contact`** — themed footer with services-specific link columns.

Client leaves: `ServiceDirectory` (filter + accordion state). Everything else is
a Server Component.

## Detail page — `/services/<slug>`

Sections, in reference order:

1. **`#top` hero** — Ken Burns exterior image (`data-burns`, 26s, disabled under
   `prefers-reduced-motion`), header, group eyebrow, `<h1>` title, lede, CTA, and
   the 4-stat `strip`.
2. **Service picker** — the ref's client-side `#hash` picker becomes a row of
   `<Link>`s to all 24 routes, current one accent-filled.
3. **`#about`** — `aboutHead`, `body1`, `body2`, "What this covers" (`covers`),
   "Conditions we see most" (`conditions` chips), and a CTA card carrying `facts`
   and `location` above `229/10 St. Joseph Street, Negombo`.
4. **`#journey`** — "Your visit, step by step", 4 big-numbered steps, then
   "How to prepare" / "Bring with you" from `prep`.
5. **`#team`** — "The team on this service", `team` role/note pairs.
6. **`#faq`** — "Asked before you ask", accordion over `faq`.
7. **`#related`** — 3 related services, each linking to its route.
8. **`#book`** — CTA using the service's `cta`.
9. **`footer #contact`**.

Client leaves: `FaqAccordion`. Everything else is a Server Component.

Metadata per service: `title: "<title> | St. Joseph Hospital Negombo"`,
`description` from `lede` (trimmed to ~155 chars).

## Wiring

- `config/homeNavigation.ts`: `Services` → `/services` (was `#services`).
- `HomeFooter` care column: `Services` → `/services`.
- `features/home/components/ServicesBentoSection.tsx`: each card links to its
  `/services/<slug>`, plus a "View all 24 services →" link to `/services`.
- `config/navigation.ts`: `Medical Services` → `/services` is already correct;
  `footerQuickLinks` inherits it, so the marketing footer needs no change.
- Detail pages carry a back-link to `/services`.
- Cross-links between `#centres`, directory rows, `#related` and detail routes.

## Assets

Five of the refs' images already exist in the repo (verified by md5):

| Ref asset | Repo file |
|---|---|
| `e810bcd3…` "Outpatient reception" | `public/images/welcome.jpg` |
| `b36977ed…` "Diagnostics" | `public/images/doctors.jpg` |
| `7dd1ae31…` / `cb3cc71d…` | `public/images/hero-exterior.png` |
| `ee4678cc…` / `72e34c9c…` | logo — use `LOGO_MARK` from `config/brand` |

Two are new exterior dusk renders, added as
`public/images/services/exterior-dusk-a.png` (`7da935c7…`, index/detail hero) and
`public/images/services/exterior-dusk-b.png` (`ea1cbf25…`, "Hospital exterior and
ambulance entrance"). Copied as-is; `sharp`'s install scripts are blocked in this
worktree, so no re-encoding.

## Authored content

The 13 services listed above have no reference copy. Their `lede`, `aboutHead`,
`body1/2`, `strip`, `covers`, `conditions`, `facts`, `location`, `steps`, `prep`,
`team` and `faq` are written in the references' voice, grounded only in facts
already established across the refs and the existing site: 24-hour lab and
pharmacy, two-doctor report verification, consultant-led anaesthesia, same-day
reporting, the 10% OPD lab discount, `0117 84 84 84`, Kids & Teens protocol,
`229/10 St. Joseph Street, Negombo`.

Constraints on authored copy:

- No invented prices, consultant names, equipment brands, or accreditations.
- No invented turnaround or success-rate claims beyond those the refs state.
- Each authored service is marked `authored: true` in the catalog, and the
  implementation hands over a checklist of all 13 pages and every clinical claim
  made, for the user's fact-check.

## Verification

1. `npm run lint` — clean.
2. `npm run build` — succeeds; route list shows `/services` plus 24 prerendered
   `/services/[slug]` entries.
3. `npm run dev` in the worktree on a free port; click through `/services` and a
   sample of detail routes in **both** themes, checking the group filter, the
   directory accordion, the FAQ accordion, reveals and parallax.
4. Re-check the **home page** for regressions from the shared-shell refactor —
   hero, bento hovers, stagger reveals, theme toggle, footer.
5. Report the authored-content checklist.

Baseline before any change: lint clean, build succeeds, 11 static routes.

## Out of scope

- Porting `about-us`, `career`, `contact-us`, `accommodation` or `e-channeling`
  to the themed shell. They keep the purple marketing chrome, so the site has two
  looks until those are ported separately.
- Booking/e-channeling integration — every CTA points at `#book` or the existing
  contact route.
- Renaming the `--home-*` custom properties.
- Any change to the home page's rendered output.
