"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { CloseIcon } from "@/components/ui/Icons";
import { LOGO_MARK } from "@/config/brand";
import { localeHref } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import type { HomeContent } from "../data/getContent";

/**
 * Set when the reader dismisses the pop-up or follows one of its CTAs, and
 * read before it is ever scheduled. `sessionStorage`, not `localStorage`: the
 * reader who comes back next week should see the announcements again, the one
 * who clicks back to the home page five minutes later should not.
 */
const SEEN_KEY = "sj-announcement-seen";

/**
 * Long enough that the pop-up arrives after the hero has painted rather than
 * on top of it mid-load, short enough that it still reaches somebody who came
 * to read one thing and leave.
 */
const OPEN_DELAY_MS = 2000;

/** One slide's turn on screen. */
const ROTATE_MS = 6000;

/**
 * Both accessors are wrapped: `sessionStorage` throws outright in a private
 * window and wherever site data is blocked, and this component mounts on the
 * busiest page on the site.
 */
function seenThisSession(): boolean {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberSeen(): void {
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Storage unavailable. The pop-up then shows once per page load rather
    // than once per session, which is the right way for this to fail: the
    // reader still gets the announcements, and still only after the delay.
  }
}

/**
 * The announcement pop-up over the home page: three slides that rotate, on
 * the hospital's in-house medicine delivery, the free OPD offer, and how to
 * reach us or channel a doctor.
 *
 * A `'use client'` leaf, mounted by the Server Component `HomePage`, which
 * passes it copy already localized. It never imports a data file itself, so
 * no translation data is bundled for the client, the same rule every other
 * interactive section on this page follows.
 *
 * An href that starts with `/` is a route and is prefixed with the reader's
 * locale; `tel:` and `https:` actions are rendered as plain anchors and left
 * alone. `localeHref` already makes that distinction, but the `<Link>` versus
 * `<a>` choice cannot be delegated to it, so the test in
 * announcement.test.ts pins the two shapes an href is allowed to take.
 */
export function AnnouncementModal({
  content,
  locale,
}: {
  content: HomeContent["announcement"];
  locale: Locale;
}) {
  const { slides, title, ariaPrev, ariaNext, ariaClose, ariaSlide } = content;

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  /**
   * The two ways rotation stops, kept apart because they resume differently.
   *
   * `hovered` is the pointer being over the panel, and it lifts again when
   * the pointer leaves.
   *
   * `keyboardEngaged` is any key pressed inside the panel, and it does NOT
   * lift: somebody driving this from the keyboard has taken control of which
   * slide they are on, and handing it back to a timer three seconds later
   * would move the slide out from under them.
   *
   * Neither is derived from focus. `showModal()` moves focus to the first
   * focusable child on open, which is the close button, so an `onFocus`
   * handler fires before the reader has done anything at all. That pinned
   * the old `paused` flag true from the moment the pop-up appeared, and
   * because focus then stays inside the dialog no blur ever followed to
   * clear it, so the rotation never ran once. A `:focus-visible` guard does
   * not help either: Chromium reports that opening focus AS focus-visible
   * (measured, not assumed).
   */
  const [hovered, setHovered] = useState(false);
  const [keyboardEngaged, setKeyboardEngaged] = useState(false);
  const paused = hovered || keyboardEngaged;

  useEffect(() => {
    if (seenThisSession()) return;
    const timer = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    rememberSeen();
  }, []);

  /**
   * Rotation stops while the reader is hovering the panel or has tabbed into
   * it, because a slide that changes under a half-read paragraph or moves the
   * button beneath the cursor is worse than no rotation at all. It never
   * starts under `prefers-reduced-motion: reduce`: the arrows and the dots
   * are the whole control surface for that reader.
   */
  useEffect(() => {
    if (!open || paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % slides.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(timer);
  }, [open, paused, slides.length]);

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  const slide = slides[index];

  return (
    <Modal
      open={open}
      onClose={close}
      labelledBy="sj-announcement-title"
      size="panel"
      surface="themed"
    >
      {/* Mounted but empty until it opens, so the three slide photographs are
          not fetched on a page load where the reader has already dismissed
          the pop-up, or in the two seconds before it appears. */}
      {open && (
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onKeyDown={() => setKeyboardEngaged(true)}
        >
          <div className="flex items-center gap-3 border-b border-[var(--home-hairline)] px-5 py-3.5 sm:px-7">
            <Image
              src={LOGO_MARK.src}
              alt=""
              width={LOGO_MARK.width}
              height={LOGO_MARK.height}
              className="h-7 w-auto shrink-0"
            />
            <h2
              id="sj-announcement-title"
              className="font-display min-w-0 flex-1 truncate text-[14.5px] font-extrabold tracking-[-0.01em] text-[var(--home-heading)] sm:text-[16.5px]"
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label={ariaClose}
              className="sj-invert flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center text-[var(--home-muted)] hover:text-[var(--home-heading)]"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Keyed on the index so each slide fades in as it arrives. The
              animation is a no-op under prefers-reduced-motion (globals.css). */}
          <div
            key={index}
            className="animate-sj-fade-in grid min-[700px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
          >
            <div className="relative aspect-[16/10] min-[700px]:aspect-auto min-[700px]:min-h-[370px]">
              <Image
                src={slide.photo}
                alt={slide.photoAlt}
                fill
                sizes="(min-width: 700px) 400px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center px-5 py-7 sm:px-8 sm:py-9">
              <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
                {slide.eyebrow}
              </div>
              <h3 className="font-display mt-3.5 wrap-break-word text-[clamp(28px,4.2vw,42px)] leading-[0.95] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
                {slide.heading.line1}
                <br />
                {slide.heading.line2}
              </h3>
              <p
                className="mt-4.5 max-w-[44ch] text-[15.5px] leading-[1.6] text-[var(--home-body)]"
                style={{ textWrap: "pretty" }}
              >
                {slide.body}
              </p>
              <div className="mt-6.5 flex flex-wrap gap-2.5">
                <SlideCta
                  href={slide.hrefPrimary}
                  label={slide.ctaPrimary}
                  locale={locale}
                  onNavigate={close}
                  primary
                />
                <SlideCta
                  href={slide.hrefSecondary}
                  label={slide.ctaSecondary}
                  locale={locale}
                  onNavigate={close}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-[var(--home-hairline)] px-5 py-3 sm:px-7">
            <div className="flex gap-2">
              {slides.map((item, i) => (
                <button
                  key={item.eyebrow}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${ariaSlide} ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-7 bg-[var(--home-accent)]"
                      : "w-2 bg-[var(--home-hairline-strong)]"
                  }`}
                />
              ))}
            </div>

            <span className="ml-auto text-[12.5px] tracking-[0.14em] text-[var(--home-muted)] tabular-nums">
              {index + 1} / {slides.length}
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label={ariaPrev}
                disabled={slides.length < 2}
                className="sj-invert flex h-9 w-9 cursor-pointer items-center justify-center border border-[var(--home-hairline-strong)] text-[15px] text-[var(--home-heading)] disabled:opacity-40"
              >
                <span aria-hidden>&larr;</span>
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label={ariaNext}
                disabled={slides.length < 2}
                className="sj-invert flex h-9 w-9 cursor-pointer items-center justify-center border border-[var(--home-hairline-strong)] text-[15px] text-[var(--home-heading)] disabled:opacity-40"
              >
                <span aria-hidden>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

/**
 * One CTA button.
 *
 * `onNavigate` marks the pop-up seen on the way out. Without it, following a
 * CTA and then coming back to the home page would open it a second time in
 * the same session, which is exactly the reader who has already engaged with
 * it.
 */
function SlideCta({
  href,
  label,
  locale,
  onNavigate,
  primary = false,
}: {
  href: string;
  label: string;
  locale: Locale;
  onNavigate: () => void;
  primary?: boolean;
}) {
  const className = primary
    ? "sj-invert inline-flex items-center gap-2 bg-[var(--home-accent)] px-5 py-3.5 text-[14px] font-bold text-[var(--home-on-accent)]"
    : "sj-invert inline-flex items-center gap-2 border border-[var(--home-hairline-strong)] px-5 py-3.5 text-[14px] font-bold text-[var(--home-heading)]";

  // `tel:` and the WhatsApp link leave the site (or leave the browser), so
  // they are plain anchors: routing them through `<Link>` would prefetch a
  // page that does not exist.
  if (!href.startsWith("/")) {
    return (
      <a href={href} onClick={onNavigate} className={className}>
        {label} <span aria-hidden>&rarr;</span>
      </a>
    );
  }

  return (
    <Link href={localeHref(href, locale)} onClick={onNavigate} className={className}>
      {label} <span aria-hidden>&rarr;</span>
    </Link>
  );
}
