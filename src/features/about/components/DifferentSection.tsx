import { RevealStagger } from "@/components/ui/RevealStagger";
import { SectionHead } from "./SectionHead";
import { differentIntro, jumpCards, reasons } from "../data/content";

/**
 * `#different`: the six differentiators ported verbatim from the deleted
 * WhyDifferent.tsx, as a `RevealStagger` grid. The hairline between cells is
 * the parent background showing through a 1px grid gap, the same
 * hairline-through-a-grid-gap idiom `JumpCards` uses, so there are no double
 * borders where cells meet.
 *
 * `intro` is `differentIntro`, `storyParagraphs[1]` verbatim: the
 * first-in-Negombo OPD insurance claim, which is a reason the six
 * differentiators below are worth stating, not a restatement of their titles
 * or of the jump card's `note`. `content.test.ts:123` asserts `differentIntro`
 * is a literal substring of `storyParagraphs[1]`.
 */
export function DifferentSection() {
  return (
    <section
      id="different"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <SectionHead eyebrow="02 / Why here" heading={jumpCards[1].label} intro={differentIntro} />

      <RevealStagger
        stepMs={80}
        className="mt-10.5 grid grid-cols-3 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1"
      >
        {reasons.map((reason, index) => (
          <div
            key={reason.title}
            className="sj-fill flex flex-col gap-2.5 bg-[var(--home-bg)] px-6 py-6.5"
          >
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] tabular-nums uppercase">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-[19px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
              {reason.title}
            </h3>
            <p className="text-[14px] leading-[1.55] text-[var(--home-muted)]">{reason.description}</p>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
