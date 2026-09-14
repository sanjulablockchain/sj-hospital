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
 * The announcement pop-up over the home page: five slides that rotate, on
 * the hospital's in-house medicine delivery, the free OPD offer, home visits,
 * inpatient rooms, and how to reach us or channel a doctor.
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

  return (
    <Modal
      open={open}
      onClose={close}
      labelledBy="sj-announcement-title"
      size="panel"
      surface="themed"
    >
      {/* Mounted but empty until it opens, so the five slide photographs are
          not fetched on a page load where the reader has already dismissed
          the pop-up, or in the two seconds before it appears. */}
      {open && (
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onKeyDown={() => setKeyboardEngaged(true)}
        >
          {/* Sticky, because on a short phone the panel is capped at the
              viewport and the content scrolls inside it: measured at 360x640,
              the copy is taller than the 616px panel. Left static, the close
              button scrolled out of reach and the reader had to scroll back up
              to dismiss the pop-up. The footer below is sticky for the same
              reason, so the arrows and the dots stay put too. */}
          <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-[var(--home-hairline)] bg-[var(--home-bg)] px-5 py-2 sm:px-7 sm:py-3.5">
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
              // 44px on a phone, the usual minimum for something you hit with
              // a thumb, and back to 36 from `sm` where it is a mouse target.
              // The icon inside stays the same size either way.
              className="sj-invert flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center text-[var(--home-muted)] hover:text-[var(--home-heading)] sm:h-9 sm:w-9"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          {/* All five slides occupy ONE grid cell, stacked, with the four
              inactive ones faded out rather than unmounted.

              This is what keeps the panel still. Sized to its content, it
              was as tall as whichever slide was showing, and the bodies wrap
              to different line counts (measured: 505px, 498px, 498px on
              desktop, and 774 / 749 / 690 on a phone). Because the dialog is
              centred, every change moved its top and bottom edges, so the
              whole pop-up jumped as it rotated. Stacked, the cell is as tall
              as the TALLEST slide and never changes, which also holds for
              Sinhala and Tamil, where the bodies are longer and differ by
              more. A min-height would have had to be re-guessed per
              language; this cannot drift.

              The four hidden slides are `inert`, so they are out of the tab
              order and off the accessibility tree: without it a keyboard
              reader would tab into CTAs nobody can see. */}
          {/* `grid-cols-1`, not a bare `grid`. A bare grid has one implicit
              column sized to `auto`, which grows to the widest child's
              max-content: the body paragraph's `max-w-[44ch]` is about 431px,
              so on a 390px phone the stack was 431px wide inside a 378px
              panel and the copy was clipped by the dialog's `overflow-hidden`,
              silently. Tailwind's `grid-cols-1` is `minmax(0,1fr)`, which
              cannot be pushed past the container. `min-w-0` on each slide and
              each of its two columns is the same guard one level down. */}
          <div className="grid grid-cols-1">
            {slides.map((item, i) => (
              <div
                key={item.eyebrow}
                aria-hidden={i !== index}
                inert={i !== index}
                className={`col-start-1 row-start-1 grid min-w-0 transition-opacity duration-300 motion-reduce:transition-none min-[700px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] ${
                  i === index ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                {/* On a phone the band is sized against the VIEWPORT, not the
                    panel width. At 16:10 of a full-width panel the photograph
                    was about 230px on a 390px phone, roughly 40% of the card,
                    and it pushed the CTAs off the bottom of a short screen.
                    `clamp(120px, 20vh, 180px)` keeps it a banner on every
                    phone and shrinks it first on the short ones, which are
                    exactly the screens that were scrolling. From 700px up the
                    height goes back to being driven by the copy beside it.

                    On a phone SHORTER than 700px (a 360x640 Android, an
                    iPhone SE) the band goes entirely. Even at its 120px floor
                    it was the difference between the card fitting and the
                    card scrolling, and on the screen with the least room the
                    copy and the two CTAs are worth more than the photograph.
                    The query is width AND height: a phone held sideways is
                    under 700px tall too, but it is over 700px wide, so it
                    takes the two-column layout where removing the image would
                    leave an empty column. */}
                <div className="relative h-[clamp(120px,20vh,180px)] min-w-0 [@media(max-width:699px)_and_(max-height:700px)]:hidden min-[700px]:h-auto min-[700px]:min-h-[370px]">
                  <Image
                    src={item.photo}
                    alt={item.photoAlt}
                    fill
                    sizes="(min-width: 700px) 400px, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-col justify-center px-5 py-6 sm:px-8 sm:py-9">
                  <div className="text-[11px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase sm:text-[11.5px]">
                    {item.eyebrow}
                  </div>
                  <h3 className="font-display mt-3 wrap-break-word text-[clamp(25px,4.2vw,42px)] leading-[0.95] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase sm:mt-3.5">
                    {item.heading.line1}
                    <br />
                    {item.heading.line2}
                  </h3>
                  <p
                    className="mt-3.5 max-w-[44ch] text-[14.5px] leading-[1.55] text-[var(--home-body)] sm:mt-4.5 sm:text-[15.5px] sm:leading-[1.6]"
                    style={{ textWrap: "pretty" }}
                  >
                    {item.body}
                  </p>
                  {/* A grid on phones, so both buttons are one full-width
                      column and read as a pair: `flex-wrap` gave them their
                      own content widths, which stacked ragged. From 700px up
                      they sit inline at their natural widths again. */}
                  <div className="mt-5 grid gap-2.5 sm:mt-6.5 min-[700px]:flex min-[700px]:flex-wrap">
                    <SlideCta
                      href={item.hrefPrimary}
                      label={item.ctaPrimary}
                      locale={locale}
                      onNavigate={close}
                      primary
                    />
                    <SlideCta
                      href={item.hrefSecondary}
                      label={item.ctaSecondary}
                      locale={locale}
                      onNavigate={close}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 z-10 flex items-center gap-3 border-t border-[var(--home-hairline)] bg-[var(--home-bg)] px-5 py-2 sm:px-7 sm:py-3">
            {/* The dot is 8px of paint inside a 44px button. A dot you can see
                and a dot you can hit are different sizes, and shipping the
                8px one as the whole target made five of the controls in this
                footer unhittable with a thumb. The taller buttons are paid
                for by the reduced footer padding beside them, so the card is
                no taller than it was. */}
            <div className="flex gap-2">
              {slides.map((item, i) => (
                <button
                  key={item.eyebrow}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${ariaSlide} ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className="flex h-11 cursor-pointer items-center sm:h-9"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-7 bg-[var(--home-accent)]"
                        : "w-2 bg-[var(--home-hairline-strong)]"
                    }`}
                  />
                </button>
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
                className="sj-invert flex h-11 w-11 cursor-pointer items-center justify-center border border-[var(--home-hairline-strong)] text-[15px] text-[var(--home-heading)] disabled:opacity-40 sm:h-9 sm:w-9"
              >
                <span aria-hidden>&larr;</span>
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label={ariaNext}
                disabled={slides.length < 2}
                className="sj-invert flex h-11 w-11 cursor-pointer items-center justify-center border border-[var(--home-hairline-strong)] text-[15px] text-[var(--home-heading)] disabled:opacity-40 sm:h-9 sm:w-9"
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
    ? "sj-invert inline-flex items-center justify-center gap-2 bg-[var(--home-accent)] px-5 py-3.5 text-[14px] font-bold text-[var(--home-on-accent)]"
    : "sj-invert inline-flex items-center justify-center gap-2 border border-[var(--home-hairline-strong)] px-5 py-3.5 text-[14px] font-bold text-[var(--home-heading)]";

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
