import { test } from "node:test";
import assert from "node:assert/strict";
import * as base from "./content.ts";
import * as si from "./content.si.ts";
import * as ta from "./content.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * What this feature refuses to translate.
 *
 * `servicesEmail` and `whatsappHref` are the desk's own address and WhatsApp
 * link, each with exactly one home in `content.ts`. Every `href` is a URL, a
 * `tel:` or a `mailto:`. `enquiryContactRows[].value` is the fact a contact
 * row carries alongside its own link label, now English like every CTA
 * (only the phone row has one: the hospital's own number), the same role
 * `contact`'s, `network`'s, `accommodation`'s, `home-care`'s and
 * `pharmacy`'s own `value` fields play.
 * `glyph` is a structural name the component switches on to pick an icon, not
 * copy: keying JSX off translatable text is what blanked four icons on
 * `contact`'s own page the moment its labels were translated. `no` is the
 * "01" through "06" on each journey step, an ordinal rather than prose.
 */
function isUntranslatable(path: string): boolean {
  return (
    path === "servicesEmail" ||
    path === "whatsappHref" ||
    path.endsWith(".href") ||
    path.endsWith(".value") ||
    path.endsWith(".glyph") ||
    path.endsWith(".no")
  );
}

/**
 * Strings the translations deliberately leave in English.
 *
 * The register is code-mixed, the way a Sri Lankan hospital site actually
 * reads: a Sinhala or Tamil sentence carrying the English nouns and
 * clinical/business terms people really say (Email, WhatsApp, OPD, X-ray,
 * Insurance as the loanword "ඉන්ෂුවරන්ස්"/"காப்பீடு", CT, MRI). Listing them
 * by path rather than waving through any English-looking string keeps each
 * one a decision somebody made, so a genuinely forgotten translation still
 * fails the suite.
 *
 * "Bandaranaike International Airport" (and its short form "Bandaranaike
 * International") stays in English every time it appears, the same way
 * `contact`'s own "St. Joseph Street" does: it is the airport's own official
 * name, not a place a Sri Lankan reader would expect rewritten in Sinhala or
 * Tamil script. It is never listed path by path below, because it never
 * leaves a whole field identical to its English source (see the "identical
 * to English" test): every field that contains it also contains translated
 * prose around it. "Katunayake", the town the airport sits in, is not the
 * same word and is translated in `hero.headingPlace` below, the same way
 * "Negombo" and "Colombo" translate elsewhere on this page.
 *
 * `roomTiles[0..2].name` ("Super Deluxe Rooms", "Deluxe Rooms", "Standard
 * Rooms") are the hospital's own room class names, exactly as accommodation's
 * own `content.si.ts`/`content.ta.ts` keep them for the same three tiers.
 * `roomTiles[3].name` ("Wards") is not one of those names, so it translates
 * like any other word, to "වාට්ටු" / "வார்டுகள்", the same word
 * accommodation's own overlay and `navigationLabels` use for it: this page's
 * siblings agree with the feature that actually owns the distinction.
 */
const KEEPS_ENGLISH = new Set<string>([
  "roomTiles[0].name", // Super Deluxe Rooms, the hospital's own room class name
  "roomTiles[1].name", // Deluxe Rooms, the hospital's own room class name
  "roomTiles[2].name", // Standard Rooms, the hospital's own room class name
]);

test("every translatable string in international-care has Sinhala", () => {
  const missing = assertTranslationParity(base, si, isUntranslatable);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every translatable string in international-care has Tamil", () => {
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
    assert.equal(overlay.journeySteps.length, base.journeySteps.length, `${name} journeySteps`);
    assert.equal(overlay.deskServices.length, base.deskServices.length, `${name} deskServices`);
    assert.equal(overlay.treatments.length, base.treatments.length, `${name} treatments`);
    assert.equal(overlay.roomTiles.length, base.roomTiles.length, `${name} roomTiles`);
    assert.equal(overlay.roomStandard.length, base.roomStandard.length, `${name} roomStandard`);
    assert.equal(overlay.payChips.length, base.payChips.length, `${name} payChips`);
    assert.equal(overlay.insuranceNotes.length, base.insuranceNotes.length, `${name} insuranceNotes`);
    assert.equal(overlay.practical.length, base.practical.length, `${name} practical`);
    assert.equal(overlay.faq.length, base.faq.length, `${name} faq`);
    assert.equal(overlay.enquiryChips.length, base.enquiryChips.length, `${name} enquiryChips`);
    assert.equal(
      overlay.enquiryContactRows.length,
      base.enquiryContactRows.length,
      `${name} enquiryContactRows`,
    );
  }
});

// A translation that is still the English sentence is not a translation. This
// catches a copy-paste that was never actually translated, which a parity
// check alone would happily pass.
//
// The comparison normalises case and surrounding whitespace before comparing,
// so a translation that differs from English only by capitalisation (e.g.
// "Bank Transfer" vs the base's "Bank transfer") or by stray leading/trailing
// space still fails: JS string comparison is case-sensitive, and that gap let
// two untranslated fields (`jumpCards[1].note`, `payChips[3]`) through in
// both locales despite this test already existing.
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
