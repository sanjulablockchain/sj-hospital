# Service Book Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A `/service-book` page (en, si, ta) where visitors read the hospital's 41 page Service Book in a built-in viewer, with chapters, thumbnails, full screen zoom, shareable `#page-N` links and a PDF download.

**Architecture:** The PDF is converted once into 41 WebP page images (static imports, so `next/image` gives AVIF/WebP and blur) plus a recompressed PDF. A new `features/service-book` owns copy, the page manifest and one `'use client'` leaf (`BookViewer`); everything else is Server Components. Routing, metadata, sitemap and the header follow the pharmacy and laboratory pages.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4, `node --test`. No new dependencies. PyMuPDF and Pillow run once from the session scratchpad for the conversion; they are not added to the repo.

**Spec:** `docs/superpowers/specs/2026-11-19-service-book-design.md`

## Global Constraints

- Every raster under `public/images` at most 300 KB; images only via `next/image`; no external image URLs.
- No dash punctuation in any visible string (alt text included); `npm run check:dashes`.
- Colours from `--home-*` tokens; the hero is the one fixed-dark band with brand literals (`#0B0826` base, `#9FD6F5` eyebrow), as in `PharmacyHero`.
- Register rule (`docs/superpowers/i18n-register-rule.md`): hero, eyebrows, headings, CTA and control labels, footer and `<title>` stay English; body paragraphs and the meta description translate. Overlays carry `__review` as draft.
- Tap targets at least 44 px; check 375, 768, 1280 in both themes; no horizontal scroll.
- Only page 1 gets `preload`; motion has a `prefers-reduced-motion` bail-out.
- Build with `env -u NODE_ENV` (the shell exports `NODE_ENV=development`).

## Review Focus

1. A shared link with a bad hash (`#page-0`, `#page-99`, `#page-abc`, `#page-`) must open page 1 (or clamp to 41), never a blank viewer. Pinned in Task 2.
2. Pressing Back after paging should leave the page, not step through 41 history entries: the hash is updated with `history.replaceState`, never `pushState`. Pinned by review of Task 4.
3. Arrow keys must not hijack page scrolling or text inputs elsewhere: they act only while focus is inside the viewer. Pinned by review of Task 4.
4. Full screen zoom on a phone must allow panning to every edge of the zoomed page and closing with Escape or the close button, returning focus to the trigger. Pinned by the visual check in Task 6.
5. The chapter tab highlighted must always match the page shown, including after a hash jump or a thumbnail click. `chapterForPage` is unit tested in Task 2.

---

### Task 1: Page images, download PDF and conversion record

**Files:**
- Create: `public/images/service-book/2026/page-01.webp` to `page-41.webp`
- Create: `public/downloads/sj-service-book-2026.pdf`
- Create: `docs/service-book.md`

- [ ] **Step 1:** In the scratchpad, render each PDF page at 2000 x 1414 (Lanczos), save WebP at quality 82, stepping down by 5 for any page over 290 KB.
- [ ] **Step 2:** Write the download PDF: each page re-embedded as a 1600 px wide JPEG at quality 72, A4 landscape page size kept. Target under 10 MB.
- [ ] **Step 3:** `npm run check:images`: expected PASS. Record largest page size and PDF size.
- [ ] **Step 4:** `docs/service-book.md`: source path, the settings above, the script (inline), and the rule that a new edition gets a new year folder and filename.
- [ ] **Step 5:** Commit `feat(service-book): add optimized booklet pages and download PDF`.

### Task 2: Chapters, page manifest and hash helpers

**Files:**
- Create: `src/features/service-book/data/chapters.ts`, `data/pages.ts`, `data/pages.test.ts`
- Create: `src/features/service-book/lib/pageHash.ts`, `lib/pageHash.test.ts`
- Create: `src/features/service-book/types.ts`

**Interfaces (Produces):**
- `type ChapterId = "welcome" | "about" | "services" | "lab" | "doctors" | "guide"`
- `type Chapter = { id: ChapterId; label: string; first: number; last: number }`
- `chapters: readonly Chapter[]` with labels Welcome, About, Services, Lab fees, Doctors, Patient guide and ranges 1-4, 5-7, 8-17, 18-30, 31-37, 38-41 (printed order; see Task 1 fix).
- `type BookPage = { number: number; alt: string }`; `bookPages: readonly BookPage[]` (41 entries; pure data, no image imports so `node --test` can load it).
- `PAGE_COUNT = 41`
- `chapterForPage(page: number): Chapter`
- `parsePageHash(hash: string, count: number): number` (accepts `"#page-21"` or `"page-21"`, returns 1 when malformed or below 1, `count` when above)
- `formatPageHash(page: number): string` returns `"#page-21"`

- [ ] **Step 1: Failing tests**
  - `pages.test.ts`: `bookPages.length === 41`; numbers are 1..41 in order; every alt non-empty, at least 25 chars, unique, and free of U+2014, U+2013 and `" - "`; chapters contiguous from 1 to 41 in order with no gaps; `chapterForPage(1).id === "welcome"`, `(19).id === "lab"`, `(30).id === "lab"`, `(31).id === "doctors"`, `(41).id === "guide"`.
  - `pageHash.test.ts`: `parsePageHash("#page-21", 41) === 21`; `"page-7"` gives 7; `""`, `"#"`, `"#page-"`, `"#page-abc"`, `"#page-0"`, `"#page--3"`, `"#top"` give 1; `"#page-99"` gives 41; `"#page-2.5"` gives 1; `formatPageHash(21) === "#page-21"`.
- [ ] **Step 2:** `npm test` fails (modules missing).
- [ ] **Step 3:** Implement. Alt text describes each page from its contents (e.g. "Laboratory fees, diabetes and blood sugar tests, with sample, report time and price in LKR").
- [ ] **Step 4:** `npm test` passes.
- [ ] **Step 5:** Commit `feat(service-book): chapters, page manifest and page link helpers`.

### Task 3: Copy, overlays, metadata and footer

**Files:**
- Create: `src/features/service-book/data/content.ts`, `content.si.ts`, `content.ta.ts`, `content.test.ts`, `content.i18n.test.ts`, `getContent.ts`
- Create: `src/config/serviceBookNavigation.ts`
- Modify: `src/config/pageMetadata.ts`, `pageMetadata.si.ts`, `pageMetadata.ta.ts` (add `serviceBook`)
- Modify: `src/config/navigationLabels.si.ts`, `.ta.ts` only for footer labels/headings the tests demand

**Interfaces (Produces):** `getServiceBookContent(locale): Promise<ServiceBookContent>` where `ServiceBookContent = typeof import("./content")` with exports:
- `hero` (English only): `strapline`, `breadcrumbHome`, `breadcrumbCurrent`, `headingLead: "Service Book"`, `headingAccent: "2026 edition"`, `readCta: "Start reading"`, `downloadCta: "Download PDF"`
- `heroStandfirst` (English): what is inside, one sentence.
- `heroFacts` (English): Pages 41, Chapters 6, Laboratory tests 323, Specialists 74 (figures as printed in the 2026 book).
- `download: { href: "/downloads/sj-service-book-2026.pdf", size: "<measured> MB" }`
- `viewer` (English control labels): `previous`, `next`, `fullScreen`, `close`, `zoomIn`, `zoomOut`, `pageOf: "Page {page} of {count}"`, `chaptersLabel`, `thumbnailsLabel`, `regionLabel`.
- `sectionEyebrows: { read, inside }`, `readHeading`, `insideHeading` (English)
- `editionNote` (translated): one paragraph; links `{ label, href }[]` to `/laboratory-tests` and `/e-channeling#directory` (labels English).
- `insideIntro` (translated) and `chapterGuide: { id: ChapterId; summary: string; link: { label: string; href: string } }[]`, six entries in chapter order; summaries translated, links English: about `/about-us`, services `/services`, lab `/laboratory-tests`, doctors `/e-channeling`, guide `/contact-us`, welcome `/about-us`.

- [ ] **Step 1: Failing tests**: `content.test.ts`: `chapterGuide` ids equal `chapters` ids in order; `download.href` ends `.pdf` and starts `/downloads/`; every internal link href starts with `/`; `viewer.pageOf` contains `{page}` and `{count}`. `content.i18n.test.ts` in the pharmacy style: si and ta parity for translatable paths, with hero, heroFacts, heroStandfirst, sectionEyebrows, headings, viewer, every `.label`, `.href`, `.id`, `.size` untranslatable. Page metadata parity tests already cover the new key once added.
- [ ] **Step 2:** `npm test` fails.
- [ ] **Step 3:** Implement copy, draft si/ta overlays (code mixed register, `__review` draft), `getContent.ts` like pharmacy's, `serviceBookFooterColumns` (column "Service book": Read the book `#read`, What's inside `#inside`, Laboratory tests `/laboratory-tests`, Doctor directory `/e-channeling#directory`; plus the shared "Hospital" column), `serviceBook` metadata (title `"Service Book | St. Joseph Hospital Negombo"`, description translated).
- [ ] **Step 4:** `npm test` passes, `npm run check:dashes` passes.
- [ ] **Step 5:** Commit `feat(service-book): page copy, translations, metadata and footer`.

### Task 4: BookViewer client component

**Files:**
- Create: `src/features/service-book/data/pageImages.ts` (41 static imports, `pageImages: readonly StaticImageData[]`, index = page number minus 1)
- Create: `src/features/service-book/components/BookViewer.tsx` (`'use client'`)
- Modify: `src/components/ui/Modal.tsx`: add size `viewer` (full viewport, no radius or border, scroll container `h-full`)

**Interfaces:** `BookViewer({ labels, chapters, pages, images, guideJumpEvent? })` where `labels = ServiceBookContent["viewer"]`, `chapters: readonly Chapter[]`, `pages: readonly BookPage[]`, `images: readonly StaticImageData[]`. It reads and writes the hash itself and listens to `hashchange`, so "Open in the book" links elsewhere on the page are plain `#page-N` anchors.

Behaviour (each a decision the spec fixed):
- State: current page from `parsePageHash(location.hash)` on mount and on `hashchange`; on change, `history.replaceState(null, "", formatPageHash(page))` (never push).
- Main image: `next/image` with `placeholder="blur"`, `sizes="(min-width: 1440px) 1300px, 100vw"`; page 1 `preload` only when it is the initial page; the previous and next pages render hidden with `loading="eager"`.
- Arrows: beside the page from `min-[900px]`; below it on phones with the counter between; all 44 px.
- Keys: ArrowLeft/ArrowRight handled on the viewer root's `onKeyDown` (so only while focus is inside); root has `tabIndex={0}` and a visible focus ring.
- Swipe: pointer events on the page; horizontal travel over 50 px and greater than vertical travel turns the page.
- Chapter tabs: buttons, `aria-pressed` on the active chapter (`chapterForPage`), horizontal scroll on phones.
- Thumbnails: buttons with `sizes="160px"`, lazy, the active one outlined and scrolled into view (`scrollIntoView({ block: "nearest", inline: "center" })`, `behavior: "auto"` under reduced motion).
- Live region: `aria-live="polite"` with `pageOf` filled plus the chapter label.
- Page change: opacity transition 200 ms, `motion-reduce:transition-none`.
- Full screen: `Modal` size `viewer`, surface `themed`, custom chrome (close, zoom out, zoom in, counter, prev, next). Zoom steps 1, 2, 3. At zoom > 1 the image is rendered at `zoom * 100%` width inside an `overflow-auto` box (pan by scroll, touch drag and `touch-action: pan-x pan-y pinch-zoom`); at 1 it fits contain. `sizes="300vw"` so zoom stays sharp.

- [ ] **Step 1:** Implement `pageImages.ts`, the Modal size and `BookViewer`.
- [ ] **Step 2:** `npx tsc --noEmit` and `npx eslint src/features/service-book src/components/ui/Modal.tsx`: clean.
- [ ] **Step 3:** Commit `feat(service-book): book viewer with chapters, thumbnails and zoom`.

### Task 5: Page, route, sitemap and header

**Files:**
- Create: `src/features/service-book/components/ServiceBookPage.tsx`, `ServiceBookHero.tsx`, `EditionNote.tsx`, `ChapterGuide.tsx`; `src/features/service-book/index.ts`
- Create: `src/app/[locale]/service-book/layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`
- Modify: `src/app/sitemap.ts` (add `"/service-book"`), `src/config/megaNavigation.ts` (Patient Care footer link `{ label: "Service book", href: "/service-book" }`), `src/features/laboratory/...` optional link (builder's call)

- [ ] **Step 1:** Hero: fixed-dark band, breadcrumb, `<h1>`, standfirst, `Start reading` (anchor `#read`) and `Download PDF (size)` (`download` attribute), fact strip; on the right from `min-[900px]` the cover (`pageImages[0]`) tilted with a shadow, `preload`. Below 900 px the cover is hidden (page 1 is the first thing in the viewer right after).
- [ ] **Step 2:** `#read` section: eyebrow, heading, `BookViewer`, then `EditionNote`. `#inside` section: `ChapterGuide`, six cards, each with "Open in the book" (`href={formatPageHash(chapter.first)}`) and the live page link via `LocaleLink`.
- [ ] **Step 3:** Route files following `pharmacy/`; `loading.tsx` a themed skeleton; `error.tsx` a client error boundary with a retry button.
- [ ] **Step 4:** `npm test` (header reachability test now covers `/service-book`), `npx eslint src`, `npx tsc --noEmit`: all pass.
- [ ] **Step 5:** Commit `feat(service-book): service book page, route, sitemap and header link`.

### Task 6: Verification

- [ ] `npm run lint`-equivalent `npx eslint src scripts`, `npm test`, `npm run check`, `env -u NODE_ENV npm run build`: all pass.
- [ ] Dev server from the worktree, Playwright screenshots at 375, 768, 1280 in light and dark for `/service-book`, `/si/service-book`, plus: `#page-21` deep link, next/prev, a chapter tab, full screen at zoom 2 on 375 px, no horizontal scroll (`scrollWidth <= innerWidth`).
- [ ] Fix anything found; commit; working tree clean.
