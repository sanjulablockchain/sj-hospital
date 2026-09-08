import type { MetadataRoute } from "next";
import { localeAlternates } from "@/lib/i18n/alternates";
import { LOCALES } from "@/lib/i18n/locales";
import { serviceSlugs } from "@/features/services/data/services";

/**
 * Every page, in every one of its three locales. Google's own sitemap docs
 * ask for one <url> entry per URL, each self-referential and carrying the
 * full set of language alternates including itself, not one entry per PAGE
 * with the other languages only ever hanging off it as `alternates`: see
 * https://developers.google.com/search/docs/specialty/international/localized-versions#sitemap.
 * The pages themselves already carry a correct self-canonical and the full
 * hreflang set in their HTML head regardless of what this file does, so
 * listing only the English URL here was never a broken-indexing bug. It was,
 * however, the wrong shape for the one artifact whose entire job is
 * discovery, on a branch whose whole point is Sinhala and Tamil readers: a
 * crawler reading this sitemap alone would see only the English URL of every
 * page and have to already know to look for the other two.
 *
 * The site had no sitemap before this, so nothing here replaces an old one.
 */
const STATIC_PATHS = [
  "/",
  "/about-us",
  "/accommodation",
  "/careers",
  "/contact-us",
  "/e-channeling",
  "/facilities",
  "/health-tips",
  "/home-care",
  "/international-care",
  "/media",
  "/network",
  "/pharmacy",
  "/privacy-policy",
  "/school-wellness",
  "/services",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PATHS, ...serviceSlugs.map((slug) => `/services/${slug}`)];

  // One entry per (path, locale) pair: 52 paths * 3 locales. `languages` is
  // the same full en/si/ta/x-default map on all three entries for a given
  // path; only `canonical` (and therefore `url`) changes, so each locale's
  // entry is self-referential the way Google's docs ask for.
  return paths.flatMap((path) =>
    LOCALES.map((locale) => {
      const { canonical, languages } = localeAlternates(path, locale);
      return { url: canonical, alternates: { languages } };
    })
  );
}
