import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { journeySteps } from "../data/content";

/**
 * `#journey`: the six stages a travelling patient meets, in a 3-column hairline
 * grid that collapses to one column below 900px.
 *
 * The reference's `[data-tile]` hover is three things at once: an accent wash,
 * a 6px lift, and the stage line fading up from the bottom of the card. The
 * wash and lift are the shared `sj-tint` utility; the stage line uses the
 * group-hover pattern from the health tips library, gated behind
 * `@media (hover: hover)` so it stays readable on touch and keyboard, where
 * there is no hover to reveal it.
 */
export function JourneySection() {
  return (
    <section
      id="journey"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              01 / The journey
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              Six steps, one
              <br />
              coordinator
            </h2>
          </div>
          <p className="max-w-[38ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">
            Nobody hands you between departments. The desk that answers your first email is the one
            that arranges your transfer and signs off the pack you take home.
          </p>
        </div>
      </Reveal>

      <RevealStagger
        stepMs={70}
        className="mt-10.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-3"
      >
        {journeySteps.map((step) => (
          <div
            key={step.no}
            className="sj-tint group flex min-h-[254px] flex-col bg-[var(--home-bg)] px-7 pt-8 pb-7.5"
          >
            <span className="font-display text-[42px] leading-none font-extrabold tracking-[-0.04em] text-[var(--home-accent)] tabular-nums">
              {step.no}
            </span>
            <h3 className="font-display mt-4 text-[25px] leading-[1.06] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
              {step.title}
            </h3>
            <p className="mt-3 text-[15px] leading-[1.58] text-[var(--home-body)]">{step.desc}</p>
            <span className="mt-auto pt-4.5 text-[13px] font-bold tracking-[0.14em] text-[var(--home-accent-soft)] uppercase transition-[opacity,transform] duration-[450ms] motion-reduce:transform-none [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
              {step.when}
            </span>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
