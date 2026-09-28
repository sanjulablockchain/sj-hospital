import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Ticker } from "@/components/ui/Ticker";
import type { HomeCareContent } from "../data/getContent";

/**
 * `#top`: a home visit behind the themed header and the page's only <h1>,
 * closed off by the fact strip.
 *
 * The photograph is the one already used for the home visits service detail
 * page, which is the same subject this page leads with. Reusing it is
 * deliberate: a reader arriving here from /services/home-visits should
 * recognise where they are, and the media library has no second home-visit
 * photograph that would say anything the first does not.
 *
 * The ticker closing the section is the band every other hero on the site ends
 * with, and `navigation.test.ts` now requires it of all of them. This page
 * briefly shipped without one on the reasoning that the four facts were the
 * whole story; that was wrong, because the marquee is what a reader who scrolls
 * no further actually reads.
 *
 * Accent colours are literal rather than `var(--home-accent)`, as on the other
 * hero blocks: this sits on a photograph in both themes, and the light theme
 * swaps that token to a deep `#0B6FC0` that would sink into the image.
 */
export function HomeCareHero({ content }: { content: HomeCareContent }) {
  const { hero, heroFacts, heroStandfirst, tickerItems } = content;
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(84vh-120px)] flex-col overflow-hidden bg-[#0B0826] max-[899px]:min-h-[calc(76vh-120px)]"
    >
      <ParallaxLayer
        factor={0.14}
        maxOffsetPx={100}
        className="absolute inset-x-0 -top-[14%] h-[128%] overflow-hidden"
      >
        <Image
          src="/images/services/heroes/home-visits.jpg"
          alt="A healthcare worker checking a patient's blood pressure during a home visit"
          fill
          priority
          className="animate-sj-burns object-cover"
          style={{ objectPosition: "50% 40%" }}
        />
      </ParallaxLayer>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(12,8,38,0.9) 0%, rgba(12,8,38,0.56) 42%, rgba(12,8,38,0.97) 100%)",
        }}
      />
      <div
        className="animate-sj-sheen absolute inset-0"
        style={{
          background:
            "radial-gradient(64% 50% at 78% 24%, rgba(82,181,232,0.3) 0%, rgba(12,8,38,0) 66%)",
        }}
      />

      <div className="relative z-10 mx-auto mt-auto flex w-full max-w-[1440px] gap-5.5 px-5 sm:px-8 lg:px-11">
        {/* Decorative vertical strapline, dropped below 900px where there is no
            gutter to spare. */}
        <div
          aria-hidden
          className="flex shrink-0 basis-11 flex-col items-center gap-4.5 pb-2.5 max-[899px]:hidden"
        >
          <span
            className="text-[11px] tracking-[0.3em] text-white/50 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            {hero.strapline}
          </span>
          <span className="w-px flex-1 bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        <div className="min-w-0 flex-1 pb-11">
          <div className="animate-sj-up inline-flex items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[#9FD6F5] uppercase">
            <span aria-hidden className="h-px w-11 bg-[var(--home-accent)]" />
            <LocaleLink href="/" className="text-[#9FD6F5] hover:text-white">
              {hero.breadcrumbHome}
            </LocaleLink>
            <span aria-hidden className="opacity-50">
              /
            </span>
            {hero.breadcrumbCurrent}
          </div>

          {/* `wrap-break-word`: Sinhala and Tamil can put a single unbreakable
              token in `headingLead`, with nothing beside it on that line for
              the browser to reflow around (see the trap this heading hit at
              360px in Tamil, fixed by allowing the word itself to wrap). */}
          <h1 className="font-display animate-sj-up wrap-break-word mt-4.5 text-[clamp(42px,7vw,116px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-white uppercase">
            {hero.headingLead}
            <br />
            {/* Outlined rather than filled, so the line steps from solid to
                hollow to accent across the three lines. */}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.4px rgba(242,246,255,0.75)" }}
            >
              {hero.headingOutline}
            </span>{" "}
            <span className="text-[var(--home-accent)]">{hero.headingAccent}</span>
          </h1>

          <div className="animate-sj-up mt-8 flex flex-col items-start gap-5.5">
            <p
              className="max-w-[54ch] text-[18px] leading-[1.6] text-white/82"
              style={{ textWrap: "pretty" }}
            >
              {heroStandfirst}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#book"
                className="sj-invert inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
              >
                {hero.bookCta} <span aria-hidden>&rarr;</span>
              </a>
              <a
                href="#visits"
                className="inline-flex items-center gap-3 border border-white/30 px-6 py-4 text-[15px] font-bold whitespace-nowrap text-white transition-colors hover:bg-white hover:text-[#0B0826]"
              >
                <span aria-hidden className="animate-sj-pulse h-2 w-2 rounded-full bg-[var(--home-accent)]" />
                {hero.visitsCta}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-11 border-t border-white/14 bg-[#0B0826]/55">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-4 px-5 sm:px-8 lg:px-11 max-[899px]:grid-cols-2 max-[640px]:grid-cols-1">
          {heroFacts.map((fact, index) => (
            <div
              key={fact.k}
              className={`py-5.5 ${index === 0 ? "pr-6" : "px-6"} max-[899px]:px-0 max-[899px]:pr-6`}
            >
              <dt className="text-[11.5px] tracking-[0.16em] text-white/50 uppercase">{fact.k}</dt>
              <dd
                className={`font-display mt-1.5 text-[22px] font-bold tracking-[-0.02em] ${
                  index === 1 ? "text-[var(--home-accent)]" : "text-white"
                }`}
              >
                {fact.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Ticker items={tickerItems} />
    </section>
  );
}
