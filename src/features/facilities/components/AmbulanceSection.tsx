import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { LOGO_MARK } from "@/config/brand";
import type { FacilitiesContent } from "../data/getContent";

/**
 * `#ambulance`: the second full-bleed dark band, fixed-dark in both themes for
 * the same reason as the theatre band.
 *
 * Solid navy rather than a photograph, matching the reference: an oversized
 * leaf mark drifts behind the copy at 12% instead. That also keeps the two dark
 * bands distinct, since the theatre band above is the one carrying a photo.
 */
export function AmbulanceSection({ content }: { content: FacilitiesContent }) {
  const {
    ambulanceCall,
    ambulanceHeading,
    ambulanceIntro1,
    ambulanceIntro2,
    ambulanceSpecs,
    sectionEyebrows,
  } = content;
  return (
    <section id="ambulance" className="relative mt-30 overflow-hidden bg-[#08123A]">
      <ParallaxLayer
        factor={0.1}
        maxOffsetPx={70}
        className="pointer-events-none absolute -top-[20%] -left-[6%] w-[32%] opacity-[0.12]"
      >
        <Image
          src={LOGO_MARK.src}
          alt=""
          aria-hidden
          width={LOGO_MARK.width}
          height={LOGO_MARK.height}
          className="h-auto w-full"
        />
      </ParallaxLayer>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-26 sm:px-8 lg:px-11">
        <div className="grid min-w-0 gap-10 min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] min-[900px]:gap-16">
          <Reveal className="min-w-0">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
              {sectionEyebrows.ambulance}
            </div>
            <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,4.2vw,62px)] leading-[0.94] font-extrabold tracking-[-0.035em] text-white uppercase">
              {ambulanceHeading.line1}
              <br />
              {ambulanceHeading.line2}
              <br />
              {ambulanceHeading.line3}
            </h2>
            <p className="mt-6 max-w-[56ch] text-[16px] leading-[1.65] text-white/80">{ambulanceIntro1}</p>
            <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.65] text-white/80">{ambulanceIntro2}</p>
            <a
              href={ambulanceCall.href}
              className="animate-sj-pulse mt-9 inline-flex w-fit items-center gap-3 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)] tabular-nums"
            >
              {ambulanceCall.label}: {ambulanceCall.value}
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
