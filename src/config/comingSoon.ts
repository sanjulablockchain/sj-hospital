/**
 * Services listed on the site that the hospital does not run yet (owner,
 * 2026-11-20). Their detail pages stay up with all their content, but every
 * preview of them (the /services directory, the header's Services menu, the
 * home carousel, related cards) shows a "Coming soon" badge, and their pages
 * ask rather than book. When one opens, delete its slug here.
 *
 * Kept in `config/` as plain data with no `@/` imports, so the header (a
 * client bundle), the home data and `node --test` can all read it without
 * reaching into the services feature. `comingSoon.test.ts` pins the list and
 * checks every slug is a real service page.
 */
export const COMING_SOON_SLUGS: readonly string[] = [
  "intensive-critical-care",
  "endoscopy",
  "fertility",
  "fetal-monitoring",
  "obstetrics-maternity",
  "vaccination-clinic",
  "telemedicine",
];

const SLUGS = new Set(COMING_SOON_SLUGS);

/** True for a service slug the hospital does not run yet. */
export function isComingSoonSlug(slug: string): boolean {
  return SLUGS.has(slug);
}

const SERVICE_HREF = /^(?:\/(?:si|ta))?\/services\/([a-z0-9-]+)(?:#.*)?$/;

/**
 * True for a link to a coming soon service's page: `/services/<slug>`, with
 * or without a `/si` or `/ta` prefix and a `#fragment`.
 */
export function isComingSoonHref(href: string): boolean {
  const match = SERVICE_HREF.exec(href);
  return match ? SLUGS.has(match[1]) : false;
}
