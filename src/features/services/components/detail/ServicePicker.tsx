import Link from "next/link";
import type { Service } from "@/features/services/types";

/**
 * All services as a chip row directly under the hero. Chips render from
 * `services` (a prop, the already-localized catalog passed down by
 * `ServiceDetailPage`, rather than an import of `data/services` here) so no
 * hardcoded count or slug list can drift from the real catalog, and the
 * current page's chip is marked with `aria-current`.
 *
 * Plain `next/link` rather than `LocaleLink`: `LocaleLink` has no
 * `aria-current` passthrough, and this row's whole purpose is marking the
 * current page for assistive tech. The proxy's locale cookie still lands a
 * reader on the right language after the hop (see `src/proxy.ts`).
 *
 * Below the `lg` breakpoint (1024px) the row scrolls horizontally rather than
 * wrapping, so 36 chips don't push the page's real content far down.
 */
export function ServicePicker({
  services,
  current,
  ariaLabel,
}: {
  services: Service[];
  current: string;
  ariaLabel: string;
}) {
  return (
    <nav aria-label={ariaLabel} className="border-b border-[var(--home-hairline)] bg-[var(--home-bg)]">
      <div className="mx-auto flex w-full max-w-[1440px] gap-2.5 overflow-x-auto px-5 py-5 sm:px-8 lg:flex-wrap lg:overflow-visible lg:px-11">
        {services.map((service) => {
          const isCurrent = service.slug === current;
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              prefetch={false}
              aria-current={isCurrent ? "page" : undefined}
              className={
                isCurrent
                  ? "shrink-0 whitespace-nowrap bg-[var(--home-accent)] px-4 py-2.5 text-[13px] font-bold text-[var(--home-on-accent)]"
                  : "shrink-0 whitespace-nowrap border border-[var(--home-hairline)] px-4 py-2.5 text-[13px] font-semibold text-[var(--home-body)] hover:border-[var(--home-accent)] hover:text-[var(--home-heading)]"
              }
            >
              {service.directoryTitle}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
