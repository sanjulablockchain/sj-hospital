"use client";

import Image from "next/image";
import { useState } from "react";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import type { Testimonial } from "../data/testimonials";
import { HomeIcon } from "./HomeIcon";
import { Container } from "./primitives";

/** "Malini De Silva" becomes "MD": first letter of the first and last words. */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/**
 * `#voices`: a lavender card with the heading, an initials avatar, the quote
 * in Bricolage, dot navigation and prev/next, beside the reception
 * photograph. Starts on the last review, as the reference does (`voice: 2`).
 * All three quotes are in the served HTML, hidden until selected, so the
 * copy is indexable and a screen reader can read every review.
 */
export function TestimonialsSection({
  items,
  heading,
  body,
  ariaShow,
  ariaPrev,
  ariaNext,
  photo,
  photoAlt,
}: {
  items: readonly Testimonial[];
  heading: string;
  body: string;
  ariaShow: string;
  ariaPrev: string;
  ariaNext: string;
  photo: string;
  photoAlt: string;
}) {
  const [index, setIndex] = useState(Math.max(items.length - 1, 0));
  const step = (delta: number) => setIndex((i) => (i + delta + items.length) % items.length);
  // The reception photograph drifts against the scroll inside its clipped box.
  const { ref: photoRef, offset: photoOffset } = useScrollParallax(0.07, 36);

  return (
    <section id="voices" className="pt-20 pb-20 sm:pb-27.5">
      <Container className="grid items-center [grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr))]">
        <div className="flex min-h-[440px] flex-col gap-5 bg-[var(--home-surface)] p-7 sm:p-14">
          <h2 className="font-display m-0 text-[clamp(30px,3.2vw,42px)] font-extrabold tracking-[-0.02em] text-[var(--home-brand-text)] uppercase">
            {heading}
          </h2>
          <p className="m-0 border-b border-[var(--home-hairline)] pb-5 text-[15.5px] leading-[1.6] text-[var(--home-muted)]">{body}</p>

          {items.map((item, i) => (
            <div key={item.name} hidden={i !== index} className="flex flex-col gap-5">
              <div className="flex items-center gap-4.5">
                <span
                  aria-hidden
                  className="font-display flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border-[3px] border-[var(--home-accent)] bg-[var(--home-bg)] text-[24px] font-extrabold text-[var(--home-brand-text)]"
                >
                  {initials(item.name)}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[18px] font-extrabold text-[var(--home-heading)]">{item.name}</span>
                  <span className="text-[13.5px] font-bold text-[var(--home-muted-2)]">{item.role}</span>
                </span>
              </div>
              <blockquote
                className="font-display m-0 text-[clamp(22px,2.2vw,30px)] leading-[1.3] font-semibold tracking-[-0.01em] text-[var(--home-heading)]"
                style={{ textWrap: "pretty" }}
              >
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </div>
          ))}

          <div className="mt-auto flex items-center justify-between gap-4 pt-4">
            <div className="flex gap-2">
              {items.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  aria-label={ariaShow.replace("{n}", String(i + 1))}
                  aria-pressed={i === index}
                  onClick={() => setIndex(i)}
                  className={`h-1 w-[34px] transition-colors ${
                    i === index ? "bg-[var(--home-brand-text)]" : "bg-[var(--home-hairline-strong)]"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="mr-2 text-[13px] font-bold text-[var(--home-muted-2)] tabular-nums">
                {index + 1} / {items.length}
              </span>
              <button
                type="button"
                aria-label={ariaPrev}
                onClick={() => step(-1)}
                className="sj-invert flex h-12 w-12 items-center justify-center border-[1.5px] border-[var(--home-heading)] text-[var(--home-heading)]"
              >
                <HomeIcon name="left" size={22} stroke={2} />
              </button>
              <button
                type="button"
                aria-label={ariaNext}
                onClick={() => step(1)}
                // The reference draws this box with the theme's ink border over a
                // fixed #1A1540 fill, so on the dark theme the border stays light
                // and the box is still visible against the lavender card.
                className="flex h-12 w-12 items-center justify-center border-[1.5px] border-[var(--home-heading)] bg-[var(--home-ink)] text-white transition-colors hover:border-[var(--home-brand)] hover:bg-[var(--home-brand)]"
              >
                <HomeIcon name="right" size={22} stroke={2} />
              </button>
            </div>
          </div>
        </div>
        <div className="relative h-[360px] overflow-hidden shadow-[0_30px_60px_-30px_rgba(26,21,64,0.45)] sm:h-[540px]">
          <div ref={photoRef} style={{ transform: `translateY(${photoOffset}px)` }} className="absolute inset-x-0 -inset-y-[8%]">
            <Image src={photo} alt={photoAlt} fill sizes="(min-width: 960px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}
