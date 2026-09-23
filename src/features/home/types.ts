/**
 * Structural keys the home page's data files use to pick an icon or a colour.
 * Kept in a `.ts` file, not beside the components, because the data files are
 * loaded by `node --test`, which cannot import `.tsx`. `HomeIcon.tsx` imports
 * the key type from here and owns the path data.
 */
export const HOME_ICON_KEYS = [
  "steth",
  "phone",
  "ambulance",
  "nurse",
  "pin",
  "clock",
  "grid",
  "building",
  "spark",
  "plane",
  "pill",
  "home",
  "globe",
  "school",
  "bed",
  "shield",
  "drop",
  "report",
  "flask",
  "left",
  "right",
  "arrow",
  "chat",
] as const;

export type HomeIconKey = (typeof HOME_ICON_KEYS)[number];

/**
 * Whether a string names an icon the home page can draw. The patient care
 * tiles take their icon keys from the site header's menu, whose vocabulary is
 * wider than this one, so the band checks each key before rendering it rather
 * than casting.
 */
export function isHomeIconKey(value: string | undefined): value is HomeIconKey {
  return value !== undefined && (HOME_ICON_KEYS as readonly string[]).includes(value);
}

/** The tinted icon well on a "who we are" stat card. */
export type StatTone = "red" | "brand" | "sky" | "green" | "orange";
