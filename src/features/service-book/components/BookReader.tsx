"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Modal } from "@/components/ui/Modal";
import { ThemeToggleButton } from "@/components/theme/ThemeToggleButton";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  CloseIcon,
  ListIcon,
  RowsIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@/components/ui/Icons";
import type { ServiceBookContent } from "../data/getContent";
import type { BookPage, Chapter } from "../types";
import { formatPageHash } from "../lib/pageHash";
import {
  defaultMode,
  initialPage,
  parseStoredMode,
  parseStoredPage,
  type ReaderMode,
} from "../lib/readerState";

type Props = {
  labels: ServiceBookContent["reader"];
  backHref: string;
  chapters: readonly Chapter[];
  pages: readonly BookPage[];
  images: readonly StaticImageData[];
};

const PAGE_KEY = "sj-service-book-page";
const MODE_KEY = "sj-service-book-mode";
const ZOOM_STEPS = [1, 2, 3] as const;
/** A horizontal swipe has to travel this far, and further than it moves vertically, to turn the page. */
const SWIPE_PX = 50;
/** Scroll this far in one direction before the bar hides or returns, so a wobbling thumb does not flicker it. */
const BAR_SCROLL_PX = 12;

/** `localStorage` can throw (private windows, blocked site data); the reader works without it. */
const store = {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // A reader without storage just starts at page 1 next time.
    }
  },
};

const fill = (template: string, values: Record<string, number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

const chapterOf = (chapters: readonly Chapter[], page: number) =>
  chapters.find((chapter) => page <= chapter.last) ?? chapters[chapters.length - 1];

const barButton =
  "inline-flex h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full px-2.5 text-[14px] font-bold text-[var(--home-heading)] transition-colors hover:bg-[var(--home-accent-tint)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-accent)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent";

/**
 * The Service Book as a full screen reader, after the manga and webtoon apps.
 *
 * Two modes. **Scroll**: every page stacked full width, read with the thumb,
 * pinch to zoom; the default on a phone held upright, where a landscape page
 * one at a time would leave most of the screen empty. **Pages**: one page
 * fitted to the screen with tap zones (left third back, right third on,
 * middle shows or hides the bars), swipe, arrow keys and zoom; the default
 * on anything wider. A reader's own choice is remembered and beats the
 * default; without one, turning the phone switches modes on the same page.
 *
 * The page lives in the hash (`#page-21`), written with `replaceState` so
 * Back leaves the reader instead of stepping through every page, and the
 * last page read is remembered so the book reopens where it was left.
 *
 * Server rendered in scroll mode, the QR code case, so a phone gets the
 * first page without waiting for script; a wider screen switches to pages
 * on mount.
 */
export function BookReader({ labels, backHref, chapters, pages, images }: Props) {
  const count = pages.length;
  const [mode, setMode] = useState<ReaderMode>("scroll");
  const [modeChosen, setModeChosen] = useState(false);
  const [page, setPage] = useState(1);
  const [barsShown, setBarsShown] = useState(true);
  const [resumedFrom, setResumedFrom] = useState<number | null>(null);
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [zoom, setZoom] = useState<(typeof ZOOM_STEPS)[number]>(1);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  /** Set while the reader scrolls itself to a page, so the observer does not fight it. */
  const jumping = useRef(false);
  // The latest page and mode, for listeners that outlive a render.
  const pageRef = useRef(page);
  const modeRef = useRef(mode);
  useEffect(() => {
    pageRef.current = page;
    modeRef.current = mode;
  }, [page, mode]);

  const record = useCallback((next: number) => {
    window.history.replaceState(window.history.state, "", formatPageHash(next));
    store.set(PAGE_KEY, String(next));
  }, []);

  const scrollToPage = useCallback((target: number) => {
    const element = pageRefs.current[target - 1];
    if (!element) return;
    jumping.current = true;
    element.scrollIntoView({ block: "start", behavior: "instant" });
    window.setTimeout(() => (jumping.current = false), 120);
  }, []);

  /** Go to a page in either mode: the one entry point for buttons, keys, taps and the chapter menu. */
  const goTo = useCallback(
    (target: number, currentMode: ReaderMode = mode) => {
      const next = Math.min(Math.max(target, 1), count);
      setResumedFrom(null);
      setPage(next);
      setZoom(1);
      record(next);
      if (currentMode === "scroll") scrollToPage(next);
    },
    [count, mode, record, scrollToPage]
  );

  // On mount: the mode (stored, else from the screen) and the opening page
  // (a shared link, else where the reader left off). These live only in the
  // browser, so they are read in the first frame after hydration, which is
  // also when the stacked pages have the layout a scroll to page N needs.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const storedMode = parseStoredMode(store.get(MODE_KEY));
      const startMode = storedMode ?? defaultMode(window.innerWidth, window.innerHeight);
      const start = initialPage(window.location.hash, parseStoredPage(store.get(PAGE_KEY), count), count);
      setModeChosen(storedMode !== null);
      setMode(startMode);
      setPage(start.page);
      if (start.resumed) setResumedFrom(start.page);
      if (start.page > 1) {
        record(start.page);
        if (startMode === "scroll") scrollToPage(start.page);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [count, record, scrollToPage]);

  // Turning the phone switches modes, unless the reader picked one.
  useEffect(() => {
    if (modeChosen) return;
    const onResize = () => {
      const next = defaultMode(window.innerWidth, window.innerHeight);
      if (next === modeRef.current) return;
      setZoom(1);
      setBarsShown(true);
      setMode(next);
      if (next === "scroll") window.requestAnimationFrame(() => scrollToPage(pageRef.current));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [modeChosen, scrollToPage]);

  // Scroll mode: the page crossing the middle of the screen is the current one.
  useEffect(() => {
    if (mode !== "scroll") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (jumping.current) return;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const next = Number((entry.target as HTMLElement).dataset.page);
          if (next !== pageRef.current) {
            setPage(next);
            record(next);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    for (const element of pageRefs.current) if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [mode, record]);

  // Scroll mode: the bar hides while reading down and returns on the way back
  // up. This is chrome visibility, not scroll motion, so it does not go
  // through the Reveal/Parallax helpers; one passive listener, frame throttled.
  useEffect(() => {
    if (mode !== "scroll") return;
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        if (y < 80) setBarsShown(true);
        else if (y > last + BAR_SCROLL_PX) setBarsShown(false);
        else if (y < last - BAR_SCROLL_PX) setBarsShown(true);
        else return;
        last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [mode]);

  // Pages mode: arrow keys anywhere on the reader (it is the whole screen).
  useEffect(() => {
    if (mode !== "pages") return;
    const onKey = (event: KeyboardEvent) => {
      if (chaptersOpen || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        goTo(pageRef.current + 1);
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goTo(pageRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, chaptersOpen, goTo]);

  // A new page, or a new zoom, starts from the top left corner.
  useEffect(() => {
    stageRef.current?.scrollTo({ left: 0, top: 0 });
  }, [page, zoom]);

  const chooseMode = (next: ReaderMode) => {
    store.set(MODE_KEY, next);
    setModeChosen(true);
    setZoom(1);
    setBarsShown(true);
    setMode(next);
    if (next === "scroll") window.requestAnimationFrame(() => scrollToPage(pageRef.current));
  };

  const onStagePointerDown = (event: React.PointerEvent) => {
    swiped.current = false;
    if (zoom > 1) {
      const stage = stageRef.current;
      if (event.pointerType !== "mouse" || !stage) return;
      drag.current = { x: event.clientX, y: event.clientY, left: stage.scrollLeft, top: stage.scrollTop };
      stage.setPointerCapture(event.pointerId);
      return;
    }
    if (event.pointerType !== "mouse") swipe.current = { x: event.clientX, y: event.clientY };
  };
  const onStagePointerMove = (event: React.PointerEvent) => {
    const stage = stageRef.current;
    const start = drag.current;
    if (!stage || !start) return;
    stage.scrollLeft = start.left - (event.clientX - start.x);
    stage.scrollTop = start.top - (event.clientY - start.y);
  };
  const onStagePointerUp = (event: React.PointerEvent) => {
    drag.current = null;
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) <= Math.abs(dy)) return;
    swiped.current = true;
    goTo(dx < 0 ? page + 1 : page - 1);
  };
  /** A tap zone fires unless the same touch was a swipe, which already turned the page. */
  const onZone = (action: () => void) => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    action();
  };

  const chapter = chapterOf(chapters, page);
  const pageOf = fill(labels.pageOf, { page, count });
  const zoomIndex = ZOOM_STEPS.indexOf(zoom);
  const window3 = [page - 1, page, page + 1].filter((n) => n >= 1 && n <= count);
  const bars = barsShown || zoom > 1;

  return (
    <div aria-label={labels.regionLabel} role="region" className="min-h-dvh bg-[var(--home-surface-2)]">
      {/* The bar. The theme toggle reads the header's chrome variables, mapped here to the theme tokens. */}
      <div
        className={`fixed inset-x-0 top-0 z-40 border-b border-[var(--home-hairline)] bg-[color-mix(in_srgb,var(--home-bg)_92%,transparent)] backdrop-blur-md transition-transform duration-300 [--sj-chrome-fg:var(--home-heading)] [--sj-chrome-hairline:var(--home-hairline-strong)] motion-reduce:transition-none ${
          bars ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-1 px-2 sm:gap-2 sm:px-4">
          <LocaleLink href={backHref} className={barButton}>
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="max-sm:sr-only">{labels.back}</span>
          </LocaleLink>

          <div className="min-w-0 flex-1 px-1">
            <div className="truncate text-[14px] leading-tight font-bold text-[var(--home-heading)]">
              {labels.title}
            </div>
            <div className="truncate text-[12px] leading-tight text-[var(--home-muted)]">{chapter.label}</div>
          </div>

          <button
            type="button"
            onClick={() => setChaptersOpen(true)}
            aria-haspopup="dialog"
            className={`${barButton} tabular-nums`}
          >
            <ListIcon className="h-5 w-5" />
            <span aria-hidden>{fill(labels.pageShort, { page, count })}</span>
            <span className="sr-only">
              {labels.chapters}, {pageOf}
            </span>
          </button>

          {mode === "pages" && (
            <div className="flex items-center max-[480px]:hidden">
              <button
                type="button"
                onClick={() => setZoom(ZOOM_STEPS[zoomIndex - 1])}
                disabled={zoomIndex === 0}
                aria-label={labels.zoomOut}
                className={barButton}
              >
                <ZoomOutIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setZoom(ZOOM_STEPS[zoomIndex + 1])}
                disabled={zoomIndex === ZOOM_STEPS.length - 1}
                aria-label={labels.zoomIn}
                className={barButton}
              >
                <ZoomInIcon className="h-5 w-5" />
              </button>
            </div>
          )}

          <div
            role="group"
            aria-label={labels.modeLabel}
            className="flex rounded-full border border-[var(--home-hairline-strong)] p-0.5"
          >
            {(
              [
                ["scroll", labels.scroll, RowsIcon],
                ["pages", labels.pages, BookOpenIcon],
              ] as const
            ).map(([value, label, Icon]) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                aria-label={label}
                title={label}
                onClick={() => chooseMode(value)}
                className={`inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-accent)] ${
                  mode === value
                    ? "bg-[var(--home-accent)] text-[var(--home-on-accent)]"
                    : "text-[var(--home-heading)] hover:bg-[var(--home-accent-tint)]"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
              </button>
            ))}
          </div>

          <div className="max-sm:hidden">
            <ThemeToggleButton />
          </div>
        </div>
      </div>

      {mode === "scroll" ? (
        // The long strip. Tapping a page shows or hides the bar; pinch zoom is the browser's own.
        <div
          onClick={() => setBarsShown((shown) => !shown)}
          className="mx-auto flex max-w-[1180px] flex-col gap-2 pt-16 pb-12 sm:gap-3 sm:px-4"
        >
          {pages.map((item) => (
            <div
              key={item.number}
              ref={(element) => {
                pageRefs.current[item.number - 1] = element;
              }}
              data-page={item.number}
              className="relative aspect-[2000/1414] w-full scroll-mt-16 bg-[var(--home-surface)] sm:overflow-hidden sm:rounded-[6px]"
            >
              <Image
                src={images[item.number - 1]}
                alt={item.alt}
                fill
                preload={item.number === 1}
                loading={item.number <= 2 ? "eager" : "lazy"}
                placeholder="blur"
                draggable={false}
                sizes="(min-width: 1180px) 1150px, 100vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      ) : (
        // One page at a time. Three tap zones over the page at 1x; at zoom the stage scrolls and pans.
        <div
          ref={stageRef}
          onPointerDown={onStagePointerDown}
          onPointerMove={onStagePointerMove}
          onPointerUp={onStagePointerUp}
          onPointerCancel={() => {
            swipe.current = null;
            drag.current = null;
          }}
          className={`themed-scrollbar fixed inset-0 pt-16 pb-4 ${
            zoom > 1 ? "cursor-grab overflow-auto active:cursor-grabbing" : "touch-pan-y overflow-hidden"
          }`}
        >
          {zoom === 1 ? (
            <div className="relative h-full w-full px-2 sm:px-6">
              <div className="relative h-full w-full">
                {window3.map((n) => (
                  <Image
                    key={n}
                    src={images[n - 1]}
                    alt={n === page ? pages[n - 1].alt : ""}
                    aria-hidden={n === page ? undefined : true}
                    fill
                    loading="eager"
                    placeholder="blur"
                    draggable={false}
                    sizes="100vw"
                    className={`object-contain transition-opacity duration-200 select-none motion-reduce:transition-none ${
                      n === page ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 grid grid-cols-[3fr_4fr_3fr]">
                <button
                  type="button"
                  onClick={() => onZone(() => goTo(page - 1))}
                  disabled={page === 1}
                  aria-label={labels.previous}
                  className="cursor-w-resize outline-none focus-visible:bg-[var(--home-accent-tint)] disabled:cursor-default"
                />
                <button
                  type="button"
                  onClick={() => onZone(() => setBarsShown((shown) => !shown))}
                  aria-label={labels.toggleBars}
                  className="cursor-pointer outline-none focus-visible:bg-[var(--home-accent-tint)]"
                />
                <button
                  type="button"
                  onClick={() => onZone(() => goTo(page + 1))}
                  disabled={page === count}
                  aria-label={labels.next}
                  className="cursor-e-resize outline-none focus-visible:bg-[var(--home-accent-tint)] disabled:cursor-default"
                />
              </div>
            </div>
          ) : (
            <div className="flex min-h-full p-2 sm:p-4">
              <Image
                key={page}
                src={images[page - 1]}
                alt={pages[page - 1].alt}
                placeholder="blur"
                draggable={false}
                sizes={`${zoom * 100}vw`}
                className="m-auto h-auto max-w-none select-none"
                style={{ width: `${zoom * 100}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Progress, always visible: a thin bar along the bottom edge. */}
      <div
        role="progressbar"
        aria-label={labels.progress}
        aria-valuemin={1}
        aria-valuemax={count}
        aria-valuenow={page}
        aria-valuetext={pageOf}
        className="fixed inset-x-0 bottom-0 z-40 h-1 bg-[var(--home-hairline)]"
      >
        <div
          className="h-full bg-[var(--home-accent)] transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${(page / count) * 100}%` }}
        />
      </div>

      {/* Offered on the resumed page only: it goes once the reader moves on. */}
      {resumedFrom === page && (
        <div className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
          <button
            type="button"
            onClick={() => goTo(1)}
            className="min-h-11 cursor-pointer rounded-full bg-[var(--home-heading)] px-5 text-[14px] font-bold text-[var(--home-bg)] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]"
          >
            {labels.startOver}
          </button>
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        {pageOf}, {chapter.label}
      </p>

      <Modal open={chaptersOpen} onClose={() => setChaptersOpen(false)} size="sheet" surface="themed" labelledBy="reader-chapters">
        <div className="p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <h2 id="reader-chapters" className="font-display text-[22px] font-extrabold text-[var(--home-heading)]">
              {labels.chapters}
            </h2>
            <button
              type="button"
              onClick={() => setChaptersOpen(false)}
              aria-label={labels.close}
              className={barButton}
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          <ul className="mt-4 divide-y divide-[var(--home-hairline)]">
            {chapters.map((item) => {
              const active = item.id === chapter.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-current={active ? "true" : undefined}
                    onClick={() => {
                      setChaptersOpen(false);
                      goTo(item.first);
                    }}
                    className={`flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-2 text-left transition-colors hover:bg-[var(--home-accent-tint-soft)] ${
                      active ? "text-[var(--home-accent)]" : "text-[var(--home-heading)]"
                    }`}
                  >
                    <span className="text-[16px] font-bold">{item.label}</span>
                    <span className="text-[13px] text-[var(--home-muted)] tabular-nums">
                      {fill(labels.chapterPages, { first: item.first, last: item.last })}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Modal>
    </div>
  );
}
