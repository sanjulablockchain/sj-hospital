# Network page design

Date: 2026-08-25
Route: `/network`
Reference: `C:\Users\User\Documents\Designs\sj-hospital\SJ Hospital Network.html`
External cross-check: <https://www.ktdoctor.com/network>

## Goal

Build `/network`, the page that explains that St. Joseph Hospital is operated by
Kids & Teens Medical Group in Los Angeles and sits inside a family of nine
companies across two continents. Layout, spacing, motion and hover behaviour
come from the bundled design reference. The nav and footer are the site's own,
shared with the home page, and `Network` in every nav config retargets from the
home page anchor `/#network` to this route.

## What the reference contains

Decoded from line 390 of the bundle (JSON string holding the rendered DOM), with
page data in the inline `<script type="text/x-dc">` and assets on line 378.

Seven blocks, in order:

1. **Hero** (`#top`, `data-fixed-dark`) The dusk exterior render behind a
   `0.14` parallax layer with a 26s Ken Burns drift, a three-stop navy scrim, an
   18s radial sheen, the themed header, a `Home / Our Network` breadcrumb, a
   three-line `h1` stepping solid, outlined, accent, two buttons (the second
   carrying a pulsing accent dot), a four-cell fact strip and an eight-name
   scrolling ticker.
2. **`#jump`** Four shortcut cards in a one-pixel hairline grid, each filling
   solid accent on hover.
3. **`#matters`** (`01 / Why it matters at the bedside`) A `1.3fr / 0.7fr`
   split: an accent-filled panel carrying the argument, and a dark panel listing
   five `In practice` lines.
4. **`#family`** (`02 / The family`) Three named groups, each a hairline
   heading row over a three-column grid of organisation cards. Nine cards total.
5. **`#reach`** (`03 / The numbers`) A fixed-dark band over the ward-round
   photograph at 20% opacity with a `0.12` parallax, a sticky left heading and
   nine figure rows on the right.
6. **`#referrals`** (`04 / Moving between us`) A sticky left heading with a
   call-to-action button, and a seven-row accordion on the right.
7. **`#contact`** (`05 / Get in touch`) An accent panel beside four inverting
   link rows, followed by a rights disclaimer.

Then the site footer.

### Hover and motion spec, taken from the reference's CSS

The reference expresses hovers as inline `style-hover` attribute pairs plus a
small `<style>` block, not as `:hover` rules. The behaviours to reproduce:

| Reference rule | Behaviour |
| --- | --- |
| `[data-org]` | `background 0.32s ease, transform 0.45s cubic-bezier(0.2,0.8,0.2,1)` |
| `[data-org]:hover` | `translateY(-6px)`, background `rgba(44,166,240,0.1)` |
| `[data-org][data-accent="1"]` | `box-shadow: inset 0 3px 0 0 #2CA6F0` |
| `[data-org] [data-org-more]` | starts `opacity 0`, `translateY(8px)` |
| `[data-org]:hover [data-org-more]` | `opacity 1`, `translateY(0)` |
| `[data-org] [data-org-logo]` | `opacity 0.88`, rising to `1` on card hover |
| jump card `style-hover` | `background #2CA6F0`, text `#04122B` |
| contact row `style-hover` | `background #F2F6FF`, text `#060B1F` |
| `[data-open-row][data-open="1"] [data-open-glyph]` | `rotate(45deg)`, `0.35s` |
| `[data-rv]` | fade and rise `32px` over `0.85s cubic-bezier(0.16,0.84,0.28,1)`, sibling delay `90ms` capped at `340ms` |
| `@keyframes sjburns / sjsheen / sjpulse / sjtick / sjup` | already in `globals.css` as `sj-burns`, `sj-sheen`, `sj-pulse`, `sj-tick`, `sj-up` |

Responsive breakpoints from the reference: org grid and jump grid drop to two
columns at 1024px and one at 640px; the `1.3fr / 0.7fr` and `0.85fr / 1.15fr`
splits collapse to one column at 900px, where the sticky columns become static
and the hero's vertical strapline is dropped; the fact strip goes to two columns
at 900px and one at 640px; the numbers rows lose their right-hand `who` column
at 1024px and stack at 900px.

## Content, and what is verified

The reference's copy was checked against <https://www.ktdoctor.com/network>.

**Verified against the group's published page**: all nine companies, their
taglines, their descriptions, their service chips, and the figures used in
`#reach` (25 Kids & Teens clinics in Greater LA, 20+ Serendib Healthways
locations, 50+ board certified doctors, 20+ after-hours urgent care clinics,
Human Compass MSO over 25 years, LA Intensive Pediatric Therapy since 2010, BPO
teams in Sri Lanka and Mexico). This is the first reference in this project whose
substantive content held up, and it holds up because the group publishes it.

**Not verified anywhere**, neither in this repo nor on the group's site:

- The five `In practice` lines in `#matters`: protocols inherited from the group
  and adapted to Sri Lankan guidelines, second opinions from colleagues in the
  United States, one continuous record across countries, prescriptions written
  in generic names, nursing and technician training against group standards.
- All seven `#referrals` answers, including the existence of a referral desk,
  charts being sent ahead of travel, the dengue guideline specifics, how an ACIG
  policy settles at this hospital, the no-fee recruitment assurance, admitting
  rights for consultants in Negombo, Chilaw and Gampaha, and the claim about
  pricing being set for the Sri Lankan market.

Cutting these would remove roughly a third of the page, and unlike the pharmacy
and international care references there is no repo content to replace them with.
So this page follows the **media page precedent**: the copy ships as the
reference wrote it, and `data/content.ts` opens with a notice enumerating every
unverified claim, which `content.test.ts` pins so it cannot quietly disappear.

**One correction**: the reference says the hospital is "twelve minutes from the
international airport". The repo says **ten**, in ten places. Ten wins.

**One replacement**: the reference's own nav invents its item list. It is
replaced with the site's standard nine labels in the standard order, as
`internationalNavigation` documents.

## Architecture

Routing layer stays thin, per the repo's folder rules.

```
src/app/network/
  layout.tsx          ThemedShell flowHeader + FloatingActions
  page.tsx            metadata + <NetworkPage />

src/features/network/
  components/
    NetworkPage.tsx       composes the seven blocks and the footer
    NetworkHero.tsx       #top
    JumpCards.tsx         #jump
    MattersSection.tsx    #matters
    FamilySection.tsx     #family
    OrgCard.tsx           one organisation card
    ReachSection.tsx      #reach
    ReferralSection.tsx   #referrals
    ContactSection.tsx    #contact
  data/
    content.ts            all page copy, opening with the placeholder notice
    content.test.ts       pins the notice and the verified figures
  types.ts
  index.ts                exports NetworkPage only

src/config/networkNavigation.ts   networkNavigation + networkFooterColumns
```

`layout.tsx` copies the international care layout exactly: `ThemedShell` with
`flowHeader` (the header lives inside the hero and scrolls away, so the sticky
anchor offset is cancelled) wrapping the page and `FloatingActions`.

### Shared components reused unchanged

`ThemedShell`, `ThemedHeader`, `ThemedFooter`, `ParallaxLayer`, `Ticker`,
`Reveal`, `RevealStagger`.

### One shared-component change

`FaqAccordion` renders its own `<section id="faq">` with its own heading, so it
cannot be dropped into the `#referrals` two-column split. Rather than copy its
measured-height logic into the network feature, extract the row list into
`src/components/ui/AccordionList.tsx`:

- `AccordionList` owns the `useState(-1)` one-open-at-a-time state, the
  `useId` prefixes, the `ResizeObserver` panel measurement, the `inert`
  collapsed panel and the rotating `+` glyph.
- `FaqAccordion` becomes the section wrapper that composes it, with no change to
  its own public props or rendered output.
- `ReferralSection` composes the same list inside the reference's sticky split.

This keeps one implementation of a fiddly piece of accessible UI. `FaqAccordion`
consumers (the services detail pages, pharmacy, international care) are
untouched.

## Logos

The reference has no logos. Each card carries a 48x48 monogram tile (`SJH`,
`ACIG`, `KTMG`, `SGM`, `LAIPT`, `SH`, `24/7`, `HCM`, `BPO`) beside a text
wordmark. The geometry stays; the monogram is replaced with the real mark.

Sources, all official:

| Company | Source |
| --- | --- |
| St. Joseph Hospital | `public/images/logo-mark.png`, already in the repo |
| ACIG, Asiacorp Insurance Brokers | `public/images/partners/partner-4.png`, already in the repo |
| Kids & Teens Medical Group | `public/images/kids-teens-logo.png`, already in the repo |
| After-Hours Pediatric Urgent Care | `public/images/partners/partner-5.png`, already in the repo |
| Blockchain BPO | `public/images/partners/partner-2.png`, already in the repo |
| Serendib Healthways | `C:\Users\User\Pictures\Logo\serendib-logo.png` |
| St. Gianna Medical Group | `sgmdoctor.com/wp-content/uploads/2024/06/cropped-ST.-GIANNA-logo-final-2-1.png` |
| LA Intensive Pediatric Therapy | `laipt.org/wp-content/uploads/2025/07/image-1-1.png` |
| Human Compass MSO | `humancompassmso.com/wp-content/uploads/2025/08/Untitled-design-1-1.png` |

All nine are normalised into `public/images/network/logos/` as square PNGs sized
for a 48px tile at 3x.

**Deviation from the reference, deliberate.** The reference's tile is
`rgba(242,246,255,0.12)`, a dark chip on the dark card, and the flagship's tile
is filled solid `#2CA6F0`. Four of these marks carry dark or gold lettering on
white (Kids & Teens, St. Gianna, Human Compass MSO, Blockchain BPO) and would be
illegible on either. The tile therefore becomes a solid light chip in both
themes, and the flagship's accent-filled tile is dropped. The card-level
flagship marker, the 3px accent inset along the card's top edge, is unchanged and
still distinguishes St. Joseph Hospital and Kids & Teens from the other seven.

The reference's `[data-org-logo]` opacity lift (0.88 to 1 on card hover) is kept.

Logos are third-party marks, which is what the disclaimer at the foot of
`#contact` covers: company names, logos and figures belong to the respective
group companies and are shown as published by them. `docs/image-credits.md`
gains a row per downloaded mark.

## Data shapes

```ts
type JumpCard   = { count: string; label: string; note: string; href: string };
type FactRow    = { k: string; v: string };
type Org        = {
  slug: string;            // logo filename and React key
  logo: string;            // /images/network/logos/<slug>.png
  wordmark: string;        // short name beside the logo
  badge: string;           // "You are here", "Flagship, our parent", ...
  name: string;
  tagline: string;
  body: string;
  chips: string[];
  cta: string;             // "acig.lk", "ktdoctor.com", "This hospital"
  href?: string;           // absent for St. Joseph, which is this site
  flagship?: boolean;      // drives the 3px accent inset top
};
type OrgGroup   = { name: string; note: string; orgs: Org[] };
type ReachRow   = { n: string; k: string; who: string };
type ContactRow = { label: string; href: string; glyph: "phone" | "arrow" };
```

Group order follows the reference: Sri Lanka first (this hospital, then ACIG),
then paediatric and family care in California (five companies), then business and
support (two). Putting the reader's own hospital first is the point of the
ordering and is kept.

## Nav wiring

`Network` currently resolves to `/#network` in `facilitiesNavigation`,
`healthTipsNavigation`, `internationalNavigation`, `pharmacyNavigation` and
`servicesNavigation` (twice), and to `#network` in `homeNavigation`. All become
`/network`, except `homeNavigation`, whose `Network` item keeps pointing at the
home page's own `#network` teaser section since that is a same-page anchor.

`networkNavigation` carries the same nine labels; its own `Network` item points
at `#family`, the first of this page's own sections, matching how
`internationalNavigation` points `International Patient Care` at `#journey`.

The home page's `NetworkSection` stays as a teaser. Its heading gains a link
through to `/network`.

## Testing

No test runner is configured for components, so `content.test.ts` follows the
sibling pages' `node:test` pattern and covers the things that can silently rot:

1. The placeholder notice exists and names each unverified claim area.
2. Nine organisations across three groups, and the ticker lists all eight
   external company names.
3. Every jump card `href` matches a section id the page actually renders, and
   each card's `count` agrees with the list it points at (`9 companies`,
   `7 answers`).
4. Every `#reach` figure and every organisation tagline, description and chip
   list matches what ktdoctor.com publishes, recorded as expected values so a
   later edit that drifts from the source fails.
5. Every logo path points at a file under `public/images/network/logos/`.
6. No copy on the page contains an em dash in any of its four encodings, and the
   airport distance is never stated as twelve minutes.

`npm run lint` and `npm run build` must both pass.

## Out of scope

- Any change to the nine companies' own content beyond what they publish.
- The insurer and affiliate marks sitting in `C:\Users\User\Pictures\Logo`
  (Cedars-Sinai, CHLA, Providence, Optum, Molina, LA Care) and
  `public/images/partners/partner-3.png` (ABC Labs). None appear on the
  reference and none are group companies.
- Replacing the home page's `#network` accordion.
