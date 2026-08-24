import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { deliveryFacts, sendingWell, steps } from "../data/content";

/**
 * `#delivery`: the four steps of a delivery order, then a two-up panel pairing
 * advice on photographing a prescription with the delivery facts.
 *
 * The 2px grid gaps show the parent's hairline colour through, which is what
 * draws the rules between cells; each cell paints `--home-bg` over the top.
 */
export function DeliverySection() {
  return (
    <section id="delivery" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          04 / Delivery
        </div>
        <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
          Photograph it,
          <br />
          send it, done
        </h2>
      </Reveal>

      <RevealStagger
        stepMs={80}
        className="mt-10 grid grid-cols-4 gap-0.5 bg-[var(--home-hairline)] max-[899px]:grid-cols-1"
      >
        {/* Every cell keeps the reference's 26px right padding, but only the
            first is flush left: the reference left-padded none of them, which
            put the text of cells 2 to 4 hard against the divider the 2px grid
            gap draws. The others get a matching 26px on the left, so the copy
            clears the rule while cell 1 stays aligned with the h2 above. */}
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
            <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--home-muted)]">{step.desc}</p>
          </div>
        ))}
      </RevealStagger>

      <Reveal className="mt-0.5 grid grid-cols-2 gap-0.5 bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
        <div className="bg-[var(--home-bg)] border-t border-[var(--home-hairline)] pt-7 pr-6 pb-7 max-[899px]:px-0">
          <h3 className="text-[12.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
            Sending a prescription well
          </h3>
          <ul className="mt-4 flex flex-col gap-2.75 text-[15px] leading-[1.5]">
            {sendingWell.map((tip) => (
              <li key={tip} className="flex gap-2.75 text-[var(--home-body)]">
                <span aria-hidden className="text-[var(--home-accent)]">
                  &#10022;
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[var(--home-bg)] border-t border-[var(--home-hairline)] pt-7 pb-7 pl-6.5 max-[899px]:px-0">
          <h3 className="text-[12.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
            Delivery detail
          </h3>
          <dl className="mt-4 flex flex-col gap-px bg-[var(--home-hairline)]">
            {deliveryFacts.map((fact) => (
              <div
                key={fact.k}
                className="flex items-baseline justify-between gap-4 bg-[var(--home-bg)] py-3.25"
              >
                <dt className="text-[14px] text-[var(--home-muted)]">{fact.k}</dt>
                <dd className="text-right text-[15px] font-bold text-[var(--home-heading)]">{fact.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
