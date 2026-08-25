import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { topics } from "../data/content";

/**
 * `#spokespeople`: which topic reaches which role.
 *
 * Roles, never names. A named individual would need that person's consent to be
 * listed as a press contact and would go stale the day they moved on, so the
 * right hand column stays at the level of the post. `content.test.ts` fails if
 * a title like "Dr" appears in one.
 *
 * The heading column sticks while the rows scroll past it, and goes static
 * below 900px where the grid collapses to one column.
 */
export function SpokespeopleSection() {
  return (
    <section
      id="spokespeople"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18.5"
    >
      <div className="grid items-start gap-14.5 min-[900px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] max-[899px]:gap-10">
        <Reveal className="min-[900px]:sticky min-[900px]:top-10">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            05 / Who speaks
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            Ask for the
            <br />
            right person
          </h2>
          <p className="mt-5 max-w-[38ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]">
            Requests go through Communications, who will put you with the clinician who actually
            does the work rather than a general spokesperson reading a statement.
          </p>
          <p className="mt-3.5 max-w-[38ch] text-[15px] leading-[1.6] text-[var(--home-muted)]">
            Give us the topic and your deadline in the first email. Both change who we can offer and
            how fast.
          </p>
        </Reveal>

        <RevealStagger stepMs={40} className="border-t border-[var(--home-hairline-strong)]">
          {topics.map((topic) => (
            <div
              key={topic.k}
              className="sj-tint-row flex items-baseline justify-between gap-6 border-b border-[var(--home-hairline-strong)] px-1 py-5 max-[520px]:flex-col max-[520px]:gap-1.5"
            >
              <span className="text-[16.5px] font-bold text-[var(--home-heading)]">{topic.k}</span>
              <span className="max-w-[44ch] text-right text-[15px] leading-[1.5] text-[var(--home-muted)] max-[520px]:text-left">
                {topic.v}
              </span>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
