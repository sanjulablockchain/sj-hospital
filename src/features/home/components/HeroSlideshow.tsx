"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useParallax } from "../hooks/useParallax";
import { useHeroSlideshow } from "../hooks/useHeroSlideshow";

/**
 * One slide as the hero renders it: the data file's shape with the body's
 * `{count}` / `{fromPrice}` tokens already filled and every route already
 * passed through `localeHref`, both done by `HomePage` on the server.
 */
export type HeroSlideView = {
  id: string;
  kicker: string;
  heading: { lead: string; accent: string };
  body: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  photo: string;
  photoAlt: string;
  positionClass: string;
};

export type HeroControlsCopy = { ariaShow: string; ariaPrev: string; ariaNext: string };

/** `.animate-sj-burns` runs 26s in globals.css; a layer mounted later starts mid-cycle to match. */
const BURNS_MS = 26_000;

/**
 * The slideshow itself: the parallax photo stack, the active slide's copy,
 * and the dots, counter and arrows. `backdrop` is the fixed-dark gradient,
 * sheen and scan-line layers and `rail` / `mark` the location rail and the
 * affiliation mark, all rendered by the Server parent and passed in so this
 * leaf holds nothing but behaviour.
 *
 * Photo layers mount on demand (see `slideState.ts`) and crossfade by
 * opacity; only the first slide's image is preloaded. Every slide's copy is
 * stacked in one grid cell (see below) so the hero never changes size, and
 * the visible one rises in with `animate-sj-up`.
 * One `<h1>` is in the DOM at any time, the visible slide's, and a live
 * region announces the heading when the reader changes it (silent during
 * auto rotation). Hover and focus hold the rotation; there is no pause
 * button, at the owner's request (2026-10-29). Below `sm:` the dots
 * are dropped (eight 44px targets plus the arrows do not fit in 335px) and
 * the counter and arrows carry the position on their own.
 *
 * Fixed-dark literals as recorded in HeroSection.tsx.
 */
export function HeroSlideshow({
  slides,
  intervalMs,
  copy,
  backdrop,
  rail,
  mark,
}: {
  slides: HeroSlideView[];
  intervalMs: number;
  copy: HeroControlsCopy;
  backdrop: ReactNode;
  rail: ReactNode;
  mark: ReactNode;
}) {
  const { active, mounted, mountedAt, rotating, go, next, prev, pause, resume } = useHeroSlideshow(slides.length, intervalMs);
  const { ref, offset } = useParallax(0.16, 130);
  // A layer mounted later starts its Ken Burns cycle that far in, so it
  // matches the zoom of the layer it fades over. Slide 0 is always 0ms, on
  // the server and on the client, so hydration never disagrees.
  const delayFor = (index: number) => `-${((mountedAt[index] ?? mountedAt[0]) - mountedAt[0]) % BURNS_MS}ms`;

  const slide = slides[active];
  const total = String(slides.length).padStart(2, "0");

  return (
    <div
      className="relative flex flex-1 flex-col"
      aria-roledescription="carousel"
      onPointerEnter={pause}
      onPointerLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") next();
        if (event.key === "ArrowLeft") prev();
      }}
    >
      <div ref={ref} style={{ transform: `translateY(${offset}px)` }} className="absolute inset-x-0 -top-[14%] h-[128%] overflow-hidden">
        {slides.map((s, index) =>
          mounted.includes(index) ? (
            <Image
              key={s.id}
              src={s.photo}
              alt={index === active ? s.photoAlt : ""}
              aria-hidden={index === active ? undefined : true}
              fill
              preload={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              sizes="100vw"
              style={{ animationDelay: delayFor(index) }}
              className={`animate-sj-burns object-cover transition-opacity duration-[1000ms] ease-in-out ${s.positionClass} ${
                index === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : null
        )}
      </div>
      {backdrop}

      <div className="relative z-[2] mx-auto flex w-full max-w-[1440px] flex-1 gap-10 px-5 pt-6 pb-5 sm:px-8 sm:pt-12 sm:pb-8 lg:px-11">
        {rail}
        <div className="flex min-w-0 flex-1 flex-col justify-end">
          <div className="animate-sj-up">{mark}</div>

          {/* Every slide's copy sits in the same grid cell, so this block is
              always as tall as the longest slide. With only the active copy
              in the DOM the hero grew and shrank as the slides changed, and
              the object-cover photo behind it rescaled with it. Inactive
              copies are invisible and inert (out of the tab order and the
              accessibility tree), and their heading is a <p>, so the page
              still has the one <h1>. The visible copy rises in again each
              time `animate-sj-up` is applied to it. */}
          <div className="mt-4 grid sm:mt-7">
            {slides.map((s, index) => {
              const isActive = index === active;
              const Heading = isActive ? "h1" : "p";
              return (
                <div
                  key={s.id}
                  inert={!isActive}
                  className={`flex flex-col items-start gap-4 [grid-area:1/1] sm:gap-6 ${
                    isActive ? "animate-sj-up [animation-delay:80ms]" : "invisible"
                  }`}
                >
                  <span className="inline-flex items-center gap-3 text-[11.5px] font-extrabold tracking-[0.22em] text-[#9CC8FF] uppercase">
                    <span aria-hidden className="h-px w-11 bg-[var(--home-accent)]" />
                    {s.kicker}
                  </span>
                  <Heading className="font-display m-0 max-w-[18ch] wrap-break-word text-[clamp(40px,7.4vw,120px)] leading-[0.88] font-extrabold tracking-[-0.045em] text-white uppercase">
                    {s.heading.lead} <span className="text-[var(--home-accent)]">{s.heading.accent}</span>
                  </Heading>
                  <p className="m-0 max-w-[48ch] text-[16px] leading-[1.6] text-white/84 sm:text-[18px]" style={{ textWrap: "pretty" }}>
                    {s.body}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={s.ctaPrimary.href}
                      className="sj-invert inline-flex min-h-11 items-center gap-2.5 bg-[var(--home-accent)] px-6 py-3.5 text-[15px] font-bold text-[var(--home-on-accent)]"
                    >
                      {s.ctaPrimary.label} <span aria-hidden>&rarr;</span>
                    </a>
                    {s.ctaSecondary ? (
                      <a
                        href={s.ctaSecondary.href}
                        className="inline-flex min-h-11 items-center gap-3 border border-white/30 px-6 py-3.5 text-[15px] font-bold whitespace-nowrap text-white tabular-nums transition-colors hover:bg-white/8"
                      >
                        <span aria-hidden className="animate-sj-pulse h-2 w-2 rounded-full bg-[var(--home-accent)]" />
                        {s.ctaSecondary.label}
                      </a>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Silent while the slides rotate on their own (a reader elsewhere on
              the page must not hear a new heading every few seconds), polite
              once they stop, so a slide the reader chose is announced. */}
          <p aria-live={rotating ? "off" : "polite"} className="sr-only">
            {slide.heading.lead} {slide.heading.accent}
          </p>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/14 pt-2 sm:mt-8">
            <div role="tablist" aria-label={copy.ariaShow.replace(/\{.*$/, "").trim()} className="hidden flex-wrap sm:flex">
              {slides.map((s, index) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={copy.ariaShow.replace("{n}", String(index + 1)).replace("{total}", String(slides.length)).replace("{kicker}", s.kicker)}
                  onClick={() => go(index)}
                  className="group grid h-11 min-w-11 place-items-center px-2"
                >
                  <span
                    aria-hidden
                    className={`block h-[3px] w-7 transition-all duration-300 ${
                      index === active ? "w-11 bg-[var(--home-accent)]" : "bg-white/30 group-hover:bg-white/60"
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[12px] tracking-[0.18em] text-white/60 tabular-nums">
                {String(active + 1).padStart(2, "0")} / {total}
              </span>
              <button
                type="button"
                onClick={prev}
                aria-label={copy.ariaPrev}
                className="grid h-11 w-11 place-items-center border border-white/30 text-white transition-colors hover:bg-white/10"
              >
                <span aria-hidden>&larr;</span>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={copy.ariaNext}
                className="grid h-11 w-11 place-items-center border border-white/30 text-white transition-colors hover:bg-white/10"
              >
                <span aria-hidden>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
