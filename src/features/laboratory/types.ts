/** One cell of the hero fact strip. */
export type FactRow = { k: string; v: string };

/**
 * One of the actions closing `#book`. Same shape as pharmacy's `BookAction`
 * and network's `ContactRow`: `internal` marks a route on this site so the
 * section sends it through `LocaleLink`; `value` is the fact (the phone
 * number) shown beside the action phrase.
 */
export type BookAction = {
  label: string;
  value?: string;
  href: string;
  glyph: "phone" | "arrow";
  internal?: boolean;
};

/** A catalogue code paired with the short name the home teaser and the hero ticker show. */
export type FeaturedTest = { code: string; label: string };
