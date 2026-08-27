import { RevealStagger } from "@/components/ui/RevealStagger";
import { SectionHead } from "./SectionHead";
import { specialties, specialtiesHeading } from "../data/content";

/**
 * `#specialties`: the ten specialties ported verbatim from the deleted
 * SpecialtiesChecklist.tsx, as a `RevealStagger` hairline grid.
 *
 * `heading` is `specialtiesHeading`, the checklist's own old heading. No
 * `intro`: the heading plus the ten-item list below it is self-explanatory,
 * and the one prose sentence this page has that is true of every room
 * category rather than one (`mealsNote`) is already spent as `#rooms`'
 * standfirst, immediately above this section. Quoting it again here, even as
 * a different substring, would print the same sentence twice in a row, which
 * is worse than a section with no standfirst at all.
 */
export function SpecialtiesSection() {
  return (
    <section
      id="specialties"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <SectionHead eyebrow="02 / What every room includes" heading={specialtiesHeading} />

      <RevealStagger
        stepMs={70}
        className="mt-10.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-5"
      >
        {specialties.map((item) => (
          <div key={item} className="sj-fill flex items-center gap-2.5 bg-[var(--home-bg)] px-5 py-5">
            <span className="text-[var(--home-accent)]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="text-[14.5px] font-semibold text-[var(--home-heading)]">{item}</span>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
