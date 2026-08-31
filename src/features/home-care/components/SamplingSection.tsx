import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./SectionHead";
import { samplingFacts, samplingPoints } from "../data/content";

/**
 * `#sampling`: the points on the left, the fact rows on the right.
 *
 * The same two-up panel /pharmacy closes its delivery band with, because it is
 * doing the same job: prose that explains, beside a short table of what is
 * settled. The 1px grid gap shows the parent hairline through, and each cell
 * paints `--home-bg` over the top.
 */
export function SamplingSection() {
  return (
    <section
      id="sampling"
      className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <SectionHead
        eyebrow="03 / Sampling"
        heading={
          <>
            The sample
            <br />
            travels, not
            <br />
            the patient
          </>
        }
        intro="Where the only reason to come in was to give a sample, a laboratory technician comes instead."
      />

      <Reveal className="mt-11 grid grid-cols-[1.25fr_0.75fr] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
        <div className="bg-[var(--home-bg)] py-8 pr-8 max-[899px]:px-0">
          <h3 className="text-[12.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
            How it works
          </h3>
          <ul className="mt-5 flex flex-col gap-3.5 text-[15.5px] leading-[1.58]">
            {samplingPoints.map((point) => (
              <li key={point} className="flex gap-3 text-[var(--home-body)]">
                <span aria-hidden className="mt-0.5 text-[var(--home-accent)]">
                  &#10022;
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[var(--home-bg)] py-8 pl-8 max-[899px]:px-0">
          <h3 className="text-[12.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
            What is settled
          </h3>
          <dl className="mt-5 flex flex-col gap-px bg-[var(--home-hairline)]">
            {samplingFacts.map((fact) => (
              <div
                key={fact.k}
                className="flex items-baseline justify-between gap-4 bg-[var(--home-bg)] py-3.25"
              >
                <dt className="text-[14px] text-[var(--home-muted)]">{fact.k}</dt>
                <dd className="text-right text-[14.5px] font-semibold text-[var(--home-heading)]">
                  {fact.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
