import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { HealthTipsContent } from "../data/getContent";

/**
 * `#seasonal`: the dengue band. The exterior render sits behind at low opacity
 * as texture rather than as a subject, with a left-to-right scrim over it so
 * the type stays legible; both are fixed-dark, since this band keeps its dark
 * ground in the light theme too (the same treatment the home page's tinted
 * bands use).
 *
 * The reference framed this as "This season". It is stated as a standing risk
 * instead: the page is served every day of the year, and a hard-coded season
 * is wrong for most of them.
 *
 * `dengue` arrives as a prop, already localized, rather than being imported
 * here.
 */
export function SeasonalSection({ dengue }: { dengue: HealthTipsContent["dengue"] }) {
  const { denguePoints, seasonalSection } = dengue;

  return (
    <section id="seasonal" className="relative mt-24 overflow-hidden bg-[#08123A]">
      <Image
        src="/images/services/exterior-dusk-a.png"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-[0.26]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #060B1F 4%, rgba(6,11,31,0.9) 55%, rgba(6,11,31,0.78) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-23 sm:px-8 lg:px-11">
        <div className="grid grid-cols-1 items-center gap-10 min-[900px]:grid-cols-2 min-[900px]:gap-14.5">
          <Reveal className="min-w-0">
            <div className="inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-3.5 py-2 text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-on-accent)] uppercase">
              {seasonalSection.badge}
            </div>
            <h2 className="font-display mt-5 wrap-break-word text-[clamp(38px,5.2vw,74px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
              {seasonalSection.heading.line1}
              <br />
              {seasonalSection.heading.line2}
              <br />
              {seasonalSection.heading.line3}
            </h2>
            <p
              className="mt-5.5 max-w-[46ch] text-[17.5px] leading-[1.65] text-white/80"
              style={{ textWrap: "pretty" }}
            >
              {seasonalSection.body1}
            </p>
            <p className="mt-4 max-w-[48ch] wrap-break-word text-[16px] leading-[1.7] text-white/60">
              {seasonalSection.body2}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#warning"
                className="inline-flex min-w-0 items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold wrap-break-word text-[var(--home-on-accent)] transition-colors hover:bg-white hover:text-[#060B1F]"
              >
                {seasonalSection.ctaWarning} <span aria-hidden>&rarr;</span>
              </a>
              <a
                href="tel:+94117848484"
                className="inline-flex min-w-0 items-center gap-2.5 border border-white/30 px-6 py-4 text-[15px] font-bold wrap-break-word text-white transition-colors hover:bg-white hover:text-[#060B1F]"
              >
                {seasonalSection.ctaFever}
              </a>
            </div>
          </Reveal>

          <RevealStagger
            stepMs={50}
            className="flex flex-col gap-px bg-[rgba(242,246,255,0.18)]"
          >
            {denguePoints.map((point) => (
              <div key={point} className="flex min-w-0 items-baseline gap-4 bg-[#08123A] px-6.5 py-4.75">
                <span className="shrink-0 text-[13px] text-[var(--home-accent)]" aria-hidden>
                  &#10022;
                </span>
                <span className="wrap-break-word text-[15.5px] leading-[1.5] text-white/82">{point}</span>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
