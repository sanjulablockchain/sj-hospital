import type { LabTest } from "../data/importRules.ts";

/** The four positions of the turnaround control on the price list. */
export type TurnaroundBand = "all" | "1" | "2-4" | "7+";

function inBand(days: number, band: TurnaroundBand): boolean {
  switch (band) {
    case "all":
      return true;
    case "1":
      return days === 1;
    case "2-4":
      return days >= 2 && days <= 4;
    case "7+":
      return days >= 7;
  }
}

/**
 * Plain, case insensitive substring match on the name and the code, so a
 * query with brackets or other regex characters is just text. The query is
 * trimmed, and an empty one matches everything.
 */
export function filterTests(tests: readonly LabTest[], query: string, band: TurnaroundBand): LabTest[] {
  const q = query.trim().toLowerCase();
  return tests.filter(
    (t) => inBand(t.turnaroundDays, band) && (q === "" || t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q))
  );
}
