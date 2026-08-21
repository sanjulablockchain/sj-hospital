import { Reveal } from "@/components/ui/Reveal";
import type { Service } from "@/features/services/types";

/**
 * `#about`: the per-service explainer. Left column carries the service's own
 * copy: `aboutHead` as the page's only `<h2>` here, `body1`/`body2`, then
 * "what this covers" and "conditions we see most" as real lists. Right
 * column is a compact facts card that follows the reader down the page
 * (`WhoWeAreSection`'s sticky-column pattern, mirrored onto the shorter
 * side) so `facts` and the visit location stay visible while scanning the
 * longer left column.
 */
export function AboutSection({ service }: { service: Service }) {
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <div className="grid grid-cols-1 items-start gap-14 min-[900px]:grid-cols-[1.15fr_0.85fr] min-[900px]:gap-18">
        <div>
          <Reveal>
            <h2 className="font-display text-[clamp(34px,3.8vw,54px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-[var(--home-heading)] uppercase">
              {service.aboutHead}
            </h2>
            <p
              className="mt-6 max-w-[62ch] text-[17px] leading-[1.65] text-[var(--home-body)]"
              style={{ textWrap: "pretty" }}
            >
              {service.body1}
            </p>
            <p className="mt-4.5 max-w-[62ch] text-[15.5px] leading-[1.65] text-[var(--home-muted)]">
              {service.body2}
            </p>
          </Reveal>

          <Reveal className="mt-11">
            <h3 className="font-display text-[19px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
              What this covers
            </h3>
            <ul className="mt-4.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] sm:grid-cols-2">
              {service.covers.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 bg-[var(--home-bg)] px-5 py-4 text-[14px] leading-[1.5] text-[var(--home-muted)]"
                >
                  <span aria-hidden className="text-[var(--home-accent)]">
                    &#8226;
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-9.5">
            <h3 className="font-display text-[19px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
              Conditions we see most
            </h3>
            <ul className="mt-4.5 flex flex-wrap gap-2.5">
              {service.conditions.map((condition) => (
                <li
                  key={condition}
                  className="border border-[var(--home-hairline)] px-3.5 py-2 text-[13px] font-semibold text-[var(--home-muted)]"
                >
                  {condition}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="min-[900px]:sticky min-[900px]:top-10">
          <Reveal className="bg-[var(--home-surface-2)] p-8">
            <a href="#book" className="group flex items-start justify-between gap-4">
              <h3 className="font-display text-[24px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)] transition-colors duration-300 group-hover:text-[var(--home-accent)]">
                {service.cta}
              </h3>
              <span
                aria-hidden
                className="mt-1.5 shrink-0 text-[var(--home-accent)] transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>

            <dl className="mt-7 flex flex-col gap-3.5 border-t border-[var(--home-hairline)] pt-6">
              {service.facts.map((fact) => (
                <div key={fact.k} className="flex items-baseline justify-between gap-4">
                  <dt className="text-[13px] text-[var(--home-muted)]">{fact.k}</dt>
                  <dd className="text-right text-[13.5px] font-bold text-[var(--home-heading)]">{fact.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 border-t border-[var(--home-hairline)] pt-6">
              <div className="text-[13.5px] font-bold text-[var(--home-heading)]">{service.location}</div>
              <div className="mt-1.5 text-[13px] text-[var(--home-muted)]">229/10 St. Joseph Street, Negombo</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
