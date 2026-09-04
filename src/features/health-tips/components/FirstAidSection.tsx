import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { LOGO_MARK } from "@/config/brand";
import type { HealthTipsContent } from "../data/getContent";

/**
 * `#firstaid`: the four things worth knowing before help arrives, plus the kit
 * and the numbers. A tinted band like `#seasonal`, so it stays fixed-dark in
 * both themes, watermarked with the logo mark at low opacity exactly as the
 * reference does.
 *
 * `firstAid` arrives as a prop, already localized, rather than being imported
 * here.
 */
export function FirstAidSection({ firstAid }: { firstAid: HealthTipsContent["firstAid"] }) {
  const { firstAidSteps, homeKit, emergencyNumbers, firstAidSection } = firstAid;

  return (
    <section id="firstaid" className="relative mt-26 overflow-hidden bg-[#08123A]">
      <Image
        src={LOGO_MARK.src}
        alt=""
        aria-hidden
        width={LOGO_MARK.width}
        height={LOGO_MARK.height}
        className="pointer-events-none absolute -top-[20%] -left-[6%] h-auto w-[32%] opacity-[0.12]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-23 sm:px-8 lg:px-11">
        <Reveal className="min-w-0">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent-soft)] uppercase">
            {firstAidSection.eyebrow}
          </div>
          <h2 className="font-display mt-4.5 wrap-break-word text-[clamp(36px,4.6vw,66px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
            {firstAidSection.heading.line1}
            <br />
            {firstAidSection.heading.line2}
          </h2>
        </Reveal>

        <RevealStagger
          stepMs={55}
          className="mt-10.5 grid grid-cols-1 gap-px bg-[rgba(242,246,255,0.18)] min-[641px]:grid-cols-2 min-[900px]:grid-cols-4"
        >
          {firstAidSteps.map((step) => (
            <article key={step.title} className="min-w-0 bg-[#08123A] px-6.5 pt-7.5 pb-8">
              <p className="wrap-break-word text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
                {step.kind}
              </p>
              <h3 className="font-display mt-3.5 wrap-break-word text-[23px] leading-[1.08] font-semibold tracking-[-0.025em] text-white">
                {step.title}
              </h3>
              <p className="mt-2.5 wrap-break-word text-[14.5px] leading-[1.6] text-white/72">{step.action}</p>
              <p className="mt-3 wrap-break-word text-[14px] leading-[1.55] text-[var(--home-accent-soft)]">
                {firstAidSection.neverLabel} {step.avoid}
              </p>
            </article>
          ))}
        </RevealStagger>

        <Reveal className="mt-px">
          <div className="grid grid-cols-1 gap-px bg-[rgba(242,246,255,0.18)] min-[900px]:grid-cols-2">
            <div className="min-w-0 bg-[#08123A] px-6.5 py-7">
              <h3 className="wrap-break-word text-[12.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
                {firstAidSection.homeKitHeading}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {homeKit.map((item) => (
                  <li
                    key={item}
                    className="wrap-break-word border border-[rgba(242,246,255,0.24)] px-3.75 py-2.5 text-[13.5px] font-semibold text-white/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 bg-[#08123A] px-6.5 py-7">
              <h3 className="wrap-break-word text-[12.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
                {firstAidSection.numbersHeading}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {emergencyNumbers.map((entry) => {
                  const row = (
                    <>
                      <span className="wrap-break-word min-w-0 text-[15px]">{entry.label}</span>
                      <span className="font-display shrink-0 text-[19px] font-bold text-white tabular-nums">
                        {entry.number}
                      </span>
                    </>
                  );

                  // Our own two lines are dialable; the national services are
                  // printed to save, not tapped from a web page.
                  return (
                    <li key={entry.number}>
                      {entry.tel ? (
                        <a
                          href={`tel:${entry.tel}`}
                          className="flex min-w-0 items-baseline justify-between gap-4 text-white/78 transition-colors hover:text-[var(--home-accent)]"
                        >
                          {row}
                        </a>
                      ) : (
                        <span className="flex min-w-0 items-baseline justify-between gap-4 text-white/78">
                          {row}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
