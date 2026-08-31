import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { visitLede, visitRoles } from "../data/content";

/**
 * `#visits`: the lead band, and the reason the page exists.
 *
 * `visitLede` is set at display size rather than as muted body copy, which is
 * the one place this page pushes past the house treatment for a standfirst. It
 * earns that: it is the only sentence here the hospital wrote itself, and every
 * other line on the page is either the services data re-presented or copy
 * awaiting confirmation. Giving it the emphasis matches what it actually is.
 *
 * It is also this section's <h2>, which is why it is not a <p>. The band needs a
 * heading for the same reason every other band has one (a reader moving by
 * heading would otherwise skip the most important section on the page), and the
 * alternative was a short label repeating the eyebrow directly above it. The
 * sentence is the section's statement, so it does the job honestly. Sentence
 * case and semibold rather than the uppercase extrabold the other h2s use: the
 * difference marks this as the one line here quoted rather than written.
 *
 * The three roles carry a word kicker instead of a number, unlike the steps in
 * `#how`. They are peers, and more than one of them may attend the same visit,
 * so numbering them would imply a sequence that does not exist. What the kicker
 * says instead is what that role is there to do.
 */
export function VisitsSection() {
  return (
    <section
      id="visits"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          01 / Home visit services
        </div>
        <h2
          className="font-display mt-6 max-w-[30ch] text-[clamp(27px,3.2vw,44px)] leading-[1.12] font-semibold tracking-[-0.03em] text-[var(--home-heading)]"
          style={{ textWrap: "pretty" }}
        >
          {visitLede}
        </h2>
      </Reveal>

      <RevealStagger
        stepMs={80}
        className="mt-12 grid grid-cols-3 gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1"
      >
        {visitRoles.map((role) => (
          <div key={role.title} className="flex flex-col bg-[var(--home-bg)] px-7 py-8 max-[899px]:px-0">
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
              {role.kicker}
            </span>
            <h3 className="font-display mt-4 text-[26px] leading-[1.06] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
              {role.title}
            </h3>
            <p className="mt-3.5 text-[15px] leading-[1.62] text-[var(--home-muted)]">{role.body}</p>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
