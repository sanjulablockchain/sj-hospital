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
};
