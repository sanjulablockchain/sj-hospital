/** A jump card in the strip directly under the hero. */
export type JumpCard = {
  count: string;
  label: string;
  note: string;
  href: string;
};

/** A key/value pair. Used by the hero fact strip and the `#stay` list. */
export type FactRow = {
  k: string;
  v: string;
};

/** A numbered step in the `#journey` grid. The `when` line is the one that
 *  fades up on hover, so it carries the stage rather than a promised date. */
export type JourneyStep = {
  no: string;
  title: string;
  desc: string;
  when: string;
};

/** One of the desk's jobs, in the `#services` grid. */
export type DeskService = {
  kind: string;
  title: string;
  desc: string;
};

/** A treatment row in `#estimates`. `stay` is the repo's own wording about
 *  length of stay, never a figure the hospital has not published. */
export type TreatmentRow = {
  name: string;
  note: string;
  stay: string;
};

/** A room category tile in `#rooms`. */
export type RoomTile = {
  tier: string;
  name: string;
  desc: string;
  extra: string;
};

/** A question and answer in `#faq`. */
export type InternationalFaq = {
  q: string;
  a: string;
};

/** One of the direct-contact rows in `#enquiry`. `value` carries a fact (the
 *  hospital's own phone number) that sits beside its own translatable
 *  `label`, rather than the label holding the digits on their own with no
 *  action phrase to translate. `glyph` is a structural name the component
 *  switches on to choose the icon, never copy: see `network`'s own
 *  `ContactRow` for the same fix to the same trap. */
export type EnquiryContactRow = {
  label: string;
  value?: string;
  href: string;
  glyph: "phone" | "arrow";
};
