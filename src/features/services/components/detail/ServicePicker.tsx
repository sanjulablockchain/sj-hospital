import Link from "next/link";
import type { Service } from "@/features/services/types";
import { localePath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";

/**
 * All services as a chip row directly under the hero. Chips render from
 * `services` (a prop, the already-localized catalog passed down by
 * `ServiceDetailPage`, rather than an import of `data/services` here) so no
 * hardcoded count or slug list can drift from the real catalog, and the
 * current page's chip is marked with `aria-current`.
 *
 * Plain `next/link` rather than `LocaleLink`: `LocaleLink` has no
 * `aria-current` passthrough, and this row's whole purpose is marking the
 * current page for assistive tech. That is a reason to build the href by
 * hand, not a reason to leave it unprefixed: the `sj-locale` cookie in
 * `src/proxy.ts` is written only by an explicit click on the language
 * switcher (`rememberLocale`, called from `LanguageToggleButton` and
 * `LanguageMenuToggle`), never by landing on a `/si/...` URL, so a reader
 * arriving on a shared link or a crawler carries no cookie and the proxy's
 * rewrite branch would otherwise take their first chip click straight into
 * English. `locale` is threaded down from `ServiceDetailPage` and every
 * chip's href is built with `localePath` instead.
 *
 * Below the `lg` breakpoint (1024px) the row scrolls horizontally rather than
 * wrapping, so 36 chips don't push the page's real content far down.
 */
export function ServicePicker({
  services,
  current,
  ariaLabel,
  locale,
}: {
  services: Service[];
  current: string;
  ariaLabel: string;
  locale: Locale;
}) {
  return (
    <nav aria-label={ariaLabel} className="border-b border-[var(--home-hairline)] bg-[var(--home-bg)]">
      <div className="mx-auto flex w-full max-w-[1440px] gap-2.5 overflow-x-auto px-5 py-5 sm:px-8 lg:flex-wrap lg:overflow-visible lg:px-11">
        {services.map((service) => {
          const isCurrent = service.slug === current;
          return (
            <Link
              key={service.slug}
              href={localePath(`/services/${service.slug}`, locale)}
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
