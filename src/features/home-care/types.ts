/** A key/value pair in the strip that closes the hero, or in the sampling panel. */
export type HeroFact = { k: string; v: string };

/** One of the four in-page shortcuts under the hero. */
export type JumpCard = { count: string; label: string; note: string; href: string };

/**
 * One of the three roles the home visit lede names. `kicker` is the small line
 * above the title, which carries what that role brings to a visit rather than a
 * station number: the three are peers here, not a sequence.
 */
export type VisitRole = { kicker: string; title: string; body: string };

/** One case in `#who`, expanded from a condition on the home visits service. */
export type SuitedCase = { title: string; body: string };

/** One of the four numbered steps in `#how`. */
export type Step = { no: string; title: string; desc: string };

/**
 * A band that summarises something another page owns in full: `#medicine` for
 * /pharmacy#delivery, `#telemedicine` for /services/telemedicine.
 *
 * `href` is required and always outbound. The whole point of keeping these two
 * bands to a summary is that the reader leaves for the page holding the detail,
 * so a handoff without a destination is a dead end, and content.test.ts fails
 * rather than allowing one.
 */
export type Handoff = {
  eyebrow: string;
  heading: string;
  body: string;
  points: string[];
  linkLabel: string;
  href: string;
};

/** One of the rows in the `#book` contact rail. */
export type ContactRow = { label: string; href: string; glyph: "phone" | "arrow" };
