import { localize } from "@/lib/i18n/localize";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import * as dengue from "./dengue";
import * as firstAid from "./firstAid";
import * as library from "./library";
import * as myths from "./myths";
import * as pageContent from "./pageContent";
import * as screening from "./screening";
import * as warnings from "./warnings";

/**
 * The health tips page's copy in one locale, across all seven of this
 * feature's data files. Each English module is the shape: the result always
 * has its keys, its array lengths and its facts, and an overlay can only
 * replace strings (see `localize`). This exposes ONE getter returning an
 * object keyed by data file, so `HealthTipsPage` awaits once rather than
 * seven times, and passes slices of the one result down to its sections as
 * props, the same shape `HomePage`'s and `ServicesIndexPage`'s multi-file
 * getters already use.
 *
 * `library.categoryCounts` and every structural export (`CATEGORIES`,
 * `TIP_CATEGORIES`, `WARNING_LEVELS`, `LEVEL_TONE`) pass straight through
 * `localize` unchanged: none of them is a string, and `categoryCounts` is a
 * function, which `localize` returns as-is (see its own final branch).
 */
const overlays = {
  dengue: { si: () => import("./dengue.si"), ta: () => import("./dengue.ta") },
  firstAid: { si: () => import("./firstAid.si"), ta: () => import("./firstAid.ta") },
  library: { si: () => import("./library.si"), ta: () => import("./library.ta") },
  myths: { si: () => import("./myths.si"), ta: () => import("./myths.ta") },
  pageContent: { si: () => import("./pageContent.si"), ta: () => import("./pageContent.ta") },
  screening: { si: () => import("./screening.si"), ta: () => import("./screening.ta") },
  warnings: { si: () => import("./warnings.si"), ta: () => import("./warnings.ta") },
};

export type HealthTipsContent = {
  dengue: typeof dengue;
  firstAid: typeof firstAid;
  library: typeof library;
  myths: typeof myths;
  pageContent: typeof pageContent;
  screening: typeof screening;
  warnings: typeof warnings;
};

export async function getHealthTipsContent(locale: Locale): Promise<HealthTipsContent> {
  if (locale === DEFAULT_LOCALE) {
    return { dengue, firstAid, library, myths, pageContent, screening, warnings };
  }

  const [
    dengueOverlay,
    firstAidOverlay,
    libraryOverlay,
    mythsOverlay,
    pageContentOverlay,
    screeningOverlay,
    warningsOverlay,
  ] = await Promise.all([
    overlays.dengue[locale](),
    overlays.firstAid[locale](),
    overlays.library[locale](),
    overlays.myths[locale](),
    overlays.pageContent[locale](),
    overlays.screening[locale](),
    overlays.warnings[locale](),
  ]);

  return {
    dengue: localize(dengue, dengueOverlay),
    firstAid: localize(firstAid, firstAidOverlay),
    library: localize(library, libraryOverlay),
    myths: localize(myths, mythsOverlay),
    pageContent: localize(pageContent, pageContentOverlay),
    screening: localize(screening, screeningOverlay),
    warnings: localize(warnings, warningsOverlay),
  };
}
