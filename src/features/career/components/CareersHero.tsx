import Image from "next/image";
import Link from "next/link";
import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Ticker } from "@/components/ui/Ticker";
import { careerNavigation } from "@/config/careerNavigation";
import { heroFacts, tickerItems } from "../data/content";

/**
 * `#top`: the hospital's own clinical staff behind the themed header and the
 * page's only <h1>, closed off by a fact strip and the ticker of role families.
 *
 * The photograph is St. Joseph's own (five staff in the hospital's branded
 * scrubs and coat), not stock. The reference used `doctors.jpg` here, a
 * 1200x1200 square with a patient in the frame; this one is 2560px wide, has
 * no patient in it, and is the only photograph on the site that shows what a
 * candidate would actually be joining.
 *
 * Accent colours are literal rather than `var(--home-accent)`: this block is
 * fixed-dark in both themes because it sits on a photograph, and the light
 * theme swaps that token to a deep `#0B6FC0` that would sink into the image.
 * Same exemption /network's hero takes.
 *
 * Copy animates with `animate-sj-up` rather than `Reveal`, since it is already
 * in the first viewport and should not wait on an intersection observer.
 */
export function CareersHero() {
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
          src="/images/career/team.jpg"
          alt="Five St. Joseph Hospital Negombo clinicians in branded scrubs and a white coat, standing together"
          fill
          priority
          sizes="100vw"
          className="animate-sj-burns object-cover"
          // The asset is 2560x2000 with the group occupying the bottom 76% and
          // a blurred strip above it (see the note on the file). Biasing down
          // seats the group in the lower half, where the gradient is thinnest,
          // and leaves the parallax overhang and the Ken Burns zoom travelling
          // through the blurred strip rather than through anybody's face.
          style={{ objectPosition: "50% 62%" }}
        />
      </ParallaxLayer>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(6,11,31,0.9) 0%, rgba(6,11,31,0.56) 42%, rgba(6,11,31,0.97) 100%)",
        }}
      />
      <div
        className="animate-sj-sheen absolute inset-0"
        style={{
          background:
            "radial-gradient(64% 50% at 80% 26%, rgba(44,166,240,0.3) 0%, rgba(6,11,31,0) 66%)",
        }}
      />

      <ThemedHeader navItems={careerNavigation} homeHref="/" bookHref="#form" />

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
            We never charge candidates
          </span>
          <span className="w-px flex-1 bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        <div className="flex-1 pb-11">
          <div className="animate-sj-up inline-flex items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
            <span aria-hidden className="h-px w-11 bg-[#2CA6F0]" />
            <Link href="/" className="text-[#7FCBFF] hover:text-white">
              Home
            </Link>
            <span aria-hidden className="opacity-50">
              /
            </span>
            Careers
          </div>

          <h1 className="font-display animate-sj-up mt-4.5 text-[clamp(42px,7vw,118px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-white uppercase">
            Stay in
            <br />
            {/* Outlined rather than filled, so the three lines read as one
                phrase stepping from solid to hollow to accent. */}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.4px rgba(242,246,255,0.75)" }}
            >
              Sri Lanka.
            </span>
            <br />
            <span className="text-[#2CA6F0]">Practise properly.</span>
          </h1>

          <div className="animate-sj-up mt-8 flex flex-col items-start gap-5.5">
            <p
              className="max-w-[54ch] text-[18px] leading-[1.6] text-white/82"
              style={{ textWrap: "pretty" }}
            >
              Too many good clinicians leave because the equipment is old, the rosters are punishing
              and nobody invests in them. We are trying to be the hospital that gives you a reason to
              stay.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#openings"
                className="sj-invert inline-flex items-center gap-2.5 bg-[#2CA6F0] px-6 py-4 text-[15px] font-bold text-[#04122B]"
              >
                See open roles <span aria-hidden>&rarr;</span>
              </a>
              <a
                href="#fraud"
                className="inline-flex items-center gap-3 border border-white/30 px-6 py-4 text-[15px] font-bold whitespace-nowrap text-white transition-colors hover:bg-white hover:text-[#060B1F]"
              >
                <span aria-hidden className="animate-sj-pulse h-2 w-2 rounded-full bg-[#2CA6F0]" />
                Beware of job scams
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
                  // "None, ever" is the one the page most wants read, so it
                  // takes the accent, exactly as in the reference.
                  index === 1 ? "text-[#2CA6F0]" : "text-white"
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
