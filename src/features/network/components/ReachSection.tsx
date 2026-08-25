import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { reachRows } from "../data/content";

/**
 * `#reach`: the group's published figures, over a ward round at 20% opacity.
 *
 * Fixed-dark in both themes, like the hero: the copy sits on a photograph, and
 * the light theme's deeper accent would sink into it.
 *
 * The left column is sticky through the nine rows on the right, and goes static
 * at 900px where the split collapses. The right-hand `who` column drops out at
 * 1024px, per the reference's `[data-r="reachwho"]` rule: at that width the
 * three columns crush the middle one.
 *
 * Each row is one `<dt>` paired with two `<dd>`s, wrapped in its own `<div>`
 * (HTML5 permits that inside a `dl`), so the DOM stays valid: `dt` first, then
 * both `dd`s. The reference draws the number first, so `order-first` sits on
 * the number `dd` alone to pull it into the first grid column; the key and the
 * `who` cell keep their natural order. That renders number, key, who without
 * ever placing a `dd` before its `dt` in the markup.
 */
export function ReachSection() {
  return (
    <section id="reach" className="relative mt-26 overflow-hidden bg-[#08123A]">
      <ParallaxLayer factor={0.12} maxOffsetPx={90} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <Image
          src="/images/international/ward-round.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
        />
      </ParallaxLayer>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #060B1F 4%, rgba(6,11,31,0.9) 55%, rgba(6,11,31,0.76) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-23 sm:px-8 lg:px-11">
        <Reveal className="grid grid-cols-[0.85fr_1.15fr] items-start gap-14.5 max-[899px]:grid-cols-1 max-[899px]:gap-10">
          <div className="sticky top-10 max-[899px]:static">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
              03 / The numbers
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(36px,4.6vw,66px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
              What the
              <br />
              network
              <br />
              adds up to
            </h2>
            <p className="mt-5.5 max-w-[40ch] text-[17px] leading-[1.65] text-white/78">
              Figures as published by the group companies. We would rather show you a small honest
              number than an impressive vague one.
            </p>
          </div>

          <dl>
            {reachRows.map((row) => (
              <div
                key={row.k}
                className="grid grid-cols-[0.5fr_1fr_0.5fr] items-baseline gap-5.5 border-b border-white/16 px-1 py-5 max-[1023px]:grid-cols-[1fr_0.6fr] max-[899px]:grid-cols-1 max-[899px]:gap-y-1.5"
              >
                <dt className="text-[16px] font-bold text-white">{row.k}</dt>
                <dd className="font-display order-first text-[34px] leading-none font-extrabold tracking-[-0.04em] text-[#2CA6F0] tabular-nums">
                  {row.n}
                </dd>
                <dd className="text-right text-[13.5px] leading-[1.5] text-white/60 max-[1023px]:hidden">
                  {row.who}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
