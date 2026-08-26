import { Reveal } from "@/components/ui/Reveal";
import { breedingSites } from "../data/content";

/**
 * `#dengue`: the case for treating the school grounds as part of the screening,
 * beside the list of places the walk round usually turns up water.
 *
 * A 1fr/1fr split rather than the accent panel `#why` uses, because both halves
 * here are prose of equal weight. The hairline is the grid's own 1px gap.
 *
 * The whole section is unverified copy: `features/health-tips/data/dengue.ts`
 * covers dengue as a health topic, but the repo describes no school grounds
 * service. See PLACEHOLDER_NOTICE in `data/content.ts`.
 */
export function DengueSection() {
  return (
    <section
      id="dengue"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal className="grid grid-cols-2 gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
        <div className="bg-[var(--home-bg)] px-10 py-11">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            05 / The school grounds
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(32px,4vw,54px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            Dengue is a
            <br />
            school problem
          </h2>
          <p className="mt-5 max-w-[46ch] text-[16.5px] leading-[1.62] text-[var(--home-body)]">
            The mosquito bites in daylight, which means children are bitten at school, not at home
            in bed. A single blocked gutter or a tray under a potted plant in the corridor can
            supply a whole class.
          </p>
          <p className="mt-3.5 max-w-[46ch] text-[15px] leading-[1.6] text-[var(--home-muted)]">
            We walk the premises with your caretaker, mark the breeding sites on a plan, and hand
            you a checklist your own staff can repeat weekly without us.
          </p>
        </div>
        <div className="bg-[var(--home-bg)] px-10 py-11">
          <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
            Where we usually find it
          </span>
          <ul className="mt-5 flex flex-col">
            {breedingSites.map((site) => (
              <li
                key={site}
                className="flex gap-3 border-b border-[var(--home-hairline)] pt-3 pb-3 text-[15.5px] leading-[1.5] text-[var(--home-body)] first:pt-0"
              >
                <span aria-hidden className="text-[var(--home-accent)]">
                  &#10022;
                </span>
                {site}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
