import Image from "next/image";
import Link from "next/link";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Ticker } from "@/components/ui/Ticker";
import { localeHref } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import type { InternationalCareContent } from "../data/getContent";

/**
 * `#top`: the arrival photograph behind the themed header and the page's only
 * <h1>, closed off by a fact strip and the scrolling ticker.
 *
 * The image is a wide-body on approach at dusk, landing lights lit over a lit
 * runway, which is the moment the headline is about. It is deliberately not the
 * building: the home, services and facilities heroes already carry three views
 * of that, and this is the one page whose subject is the journey rather than the
 * place. The aircraft is silhouetted, so no airline or airport is identifiable
 * and nothing on it contradicts Katunayake.
 *
 * Accent colours here are literal rather than `var(--home-accent)`: this block
 * is fixed-dark in both themes because it sits on a photograph, and the light
 * theme swaps that token to a deep `#0B6FC0` that would sink into the image.
 * The reference solves the same problem with its `[data-fixed-dark]` blocks.
 *
 * Copy animates with `animate-sj-up` rather than `Reveal`, since it is already
 * in the first viewport and should not wait on an intersection observer.
 */
export function InternationalHero({ content, locale }: { content: InternationalCareContent; locale: Locale }) {
  const { hero, heroFacts, tickerItems, whatsappHref } = content;
  return (
    <section
      id="top"
      className="relative flex pt-[var(--sj-header-h)] min-h-[84vh] flex-col overflow-hidden bg-[#060B1F] max-[899px]:min-h-[76vh]"
    >
      <ParallaxLayer
        factor={0.14}
        maxOffsetPx={100}
        className="absolute inset-x-0 -top-[14%] h-[128%] overflow-hidden"
      >
        {/* Two framings rather than one. On a wide screen the focal point is
            pulled left of centre, which pushes the aircraft and its
            landing-light flare into the right half, clear of the left-aligned
            copy: centred, the flare sits directly behind the lede and eats its
            contrast. Below 640px the crop is so narrow that the same framing
            loses the aircraft altogether, so the phone recentres on it. */}
        <Image
          src="/images/international/hero-arrival.jpg"
          alt="A wide-body airliner on approach at dusk, landing lights lit above a runway"
          fill
          priority
          // Deliberately far above 100vw. The parallax layer is 128% of a
          // 76-84vh section, so this box is much taller than the viewport and
          // object-cover scales to its *height*: at sizes="100vw" (the default
          // for `fill`) Next serves a 390px source into a 406x1690 box on a
          // phone and upscales it more than sixfold. These values ask for a
          // candidate wide enough to cover the height instead.
          sizes="(max-width: 640px) 300vw, (max-width: 1024px) 200vw, 150vw"
          className="animate-sj-burns object-cover object-[36%_44%] max-[640px]:object-[50%_46%]"
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

        {/* min-w-0: a flex item's automatic min-width is its content's
            min-content size, not zero, so without this the column (and the
            hero row it sits in) refused to shrink below its widest
            untranslated-English-sized content once the Tamil and Sinhala
            copy grew past it, pushing the row past a 360px viewport. */}
        <div className="min-w-0 flex-1 pb-11">
          <div className="animate-sj-up inline-flex items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
            <span aria-hidden className="h-px w-11 bg-[#2CA6F0]" />
            <Link href={localeHref("/", locale)} className="text-[#7FCBFF] hover:text-white">
              {hero.breadcrumbHome}
            </Link>
            <span aria-hidden className="opacity-50">
              /
            </span>
            {hero.breadcrumbCurrent}
          </div>

          {/* `wrap-break-word`: Sinhala and Tamil can put a single unbreakable
              token on one of these lines, with nothing beside it for the
              browser to reflow around, so the word itself needs to be able to
              wrap: the same fix `network`'s and `home-care`'s own hero
              headings needed. */}
          <h1 className="font-display animate-sj-up wrap-break-word mt-4.5 text-[clamp(42px,7vw,116px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-white uppercase">
            {hero.headingLead}
            <br />
            {/* Outlined rather than filled, so the three lines read as one
                phrase stepping from solid to hollow to accent. */}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.4px rgba(242,246,255,0.75)" }}
            >
              {hero.headingPlace}
            </span>
            <br />
            <span className="text-[#2CA6F0]">{hero.headingTail}</span>
          </h1>

          <div className="animate-sj-up mt-8 flex flex-col items-start gap-5.5">
            <p
              className="max-w-[54ch] text-[18px] leading-[1.6] text-white/82"
              style={{ textWrap: "pretty" }}
            >
              {hero.standfirst}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#enquiry"
                className="sj-invert inline-flex items-center gap-2.5 bg-[#2CA6F0] px-6 py-4 text-[15px] font-bold text-[#04122B]"
              >
                {hero.estimateCta} <span aria-hidden>&rarr;</span>
              </a>
              {/* No `whitespace-nowrap`: the English CTA fits on one line,
                  but "Desk க்கு WhatsApp செய்யுங்கள்" does not at 360px, and
                  nowrap text does not shrink, so it pushed the whole hero row
                  past the viewport instead of wrapping. */}
              <a
                href={whatsappHref}
                className="inline-flex items-center gap-3 border border-white/30 px-6 py-4 text-[15px] font-bold text-white transition-colors hover:bg-white hover:text-[#060B1F]"
              >
                <span aria-hidden className="animate-sj-pulse h-2 w-2 rounded-full bg-[#2CA6F0]" />
                {hero.whatsappCta}
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
