import { LAB_CATALOGUE_YEAR, labTests } from "./catalogue.ts";
import type { LabTest } from "./importRules.ts";

/**
 * The figures the home hero, the home teaser band and the price list hero
 * quote about the catalogue. Derived here, never typed: "{count} tests",
 * "from {fromPrice} LKR" and "{sameDayCount} reported in one day" all read
 * this object, so a re-import changes every one of them at once.
 */
export type LabCatalogueSummary = {
  count: number;
  /** The lowest non null price in LKR, or 0 when nothing is priced. */
  fromPrice: number;
  /** Tests whose report is back in one day. */
  sameDayCount: number;
  year: number;
};

export function summarise(tests: readonly LabTest[], year: number): LabCatalogueSummary {
  const prices = tests.flatMap((t) => (t.price === null ? [] : [t.price]));
  return {
    count: tests.length,
    fromPrice: prices.length ? Math.min(...prices) : 0,
    sameDayCount: tests.filter((t) => t.turnaroundDays === 1).length,
    year,
  };
}

export const labCatalogueSummary: LabCatalogueSummary = summarise(labTests, LAB_CATALOGUE_YEAR);
