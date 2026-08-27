import Image from "next/image";
import Link from "next/link";
import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Ticker } from "@/components/ui/Ticker";
import { wellnessNavigation } from "@/config/wellnessNavigation";
import { heroFacts, tickerItems } from "../data/content";

/**
 * `#top`: a school assembly behind the themed header and the page's only <h1>,
 * closed off by a fact strip and the ticker of what the screening covers.
 *
 * The reference put its own ward round photograph here, an elderly man in a
 * hospital bed, which is the wrong subject for a page about children at school
 * and was replaced. The photograph used instead shows a crowd of uniformed
 * students from behind: no face is identifiable and no school is named, which
 * matters more here than on any other page, because this one is about
 * examining children and promises that individual findings never leave the
 * parent's envelope.
 *
 * Accent colours are literal rather than `var(--home-accent)`, as on the other
 * hero blocks: this sits on a photograph in both themes, and the light theme
 * swaps that token to a deep `#0B6FC0` that would sink into the image.
 */
export function WellnessHero() {
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
          src="/images/school-wellness/assembly.jpg"
          alt="A school assembly of students in uniform seen from behind, seated in rows"
          fill
          priority
          className="animate-sj-burns object-cover"
          style={{ objectPosition: "50% 38%" }}
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

      <ThemedHeader navItems={wellnessNavigation} homeHref="/" bookHref="/e-channeling" />

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
            We come to the school
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
            School Wellness
          </div>

          <h1 className="font-display animate-sj-up mt-4.5 text-[clamp(42px,7vw,116px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-white uppercase">
            The problem
            <br />
            {/* Outlined rather than filled, so the line steps from solid to
                hollow to accent across the three words. */}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.4px rgba(242,246,255,0.75)" }}
            >
              nobody
            </span>{" "}
            <span className="text-[#2CA6F0]">noticed.</span>
          </h1>

          <div className="animate-sj-up mt-8 flex flex-col items-start gap-5.5">
            <p
              className="max-w-[54ch] text-[18px] leading-[1.6] text-white/82"
              style={{ textWrap: "pretty" }}
            >
              A child who cannot read the board is not slow. A child who falls asleep in class may
              be anaemic. Our team comes to your school, screens every student, and tells you which
              ones need a doctor.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#book"
                className="sj-invert inline-flex items-center gap-2.5 bg-[#2CA6F0] px-6 py-4 text-[15px] font-bold text-[#04122B]"
              >
                Bring us to your school <span aria-hidden>&rarr;</span>
              </a>
              <a
                href="#programme"
                className="inline-flex items-center gap-3 border border-white/30 px-6 py-4 text-[15px] font-bold whitespace-nowrap text-white transition-colors hover:bg-white hover:text-[#060B1F]"
              >
                <span aria-hidden className="animate-sj-pulse h-2 w-2 rounded-full bg-[#2CA6F0]" />
                What the screening covers
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
