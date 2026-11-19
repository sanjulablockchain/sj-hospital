import { parsePageHash } from "./pageHash.ts";

/** How the reader lays the book out: one long strip, or one page at a time. */
export type ReaderMode = "scroll" | "pages";

/**
 * The mode a reader starts in when they have not chosen one.
 *
 * The pages are landscape. On a phone held upright one page at a time leaves
 * most of the screen empty, while a long strip fills the width and reads with
 * the thumb, the way webtoon apps work. Anything wider, or a phone turned
 * sideways, gets one big page at a time.
 */
export function defaultMode(width: number, height: number): ReaderMode {
  return width < 900 && height > width ? "scroll" : "pages";
}

/** A mode read back from storage, or null when it is missing or unknown. */
export function parseStoredMode(value: string | null): ReaderMode | null {
  return value === "scroll" || value === "pages" ? value : null;
}

/** A page read back from storage, or null unless it is a whole page of the book. */
export function parseStoredPage(value: string | null, count: number): number | null {
  if (value === null || !/^\d+$/.test(value)) return null;
  const page = Number(value);
  return page >= 1 && page <= count ? page : null;
}

/**
 * Where the reader opens. A `#page-N` link always wins, because a shared link
 * must land where it points. Otherwise the reader resumes at the remembered
 * page; `resumed` says so, which is what shows the "Start from page 1" button.
 */
export function initialPage(
  hash: string,
  stored: number | null,
  count: number
): { page: number; resumed: boolean } {
  if (hash.startsWith("#page-")) return { page: parsePageHash(hash, count), resumed: false };
  if (stored !== null && stored > 1) return { page: stored, resumed: true };
  return { page: 1, resumed: false };
}
