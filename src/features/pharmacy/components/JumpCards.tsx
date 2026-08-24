import { RevealStagger } from "@/components/ui/RevealStagger";
import { jumpCards } from "../data/content";

/**
 * `#jump`: four in-page shortcuts sitting directly under the hero. The hairline
 * between cards is the parent background showing through a 1px grid gap, so
 * there are no double borders where cards meet.
 *
 * Hover fills the whole card with the accent and flips every line to
 * `--home-on-accent`, per the reference. It sets `color: #04122B` on the anchor
 * for this, but its three spans carry explicit colours that would have won, so
 * the flip is done with `group-hover` on each line instead. Tokens rather than
 * the reference's literals, so the light theme fills with its own deeper accent
 * and switches the text to white.
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
