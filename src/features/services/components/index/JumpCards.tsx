import { RevealStagger } from "@/components/ui/RevealStagger";
import { jumpCards } from "@/features/services/data/indexContent";
import { groupCounts } from "@/features/services/data/services";

/**
 * `#jump`: four anchor cards into the sections below. The directory card's
 * count is derived from the live catalog (`groupCounts().All`) rather than the
 * literal string baked into `indexContent.ts`, so it can never drift from the
 * 36 services actually in `data/services`.
 */
export function JumpCards() {
  const totalServices = groupCounts().All;

  return (
    <section id="jump" className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8 lg:px-11">
      <RevealStagger
        stepMs={85}
        className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4"
      >
        {jumpCards.map((card) => {
          const count = card.href === "#directory" ? `${totalServices} services` : card.count;

          return (
            <a
              key={card.href}
              href={card.href}
              className="group block bg-[var(--home-bg)] p-7.5 transition-transform duration-[450ms] hover:-translate-y-1.5"
            >
              <div className="text-[13px] font-bold tracking-[0.14em] text-[var(--home-accent)] uppercase tabular-nums">
                {count}
              </div>
              <h3 className="font-display mt-3 text-[22px] leading-[1.1] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
                {card.label}
              </h3>
              <p className="mt-2.5 text-[14px] leading-[1.55] text-[var(--home-muted)]">{card.note}</p>
              <span className="mt-4.5 inline-flex items-center gap-2 text-[13px] font-bold text-[var(--home-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Explore <span aria-hidden>&rarr;</span>
              </span>
            </a>
          );
        })}
      </RevealStagger>
    </section>
  );
}
