import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { standards } from "../data/content";

/**
 * `#standards`: a fixed-dark photo band making the page's central argument,
 * with the dispensing rules listed beside it.
 *
 * Fixed-dark in both themes, like the home page's own pharmacy band: the
 * photograph is the background, so the copy stays white and the CTA carries
 * `sj-invert` to hover to the light-on-dark treatment rather than following the
 * theme tokens.
 */
export function StandardsSection() {
  return (
    <section id="standards" className="relative mt-26 overflow-hidden bg-[#08123A]">
      <ParallaxLayer factor={0.12} maxOffsetPx={80} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <Image
          src="/images/pharmacy/dispensing-pharmacist.jpg"
          alt=""
          fill
          className="object-cover opacity-45"
          sizes="100vw"
        />
      </ParallaxLayer>
      {/* Near-opaque under the copy on the left, easing off to the right so the
          photograph reads as texture behind the standards list. The reference's
          0.78 right stop left this particular image almost invisible. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #060B1F 4%, rgba(6,11,31,0.88) 52%, rgba(6,11,31,0.68) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-11">
        <div className="grid grid-cols-2 items-center gap-14 max-[899px]:grid-cols-1 max-[899px]:gap-10">
          <Reveal>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
              02 / How we dispense
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(38px,5.2vw,74px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
              A pharmacist
              <br />
              reads it, not
              <br />
              just a shelf
            </h2>
            <p
              className="mt-5.5 max-w-[46ch] text-[17.5px] leading-[1.65] text-white/80"
              style={{ textWrap: "pretty" }}
            >
              Every prescription is checked by a pharmacist against your hospital record before anything
              is packed. Because they can read your file, they can flag an interaction with something else
              you are taking, or confirm a dose against what your doctor prescribed.
            </p>
            <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.7] text-white/60">
              We hold authorized stock only, with no substitutes and no grey market supply, so what your
              consultant wrote is what you are handed.
            </p>
            <a
              href="#refills"
              className="sj-invert mt-7 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
            >
              Set up a repeat prescription <span aria-hidden>&rarr;</span>
            </a>
          </Reveal>

          <RevealStagger stepMs={55} className="flex flex-col gap-0.5 bg-white/18">
            {standards.map((row) => (
              <div
                key={row.k}
                className="flex items-baseline justify-between gap-5 bg-[#08123A] px-6.5 py-4.75"
              >
                <span className="text-[16px] text-white/72">{row.k}</span>
                <span className="font-display text-right text-[19px] font-bold tracking-[-0.02em] text-white">
                  {row.v}
                </span>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
