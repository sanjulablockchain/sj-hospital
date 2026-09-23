import Image from "next/image";
import Link from "next/link";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Reveal } from "@/components/ui/Reveal";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import type { HomeContent } from "../data/getContent";
import { Container, displayHeading, pillButton, ArrowRight } from "./primitives";

/**
 * `#free-opd`: a sky-tinted card, the doctor's portrait on the left and the
 * pill, heading, copy, three ticks and two buttons on the right. Stacks under
 * 880px with the portrait on top, anchored to his face (object-position 50%
 * 15%, the same crop note the data file carries).
 */
export function FreeOpdSection({
  content,
  locale,
}: {
  content: HomeContent["content"]["freeOpd"];
  locale: Locale;
}) {
  return (
    <section id="free-opd" className="py-20 sm:py-27.5">
      <Container>
        <Reveal className="grid overflow-hidden rounded-[18px] bg-[var(--home-sky-bg)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
          <div className="relative min-h-[320px] overflow-hidden sm:min-h-[480px]">
            {/* Taller than its box so the scroll drift never shows an edge. */}
            <ParallaxLayer factor={0.07} maxOffsetPx={36} className="absolute inset-x-0 -inset-y-[8%]">
              <Image
                src={content.photo}
                alt={content.photoAlt}
                fill
                sizes="(min-width: 900px) 50vw, 100vw"
                className="object-cover object-[50%_15%]"
              />
            </ParallaxLayer>
          </div>
          <div className="flex flex-col justify-center gap-5 p-7 sm:p-15">
            <span className="self-start rounded-full bg-[var(--home-brand)] px-3 py-[7px] text-[12px] font-extrabold tracking-[0.16em] text-white uppercase">
              {content.eyebrow}
            </span>
            <h2 className={displayHeading}>{content.heading}</h2>
            <p className="m-0 max-w-[520px] text-[17px] leading-[1.65] text-[var(--home-body)]" style={{ textWrap: "pretty" }}>
              {content.body}
            </p>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {content.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-[15.5px] font-bold text-[var(--home-heading)]">
                  <span
                    aria-hidden
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--home-brand)] text-[12px] text-white"
                  >
                    &#10003;
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link href={localeHref(content.hrefPrimary, locale)} className={`${pillButton("brand")} h-[52px] px-6.5 text-[15px]`}>
                {content.ctaPrimary} <ArrowRight />
              </Link>
              <a href={content.hrefSecondary} className={`${pillButton("outline")} h-[52px] px-6.5 text-[15px]`}>
                {content.ctaSecondary}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
