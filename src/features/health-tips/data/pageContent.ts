import type { FactTile, JumpCard } from "../types";
import { articles } from "./library.ts";
import { warnings } from "./warnings.ts";
import { firstAidSteps } from "./firstAid.ts";

/**
 * The strip under the hero. The reference's third tile read "Right now /
 * Monsoon: dengue season", which is only true for part of the year on a page
 * that is served every day; it is stated as a standing risk instead, and
 * `pageContent.test.ts` fails if a month or season creeps back in.
 */
export const factStrip: FactTile[] = [
  { label: "Written by", value: "Our own clinicians" },
  { label: "Reviewed", value: "By our clinical team" },
  { label: "Dengue", value: "A year round risk here", accent: true },
  { label: "Not a substitute", value: "For seeing a doctor" },
];

/** The marquee under the fact strip: five habits, scrolling on a loop. */
export const tickerLines = [
  "Empty standing water weekly",
  "Check your blood pressure yearly",
  "Finish the antibiotic course",
  "Drink water before you feel thirsty",
  "Fever in a baby is never routine",
];

/**
 * Counts are interpolated from the data they point at, so a new article or
 * warning row can never leave a stale number on the card.
 */
export const jumpCards: JumpCard[] = [
  {
    count: `${articles.length} articles`,
    label: "The library",
    note: "Sorted by the conditions we see most.",
    href: "#library",
  },
  {
    count: `${warnings.length} signs`,
    label: "When to come in",
    note: "Tonight, today, this week, or routinely.",
    href: "#warning",
  },
  {
    count: "By age",
    label: "Screening",
    note: "The checks our physicians actually order.",
    href: "#screening",
  },
  {
    count: `${firstAidSteps.length} basics`,
    label: "First aid at home",
    note: "What to do, and what never to do.",
    href: "#firstaid",
  },
];

export const disclaimer =
  "General information only, written for a Sri Lankan reader and reviewed by our clinical team. It cannot account for your history, medicines or examination findings, and it is not a diagnosis. Always speak to a doctor about your own situation.";
