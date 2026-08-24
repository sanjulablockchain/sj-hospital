import type { CATEGORIES, TIP_CATEGORIES } from "./data/library";
import type { WARNING_LEVELS } from "./data/warnings";

/** "All" plus the seven library categories. */
export type Category = (typeof CATEGORIES)[number];

/** A category an article can actually carry, so "All" is not assignable to `Article.tag`. */
export type TipCategory = (typeof TIP_CATEGORIES)[number];

export type Article = {
  tag: TipCategory;
  title: string;
  /** The team that wrote it. Never an individual doctor: bylines outlive staff. */
  by: string;
  lede: string;
};

export type FeaturedArticle = {
  tag: TipCategory;
  title: string;
  lede: string;
  by: string;
  read: string;
  points: string[];
};

/** How soon the reader should act. Doubles as the row's badge text. */
export type WarningLevel = (typeof WARNING_LEVELS)[number];

export type Warning = {
  level: WarningLevel;
  symptom: string;
  advice: string;
};

export type ScreeningCheck = {
  check: string;
  who: string;
  freq: string;
};

export type FirstAidStep = {
  kind: string;
  title: string;
  /** What to do. Named `action` rather than `do`, which reads badly as a property. */
  action: string;
  /** What never to do, written to follow the "Never:" label the card prints. */
  avoid: string;
};

export type EmergencyNumber = {
  label: string;
  number: string;
  /** Present only for lines we own, so the page never dials a service on someone's behalf. */
  tel?: string;
};

export type Myth = {
  q: string;
  a: string;
};

export type FactTile = {
  label: string;
  value: string;
  /** Accented tiles carry the one fact we most want read. */
  accent?: boolean;
};

export type JumpCard = {
  count: string;
  label: string;
  note: string;
  href: string;
};
