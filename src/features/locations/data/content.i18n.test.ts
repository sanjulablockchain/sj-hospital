import { test } from "node:test";
import assert from "node:assert/strict";
import * as base from "./content.ts";
import * as si from "./content.si.ts";
import * as ta from "./content.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * What this feature refuses to translate.
 *
 * `NEGOMBO_DIRECTIONS_URL` is a URL. `href` is every anchor target. `id` is
 * the card's element id and the anchor the header links to. `photo` is a
 * file path. `status` is the string the card component switches on, never
 * shown. `glyph` is which character a `#help` row shows, a name the code
 * switches on rather than copy. `value` is the fact a row carries beside its
 * own label (a phone number, "24/7"), the same role `contact`'s and
 * `school-wellness`'s own `value` fields play. `address.street` is the
 * street address, which `contact`'s own overlays also leave untranslated.
 */
function isUntranslatable(path: string): boolean {
  return (
    path === "NEGOMBO_DIRECTIONS_URL" ||
    path.endsWith(".href") ||
    path.endsWith(".id") ||
    path.endsWith(".photo") ||
    path.endsWith(".status") ||
    path.endsWith(".glyph") ||
    path.endsWith(".value") ||
    path.endsWith(".street")
  );
}

/**
 * Strings the translations deliberately leave in English.
 *
 * The register is code-mixed, the way a Sri Lankan hospital site actually
 * reads. `hospitals[*].name` is each hospital's own name, a proper noun that
 * never changes script, the same way `network`'s company names stay as
 * printed. `hospitals[0].facts[*].label` are "Emergency", "Reception" and
 * "WhatsApp", three of the English nouns the register rule keeps as they are
 * said; `contact`'s and `network`'s overlays keep the same three.
 */
const KEEPS_ENGLISH = new Set<string>([
  "hospitals[0].name",
  "hospitals[1].name",
  "hospitals[0].facts[0].label",
  "hospitals[0].facts[1].label",
  "hospitals[0].facts[2].label",
]);

test("every translatable string in locations has Sinhala", () => {
  const missing = assertTranslationParity(base, si, isUntranslatable);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every translatable string in locations has Tamil", () => {
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
    assert.equal(overlay.hospitals.length, base.hospitals.length, `${name} hospitals`);
    base.hospitals.forEach((hospital, index) => {
      const translated = overlay.hospitals[index] as { facts?: unknown[] };
      assert.equal(
        translated.facts?.length ?? 0,
        hospital.facts.length,
        `${name} hospitals[${index}].facts`
      );
    });
  }
});

// A translation that is still the English sentence is not a translation. The
// comparison normalises case and surrounding whitespace, so a copy-paste that
// differs only by capitalisation still fails.
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
  const basePaths = new Set(stringPaths(base));
  for (const path of KEEPS_ENGLISH) {
    assert.ok(basePaths.has(path), `KEEPS_ENGLISH has a stale path: ${path}`);
    assert.ok(!isUntranslatable(path), `KEEPS_ENGLISH duplicates isUntranslatable: ${path}`);
  }
});

// `isUntranslatable` names the paths that are facts and structural keys
// rather than copy. `localize` merges by key, so an overlay carrying one would
// win over the base and reach the page: a fact has exactly one home, in the
// English module.
test("no overlay supplies a value at an untranslatable path", () => {
  for (const [name, overlay] of [
    ["si", si],
    ["ta", ta],
  ] as const) {
    const supplied = stringPaths(overlay).filter(isUntranslatable);
    assert.deepEqual(
      supplied,
      [],
      `${name} overlay restates ${supplied.join(", ")}, which the base owns.`
    );
  }
});

/** Every string in a module, keyed by the same paths `stringPaths` reports. */
function collect(value: unknown, prefix: string, into: Map<string, string>) {
  for (const path of stringPaths(value, prefix)) {
    into.set(path, read(value, path));
  }
}

/** Follow a `stringPaths` path such as `hospitals[0].city` back to its value. */
function read(root: unknown, path: string): string {
  let current: unknown = root;
  for (const step of path.split(/\.|\[|\]\.?/).filter(Boolean)) {
    current = (current as Record<string, unknown>)[step];
  }
  return current as string;
}
