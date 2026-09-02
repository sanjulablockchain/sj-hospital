import { Reveal } from "@/components/ui/Reveal";
import { AccordionList } from "@/components/ui/AccordionList";
import type { NetworkContent } from "../data/getContent";

/**
 * `#referrals`: seven answers about moving between the group's countries, in a
 * sticky-heading split.
 *
 * The rows are the shared `AccordionList`, which is also what `FaqAccordion`
 * renders. This section cannot use `FaqAccordion` itself because that component
 * brings its own full-width section and heading, and the reference puts the
 * rows beside a sticky column instead.
 *
 * Every answer here is unverified copy. See PLACEHOLDER_NOTICE in
 * `data/content.ts`.
 */
export function ReferralSection({ content }: { content: NetworkContent }) {
  const { referralCta, referralEyebrow, referralHeading, referralIntro, referrals } = content;
  return (
    <section
      id="referrals"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      {/* `minmax(0, ...)` on both tracks: a bare `fr` track cannot shrink
          below its content's intrinsic width, and Sinhala/Tamil form long
          unbreakable tokens where English would have a space, so without
          this the grid (and the page) overflows a 360px viewport. */}
      <Reveal className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-start gap-14.5 max-[899px]:grid-cols-1 max-[899px]:gap-10">
        <div className="sticky top-10 min-w-0 max-[899px]:static">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            {referralEyebrow}
          </div>
          <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            {referralHeading.line1}
            <br />
            {referralHeading.line2}
            <br />
            {referralHeading.line3}
          </h2>
          <p className="mt-5 max-w-[38ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]">
            {referralIntro}
          </p>
          <a
            href="#contact"
            className="sj-invert mt-6 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-5.5 py-3.75 text-[14.5px] font-bold text-[var(--home-on-accent)]"
          >
            {referralCta} <span aria-hidden>&rarr;</span>
          </a>
        </div>

        <AccordionList
          items={referrals}
          stepMs={45}
          className="flex flex-col border-t border-[var(--home-hairline)] [&>*]:border-b [&>*]:border-[var(--home-hairline)]"
        />
      </Reveal>
    </section>
  );
}
