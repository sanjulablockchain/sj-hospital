import { staysEnglish } from "./registerPolicy.ts";

/**
 * Every string in a value, named by where it sits. This is the same reflection
 * trick the content tests already use to catch a newly added export, applied to
 * translations: if a string exists in English it has a path, and if it has a
 * path both overlays owe a translation for it.
 *
 * Keys beginning `__` are skipped, which keeps the `__review` marker on each
 * overlay out of the comparison.
 */
export function stringPaths(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") return prefix === "" ? [] : [prefix];

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
 * The paths an overlay has actually filled in. Same walk as `stringPaths`, with
 * one difference: a blank or whitespace-only string does not count as a
 * translation, so it never lands in the set of things already done.
 */
function filledPaths(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") {
    return prefix === "" || value.trim() === "" ? [] : [prefix];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => filledPaths(item, `${prefix}[${index}]`));
  }

  if (value !== null && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .filter(([key]) => !key.startsWith("__"))
      .flatMap(([key, item]) => filledPaths(item, prefix === "" ? key : `${prefix}.${key}`));
  }

  return [];
}

/**
 * The translatable paths an overlay has not filled in, so a test can name them.
 * An empty array means the overlay is complete.
 *
 * `exclude` is how a feature declares what must never be translated: phone
 * numbers, email addresses, coordinates and every href. A blank or
 * whitespace-only overlay string counts as missing, not as present.
 *
 * Two different reasons a path can be absent, and they are deliberately not
 * one predicate:
 *
 * - `exclude` is the feature's own `isUntranslatable`: this is not copy at
 *   all. A fact, an href, an icon name, a structural key the code switches on.
 *   It is a property of the data shape and each feature knows its own.
 * - `staysEnglish` is the register policy in `registerPolicy.ts`: this IS
 *   copy, and the owner has decided it renders in English on every page
 *   anyway. It is editorial, sitewide, and path-based.
 *
 * Both are subtracted here, so what remains is exactly the set of strings a
 * translator owes. `overlayRegister.test.ts` enforces the other half of the
 * policy, that a path `staysEnglish` accepts is not in the overlay at all;
 * this function is why the two halves cannot overlap or leave a gap.
 */
export function assertTranslationParity(
  base: object,
  overlay: object,
  exclude: (path: string) => boolean
): string[] {
  const translated = new Set(filledPaths(overlay));
  return stringPaths(base)
    .filter((path) => !exclude(path))
    .filter((path) => !staysEnglish(path))
    .filter((path) => !translated.has(path));
}
