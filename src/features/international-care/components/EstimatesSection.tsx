import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { estimateNote, treatments } from "../data/content";

/**
 * `#estimates`: what people travel here for, as hairline rows of treatment,
 * approach and length of stay.
 *
 * Three columns become two at 1024px, where the middle note column is dropped
 * rather than squeezed, and one at 900px, matching the reference's own
 * `[data-r="pkgrow"]` and `[data-r="pkgwho"]` rules. No hover: these are
 * reference rows to read down, not targets to click, and the reference gives
 * them none either.
 *
 * `stay` never carries a night count the hospital has not published. Where the
 * repo says a stay is confirmed at consultation, that is what the row says.
 */
export function EstimatesSection() {
  return (
    <section
      id="estimates"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              03 / What people travel for
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              Written estimates,
              <br />
              before you book
            </h2>
          </div>
          <p className="max-w-[38ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">
            Send your reports and the estimate comes back in writing, covering the likely course of
            care. It follows your scans rather than a price list, because your scans decide.
          </p>
        </div>
      </Reveal>

      <RevealStagger
        stepMs={40}
        className="mt-10 border-t border-[var(--home-hairline)]"
      >
        {treatments.map((row) => (
          <div
            key={row.name}
            className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,0.55fr)] items-baseline gap-x-5.5 gap-y-1.5 border-b border-[var(--home-hairline)] px-1 py-5.25 max-[1023px]:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] max-[899px]:grid-cols-1"
          >
            <span className="text-[17.5px] font-bold text-[var(--home-heading)]">{row.name}</span>
            <span className="text-[14.5px] leading-[1.5] text-[var(--home-muted)] max-[1023px]:hidden">
              {row.note}
            </span>
            <span className="text-right text-[13.5px] font-bold text-[var(--home-accent-soft)]">
              {row.stay}
            </span>
          </div>
        ))}
      </RevealStagger>

      <Reveal>
        <p className="mt-4.5 max-w-[84ch] text-[13.5px] leading-[1.6] text-[var(--home-muted)]">
          {estimateNote}
        </p>
      </Reveal>
    </section>
  );
}
