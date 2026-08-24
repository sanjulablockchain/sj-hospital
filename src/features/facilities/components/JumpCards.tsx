import { RevealStagger } from "@/components/ui/RevealStagger";
import { jumpCards } from "@/features/facilities/data/content";

/** `#jump`: four anchor cards into the sections below. */
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
            className="group block bg-[var(--home-bg)] p-7.5 transition-transform duration-[450ms] hover:-translate-y-1.5"
          >
            <div className="text-[13px] font-bold tracking-[0.14em] text-[var(--home-accent)] uppercase tabular-nums">
              {card.count}
            </div>
            <h3 className="font-display mt-3 text-[22px] leading-[1.1] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
              {card.label}
            </h3>
            <p className="mt-2.5 text-[14px] leading-[1.55] text-[var(--home-muted)]">{card.note}</p>
            <span className="mt-4.5 inline-flex items-center gap-2 text-[13px] font-bold text-[var(--home-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Explore <span aria-hidden>&rarr;</span>
            </span>
          </a>
        ))}
      </RevealStagger>
    </section>
  );
}
