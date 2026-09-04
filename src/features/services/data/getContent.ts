import { localize } from "@/lib/i18n/localize";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import * as groupsBase from "./groups";
import * as indexContentBase from "./indexContent";
import { emergencyServices } from "./emergency";
import { surgicalServices } from "./surgical";
import { diagnosticServices } from "./diagnostics";
import { clinicServices } from "./clinics";
import { womenChildrenServices } from "./womenChildren";
import { atHomeServices } from "./atHome";
import { relatedServices as relatedServicesBase } from "./services";
import type { Service } from "../types";

/**
 * The services feature's copy in one locale, across every data file this
 * task and parts 2 to 4 together own: `groups.ts`, `indexContent.ts`, and
 * the six group-of-services files that `services.ts` concatenates into the
 * 36-service catalog (`emergency.ts`, `surgical.ts`, `diagnostics.ts`,
 * `clinics.ts`, `womenChildren.ts`, `atHome.ts`).
 *
 * `services.ts` itself carries no copy (it is aggregation and lookup logic
 * only: `services`, `serviceSlugs`, `getService`, `servicesByGroup`,
 * `groupCounts`, `relatedServices`), so it has no overlay and is not part of
 * `MODULE_OVERLAYS` below; its exports stay exactly as they are, still read
 * directly by `generateStaticParams` and `sitemap.ts`, both of which need
 * the ENGLISH, never-translated `serviceSlugs`.
 *
 * `GROUP_MODULES` is deliberately a separate, parallel list from
 * `services.ts`'s own concatenation, in the exact same order, because a
 * translated `Service[]` is a different value per locale and `services.ts`'s
 * exports are not: `services.ts` stays the single source of truth for
 * ENGLISH order and structural lookups (slug, group), and this file layers
 * translated copy on top of it without changing its shape.
 *
 * TO ADD A GROUP'S TRANSLATION (parts 2 to 4, one of `surgical`,
 * `diagnostics`, `clinics`, `womenChildren`, `atHome`):
 *   1. Write `<file>.si.ts` and `<file>.ta.ts` beside the base file, each
 *      starting with the `__review` marker, the same shape `emergency.si.ts`
 *      / `emergency.ta.ts` already use.
 *   2. Add one entry to `GROUP_OVERLAYS` below:
 *      `<key>: { si: () => import("./<file>.si"), ta: () => import("./<file>.ta") }`.
 *   That is the only change this file needs. No component changes: every
 *   section already reads the combined, localized `services` array this
 *   getter returns, via `ServicesIndexPage` / `ServiceDetailPage`.
 *
 * Add a group's translation and the parity test in
 * `content.i18n.test.ts` picks it up automatically too: its `MODULES` list
 * reads `GROUP_MODULES.map(...)` and `GROUP_OVERLAYS`, the same objects this
 * file exports, rather than a separately maintained list.
 */
const MODULE_OVERLAYS = {
  groups: { si: () => import("./groups.si"), ta: () => import("./groups.ta") },
  indexContent: { si: () => import("./indexContent.si"), ta: () => import("./indexContent.ta") },
};

/**
 * One entry per group-of-services data file, in the exact order
 * `services.ts` concatenates them (`services.ts`'s own `services` array is
 * `GROUP_MODULES.flatMap((m) => m.base)`, unlabelled). A group not yet in
 * `GROUP_OVERLAYS` (every one but `emergency`, until parts 2 to 4 add
 * theirs) simply has no overlay: `localize(base, undefined)` returns the
 * base array unchanged, so the group renders in English until its part
 * lands. That is expected, not an error; see `content.i18n.test.ts`.
 */
export const GROUP_MODULES: { key: string; base: Service[]; exportName: string }[] = [
  { key: "emergency", base: emergencyServices, exportName: "emergencyServices" },
  { key: "surgical", base: surgicalServices, exportName: "surgicalServices" },
  { key: "diagnostics", base: diagnosticServices, exportName: "diagnosticServices" },
  { key: "clinics", base: clinicServices, exportName: "clinicServices" },
  { key: "womenChildren", base: womenChildrenServices, exportName: "womenChildrenServices" },
  { key: "atHome", base: atHomeServices, exportName: "atHomeServices" },
];

type OverlayLoader = { si: () => Promise<unknown>; ta: () => Promise<unknown> };

/**
 * Each overlay module exports its array under the SAME name the base file
 * does (`emergency.si.ts` exports `emergencyServices`, matching
 * `emergency.ts`), which is why `localizedServices` below reads
 * `mod[m.exportName]` rather than the module's default: the overlay module
 * object itself is `{ __review, emergencyServices }`, not the bare array.
 */
export const GROUP_OVERLAYS: Partial<Record<string, OverlayLoader>> = {
  emergency: { si: () => import("./emergency.si"), ta: () => import("./emergency.ta") },
  surgical: { si: () => import("./surgical.si"), ta: () => import("./surgical.ta") },
  diagnostics: { si: () => import("./diagnostics.si"), ta: () => import("./diagnostics.ta") },
  womenChildren: { si: () => import("./womenChildren.si"), ta: () => import("./womenChildren.ta") },
  atHome: { si: () => import("./atHome.si"), ta: () => import("./atHome.ta") },
  clinics: { si: () => import("./clinics.si"), ta: () => import("./clinics.ta") },
};

async function localizedServices(locale: Locale): Promise<Service[]> {
  if (locale === DEFAULT_LOCALE) return GROUP_MODULES.flatMap((m) => m.base);

  const parts = await Promise.all(
    GROUP_MODULES.map(async (m) => {
      const overlay = GROUP_OVERLAYS[m.key];
      if (!overlay) return m.base;
      const mod = (await overlay[locale]()) as Record<string, unknown>;
      return localize(m.base, mod[m.exportName]);
    })
  );
  return parts.flat();
}

export type ServicesContent = {
  groups: typeof groupsBase;
  indexContent: typeof indexContentBase;
  /** The 36-service catalog, localized, in `services.ts`'s canonical order. */
  services: Service[];
};

export async function getServicesContent(locale: Locale): Promise<ServicesContent> {
  if (locale === DEFAULT_LOCALE) {
    return {
      groups: groupsBase,
      indexContent: indexContentBase,
      services: GROUP_MODULES.flatMap((m) => m.base),
    };
  }

  const [groupsOverlay, indexContentOverlay, services] = await Promise.all([
    MODULE_OVERLAYS.groups[locale](),
    MODULE_OVERLAYS.indexContent[locale](),
    localizedServices(locale),
  ]);

  return {
    groups: localize(groupsBase, groupsOverlay),
    indexContent: localize(indexContentBase, indexContentOverlay),
    services,
  };
}

/** Finds one service in an already-localized catalog by its (never-translated) slug. */
export function findService(catalog: Service[], slug: string): Service | undefined {
  return catalog.find((s) => s.slug === slug);
}

/**
 * Three related services, localized. `relatedServicesBase` (from
 * `services.ts`) does the actual picking (same group first, then a flat-walk
 * fallback) against the English catalog: that algorithm only ever compares
 * `group`, `slug` and array order, none of which change between locales, so
 * its picks are reused here and simply mapped onto this locale's copy
 * rather than re-implemented.
 */
export function relatedInCatalog(catalog: Service[], slug: string): Service[] {
  const bySlug = new Map(catalog.map((s) => [s.slug, s]));
  return relatedServicesBase(slug)
    .map((s) => bySlug.get(s.slug))
    .filter((s): s is Service => Boolean(s));
}
