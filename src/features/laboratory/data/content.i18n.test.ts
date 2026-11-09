import { test } from "node:test";
import assert from "node:assert/strict";
import * as base from "./content.ts";
import * as si from "./content.si.ts";
import * as ta from "./content.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * What this feature refuses to translate, beyond what the register policy
 * already keeps English (hero, eyebrows, headings, CTAs).
 *
 * `href`, `glyph`, `internal` and `value` are the same structural fields
 * pharmacy's own test excludes. `featuredCodes[*].code` is a catalogue code
 * and `featuredCodes[*].label` is the short display name of a laboratory
 * test, which stays English the way every test name in the price list does:
 * a Sri Lankan doctor writes "FBC" and "CRP" on the request form.
 *
 * `table.*` is the filter row and the column headers, chrome per the
 * register rule's sixth ruling (filter controls go English), with two
 * exceptions a reader reads rather than scans: the empty state sentence and
 * the "Showing n of total" line.
 */
function isUntranslatable(path: string): boolean {
  if (/\.(href|glyph|internal|value|code)$/.test(path)) return true;
  if (/^featuredCodes\[\d+\]\.label$/.test(path)) return true;
  if (path.startsWith("table.")) return path !== "table.empty" && path !== "table.showingTemplate";
  return false;
}

test("every translatable string in laboratory has Sinhala", () => {
  const missing = assertTranslationParity(base, si, isUntranslatable);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every translatable string in laboratory has Tamil", () => {
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

test("no translated string is left identical to its English source", () => {
  const english = new Map<string, string>();
  const collect = (value: unknown, prefix: string) => {
    if (typeof value === "string") english.set(prefix, value.trim().toLowerCase());
    else if (Array.isArray(value)) value.forEach((item, i) => collect(item, `${prefix}[${i}]`));
    else if (value && typeof value === "object")
      for (const [k, v] of Object.entries(value)) if (!k.startsWith("__")) collect(v, prefix ? `${prefix}.${k}` : k);
  };
  collect(base, "");
  for (const [name, overlay] of [
    ["si", si],
    ["ta", ta],
  ] as const) {
    const translated = new Map<string, string>();
    const walk = (value: unknown, prefix: string) => {
      if (typeof value === "string") translated.set(prefix, value.trim().toLowerCase());
      else if (Array.isArray(value)) value.forEach((item, i) => walk(item, `${prefix}[${i}]`));
      else if (value && typeof value === "object")
        for (const [k, v] of Object.entries(value)) if (!k.startsWith("__")) walk(v, prefix ? `${prefix}.${k}` : k);
    };
    walk(overlay, "");
    for (const [path, value] of translated) {
      assert.notEqual(value, english.get(path), `${name} ${path} is still English`);
    }
  }
});
