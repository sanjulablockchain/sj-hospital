import { RevealStagger } from "@/components/ui/RevealStagger";
import { jumpCards } from "../data/content";

/**
 * `#jump`: four in-page shortcuts sitting directly under the hero. The hairline
 * between cards is the parent background showing through a 1px grid gap, so
 * there are no double borders where cards meet.
 *
 * The four counts are not decoration: they are the numbers the four core bands
 * carry (01 visits, 02 who, 03 sampling, 04 arranging one), so a card and the
 * section it opens are labelled the same. The two bands after those, medicine
 * and telemedicine, get no card: both hand off to another page, and a shortcut
 * to a summary of somewhere else is a detour.
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
