import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Ticker } from "@/components/ui/Ticker";
import type { LaboratoryContent } from "../data/getContent";

/**
 * `#top`: the laboratory analyser photo behind the themed header and the
 * page's only <h1>, closed off by the fact strip and a ticker of the eight
 * tests people ask for most, each with its price.
 *
 * Fixed-dark in both themes, with the literal accents every other hero on
 * the site records (`#9CC8FF`, `rgba(124,53,207,…)`): the light theme's
 * `--home-accent` would sink into the photograph.
 *
 * `standfirst` and `facts` arrive already filled: the page replaces the
 * `{count}` / `{fromPrice}` / `{sameDayCount}` / `{opdDiscount}` tokens from
 * the catalogue summary and the laboratory service entry, so this component
 * never reads a data file.
 */
export function LaboratoryHero({
  content,
  standfirst,
  facts,
  tickerItems,
}: {
  content: LaboratoryContent;
  standfirst: string;
  facts: readonly { k: string; v: string }[];
  tickerItems: readonly string[];
}) {
  const { hero } = content;
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(84vh-120px)] flex-col overflow-hidden bg-[#061026] sj-fixed-dark max-[899px]:min-h-[calc(76vh-120px)]"
    >
      <ParallaxLayer factor={0.14} maxOffsetPx={100} className="absolute inset-x-0 -top-[14%] h-[128%] overflow-hidden">
        <Image
          src="/images/services/heroes/laboratory.jpg"
          alt="A gloved hand holding a sample vial beside a laboratory analyser"
          fill
          preload
          sizes="100vw"
          className="animate-sj-burns object-cover"
        />
      </ParallaxLayer>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(rgba(6,16,38,0.9) 0%, rgba(6,16,38,0.5) 42%, rgba(6,16,38,0.96) 100%)",
        }}
      />
      <div
        className="animate-sj-sheen absolute inset-0"
        style={{
          background: "radial-gradient(66% 52% at 78% 26%, rgba(124,53,207,0.32) 0%, rgba(6,16,38,0) 66%)",
        }}
      />

      <div className="relative z-10 mx-auto mt-auto flex w-full max-w-[1440px] gap-10 px-5 sm:px-8 lg:px-11">
        <div aria-hidden className="flex shrink-0 basis-11 flex-col items-center gap-4.5 pb-2.5 max-[899px]:hidden">
          <span className="text-[11px] tracking-[0.3em] text-white/50 uppercase" style={{ writingMode: "vertical-rl" }}>
            {hero.strapline}
          </span>
          <span className="w-px flex-1 bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        <div className="min-w-0 flex-1 pb-11">
          <div className="animate-sj-up inline-flex items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[#9CC8FF] uppercase">
            <span aria-hidden className="h-px w-11 bg-[var(--home-accent)]" />
            <LocaleLink href="/" className="text-[#9CC8FF] hover:text-white">
              {hero.breadcrumbHome}
            </LocaleLink>
            <span aria-hidden className="opacity-50">
              /
            </span>
            {hero.breadcrumbCurrent}
          </div>

          <h1 className="font-display animate-sj-up wrap-break-word mt-4.5 text-[clamp(44px,7.6vw,126px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-white uppercase">
            {hero.headingLead}
            <br />
            <span className="text-[var(--home-accent)]">{hero.headingAccent}</span>
          </h1>

          <div className="animate-sj-up mt-8 flex flex-col items-start gap-5.5">
            <p className="max-w-[52ch] text-[18px] leading-[1.6] text-white/82" style={{ textWrap: "pretty" }}>
              {standfirst}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#list"
                className="sj-invert inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
              >
                {content.sectionEyebrows.list.replace(/^\d+ \/ /, "")} <span aria-hidden>&rarr;</span>
              </a>
              <a
                href="tel:+94117848484"
                className="inline-flex items-center gap-3 border border-white/30 px-6 py-4 text-[15px] font-bold whitespace-nowrap text-white tabular-nums transition-colors hover:bg-white hover:text-[#061026]"
              >
                <span aria-hidden className="animate-sj-pulse h-2 w-2 rounded-full bg-[var(--home-accent)]" />
                {hero.call.value}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-11 border-t border-white/14 bg-[#061026]/55 sj-fixed-dark">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-4 px-5 sm:px-8 lg:px-11 max-[899px]:grid-cols-2 max-[640px]:grid-cols-1">
          {facts.map((fact, index) => (
            <div key={fact.k} className={`py-5.5 ${index === 0 ? "pr-6" : "px-6"} max-[899px]:px-0 max-[899px]:pr-6`}>
              <dt className="text-[11.5px] tracking-[0.16em] text-white/50 uppercase">{fact.k}</dt>
              <dd
                className={`font-display mt-1.5 text-[22px] font-bold tracking-[-0.02em] tabular-nums ${
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
