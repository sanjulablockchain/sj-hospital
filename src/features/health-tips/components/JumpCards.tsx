import { RevealStagger } from "@/components/ui/RevealStagger";
import type { JumpCard } from "../types";

/**
 * `#jump`: four shortcuts into the page. The 2px grid gap over a hairline
 * background is what draws the dividing lines, so no card needs a border of
 * its own; the same trick runs through the rest of the page.
 *
 * `jumpCards` arrives as a prop, already localized, rather than being
 * imported here. Each card's `count` is substituted into its own
 * `countTemplate` (a `{n}` token) rather than being glued onto a translated
 * string: Sinhala and Tamil do not necessarily put the counted word where
 * English does.
 */
export function JumpCards({ jumpCards }: { jumpCards: readonly JumpCard[] }) {
  return (
    <section id="jump" className="mx-auto max-w-[1440px] px-5 pt-18.5 sm:px-8 min-[641px]:pt-20 lg:px-11">
      <RevealStagger
        stepMs={60}
        className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[641px]:grid-cols-2 min-[1025px]:grid-cols-4"
      >
        {jumpCards.map((card) => {
          const count =
            card.count === undefined ? card.countTemplate : card.countTemplate.replace("{n}", String(card.count));
          return (
            <a
              key={card.href}
              href={card.href}
              className="group flex min-w-0 flex-col gap-2.5 bg-[var(--home-bg)] px-6 py-6.5 transition-colors duration-300 hover:bg-[var(--home-accent)]"
            >
              <span className="wrap-break-word text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase group-hover:text-[var(--home-on-accent)]">
                {count}
              </span>
              <span className="font-display wrap-break-word text-[25px] leading-[1.04] font-semibold tracking-[-0.03em] text-[var(--home-heading)] group-hover:text-[var(--home-on-accent)]">
                {card.label}
              </span>
              <span className="wrap-break-word text-[14px] leading-[1.5] text-[var(--home-muted)] group-hover:text-[var(--home-on-accent)]">
                {card.note}
              </span>
            </a>
          );
        })}
      </RevealStagger>
    </section>
  );
}
