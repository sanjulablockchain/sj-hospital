"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import type { SpecialtyTab } from "../data/content";
import { HomeIcon } from "./HomeIcon";
import { pillButton, ArrowRight } from "./primitives";

type Props = {
  tabs: readonly SpecialtyTab[];
  topServicesHeading: string;
  countTemplate: string;
  findDoctor: { cta: string; href: string };
  exploreMore: { cta: string; href: string };
  ariaPrev: string;
  ariaNext: string;
  locale: Locale;
};

/**
 * Six chips over one card: the active tab's photograph on the left (fading in
 * on change), its title, paragraph and "top services" chips on the right, with
 * round brand arrows either side from `lg`. WAI-ARIA tabs: the chip row is a
 * `tablist`, arrows move the selection, the panel is labelled by its chip.
 * Every tab's links are rendered only when active, which is fine here: the
 * services index the "Explore more" button opens lists all of them for a
 * crawler, and `specialties.test.ts` checks the hrefs at build time.
 */
export function SpecialtiesCarousel({
  tabs,
  topServicesHeading,
  countTemplate,
  findDoctor,
  exploreMore,
  ariaPrev,
  ariaNext,
  locale,
}: Props) {
  const [index, setIndex] = useState(0);
  const baseId = useId();
  const active = tabs[index];
  const total = tabs.length;
  const step = (delta: number) => setIndex((i) => (i + delta + total) % total);
  const pad = (n: number) => String(n).padStart(2, "0");
  const count = countTemplate.replace("{n}", pad(index + 1)).replace("{total}", pad(total));

  const arrow =
    "hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--home-brand)] text-white transition-colors hover:bg-[var(--home-brand-hover)] lg:flex";

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div role="tablist" aria-label={topServicesHeading} className="flex flex-wrap justify-center gap-2.5">
        {tabs.map((tab, i) => {
          const selected = i === index;
          return (
            <button
              key={tab.group}
              id={`${baseId}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              onClick={() => setIndex(i)}
              className={`h-10 rounded-full border-[1.5px] px-4.5 text-[12.5px] font-extrabold tracking-[0.06em] uppercase transition-colors ${
                selected
                  ? "border-[var(--home-chip-on)] bg-[var(--home-chip-on)] text-[var(--home-chip-on-fg)]"
                  : "border-[var(--home-brand-text)] bg-transparent text-[var(--home-brand-text)] hover:bg-[var(--home-surface)]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex w-full items-center gap-5">
        <button type="button" aria-label={ariaPrev} onClick={() => step(-1)} className={arrow}>
          <HomeIcon name="left" size={22} stroke={2} />
        </button>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${index}`}
          className="grid min-w-0 flex-1 gap-8 rounded-[18px] bg-[var(--home-bg)] p-4 shadow-[0_30px_60px_-40px_rgba(26,21,64,0.4)] sm:p-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]"
        >
          <div className="relative min-h-[260px] overflow-hidden rounded-[12px] bg-[#DDE3EE] sm:min-h-[360px]">
            <Image
              key={active.image}
              src={active.image}
              alt={active.title}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="animate-sj-fade-slow object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 py-2 pr-2">
            <span className="text-[12px] font-extrabold tracking-[0.14em] text-[var(--home-accent-soft)] uppercase tabular-nums">
              {count}
            </span>
            <h3 className="font-display m-0 text-[28px] font-extrabold tracking-[-0.02em] text-[var(--home-heading)] sm:text-[34px]">
              {active.title}
            </h3>
            <p className="m-0 text-[16px] leading-[1.7] text-[var(--home-muted)]">{active.desc}</p>
            <span className="mt-1.5 text-[14px] font-extrabold text-[var(--home-heading)]">{topServicesHeading}</span>
            <div className="flex flex-wrap gap-2 border-b border-[var(--home-hairline)] pb-4.5">
              {active.links.map((link) => (
                <Link
                  key={link.href}
                  href={localeHref(link.href, locale)}
                  className="rounded-full bg-[var(--home-surface)] px-3 py-2 text-[13.5px] font-bold text-[var(--home-body)] transition-colors hover:bg-[var(--home-brand)] hover:text-white"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-3">
              <Link
                href={localeHref(findDoctor.href, locale)}
                className={`${pillButton("outline")} h-[50px] px-6 text-[13.5px] tracking-[0.04em] uppercase`}
              >
                {findDoctor.cta} <ArrowRight />
              </Link>
              <Link
                href={localeHref(exploreMore.href, locale)}
                className={`${pillButton("outline")} h-[50px] px-6 text-[13.5px] tracking-[0.04em] uppercase`}
              >
                {exploreMore.cta} <ArrowRight />
              </Link>
            </div>
          </div>
        </div>

        <button type="button" aria-label={ariaNext} onClick={() => step(1)} className={arrow}>
          <HomeIcon name="right" size={22} stroke={2} />
        </button>
      </div>
    </div>
  );
}
