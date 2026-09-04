import { Reveal } from "@/components/ui/Reveal";
import type { SchoolWellnessContent } from "../data/getContent";

/**
 * `#referral`: what happens after the screening day, as a `when / what`
 * timeline beside a sticky heading.
 *
 * Same sticky split as `#grades`, static below 900px, where the rows also drop
 * from two columns to stacked so the timing label sits above its line rather
 * than squeezing a 0.35fr column onto a phone. Both grids use `minmax(0, ...)`
 * rather than a bare `fr`: a bare track cannot shrink below its content's
 * intrinsic width, and Sinhala/Tamil form long unbreakable tokens where
 * English would have a space, so without this the grid (and the page)
 * overflows a 360px viewport.
 *
 * The whole timeline is unverified copy. See PLACEHOLDER_NOTICE in
 * `data/content.ts`.
 */
export function FollowUpSection({ content }: { content: SchoolWellnessContent }) {
  const { followUp, followUpCta, followUpHeading, followUpIntro, sectionEyebrows } = content;
  return (
    <section
      id="referral"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-start gap-14.5 max-[899px]:grid-cols-1 max-[899px]:gap-10">
        <div className="min-w-0 sticky top-10 max-[899px]:static">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            {sectionEyebrows.referral}
          </div>
          <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            {followUpHeading.line1}
            <br />
            {followUpHeading.line2}
            <br />
            {followUpHeading.line3}
            <br />
            {followUpHeading.line4}
          </h2>
          <p className="mt-5 max-w-[38ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]">
            {followUpIntro}
          </p>
          <a
            href="#book"
            className="sj-invert mt-6 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-5.5 py-3.75 text-[14.5px] font-bold text-[var(--home-on-accent)]"
          >
            {followUpCta} <span aria-hidden>&rarr;</span>
          </a>
        </div>

        <ol className="border-t border-[var(--home-hairline)]">
          {followUp.map((step, index) => (
            <li
              key={`${step.when}-${index}`}
              className="grid grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)] items-baseline gap-5.5 border-b border-[var(--home-hairline)] px-1 py-5.25 max-[899px]:grid-cols-1 max-[899px]:gap-1.5"
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
