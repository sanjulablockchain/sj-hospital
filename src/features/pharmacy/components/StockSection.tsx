import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { PharmacyContent } from "../data/getContent";

/**
 * `#stock`: the stocked categories as a three-column table, against a heading
 * that stays put while the rows scroll past it.
 *
 * The sticky column goes static below 900px, where the two columns have already
 * collapsed into one and there is nothing left for it to stay beside.
 */
export function StockSection({ content }: { content: PharmacyContent }) {
  const { sectionEyebrows, stock, stockCta, stockHeading, stockIntro } = content;
  return (
    <section id="stock" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      {/* `minmax(0, ...)` on both tracks: a bare `fr` track cannot shrink
          below its content's intrinsic width, and Sinhala/Tamil form long
          unbreakable tokens where English would have a space, so without
          this the grid (and the page) overflows a 360px viewport. */}
      <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-start gap-14 max-[899px]:grid-cols-1 max-[899px]:gap-10">
        <Reveal className="sticky top-10 max-[899px]:static">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            {sectionEyebrows.stock}
          </div>
          <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            {stockHeading.line1}
            <br />
            {stockHeading.line2}
            <br />
            {stockHeading.line3}
          </h2>
          <p className="mt-5 max-w-[38ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]">
            {stockIntro}
          </p>
          <a
            href="https://wa.me/94742223334"
            className="sj-invert mt-6 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-5.5 py-3.75 text-[14.5px] font-bold text-[var(--home-on-accent)]"
          >
            {stockCta} <span aria-hidden>&rarr;</span>
          </a>
        </Reveal>

        <RevealStagger stepMs={45} className="border-t border-[var(--home-hairline)]">
          {stock.map((row) => (
            <div
              key={row.name}
              className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1.15fr)_minmax(0,0.55fr)] items-baseline gap-5.5 border-b border-[var(--home-hairline)] px-1 py-5 max-[899px]:grid-cols-1 max-[899px]:gap-y-1.5"
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
