"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { useParallax } from "../hooks/useParallax";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { CountUp } from "./CountUp";
import { LOGO_MARK } from "@/config/brand";
import { localeHref } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import type { HomeContent } from "../data/getContent";

export function PharmacySection({
  content,
  locale,
}: {
  content: HomeContent["content"]["pharmacy"];
  locale: Locale;
}) {
  const { eyebrow, heading, body, ctaPrimary, ctaSecondary, stats } = content;
  const { ref: watermarkRef, offset: watermarkOffset } = useParallax(0.1, 60);

  return (
    <section id="pharmacy" className="relative mt-30 overflow-hidden bg-[#08123A]">
      <div
        ref={watermarkRef}
        style={{ transform: `translateY(${watermarkOffset}px)` }}
        className="pointer-events-none absolute -top-[20%] -left-[6%] w-[32%] opacity-12"
      >
        <Image
          src={LOGO_MARK.src}
          alt=""
          width={LOGO_MARK.width}
          height={LOGO_MARK.height}
          className="h-auto w-full"
        />
      </div>
      <div className="relative mx-auto max-w-[1440px] px-5 py-25 sm:px-8 lg:px-11">
        <div className="grid gap-15 min-[900px]:grid-cols-2 min-[900px]:items-center">
          <Reveal className="min-w-0">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">{eyebrow}</div>
            <h2 className="font-display mt-4.5 wrap-break-word text-[clamp(40px,5.2vw,78px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
              {heading.line1}
              <br />
              {heading.line2}
              <br />
              {heading.line3}
            </h2>
            <p className="mt-6 max-w-[46ch] text-[17.5px] leading-[1.65] text-white/78" style={{ textWrap: "pretty" }}>
              {body}
            </p>
            <div className="mt-7.5 flex flex-wrap gap-3">
              <Link
                href={localeHref("/pharmacy#delivery", locale)}
                className="sj-invert inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
              >
                {ctaPrimary} <span aria-hidden>&rarr;</span>
              </Link>
              <a href="tel:+94742223334" className="sj-invert inline-flex items-center gap-2.5 border border-white/30 px-6 py-4 text-[15px] font-bold text-white">
                {ctaSecondary}
              </a>
            </div>
          </Reveal>
          <RevealStagger stepMs={90} className="min-w-0 flex flex-col gap-px bg-white/16">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-baseline justify-between gap-5 bg-[#08123A] px-7.5 py-6">
                <span className="text-[15px] text-white/72">{stat.label}</span>
                <span
                  className={`font-display text-[32px] font-extrabold tracking-[-0.03em] tabular-nums ${
                    stat.accent ? "text-[var(--home-accent)]" : "text-white"
                  }`}
                >
                  {stat.count === undefined ? (
                    stat.value
                  ) : (
                    <>
                      <CountUp to={stat.count} />
                      {stat.suffix}
                    </>
                  )}
                </span>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
