import { test } from "node:test";
import assert from "node:assert/strict";
import * as base from "./content.ts";
import * as si from "./content.si.ts";
import * as ta from "./content.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * What this feature refuses to translate.
 *
 * Every `href` is a URL, a `tel:` or a same-document fragment. `value` is the
 * fact a `ContactRow` carries alongside its own translatable `label` (only
 * the phone rows have one, the hospital's own number), the same role
 * `contact`'s, `network`'s, `accommodation`'s, `home-care`'s, `pharmacy`'s
 * and `school-wellness`'s own `value` fields play. `glyph` is a structural
 * name the component switches on to pick an icon or a tabular-nums class, not
 * copy: keying JSX off translatable text is what blanked four icons on
 * `contact`'s own page the moment its labels were translated. `internal` is a
 * boolean, not copy, though it never reaches `stringPaths` in the first
 * place.
 *
 * `.no` is the bare "01" through "08" ordinal each zone, showcase card and
 * support row renders as an oversized numeral instead of a label, the same
 * role `stations[*].kicker` plays in `school-wellness`. `.photo` is an image
 * path and `.photoAlt` is its alt text, which stays in English on every page
 * this plan has shipped so far, the same as `accommodation`'s, `about`'s and
 * `contact`'s own hero and room photos. `.prefix` ("1:") and `.suffix` ("h")
 * are the ratio and unit notation `<AnimatedCounter>` glues to
 * `theatreFigures`' own numeral, not prose: the same structural role `.no`
 * plays elsewhere.
 *
 * `.price` is excluded entirely, the same as `accommodation`'s own room
 * table: "On request" and "From 10,000 LKR" are facts, not sentences.
 * `heroFacts[3].v` is excluded by its own exact path rather than a generic
 * ".v" rule (which would also exempt "Six, purpose built" and "Open 24
 * hours" from ever being translated): it is "10,000 LKR", restating the
 * standard room's own price, the same role `accommodation`'s own
 * `heroFacts[1].v` plays.
 */
function isUntranslatable(path: string): boolean {
  return (
    path.endsWith(".href") ||
    path.endsWith(".value") ||
    path.endsWith(".glyph") ||
    path.endsWith(".no") ||
    path.endsWith(".prefix") ||
    path.endsWith(".suffix") ||
    path.endsWith(".photo") ||
    path.endsWith(".photoAlt") ||
    path.endsWith(".price") ||
    path === "heroFacts[3].v"
  );
}

/**
 * Strings the translations deliberately leave in English.
 *
 * The register is code-mixed, the way a Sri Lankan hospital site actually
 * reads: a Sinhala or Tamil sentence carrying the English nouns and clinical
 * terms people really say (Email, WhatsApp, Consultant, Anaesthesia,
 * Protocol, Digital, X-ray). Listing them by path rather than waving through
 * any English-looking string keeps each one a decision somebody made, so a
 * genuinely forgotten translation still fails the suite.
 *
 * `hero.headingAccent` ("US") is the abbreviation for the surgical and
 * cleaning standard this building is built to. It stands alone with nothing
 * else in its own field, unlike `theatreSpecs[0].v` ("US standard") and
 * `hygieneRows[1].v` ("US specification"), both of which translate the word
 * beside it and so are not listed here; `network`'s own content.si.ts and
 * content.ta.ts keep the same abbreviation in "US Standard care" rather than
 * spelling the country name out.
 *
 * `equipment[*].name` (all eight) are every equipment and procedure name on
 * this page: Digital X-ray, Ultrasound, Haematology & biochemistry,
 * Microbiology & cultures, Histopathology, ECG & echocardiography,
 * Endoscopy, CT & MRI. This is the feature's own instruction, not a sweep: it
 * is how these are said in Sinhala and Tamil too, the same way `about`'s and
 * `international-care`'s own overlays keep "Digital X-ray", "Ultrasound",
 * "Biochemistry", "Gastroscopy", "Colonoscopy" and "Biopsy" in English
 * throughout. Applying the sibling test to this array specifically: every
 * one of the eight names gets the same treatment, so there is no odd one out
 * translated beside seven that are not; the whole category is kept English,
 * uniformly, which is the answer to the test rather than an exception from
 * it. `equipment[*].note` and `equipment[*].avail` are ordinary prose and are
 * translated in full.
 *
 * `careUnits[*].code` (all three: ICU, PACU, NEO) are the international
 * clinical unit abbreviations these units are known by, the same register
 * that keeps "OPD" and "X-ray" in English. All three siblings get the same
 * treatment, so again there is no odd one out.
 *
 * `roomRows[*].name` for the three named room classes (Super Deluxe Rooms,
 * Deluxe Rooms, Standard Rooms) are the hospital's own room class names,
 * exactly the same exception `accommodation`'s own `roomTypes[*].name` and
 * `roomTypes[*].shortName` make for the same three names. `roomRows[3].name`
 * ("Wards") is NOT one of those names, so it translates like any other word,
 * the same distinction `accommodation`'s own content.si.ts and content.ta.ts
 * draw.
 *
 * `support[2].name` ("Digital X-ray") restates the same equipment name
 * `equipment[0].name` does, for the same reason. `support[4].name`
 * ("Pharmacy") is the hospital's own department name: `navigationLabels.si.ts`
 * and `navigationLabels.ta.ts` already record "Pharmacy" in their own
 * KEEPS_ENGLISH because that is how a Sri Lankan reader actually sees the
 * word, in English, on an otherwise Sinhala or Tamil page, and this page's
 * own header and footer link to `/pharmacy` under that same unstranslated
 * name. Applying the sibling test to `support` as a whole: six of its eight
 * names translate in full (Accident & emergency, Laboratory, Outpatient
 * department, Ambulance dispatch, Sterile services, On call surgical
 * cover); the two that do not each carry their own independent,
 * already-established reason rather than sharing one weak excuse, which is
 * what the test is checking for.
 */
const KEEPS_ENGLISH = new Set<string>([
  "hero.headingAccent",
  "equipment[0].name",
  "equipment[1].name",
  "equipment[2].name",
  "equipment[3].name",
  "equipment[4].name",
  "equipment[5].name",
  "equipment[6].name",
  "equipment[7].name",
  "careUnits[0].code",
  "careUnits[1].code",
  "careUnits[2].code",
  "roomRows[0].name",
  "roomRows[1].name",
  "roomRows[2].name",
  "support[2].name",
  "support[4].name",
]);

test("every translatable string in facilities has Sinhala", () => {
  const missing = assertTranslationParity(base, si, isUntranslatable);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every translatable string in facilities has Tamil", () => {
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
    assert.equal(overlay.heroFacts.length, base.heroFacts.length, `${name} heroFacts`);
    assert.equal(overlay.tickerItems.length, base.tickerItems.length, `${name} tickerItems`);
    assert.equal(overlay.jumpCards.length, base.jumpCards.length, `${name} jumpCards`);
    assert.equal(overlay.buildingZones.length, base.buildingZones.length, `${name} buildingZones`);
    assert.equal(overlay.showcaseCards.length, base.showcaseCards.length, `${name} showcaseCards`);
    assert.equal(overlay.theatreFigures.length, base.theatreFigures.length, `${name} theatreFigures`);
    assert.equal(overlay.theatreSpecs.length, base.theatreSpecs.length, `${name} theatreSpecs`);
    assert.equal(overlay.careUnits.length, base.careUnits.length, `${name} careUnits`);
    assert.equal(overlay.careNotes.length, base.careNotes.length, `${name} careNotes`);
    assert.equal(overlay.roomRows.length, base.roomRows.length, `${name} roomRows`);
    assert.equal(overlay.roomStandard.length, base.roomStandard.length, `${name} roomStandard`);
    assert.equal(overlay.roomExtras.length, base.roomExtras.length, `${name} roomExtras`);
    assert.equal(overlay.equipment.length, base.equipment.length, `${name} equipment`);
    assert.equal(overlay.ambulanceSpecs.length, base.ambulanceSpecs.length, `${name} ambulanceSpecs`);
    assert.equal(overlay.support.length, base.support.length, `${name} support`);
    assert.equal(overlay.hygieneRows.length, base.hygieneRows.length, `${name} hygieneRows`);
    assert.equal(overlay.visitingRows.length, base.visitingRows.length, `${name} visitingRows`);
    assert.equal(overlay.gettingHere.length, base.gettingHere.length, `${name} gettingHere`);
    assert.equal(overlay.comforts.length, base.comforts.length, `${name} comforts`);
    assert.equal(overlay.contactRows.length, base.contactRows.length, `${name} contactRows`);
  }
});

// A translation that is still the English sentence is not a translation. This
// catches a copy-paste that was never actually translated, which a parity
// check alone would happily pass.
//
// The comparison normalises case and surrounding whitespace before
// comparing, so a translation that differs from English only by
// capitalisation or by stray leading/trailing space still fails: JS string
// comparison is case-sensitive, and that gap is how `international-care`
// shipped "Bank Transfer" as a translation of "Bank transfer" past a green
// suite.
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
