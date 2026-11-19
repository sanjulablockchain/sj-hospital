import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { DownloadIcon } from "@/components/ui/Icons";
import { Ticker } from "@/components/ui/Ticker";
import type { ServiceBookContent } from "../data/getContent";
import { pageImages } from "../data/pageImages";

/** The three pages fanned out beside the heading: the cover, a service, a price table. */
const FAN = [
  { page: 20, className: "translate-x-[18%] translate-y-[10%] rotate-[7deg]" },
  { page: 9, className: "translate-x-[8%] translate-y-[4%] rotate-[2deg]" },
  { page: 1, className: "-rotate-[4deg]" },
];

/**
 * `#top`: the hospital at dusk behind the themed header, the page's only
 * <h1>, and from 900px the book itself fanned out on the right.
 *
 * Fixed-dark in both themes, like every page hero: the literals are the
 * brand hero set (`#0B0826` base, `#9FD6F5` eyebrow) the pharmacy and
 * laboratory heroes use, because the light theme's accent would sink into
 * the photograph.
 *
 * The fan is hidden below 900px, and its images are lazy, so a phone never
 * downloads them; the chapter cards just below show the book on a phone.
 */
export function ServiceBookHero({ content }: { content: ServiceBookContent }) {
  const { hero, heroFacts, heroStandfirst, download } = content;
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(84vh-120px)] flex-col overflow-hidden bg-[#0B0826] max-[899px]:min-h-[calc(76vh-120px)]"
    >
      <ParallaxLayer factor={0.14} maxOffsetPx={100} className="absolute inset-x-0 -top-[14%] h-[128%] overflow-hidden">
        <Image
          src="/images/home/hero-dusk-facade.jpg"
          alt="St. Joseph Hospital, Negombo, at dusk"
          fill
          preload
          sizes="100vw"
          className="animate-sj-burns object-cover"
        />
      </ParallaxLayer>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(12,8,38,0.94) 0%, rgba(12,8,38,0.78) 48%, rgba(12,8,38,0.55) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto my-auto grid w-full max-w-[1440px] gap-10 px-5 pt-14 pb-14 sm:px-8 min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] min-[900px]:items-center min-[900px]:pt-20 min-[900px]:pb-24 lg:px-11">
        <div className="min-w-0">
          <div className="animate-sj-up inline-flex flex-wrap items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[#9FD6F5] uppercase">
            <span aria-hidden className="h-px w-11 bg-[var(--home-accent)]" />
            <LocaleLink href="/" className="text-[#9FD6F5] hover:text-white">
              {hero.breadcrumbHome}
            </LocaleLink>
            <span aria-hidden className="opacity-50">
              /
            </span>
            {hero.breadcrumbCurrent}
          </div>

          <h1 className="font-display animate-sj-up wrap-break-word mt-4.5 text-[clamp(52px,8vw,128px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-white uppercase">
            {hero.headingLead}
            <br />
            <span className="text-[var(--home-accent)]">{hero.headingAccent}</span>
          </h1>
          <p className="animate-sj-up mt-3 text-[13px] font-bold tracking-[0.2em] text-white/60 uppercase">
            {hero.strapline}
          </p>

          <p
            className="animate-sj-up mt-7 max-w-[52ch] text-[18px] leading-[1.6] text-white/82"
            style={{ textWrap: "pretty" }}
          >
            {heroStandfirst}
          </p>

          <div className="animate-sj-up mt-7 flex flex-wrap gap-3">
            <LocaleLink
              href="/service-book/read"
              className="inline-flex min-h-11 items-center bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)] transition-colors hover:bg-white hover:text-[#0B0826]"
            >
              {hero.readCta}
            </LocaleLink>
            <a
              href={download.href}
              download
              className="inline-flex min-h-11 items-center gap-2.5 border border-white/30 px-6 py-4 text-[15px] font-bold text-white transition-colors hover:bg-white hover:text-[#0B0826]"
            >
              <DownloadIcon className="h-4.5 w-4.5" />
              {hero.downloadCta} ({download.size})
            </a>
          </div>
        </div>

        <div aria-hidden className="relative mx-auto aspect-[2000/1414] w-[88%] max-[899px]:hidden">
          {FAN.map(({ page, className }) => (
            <div
              key={page}
              className={`absolute inset-0 overflow-hidden rounded-[8px] shadow-[0_40px_70px_-25px_rgba(0,0,0,0.75)] ring-1 ring-white/15 ${className}`}
            >
              <Image src={pageImages[page - 1]} alt="" fill sizes="(min-width: 1440px) 560px, 40vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 border-t border-white/14 bg-[#0B0826]/55">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-4 px-5 sm:px-8 lg:px-11 max-[899px]:grid-cols-2">
          {heroFacts.map((fact, index) => (
            <div key={fact.k} className={`py-5.5 ${index === 0 ? "pr-6" : "px-6"} max-[899px]:px-0 max-[899px]:pr-6`}>
              <dt className="text-[11.5px] tracking-[0.16em] text-white/50 uppercase">{fact.k}</dt>
              <dd
                className={`font-display mt-1.5 text-[22px] font-bold tracking-[-0.02em] tabular-nums ${
                  index === 0 ? "text-[var(--home-accent)]" : "text-white"
                }`}
              >
                {fact.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Ticker items={hero.ticker} />
    </section>
  );
}
