import { Reveal } from "@/components/ui/Reveal";
import { OrgCard } from "./OrgCard";
import type { NetworkContent } from "../data/getContent";

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
export function FamilySection({ content }: { content: NetworkContent }) {
  const { familyEyebrow, familyHeading, familyIntro, orgGroups } = content;
  return (
    <section id="family" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <Reveal className="flex flex-wrap items-end justify-between gap-10">
        {/* `min-w-0`: without it a long Sinhala or Tamil token in the heading
            has nothing to shrink against in this flex row, and pushes past
            the viewport rather than wrapping. */}
        <div className="min-w-0">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            {familyEyebrow}
          </div>
          <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            {familyHeading.line1}
            <br />
            {familyHeading.line2}
          </h2>
        </div>
        <p className="max-w-[38ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">
          {familyIntro}
        </p>
      </Reveal>

      {orgGroups.map((group) => (
        <Reveal key={group.name} className="mt-13">
          <div className="flex flex-wrap items-baseline gap-4.5 border-b border-[var(--home-hairline)] pb-4">
            <span className="font-display min-w-0 wrap-break-word text-[27px] font-bold tracking-[-0.03em] text-[var(--home-heading)]">
              {group.name}
            </span>
            <span className="text-[15px] leading-[1.5] text-[var(--home-muted)]">{group.note}</span>
          </div>
          <div className="mt-px grid grid-cols-3 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1">
            {group.orgs.map((org) => (
              <OrgCard key={org.slug} org={org} />
            ))}
            {/* Two of the three groups hold only two companies, leaving an empty
                third cell in the grid. Without a filler, that empty cell shows the
                hairline background at full card size: barely visible on the dark
                reference, but a solid grey block once the token is tokenised for
                the light theme. These cells paint over it with the section's own
                background so an empty cell is indistinguishable from the section
                behind it. */}
            {Array.from({ length: (3 - (group.orgs.length % 3)) % 3 }).map((_, index) => (
              <div
                key={`filler-${index}`}
                aria-hidden
                className={`bg-[var(--home-bg)] max-[640px]:hidden ${
                  group.orgs.length % 2 === 0 ? "max-[1023px]:hidden" : ""
                }`}
              />
            ))}
          </div>
        </Reveal>
      ))}
    </section>
  );
}
