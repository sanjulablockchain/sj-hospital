# Service Book Reader Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move reading off the intro page into a full screen, manga style reader at `/service-book/read`, and produce the print QR code.

**Architecture:** Route group split (`(intro)` with the site shell, `read` with a headerless shell). One `'use client'` leaf, `BookReader`, owns both modes; pure helpers (mode choice, stored page) are unit tested. The intro page loses `BookViewer` and gains `InsideTheBook`.

**Tech Stack:** as the first plan. QR made once with Python `segno` from the scratchpad.

**Spec:** `docs/superpowers/specs/2026-11-19-service-book-design.md` (Revision section)

## Global Constraints

As in `2026-11-19-service-book.md`, plus: `localStorage` reads and writes wrapped in try/catch; the reader renders correctly without storage.

## Review Focus

1. A `#page-N` link must win over the remembered page (shared links land where they point). Pinned in `readerState.test.ts`.
2. A corrupt stored value (`"abc"`, `"99"`, `"0"`, mode `"sideways"`) must fall back to page 1 and the default mode. Pinned in `readerState.test.ts`.
3. Scroll mode must not hijack Back: page changes update the hash with `replaceState`. Review of Task 2.
4. In page mode the middle tap must not turn the page, and taps on the bars must not reach the tap zones. Browser check in Task 4.
5. Rotating a phone with no saved mode switches modes and keeps the current page. Browser check in Task 4.

---

### Task 1: Reader state helpers
- Create `src/features/service-book/lib/readerState.ts`: `type ReaderMode = "scroll" | "pages"`; `defaultMode(width: number, height: number): ReaderMode` (scroll when `width < 900 && height > width`); `parseStoredMode(value: string | null): ReaderMode | null`; `parseStoredPage(value: string | null, count: number): number | null` (integer 1..count else null); `initialPage(hash: string, stored: number | null, count: number): { page: number; resumed: boolean }` (a `#page-N` hash wins, then stored if > 1, else 1).
- Test `readerState.test.ts`: portrait phone 375x812 gives scroll; 812x375 gives pages; 1280x900 gives pages; 768x1024 gives scroll; stored modes; stored pages `"21"` 21, `"abc"` `"0"` `"99"` `"2.5"` null; `initialPage("#page-20", 31, 41)` 20 not resumed; `initialPage("", 31, 41)` 31 resumed; `initialPage("", 1, 41)` 1 not resumed; `initialPage("", null, 41)` 1.
- Commit `feat(service-book): reader mode and resume helpers`.

### Task 2: BookReader and the reader route
- `ThemedShell` gains `header="none"`.
- Content: `reader` labels (English chrome: back, title, chapters, pageOf, scroll, pages, previous, next, zoomIn, zoomOut, startOver, close, progress, regionLabel, showControls); `viewer` removed.
- `BookReader.tsx` ('use client'): props `{ labels, backHref, chapters, pages, images }`. Scroll mode: stacked `next/image` per page (first two eager, page 1 `preload`, rest lazy), `IntersectionObserver` on pages to track the current page, top bar hides on scroll down past 24 px and returns on scroll up; tapping a page toggles bars. Page mode: fixed stage, three tap zones, swipe, keys, zoom with drag pan (from `BookViewer`). Chapter menu: a themed panel listing chapters with page ranges. Progress bar. Resume chip.
- Routes: move intro files into `service-book/(intro)/`; add `service-book/read/layout.tsx` (headerless shell, alternates for `/service-book/read`) and `page.tsx` (metadata `serviceBookReader`).
- Nav test: route groups add no segment; exempt `/service-book/read` with its reason.
- Commit `feat(service-book): full screen manga style reader`.

### Task 3: Intro page
- Remove `BookViewer` and the `#read` section; hero "Read now" links to the reader; `InsideTheBook` cards (opening page image, summary, "Read this chapter" to `/service-book/read#page-N`, live link); edition note after; footer "Read the book" to the reader. Overlays updated for the new intro sentence.
- Commit `feat(service-book): intro page leads into the reader`.

### Task 4: QR and verification
- `docs/qr/service-book-qr.svg` and `.png` (1200 px, quiet zone 4) for `https://sjhospital.lk/service-book`; verify by decoding.
- Lint, test, check, build; browser checks at 375x812, 812x375, 768x1024, 1280x900 in both themes, the five Review Focus items.
- Commit `docs(service-book): print QR code for the service book`.
