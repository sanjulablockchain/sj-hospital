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
    for (const m of source.matchAll(new RegExp(`${field}: "([^"]+)"`, "g"))) found.add(m[1]);
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

// The dictionary is keyed by the English string, so an entry whose value is
// still the English string is either a real gap or a decision. Decisions go in
// KEEPS_ENGLISH; gaps fail here.
//
// - Media, Pharmacy: everyday English nouns, read and written in English on an
//   otherwise Sinhala or Tamil page, the same as Email or WhatsApp in the
//   contact feature's overlays.
// - Standard, Deluxe, Super deluxe: accommodation room class names. Sri Lankan
//   hospitals and hotels alike print these in English rather than coining a
//   Sinhala or Tamil equivalent nobody actually says.
// - WhatsApp: kept for parity with the chrome's own KEEPS_ENGLISH in
//   chromeCopy; it is not currently a nav label, but stays listed so one
//   would not silently fail this test if it ever became one.
const KEEPS_ENGLISH = new Set(["Media", "WhatsApp", "Pharmacy", "Standard", "Deluxe", "Super deluxe"]);

test("no dictionary entry is left as its English key", () => {
  for (const [name, dict] of [["si", si.NAV_LABELS], ["ta", ta.NAV_LABELS]] as const) {
    for (const [english, translated] of Object.entries(dict)) {
      if (KEEPS_ENGLISH.has(english)) continue;
      assert.notEqual(translated, english, `${name} "${english}" is untranslated`);
    }
  }
});
