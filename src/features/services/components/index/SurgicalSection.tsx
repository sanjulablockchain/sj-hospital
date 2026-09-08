import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { ServicesContent } from "@/features/services/data/getContent";

/**
 * `#surgical`: a `--home-surface-2` band, the same charcoal plate the home
 * page's dark sections use by default, flipping to a plain white panel in
 * light mode. No fixed-dark literal here; only the fixed-dark hero is exempt
 * from the token rule.
 */
export function SurgicalSection({ content }: { content: ServicesContent }) {
  const { surgicalRows, surgicalSection } = content.indexContent;

  return (
    // mt-30 matches the home page's banded sections, so the tinted band does
    // not start flush against the preceding section's last row.
    <section id="surgical" className="mt-30 bg-[var(--home-surface-2)]">
      <div className="mx-auto max-w-[1440px] px-5 py-26 sm:px-8 lg:px-11">
        <div className="grid gap-15 min-[900px]:grid-cols-2 min-[900px]:items-center">
          <Reveal className="min-w-0">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              {surgicalSection.eyebrow}
            </div>
            <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              {surgicalSection.heading.line1}
              <br />
              {surgicalSection.heading.line2}
            </h2>
            <p
              className="mt-5.5 max-w-[46ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]"
              style={{ textWrap: "pretty" }}
            >
              {surgicalSection.body}
            </p>
            <a
              href="#book"
              className="sj-invert mt-7 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
            >
              {surgicalSection.cta} <span aria-hidden>&rarr;</span>
            </a>
          </Reveal>

          <RevealStagger className="min-w-0 flex flex-col gap-px bg-[var(--home-hairline)]">
            {surgicalRows.map((row) => (
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
