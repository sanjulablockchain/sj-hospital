import { test } from "node:test";
import assert from "node:assert/strict";
import * as base from "./content.ts";
import * as si from "./content.si.ts";
import * as ta from "./content.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * What this feature refuses to translate.
 *
 * `href` is every anchor target; `no` is the "01" through "08" on the safety
 * cards and the "01" through "04" on the delivery steps; `glyph` is which
 * character a `#book` action shows, a name the code switches on rather than
 * copy (the same fix `home-care`'s `contactRows.icon`, `contact`'s
 * `contactRows.icon` and `accommodation`'s `bookRail.icon` already made, so
 * keying it off `label` cannot blank a glyph the way the pilot did).
 * `internal` is a boolean, not copy. `value` is the fact a row carries
 * alongside its own translatable `label` (only `hero.call` and
 * `bookActions[1]` have one: the pharmacy counter's own phone number), the
 * same role `contact`'s, `accommodation`'s and `home-care`'s own `value`
 * fields play, so it stays untranslated the same way `href` does.
 */
function isUntranslatable(path: string): boolean {
  return (
    path.endsWith(".href") ||
    path.endsWith(".no") ||
    path.endsWith(".glyph") ||
    path.endsWith(".internal") ||
    path.endsWith(".value")
  );
}

/**
 * Strings the translations deliberately leave in English.
 *
 * The register is code-mixed, the way a Sri Lankan hospital site actually
 * reads: a Sinhala or Tamil sentence carrying the English nouns and
 * product-adjacent or brand-adjacent names people really say (Counter,
 * Prescription, Delivery, Pharmacist, WhatsApp, Rx). Medicine names, dosage
 * forms and brand names also stay in English throughout `stock` and
 * `refills`, because that is how a Sri Lankan pharmacist writes and says
 * them: "Blood pressure", "Diabetes", "Thyroid", "Cardiac medicine",
 * "Asthma inhalers", "Cholesterol", "Antibiotics", "Paediatric medicine".
 * Listing exact strings by path rather than waving through any English
 * looking string keeps each one a decision somebody made, so a genuinely
 * forgotten translation still fails the suite.
 *
 * "229/10 St. Joseph Street" in `bookIntro` never changes script: it is the
 * address a driver is shown, the same reason `contact`'s own address strings
 * stay untranslated. It is not listed here because the overlay keeps the
 * literal address inside an otherwise-translated sentence rather than
 * leaving the whole string identical to its English source.
 */
const KEEPS_ENGLISH = new Set<string>([
  // "Pharmacy" is one of the everyday English department nouns the site
  // never recasts (Reception, OPD, Emergency, X-ray). E-channeling's own
  // `hero.breadcrumbCurrent` stays "E-Channeling" for the same reason.
  "hero.breadcrumbCurrent",

  // "Digital" is the established loanword the about page already uses for a
  // digital record ("Digital X-ray", "Digital ලෙස file වලට පිවිසීම"). There
  // is no natural one-word Sinhala or Tamil equivalent for a stat badge this
  // short that would not just be a paraphrase of "Repeat prescriptions",
  // the label sitting right beside it.
  "jumpCards[3].count",

  // `stock[].name` and `stock[].tag`: the ten stocked categories and their
  // four dispensing-status tags (On file, Rx only, Refillable, No Rx) are
  // medicine names, dosage-form categories and standard dispensing labels.
  // This is how a Sri Lankan pharmacist writes and says them, and how they
  // print on the label a patient is handed, so they are not recast into
  // Sinhala or Tamil coinages nobody reads at the counter.
  "stock[0].name",
  "stock[0].tag",
  "stock[1].name",
  "stock[1].tag",
  "stock[2].name",
  "stock[2].tag",
  "stock[3].name",
  "stock[3].tag",
  "stock[4].name",
  "stock[4].tag",
  "stock[5].name",
  "stock[5].tag",
  "stock[6].name",
  "stock[6].tag",
  "stock[7].name",
  "stock[7].tag",
  "stock[8].name",
  "stock[8].tag",
  "stock[9].name",
  "stock[9].tag",

  // `refills[].name`: the seven repeat-prescription conditions and medicines
  // (Blood pressure, Diabetes, Thyroid, Cardiac medicine, Asthma inhalers,
  // Cholesterol, Discharge medicine) are the same kind of medicine-name
  // fact, kept English for the same reason `stock[].name` is.
  "refills[0].name",
  "refills[1].name",
  "refills[2].name",
  "refills[3].name",
  "refills[4].name",
  "refills[5].name",
  "refills[6].name",
]);

test("every translatable string in pharmacy has Sinhala", () => {
  const missing = assertTranslationParity(base, si, isUntranslatable);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every translatable string in pharmacy has Tamil", () => {
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
    assert.equal(overlay.counters.length, base.counters.length, `${name} counters`);
    assert.equal(overlay.standards.length, base.standards.length, `${name} standards`);
    assert.equal(overlay.stock.length, base.stock.length, `${name} stock`);
    assert.equal(overlay.steps.length, base.steps.length, `${name} steps`);
    assert.equal(overlay.sendingWell.length, base.sendingWell.length, `${name} sendingWell`);
    assert.equal(overlay.deliveryFacts.length, base.deliveryFacts.length, `${name} deliveryFacts`);
    assert.equal(overlay.refills.length, base.refills.length, `${name} refills`);
    assert.equal(overlay.safety.length, base.safety.length, `${name} safety`);
    assert.equal(overlay.faq.length, base.faq.length, `${name} faq`);
    assert.equal(overlay.bookActions.length, base.bookActions.length, `${name} bookActions`);
  }
});

// A translation that is still the English sentence is not a translation. This
// catches a copy-paste that was never actually translated, which a parity
// check alone would happily pass.
test("no translated string is left identical to its English source", () => {
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
      assert.notEqual(
        translated,
        englishByPath.get(path),
        `${name} ${path} is still the English string. If that is deliberate, add it to KEEPS_ENGLISH with a reason.`
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
