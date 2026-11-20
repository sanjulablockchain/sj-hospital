export type ServiceGroup =
  | "Emergency"
  | "Surgical"
  | "Diagnostics"
  | "Clinics"
  | "Women & children"
  | "At home";

export type KeyValue = { k: string; v: string };
export type Step = { no: string; title: string; desc: string };
export type TeamMember = { role: string; note: string };
export type Faq = { q: string; a: string };

/**
 * One printed page of the 2026 Service Book's Services chapter, quoted on the
 * service page it covers (`BookExcerptSection`). `page` is the printed page
 * number, which is also the reader's `#page-N` (docs/service-book.md).
 */
export type ServiceBookExcerpt = {
  page: number;
  summary: string;
  facts: KeyValue[];
  why: string[];
};

export type Service = {
  /** URL segment under /services */
  slug: string;
  /** Detail page <h1> */
  title: string;
  /** Directory row label (may differ from title) */
  directoryTitle: string;
  group: ServiceGroup;
  hours: string;
  cta: string;
  /** Directory accordion body */
  desc: string;
  tags: string[];
  facts: KeyValue[];
  lede: string;
  aboutHead: string;
  body1: string;
  body2: string;
  /** Public path to this service's hero background image */
  heroImage: string;
  /** Descriptive alt text for heroImage; describes the image, not the service */
  heroAlt: string;
  /** Exactly 4 hero stats */
  strip: KeyValue[];
  covers: string[];
  conditions: string[];
  location: string;
  /** Exactly 4 journey steps */
  steps: Step[];
  prep: string[];
  team: TeamMember[];
  faq: Faq[];
  /** What the Service Book says about this service, where it covers it. */
  book?: ServiceBookExcerpt;
};
