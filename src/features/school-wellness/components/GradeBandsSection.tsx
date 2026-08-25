import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { gradeBands } from "../data/content";

/**
 * `#grades`: the five age bands, against the dusk exterior washed back to 24%
 * behind a left-to-right scrim.
 *
 * The photograph is the one the reference itself used here, which already
 * ships as `/images/network/exterior-dusk.png` for the network hero, so this
 * reuses it rather than adding a second copy.
 *
 * Fixed-dark in both themes, like the hero: the panel is a photograph with a
 * `#060B1F` scrim over it, so its foreground colours are literal and its rows
 * sit on `--home-surface-2`'s dark value rather than the token, which the light
 * theme turns white.
 *
 * The heading column is `position: sticky` above 900px and static below, per
 * the reference's `[data-r="sticky"]` rule.
 */
export function GradeBandsSection() {
  return (
    <section id="grades" className="relative mt-26 overflow-hidden bg-[#08123A] max-[640px]:mt-18">
      <ParallaxLayer
        factor={0.12}
        maxOffsetPx={80}
        className="absolute inset-x-0 -top-[10%] h-[120%] opacity-24"
      >
        <Image
          src="/images/network/exterior-dusk.png"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
      </ParallaxLayer>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #060B1F 4%, rgba(6,11,31,0.9) 55%, rgba(6,11,31,0.78) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-23 sm:px-8 lg:px-11">
        <Reveal className="grid grid-cols-[0.85fr_1.15fr] items-start gap-14.5 max-[899px]:grid-cols-1 max-[899px]:gap-10">
          <div className="sticky top-10 max-[899px]:static">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
              03 / By age group
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(36px,4.6vw,66px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
              Different
              <br />
              ages, different
              <br />
              worries
            </h2>
            <p className="mt-5.5 max-w-[40ch] text-[17px] leading-[1.65] text-white/78">
              The national school health programme concentrates on Grades 1, 4, 7 and 10. We follow
              that rhythm and add what the school asks for.
            </p>
          </div>

          <div className="flex flex-col gap-px bg-white/18">
            {gradeBands.map((band) => (
              <div key={band.band} className="bg-[#08123A] px-7 py-6.5">
                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="bg-[#2CA6F0] px-2.75 py-1.5 text-[12px] font-bold tracking-[0.16em] whitespace-nowrap text-[#04122B] uppercase">
                    {band.band}
                  </span>
                  <span className="font-display text-[23px] font-bold tracking-[-0.025em] text-white">
                    {band.title}
                  </span>
                </div>
                <p className="mt-3 max-w-[68ch] text-[15.5px] leading-[1.6] text-white/74">
                  {band.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
