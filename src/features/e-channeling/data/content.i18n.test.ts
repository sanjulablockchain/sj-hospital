import { test } from "node:test";
import assert from "node:assert/strict";
import * as doctorsBase from "./doctors.ts";
import * as doctorsSi from "./doctors.si.ts";
import * as doctorsTa from "./doctors.ta.ts";
import * as base from "./content.ts";
import * as si from "./content.si.ts";
import * as ta from "./content.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * What doctors.ts refuses to translate.
 *
 * `name` is a proper noun, exactly like the hospital's own name, and never
 * changes script; several rows carry a title merged into the same string
 * ("Dr. ", "Prof. ", "Mrs. ", "Mr. ", "Ms. "), so the whole string is excluded
 * rather than inventing a split doctors.ts never had. `calendlySlug` and
 * `CALENDLY_BASE` are URL fragments. Excluding these by path keeps this file
 * short: it does not need to list all 71 names the way KEEPS_ENGLISH lists a
 * handful of deliberate words elsewhere.
 */
function isDoctorUntranslatable(path: string): boolean {
  return path === "CALENDLY_BASE" || path.endsWith(".name") || path.endsWith(".calendlySlug");
}

test("every translatable string in doctors has Sinhala", () => {
  const missing = assertTranslationParity(doctorsBase, doctorsSi, isDoctorUntranslatable);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every translatable string in doctors has Tamil", () => {
  const missing = assertTranslationParity(doctorsBase, doctorsTa, isDoctorUntranslatable);
  assert.deepEqual(missing, [], `Tamil is missing: ${missing.join(", ")}`);
});

test("the doctor overlays keep the base's array length", () => {
  for (const [name, overlay] of [
    ["si", doctorsSi],
    ["ta", doctorsTa],
  ] as const) {
    assert.equal(overlay.doctors.length, doctorsBase.doctors.length, `${name} doctors`);
  }
});

// A translated speciality that is still the English word is not a
// translation. Names are expected to stay identical (that is the point), so
// this only walks the paths the parity check above did not exclude.
//
// The comparison normalises case and surrounding whitespace before comparing,
// so a translation that differs from English only by capitalisation or by
// stray leading/trailing space still fails: JS string comparison is
// case-sensitive, and that gap let untranslated fields through elsewhere in
// this project despite this test already existing.
test("no translated speciality is left identical to its English source, ignoring case and whitespace", () => {
  const englishByPath = new Map<string, string>();
  collect(doctorsBase, "", englishByPath);

  for (const [name, overlay] of [
    ["si", doctorsSi],
    ["ta", doctorsTa],
  ] as const) {
    const translatedByPath = new Map<string, string>();
    collect(overlay, "", translatedByPath);

    for (const [path, translated] of translatedByPath) {
      if (isDoctorUntranslatable(path)) continue;
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

/**
 * What content.ts refuses to translate.
 *
 * `heroFacts[0].v` and `heroFacts[1].v` are the Consultants and Specialities
 * counts, computed from doctors.ts rather than typed in (see content.ts), so
 * they are numerals rendered as strings, not prose. `heroFacts[3].v` and
 * every `helpRail.phone` / `helpRail.phoneHref` / `helpRail.email` are the
 * channelling desk's own facts, which have exactly one home in content.ts.
 */
function isContentUntranslatable(path: string): boolean {
  return (
    path === "heroFacts[0].v" ||
    path === "heroFacts[1].v" ||
    path === "heroFacts[3].v" ||
    path === "helpRail.phone" ||
    path === "helpRail.phoneHref" ||
    path === "helpRail.email"
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
  // The feature's own name, the way every other page's nav names it
  // (channelingNavigation.ts). Treated like the hospital's own name: never
  // transliterated.
  "hero.breadcrumbCurrent",
]);

test("every translatable string in content has Sinhala", () => {
  const missing = assertTranslationParity(base, si, isContentUntranslatable);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every translatable string in content has Tamil", () => {
  const missing = assertTranslationParity(base, ta, isContentUntranslatable);
  assert.deepEqual(missing, [], `Tamil is missing: ${missing.join(", ")}`);
});

// The overlays are merged into the base by index, so an overlay that grew or
// shrank an array would silently attach a translation to the wrong entry.
test("the content overlays keep the base's array lengths", () => {
  for (const [name, overlay] of [
    ["si", si],
    ["ta", ta],
  ] as const) {
    assert.equal(overlay.heroFacts.length, base.heroFacts.length, `${name} heroFacts`);
    assert.equal(overlay.tickerItems.length, base.tickerItems.length, `${name} tickerItems`);
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
test("no translated string in content is left identical to its English source, ignoring case and whitespace", () => {
  const englishByPath = new Map<string, string>();
  collect(base, "", englishByPath);

  for (const [name, overlay] of [
    ["si", si],
    ["ta", ta],
  ] as const) {
    const translatedByPath = new Map<string, string>();
    collect(overlay, "", translatedByPath);

    for (const [path, translated] of translatedByPath) {
      if (isContentUntranslatable(path)) continue;
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
  for (const [label, siOverlay, taOverlay, exclude] of [
    ["doctors", doctorsSi, doctorsTa, isDoctorUntranslatable],
    ["content", si, ta, isContentUntranslatable],
  ] as const) {
    for (const [locale, overlay] of [
      ["si", siOverlay],
      ["ta", taOverlay],
    ] as const) {
      const supplied = stringPaths(overlay).filter(exclude);
      assert.deepEqual(
        supplied,
        [],
        `${label}:${locale} overlay restates ${supplied.join(", ")}, which the base owns. A fact, an href, an anchor id or a structural key has exactly one home, in the English module, and a second copy in an overlay drifts out of step with it.`
      );
    }
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
    assert.ok(
      !isContentUntranslatable(path),
      `KEEPS_ENGLISH duplicates isContentUntranslatable: ${path}`
    );
  }
});
