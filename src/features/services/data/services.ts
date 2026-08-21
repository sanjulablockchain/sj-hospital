import type { Service, ServiceGroup } from "../types";
import { GROUPS } from "./groups.ts";
import { emergencyServices } from "./emergency.ts";
import { surgicalServices } from "./surgical.ts";
import { diagnosticServices } from "./diagnostics.ts";
import { clinicServices } from "./clinics.ts";
import { womenChildrenServices } from "./womenChildren.ts";
import { atHomeServices } from "./atHome.ts";

export const services: Service[] = [
  ...emergencyServices,
  ...surgicalServices,
  ...diagnosticServices,
  ...clinicServices,
  ...womenChildrenServices,
  ...atHomeServices,
];

export const serviceSlugs: string[] = services.map((s) => s.slug);

const bySlug = new Map(services.map((s) => [s.slug, s]));

export function getService(slug: string): Service | undefined {
  return bySlug.get(slug);
}

export function servicesByGroup(group: ServiceGroup): Service[] {
  return services.filter((s) => s.group === group);
}

export function groupCounts(): Record<string, number> {
  const counts: Record<string, number> = { All: services.length };
  for (const g of GROUPS.slice(1)) {
    counts[g] = services.filter((s) => s.group === g).length;
  }
  return counts;
}

/**
 * Three sibling services: same group first (the reference walked the flat list,
 * which paired unrelated services), then the flat walk as a fallback so small
 * groups still fill three slots.
 */
export function relatedServices(slug: string, count = 3): Service[] {
  const current = getService(slug);
  if (!current) return [];
  const picked: Service[] = [];
  const seen = new Set([slug]);
  const take = (candidates: Service[]) => {
    for (const c of candidates) {
      if (picked.length >= count) return;
      if (seen.has(c.slug)) continue;
      seen.add(c.slug);
      picked.push(c);
    }
  };
  take(servicesByGroup(current.group));
  const start = services.indexOf(current);
  take(services.slice(start + 1).concat(services.slice(0, start)));
  return picked;
}
