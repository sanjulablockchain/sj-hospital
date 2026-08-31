import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { prepPoints, steps } from "../data/content";

/**
 * `#how`: the four steps of arranging a visit, then what to have ready.
 *
 * Numbered, and here the numbers mean something: this is the only band on the
 * page that is genuinely a sequence, and a reader needs to know the request
 * comes before the appointment and the record comes after the visit. The three
 * roles in `#visits` are deliberately not numbered for the same reason.
 *
 * The 1px grid gaps show the parent's hairline colour through, which is what
 * draws the rules between cells; each cell paints `--home-bg` over the top.
 */
export function HowSection() {
  return (
    <section
      id="how"
      className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          04 / Arranging a visit
        </div>
        <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
          Call, then
          <br />
          open the door
        </h2>
      </Reveal>

      {/* Every cell keeps a 26px right padding, but only the first is flush
          left, so the copy in cells 2 to 4 clears the rule the grid gap draws
          while cell 1 stays aligned with the h2 above. */}
      <RevealStagger
        stepMs={80}
        className="mt-10 grid grid-cols-4 gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1"
      >
        {steps.map((step, index) => (
          <div
            key={step.no}
            className={`bg-[var(--home-bg)] pt-8 pr-6.5 pb-8.5 max-[899px]:px-0 max-[899px]:py-6 ${
              index === 0 ? "" : "pl-6.5"
            }`}
          >
            <div className="font-display text-[64px] leading-[0.82] font-extrabold tracking-[-0.05em] text-[var(--home-accent)] tabular-nums max-[899px]:text-[54px]">
              {step.no}
            </div>
            <h3 className="font-display mt-4 text-[23px] leading-[1.08] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
              {step.title}
            </h3>
            <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--home-muted)]">
              {step.desc}
            </p>
          </div>
        ))}
      </RevealStagger>

      <Reveal className="mt-px border-t border-[var(--home-hairline)] pt-7">
        <h3 className="text-[12.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
          Have this ready
        </h3>
        <ul className="mt-4.5 grid grid-cols-2 gap-x-10 gap-y-3 text-[15px] leading-[1.5] max-[899px]:grid-cols-1">
          {prepPoints.map((point) => (
            <li key={point} className="flex gap-2.75 text-[var(--home-body)]">
              <span aria-hidden className="text-[var(--home-accent)]">
                &#10022;
              </span>
              {point}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
