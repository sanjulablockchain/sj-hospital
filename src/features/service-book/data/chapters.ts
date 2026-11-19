import type { Chapter } from "../types.ts";

/**
 * The book's chapters by page range, from the printed page numbers (the
 * contents page's own numbers predate the final layout). `pages.test.ts`
 * pins that they cover every page once, in order.
 */
export const chapters: readonly Chapter[] = [
  { id: "welcome", label: "Welcome", first: 1, last: 4 },
  { id: "about", label: "About", first: 5, last: 7 },
  { id: "services", label: "Services", first: 8, last: 17 },
  { id: "lab", label: "Lab fees", first: 18, last: 30 },
  { id: "doctors", label: "Doctors", first: 31, last: 37 },
  { id: "guide", label: "Patient guide", first: 38, last: 41 },
];

/** The chapter a page belongs to. Pages outside the book fall to the nearest end. */
export function chapterForPage(page: number): Chapter {
  return chapters.find((chapter) => page <= chapter.last) ?? chapters[chapters.length - 1];
}
