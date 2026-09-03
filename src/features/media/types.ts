/** A jump card in the strip directly under the hero. */
export type JumpCard = {
  count: string;
  label: string;
  note: string;
  href: string;
};

/** A key/value pair. Used by the hero fact strip and the `#spokespeople` list. */
export type FactRow = {
  k: string;
  v: string;
};

/**
 * One newsroom item. `tag` doubles as the filter category, so it must be one of
 * `newsCategories`; `content.test.ts` asserts that.
 */
export type NewsItem = {
  tag: NewsCategory;
  date: string;
  title: string;
  lede: string;
};

/** The filter categories above the newsroom grid, minus the synthetic "All". */
export type NewsCategory =
  | "Press releases"
  | "Clinical"
  | "Community"
  | "Awards"
  | "Events"
  | "In the news";

/** The accent-filled lead item at the top of the newsroom. */
export type FeaturedRelease = {
  /**
   * Month and year only ("August 2026"), separate from the full `date`
   * below: the kicker line reads `{kickerDate} · {type}`, composed in
   * NewsroomSection rather than baked into one string, so `type` (a
   * translatable label) is not welded to a date fact that must stay in
   * English. See content.ts's own history: this used to be one baked
   * "August 2026 · Press release" string, which glued a fact to a
   * translatable word inside a single field.
   */
  kickerDate: string;
  title: string;
  lede: string;
  date: string;
  type: string;
  /** The "For journalists" list in the panel beside the featured release. */
  points: string[];
};

/** One of the press desk's jobs, in the `#press` grid. */
export type DeskCard = {
  kind: string;
  title: string;
  body: string;
};

/**
 * A row in the press kit table. Deliberately has no `href`: none of these files
 * exists in the repo, so the section lists what the kit contains and routes
 * every request through the press desk rather than offering a dead download.
 */
export type KitAsset = {
  name: string;
  note: string;
  format: string;
};

/** A cleared photograph in the `#gallery` grid. */
export type GalleryShot = {
  src: string;
  tag: string;
  title: string;
  alt: string;
  credit: string;
  /** `contain` for the logo mark, which must not be cropped; `cover` for photos. */
  fit: "cover" | "contain";
};

/** A question and answer in the `#usage` accordion. */
export type GroundRule = {
  q: string;
  a: string;
};
