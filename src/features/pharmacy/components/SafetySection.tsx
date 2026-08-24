import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { safety } from "../data/content";

/**
 * `#safety`: eight cards on what happens to an order before it is handed over.
 *
 * The reference framed this section entirely around cold chain, with monitored
 * refrigeration, per-shift temperature logs, batch-level recall tracing, a bound
 * controlled-medicines register and a disposal protocol. None of that appears in
 * the catalog, and a storage claim is not one to invent, so the grid keeps its
 * shape and the eight cards now cover the checks the repo does describe.
 */
export function SafetySection() {
  return (
    <section id="safety" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <Reveal className="flex flex-wrap items-end justify-between gap-10">
        <div>
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            06 / Safety &amp; records
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            Checked before
            <br />
            it reaches you
          </h2>
        </div>
        <p className="max-w-[36ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">
          Nothing is handed over on the strength of the paper alone. Every order is read against your
          record first, and everything on the shelf is authorized stock.
        </p>
      </Reveal>

      <RevealStagger
        stepMs={60}
        className="mt-10 grid grid-cols-4 gap-0.5 bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1"
      >
        {safety.map((card) => (
          <div
            key={card.no}
            className="flex min-h-[216px] flex-col bg-[var(--home-bg)] px-6 pt-7 pb-6.5 transition-[background-color,transform] duration-[450ms] hover:-translate-y-1.5 hover:bg-[var(--home-accent)]/10"
          >
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)]">
              {card.no}
            </span>
            <span className="font-display mt-3.5 text-[23px] leading-[1.05] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
              {card.name}
            </span>
            <span className="mt-2.5 text-[14.5px] leading-[1.55] text-[var(--home-muted)]">
              {card.desc}
            </span>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
