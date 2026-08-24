import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { support } from "@/features/facilities/data/content";

/**
 * `#support`: the eight things running at every hour.
 *
 * The reference framed this section as back-of-house infrastructure (generators,
 * medical gas manifolds, waste protocol). None of that is published, so the
 * section keeps the eight-card grid and re-points it at the departments the
 * hospital does state are staffed around the clock.
 */
export function SupportSection() {
  return (
    <section id="support" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          07 / Around the clock
        </div>
        <div className="mt-4.5 grid gap-6 min-[900px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] min-[900px]:items-end min-[900px]:gap-14">
          <h2 className="font-display text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            Open when you
            <br />
            need it open
          </h2>
          <p className="text-[16px] leading-[1.6] text-[var(--home-muted)]" style={{ textWrap: "pretty" }}>
            A hospital is judged at three in the morning. These eight are staffed or on call whenever you
            arrive.
          </p>
        </div>
      </Reveal>

      <RevealStagger
        stepMs={70}
        className="mt-11.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4"
      >
        {support.map((item) => (
          <div
            key={item.no}
            className="sj-tint bg-[var(--home-bg)] p-7"
          >
            <div className="text-[12px] font-bold tracking-[0.18em] text-[var(--home-accent)] tabular-nums">
              {item.no}
            </div>
            <h3 className="font-display mt-3 text-[19px] leading-[1.12] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
              {item.name}
            </h3>
            <p className="mt-2.5 text-[14px] leading-[1.55] text-[var(--home-muted)]">{item.desc}</p>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
