import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { hygieneRows } from "@/features/facilities/data/content";

/**
 * `#hygiene`: the cleaning and sterilisation discipline, with a ward photograph
 * beside it.
 *
 * Tinted rather than full-bleed dark, so it reads as part of the page body and
 * the two dark bands (theatres, ambulance) keep their weight.
 */
export function HygieneSection() {
  return (
    <section id="hygiene" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <div className="grid gap-10 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] min-[900px]:items-center min-[900px]:gap-16">
        <Reveal>
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            08 / Hygiene &amp; safety
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,4vw,58px)] leading-[0.94] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            Cleaned every
            <br />
            two hours,
            <br />
            by the clock
          </h2>
          <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.65] text-[var(--home-muted)]">
            Infection control is a schedule, not a slogan. Every surface in the building is cleaned on a two
            hour cycle to US specification.
          </p>

          <dl className="mt-9 border-t border-[var(--home-hairline)]">
            {hygieneRows.map((row) => (
              <div
                key={row.k}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[var(--home-hairline)] py-4"
              >
                <dt className="text-[13.5px] text-[var(--home-muted)]">{row.k}</dt>
                <dd className="font-display text-[15.5px] font-semibold tracking-[-0.01em] text-[var(--home-heading)]">
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#08123A]">
            <ParallaxLayer factor={0.08} maxOffsetPx={40} className="absolute inset-x-0 -top-[8%] h-[116%]">
              <Image
                src="/images/facilities/sterile-instruments.jpg"
                alt="A sterile instrument set laid out on a drape before surgery"
                fill
                sizes="(min-width: 900px) 50vw, 100vw"
                className="object-cover"
              />
            </ParallaxLayer>
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(rgba(6,11,31,0.1) 40%, rgba(6,11,31,0.9) 100%)" }}
            />
            <p className="absolute inset-x-0 bottom-0 p-7 text-[15px] leading-[1.45] font-bold text-white">
              Consumables are single use, and never reused
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
