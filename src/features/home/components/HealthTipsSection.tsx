import { Reveal } from "./Reveal";
import { RevealStagger } from "./RevealStagger";
import { healthTips } from "../data/healthTips";

export function HealthTipsSection() {
  return (
    <section id="tips" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              08 / Health tips
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              Small habits,
              <br />
              written by
              <br />
              our doctors
            </h2>
          </div>
          <a href="#tips" className="sj-invert inline-flex items-center gap-2.5 border border-[var(--home-hairline-strong)] px-5.5 py-3.5 text-[14.5px] font-bold text-[var(--home-heading)]">
            All health tips <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </Reveal>
      <RevealStagger className="mt-12 border-t border-[var(--home-hairline)]">
        {healthTips.map((tip) => (
          <a
            key={tip.title}
            href="#tips"
            className="sj-row grid grid-cols-1 gap-3 border-b border-[var(--home-hairline)] px-1 py-6.5 text-inherit min-[640px]:grid-cols-[0.5fr_1.5fr_1fr] min-[640px]:items-baseline min-[640px]:gap-6"
          >
            <span className="text-[13px] font-bold tracking-[0.14em] text-[var(--home-accent)] uppercase">
              {tip.category}
            </span>
            <span className="font-display text-[clamp(21px,2.1vw,30px)] leading-[1.1] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
              {tip.title}
            </span>
            <span className="text-[14.5px] leading-[1.55] text-[var(--home-muted)]">{tip.excerpt}</span>
          </a>
        ))}
      </RevealStagger>
    </section>
  );
}
