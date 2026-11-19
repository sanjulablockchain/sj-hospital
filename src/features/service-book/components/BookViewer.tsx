"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  DownloadIcon,
  ExpandIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@/components/ui/Icons";
import type { ServiceBookContent } from "../data/getContent";
import type { BookPage, Chapter } from "../types";
import { formatPageHash, parsePageHash } from "../lib/pageHash";

type Props = {
  labels: ServiceBookContent["viewer"];
  download: { label: string; href: string; size: string };
  chapters: readonly Chapter[];
  pages: readonly BookPage[];
  images: readonly StaticImageData[];
};

const ZOOM_STEPS = [1, 2, 3] as const;
/** A horizontal swipe has to travel this far, and further than it moves vertically, to turn the page. */
const SWIPE_PX = 50;

const fill = (template: string, values: Record<string, number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

const chapterOf = (chapters: readonly Chapter[], page: number) =>
  chapters.find((chapter) => page <= chapter.last) ?? chapters[chapters.length - 1];

const iconButton =
  "inline-flex h-11 min-w-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--home-hairline-strong)] px-3 text-[14px] font-bold text-[var(--home-heading)] transition-colors hover:border-[var(--home-accent)] hover:bg-[var(--home-accent)] hover:text-[var(--home-on-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-accent)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[var(--home-hairline-strong)] disabled:hover:bg-transparent disabled:hover:text-[var(--home-heading)]";

/**
 * The Service Book, one page at a time.
 *
 * The page lives in the URL hash (`#page-21`) so a page can be shared: it is
 * read on mount and on `hashchange` (which is also how the "Open in the
 * book" links further down the page drive it), and written with
 * `replaceState`, never `pushState`, so Back leaves the page instead of
 * stepping back through every page turned.
 *
 * Only the current page and its two neighbours are mounted, so a reader on a
 * phone downloads three pages, not forty one; the neighbours are already
 * loaded when the reader turns to them. Arrow keys turn pages only while
 * focus is inside the reader, so they never hijack scrolling elsewhere.
 */
export function BookViewer({ labels, download, chapters, pages, images }: Props) {
  const count = pages.length;
  const [page, setPage] = useState(1);
  const [fullOpen, setFullOpen] = useState(false);
  const [zoom, setZoom] = useState<(typeof ZOOM_STEPS)[number]>(1);
  const rootRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const zoomBoxRef = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const titleId = useId();

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(next, 1), count);
      setPage(clamped);
      window.history.replaceState(window.history.state, "", formatPageHash(clamped));
    },
    [count]
  );

  // Read the page from the hash: on arrival, and whenever an in-page link
  // (`href="#page-18"`) changes it. Bring the reader into view for either.
  useEffect(() => {
    const fromHash = (scroll: boolean) => {
      if (!window.location.hash.startsWith("#page-")) return;
      setPage(parsePageHash(window.location.hash, count));
      if (scroll) rootRef.current?.scrollIntoView({ block: "start" });
    };
    fromHash(true);
    const onHashChange = () => fromHash(true);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [count]);

  // Keep the active thumbnail in the middle of its strip. Scrolls the strip
  // only (never `scrollIntoView`, which would also scroll the window).
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.querySelector<HTMLElement>(`[data-page="${page}"]`);
    if (!strip || !thumb) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollTo({
      left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [page]);

  // A new page at zoom starts from its top left corner.
  useEffect(() => {
    zoomBoxRef.current?.scrollTo({ left: 0, top: 0 });
  }, [page, zoom]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest("input, textarea, select, [contenteditable='true']")) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(page - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(page + 1);
    }
  };

  const onPointerDown = (event: React.PointerEvent) => {
    if (event.pointerType === "mouse") return;
    swipe.current = { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event: React.PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) <= Math.abs(dy)) return;
    goTo(dx < 0 ? page + 1 : page - 1);
  };

  // Mouse drag pans the zoomed page; touch already pans by scrolling.
  const onZoomPointerDown = (event: React.PointerEvent) => {
    const box = zoomBoxRef.current;
    if (event.pointerType !== "mouse" || zoom === 1 || !box) return;
    drag.current = { x: event.clientX, y: event.clientY, left: box.scrollLeft, top: box.scrollTop };
    box.setPointerCapture(event.pointerId);
  };
  const onZoomPointerMove = (event: React.PointerEvent) => {
    const box = zoomBoxRef.current;
    const start = drag.current;
    if (!box || !start) return;
    box.scrollLeft = start.left - (event.clientX - start.x);
    box.scrollTop = start.top - (event.clientY - start.y);
  };
  const onZoomPointerUp = () => {
    drag.current = null;
  };

  const chapter = chapterOf(chapters, page);
  const pageOf = fill(labels.pageOf, { page, count });
  const window3 = [page - 1, page, page + 1].filter((n) => n >= 1 && n <= count);
  const zoomIndex = ZOOM_STEPS.indexOf(zoom);

  const openFull = () => {
    setZoom(1);
    setFullOpen(true);
  };

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label={labels.regionLabel}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className="scroll-mt-28 outline-none"
    >
      {/* Chapter tabs: a sideways scrolling row on phones. */}
      <div
        role="group"
        aria-label={labels.chaptersLabel}
        className="themed-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {chapters.map((item) => {
          const active = item.id === chapter.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => goTo(item.first)}
              className={`h-11 shrink-0 cursor-pointer rounded-full border px-4.5 text-[14px] font-bold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-accent)] ${
                active
                  ? "border-[var(--home-accent)] bg-[var(--home-accent)] text-[var(--home-on-accent)]"
                  : "border-[var(--home-hairline-strong)] text-[var(--home-heading)] hover:border-[var(--home-accent)]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* The page, with arrows beside it from 900px. */}
      <div className="mt-5 flex items-center gap-4">
        <button
          type="button"
          onClick={() => goTo(page - 1)}
          disabled={page === 1}
          aria-label={labels.previous}
          className={`${iconButton} shrink-0 max-[899px]:hidden`}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        <div
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (swipe.current = null)}
          className="relative aspect-[2000/1414] min-w-0 flex-1 touch-pan-y overflow-hidden rounded-[10px] border border-[var(--home-hairline)] bg-[var(--home-surface)] shadow-[0_30px_60px_-30px_color-mix(in_srgb,var(--home-heading)_35%,transparent)] select-none"
        >
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
              sizes="(min-width: 1440px) 1240px, (min-width: 900px) calc(100vw - 200px), calc(100vw - 40px)"
              className={`object-contain transition-opacity duration-200 motion-reduce:transition-none ${
                n === page ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(page + 1)}
          disabled={page === count}
          aria-label={labels.next}
          className={`${iconButton} shrink-0 max-[899px]:hidden`}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Counter and actions. Prev and next sit here on phones. */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 min-[900px]:px-15">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            aria-label={labels.previous}
            className={`${iconButton} min-[900px]:hidden`}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <p className="text-[14px] text-[var(--home-muted)] tabular-nums">
            <span className="font-bold text-[var(--home-heading)]">{pageOf}</span>
            <span className="max-sm:hidden">, {chapter.label}</span>
          </p>
          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={page === count}
            aria-label={labels.next}
            className={`${iconButton} min-[900px]:hidden`}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
        {/* Its own left-aligned row on phones: the site's floating WhatsApp
            and call buttons sit over the right edge there. */}
        <div className="flex items-center gap-2 max-sm:w-full">
          <button type="button" onClick={openFull} className={iconButton}>
            <ExpandIcon className="h-4.5 w-4.5" />
            <span>{labels.fullScreen}</span>
          </button>
          <a href={download.href} download className={iconButton}>
            <DownloadIcon className="h-4.5 w-4.5" />
            <span className="max-sm:sr-only">
              {download.label} ({download.size})
            </span>
          </a>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {pageOf}, {chapter.label}
      </p>

      {/* Every page, as thumbnails. Lazy: they load as the strip scrolls. */}
      <div
        ref={stripRef}
        role="group"
        aria-label={labels.thumbnailsLabel}
        className="themed-scrollbar relative -mx-5 mt-6 flex gap-2.5 overflow-x-auto px-5 pt-1 pb-3 sm:mx-0 sm:px-1"
      >
        {pages.map((item) => {
          const active = item.number === page;
          return (
            <button
              key={item.number}
              type="button"
              data-page={item.number}
              aria-label={fill(labels.goToPage, { page: item.number })}
              aria-current={active ? "page" : undefined}
              onClick={() => goTo(item.number)}
              className={`relative aspect-[2000/1414] w-24 shrink-0 cursor-pointer overflow-hidden rounded-[5px] border bg-[var(--home-surface)] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--home-accent)] sm:w-28 ${
                active
                  ? "border-[var(--home-accent)] ring-2 ring-[var(--home-accent)]"
                  : "border-[var(--home-hairline)] opacity-75 hover:opacity-100"
              }`}
            >
              <Image src={images[item.number - 1]} alt="" fill sizes="112px" className="object-cover" />
              <span className="absolute right-1 bottom-1 rounded-[3px] bg-[color-mix(in_srgb,var(--home-bg)_85%,transparent)] px-1 text-[11px] font-bold text-[var(--home-heading)] tabular-nums">
                {item.number}
              </span>
            </button>
          );
        })}
      </div>

      <Modal open={fullOpen} onClose={() => setFullOpen(false)} size="viewer" surface="themed" labelledBy={titleId}>
        {fullOpen && (
          <div className="flex h-full flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--home-hairline)] px-3 py-2 sm:px-5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goTo(page - 1)}
                  disabled={page === 1}
                  aria-label={labels.previous}
                  className={iconButton}
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <h2 id={titleId} className="text-[14px] font-bold text-[var(--home-heading)] tabular-nums">
                  {pageOf}
                </h2>
                <button
                  type="button"
                  onClick={() => goTo(page + 1)}
                  disabled={page === count}
                  aria-label={labels.next}
                  className={iconButton}
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoom(ZOOM_STEPS[zoomIndex - 1])}
                  disabled={zoomIndex === 0}
                  aria-label={labels.zoomOut}
                  className={iconButton}
                >
                  <ZoomOutIcon className="h-5 w-5" />
                </button>
                <span className="w-9 text-center text-[13px] font-bold text-[var(--home-muted)] tabular-nums">
                  {zoom}x
                </span>
                <button
                  type="button"
                  onClick={() => setZoom(ZOOM_STEPS[zoomIndex + 1])}
                  disabled={zoomIndex === ZOOM_STEPS.length - 1}
                  aria-label={labels.zoomIn}
                  className={iconButton}
                >
                  <ZoomInIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setFullOpen(false)}
                  aria-label={labels.close}
                  className={`${iconButton} ml-1`}
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div
              ref={zoomBoxRef}
              onPointerDown={onZoomPointerDown}
              onPointerMove={onZoomPointerMove}
              onPointerUp={onZoomPointerUp}
              onPointerCancel={onZoomPointerUp}
              className={`themed-scrollbar min-h-0 flex-1 touch-auto overflow-auto bg-[var(--home-surface-2)] ${
                zoom > 1 ? "cursor-grab active:cursor-grabbing" : ""
              }`}
            >
              <div className={`flex p-3 sm:p-5 ${zoom === 1 ? "h-full" : "min-h-full"}`}>
                <Image
                  key={page}
                  src={images[page - 1]}
                  alt={pages[page - 1].alt}
                  placeholder="blur"
                  draggable={false}
                  sizes={zoom === 1 ? "100vw" : `${zoom * 100}vw`}
                  className={`m-auto h-auto max-w-none select-none ${
                    zoom === 1 ? "max-h-full w-auto max-w-full object-contain" : ""
                  }`}
                  style={zoom === 1 ? undefined : { width: `${zoom * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
