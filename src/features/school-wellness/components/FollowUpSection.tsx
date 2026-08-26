import { Reveal } from "@/components/ui/Reveal";
import { followUp } from "../data/content";

/**
 * `#referral`: what happens after the screening day, as a `when / what`
 * timeline beside a sticky heading.
 *
 * Same sticky split as `#grades`, static below 900px, where the rows also drop
 * from two columns to stacked so the timing label sits above its line rather
 * than squeezing a 0.35fr column onto a phone.
 *
 * The whole timeline is unverified copy. See PLACEHOLDER_NOTICE in
 * `data/content.ts`.
 */
export function FollowUpSection() {
  return (
    <section
      id="referral"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal className="grid grid-cols-[0.85fr_1.15fr] items-start gap-14.5 max-[899px]:grid-cols-1 max-[899px]:gap-10">
        <div className="sticky top-10 max-[899px]:static">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            06 / After the screening
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            A screening
            <br />
            that ends in
            <br />
            a report is
            <br />
            half done
          </h2>
          <p className="mt-5 max-w-[38ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]">
            The point is not the data. The point is that the child with the low haemoglobin actually
            gets treated. Every flagged child is tracked until something happens.
          </p>
          <a
            href="#book"
            className="sj-invert mt-6 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-5.5 py-3.75 text-[14.5px] font-bold text-[var(--home-on-accent)]"
          >
            Talk to the coordinator <span aria-hidden>&rarr;</span>
          </a>
        </div>

        <ol className="border-t border-[var(--home-hairline)]">
          {followUp.map((step, index) => (
            <li
              key={`${step.when}-${index}`}
              className="grid grid-cols-[0.35fr_1fr] items-baseline gap-5.5 border-b border-[var(--home-hairline)] px-1 py-5.25 max-[899px]:grid-cols-1 max-[899px]:gap-1.5"
            >
              <span className="text-[13px] font-bold tracking-[0.14em] text-[var(--home-accent-soft)] uppercase">
                {step.when}
              </span>
              <span className="text-[16px] leading-[1.58] text-[var(--home-body)]">
                {step.what}
              </span>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
