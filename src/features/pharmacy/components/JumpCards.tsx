import { RevealStagger } from "@/components/ui/RevealStagger";
import { jumpCards } from "../data/content";

/**
 * `#jump`: four in-page shortcuts sitting directly under the hero. The hairline
 * between cards is the parent background showing through a 1px grid gap, so
 * there are no double borders where cards meet.
 */
export function JumpCards() {
  return (
    <section id="jump" className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8 lg:px-11">
      <RevealStagger
        stepMs={80}
        className="grid grid-cols-4 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1"
      >
        {jumpCards.map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="group flex flex-col gap-2 bg-[var(--home-bg)] p-7 transition-colors hover:bg-[var(--home-surface-2)]"
          >
            <span className="font-display text-[13px] font-bold tracking-[0.14em] text-[var(--home-accent)] uppercase">
              {card.count}
            </span>
            <span className="font-display text-[19px] font-bold tracking-[-0.02em] text-[var(--home-heading)]">
              {card.label}
            </span>
            <span className="text-[14px] leading-[1.55] text-[var(--home-muted)]">{card.note}</span>
          </a>
        ))}
      </RevealStagger>
    </section>
  );
}
