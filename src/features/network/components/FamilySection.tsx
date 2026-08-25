import { Reveal } from "@/components/ui/Reveal";
import { OrgCard } from "./OrgCard";
import { orgGroups } from "../data/content";

/**
 * `#family`: the nine group companies, in three named groupings.
 *
 * Sri Lanka comes first, then California, then the support companies. That is
 * the reference's order and it is deliberate: the reader's own hospital is the
 * first card they meet.
 *
 * Each grouping is its own `Reveal`, so the three arrive as you scroll rather
 * than all at once, and the grid drops to two columns at 1024px and one at
 * 640px, per the reference's `[data-r="orgs"]` rules.
 */
export function FamilySection() {
  return (
    <section id="family" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <Reveal className="flex flex-wrap items-end justify-between gap-10">
        <div>
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            02 / The family
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            Nine companies,
            <br />
            two continents
          </h2>
        </div>
        <p className="max-w-[38ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">
          Paediatric and family care in California, hospital care and insurance in Sri Lanka, and
          the administrative companies that keep both running.
        </p>
      </Reveal>

      {orgGroups.map((group) => (
        <Reveal key={group.name} className="mt-13">
          <div className="flex flex-wrap items-baseline gap-4.5 border-b border-[var(--home-hairline)] pb-4">
            <span className="font-display text-[27px] font-bold tracking-[-0.03em] text-[var(--home-heading)]">
              {group.name}
            </span>
            <span className="text-[15px] leading-[1.5] text-[var(--home-muted)]">{group.note}</span>
          </div>
          <div className="mt-px grid grid-cols-3 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1">
            {group.orgs.map((org) => (
              <OrgCard key={org.slug} org={org} />
            ))}
          </div>
        </Reveal>
      ))}
    </section>
  );
}
