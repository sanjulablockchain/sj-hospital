import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { ServicesContent } from "@/features/services/data/getContent";

/**
 * `#pharmacy`: a `--home-surface-2` band summarising the 24-hour counter and
 * its delivery service. This is a summary, not a duplicate of the `pharmacy`
 * and `medicine-delivery` catalog entries in `data/atHome.ts`: it reuses
 * their facts (authorized stock only, pharmacist check, digital
 * prescriptions, Negombo coverage) without repeating their sentences.
 */
export function PharmacySection({ content }: { content: ServicesContent }) {
  const { pharmacyFacts, pharmacySection } = content.indexContent;

  return (
    // mt-30 matches the home page's banded sections, so the tinted band does
    // not start flush against the preceding section's last row.
    <section id="pharmacy" className="mt-30 bg-[var(--home-surface-2)]">
      <div className="mx-auto max-w-[1440px] px-5 py-26 sm:px-8 lg:px-11">
        <div className="grid gap-15 min-[900px]:grid-cols-2 min-[900px]:items-center">
          <Reveal className="min-w-0">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              {pharmacySection.eyebrow}
            </div>
            <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              {pharmacySection.heading.line1}
              <br />
              {pharmacySection.heading.line2}
            </h2>
            <p
              className="mt-5.5 max-w-[46ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]"
              style={{ textWrap: "pretty" }}
            >
              {pharmacySection.body}
            </p>
            {/* This band is a summary; the counter, stock, delivery and repeat
                prescriptions all have their own sections on /pharmacy, so the
                CTA hands off there rather than to this page's #book. */}
            <LocaleLink
              href="/pharmacy"
              className="sj-invert mt-7 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
            >
              {pharmacySection.cta} <span aria-hidden>&rarr;</span>
            </LocaleLink>
          </Reveal>

          <RevealStagger className="min-w-0 flex flex-col gap-px bg-[var(--home-hairline)]">
            {pharmacyFacts.map((row) => (
              <div
                key={row.name}
                className="flex items-baseline justify-between gap-5 bg-[var(--home-surface-2)] px-7 py-5.5"
              >
                <span className="wrap-break-word min-w-0 text-[17px] font-bold text-[var(--home-heading)]">
                  {row.name}
                </span>
                <span className="wrap-break-word min-w-0 text-right text-[14px] text-[var(--home-muted)]">
                  {row.note}
                </span>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
