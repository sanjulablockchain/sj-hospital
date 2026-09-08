import { test } from "node:test";
import assert from "node:assert/strict";
import * as base from "./content.ts";
import * as si from "./content.si.ts";
import * as ta from "./content.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * What this feature refuses to translate.
 *
 * `PLACEHOLDER_NOTICE` is excluded entirely: it is internal review
 * documentation asserted verbatim by content.test.ts, and no component on
 * this page ever renders it to a reader.
 *
 * Every `href` is a URL, a `tel:` or a same-document fragment. `internal` is a
 * boolean, not copy, though it never reaches `stringPaths` in the first place.
 * `glyph` is a structural name the component switches on to pick an icon, not
 * copy: keying JSX off translatable text is what blanked four icons on
 * `contact`'s own page the moment its labels were translated.
 * `contactRows[].value` is the fact a row carries alongside its own link
 * label, now English like every CTA (only the phone row has one: the
 * hospital's own number), the same role `contact`'s, `network`'s,
 * `accommodation`'s, `home-care`'s and `pharmacy`'s own `value` fields play.
 *
 * `stations[*].kicker` is "01" through "09", the oversized numeral each
 * screening station renders instead of a label (`numeral: true` on
 * `HoverTileItem`); it is a structural ordinal, the same role `.no` plays on
 * other features. This does NOT cover `training[*].kicker`: that field holds
 * a real duration label ("Half a day", "Two hours", "One hour") on the same
 * type, so a blanket `.kicker` exclusion would silently let a genuine
 * translation go missing.
 */
function isUntranslatable(path: string): boolean {
  return (
    path === "PLACEHOLDER_NOTICE" ||
    path.endsWith(".href") ||
    path.endsWith(".value") ||
    path.endsWith(".glyph") ||
    path.endsWith(".internal") ||
    /^stations\[\d+\]\.kicker$/.test(path)
  );
}

/**
 * Strings the translations deliberately leave in English.
 *
 * The register is code-mixed, the way a Sri Lankan hospital site actually
 * reads: a Sinhala or Tamil sentence carrying the English nouns and
 * clinical/educational terms people really say (Email, WhatsApp, OPD,
 * X-ray). Listing them by path rather than waving through any English-looking
 * string keeps each one a decision somebody made, so a genuinely forgotten
 * translation still fails the suite.
 *
 * This page is about children and schools: ages, year groups and screening
 * intervals are facts, not prose, so they are never rounded, converted or
 * re-worded. Where a fact sits inside a field that is otherwise translatable
 * copy (`gradeBands[].band`, e.g. "Grade 1"), the surrounding word still
 * translates ("Grade" to "ශ්‍රේණිය"/"தரம்") and the digit stays exactly as
 * written, the same way a phone number's digits never change while the
 * sentence around them does; that is a translation, not an exception, so
 * nothing from `gradeBands[].band` is listed below.
 *
 * `training[*].title` (all four, including `training[1]`'s "Basic Life
 * Support") no longer needs an entry here: the register sweep moved every
 * card title to English regardless of register, so there is no longer a
 * code-mixing decision left to record for it.
 */
const KEEPS_ENGLISH = new Set<string>([]);

test("every translatable string in school-wellness has Sinhala", () => {
  const missing = assertTranslationParity(base, si, isUntranslatable);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every translatable string in school-wellness has Tamil", () => {
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
    assert.equal(overlay.jumpCards.length, base.jumpCards.length, `${name} jumpCards`);
    assert.equal(overlay.heroFacts.length, base.heroFacts.length, `${name} heroFacts`);
    assert.equal(overlay.findings.length, base.findings.length, `${name} findings`);
    assert.equal(overlay.stations.length, base.stations.length, `${name} stations`);
    assert.equal(overlay.gradeBands.length, base.gradeBands.length, `${name} gradeBands`);
    assert.equal(overlay.training.length, base.training.length, `${name} training`);
    assert.equal(overlay.breedingSites.length, base.breedingSites.length, `${name} breedingSites`);
    assert.equal(overlay.followUp.length, base.followUp.length, `${name} followUp`);
    assert.equal(overlay.faq.length, base.faq.length, `${name} faq`);
    assert.equal(overlay.bookingChecklist.length, base.bookingChecklist.length, `${name} bookingChecklist`);
    assert.equal(overlay.contactRows.length, base.contactRows.length, `${name} contactRows`);
  }
});

// A translation that is still the English sentence is not a translation. This
// catches a copy-paste that was never actually translated, which a parity
// check alone would happily pass.
//
// The comparison normalises case and surrounding whitespace before comparing,
// so a translation that differs from English only by capitalisation or by
// stray leading/trailing space still fails: JS string comparison is
// case-sensitive, and that gap is how `international-care` shipped
// "Bank Transfer" as a translation of "Bank transfer" past a green suite.
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

test("KEEPS_ENGLISH has no stale or duplicate entries", () => {
  // A path that no longer exists in the base, or one that is already covered
  // by isUntranslatable, is a sign the exception was never pruned.
  const basePaths = new Set(stringPaths(base));
  for (const path of KEEPS_ENGLISH) {
    assert.ok(basePaths.has(path), `KEEPS_ENGLISH has a stale path: ${path}`);
    assert.ok(!isUntranslatable(path), `KEEPS_ENGLISH duplicates isUntranslatable: ${path}`);
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
