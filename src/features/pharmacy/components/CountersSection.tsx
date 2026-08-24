import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { counters } from "../data/content";

/**
 * `#counters`: what the ground floor counter does, in three cards.
 *
 * The reference had three physically separate counters here (outpatient, one
 * beside A&E, and ward dispensing). The catalog puts both pharmacy entries at
 * the single "Ground floor, pharmacy counter" and describes no second window,
 * so this keeps the reference's three-card grid but splits it by job rather
 * than by invented geography.
 */
export function CountersSection() {
  return (
    <section id="counters" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <Reveal className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            01 / Where to find us
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(34px,4vw,58px)] leading-[0.94] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            One counter,
            <br />
            one record
          </h2>
        </div>
        <p
          className="max-w-[44ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]"
          style={{ textWrap: "pretty" }}
        >
          However your order reaches us, at the counter, from a consultation or by phone, the pharmacist
          reads the same prescription history, so nothing gets dispensed twice.
        </p>
      </Reveal>

      <RevealStagger
        stepMs={90}
        className="mt-12 grid grid-cols-3 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1"
      >
        {counters.map((counter) => (
          <div
            key={counter.name}
            className="flex flex-col gap-3.5 bg-[var(--home-bg)] p-8 transition-[background-color,transform] duration-[450ms] hover:-translate-y-1.5 hover:bg-[var(--home-surface-2)]"
          >
            <span className="text-[11.5px] font-bold tracking-[0.18em] text-[var(--home-accent)] uppercase">
              {counter.where}
            </span>
            <span className="font-display text-[24px] leading-[1.1] font-extrabold tracking-[-0.025em] text-[var(--home-heading)]">
              {counter.name}
            </span>
            <span className="text-[15px] leading-[1.62] text-[var(--home-muted)]">{counter.desc}</span>
            <span className="font-display mt-auto pt-3 text-[17px] font-bold tracking-[-0.02em] text-[var(--home-heading)]">
              {counter.hours}
            </span>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
