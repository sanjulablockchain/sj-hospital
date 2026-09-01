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
test("no translated string is left identical to its English source", () => {
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
      assert.notEqual(
        translated,
        englishByPath.get(path),
        `${name} ${path} is still the English string. If that is deliberate, add it to KEEPS_ENGLISH with a reason.`
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
