# Service Book page: design

Date: 2026-11-19
Status: awaiting approval
Source file: `C:\Users\User\Documents\Web data\sj-hospital\Data\STJ_Booklet_Final.pdf` (outside the repo)

## Intent

The hospital has a printed "Service Book" (services, 2026 laboratory price list, doctor directory, patient guide). The owner wants visitors to **read it on the website**. Downloading and printing are secondary.

## What the source file is

- 41 pages, A4 landscape (297 x 210 mm), 136 MB.
- Every page is one flattened 3508 x 2480 JPEG (about 3.3 MB each). There is **no text layer**: not searchable, not readable by screen readers, not indexable.
- The content is mostly English with some Sinhala lines. One edition for every locale.

Measured: a page re-encoded to 2000 x 1414 WebP at quality 75 to 85 weighs **70 to 150 KB**, and the dense price tables stay sharp when zoomed. The whole book comes to about 4.5 MB, loaded a page at a time.

## Goals

- A new page, `/service-book` (and `/si/service-book`, `/ta/service-book`), where the book reads comfortably at 375, 768 and 1280 px, in light and dark themes.
- Fast on a slow phone connection: the first page appears quickly, and the rest load only when needed.
- Readers can jump straight to a chapter, and zoom into the price and doctor tables.
- A page can be shared as a link to that exact page (e.g. the lab fees page on WhatsApp).
- A smaller PDF download for people who want the file.

## Non-goals

- Page-curl "flipbook" effects.
- Extracting or retyping the booklet's text (OCR). The live Laboratory Tests and Doctor directory pages already hold that content as real text.
- A Sinhala or Tamil edition of the booklet itself (only the page around it is translated).
- PDF.js, hosted viewers (Issuu, FlipHTML5), iframes, or any new dependency.

## Anti-goals

- Shipping the 136 MB file, or anything over the 300 KB image limit.
- A viewer that only works with a mouse, or that traps keyboard or screen reader users.
- Readers trusting a stale price in the booklet over the live price list without being told which is current.

## Approaches considered

1. **Built-in page viewer over optimized page images** (chosen by the owner). Each page becomes a WebP served through `next/image`. A small client component handles paging, chapters, thumbnails, full screen and zoom. It needs no dependencies and follows every image and security rule.
2. **Browser PDF embed** (iframe or object). Rejected: iOS shows only the first page, many Android browsers just download the file, it needs the giant file or a recompressed one, and it is an iframe.
3. **Flipbook library or hosted flipbook service.** Rejected: hosted services add third-party scripts and tracking (banned without approval), and the libraries add weight and handle touch poorly on phones.

## Design

### Assets

- `public/images/service-book/2026/page-01.webp` to `page-41.webp`: 2000 px wide, WebP, quality chosen so every file stays under 300 KB (expected 70 to 150 KB). They are rendered through `next/image` from static imports, so production serves AVIF and WebP at the right width and gets a blur placeholder for free.
- `public/downloads/sj-service-book-2026.pdf`: the book recompressed (about 150 dpi JPEG), target under 10 MB. The download button shows its actual size.
- The year sits in the folder and file names, so a 2027 edition gets new filenames and cached copies don't linger.
- The conversion is a one-off. `docs/service-book.md` records the source file, the settings and the steps, so the next edition can be produced the same way. No Python tooling is added to the repo.

### Chapters (PDF page ranges, from the book's own contents page)

| Chapter | Pages |
|---|---|
| Welcome (cover, welcome, chairman's message, contents) | 1 to 4 |
| About St. Joseph Hospital | 5 to 7 |
| Our services | 8 to 18 |
| Laboratory services and fees | 19 to 30 |
| Our doctors and booking | 31 to 37 |
| Patient guide | 38 to 41 |

### Page layout (top to bottom)

1. **Hero**: the fixed-dark, photo-backed band used by the other pages (brand literals per the existing pattern), with the title "Service Book 2026", a one-line summary, and the "Download PDF (x MB)" button.
2. **Viewer** (themed, `--home-*` tokens):
   ```
   [Welcome] [About] [Services] [Lab fees] [Doctors] [Patient guide]   chapter tabs, horizontal scroll on phones
   +-----------------------------------------------------------+
   | <  |                 page image (3:2)                 |  > |   arrows beside the page from 900 px up
   +-----------------------------------------------------------+
        Page 21 of 41      [ Full screen ]   (< and > here on phones, 44 px targets)
   [thumb][thumb][thumb][thumb][thumb] ...                          thumbnail strip, scrolls sideways
   ```
   - Next and previous via buttons, swipe on touch, and the left and right arrow keys when the viewer has focus.
   - The current chapter tab is highlighted as the reader pages through.
   - The URL hash tracks the page (`#page-21`); opening such a link lands on that page. Out-of-range or malformed hashes fall back to page 1.
   - **Full screen** opens an overlay holding just the page, with zoom in and out buttons (1x, 2x, 3x), panning by drag or scroll, and pinch zoom allowed. On a phone, rotating to landscape gives the page the whole screen. Escape or the close button exits.
   - Page changes use a short opacity transition, switched off under `prefers-reduced-motion`.
3. **Edition note**: "2026 edition. Prices and the doctor list change during the year; the Laboratory Tests page and the Doctor directory are always current." The two links go to `/laboratory-tests` and `/e-channeling#directory`.
4. **What's inside**: one short text block per chapter, each with "Open in the book" (jumps the viewer to that chapter) and a link to the live page (`/about-us`, `/services`, `/laboratory-tests`, `/e-channeling`, `/contact-us`). Screen reader users and search engines get the substance here, since the page images have no text.

### Loading

- Page 1 is the only image with `preload`. The pages either side of the current one are rendered eagerly so paging feels instant. Everything else, thumbnails included, lazy loads.
- Thumbnails use a small `sizes` value, so they come down at roughly 200 px wide.

### Accessibility

- Every page has alt text summarising what is on it (e.g. "Laboratory fees: blood count and clotting tests, 31 tests with sample, report time and price").
- The viewer is a labelled region with a polite live region announcing "Page 21 of 41, Laboratory services and fees".
- All controls are real buttons with labels, 44 px minimum, with visible focus.
- The full screen overlay reuses `Modal` from `@/components/ui` (focus trap, Escape, return focus).

### Code layout

- `src/app/[locale]/service-book/layout.tsx` and `page.tsx`: thin, following `pharmacy/` (ThemedShell brand palette, FloatingActions, metadata via `getPageMetadataEntry`, `localeAlternates`). Also `loading.tsx` and `error.tsx`.
- `src/features/service-book/`
  - `components/ServiceBookPage.tsx`, `ServiceBookHero.tsx`, `EditionNote.tsx`, `ChapterGuide.tsx`: server components.
  - `components/BookViewer.tsx`: the one `'use client'` leaf (paging, hash, swipe, keys, thumbnails, full screen and zoom).
  - `data/pages.ts`: the 41 static imports with alt text and chapter; `data/chapters.ts`; `data/content.ts` plus `content.si.ts` / `content.ta.ts` overlays with the `__review` marker; `getContent.ts`.
  - `lib/pageHash.ts`: parse and format `#page-N`, clamped (pure, unit tested).
  - `index.ts`.
- Wiring: a `serviceBook` entry in `pageMetadata.ts` (+ `.si` / `.ta`), `/service-book` in `sitemap.ts`, a link in the Patient Care mega menu and in the footer, with labels in `navigationLabels` (+ overlays). A "See it in the Service Book" link from the Laboratory Tests page is optional; the builder decides.

### Tests

- Manifest: exactly 41 pages, every page in exactly one chapter, chapters contiguous and in order, alt text present and free of dash punctuation.
- `pageHash`: valid, out-of-range, zero, negative, non-numeric and empty hashes.
- i18n overlay tests in the style of the existing `content.i18n.test.ts`.
- Then lint, `npm test`, `npm run check`, `npm run build`, and a visual check at 375 / 768 / 1280 in both themes.

## Decisions taken without the owner (can be changed)

- URL `/service-book`; nav placement under Patient Care and in the footer.
- The edition note pointing to the live price list and doctor directory.
- Shareable `#page-N` links.
- Download PDF at roughly 150 dpi, under 10 MB, committed to the repo (adds about 15 MB of binaries to git history together with the WebP pages).

## Left to the builder

- Exact WebP quality per page, within the 300 KB limit.
- Exact alt text wording and the per-chapter summaries (English first, overlays marked for review).
- Swipe threshold and the zoom panning mechanics.

Work happens in a worktree, `worktree-service-book`, and is not merged until the owner confirms.

## Revision, 2026-11-19: a separate manga style reader

The owner will print a QR code pointing at `/service-book`, and people will
scan it on their phones to read the book. They asked for the reading to feel
like a manga reader. Approved design:

### Intro page `/service-book` (the QR target)

- The hero stays; its main button becomes "Read now" and opens the reader.
- The inline viewer is removed (two readers would compete). In its place,
  "Inside the book": six chapter cards, each with the chapter's opening page,
  the summary, "Read this chapter" (opens the reader at that chapter) and the
  live page link. This merges the old viewer and "What's inside".
- Edition note and footer stay.

### Reader `/service-book/read` (en, si, ta)

- No site header, footer or floating buttons. A slim top bar: back to the
  intro page, the title, a chapter menu, "Page N of 41", the mode switch.
- **Scroll mode** (default on a phone held upright): all 41 pages stacked
  full width, read by scrolling, native pinch zoom. The top bar hides on
  scroll down and returns on scroll up or a tap. A thin progress bar at the
  bottom.
- **Page mode** (default in landscape, tablet and desktop): one page fitted
  to the screen. Tap or click the right third for next, the left third for
  previous, the middle to show or hide the bars. Arrow keys and swipe. Zoom
  1x, 2x, 3x with panning.
- A Scroll / Pages switch overrides the default; the choice is remembered in
  `localStorage` (a per viewer convenience, safe if storage is blocked).
- Resume: the last page read is remembered and reopened, with a "Start from
  page 1" button. A `#page-N` link always wins over the remembered page.
- Pages load just ahead of the reader (lazy loading with the next pages
  eager), so scrolling never waits on a blank page.
- Follows the light and dark theme.

### QR code

SVG (for print) and PNG for `https://sjhospital.lk/service-book`, error
correction level M, committed under `docs/qr/`.

### Routing note

The two pages need different shells, so the route is split with a route
group: `service-book/(intro)/` carries the themed shell with the header,
`service-book/read/` a headerless shell (`ThemedShell header="none"`). The
header reachability test learns that route groups add no URL segment, and
exempts the reader, which is reached from its intro page and the QR code
rather than the menu.
