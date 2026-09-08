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

/**
 * The register policy (`registerPolicy.ts`) says the whole nav bar and
 * footer are English in every language, per `docs/superpowers/i18n-register-rule.md`.
 * This inverts what this file asserted before the sweep: it used to fail when
 * a label had no dictionary entry, now it fails when one does, because
 * `NAV_LABELS` / `FOOTER_HEADINGS` are meant to end up empty and `navLabel` /
 * `footerHeading` in `navigationLabels.ts` already fall back to the English
 * string for any label neither dictionary carries.
 *
 * This is a local, readable echo of the same guarantee
 * `overlayRegister.test.ts`'s filesystem walker enforces sitewide once
 * `config` leaves `PENDING_REGISTER_SWEEP`: it fails right here, against the
 * actual `*Navigation.ts` route files, rather than only in a walker a reader
 * of this file might never open.
 */
test("no nav label in any config has a Sinhala or Tamil dictionary entry", () => {
  const labels = englishStrings("label");
  const stillSi = labels.filter((l) => l in si.NAV_LABELS);
  const stillTa = labels.filter((l) => l in ta.NAV_LABELS);
  assert.deepEqual(stillSi, [], `Sinhala NAV_LABELS still translates: ${stillSi.join(", ")}`);
  assert.deepEqual(stillTa, [], `Tamil NAV_LABELS still translates: ${stillTa.join(", ")}`);
});

test("no footer heading in any config has a Sinhala or Tamil dictionary entry", () => {
  const headings = englishStrings("heading");
  const stillSi = headings.filter((h) => h in si.FOOTER_HEADINGS);
  const stillTa = headings.filter((h) => h in ta.FOOTER_HEADINGS);
  assert.deepEqual(stillSi, [], `Sinhala FOOTER_HEADINGS still translates: ${stillSi.join(", ")}`);
  assert.deepEqual(stillTa, [], `Tamil FOOTER_HEADINGS still translates: ${stillTa.join(", ")}`);
});

// The direct version of the same guarantee: both dictionaries are meant to be
// empty now, not merely free of the labels currently in use in *Navigation.ts.
// An empty object is also what lets `navigationLabels.si.ts` / `.ta.ts` keep
// existing (rather than being deleted) while carrying nothing but the
// `__review` marker's siblings: `navigationLabels.ts` still imports the two
// named exports, so the module stays, with nothing in either dictionary.
test("NAV_LABELS and FOOTER_HEADINGS are empty in both overlays", () => {
  assert.deepEqual(Object.keys(si.NAV_LABELS), []);
  assert.deepEqual(Object.keys(ta.NAV_LABELS), []);
  assert.deepEqual(Object.keys(si.FOOTER_HEADINGS), []);
  assert.deepEqual(Object.keys(ta.FOOTER_HEADINGS), []);
});
