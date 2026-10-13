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

/**
 * One of the four rows in the `#book` contact rail. `value` is optional: only
 * the phone row carries a fact distinct from its own action phrase (the
 * hospital's own number), the same role `contact`'s, `network`'s,
 * `accommodation`'s, `home-care`'s and `pharmacy`'s own `value` fields play.
 * `internal` marks the one row that is a route on this site rather than a
 * phone number, a mailbox or an external site, so BookSection can send it
 * through `LocaleLink` and keep a reader in the language they are already
 * reading.
 */
export type ContactRow = {
  label: string;
  value?: string;
  href: string;
  glyph: "phone" | "arrow";
  internal?: boolean;
};

/**
 * One school in the Wellness Center Program. `open` means the hospital has set
 * up the school's Wellness Center; `joining` means the school is on the way in
 * but not yet a signed partner. `done` lists the public milestones reached
 * there, and may be empty. `next`, when set, is the one milestone announced
 * as coming, shown apart from the finished ones.
 */
export type ProgrammeSchool = {
  name: string;
  status: "open" | "joining";
  done: string[];
  next?: string;
};
