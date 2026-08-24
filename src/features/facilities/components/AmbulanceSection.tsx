import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { ambulanceSpecs } from "@/features/facilities/data/content";

/**
 * `#ambulance`: the second full-bleed dark band, fixed-dark in both themes for
 * the same reason as the theatre band.
 */
export function AmbulanceSection() {
  return (
    <section id="ambulance" className="relative mt-30 overflow-hidden bg-[#060B1F]">
      <ParallaxLayer factor={0.1} maxOffsetPx={70} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <Image
          src="/images/facilities/ambulance-night.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 50%" }}
        />
      </ParallaxLayer>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(6,11,31,0.9) 0%, rgba(6,11,31,0.8) 50%, rgba(6,11,31,0.94) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-26 sm:px-8 lg:px-11">
        <div className="grid gap-10 min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] min-[900px]:gap-16">
          <Reveal>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
              06 / Ambulance &amp; transfers
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(36px,4.2vw,62px)] leading-[0.94] font-extrabold tracking-[-0.035em] text-white uppercase">
              Treatment
              <br />
              starts in the
              <br />
              vehicle
            </h2>
            <p className="mt-6 max-w-[56ch] text-[16px] leading-[1.65] text-white/80">
              Our own ambulances are on call around the clock and dispatched from the same covered bay that
              patients arrive through, so care begins before you reach the door.
            </p>
            <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.65] text-white/80">
              The laboratory and digital X-ray sit metres from that bay, so bloods and films come back while
              you are still being assessed. We are ten minutes from Bandaranaike International, and our own
              ambulance is available for transfer.
            </p>
            <a
              href="tel:+94117848484"
              className="animate-sj-pulse mt-9 inline-flex w-fit items-center gap-3 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)] tabular-nums"
            >
              Call an ambulance: 0117 84 84 84
            </a>
          </Reveal>

          <Reveal>
            <dl className="border-t border-white/20">
              {ambulanceSpecs.map((spec) => (
                <div
                  key={spec.k}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-white/20 py-4"
                >
                  <dt className="text-[13.5px] text-white/64">{spec.k}</dt>
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
