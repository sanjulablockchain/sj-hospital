/** A jump card in the strip directly under the hero. */
export type JumpCard = {
  count: string;
  label: string;
  note: string;
  href: string;
};

/** One of the counter's jobs, in the `#counters` grid. */
export type Counter = {
  where: string;
  name: string;
  desc: string;
  hours: string;
};

/** A key/value row. Used by the `#standards` and `#delivery` fact lists. */
export type FactRow = {
  k: string;
  v: string;
};

/** A stocked category row in `#stock`. */
export type StockRow = {
  name: string;
  note: string;
  tag: string;
};

/** A numbered step in `#delivery`. */
export type Step = {
  no: string;
  title: string;
  desc: string;
};

/** A repeat-prescription row in `#refills`. */
export type Refill = {
  name: string;
  note: string;
};

/** A numbered card in the `#safety` grid. */
export type SafetyCard = {
  no: string;
  name: string;
  desc: string;
};

/** A question and answer in `#faq`. */
export type PharmacyFaq = {
  q: string;
  a: string;
};

/**
 * One of the three actions in `#book`'s contact rail. `internal` marks the
 * one row that is a route on this site rather than a phone number or a
 * WhatsApp link, so BookSection can send it through `LocaleLink` and keep a
 * reader in the language they are already reading; the other rows stay a
 * plain `<a>`. `value` is optional: only the phone row carries a fact
 * distinct from its own action phrase (the counter's own number). The
 * WhatsApp and "All services" rows have nothing else to show beyond their
 * label, so they leave it unset rather than repeating their `href` as a
 * second string with a second home. Matches `home-care`'s own `ContactRow`
 * shape and `contact`'s and `accommodation`'s `contactRows`/`bookRail`.
 */
export type BookAction = {
  label: string;
  value?: string;
  href: string;
  glyph: "phone" | "arrow";
  internal?: boolean;
};
