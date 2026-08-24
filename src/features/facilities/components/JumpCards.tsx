import { RevealStagger } from "@/components/ui/RevealStagger";
import { jumpCards } from "@/features/facilities/data/content";

/**
 * `#jump`: four anchor cards into the sections below.
 *
 * Built to the reference exactly: a flex column with an even 10px rhythm
 * between the three lines, 26px/24px padding, and no call-to-action row. The
 * whole card fills with accent on hover (`sj-fill`), which is why the three
 * lines inherit their colour on hover rather than keeping their own.
 */
export function JumpCards() {
  return (
    <section id="jump" className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8 lg:px-11">
      <RevealStagger
        stepMs={85}
        className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4"
      >
        {jumpCards.map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="sj-fill flex flex-col gap-2.5 bg-[var(--home-bg)] px-6 py-6.5"
          >
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent)] uppercase">
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
