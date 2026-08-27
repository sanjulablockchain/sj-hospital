import Image from "next/image";
import Link from "next/link";
import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Ticker } from "@/components/ui/Ticker";
import { facilitiesNavigation } from "@/config/facilitiesNavigation";
import { heroFacts, tickerItems } from "@/features/facilities/data/content";

/**
 * `#top`: a fixed-dark corridor photograph behind the themed header and the
 * page's only <h1>, then the fact strip and the marquee.
 *
 * Content uses `animate-sj-up` rather than <Reveal> because it is already in
 * the first viewport on load, so waiting on an intersection observer would only
 * delay it. Same choice ServicesHero and the home hero make.
 */
export function FacilitiesHero() {
  return (
    <section id="top" className="relative flex flex-col overflow-hidden bg-[#060B1F]">
      <div className="relative flex min-h-[86vh] flex-col max-[899px]:min-h-[76vh]">
        <ParallaxLayer
          factor={0.14}
          maxOffsetPx={100}
          className="absolute inset-x-0 -top-[14%] h-[128%] overflow-hidden"
        >
          {/* The real building at dusk, not stock interior photography. It is
              already dark enough to carry white display type, it is unmistakably
              this hospital, and the storeys are visible in frame, which is the
              claim the section below this one makes. The services hero uses the
              -a angle, so this page takes -b. */}
          <Image
            src="/images/services/exterior-dusk-b.png"
            alt="St. Joseph Hospital, Negombo, at dusk"
            fill
            priority
            className="animate-sj-burns object-cover"
            style={{ objectPosition: "50% 42%" }}
          />
        </ParallaxLayer>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(6,11,31,0.84) 0%, rgba(6,11,31,0.46) 40%, rgba(6,11,31,0.96) 100%)",
          }}
        />

        <ThemedHeader navItems={facilitiesNavigation} homeHref="/" bookHref="/e-channeling" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end gap-6 px-5 pb-14 sm:px-8 lg:px-11">
          <div className="animate-sj-up flex flex-wrap items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
            <span className="h-px w-11 bg-[var(--home-accent)]" />
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden className="opacity-50">
              /
            </span>
            <span>Facilities</span>
          </div>
          <h1 className="font-display animate-sj-up text-[clamp(50px,8.6vw,146px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-white uppercase">
            Built like a
            <br />
            <span className="text-[var(--home-accent)]">US</span> facility.
          </h1>
          <div className="grid gap-9 min-[900px]:grid-cols-[minmax(0,1fr)_auto] min-[900px]:items-end">
            <p
              className="animate-sj-up max-w-[54ch] text-[18px] leading-[1.6] text-white/82"
              style={{ textWrap: "pretty" }}
            >
              Six purpose built floors in Negombo: operating theatres with the recovery bay next door,
              monitored critical care beside them, a laboratory that never closes, and rooms where your
              family can actually stay the night.
            </p>
            <div className="animate-sj-up flex flex-wrap gap-3">
              <a
                href="#floors"
                className="inline-flex w-fit items-center gap-3 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
              >
                Walk the building <span aria-hidden>&rarr;</span>
              </a>
              <a
                href="tel:+94117848484"
                className="inline-flex w-fit items-center gap-3 border border-white/30 px-6 py-4 text-[15px] font-bold text-white tabular-nums"
              >
                0117 84 84 84
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-11">
        <dl className="grid grid-cols-1 gap-px bg-white/14 min-[640px]:grid-cols-2 min-[900px]:grid-cols-4">
          {heroFacts.map((fact) => (
            <div key={fact.k} className="bg-[#060B1F] px-6 py-6">
              <dt className="text-[11.5px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">{fact.k}</dt>
              <dd className="font-display mt-2.5 text-[19px] leading-[1.15] font-semibold tracking-[-0.02em] text-white">
                {fact.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-12">
        <Ticker items={tickerItems} />
      </div>
    </section>
  );
}
