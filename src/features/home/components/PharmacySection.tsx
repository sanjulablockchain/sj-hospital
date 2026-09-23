import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { LOGO_MARK } from "@/config/brand";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import type { HomeContent } from "../data/getContent";
import { HomeIcon } from "./HomeIcon";
import { Container, Eyebrow, pillButton, ArrowRight } from "./primitives";

const VALUE_TONE = {
  ink: "text-[var(--home-heading)]",
  sky: "text-[var(--home-accent-soft)]",
  brand: "text-[var(--home-brand-text)]",
} as const;

/**
 * `#pharmacy`: a sky card with the leaf mark ghosted top-left at 10%, the
 * three-segment heading (the last segment in brand text), two buttons, and
 * the four fact rows in a white table on the right.
 */
export function PharmacySection({
  content,
  locale,
}: {
  content: HomeContent["content"]["pharmacy"];
  locale: Locale;
}) {
  return (
    <section id="pharmacy" className="pb-20 sm:pb-27.5">
      <Container>
        <Reveal className="relative grid items-center gap-10 overflow-hidden rounded-[18px] bg-[var(--home-sky-bg)] px-6 py-12 sm:gap-14 sm:px-16 sm:py-18 [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
          <Image
            src={LOGO_MARK.src}
            alt=""
            aria-hidden
            width={LOGO_MARK.width}
            height={LOGO_MARK.height}
            className="pointer-events-none absolute -top-20 -left-30 h-[130%] w-auto opacity-10"
          />
          <div className="relative flex flex-col gap-5.5">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className="font-display m-0 text-[clamp(42px,5vw,76px)] leading-[0.92] font-extrabold tracking-[-0.04em] text-[var(--home-heading)] uppercase">
              {content.heading.line1} {content.heading.line2}{" "}
              <span className="text-[var(--home-brand-text)]">{content.heading.line3}</span>
            </h2>
            <p className="m-0 max-w-[480px] text-[17px] leading-[1.65] text-[var(--home-body)]" style={{ textWrap: "pretty" }}>
              {content.body}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-3">
              <Link href={localeHref(content.hrefPrimary, locale)} className={`${pillButton("brand")} h-[54px] px-6.5 text-[15px]`}>
                {content.ctaPrimary} <ArrowRight />
              </Link>
              <Link href={localeHref(content.hrefSecondary, locale)} className={`${pillButton("outline")} h-[54px] px-6.5 text-[15px]`}>
                {content.ctaSecondary}
              </Link>
            </div>
          </div>
          <dl className="relative m-0 flex flex-col rounded-[14px] bg-[var(--home-bg)] px-5 py-2 shadow-[0_24px_50px_-30px_rgba(26,21,64,0.35)] sm:px-8">
            {content.stats.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between gap-4 py-6.5 ${
                  i < content.stats.length - 1 ? "border-b border-[var(--home-hairline)]" : ""
                }`}
              >
                <dt className="flex items-center gap-3.5 text-[15.5px] font-bold text-[var(--home-muted)]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--home-surface-2)] text-[var(--home-brand-text)]">
                    <HomeIcon name={row.icon} size={20} />
                  </span>
                  {row.label}
                </dt>
                <dd
                  className={`font-display m-0 text-[clamp(26px,2.6vw,36px)] font-extrabold tracking-[-0.02em] tabular-nums ${VALUE_TONE[row.tone]}`}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
