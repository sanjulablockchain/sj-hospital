import { RevealStagger } from "@/components/ui/RevealStagger";
import { Reveal } from "@/components/ui/Reveal";
import { packages } from "@/features/services/data/indexContent";

/**
 * `#packages`: three health-check tiers. Deliberately carries no price —
 * the reference design's LKR figures were never real, so each card renders
 * only `tier`, `name`, a ticked `items` list and `ctaLabel`. Do not add a
 * price element, placeholder, dash or "POA" back in; see indexContent.test.ts.
 */
export function PackagesSection() {
  return (
    <section id="packages" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          05 / Health checks
        </div>
        <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
          Screening in a single morning
        </h2>
      </Reveal>

      <RevealStagger
        stepMs={90}
        className="mt-11.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[1024px]:grid-cols-3"
      >
        {packages.map((tier) => (
          <article
            key={tier.tier}
            className={`flex flex-col p-8 ${
              tier.accent
                ? "bg-[var(--home-accent)] text-[var(--home-on-accent)]"
                : "bg-[var(--home-surface-2)] text-[var(--home-heading)]"
            }`}
          >
            <div
              className={`text-[12px] font-bold tracking-[0.18em] uppercase ${
                tier.accent ? "opacity-72" : "text-[var(--home-accent)]"
              }`}
            >
              {tier.tier}
            </div>
            <h3 className="font-display mt-3 text-[26px] leading-[1.08] font-semibold tracking-[-0.025em]">
              {tier.name}
            </h3>
            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {tier.items.map((item) => (
                <li
                  key={item}
                  className={`flex gap-3 text-[14.5px] leading-[1.5] ${
                    tier.accent ? "opacity-90" : "text-[var(--home-muted)]"
                  }`}
                >
                  <span aria-hidden className={tier.accent ? "" : "text-[var(--home-accent)]"}>
                    &#10003;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {tier.accent ? (
              <a
                href="#book"
                className="mt-7.5 inline-flex w-fit items-center gap-2 border-b border-[var(--home-on-accent)]/40 pb-0.5 text-[14px] font-bold"
              >
                {tier.ctaLabel} <span aria-hidden>&rarr;</span>
              </a>
            ) : (
              <a
                href="#book"
                className="sj-invert mt-7.5 inline-flex w-fit items-center gap-2.5 bg-[var(--home-accent)] px-6 py-3.5 text-[14.5px] font-bold text-[var(--home-on-accent)]"
              >
                {tier.ctaLabel} <span aria-hidden>&rarr;</span>
              </a>
            )}
          </article>
        ))}
      </RevealStagger>
    </section>
  );
}
