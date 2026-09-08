import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import type { FacilitiesContent } from "../data/getContent";

/**
 * `#diagnostic`: a sticky intro column beside the equipment rows.
 *
 * The left column sticks while the rows scroll past on desktop, and goes static
 * below 900px where there is nothing to scroll against. Availability is the
 * turnaround the hospital publishes for each test, taken from the services
 * diagnostics data rather than restated here.
 */
export function DiagnosticSection({ content }: { content: FacilitiesContent }) {
  const { diagnosticCta, diagnosticHeading, diagnosticIntro, equipment, sectionEyebrows } = content;
  return (
    <section id="diagnostic" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <div className="grid gap-10 min-[900px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] min-[900px]:items-start min-[900px]:gap-16">
        <Reveal className="min-w-0 min-[900px]:sticky min-[900px]:top-16">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            {sectionEyebrows.diagnostic}
          </div>
          <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,4vw,58px)] leading-[0.94] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            {diagnosticHeading.line1}
            <br />
            {diagnosticHeading.line2}
            <br />
            {diagnosticHeading.line3}
          </h2>
          <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.65] text-[var(--home-muted)]">
            {diagnosticIntro}
          </p>
          <LocaleLink
            href="/services#diagnostics"
            className="mt-7 inline-flex w-fit items-center gap-2.5 border border-[var(--home-hairline-strong)] px-5.5 py-3.5 text-[14px] font-bold text-[var(--home-heading)]"
          >
            {diagnosticCta} <span aria-hidden>&rarr;</span>
          </LocaleLink>
        </Reveal>

        <Reveal className="border-t border-[var(--home-hairline)]">
          {equipment.map((row) => (
            <div
              key={row.name}
              className="grid grid-cols-1 gap-x-8 gap-y-1.5 border-b border-[var(--home-hairline)] py-5 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,0.6fr)] min-[900px]:items-baseline"
            >
              <h3 className="font-display text-[17px] leading-[1.15] font-semibold tracking-[-0.015em] text-[var(--home-heading)]">
                {row.name}
              </h3>
              <p className="text-[14px] leading-[1.55] text-[var(--home-muted)]">{row.note}</p>
              <span className="text-[13px] font-bold tracking-[0.08em] text-[var(--home-accent)] uppercase min-[900px]:text-right">
                {row.avail}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
