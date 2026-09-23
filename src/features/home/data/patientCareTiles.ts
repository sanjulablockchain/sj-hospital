import { megaNavigation, type MegaNavLink } from "../../../config/megaNavigation.ts";

/**
 * The six tiles of the `#care` band are the Patient Care menu of the site
 * header, in its order, so the label, one-liner, destination and icon of each
 * have exactly one home. Read at render time from the config rather than
 * copied into a data file. Labels and descriptions are nav and stay English.
 */
export function patientCareTiles(): MegaNavLink[] {
  const menu = megaNavigation.find((s) => s.kind === "menu" && s.id === "patient-care");
  if (!menu || menu.kind !== "menu") return [];
  return menu.columns.flatMap((column) => column.links);
}
