import { test } from "node:test";
import assert from "node:assert/strict";
import * as base from "./content.ts";
import * as si from "./content.si.ts";
import * as ta from "./content.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * What this feature refuses to translate.
 *
 * `href` is every anchor target; `count` is the "01" through "04" on the jump
 * cards; `no` is the "01" through "04" on the arranging-a-visit steps, the
 * same structural role `count` plays on the jump cards; `glyph` is which icon
 * a `#book` contact row shows, a name the code switches on rather than copy
 * (the same fix accommodation's `bookRail.icon` and contact's
 * `contactRows.icon` already made, so keying it off `label` cannot blank an
 * icon the way the pilot did). `PLACEHOLDER_NOTICE` is excluded entirely: it
 * is internal review documentation asserted verbatim by content.test.ts, and
 * no component on this page ever renders it to a reader.
 */
function isUntranslatable(path: string): boolean {
  return (
    path === "PLACEHOLDER_NOTICE" ||
    path.endsWith(".href") ||
    path.endsWith(".count") ||
    path.endsWith(".no") ||
    path.endsWith(".glyph")
  );
}

/**
 * Strings the translations deliberately leave in English.
 *
 * The register is code-mixed, the way a Sri Lankan hospital site actually
 * reads: a Sinhala or Tamil sentence carrying the English nouns and product
 * or brand-adjacent names people really say (Visit, Sample, Appointment,
 * Laboratory technician, Pharmacy, Counter, Prescription, Delivery,
 * Telemedicine, Consultation, Vehicle, Emergency, Record, WhatsApp, Email).
 * Listing exact strings by path rather than waving through any English
 * looking string keeps each one a decision somebody made, so a genuinely
 * forgotten translation still fails the suite.
 */
const KEEPS_ENGLISH = new Set([
  "contactRows[0].label", // "0117 84 84 84": the hospital's own phone number, not a sentence
]);

test("every translatable string in home-care has Sinhala", () => {
  const missing = assertTranslationParity(base, si, isUntranslatable);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every translatable string in home-care has Tamil", () => {
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
    assert.equal(overlay.visitRoles.length, base.visitRoles.length, `${name} visitRoles`);
    assert.equal(overlay.suitedCases.length, base.suitedCases.length, `${name} suitedCases`);
    assert.equal(overlay.samplingPoints.length, base.samplingPoints.length, `${name} samplingPoints`);
    assert.equal(overlay.samplingFacts.length, base.samplingFacts.length, `${name} samplingFacts`);
    assert.equal(overlay.handoffs.length, base.handoffs.length, `${name} handoffs`);
    assert.equal(overlay.steps.length, base.steps.length, `${name} steps`);
    assert.equal(overlay.prepPoints.length, base.prepPoints.length, `${name} prepPoints`);
    assert.equal(overlay.faq.length, base.faq.length, `${name} faq`);
    assert.equal(overlay.contactRows.length, base.contactRows.length, `${name} contactRows`);
    for (let i = 0; i < base.handoffs.length; i++) {
      assert.equal(
        overlay.handoffs[i].points.length,
        base.handoffs[i].points.length,
        `${name} handoffs[${i}].points`
      );
    }
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
