import Image from "next/image";
import Link from "next/link";
import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Ticker } from "@/components/ui/Ticker";
import { internationalNavigation } from "@/config/internationalNavigation";
import { heroFacts, tickerItems } from "../data/content";

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
export function InternationalHero() {
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

      <ThemedHeader navItems={internationalNavigation} homeHref="/" bookHref="/e-channeling" />

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
            Ten minutes from the airport
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
            International Patient Care
          </div>

          <h1 className="font-display animate-sj-up mt-4.5 text-[clamp(42px,7vw,116px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-white uppercase">
            You land at
            <br />
            {/* Outlined rather than filled, so the three lines read as one
                phrase stepping from solid to hollow to accent. */}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.4px rgba(242,246,255,0.75)" }}
            >
              Katunayake.
            </span>
            <br />
            <span className="text-[#2CA6F0]">We take it from there.</span>
          </h1>

          <div className="animate-sj-up mt-8 flex flex-col items-start gap-5.5">
            <p
              className="max-w-[54ch] text-[18px] leading-[1.6] text-white/82"
              style={{ textWrap: "pretty" }}
            >
              We are ten minutes from Bandaranaike International Airport, on St. Joseph Street in
              central Negombo. The international desk arranges the transfer, the estimate, the
              interpreter and the records you take home, from the first email to the flight back.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#enquiry"
                className="sj-invert inline-flex items-center gap-2.5 bg-[#2CA6F0] px-6 py-4 text-[15px] font-bold text-[#04122B]"
              >
                Get a written estimate <span aria-hidden>&rarr;</span>
              </a>
              <a
                href="https://wa.me/94742223334"
                className="inline-flex items-center gap-3 border border-white/30 px-6 py-4 text-[15px] font-bold whitespace-nowrap text-white transition-colors hover:bg-white hover:text-[#060B1F]"
              >
                <span aria-hidden className="animate-sj-pulse h-2 w-2 rounded-full bg-[#2CA6F0]" />
                WhatsApp the desk
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
