import type { ServiceGroup } from "../types";

/**
 * Structural and never translated: `Service.group` is compared against these
 * exact strings throughout the feature (the directory filter, `groupCounts`,
 * `servicesByGroup`, `relatedServices`), and `serviceSlugs` in `services.ts`
 * carries the same never-translate rule for the same reason (a URL, here a
 * comparison key). `groupLabels` below carries the word a reader actually
 * sees for each one.
 */
export const SERVICE_GROUPS = [
  "Emergency",
  "Surgical",
  "Diagnostics",
  "Clinics",
  "Women & children",
  "At home",
] as const satisfies readonly ServiceGroup[];

export const GROUPS = ["All", ...SERVICE_GROUPS] as const;

/**
 * The translated word for each entry in `GROUPS`, keyed by the same
 * structural English string. English is the identity mapping here (key and
 * value are the same word), the same shape `career`'s own `departmentLabels`
 * uses: `content.si.ts` / `content.ta.ts` replace the values, never the keys,
 * which is what keeps `filter === group` and `counts[group]` working in
 * every locale.
 */
export const groupLabels: Record<(typeof GROUPS)[number], string> = {
  All: "All",
  Emergency: "Emergency",
  Surgical: "Surgical",
  Diagnostics: "Diagnostics",
  Clinics: "Clinics",
  "Women & children": "Women & children",
  "At home": "At home",
};
