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

/**
 * One of the rows in the `#book` contact rail. `internal` marks the one row
 * that is a route on this site rather than a phone number or a mailbox, so
 * BookSection can send it through `LocaleLink` and keep a reader in the
 * language they are already reading; the other rows stay a plain `<a>`.
 *
 * `value` is optional, not required: only the phone row carries a fact
 * distinct from its own action phrase (the number itself). The WhatsApp,
 * email and e-channeling rows have nothing else to show beyond their label;
 * their destination already is the fact (a WhatsApp link, a mailbox, a
 * route), so they leave `value` unset rather than repeating their `href` as
 * a second string with a second home. Matches `contact`'s and
 * `accommodation`'s own `ContactRow`/`bookRail` shape.
 */
export type ContactRow = {
  label: string;
  value?: string;
  href: string;
  glyph: "phone" | "arrow";
  internal?: boolean;
};
