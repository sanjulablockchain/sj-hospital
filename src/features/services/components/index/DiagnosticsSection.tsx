import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { diagnosticRows } from "@/features/services/data/indexContent";

/**
 * `#diagnostics`: lab, imaging and endoscopy turnarounds. The `turnaround`
 * column is scan-friendly extra detail, so it drops out below 900px — but
 * `note` (which carries the CT & MRI off-site referral fact) is never hidden
 * or truncated at any width; a patient needs to see it before travelling.
 */
export function DiagnosticsSection() {
  return (
    <section id="diagnostics" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              04 / Diagnostics & radiology
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              Lab, imaging & endoscopy
            </h2>
          </div>
          <a
            href="#book"
            className="sj-invert inline-flex items-center gap-2.5 border border-[var(--home-hairline-strong)] px-5.5 py-3.5 text-[14.5px] font-bold text-[var(--home-heading)]"
          >
            Book a test <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </Reveal>

      <RevealStagger className="mt-12 border-t border-[var(--home-hairline)]">
        {diagnosticRows.map((row) => (
          <div
            key={row.name}
            className="grid grid-cols-1 gap-2 border-b border-[var(--home-hairline)] px-1 py-6.5 min-[640px]:grid-cols-[0.9fr_1.3fr] min-[640px]:items-baseline min-[640px]:gap-6 min-[900px]:grid-cols-[0.8fr_1.3fr_0.6fr]"
          >
            <span className="font-display text-[clamp(20px,2vw,26px)] leading-[1.1] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
              {row.name}
            </span>
            <span className="text-[14.5px] leading-[1.55] text-[var(--home-muted)]">{row.note}</span>
            <span className="hidden text-[13px] font-bold tracking-[0.05em] text-[var(--home-accent)] uppercase min-[900px]:block min-[900px]:text-right">
              {row.turnaround}
            </span>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
