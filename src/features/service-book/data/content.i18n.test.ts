import { test } from "node:test";
import assert from "node:assert/strict";
import * as base from "./content.ts";
import * as si from "./content.si.ts";
import * as ta from "./content.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * What this feature refuses to translate, beyond what the register policy
 * already keeps English (hero, eyebrows, headings, link and CTA labels).
 *
 * `href` and `id` are structure. `download.size` is a fact about a file.
 * `viewer.*` is the reader's controls and its page announcements: chrome of
 * the same kind as the laboratory page's filter row, so English.
 */
function isUntranslatable(path: string): boolean {
  if (/\.(href|id)$/.test(path)) return true;
  return path.startsWith("download.") || path.startsWith("viewer.");
}

test("every translatable string in service-book has Sinhala", () => {
  const missing = assertTranslationParity(base, si, isUntranslatable);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every translatable string in service-book has Tamil", () => {
  const missing = assertTranslationParity(base, ta, isUntranslatable);
  assert.deepEqual(missing, [], `Tamil is missing: ${missing.join(", ")}`);
});

test("the overlays contain only keys the English module has", () => {
  const basePaths = new Set(stringPaths(base));
  for (const [name, overlay] of [
    ["si", si],
    ["ta", ta],
  ] as const) {
    for (const path of stringPaths(overlay)) {
      assert.ok(basePaths.has(path), `${name} has an unknown key: ${path}`);
    }
  }
});
