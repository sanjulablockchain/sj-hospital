"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { useParallax } from "../hooks/useParallax";
import { testimonials } from "../data/testimonials";

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const { ref: glyphRef, offset: glyphOffset } = useParallax(0.07, 40);
  const current = testimonials[index];

  const goPrev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section id="voices" className="relative isolate mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <div
        ref={glyphRef}
        aria-hidden
        style={{ transform: `translateY(${glyphOffset}px)` }}
        className="font-display pointer-events-none absolute top-16 right-4 -z-10 text-[clamp(180px,26vw,380px)] leading-none font-extrabold text-[var(--home-accent)] opacity-10 select-none sm:right-8 lg:right-11"
      >
        &rdquo;
      </div>
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          13 / Patient voices
        </div>
        <blockquote className="font-display mt-6.5 max-w-[26ch] text-[clamp(27px,3.9vw,58px)] leading-[1.06] font-normal tracking-[-0.03em] text-[var(--home-heading)]" style={{ textWrap: "pretty" }}>
          {current.quote}
        </blockquote>
        <div className="mt-7 flex items-baseline gap-3.5">
          <span className="text-[15px] font-bold text-[var(--home-accent)]">{current.name}</span>
          <span className="text-[13.5px] tracking-[0.1em] text-[var(--home-muted)] uppercase">{current.role}</span>
        </div>
        <div className="mt-9 flex gap-2.5 border-t border-[var(--home-hairline)] pt-5.5">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={goPrev}
            disabled={testimonials.length < 2}
            className="sj-invert flex h-13 w-13 items-center justify-center border border-[var(--home-hairline-strong)] text-[18px] text-[var(--home-heading)] disabled:opacity-40"
          >
            <span aria-hidden>&larr;</span>
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={goNext}
            disabled={testimonials.length < 2}
            className="sj-invert flex h-13 w-13 items-center justify-center border border-[var(--home-hairline-strong)] text-[18px] text-[var(--home-heading)] disabled:opacity-40"
          >
            <span aria-hidden>&rarr;</span>
          </button>
          <span className="ml-auto self-center text-[13px] tracking-[0.14em] text-[var(--home-muted)] tabular-nums">
            {index + 1} / {testimonials.length}
          </span>
        </div>
      </Reveal>
    </section>
  );
}
