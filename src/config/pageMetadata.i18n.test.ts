import { test } from "node:test";
import assert from "node:assert/strict";
import { pageMetadata as base } from "./pageMetadata.ts";
import { pageMetadata as si } from "./pageMetadata.si.ts";
import { pageMetadata as ta } from "./pageMetadata.ta.ts";
import { assertTranslationParity, stringPaths } from "../lib/i18n/stringPaths.ts";
import { staysEnglish } from "../lib/i18n/registerPolicy.ts";

/**
 * The parity gate for every route's `<title>` and `description`. Same shape
 * as `chromeCopy.i18n.test.ts`: `pageMetadata.ts` holds no facts and no
 * structural keys, every value is copy a reader (or a search engine) sees, so
 * there is nothing for an `isUntranslatable` predicate to exclude and this
 * file passes `() => false` where a feature test passes a real predicate.
 *
 * `getPageMetadata` reads these THROUGH `localize` (see getPageMetadata.ts),
 * the same as a feature's own content getter, so a missing key falls back to
 * readable English rather than rendering empty. Every route's `title` is
 * exactly that kind of missing key: the register policy (`registerPolicy.ts`)
 * says a route's `<title>` is English per the owner's ruling on 2026-09-09,
 * so `assertTranslationParity` below no longer expects Sinhala or Tamil for
 * it (it subtracts `staysEnglish` paths), and the old KEEPS_ENGLISH entries
 * for `home.title` / `pharmacy.title` are gone with the paths they excused.
 */

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
test("the overlays contain only keys the English module has", () => {
  const basePaths = new Set(stringPaths(base));
  for (const [name, overlay] of [
    ["si", si],
    ["ta", ta],
  ] as const) {
    for (const path of stringPaths(overlay)) {
      assert.ok(basePaths.has(path), `${name} pageMetadata has an unknown key: ${path}`);
    }
  }
});

// The other direction: a `title` is register-policy English and must be
// ABSENT from the overlay, not merely unused. `overlayRegister.test.ts`
// enforces this walker-wide for every overlay once `config` leaves
// `PENDING_REGISTER_SWEEP`; this is the same check, scoped to page metadata.
test("no overlay carries a title, which the register policy calls English", () => {
  for (const [name, overlay] of [
    ["si", si],
    ["ta", ta],
  ] as const) {
    const english = stringPaths(overlay).filter((path) => staysEnglish(`pageMetadata.${path}`));
    assert.deepEqual(english, [], `${name} pageMetadata still carries English-only keys: ${english.join(", ")}`);
  }
});

// A translation that is still the English string is not a translation.
// Comparison is normalised (case and surrounding whitespace) for the same
// reason every other overlay's identity check is: a translation that differs
// from English only by capitalisation reads as done when it never happened.
//
// The two identical-to-English titles this used to except (`home.title`, the
// motto set as a brand mark, and `pharmacy.title`, "Pharmacy") no longer need
// an exception: both titles are gone from the overlay entirely now that
// `title` is register-policy English, so there is nothing left here for
// either path to match against.
test("no translated description is left identical to its English source, ignoring case and whitespace", () => {
  const englishByPath = new Map<string, string>();
  collect(base, "", englishByPath);

  for (const [name, overlay] of [
    ["si", si],
    ["ta", ta],
  ] as const) {
    const translatedByPath = new Map<string, string>();
    collect(overlay, "", translatedByPath);

    for (const [path, translated] of translatedByPath) {
      const english = englishByPath.get(path);
      const normalize = (s: string | undefined) => s?.trim().toLowerCase();
      assert.notEqual(
        normalize(translated),
        normalize(english),
        `${name} ${path} differs from the English only by case or whitespace, which is not a translation.`
      );
    }
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
