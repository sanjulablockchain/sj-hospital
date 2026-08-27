# Interior pages redesign: about, contact, accommodation, e-channeling, privacy policy

Date: 2026-08-26

## Goal

Bring the last five pages still on the original 2026-08-04 design onto the
current design system, so the whole site reads as one thing.

Eight pages have already made this move: `/facilities`, `/pharmacy`,
`/health-tips`, `/international-care`, `/media`, `/network`, `/careers` and
`/school-wellness`. The five in this spec are the remainder. They are the only
routes left rendering the old `SiteHeader` / `SiteFooter` / `PageBanner` chrome
out of `src/app/(marketing)/`.

## What makes these five different from the eight before them

Every page rebuilt so far was driven by a bundled Claude Design reference
artifact, and every one of those references invented facts that had to be cut or
quarantined behind a `PLACEHOLDER_NOTICE`. There is **no reference artifact for
these five**. The design language therefore comes from the eight built pages,
and the content comes from what the repo already carries.

That inverts the usual risk. The danger here is not fabricated copy arriving
from a reference; it is fabricated copy arriving from us, to pad these pages out
to the section count of `/careers` or `/network`. We do not do that.

**Decision: real content only.** Sections exist where the repo backs them.
These pages come out shorter than the reference-driven ones, and that is the
correct outcome. No `PLACEHOLDER_NOTICE` is introduced by this work, because
nothing in it is unverified.

## Non-goals

- No new hospital facts, figures, turnarounds, prices, or promises. If the repo
  does not already say it, it does not go on the page.
- No redesign of `ThemedHeader` or `ThemedFooter`. Their link *lists* change;
  their markup does not.
- No change to the contact form's server path: the Server Action, the zod
  schema, and the nodemailer transport are presentation-agnostic and stay as
  they are.
- No booking backend. `/e-channeling` continues to link out to Calendly.
- No URL changes. Every route keeps its current path.

## URLs

All five keep their existing paths, because `features/services` and
`features/facilities` already link to three of them and those links must not
break:

| Route | Feature module |
|---|---|
| `/about-us` | `src/features/about/` |
| `/contact-us` | `src/features/contact/` |
| `/accommodation` | `src/features/accommodation/` |
| `/e-channeling` | `src/features/e-channeling/` |
| `/privacy-policy` | route-local `_components/` |

## Shared groundwork

### Layouts

Each route moves from `src/app/(marketing)/<page>/` to `src/app/<page>/`, with
its own `layout.tsx`:

```tsx
<ThemedShell flowHeader>
  {children}
  <FloatingActions />
</ThemedShell>
```

This is the arrangement `/careers`, `/network`, `/international-care`,
`/pharmacy` and `/facilities` already use. `flowHeader` cancels the sticky-header
anchor offset, because the header lives inside the hero and scrolls away with
it. `FloatingActions` must sit inside `ThemedShell`, since the `--home-*` tokens
it reads are scoped to the `[data-sj]` root.

### Navigation config

Five new files in `src/config/`: `aboutNavigation.ts`, `contactNavigation.ts`,
`accommodationNavigation.ts`, `channelingNavigation.ts`,
`privacyNavigation.ts`.

Each exports a `NavItem[]` carrying **the same nine labels in the same order as
`homeNavigation`**, and a `FooterColumn[]`. Only the hrefs differ: the item
matching the current page points at that page's own most useful section, and the
rest point at their own routes. This rule is already established across the
eight built configs, and its rationale is recorded in each: a nav label has to
mean the same thing wherever it is clicked, and the header must not change shape
as the reader moves around the site.

Footer columns use bare hashes for same-page sections and absolute paths for
everything else, because `ThemedFooter` renders plain `<a>` tags and relies on
the browser's own same-document fragment navigation.

All five new navs are registered in `ALL_NAVS` in the existing
`src/config/navigation.test.ts`. That file is the guardrail which already caught
the health tips, pharmacy and facilities navs drifting apart when three branches
landed in turn, and it asserts label-for-label equality against
`homeNavigation`. Registering the new navs there is not optional: it is how the
consistency rule above is enforced rather than merely intended. The suite grows
to sixteen navs across fifteen files (`servicesNavigation.ts` exports two).

### Entry-point wiring (config only)

Two changes ripple across the already-built pages. Both touch only the config
files, never the header or footer components:

1. **About, Contact and Accommodation join the footer.** No footer column
   anywhere currently links to them, so on the redesigned site they are
   unreachable except by typing the URL. They are added to the existing
   `*FooterColumns` exports.
2. **`bookHref` repoints to `/e-channeling`.** Every hero currently passes an
   on-page anchor (`#book`, `#form`, `#enquiry`, `#press`, `#contact`), so the
   header's "Book now" button means something different on each page. It becomes
   `/e-channeling` everywhere.

Accepted consequence of (2): those on-page booking sections lose their header
shortcut. They remain reachable by scrolling, by jump cards, and by footer
links, so nothing becomes unreachable, but the header no longer scrolls you to
them.

### Retiring the old chrome

Once `/privacy-policy` moves, nothing renders the old chrome. Delete:

- `src/app/(marketing)/` (the whole route group and its `layout.tsx`)
- `src/components/layout/SiteHeader.tsx`
- `src/components/layout/SiteFooter.tsx`
- `src/components/layout/MobileNav.tsx` (only `SiteHeader` uses it)
- `src/components/layout/PageBanner.tsx`
- `src/components/layout/BackToTopButton.tsx` (`FloatingActions` supersedes it)
- the `primaryNavigation` and `footerQuickLinks` exports in
  `src/config/navigation.ts`

**Keep `src/config/navigation.ts` itself.** It declares the `NavItem` type that
all fifteen per-page nav config files import. Only its two data exports go.

## Page designs

Every page follows the established rhythm: a full-bleed photographic hero with
`ThemedHeader` inside it, a breadcrumb, exactly one `h1`, a four-fact strip, a
`Ticker`, `JumpCards`, numbered sections headed by a `SectionHead`, `Reveal` /
`RevealStagger` motion, and `ThemedFooter`.

### `/about-us`

Hero on `public/images/about-facility.jpg` (a real hospital photograph, the
repo's crop of the live media library's `2025/07/DSC_6132.jpg`).

Fact strip, all four already in the repo's copy: the USD 1 million
refurbishment; managed from Los Angeles; first in Negombo to accept corporate
insurance at OPD; open 24/7.

Four sections, each drawn from the existing components:

| Section | Source |
|---|---|
| `#story` | the four `Intro` paragraphs |
| `#different` | the six `WhyDifferent` reasons |
| `#mission` | `MissionVision`'s mission and vision |
| `#group` | `ParentGroup`'s Kids & Teens copy, logo and partner marquee |

### `/contact-us`

Hero on `public/images/welcome.jpg` (the reception desk).

Three sections: `#reach` (the four contact rows), `#message` (the form), `#map`
(the Leaflet map).

Two fixes carried in:

- The map marker is hardcoded `#4A2A82`, the retired purple wordmark colour. It
  moves to the accent token.
- OpenStreetMap tiles are light-only, so on the dark theme the map is a glaring
  white block. A CSS filter on the tile layer under the dark theme resolves it,
  with no new tile host and no new attribution obligation.

### `/accommodation`

Hero on a room photograph.

The sticky `RoomTypeNav` is kept and retokenized: it is genuinely useful on a
page with four long room sections, and it already tracks the active section with
an `IntersectionObserver` and measures the header with a `ResizeObserver`.

Sections: the four room types (alternating photo layout, amenity chips), then
the ten inpatient specialties, then a booking rail.

**Prices are stated only as the repo backs them.** Per
`features/facilities/data/content.ts`, Standard is "From 10,000 LKR" and the
other three categories are "On request". No number is invented for deluxe,
super deluxe or wards.

### `/e-channeling`

Hero on `public/images/echanneling-hero.jpg`.

`DoctorDirectory` keeps its search box, its desktop speciality rail with counts,
and its mobile chip row, retokenized. Real figures: **71 consultants across 28
specialities.**

#### Overturning the 2026-08-04 `linkMismatch` decision

The 2026-08-04 spec recorded that roughly 35 rows had a Calendly slug naming a
different doctor, called it "a pre-existing data-quality bug on sjhospital.lk",
and chose to reproduce it as-is. `data/doctors.ts` carries a `linkMismatch?:
boolean` flag on 26 rows and a docstring asking the hospital to verify its
Calendly account assignments.

**That conclusion was inferred from the slug text and was never checked against
the live calendars. It is wrong.** Verified this session by fetching the
`og:title` of all 71 booking pages: every one names the same consultant the repo
assigns it to. 71 of 71 correct, including all 26 flagged. Examples:

| Row | Slug (stale) | Real event title |
|---|---|---|
| Dr. Raja Hettiarachchi | `...dr-champa-jayamanna-clone` | Consultant Physician - Dr. Raja Hettiarachchi |
| Mrs. Dinusha Manathunga | `counselor-ms-romin-fernando-clone` | Audiologist - Mrs. Dinusha Manathunga |
| Dr. Lakkumar Fernando | `consultant-gynecologist-dr-lakkumar-fernando` | Consultant Pediatrician - Dr. A. Lakkumar Fernando |

The slugs are cosmetic leftovers from Calendly's "clone" feature: the duplicated
event kept the source event's URL slug but was renamed to the correct
consultant. A Calendly slug is not required to match its event title.

Consequences:

- Delete the `linkMismatch` field, all 26 of its usages, and the docstring that
  asserts the bug.
- No warning UI is needed on the directory, and none is built.
- Nothing needs escalating to the hospital.
- The last row of the table above also confirms the repo's `specialization`
  values are right where a slug disagreed with them.

### `/privacy-policy`

Hero, then the existing `PolicyContent` prose retokenized. The legal text is
reproduced verbatim and is not touched, only restyled.

## Theming and responsive behaviour

`--home-*` tokens throughout. The one documented exception is hero content
sitting on a photograph: those keep literal colours (`#2CA6F0`, `#7FCBFF`,
white), because the light theme swaps `--home-accent` to a deep `#0B6FC0` that
sinks into a dark image. Every built hero already does this and says so.

- Theme switching is `ThemedShell`'s `data-theme` plus `ThemeToggleButton`,
  inherited, not reimplemented.
- Header nav collapses to `MobileNavPanel` below 1120px.
- Heroes shorten from `84vh` to `76vh` below 900px.
- Jump cards go four columns to two to one, at 1024px and 640px.
- Wide content (the room amenity rows, the speciality rail, the directory grid)
  reflows rather than scrolling the page body sideways.

## Testing and verification

`npm test` is wired (`node --test` over `src/**/*.test.ts`) and currently passes
194 tests, despite `CLAUDE.md` claiming no test runner is configured. That claim
is stale and gets corrected as part of this work.

New `data/content.ts` + `content.test.ts` per feature, pinning the facts that
must not silently drift:

- the address, both phone numbers and the email, on contact and in the footer
- the four room types, their amenity lists, and the fact that only Standard
  carries a price
- the directory's 71 consultants and 28 specialities, and that no row carries a
  `linkMismatch` field any more
- no em dash in any shipped copy, checked in all four encodings (U+2014,
  `&mdash;`, `&#8212;`, `&#x2014;`), since a search for the bare character alone
  misses entity-encoded ones

Then `npm run lint` and `npm run build`.

## Risks

- **`bookHref` repointing touches eight working pages.** Mitigated by its being
  a one-line change per config file, and by the on-page sections staying
  reachable through jump cards and footer links.
- **Deleting shared components.** `SiteHeader`, `SiteFooter`, `MobileNav`,
  `PageBanner` and `BackToTopButton` must be confirmed to have no remaining
  importer before removal, not assumed.
- **The contact form is the only interactive server path being restyled.** Its
  success, error and pending states each need checking after the retokenization,
  since they are easy to break silently by changing class names.
