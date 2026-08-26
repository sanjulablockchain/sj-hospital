/** A key/value pair in the strip that closes the hero. */
export type HeroFact = { k: string; v: string };

/** One of the four in-page shortcuts under the hero. */
export type JumpCard = { count: string; label: string; note: string; href: string };

/**
 * A tile in the `#programme` or `#teachers` grid. `kicker` is the small line
 * above the title (a station number, or a session length) and `more` is the
 * line that stays hidden until the tile is hovered.
 */
export type HoverTileItem = {
  kicker: string;
  title: string;
  body: string;
  more: string;
  /** Renders `kicker` as the reference's oversized numeral rather than a label. */
  numeral?: boolean;
};

/** One age band in `#grades`. */
export type GradeBand = { band: string; title: string; body: string };

/** One row of the `#referral` follow-up timeline. */
export type FollowUpStep = { when: string; what: string };

/** One of the four rows in the `#book` contact rail. */
export type ContactRow = { label: string; href: string; glyph: "phone" | "arrow" };
