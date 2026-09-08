import { test } from "node:test";
import assert from "node:assert/strict";
import * as base from "./chromeCopy.ts";
import * as si from "./chromeCopy.si.ts";
import * as ta from "./chromeCopy.ta.ts";
import { assertTranslationParity, stringPaths } from "../../lib/i18n/stringPaths.ts";

/**
 * The chrome's own strings get the same gate every feature's copy gets.
 *
 * These twelve strings appear on every page in every locale: the header's
 * Book button, both mobile menu labels, back to top, the two floating rail
 * actions, both theme toggle labels, the site tagline and the language
 * switcher's own label and change-language aria-label. Until this file
 * existed they were the only overlays no test imported, so leaving `callUs`
 * and the whole English tagline in `chromeCopy.si.ts` was green, and deleting
 * a key outright was caught by `next build` alone.
 *
 * `chromeCopy.ts` holds no facts and no structural keys: every one of its
 * twelve values is copy a reader sees, so there is nothing for an `isUntranslatable`
 * predicate to exclude and no path for an overlay to restate. That is why this
 * file passes `() => false` where the feature tests pass a predicate, and why
 * it carries no "overlay must not supply a fact" test. The chrome's facts (the
 * phone number behind `callUs`, the WhatsApp link) live in `src/config`, not
 * here.
 *
 * Unlike a feature overlay, these are read synchronously by `chromeCopyFor`
 * rather than merged through `localize`, so a missing key would render as
 * `undefined` rather than falling back to English. Parity below is what stops
 * that, on both locales.
 */

/**
 * Strings the translations deliberately leave in English.
 *
 * `whatsapp` is the product name, in every script, the same decision the
 * contact feature's overlays and `navigationLabels.test.ts`'s own
 * KEEPS_ENGLISH already record. Note `whatsappUs` is NOT here: it is a
 * sentence built around the product name and both locales translate the verb.
 */
const KEEPS_ENGLISH = new Set(["chromeCopy.whatsapp"]);

test("every string in the chrome has Sinhala", () => {
  const missing = assertTranslationParity(base, si, () => false);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every string in the chrome has Tamil", () => {
  const missing = assertTranslationParity(base, ta, () => false);
  assert.deepEqual(missing, [], `Tamil is missing: ${missing.join(", ")}`);
});

// `chromeCopyFor` returns the overlay object itself rather than merging it, so
// an overlay with a key the base does not have is a key no component reads,
// and an overlay missing one renders an empty label. Both directions matter
// here in a way they do not for a `localize`-merged feature overlay.
test("the chrome overlays carry exactly the base's keys", () => {
  const expected = stringPaths(base).sort();
  for (const [name, overlay] of [
    ["si", si],
    ["ta", ta],
  ] as const) {
    assert.deepEqual(
      stringPaths(overlay).sort(),
      expected,
      `${name} chromeCopy does not have the same keys as the English. ` +
        `chromeCopyFor reads it synchronously, so a missing key renders as an ` +
        `empty label rather than falling back to English.`
    );
  }
});

// A translation that is still the English string is not a translation. The
// comparison normalises case and surrounding whitespace before comparing, so a
// value differing from English only by capitalisation or by stray padding
// still fails, the same rule all 15 feature tests apply.
test("no chrome string is left identical to its English source, ignoring case and whitespace", () => {
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

/** Follow a `stringPaths` path such as `chromeCopy.bookNow` back to its value. */
function read(root: unknown, path: string): string {
  let current: unknown = root;
  for (const step of path.split(/\.|\[|\]\.?/).filter(Boolean)) {
    current = (current as Record<string, unknown>)[step];
  }
  return current as string;
}
