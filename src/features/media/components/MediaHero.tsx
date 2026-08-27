import Image from "next/image";
import Link from "next/link";
import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Ticker } from "@/components/ui/Ticker";
import { mediaNavigation } from "@/config/mediaNavigation";
import { heroFacts, tickerItems } from "../data/content";

/**
 * `#top`: the clinical team photograph behind the themed header and the page's
 * only <h1>, closed off by a fact strip and the scrolling ticker.
 *
 * It is also the second shot in the image library below, which is deliberate:
 * the picture the press desk offers journalists is the picture the page opens
 * with.
 *
 * Not the reference's photograph. The reference used `doctors.jpg`, which shows
 * an identifiable patient in a bed, on a page that promises in two places that
 * no identifiable patient is released at any resolution. That contradiction is
 * the one a journalist would notice, so this page uses the staff portrait
 * instead. `doctors.jpg` stays in use on the four other pages that carry it;
 * only /media, which makes the promise, avoids it.
 *
 * Accent colours here are literal rather than `var(--home-accent)`: this block
 * is fixed-dark in both themes because it sits on a photograph, and the light
 * theme swaps that token to a deep `#0B6FC0` that would sink into the image.
 * The reference solves the same problem with its `[data-fixed-dark]` blocks.
 *
 * Copy animates with `animate-sj-up` rather than `Reveal`, since it is already
 * in the first viewport and should not wait on an intersection observer.
 */
export function MediaHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[80vh] flex-col overflow-hidden bg-[#060B1F] max-[899px]:min-h-[76vh]"
    >
      <ParallaxLayer
        factor={0.14}
        maxOffsetPx={100}
        className="absolute inset-x-0 -top-[14%] h-[128%] overflow-hidden"
      >
        <Image
          src="/images/career-staff.jpg"
          alt="Three St. Joseph Hospital clinicians in branded scrubs standing together"
          fill
          priority
          className="animate-sj-burns object-cover"
          style={{ objectPosition: "50% 32%" }}
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
            "radial-gradient(62% 50% at 76% 26%, rgba(44,166,240,0.3) 0%, rgba(6,11,31,0) 66%)",
        }}
      />

      <ThemedHeader navItems={mediaNavigation} homeHref="/" bookHref="/e-channeling" />

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
            Press desk answers same day
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
            Media
          </div>

          <h1 className="font-display animate-sj-up mt-4.5 text-[clamp(44px,7.6vw,126px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-white uppercase">
            On the
            <br />
            {/* Outlined then accent, so the three words step from solid to
                hollow to accent across two lines. */}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.4px rgba(242,246,255,0.75)" }}
            >
              record.
            </span>{" "}
            <span className="text-[#2CA6F0]">Always.</span>
          </h1>

          <div className="animate-sj-up mt-8 flex flex-col items-start gap-5.5">
            <p
              className="max-w-[54ch] text-[18px] leading-[1.6] text-white/82"
              style={{ textWrap: "pretty" }}
            >
              Hospital news, clinical milestones, community programmes and everything a journalist
              needs to file accurately: named spokespeople, approved logos, high resolution
              photographs and a desk that replies the same working day.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#newsroom"
                className="sj-invert inline-flex items-center gap-2.5 bg-[#2CA6F0] px-6 py-4 text-[15px] font-bold text-[#04122B]"
              >
                Read the newsroom <span aria-hidden>&rarr;</span>
              </a>
              {/* The reference labels this "Download the press kit", but no kit
                  file exists to download. It goes to the section that lists what
                  the kit holds and how to ask for it. */}
              <a
                href="#kit"
                className="inline-flex items-center gap-3 border border-white/30 px-6 py-4 text-[15px] font-bold whitespace-nowrap text-white transition-colors hover:bg-white hover:text-[#060B1F]"
              >
                <span aria-hidden className="animate-sj-pulse h-2 w-2 rounded-full bg-[#2CA6F0]" />
                See the press kit
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
