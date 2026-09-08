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
 * alongside its own link label, now English like every CTA (only
 * `hero.call` and `bookActions[1]` have one: the pharmacy counter's own
 * phone number), the same role `contact`'s, `accommodation`'s and
 * `home-care`'s own `value` fields play, so it stays untranslated the same
 * way `href` does.
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
  // "Digital" is the established loanword the about page already uses for a
  // digital record ("Digital X-ray", "Digital ලෙස file වලට පිවිසීම"). There
  // is no natural one-word Sinhala or Tamil equivalent for a stat badge this
  // short that would not just be a paraphrase of "Repeat prescriptions",
  // the label sitting right beside it.
  "jumpCards[3].count",

  // `standards[6].k` is "Record" from the header's own kept-English list,
  // standing alone the same way `jumpCards[3].count` does: a bare one-word
  // fact-row label with no natural Sinhala or Tamil equivalent that would not
  // just be a paraphrase of the `v` sitting beside it ("Digital, on file").
  // `sectionEyebrows.safety` ("Safety & records") already keeps this same
  // word English in the same file, so this is the established form, not a
  // one-off.
  "standards[6].k",

  // `safety[5].name`'s English base is "Digital records" (lowercase r). The
  // translated forms ("ඔබේ Digital Records එක" / "உங்கள் Digital Records")
  // add a real Sinhala/Tamil possessive rather than just recasing the
  // English, so neither needs a KEEPS_ENGLISH entry: they differ from the
  // base by more than case or whitespace, the same "your <English noun>"
  // shape `safety[3].name`'s own "ඔබේ Hospital File එක" / "உங்கள் Hospital
  // File" already uses two rows above in the same array.

  // `stock[0..5].name` and `stock[].tag` (all ten): six of the ten stocked
  // rows are genuine medicine names or dosage-form categories (Prescription
  // medicine, Antibiotics, Chronic medicine, Paediatric medicine, Discharge
  // medicine, Over the counter), and all ten tags are the standard
  // dispensing labels (On file, Rx only, Refillable, No Rx). This is how a
  // Sri Lankan pharmacist writes and says them, and how they print on the
  // label a patient is handed, so they are not recast into Sinhala or Tamil
  // coinages nobody reads at the counter.
  //
  // `stock[6..9].name` ("Wound care and dressings", "First aid supplies",
  // "Home health devices", "Baby and mother care") are NOT in this list:
  // they are generic retail/supply category descriptions, not medicine
  // names or dispensing tags, and are translated below the same way
  // `counters[].name` ("Delivery orders" -> "Delivery කරන Orders") already
  // is on this same page.
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
  "stock[6].tag",
  "stock[7].tag",
  "stock[8].tag",
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
// A translation that is still the English sentence is not a translation. The
// comparison normalises case and surrounding whitespace before comparing, so
// a translation that differs from English only by capitalisation or by
// stray leading/trailing space still fails: JS string comparison is
// case-sensitive, and that gap is how `safety[5].name` shipped "Digital
// Records" as a "translation" of "Digital records" past a strict, raw
// `assert.notEqual` (the same gap `international-care` shipped "Bank
// Transfer" for "Bank transfer" through, and the same normalised form
// `services`'s own content.i18n.test.ts already uses).
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

test("KEEPS_ENGLISH has no stale or duplicate entries", () => {
  // A path that no longer exists in the base, or one that is already covered
  // by isUntranslatable, is a sign the exception was never pruned. Without
  // this, the list can name paths that do not exist, excusing nothing while
  // reading as though somebody decided something.
  const basePaths = new Set(stringPaths(base));
  for (const path of KEEPS_ENGLISH) {
    assert.ok(basePaths.has(path), `KEEPS_ENGLISH has a stale path: ${path}`);
    assert.ok(!isUntranslatable(path), `KEEPS_ENGLISH duplicates isUntranslatable: ${path}`);
  }
});
