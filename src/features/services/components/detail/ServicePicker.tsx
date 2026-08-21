import Link from "next/link";
import { services } from "@/features/services/data/services";

/**
 * All services as a chip row directly under the hero. The design reference
 * swapped services client-side via a hash picker; now that each service is a
 * real route this is plain navigation, so it stays a Server Component — chips
 * render from `services` (no hardcoded count or slug list) and the current
 * page's chip is marked with `aria-current`.
 *
 * Below the `lg` breakpoint (1024px) the row scrolls horizontally rather than
 * wrapping, so 36 chips don't push the page's real content far down.
 */
export function ServicePicker({ current }: { current: string }) {
  return (
    <nav aria-label="All services" className="border-b border-[var(--home-hairline)] bg-[var(--home-bg)]">
      <div className="mx-auto flex w-full max-w-[1440px] gap-2.5 overflow-x-auto px-5 py-5 sm:px-8 lg:flex-wrap lg:overflow-visible lg:px-11">
        {services.map((service) => {
          const isCurrent = service.slug === current;
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
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
