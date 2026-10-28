import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import type { HomeContent } from "../data/getContent";
import { ArrowRight, Container, Eyebrow, pillButton } from "./primitives";

/**
 * `#laboratory`: the price list teaser between the free OPD band and the
 * community band, in the pharmacy band's visual pattern: a sky card with
 * the eyebrow, the two line heading (the second line in brand text), the
 * body and two pill buttons on the left, and on the right a two column
 * grid of eight tiles, each a price in display numerals over the test's
 * short name.
 *
 * `body` arrives with its `{count}` / `{fromPrice}` tokens already filled
 * and `tiles` with their prices already looked up, both by `HomePage` from
 * the laboratory feature's catalogue, so this band never reads a data file
 * and never types a figure.
 */
export function LaboratorySection({
  content,
  body,
  tiles,
  locale,
}: {
  content: HomeContent["content"]["laboratory"];
  body: string;
  tiles: readonly { label: string; price: number }[];
  locale: Locale;
}) {
  return (
    <section id="laboratory" className="pb-20 sm:pb-27.5">
      <Container>
        <Reveal className="grid items-center gap-10 overflow-hidden rounded-[18px] bg-[var(--home-sky-bg)] px-6 py-12 sm:gap-14 sm:px-16 sm:py-18 [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
          <div className="flex min-w-0 flex-col gap-5.5">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className="font-display m-0 text-[clamp(38px,4.6vw,68px)] leading-[0.94] font-extrabold tracking-[-0.04em] text-[var(--home-heading)] uppercase">
              {content.heading.line1}{" "}
              <span className="text-[var(--home-brand-text)]">{content.heading.line2}</span>
            </h2>
            <p className="m-0 max-w-[480px] text-[17px] leading-[1.65] text-[var(--home-body)]" style={{ textWrap: "pretty" }}>
              {body}
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
          <RevealStagger
            stepMs={70}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] bg-[var(--home-hairline)] shadow-[0_24px_50px_-30px_rgba(26,21,64,0.35)]"
          >
            {tiles.map((tile) => (
              <div key={tile.label} className="sj-tint-row flex min-w-0 flex-col gap-1 bg-[var(--home-bg)] px-5 py-5 sm:px-6 sm:py-6">
                <span className="font-display text-[clamp(22px,2.4vw,32px)] font-extrabold tracking-[-0.02em] text-[var(--home-heading)] tabular-nums">
                  {tile.price.toLocaleString("en")} <span className="text-[0.55em] font-bold text-[var(--home-muted)]">LKR</span>
                </span>
                <span className="text-[13.5px] leading-[1.35] font-semibold text-[var(--home-muted)]">{tile.label}</span>
              </div>
            ))}
          </RevealStagger>
        </Reveal>
      </Container>
    </section>
  );
}
