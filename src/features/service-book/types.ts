/** The six chapters of the Service Book, in the book's own order. */
export type ChapterId = "welcome" | "about" | "services" | "lab" | "doctors" | "guide";

/**
 * A chapter and the pages it spans, inclusive. Page numbers are the web
 * order, which matches the printed page numbers (see docs/service-book.md).
 * `label` is the chapter tab's text: chrome, so English in every locale.
 */
export type Chapter = {
  id: ChapterId;
  label: string;
  first: number;
  last: number;
};

/** One page of the book: its number and what is on it, for screen readers. */
export type BookPage = {
  number: number;
  alt: string;
};
