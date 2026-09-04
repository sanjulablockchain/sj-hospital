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
 * cards; `value` is the phone number, WhatsApp number, email address and the
 * "e-Channeling" name on the booking rail; `icon` is which glyph a rail row
 * shows, a name the code switches on rather than copy (the same fix
 * contact's `contactRows.icon` made, so keying it off `label` cannot blank
 * four icons the way the pilot did); `id` is every room's anchor id, which
 * RoomTypeNav and RoomsSection both scroll to and must never differ from
 * each other; `src` and `alt` are every room photo's path and description,
 * neither of which is prose to translate (RoomsHero's, AboutHero's and
 * ContactHero's own hero photos are the same: alt text stays in the
 * component, in English, on every page this plan has shipped so far).
 *
 * `price` is excluded entirely: Standard's "From 10,000 LKR" and the other
 * three categories' "On request" are facts, not sentences, and `heroFacts[1]`
 * restates that same figure, so it is excluded by its own exact path below
 * rather than by a generic ".v" rule that would also exempt "Four", "Three
 * daily" and "24/7" from ever being translated.
 */
function isUntranslatable(path: string): boolean {
  return (
    path.endsWith(".href") ||
    path.endsWith(".count") ||
    path.endsWith(".value") ||
    path.endsWith(".icon") ||
    path.endsWith(".id") ||
    path.endsWith(".src") ||
    path.endsWith(".alt") ||
    path.endsWith(".price") ||
    path === "heroFacts[1].v" // "10,000 LKR", restating the standard room's own price
  );
}

/**
 * Strings the translations deliberately leave in English.
 *
 * The register is code-mixed, the way a Sri Lankan hospital site actually
 * reads: a Sinhala or Tamil sentence carrying the English nouns and product
 * names people really say. Listing them by path rather than waving through
 * any English-looking string keeps each one a decision somebody made, so a
 * genuinely forgotten translation still fails the suite.
 *
 * "Standard", "Deluxe" and "Super Deluxe" are the hospital's own room class
 * names, kept in English at every path they appear (the room type's own
 * `name` and `shortName`, and the jump card that shares the same short form),
 * the same as navigationLabels.si.ts / .ta.ts already keep them for the
 * footer and header nav. "Wards" is not one of these: it is an ordinary word,
 * not a class name, and navigationLabels translates it, so this feature
 * translates it too, everywhere it appears.
 */
const KEEPS_ENGLISH = new Set([
  "roomTypes[0].name", // "Standard Rooms": a room class name, not a sentence
  "roomTypes[0].shortName", // "Standard"
  "roomTypes[1].name", // "Deluxe Rooms"
  "roomTypes[1].shortName", // "Deluxe"
  "roomTypes[2].name", // "Super Deluxe Rooms"
  "roomTypes[2].shortName", // "Super Deluxe"
  "roomTypes[0].amenities[1]", // TV
  "roomTypes[0].amenities[2]", // Wi-Fi
  "roomTypes[1].amenities[1]", // TV
  "roomTypes[1].amenities[2]", // Wi-Fi
  "roomTypes[2].amenities[1]", // TV
  "roomTypes[2].amenities[2]", // Wi-Fi
  "roomTypes[3].amenities[3]", // TV (Wards has no Wi-Fi row to begin with)
  "jumpCards[0].label", // "Standard"
  "jumpCards[1].label", // "Deluxe"
  "jumpCards[2].label", // "Super Deluxe"
  "bookRail[1].label", // WhatsApp, a product name in every script
  "bookRail[2].label", // Email
]);

test("every translatable string in accommodation has Sinhala", () => {
  const missing = assertTranslationParity(base, si, isUntranslatable);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every translatable string in accommodation has Tamil", () => {
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
    assert.equal(overlay.roomTypes.length, base.roomTypes.length, `${name} roomTypes`);
    assert.equal(overlay.specialties.length, base.specialties.length, `${name} specialties`);
    assert.equal(overlay.bookRail.length, base.bookRail.length, `${name} bookRail`);
    for (let i = 0; i < base.roomTypes.length; i++) {
      assert.equal(
        overlay.roomTypes[i].amenities.length,
        base.roomTypes[i].amenities.length,
        `${name} roomTypes[${i}].amenities`
      );
    }
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
