import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

/**
 * `#book`: the closing invitation, built to the reference.
 *
 * The left panel is a solid accent block carrying ink-dark type, the page's
 * only fully filled panel, which is what makes it read as the finish. The right
 * is three equal-height rows on the page background, each filling with the
 * inverted pair on hover so the whole row lights up rather than just its label.
 *
 * The accent panel needs no fixed-dark literals: --home-accent and
 * --home-on-accent are already a matched contrast pair in both themes, so the
 * block flips with the site.
 */
const rows = [
  { label: "Reserve a room", href: "/accommodation", glyph: "→", internal: true },
  { label: "Message on WhatsApp", href: "https://wa.me/94742223334", glyph: "→" },
  { label: "0117 84 84 84", href: "tel:+94117848484", glyph: "☎", tabular: true },
];

export function BookSection() {
  return (
    <section id="book" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="bg-[var(--home-accent)] p-8 text-[var(--home-on-accent)] min-[900px]:px-11 min-[900px]:py-13">
            <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
              10 / Come and look
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase">
              See the rooms
              <br />
              before you
              <br />
              need them.
            </h2>
            <p className="mt-5.5 max-w-[40ch] text-[17px] leading-[1.6] opacity-85">
              Ask at reception and we will show you a room and the ward. No appointment, and no sales talk.
            </p>
          </div>

          <div className="flex flex-col bg-[var(--home-bg)]">
            {rows.map((row, index) => {
              const className = `sj-invert flex flex-1 items-center justify-between gap-5 px-8 py-7 font-display text-[22px] font-semibold tracking-[-0.02em] text-[var(--home-heading)] min-[900px]:text-[25px] ${
                index < rows.length - 1 ? "border-b border-[var(--home-hairline)]" : ""
              } ${row.tabular ? "tabular-nums" : ""}`;

              return row.internal ? (
                <Link key={row.href} href={row.href} className={className}>
                  {row.label} <span aria-hidden>{row.glyph}</span>
                </Link>
              ) : (
                <a key={row.href} href={row.href} className={className}>
                  {row.label} <span aria-hidden>{row.glyph}</span>
                </a>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
