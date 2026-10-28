import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { LaboratoryContent } from "../data/getContent";

/**
 * `#how`: the four steps of a laboratory visit, read from the laboratory
 * service entry (`services/data/diagnostics.ts`) through the page rather
 * than copied here, on the same `--home-surface-2` plate and numeral ramp
 * the services detail journey band uses.
 */
export function HowSection({
  content,
  steps,
}: {
  content: LaboratoryContent;
  steps: readonly { no: string; title: string; desc: string }[];
}) {
  const { sectionEyebrows, howHeading, howIntro } = content;
  return (
    <section id="how" className="mt-26 bg-[var(--home-surface-2)]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-11">
        <Reveal>
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent-soft)] uppercase">
            {sectionEyebrows.how}
          </div>
          <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(34px,3.8vw,54px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-[var(--home-heading)] uppercase">
            {howHeading.line1} {howHeading.line2}
          </h2>
          <p className="mt-5 max-w-[60ch] text-[16.5px] leading-[1.65] text-[var(--home-body)]" style={{ textWrap: "pretty" }}>
            {howIntro}
          </p>
        </Reveal>
        <RevealStagger stepMs={80} className="mt-11.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-4">
          {steps.map((step) => (
            <div key={step.no} className="bg-[var(--home-surface-2)] p-7.5">
              <div className="font-display text-[56px] leading-[0.85] font-extrabold tracking-[-0.04em] text-[var(--home-accent)] tabular-nums min-[900px]:text-[clamp(64px,6vw,92px)]">
                {step.no}
              </div>
              <h3 className="font-display wrap-break-word mt-3.5 text-[19px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-[1.55] text-[var(--home-muted)]">{step.desc}</p>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
