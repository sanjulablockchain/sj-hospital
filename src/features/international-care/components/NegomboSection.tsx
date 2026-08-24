import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { practical } from "../data/content";

/**
 * `#stay`: the sticky copy column and the practical list, the reference's
 * `[data-r="split"]` at 0.85fr / 1.15fr, going static and single column below
 * 900px.
 *
 * Rows hover with the soft accent wash (`sj-tint-row`) rather than the card
 * lift: these are list rows, not tiles, which is the same distinction the
 * facilities and pharmacy tables draw.
 *
 * The list is hospital facts plus two plain travel facts, the time zone and the
 * climate. The reference's rows about a money changer, an ATM in the lobby and
 * negotiated guest house rates are not backed here and are gone.
 */
export function NegomboSection() {
  return (
    <section
      id="stay"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <div className="grid items-start gap-14.5 min-[900px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] max-[899px]:gap-10">
        <Reveal className="min-[900px]:sticky min-[900px]:top-10">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            06 / Recovering in Negombo
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            A good place
            <br />
            to get better
          </h2>
          <p className="mt-5 max-w-[38ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]">
            Negombo is a coastal town, quiet and walkable, ten minutes from the airport and about an
            hour from Colombo. Most patients spend the week after a procedure here rather than
            travelling on.
          </p>
          <p className="mt-3.5 max-w-[38ch] text-[15px] leading-[1.6] text-[var(--home-muted)]">
            Ask your consultant before you plan anything. Flying, swimming and long drives after
            surgery each have their own timeline, and the answer depends on the operation.
          </p>
        </Reveal>

        <RevealStagger stepMs={40} className="border-t border-[var(--home-hairline)]">
          {practical.map((row) => (
            <div
              key={row.k}
              className="sj-tint-row flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[var(--home-hairline)] px-1 py-5"
            >
              <span className="text-[16.5px] font-bold text-[var(--home-heading)]">{row.k}</span>
              <span className="max-w-[46ch] text-[15px] leading-[1.5] text-[var(--home-muted)] min-[560px]:text-right">
                {row.v}
              </span>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
