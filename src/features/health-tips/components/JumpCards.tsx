import { RevealStagger } from "@/components/ui/RevealStagger";
import { jumpCards } from "../data/pageContent";

/**
 * `#jump`: four shortcuts into the page. The 2px grid gap over a hairline
 * background is what draws the dividing lines, so no card needs a border of
 * its own; the same trick runs through the rest of the page.
 */
export function JumpCards() {
  return (
    <section id="jump" className="mx-auto max-w-[1440px] px-5 pt-18.5 sm:px-8 min-[641px]:pt-20 lg:px-11">
      <RevealStagger
        stepMs={60}
        className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[641px]:grid-cols-2 min-[1025px]:grid-cols-4"
      >
        {jumpCards.map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="group flex flex-col gap-2.5 bg-[var(--home-bg)] px-6 py-6.5 transition-colors duration-300 hover:bg-[var(--home-accent)]"
          >
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase group-hover:text-[var(--home-on-accent)]">
              {card.count}
            </span>
            <span className="font-display text-[25px] leading-[1.04] font-semibold tracking-[-0.03em] text-[var(--home-heading)] group-hover:text-[var(--home-on-accent)]">
              {card.label}
            </span>
            <span className="text-[14px] leading-[1.5] text-[var(--home-muted)] group-hover:text-[var(--home-on-accent)]">
              {card.note}
            </span>
          </a>
        ))}
      </RevealStagger>
    </section>
  );
}
