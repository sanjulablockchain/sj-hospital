/**
 * Structural keys the home page's data files use to pick an icon or a colour.
 * Kept in a `.ts` file, not beside the components, because the data files are
 * loaded by `node --test`, which cannot import `.tsx`. `HomeIcon.tsx` imports
 * the key type from here and owns the path data.
 */
export type HomeIconKey =
  | "steth"
  | "phone"
  | "ambulance"
  | "nurse"
  | "pin"
  | "clock"
  | "grid"
  | "building"
  | "spark"
  | "plane"
  | "pill"
  | "home"
  | "globe"
  | "school"
  | "bed"
  | "shield"
  | "drop"
  | "report"
  | "flask"
  | "left"
  | "right"
  | "arrow"
  | "chat";

/** The tinted icon well on a "who we are" stat card. */
export type StatTone = "red" | "brand" | "sky" | "green" | "orange";
