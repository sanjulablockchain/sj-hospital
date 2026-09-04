import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import * as si from "./navigationLabels.si.ts";
import * as ta from "./navigationLabels.ta.ts";

const CONFIG_DIR = fileURLToPath(new URL(".", import.meta.url));

function englishStrings(field: "label" | "heading"): string[] {
  const found = new Set<string>();
  for (const file of readdirSync(CONFIG_DIR)) {
    if (!file.endsWith("Navigation.ts")) continue;
    const source = readFileSync(CONFIG_DIR + file, "utf8");
    // Either quote style: nothing in this repo prevents a single-quoted label
    // (there is no Prettier config, and eslint-config-next adds no quote rule),
    // and a single-quoted heading missed here would render in English on both
    // translated pages with the suite green.
    for (const m of source.matchAll(new RegExp(`${field}: (?:"([^"]+)"|'([^']+)')`, "g"))) {
      found.add((m[1] ?? m[2]) as string);
    }
  }
  return [...found].sort();
}

test("every nav label in every config has Sinhala and Tamil", () => {
  const missingSi = englishStrings("label").filter((l) => !(l in si.NAV_LABELS));
  const missingTa = englishStrings("label").filter((l) => !(l in ta.NAV_LABELS));
  assert.deepEqual(missingSi, [], `Sinhala nav labels missing: ${missingSi.join(", ")}`);
  assert.deepEqual(missingTa, [], `Tamil nav labels missing: ${missingTa.join(", ")}`);
});

test("every footer heading in every config has Sinhala and Tamil", () => {
  const missingSi = englishStrings("heading").filter((h) => !(h in si.FOOTER_HEADINGS));
  const missingTa = englishStrings("heading").filter((h) => !(h in ta.FOOTER_HEADINGS));
  assert.deepEqual(missingSi, [], `Sinhala footer headings missing: ${missingSi.join(", ")}`);
  assert.deepEqual(missingTa, [], `Tamil footer headings missing: ${missingTa.join(", ")}`);
});

// Both dictionaries are keyed by the English string, so an entry whose value
// is still the English string is either a real gap or a decision. Decisions go
// in KEEPS_ENGLISH; gaps fail here.
//
// FOOTER_HEADINGS is checked alongside NAV_LABELS, and both comparisons are
// normalised. Until this task neither was true, so this comment asserted a
// rule its own test did not enforce: FOOTER_HEADINGS sat outside the loop, which
// left all 17 footer column headings on every page in both languages exempt
// from the only check that looks for an untranslated value (`Booking:
// "Booking"` passed), and the comparison was exact rather than normalised, so
// `"Privacy policy": "Privacy Policy"` passed as a translation. The
// normalisation retrofit that reached all 15 feature tests in 4a739d1 never
// reached this file.
//
// - Media, Pharmacy: everyday English nouns, read and written in English on an
//   otherwise Sinhala or Tamil page, the same as Email or WhatsApp in the
//   contact feature's overlays. Both are keys in NAV_LABELS and in
//   FOOTER_HEADINGS, and one set covers both dictionaries because both are
//   keyed by the same English strings.
// - Standard, Deluxe, Super deluxe: accommodation room class names. Sri Lankan
//   hospitals and hotels alike print these in English rather than coining a
//   Sinhala or Tamil equivalent nobody actually says.
// - WhatsApp: kept for parity with the chrome's own KEEPS_ENGLISH in
//   chromeCopy; it is not currently a nav label or a footer heading, but stays
//   listed so one would not silently fail this test if it ever became one.
const KEEPS_ENGLISH = new Set(["Media", "WhatsApp", "Pharmacy", "Standard", "Deluxe", "Super deluxe"]);

const DICTIONARIES = [
  ["si", "NAV_LABELS", si.NAV_LABELS],
  ["si", "FOOTER_HEADINGS", si.FOOTER_HEADINGS],
  ["ta", "NAV_LABELS", ta.NAV_LABELS],
  ["ta", "FOOTER_HEADINGS", ta.FOOTER_HEADINGS],
] as const;

test("no dictionary entry is left as its English key, ignoring case and whitespace", () => {
  const normalize = (value: string) => value.trim().toLowerCase();
  for (const [locale, name, dictionary] of DICTIONARIES) {
    for (const [english, translated] of Object.entries(dictionary)) {
      if (KEEPS_ENGLISH.has(english)) continue;
      assert.notEqual(
        normalize(translated),
        normalize(english),
        `${locale} ${name} "${english}" is untranslated, or differs from the English only by case or whitespace, which is not a translation. If that is deliberate, add it to KEEPS_ENGLISH with a reason.`
      );
    }
  }
});
