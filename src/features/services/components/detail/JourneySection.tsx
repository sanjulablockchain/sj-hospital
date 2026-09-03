import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { Service } from "@/features/services/types";
import type { ServicesContent } from "@/features/services/data/getContent";

/**
 * `#journey`: the service's four-step visit, on a `--home-surface-2` band
 * (the same charcoal-or-white plate `SurgicalSection`/`PharmacySection` use),
 * followed by what to prepare and what to bring. The step numerals reuse
 * `AdmissionsSection`'s exact size ramp (56px, growing past 900px) rather
 * than inventing a new one.
 *
 * `bringWithYou` and its heading (`admissionsSection.bringWithYouHeading`)
 * are the same values `AdmissionsSection` on the index page renders: one
 * fact, one home, not a second copy that could drift (i18n recipe pattern 4).
 */
export function JourneySection({ service, content }: { service: Service; content: ServicesContent }) {
  const { bringWithYou, admissionsSection, detailChrome } = content.indexContent;

  return (
    // mt-30 matches the home page's banded sections (SurgicalSection,
    // PharmacySection). Without it the tinted band starts flush against the
    // preceding section's last row, so #about's condition chips collide with
    // the colour change. The reference spaces this the same way, with a
    // margin-top on the banded section rather than bottom padding above.
    <section id="journey" className="mt-30 bg-[var(--home-surface-2)]">
      <div className="mx-auto max-w-[1440px] px-5 py-26 sm:px-8 lg:px-11">
        <Reveal>
          <h2 className="font-display wrap-break-word text-[clamp(34px,3.8vw,54px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-[var(--home-heading)] uppercase">
            {detailChrome.journeyHeading}
          </h2>
        </Reveal>

        <RevealStagger
          stepMs={80}
          className="mt-11.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-4"
        >
          {service.steps.map((step) => (
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

        <div className="mt-13 grid grid-cols-1 gap-11 min-[900px]:grid-cols-2 min-[900px]:gap-16">
          <Reveal className="min-w-0">
            <h3 className="font-display wrap-break-word text-[19px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
              {detailChrome.prepHeading}
            </h3>
            <ul className="mt-4.5 flex flex-col gap-2.5">
              {service.prep.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] leading-[1.5] text-[var(--home-muted)]">
                  <span aria-hidden className="text-[var(--home-accent)]">
                    &#10003;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="min-w-0">
            <h3 className="font-display wrap-break-word text-[19px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
              {admissionsSection.bringWithYouHeading}
            </h3>
            <ul className="mt-4.5 flex flex-col gap-2.5">
              {bringWithYou.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] leading-[1.5] text-[var(--home-muted)]">
                  <span aria-hidden className="text-[var(--home-accent)]">
                    &#10003;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
