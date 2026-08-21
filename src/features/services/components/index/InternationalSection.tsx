import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { internationalSteps } from "@/features/services/data/indexContent";

/**
 * `#international`: the six-step journey for a patient travelling in from
 * overseas, in a 3-column grid that collapses to a single column below
 * 900px; one breakpoint only, unlike the two-breakpoint admissions grid.
 */
export function InternationalSection() {
  return (
    <section id="international" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          09 / International patients
        </div>
        <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
          Ten minutes from the airport
        </h2>
      </Reveal>

      <RevealStagger
        stepMs={70}
        className="mt-11.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-3"
      >
        {internationalSteps.map((step) => (
          <div key={step.no} className="bg-[var(--home-bg)] p-7.5">
            <div className="font-display text-[56px] leading-[0.85] font-extrabold tracking-[-0.04em] text-[var(--home-accent)] tabular-nums">
              {step.no}
            </div>
            <h3 className="font-display mt-3.5 text-[20px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
              {step.title}
            </h3>
            <p className="mt-2.5 text-[14px] leading-[1.55] text-[var(--home-muted)]">{step.desc}</p>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
