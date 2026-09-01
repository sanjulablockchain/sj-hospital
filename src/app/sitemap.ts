import type { MetadataRoute } from "next";
import { localeAlternates } from "@/lib/i18n/alternates";
import { serviceSlugs } from "@/features/services/data/services";

/**
 * Every page, once, at its canonical English URL, each carrying the Sinhala and
 * Tamil alternates. Listing the prefixed URLs as separate entries as well would
 * describe the same page three times.
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

  return paths.map((path) => {
    // The English URL is the entry, with the other two hanging off it as
    // alternates. Listing all three as separate entries would describe the
    // same page three times.
    const { canonical, languages } = localeAlternates(path, "en");
    return { url: canonical, alternates: { languages } };
  });
}
