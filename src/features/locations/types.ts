/** A key/value pair in the strip that closes the hero. */
export type HeroFact = { k: string; v: string };

/** One fact row on a hospital card: a caption and the fact beside it. */
export type HospitalFact = { label: string; value: string };

/**
 * One button under a hospital card. `external` sends the reader off site in
 * a new tab (directions), `internal` is a route on this site that goes
 * through `LocaleLink` so a Sinhala reader stays on /si. Neither set is a
 * `tel:` link, which opens in place.
 */
export type HospitalAction = {
  label: string;
  href: string;
  external?: boolean;
  internal?: boolean;
};

/**
 * One hospital in the group.
 *
 * `id` is the card's element id and the anchor the header's Locations menu
 * deep links to (`/locations#negombo`). `status` is what the card renders:
 * `open` shows the photograph, address, facts and actions; `pending` shows
 * the name, the city and `body`, which says the details are still to come,
 * with whatever actions make sense meanwhile. A hospital without a confirmed
 * address or phone number must stay `pending` rather than carry a guess.
 */
export type Hospital = {
  id: string;
  name: string;
  city: string;
  region: string;
  status: "open" | "pending";
  statusLabel: string;
  body: string;
  photo?: string;
  photoAlt?: string;
  address?: { street: string; locality: string };
  facts: HospitalFact[];
  actions: HospitalAction[];
};

/**
 * One of the rows in the `#help` contact rail. `value` is the fact a row
 * carries beside its own action phrase (a phone number); `internal` marks a
 * route on this site, sent through `LocaleLink`.
 */
export type ContactRow = {
  label: string;
  value?: string;
  href: string;
  glyph: "phone" | "arrow";
  internal?: boolean;
};
