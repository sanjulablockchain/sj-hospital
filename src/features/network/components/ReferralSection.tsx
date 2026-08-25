import { Reveal } from "@/components/ui/Reveal";
import { AccordionList } from "@/components/ui/AccordionList";
import { referralCta, referralIntro, referrals } from "../data/content";

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
export function ReferralSection() {
  return (
    <section
      id="referrals"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal className="grid grid-cols-[0.85fr_1.15fr] items-start gap-14.5 max-[899px]:grid-cols-1 max-[899px]:gap-10">
        <div className="sticky top-10 max-[899px]:static">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            04 / Moving between us
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            One file,
            <br />
            wherever
            <br />
            you are
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
