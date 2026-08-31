import { RevealStagger } from "@/components/ui/RevealStagger";
import { SectionHead } from "./SectionHead";
import { suitedCases } from "../data/content";

/**
 * `#who`: the four cases a visit is meant for, two up.
 *
 * One case per condition on the home visits service entry, which is what
 * content.test.ts pins the count to. A two column grid rather than four across:
 * each of these is a paragraph making an argument about a person's situation,
 * and four narrow columns would set them as labels instead.
 */
export function WhoSection() {
  return (
    <section
      id="who"
      className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <SectionHead
        eyebrow="02 / Who it suits"
        heading={
          <>
            When getting there
            <br />
            is the hard part
          </>
        }
        intro="A visit is not a lesser version of coming in. It is the same team, for the patients whose obstacle was never the appointment."
      />

      <RevealStagger
        stepMs={80}
        className="mt-11 grid grid-cols-2 gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1"
      >
        {suitedCases.map((item) => (
          <div key={item.title} className="bg-[var(--home-bg)] px-7.5 py-8 max-[899px]:px-0">
            <h3 className="font-display text-[24px] leading-[1.14] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
              {item.title}
            </h3>
            <p
              className="mt-3.5 max-w-[52ch] text-[15.5px] leading-[1.62] text-[var(--home-muted)]"
              style={{ textWrap: "pretty" }}
            >
              {item.body}
            </p>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
