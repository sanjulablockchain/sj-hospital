import { Reveal } from "@/components/ui/Reveal";
import { buildingZones } from "@/features/facilities/data/content";

/**
 * `#floors`: the building walked through as six zones.
 *
 * The reference's row layout is kept exactly, index glyph on the left sliding
 * to the accent colour on hover, but the rows describe departments that work
 * together rather than assigning each one a storey; see the note on
 * `buildingZones` in data/content.ts.
 *
 * At 900px and below the three columns collapse to two, with the contents text
 * dropping under the name in the second column so the index glyph keeps its own
 * gutter instead of the text wrapping under it.
 */
export function BuildingSection() {
  return (
    <section id="floors" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          01 / The building
        </div>
        <div className="mt-4.5 grid gap-6 min-[900px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] min-[900px]:items-end min-[900px]:gap-14">
          <h2 className="font-display text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            Six floors, one
            <br />
            building
          </h2>
          <p className="text-[16px] leading-[1.6] text-[var(--home-muted)]" style={{ textWrap: "pretty" }}>
            Departments that work together sit together, so a scan ordered in a clinic does not become a
            journey across town.
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-11.5 border-t border-[var(--home-hairline)]">
        {buildingZones.map((zone) => (
          <div
            key={zone.no}
            className="group grid grid-cols-[66px_minmax(0,1fr)] items-baseline gap-x-6 gap-y-2 border-b border-[var(--home-hairline)] py-6 transition-colors duration-300 hover:bg-[var(--home-surface-2)] min-[900px]:grid-cols-[92px_minmax(0,1.05fr)_minmax(0,1.6fr)] min-[900px]:gap-x-10 min-[900px]:py-7"
          >
            <span className="font-display text-[34px] leading-none font-extrabold tracking-[-0.03em] text-[var(--home-accent)] tabular-nums transition-all duration-[450ms] group-hover:translate-x-1.5 min-[900px]:text-[44px]">
              {zone.no}
            </span>
            <h3 className="font-display text-[21px] leading-[1.12] font-semibold tracking-[-0.02em] text-[var(--home-heading)] min-[900px]:text-[24px]">
              {zone.name}
            </h3>
            <p className="col-start-2 text-[14.5px] leading-[1.6] text-[var(--home-muted)] min-[900px]:col-start-3">
              {zone.contents}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
