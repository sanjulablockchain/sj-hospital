import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { stock } from "../data/content";

/**
 * `#stock`: the stocked categories as a three-column table, against a heading
 * that stays put while the rows scroll past it.
 *
 * The sticky column goes static below 900px, where the two columns have already
 * collapsed into one and there is nothing left for it to stay beside.
 */
export function StockSection() {
  return (
    <section id="stock" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <div className="grid grid-cols-[0.9fr_1.1fr] items-start gap-14 max-[899px]:grid-cols-1 max-[899px]:gap-10">
        <Reveal className="sticky top-10 max-[899px]:static">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            03 / What we stock
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            On the
            <br />
            shelves
            <br />
            tonight
          </h2>
          <p className="mt-5 max-w-[38ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]">
            Prescription medicine, everyday over the counter items, and the dressings and supplies
            patients actually need at home after a procedure.
          </p>
          <a
            href="https://wa.me/94742223334"
            className="sj-invert mt-6 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-5.5 py-3.75 text-[14.5px] font-bold text-[var(--home-on-accent)]"
          >
            Check availability <span aria-hidden>&rarr;</span>
          </a>
        </Reveal>

        <RevealStagger stepMs={45} className="border-t border-[var(--home-hairline)]">
          {stock.map((row) => (
            <div
              key={row.name}
              className="grid grid-cols-[1.15fr_1.15fr_0.55fr] items-baseline gap-5.5 border-b border-[var(--home-hairline)] px-1 py-5 max-[899px]:grid-cols-1 max-[899px]:gap-y-1.5"
            >
              <span className="text-[17.5px] font-bold text-[var(--home-heading)]">{row.name}</span>
              <span className="text-[14.5px] leading-[1.5] text-[var(--home-muted)]">{row.note}</span>
              <span className="text-[13.5px] font-bold text-[var(--home-accent-soft)] max-[899px]:text-left min-[900px]:text-right">
                {row.tag}
              </span>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
