import { test } from "node:test";
import assert from "node:assert/strict";
import * as base from "./content.ts";
import * as si from "./content.si.ts";
import * as ta from "./content.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * What this feature refuses to translate.
 *
 * The hospital's own facts have exactly one home, in `content.ts`, and an
 * overlay must never carry a second copy of a phone number that could drift
 * out of step with it. `contactRows[].value` holds the street address, the two
 * numbers and the email; `count` is the "01" through "04" on the jump cards;
 * every `href` is a URL, a `tel:` or a `mailto:`; and DIRECTIONS_URL is a
 * Google Maps link built from the coordinate.
 *
 * HOSPITAL_COORDS needs no entry here: it is a pair of numbers, and
 * `stringPaths` only ever reports strings.
 */
function isUntranslatable(path: string): boolean {
  return (
    path === "DIRECTIONS_URL" ||
    path.endsWith(".href") ||
    path.endsWith(".value") ||
    path.endsWith(".count") ||
    // Which glyph a contact row shows. A name the code switches on, not copy,
    // and deliberately not the label: keying the icon off translatable text is
    // what left four blank squares on every Sinhala and Tamil page.
    path.endsWith(".icon")
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
  "heroFacts[0].k", // Reception
  "heroFacts[2].v", // WhatsApp, a product name in every script
  "contactRows[2].label", // WhatsApp / Mobile
  "contactRows[3].label", // Email
]);

test("every translatable string in contact has Sinhala", () => {
  const missing = assertTranslationParity(base, si, isUntranslatable);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every translatable string in contact has Tamil", () => {
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
    assert.equal(overlay.contactRows.length, base.contactRows.length, `${name} contactRows`);
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
