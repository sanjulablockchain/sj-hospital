import { test } from "node:test";
import assert from "node:assert/strict";
import * as base from "./content.ts";
import * as si from "./content.si.ts";
import * as ta from "./content.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * What this feature refuses to translate.
 *
 * `jumpCards[].count` is the "01" through "04" on the jump cards, structural
 * rather than copy. `jumpCards[].href` and `partnerLogos` are anchors and
 * image paths, never prose. `sectionEyebrows`' leading numbers live inside the
 * same strings as their words ("01 / Who we are"), so unlike contact's
 * `contactRows[].icon` there is no separate structural key to exclude here;
 * the eyebrow strings are translated whole, number and words together, the
 * same way `jumpCards[].label` and `.note` already are.
 */
function isUntranslatable(path: string): boolean {
  return (
    path.endsWith(".href") ||
    path.endsWith(".count") ||
    path.startsWith("partnerLogos[")
  );
}

/**
 * Strings the translations deliberately leave in English.
 *
 * The register is code-mixed, the way a Sri Lankan hospital site actually
 * reads: a Sinhala or Tamil sentence carrying the English nouns people really
 * say. Listing them by path rather than waving through any English-looking
 * string keeps each one a decision somebody made, so a genuinely forgotten
 * translation still fails the suite.
 */
const KEEPS_ENGLISH = new Set([
  "heroFacts[3].k", // Reception
  "jumpCards[3].note", // "Kids & Teens Medical Group, USA." is the parent group's own name, not a sentence to translate
]);

test("every translatable string in about has Sinhala", () => {
  const missing = assertTranslationParity(base, si, isUntranslatable);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every translatable string in about has Tamil", () => {
  const missing = assertTranslationParity(base, ta, isUntranslatable);
  assert.deepEqual(missing, [], `Tamil is missing: ${missing.join(", ")}`);
});

// The overlays are merged into the base by index, so an overlay that grew or
// shrank an array would silently attach a translation to the wrong entry.
test("the overlays keep the base's array lengths", () => {
  for (const [name, overlay] of [
    ["si", si],
    ["ta", ta],
  ] as const) {
    assert.equal(overlay.tickerItems.length, base.tickerItems.length, `${name} tickerItems`);
    assert.equal(overlay.heroFacts.length, base.heroFacts.length, `${name} heroFacts`);
    assert.equal(overlay.jumpCards.length, base.jumpCards.length, `${name} jumpCards`);
    assert.equal(overlay.storyParagraphs.length, base.storyParagraphs.length, `${name} storyParagraphs`);
    assert.equal(overlay.reasons.length, base.reasons.length, `${name} reasons`);
    assert.equal(overlay.groupBody.length, base.groupBody.length, `${name} groupBody`);
  }
});

// A translation that is still the English sentence is not a translation. This
// catches a copy-paste that was never actually translated, which a parity
// check alone would happily pass.
//
// The comparison normalises case and surrounding whitespace before comparing,
// so a translation that differs from English only by capitalisation or by
// stray leading/trailing space still fails: JS string comparison is
// case-sensitive, and that gap let untranslated fields through elsewhere in
// this project despite this test already existing.
test("no translated string is left identical to its English source, ignoring case and whitespace", () => {
  const englishByPath = new Map<string, string>();
  collect(base, "", englishByPath);

  for (const [name, overlay] of [
    ["si", si],
    ["ta", ta],
  ] as const) {
    const translatedByPath = new Map<string, string>();
    collect(overlay, "", translatedByPath);

    for (const [path, translated] of translatedByPath) {
      if (isUntranslatable(path)) continue;
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

/** Every string in a module, keyed by the same paths `stringPaths` reports. */
function collect(value: unknown, prefix: string, into: Map<string, string>) {
  for (const path of stringPaths(value, prefix)) {
    into.set(path, read(value, path));
  }
}

/** Follow a `stringPaths` path such as `jumpCards[0].label` back to its value. */
function read(root: unknown, path: string): string {
  let current: unknown = root;
  for (const step of path.split(/\.|\[|\]\.?/).filter(Boolean)) {
    current = (current as Record<string, unknown>)[step];
  }
  return current as string;
}

// `isUntranslatable` names the paths that are facts and structural keys
// rather than copy, and until now it was only ever used to EXCUSE an overlay
// from filling them. Nothing stopped an overlay from SUPPLYING one, and
// `localize` merges by key, so an overlay carrying a `.value`, an `.href`, an
// `.id` or an `.icon` wins over the base and reaches the page: final review 3
// put `value: "+94 11 000 0000"` into a contact row and watched a Sinhala
// page print a phone number the English page does not have, with the suite
// green. Every comment in this file saying a fact has exactly one home is
// true because of this test.
test("no overlay supplies a value at an untranslatable path", () => {
  for (const [name, overlay] of [
    ["si", si],
    ["ta", ta],
  ] as const) {
    const supplied = stringPaths(overlay).filter(isUntranslatable);
    assert.deepEqual(
      supplied,
      [],
      `${name} overlay restates ${supplied.join(", ")}, which the base owns. A fact, an href, an anchor id or a structural key has exactly one home, in the English module, and a second copy in an overlay drifts out of step with it.`
    );
  }
});

test("KEEPS_ENGLISH has no stale or duplicate entries", () => {
  // A path that no longer exists in the base, or one that is already covered
  // by isUntranslatable, is a sign the exception was never pruned. Without
  // this, the list can name paths that do not exist, excusing nothing while
  // reading as though somebody decided something.
  const basePaths = new Set(stringPaths(base));
  for (const path of KEEPS_ENGLISH) {
    assert.ok(basePaths.has(path), `KEEPS_ENGLISH has a stale path: ${path}`);
    assert.ok(!isUntranslatable(path), `KEEPS_ENGLISH duplicates isUntranslatable: ${path}`);
  }
});
