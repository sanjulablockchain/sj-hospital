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
