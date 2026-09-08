import { test } from "node:test";
import assert from "node:assert/strict";
import { pageMetadata as base } from "./pageMetadata.ts";
import { pageMetadata as si } from "./pageMetadata.si.ts";
import { pageMetadata as ta } from "./pageMetadata.ta.ts";
import { assertTranslationParity, stringPaths } from "../lib/i18n/stringPaths.ts";

/**
 * The parity gate for every route's `<title>` and `description`. Same shape
 * as `chromeCopy.i18n.test.ts`: `pageMetadata.ts` holds no facts and no
 * structural keys, every value is copy a reader (or a search engine) sees, so
 * there is nothing for an `isUntranslatable` predicate to exclude and this
 * file passes `() => false` where a feature test passes a real predicate.
 *
 * Unlike chromeCopy, `getPageMetadata` reads these THROUGH `localize` (see
 * getPageMetadata.ts), the same as a feature's own content getter, so a
 * missing key here would fall back to readable English rather than render
 * empty. The "carries exactly the base's keys" test below still holds both
 * overlays to the full shape regardless, the same way every feature overlay
 * is expected to be complete once translated.
 */

/**
 * Two titles are deliberately identical to their English source in both
 * locales; see pageMetadata.ts's header comment for why each is a decision,
 * not a miss.
 */
const KEEPS_ENGLISH = new Set([
  "home.title", // the motto, set as a brand mark; stays English everywhere it is a mark
  "pharmacy.title", // "Pharmacy", the same word navigationLabels keeps English
]);

test("every route's title and description has Sinhala", () => {
  const missing = assertTranslationParity(base, si, () => false);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every route's title and description has Tamil", () => {
  const missing = assertTranslationParity(base, ta, () => false);
  assert.deepEqual(missing, [], `Tamil is missing: ${missing.join(", ")}`);
});

// `getPageMetadata` merges through `localize`, which only ever replaces a
// base key: an overlay key the base does not have is a key `localize` drops
// silently, so a typo'd route name would translate nothing and fail nothing
// without this.
test("the overlays carry exactly the base's keys", () => {
  const expected = stringPaths(base).sort();
  for (const [name, overlay] of [
    ["si", si],
    ["ta", ta],
  ] as const) {
    assert.deepEqual(
      stringPaths(overlay).sort(),
      expected,
      `${name} pageMetadata does not have the same keys as the English.`
    );
  }
});

// A translation that is still the English string is not a translation,
// except the two recorded exceptions above. Comparison is normalised (case
// and surrounding whitespace) for the same reason every other overlay's
// identity check is: a translation that differs from English only by
// capitalisation reads as done when it never happened.
test("no translated title or description is left identical to its English source, ignoring case and whitespace", () => {
  const englishByPath = new Map<string, string>();
  collect(base, "", englishByPath);

  for (const [name, overlay] of [
    ["si", si],
    ["ta", ta],
  ] as const) {
    const translatedByPath = new Map<string, string>();
    collect(overlay, "", translatedByPath);

    for (const [path, translated] of translatedByPath) {
      if (KEEPS_ENGLISH.has(path)) continue;
      const english = englishByPath.get(path);
      const normalize = (s: string | undefined) => s?.trim().toLowerCase();
      assert.notEqual(
        normalize(translated),
        normalize(english),
        `${name} ${path} differs from the English only by case or whitespace, which is not a translation. If that is deliberate, add it to KEEPS_ENGLISH with a reason.`
      );
    }
  }
});

test("KEEPS_ENGLISH has no stale entries", () => {
  const basePaths = new Set(stringPaths(base));
  for (const path of KEEPS_ENGLISH) {
    assert.ok(basePaths.has(path), `KEEPS_ENGLISH has a stale path: ${path}`);
  }
});

/** Every string in a module, keyed by the same paths `stringPaths` reports. */
function collect(value: unknown, prefix: string, into: Map<string, string>) {
  for (const path of stringPaths(value, prefix)) {
    into.set(path, read(value, path));
  }
}

/** Follow a `stringPaths` path such as `home.title` back to its value. */
function read(root: unknown, path: string): string {
  let current: unknown = root;
  for (const step of path.split(/\.|\[|\]\.?/).filter(Boolean)) {
    current = (current as Record<string, unknown>)[step];
  }
  return current as string;
}
