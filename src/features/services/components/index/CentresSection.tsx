import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { centres } from "@/features/services/data/indexContent";

/**
 * `#centres`: the nine centres of excellence, each card linking into the full
 * directory below. The `lead` fact stays hidden until hover so the grid reads
 * as calm scan-copy first, with the extra detail as a reward for lingering —
 * screen readers still get it regardless of hover state.
 */
export function CentresSection() {
  return (
    <section id="centres" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          01 / Centres of excellence
        </div>
        <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
          Nine units built around one problem
        </h2>
      </Reveal>

      <RevealStagger
        stepMs={70}
        className="mt-11.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3"
      >
        {centres.map((centre, index) => {
          const isLastOfNine = index === centres.length - 1;

          return (
            <a
              key={centre.no}
              href="#directory"
              className={`group flex flex-col bg-[var(--home-bg)] p-7.5 transition-transform duration-[450ms] hover:-translate-y-1.5 ${
                isLastOfNine ? "min-[640px]:col-span-2 min-[1024px]:col-span-1" : ""
              }`}
            >
              <div className="text-[13px] font-bold tracking-[0.14em] text-[var(--home-accent)] uppercase tabular-nums">
                {centre.no}
              </div>
              <h3 className="font-display mt-3 text-[22px] leading-[1.1] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
                {centre.name}
              </h3>
              <p className="mt-2.5 text-[14px] leading-[1.55] text-[var(--home-muted)]">{centre.desc}</p>
              <span
                style={{ transitionProperty: "opacity, transform", transitionDuration: "400ms, 450ms" }}
                className="mt-3.5 inline-block translate-y-2 text-[13px] font-bold text-[var(--home-accent)] opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
              >
                {centre.lead}
              </span>
            </a>
          );
        })}
      </RevealStagger>
    </section>
  );
}
