import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { theatreFigures, theatreSpecs } from "@/features/facilities/data/content";

/**
 * `#theatres`: a full-bleed band with a drifting theatre photograph behind it.
 *
 * Fixed-dark in both themes, like the hero: the copy sits directly on the
 * photograph. `mt-30` gives the band air from the showcase cards above rather
 * than letting the two dark blocks fuse into one, the same spacing fix the
 * services page's tinted bands carry.
 */
export function TheatresSection() {
  return (
    <section id="theatres" className="relative mt-30 overflow-hidden bg-[#060B1F]">
      <ParallaxLayer factor={0.12} maxOffsetPx={80} className="absolute inset-x-0 -top-[12%] h-[124%]">
        <Image
          src="/images/facilities/operating-theatre.jpg"
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
            "linear-gradient(rgba(6,11,31,0.92) 0%, rgba(6,11,31,0.82) 50%, rgba(6,11,31,0.95) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-26 sm:px-8 lg:px-11">
        <div className="grid gap-10 min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] min-[900px]:gap-16">
          <Reveal>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
              02 / Operating theatres
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(36px,4.2vw,62px)] leading-[0.94] font-extrabold tracking-[-0.035em] text-white uppercase">
              Tracked steel,
              <br />
              single use,
              <br />
              one nurse each
            </h2>
            <p className="mt-6 max-w-[56ch] text-[16px] leading-[1.65] text-white/80">
              Our theatres run to US surgical protocol, with tracking on every instrument set. Instruments
              and consumables are single use for each patient, without exception.
            </p>
            <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.65] text-white/80">
              A recovery nurse is assigned to watch over you from the moment you leave theatre until you are
              ready for a ward bed or for home. Surgical and anaesthetic teams stay on call, so emergency
              surgery happens here rather than after a transfer.
            </p>

            <dl className="mt-11 grid grid-cols-1 gap-px bg-white/14 min-[640px]:grid-cols-3">
              {theatreFigures.map((figure) => (
                <div key={figure.label} className="bg-[#060B1F]/70 px-6 py-7">
                  <dt className="sr-only">{figure.label}</dt>
                  <dd>
                    <span className="font-display block text-[54px] leading-[0.85] font-extrabold tracking-[-0.04em] text-[var(--home-accent)] tabular-nums min-[900px]:text-[clamp(58px,5.4vw,84px)]">
                      {figure.value}
                    </span>
                    <span className="mt-3 block text-[13.5px] leading-[1.4] text-white/72">
                      {figure.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal>
            <dl className="border-t border-white/20">
              {theatreSpecs.map((spec) => (
                <div
                  key={spec.k}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-white/20 py-4"
                >
                  <dt className="text-[13.5px] tracking-[0.02em] text-white/64">{spec.k}</dt>
                  <dd className="font-display text-[16px] font-semibold tracking-[-0.01em] text-white">
                    {spec.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
