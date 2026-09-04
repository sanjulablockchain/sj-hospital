import { test } from "node:test";
import assert from "node:assert/strict";
import * as base from "./content.ts";
import * as si from "./content.si.ts";
import * as ta from "./content.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * What this feature refuses to translate.
 *
 * `PLACEHOLDER_NOTICE`, `SWITCHBOARD`, `SWITCHBOARD_TEL`, `CAREERS_EMAIL`,
 * `HR_PHONE` and `LINKEDIN_URL` are top-level facts, not copy a reader sees
 * rendered as a sentence: the first is a dev/test marker no component ever
 * prints (grepped: it appears only in this data file and content.test.ts),
 * and the rest are the one address, one phone number and one social link
 * this page is allowed to publish, the same role `SWITCHBOARD` plays in
 * `network`'s own content.i18n.test.ts.
 *
 * `GENERAL_APPLICATION_ROLE_ID`, `roleIds`, `departments` and
 * `DEPARTMENT_ORDER` are the structural ids and keys the openings filter and
 * the application form's schema compare against; translating any of them
 * would silently break the filter or make a submitted role unrecognisable to
 * the server the moment a reader switched language, the same trap
 * `newsCategories` guards against in `media`'s own content.i18n.test.ts.
 * `jobs[*].id`, `jobs[*].department`, `experienceOptions[*].id` and
 * `sourceOptions[*].id` are the same class of structural key one level down;
 * `departmentLabels`, which is NOT excluded here, carries the words a reader
 * actually sees for each department.
 *
 * `applyRows[*].value` is the hospital's own switchboard number, a fact
 * threaded through so the row's `label` could become a real action phrase
 * (see the header comment in content.ts); `applyRows[*].glyph` is the same
 * kind of structural literal `.icon` plays elsewhere. `process[*].n` is a
 * step number ("01".."05"), not copy.
 */
function isUntranslatable(path: string): boolean {
  return (
    path === "PLACEHOLDER_NOTICE" ||
    path === "SWITCHBOARD" ||
    path === "SWITCHBOARD_TEL" ||
    path === "CAREERS_EMAIL" ||
    path === "HR_PHONE" ||
    path === "LINKEDIN_URL" ||
    path === "GENERAL_APPLICATION_ROLE_ID" ||
    path.startsWith("roleIds[") ||
    path.startsWith("departments[") ||
    path.startsWith("DEPARTMENT_ORDER[") ||
    /^jobs\[\d+\]\.id$/.test(path) ||
    /^jobs\[\d+\]\.department$/.test(path) ||
    /^experienceOptions\[\d+\]\.id$/.test(path) ||
    /^sourceOptions\[\d+\]\.id$/.test(path) ||
    /^jumpCards\[\d+\]\.href$/.test(path) ||
    /^applyRows\[\d+\]\.href$/.test(path) ||
    /^applyRows\[\d+\]\.value$/.test(path) ||
    /^applyRows\[\d+\]\.glyph$/.test(path) ||
    /^process\[\d+\]\.n$/.test(path)
  );
}

/**
 * Strings the translations deliberately leave in English.
 *
 * The register is code-mixed, the way a Sri Lankan hospital site actually
 * reads: a Sinhala or Tamil sentence carrying the English nouns and terms
 * people really say. Listing them by path rather than waving through any
 * English-looking string keeps each one a decision somebody made, so a
 * genuinely forgotten translation still fails the suite.
 *
 * `jobs[0].title` ("Pharmacist") and `jobs[5].title` ("Radiographer, Digital
 * X-ray") are the two of six job titles that are nothing but an
 * already-established English occupational noun (or, for X-ray, this site's
 * own register word) with no ordinary word riding along to translate. The
 * other four titles are NOT here, because each of them does translate in
 * part: see the file header in content.si.ts and content.ta.ts for the
 * per-title reasoning, and the sibling test this survived, since `media`
 * shipped a "Consultant stays English" comment that an exhaustive grep later
 * proved wrong in five places.
 *
 * `departmentLabels.Nursing` and `departmentLabels.Pharmacy` are the same
 * site-wide occupational/department loanwords `jobs[0].title` and the
 * "Nursing"/"Pharmacy" fragments inside the other four job titles already
 * rely on: `Nursing` and `Pharmacy` are department NAMES (`navigationLabels`'s
 * own "Pharmacy" is KEEPS_ENGLISH there for the identical reason), not
 * ordinary category labels, which is exactly the distinction the sibling test
 * is for. Every OTHER entry in `departmentLabels` (`All`, `Medical`, `Allied
 * health`, `Administration`, `Support services`) does translate.
 */
const KEEPS_ENGLISH = new Set<string>([
  // "Pharmacist": a bare occupational noun with a strong, already-audited
  // site-wide precedent (facilities', media's and home-care's own overlays
  // all keep "Nurse"/"Pharmacist" English inside a translated sentence).
  "jobs[0].title",
  // "Radiographer, Digital X-ray": "X-ray" is one of this site's own
  // register words, "Digital" is the compound that always accompanies it,
  // and "Radiographer" is the same occupational-noun class as "Pharmacist".
  "jobs[5].title",
  // "Nursing": the department name, same class as navigationLabels' own
  // "Pharmacy" entry.
  "departmentLabels.Nursing",
  // "Pharmacy": the department name, matching navigationLabels.si.ts /
  // .ta.ts's own KEEPS_ENGLISH "Pharmacy" entry exactly.
  "departmentLabels.Pharmacy",
  // "Email": the recipe's own register table lists "Email" itself as a word
  // that stays English on every page (contact's own form label does the
  // same), so the bare field label needs no separate coinage.
  "form.emailLabel",
  // "you@example.com": an example address, not prose, matching contact's own
  // identical KEEPS_ENGLISH decision for its "john.doe@example.com".
  "form.emailPlaceholder",
  // "Mobile": the recipe's own register table lists "Mobile" itself as a
  // word that stays English (contact's own contact row label "WhatsApp /
  // Mobile" keeps the identical word), so the bare field label needs no
  // separate coinage.
  "form.phoneLabel",
  // "07X XXX XXXX": a digit-and-placeholder format pattern, not prose, the
  // same class as form.emailPlaceholder above.
  "form.phonePlaceholder",
  // "Pharmacists" and "Radiographers": the plain plurals of the same two
  // occupational nouns `jobs[0].title` and `jobs[5].title` already keep
  // English, with nothing else in the string to translate. Every other
  // entry in `tickerItems` (Medical Officers, Theatre Nurses, Medical
  // Laboratory Technologists, Insurance and billing) does translate.
  "tickerItems[2]",
  "tickerItems[4]",
  // `sharedJobTitles.radiographerDigitalXray` is `jobs[5].title`, read back
  // through the derived export: the same KEEPS_ENGLISH reason applies.
  "sharedJobTitles.radiographerDigitalXray",
]);

test("every translatable string in career has Sinhala", () => {
  const missing = assertTranslationParity(base, si, isUntranslatable);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every translatable string in career has Tamil", () => {
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
    assert.equal(overlay.jobs.length, base.jobs.length, `${name} jobs`);
    for (let i = 0; i < base.jobs.length; i++) {
      assert.equal(
        overlay.jobs[i].requirements.length,
        base.jobs[i].requirements.length,
        `${name} jobs[${i}].requirements`
      );
      assert.equal(overlay.jobs[i].detail.length, base.jobs[i].detail.length, `${name} jobs[${i}].detail`);
    }
    assert.equal(overlay.experienceOptions.length, base.experienceOptions.length, `${name} experienceOptions`);
    assert.equal(overlay.sourceOptions.length, base.sourceOptions.length, `${name} sourceOptions`);
    assert.equal(overlay.heroFacts.length, base.heroFacts.length, `${name} heroFacts`);
    assert.equal(overlay.tickerItems.length, base.tickerItems.length, `${name} tickerItems`);
    assert.equal(overlay.jumpCards.length, base.jumpCards.length, `${name} jumpCards`);
    assert.equal(overlay.commitments.length, base.commitments.length, `${name} commitments`);
    assert.equal(overlay.benefits.length, base.benefits.length, `${name} benefits`);
    for (let i = 0; i < base.benefits.length; i++) {
      assert.equal(overlay.benefits[i].items.length, base.benefits[i].items.length, `${name} benefits[${i}].items`);
    }
    assert.equal(overlay.process.length, base.process.length, `${name} process`);
    assert.equal(overlay.students.length, base.students.length, `${name} students`);
    assert.equal(overlay.fraudChecks.length, base.fraudChecks.length, `${name} fraudChecks`);
    assert.equal(overlay.faq.length, base.faq.length, `${name} faq`);
    assert.equal(overlay.formNotes.length, base.formNotes.length, `${name} formNotes`);
    assert.equal(overlay.applyChecklist.length, base.applyChecklist.length, `${name} applyChecklist`);
    assert.equal(overlay.applyRows.length, base.applyRows.length, `${name} applyRows`);
  }
});

// A translation that is still the English sentence is not a translation. This
// catches a copy-paste that was never actually translated, which a parity
// check alone would happily pass.
//
// The comparison normalises case and surrounding whitespace before
// comparing, so a translation that differs from English only by
// capitalisation or by stray leading/trailing space still fails: JS string
// comparison is case-sensitive, and that gap is how `international-care`
// shipped "Bank Transfer" as a translation of "Bank transfer" past a green
// suite.
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
  // A path that no longer exists in the base, or one that is already covered
  // by isUntranslatable, is a sign the exception was never pruned.
  const basePaths = new Set(stringPaths(base));
  for (const path of KEEPS_ENGLISH) {
    assert.ok(basePaths.has(path), `KEEPS_ENGLISH has a stale path: ${path}`);
    assert.ok(!isUntranslatable(path), `KEEPS_ENGLISH duplicates isUntranslatable: ${path}`);
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
