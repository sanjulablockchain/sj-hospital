import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { FacilitiesContent } from "../data/getContent";

/**
 * `#critical`: the monitored units, then three notes on how the unit runs.
 *
 * The reference laid the units out four across; this page has three, because
 * only three are backed by anything the hospital publishes, so the grid is
 * three across at desktop instead of four.
 */
export function CriticalCareSection({ content }: { content: FacilitiesContent }) {
  const { careNotes, careUnits, criticalHeading, criticalIntro, sectionEyebrows } = content;
  return (
    <section id="critical" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          {sectionEyebrows.critical}
        </div>
        <div className="mt-4.5 grid min-w-0 gap-6 min-[900px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] min-[900px]:items-end min-[900px]:gap-14">
          <h2 className="font-display wrap-break-word min-w-0 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            {criticalHeading.line1}
            <br />
            {criticalHeading.line2}
          </h2>
          <p className="text-[16px] leading-[1.6] text-[var(--home-muted)]" style={{ textWrap: "pretty" }}>
            {criticalIntro}
          </p>
        </div>
      </Reveal>

      <RevealStagger
        stepMs={90}
        className="mt-11.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3"
      >
        {careUnits.map((unit) => (
          <div
            key={unit.code}
            className="sj-tint group bg-[var(--home-bg)] p-7.5"
          >
            <div className="font-display text-[13px] font-bold tracking-[0.18em] text-[var(--home-accent)] uppercase">
              {unit.code}
            </div>
            <h3 className="font-display mt-3 text-[22px] leading-[1.1] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
              {unit.name}
            </h3>
            <p className="mt-2.5 text-[14.5px] leading-[1.55] text-[var(--home-muted)]">{unit.desc}</p>
            <span className="mt-4 inline-flex translate-y-2 items-center gap-2 text-[13px] font-bold text-[var(--home-accent)] opacity-0 transition-all duration-[450ms] group-hover:translate-y-0 group-hover:opacity-100">
              {unit.lead}
            </span>
          </div>
        ))}
      </RevealStagger>

      <div className="mt-11.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-3">
        {careNotes.map((note) => (
          // The tint goes on an inner element rather than on Reveal itself:
          // sj-tint sets its own transition, which would otherwise outrank and
          // shorten Reveal's 850ms entrance.
          <Reveal key={note.title} className="h-full">
            <div className="sj-tint h-full bg-[var(--home-surface-2)] p-7.5">
              <h3 className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent)] uppercase">
                {note.title}
              </h3>
              <p className="mt-4 text-[14.5px] leading-[1.6] text-[var(--home-muted)]">{note.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
