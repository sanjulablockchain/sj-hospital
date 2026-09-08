import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Ticker } from "@/components/ui/Ticker";
import { networkNavigation } from "@/config/networkNavigation";
import { translateNavItems } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";
import type { NetworkContent } from "../data/getContent";

/**
 * `#top`: the dusk exterior behind the themed header and the page's only <h1>,
 * closed off by a fact strip and the ticker of the other eight companies.
 *
 * Accent colours here are literal rather than `var(--home-accent)`: this block
 * is fixed-dark in both themes because it sits on a photograph, and the light
 * theme swaps that token to a deep `#0B6FC0` that would sink into the image.
 * The reference solves the same problem with its `[data-fixed-dark]` blocks.
 *
 * Copy animates with `animate-sj-up` rather than `Reveal`, since it is already
 * in the first viewport and should not wait on an intersection observer.
 */
export function NetworkHero({ content, locale }: { content: NetworkContent; locale: Locale }) {
  const { hero, heroFacts, heroStandfirst, tickerItems } = content;
  return (
    <section
      id="top"
      className="relative flex min-h-[84vh] flex-col overflow-hidden bg-[#060B1F] max-[899px]:min-h-[76vh]"
    >
      <ParallaxLayer
        factor={0.14}
        maxOffsetPx={100}
        className="absolute inset-x-0 -top-[14%] h-[128%] overflow-hidden"
      >
        <Image
          src="/images/network/exterior-dusk.png"
          alt="St. Joseph Hospital Negombo lit at dusk, with an ambulance at the covered entrance bay"
          fill
          priority
          className="animate-sj-burns object-cover"
          style={{ objectPosition: "50% 46%" }}
        />
      </ParallaxLayer>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(6,11,31,0.9) 0%, rgba(6,11,31,0.58) 44%, rgba(6,11,31,0.97) 100%)",
        }}
      />
      <div
        className="animate-sj-sheen absolute inset-0"
        style={{
          background:
            "radial-gradient(64% 50% at 78% 28%, rgba(44,166,240,0.32) 0%, rgba(6,11,31,0) 66%)",
        }}
      />

      <ThemedHeader navItems={translateNavItems(networkNavigation, locale)} homeHref="/" bookHref="/e-channeling" />

      <div className="relative z-10 mx-auto mt-auto flex w-full max-w-[1440px] gap-10 px-5 sm:px-8 lg:px-11">
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
          <div className="animate-sj-up inline-flex items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
            <span aria-hidden className="h-px w-11 bg-[#2CA6F0]" />
            <LocaleLink href="/" className="text-[#7FCBFF] hover:text-white">
              {hero.breadcrumbHome}
            </LocaleLink>
            <span aria-hidden className="opacity-50">
              /
            </span>
            {hero.breadcrumbCurrent}
          </div>

          {/* `wrap-break-word`: Sinhala and Tamil can put a single
              unbreakable token in `headingLead`, with nothing beside it on
              that line for the browser to reflow around, the same trap this
              heading shape hit on home-care's own hero at 360px. */}
          <h1 className="font-display animate-sj-up wrap-break-word mt-4.5 text-[clamp(42px,7vw,118px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-white uppercase">
            {hero.headingLead}
            <br />
            {/* Outlined rather than filled, so the three lines read as one
                phrase stepping from solid to hollow to accent. */}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.4px rgba(242,246,255,0.75)" }}
            >
              {hero.headingOutline}
            </span>
            <br />
            <span className="text-[#2CA6F0]">{hero.headingAccent}</span>
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
                href="#family"
                className="sj-invert inline-flex items-center gap-2.5 bg-[#2CA6F0] px-6 py-4 text-[15px] font-bold text-[#04122B]"
              >
                {hero.familyCta} <span aria-hidden>&rarr;</span>
              </a>
              {/* `whitespace-nowrap` dropped: a long Sinhala or Tamil
                  translation of `mattersCta` does not fit one line at
                  360px, and with the label kept nowrap the whole button (and
                  the page) overflowed rather than wrapping to a second
                  line. */}
              <a
                href="#matters"
                className="inline-flex items-center gap-3 border border-white/30 px-6 py-4 text-[15px] font-bold text-white transition-colors hover:bg-white hover:text-[#060B1F]"
              >
                <span
                  aria-hidden
                  className="animate-sj-pulse h-2 w-2 shrink-0 rounded-full bg-[#2CA6F0]"
                />
                {hero.mattersCta}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-11 border-t border-white/14 bg-[#060B1F]/55">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-4 px-5 sm:px-8 lg:px-11 max-[899px]:grid-cols-2 max-[640px]:grid-cols-1">
          {heroFacts.map((fact, index) => (
            <div
              key={fact.k}
              className={`py-5.5 ${index === 0 ? "pr-6" : "px-6"} max-[899px]:px-0 max-[899px]:pr-6`}
            >
              <dt className="text-[11.5px] tracking-[0.16em] text-white/50 uppercase">{fact.k}</dt>
              <dd
                className={`font-display mt-1.5 text-[22px] font-bold tracking-[-0.02em] ${
                  index === 2 ? "text-[#2CA6F0]" : "text-white"
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
