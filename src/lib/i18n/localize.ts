/**
 * A translation overlay: the same shape as the English content, with every
 * string optional and nothing else allowed. Facts, hrefs and counts are absent
 * from an overlay by design, because they have exactly one home in the English
 * file.
 */
export type Overlay<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Overlay<U>[]
    : T extends object
      ? { readonly [K in keyof T]?: Overlay<T[K]> }
      : never;

/**
 * Lay a translation over the English content.
 *
 * The English base owns the shape: the result always has the base's keys and
 * the base's array lengths, and the overlay can only replace strings. That is
 * what lets a half-written overlay ship safely, showing English wherever a
 * translation is missing rather than an empty node.
 */
export function localize<T>(base: T, overlay: unknown): T {
  if (typeof base === "string") {
    const translated = typeof overlay === "string" && overlay.trim() !== "";
    return (translated ? overlay : base) as T;
  }

  if (Array.isArray(base)) {
    const items = Array.isArray(overlay) ? overlay : [];
    return base.map((item, index) => localize(item, items[index])) as T;
  }

  if (base !== null && typeof base === "object") {
    const source =
      overlay !== null && typeof overlay === "object" && !Array.isArray(overlay)
        ? (overlay as Record<string, unknown>)
        : {};

    const merged: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(base as Record<string, unknown>)) {
      merged[key] = localize(value, source[key]);
    }
    return merged as T;
  }

  // Numbers, booleans, null and undefined are never translated.
  return base;
}
