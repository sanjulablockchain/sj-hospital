import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { relatedServices } from "@/features/services/data/services";

/**
 * `#related`: three sibling services (same group first, see
 * `relatedServices`), each a full-card link into its own detail page. Hover
 * lift mirrors `CentresSection`'s card idiom, just with the arrow reveal
 * instead of a lead-fact reveal since there's no equivalent short fact here.
 */
export function RelatedSection({ slug }: { slug: string }) {
  const related = relatedServices(slug);
  if (related.length === 0) return null;

  return (
    <section id="related" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <h2 className="font-display text-[clamp(34px,3.8vw,54px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-[var(--home-heading)] uppercase">
          Related services
        </h2>
      </Reveal>

      <RevealStagger
        stepMs={70}
        className="mt-11.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-3"
      >
        {related.map((service) => {
          const meta = service.strip[0];
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col bg-[var(--home-bg)] p-7.5 transition-transform duration-[400ms] hover:-translate-y-1.5"
            >
              <div className="text-[11.5px] font-bold tracking-[0.18em] text-[var(--home-accent)] uppercase">
                {service.group}
              </div>
              <h3 className="font-display mt-3 text-[21px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
                {service.directoryTitle}
              </h3>
              <div className="mt-3.5 flex items-baseline gap-2 text-[13px] font-bold">
                <span className="tracking-[0.06em] text-[var(--home-muted)] uppercase">{meta.k}</span>
                <span className="text-[var(--home-heading)]">{meta.v}</span>
              </div>
              <span
                aria-hidden
                className="mt-4 inline-block text-[15px] font-bold text-[var(--home-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                &rarr;
              </span>
            </Link>
          );
        })}
      </RevealStagger>
    </section>
  );
}
