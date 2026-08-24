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
          <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            One counter,
            <br />
            one record
          </h2>
        </div>
        <p
          className="max-w-[36ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]"
          style={{ textWrap: "pretty" }}
        >
          However your order reaches us, at the counter, from a consultation or by phone, the pharmacist
          reads the same prescription history, so nothing gets dispensed twice.
        </p>
      </Reveal>

      <RevealStagger
        stepMs={90}
        className="mt-10.5 grid grid-cols-3 gap-0.5 bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1"
      >
        {/* Hover is the reference's `[data-unit]` treatment: a 6px lift plus a
            10% accent wash, the same pair the #safety cards use. */}
        {counters.map((counter) => (
          <div
            key={counter.name}
            className="flex min-h-[260px] flex-col bg-[var(--home-bg)] px-7 pt-8 pb-7.5 transition-[background-color,transform] duration-[450ms] hover:-translate-y-1.5 hover:bg-[var(--home-accent)]/10"
          >
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
              {counter.where}
            </span>
            <span className="font-display mt-3.5 text-[28px] leading-[1.02] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
              {counter.name}
            </span>
            <span className="mt-3 text-[15px] leading-[1.55] text-[var(--home-muted)]">
              {counter.desc}
            </span>
            <span className="font-display mt-auto pt-5 text-[30px] font-extrabold tracking-[-0.03em] text-[var(--home-accent)]">
              {counter.hours}
            </span>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
