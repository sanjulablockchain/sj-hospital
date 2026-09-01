/**
 * Every string in a value, named by where it sits. This is the same reflection
 * trick the content tests already use to catch a newly added export, applied to
 * translations: if a string exists in English it has a path, and if it has a
 * path both overlays owe a translation for it.
 *
 * Keys beginning `__` are skipped, which keeps the `__review` marker on each
 * overlay out of the comparison.
 *
 * A blank or whitespace-only string contributes no path: an overlay that has
 * not filled in a translation yet must not be counted as having one, so
 * `assertTranslationParity` can still report the gap.
 */
export function stringPaths(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") return prefix === "" || value.trim() === "" ? [] : [prefix];

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => stringPaths(item, `${prefix}[${index}]`));
  }

  if (value !== null && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .filter(([key]) => !key.startsWith("__"))
      .flatMap(([key, item]) => stringPaths(item, prefix === "" ? key : `${prefix}.${key}`));
  }

  return [];
}

/**
 * The translatable paths an overlay has not filled in, so a test can name them.
 * An empty array means the overlay is complete.
 *
 * `exclude` is how a feature declares what must never be translated: phone
 * numbers, email addresses, coordinates and every href.
 */
export function assertTranslationParity(
  base: object,
  overlay: object,
  exclude: (path: string) => boolean
): string[] {
  const translated = new Set(stringPaths(overlay));
  return stringPaths(base)
    .filter((path) => !exclude(path))
    .filter((path) => !translated.has(path));
}
