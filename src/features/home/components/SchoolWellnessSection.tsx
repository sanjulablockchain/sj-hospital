"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { useParallax } from "../hooks/useParallax";
import type { HomeContent } from "../data/getContent";

export function SchoolWellnessSection({ content }: { content: HomeContent["content"]["schoolWellness"] }) {
  const { eyebrow, heading, body, rows, cta, photoAlt, photoCaption } = content;
  const { ref: photoRef, offset: photoOffset } = useParallax(0.08, 50);

  return (
    <section id="wellness" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <div className="grid gap-15 min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[900px]:items-center">
        <Reveal className="min-w-0">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            {eyebrow}
          </div>
          <h2 className="font-display mt-4.5 wrap-break-word text-[clamp(38px,4.6vw,70px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-[var(--home-heading)] uppercase">
            {heading.line1}
            <br />
            {heading.line2}
          </h2>
          <p className="mt-5.5 max-w-[48ch] text-[17.5px] leading-[1.65] text-[var(--home-muted)]" style={{ textWrap: "pretty" }}>
            {body}
          </p>
          <div className="mt-8 flex flex-col border-t border-[var(--home-hairline)]">
            {rows.map((row, index) => (
              <div key={index} className="flex items-baseline justify-between gap-5 border-b border-[var(--home-hairline)] py-4.5">
                <span className="text-[17px] font-bold text-[var(--home-heading)]">{row.title}</span>
                <span className="text-[14px] text-[var(--home-muted)]">{row.note}</span>
              </div>
            ))}
          </div>
          {/* Through to the page rather than down to #contact, the same way the
              network teaser links to /network: the school wellness page's own
              #book section is where a principal starts. */}
          <Link
            href="/school-wellness"
            className="sj-invert mt-7 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
          >
            {cta} <span aria-hidden>&rarr;</span>
          </Link>
        </Reveal>
        <Reveal className="relative min-h-[450px] overflow-hidden bg-[#0B1846]">
          <div ref={photoRef} style={{ transform: `translateY(${photoOffset}px)` }} className="absolute inset-x-0 -top-[8%] h-[116%]">
            <Image
              src="/images/career-staff.jpg"
              alt={photoAlt}
              fill
              sizes="(min-width: 900px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(6,11,31,0) 40%, rgba(6,11,31,0.8) 100%)" }} />
          <div className="absolute bottom-0 left-0 max-w-full wrap-break-word bg-[var(--home-accent)] px-6 py-4.5 text-[14px] font-bold text-[var(--home-on-accent)]">
            {photoCaption}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
