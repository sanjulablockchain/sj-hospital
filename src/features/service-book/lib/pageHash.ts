const PAGE_HASH = /^#?page-(\d+)$/;

/**
 * The page a `#page-N` hash asks for, clamped to the book.
 *
 * A shared link must never open a blank viewer, so anything malformed, empty
 * or below 1 opens the first page, and a number past the end opens the last.
 */
export function parsePageHash(hash: string, count: number): number {
  const match = PAGE_HASH.exec(hash);
  if (!match) return 1;
  const page = Number(match[1]);
  if (page < 1) return 1;
  return Math.min(page, count);
}

/** The hash for a page, e.g. `#page-21`. */
export function formatPageHash(page: number): string {
  return `#page-${page}`;
}
