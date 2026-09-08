import Image from "next/image";
import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { healthTipsNavigation } from "@/config/healthTipsNavigation";
import { translateNavItems } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";
import type { HealthTipsContent } from "../data/getContent";
import { TipsTicker } from "./TipsTicker";

/**
 * `#top`: the page's only <h1>, over a consultation photograph that carries
 * the page's own advice (a blood pressure check). Photo credit is recorded in
 * docs/image-credits.md.
 *
 * Content animates with `animate-sj-up` rather than `Reveal`: it is already in
 * the first viewport, so waiting on an intersection observer would only delay
 * it. Same choice as ServicesHero and the home hero.
 *
 * The hero sits on a dark image in both themes, so its type is fixed-white
 * rather than following `--home-heading`; only the accent follows the token.
 *
 * `pageContent` arrives as a prop, already localized, rather than being
 * imported here: this keeps the page's `HealthTipsPage` the only component
 * that knows which language it is rendering. The "Home" breadcrumb goes
 * through `LocaleLink` rather than a plain `next/link`, so a reader on
 * `/si/health-tips` or `/ta/health-tips` who taps it stays in the language
 * they are already reading, matching `contact`'s, `career`'s and
 * `e-channeling`'s own hero breadcrumbs.
 */
export function TipsHero({
  pageContent,
  locale,
}: {
  pageContent: HealthTipsContent["pageContent"];
  locale: Locale;
}) {
  const { hero, factStrip, tickerLines } = pageContent;

  return (
    <section
      id="top"
      className="relative flex min-h-[82vh] flex-col overflow-hidden bg-[#060B1F] max-[899px]:min-h-[76vh]"
    >
      <ParallaxLayer
        factor={0.14}
        maxOffsetPx={100}
        className="absolute inset-x-0 -top-[14%] h-[128%] overflow-hidden"
      >
        <Image
          src="/images/health-tips/hero-consultation.jpg"
          alt="A doctor checking a patient's blood pressure during a consultation"
          fill
          priority
          className="animate-sj-burns object-cover"
          style={{ objectPosition: "58% 42%" }}
        />
      </ParallaxLayer>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(6,11,31,0.86) 0%, rgba(6,11,31,0.42) 42%, rgba(6,11,31,0.96) 100%)",
        }}
      />

      <ThemedHeader navItems={translateNavItems(healthTipsNavigation, locale)} homeHref="/" bookHref="/e-channeling" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 gap-11 px-5 sm:px-8 lg:px-11">
        {/* Vertical rail: decoration plus a standing label, hidden below 900px
            where there is no width to spare (the reference drops it too). */}
        <div className="hidden min-w-0 flex-col items-center gap-5 pt-2 min-[900px]:flex">
          <span className="text-[11px] font-bold tracking-[0.24em] whitespace-nowrap text-white/55 uppercase [writing-mode:vertical-rl]">
            {hero.verticalLabel}
          </span>
          <span className="w-px flex-1 bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-end pb-11">
          <div className="animate-sj-up inline-flex min-w-0 items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
            <span className="h-px w-11 shrink-0 bg-[var(--home-accent)]" aria-hidden />
            <LocaleLink href="/" className="wrap-break-word text-[#7FCBFF] hover:text-white">
              {hero.breadcrumbHome}
            </LocaleLink>
            <span className="opacity-50" aria-hidden>
              /
            </span>
            <span className="wrap-break-word">{hero.breadcrumbCurrent}</span>
          </div>

          <h1 className="font-display animate-sj-up mt-4.5 wrap-break-word text-[clamp(44px,7.4vw,122px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-white uppercase">
            {hero.headingLine1}
            <br />
            {/* Outlined, then solid: the reference's two-weight treatment of
                the payoff line. -webkit-text-stroke has no Tailwind utility. */}
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
              className="max-w-[52ch] text-[18px] leading-[1.6] text-white/82"
              style={{ textWrap: "pretty" }}
            >
              {hero.body}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#library"
                className="inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)] transition-colors hover:bg-white hover:text-[#060B1F]"
              >
                {hero.ctaLibrary} <span aria-hidden>&rarr;</span>
              </a>
              <a
                href="#warning"
                className="inline-flex min-w-0 items-center gap-3 border border-white/30 px-6 py-4 text-[15px] font-bold wrap-break-word text-white transition-colors hover:bg-white hover:text-[#060B1F]"
              >
                <span
                  aria-hidden
                  className="animate-sj-pulse h-2 w-2 shrink-0 rounded-full bg-[var(--home-accent)]"
                />
                {hero.ctaWarning}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[5] border-t border-white/14 bg-[#060B1F]/55">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-1 px-5 sm:px-8 lg:px-11 min-[641px]:grid-cols-2 min-[900px]:grid-cols-4">
          {factStrip.map((tile) => (
            <div key={tile.label} className="min-w-0 py-5.5 pr-6 max-[640px]:py-4">
              <dt className="wrap-break-word text-[11.5px] tracking-[0.16em] text-white/50 uppercase">
                {tile.label}
              </dt>
              <dd
                className={`font-display wrap-break-word mt-1.5 text-[22px] font-bold tracking-[-0.02em] ${
                  tile.accent ? "text-[var(--home-accent)]" : "text-white"
                }`}
              >
                {tile.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <TipsTicker tickerLines={tickerLines} />
    </section>
  );
}
