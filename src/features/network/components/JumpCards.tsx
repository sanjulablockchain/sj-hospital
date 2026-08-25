import { RevealStagger } from "@/components/ui/RevealStagger";
import { jumpCards } from "../data/content";

/**
 * `#jump`: four in-page shortcuts sitting directly under the hero. The hairline
 * between cards is the parent background showing through a 1px grid gap, so
 * there are no double borders where cards meet.
 *
 * Hover fills the whole card with the accent, per the reference. That is the
 * shared `sj-fill` utility: it carries the `* { color: inherit }` needed to
 * pull the three spans (each with its own explicit colour) onto the fill, it is
 * tokenised so the light theme fills with its own deeper accent, and it sits
 * behind `@media (hover: hover)` so a touch device does not latch a card into
 * the filled state.
 */
export function JumpCards() {
  return (
    <section id="jump" className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-8 lg:px-11">
      <RevealStagger
        stepMs={80}
        className="grid grid-cols-4 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1"
      >
        {jumpCards.map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="sj-fill flex flex-col gap-2.5 bg-[var(--home-bg)] px-6 py-6.5"
          >
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
              {card.count}
            </span>
            <span className="font-display text-[25px] leading-[1.04] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
              {card.label}
            </span>
            <span className="text-[14px] leading-[1.5] text-[var(--home-muted)]">{card.note}</span>
          </a>
        ))}
      </RevealStagger>
    </section>
  );
}
