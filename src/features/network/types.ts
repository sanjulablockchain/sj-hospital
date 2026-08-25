/** A shortcut card under the hero, anchoring one of this page's sections. */
export type JumpCard = { count: string; label: string; note: string; href: string };

/** One cell of the hero fact strip. */
export type FactRow = { k: string; v: string };

/** One group company. */
export type Org = {
  /** Logo filename and React key. */
  slug: string;
  /** `/images/network/logos/<slug>.png`. */
  logo: string;
  /** Short name set beside the logo. */
  wordmark: string;
  /** Small kicker above the name: "You are here", "Insurance", and so on. */
  badge: string;
  name: string;
  tagline: string;
  body: string;
  chips: string[];
  /** The line revealed on card hover. */
  cta: string;
  /** Absent for St. Joseph Hospital, which is this site. */
  href?: string;
  /** Draws the 3px accent inset along the card's top edge. */
  flagship?: boolean;
};

/** One of the three named groupings in the family section. */
export type OrgGroup = { name: string; note: string; orgs: Org[] };

/** One row of the numbers section. */
export type ReachRow = { n: string; k: string; who: string };

/** One row of the contact panel. */
export type ContactRow = { label: string; href: string; glyph: "phone" | "arrow" };
