import { test } from "node:test";
import assert from "node:assert/strict";
import * as content from "./content.ts";
import * as contentSi from "./content.si.ts";
import * as contentTa from "./content.ta.ts";
import * as careers from "./careers.ts";
import * as careersSi from "./careers.si.ts";
import * as careersTa from "./careers.ta.ts";
import * as facilities from "./facilities.ts";
import * as facilitiesSi from "./facilities.si.ts";
import * as facilitiesTa from "./facilities.ta.ts";
import * as healthTips from "./healthTips.ts";
import * as healthTipsSi from "./healthTips.si.ts";
import * as healthTipsTa from "./healthTips.ta.ts";
import * as homeCare from "./homeCare.ts";
import * as homeCareSi from "./homeCare.si.ts";
import * as homeCareTa from "./homeCare.ta.ts";
import * as internationalCare from "./internationalCare.ts";
import * as internationalCareSi from "./internationalCare.si.ts";
import * as internationalCareTa from "./internationalCare.ta.ts";
import * as media from "./media.ts";
import * as mediaSi from "./media.si.ts";
import * as mediaTa from "./media.ta.ts";
import * as network from "./network.ts";
import * as networkSi from "./network.si.ts";
import * as networkTa from "./network.ta.ts";
import * as testimonials from "./testimonials.ts";
import * as testimonialsSi from "./testimonials.si.ts";
import * as testimonialsTa from "./testimonials.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * The nine data files this feature is built from: eight per-teaser files
 * that predate this task, plus `content.ts`, added by this task for the
 * bands with no data file of their own (see its own header comment). Every
 * module gets the same parity, array-length and "not still English" gates,
 * scoped by `moduleName` below.
 */
const MODULES = [
  { name: "content", base: content, si: contentSi, ta: contentTa },
  { name: "careers", base: careers, si: careersSi, ta: careersTa },
  { name: "facilities", base: facilities, si: facilitiesSi, ta: facilitiesTa },
  { name: "healthTips", base: healthTips, si: healthTipsSi, ta: healthTipsTa },
  { name: "homeCare", base: homeCare, si: homeCareSi, ta: homeCareTa },
  { name: "internationalCare", base: internationalCare, si: internationalCareSi, ta: internationalCareTa },
  { name: "media", base: media, si: mediaSi, ta: mediaTa },
  { name: "network", base: network, si: networkSi, ta: networkTa },
  { name: "testimonials", base: testimonials, si: testimonialsSi, ta: testimonialsTa },
] as const;

/**
 * Facts, not copy, shared across every one of the nine data files:
 *
 * - `.index` is the ordinal numeral each teaser card counts itself with
 *   ("01".."06"), the same class of literal `process[*].n` is in career.
 * - `.href` is a route, and `.photo` an image path: neither is prose.
 * - `.photoAlt` stays in English on every page, the same rule the standalone
 *   `facilities` feature's own content.i18n.test.ts states in its header.
 * - `mediaItems[*].date` is a press date, a fact rather than copy, the same
 *   exclusion the standalone `media` feature's own content.i18n.test.ts uses
 *   for every `.date` path.
 * - `testimonials[*].name` is the patient's own name and never translates
 *   (see content.ts's header note on `network`'s `hero`, and this file's own
 *   header note on `testimonials`).
 * - `whoWeAre.stats[*]` and `pharmacy.stats[*]`'s `.value` / `.suffix` are the
 *   numeric facts `CountUp` renders alongside a translated `.label` or
 *   `.caption`, the same split `pharmacy`'s own standalone feature uses.
 */
function isUntranslatable(moduleName: string, path: string): boolean {
  if (path.endsWith(".index")) return true;
  if (path.endsWith(".href")) return true;
  if (path.endsWith(".photo")) return true;
  if (path.endsWith(".photoAlt")) return true;
  if (path.endsWith(".date")) return true;
  if (/^testimonials\[\d+\]\.name$/.test(path)) return true;
  if (moduleName === "content") {
    if (/^whoWeAre\.stats\[\d+\]\.(value|suffix)$/.test(path)) return true;
    if (/^pharmacy\.stats\[\d+\]\.(value|suffix)$/.test(path)) return true;
  }
  return false;
}

/**
 * Strings the translations deliberately leave in English, keyed
 * `"<module>:<path>"` so two modules can each have their own path without
 * colliding.
 *
 * - `content:servicesBento.tiles[3].badge` ("/04 Pharmacy") and
 *   `content:servicesBento.tiles[4].badge` ("/05 Digital X-ray"): "Pharmacy"
 *   and "Digital X-ray" are this site's own register words, the same class
 *   as "OPD" and "Emergency", and a bare numeral badge has no other word to
 *   translate.
 * - `content:pharmacy.eyebrow` and `media:sectionEyebrow` ("05 / Pharmacy",
 *   "12 / Media"): "Pharmacy" and "Media" are KEEPS_ENGLISH in
 *   navigationLabels.si.ts / .ta.ts for this exact word, and this eyebrow is
 *   that same word.
 * - `content:servicesBento.tiles[3].heading` ("Authorized stock, 24/7") is
 *   NOT in this set: "Authorized" here is part of the fixed compound
 *   "Authorized Stock", the same noun phrase `pharmacy`'s own standalone
 *   feature keeps English throughout its ticker, fact rows and safety cards
 *   ("Authorized Stock විතරයි", "Authorized Stock மட்டும்"). That is
 *   different from `pharmacy.heading.line1` below, where "Authorized" stands
 *   alone as one full segment of a three-segment heading whose other two
 *   segments both translate: pharmacy's own hero heading has the identical
 *   shape and translates that segment (see `content.si.ts` / `content.ta.ts`
 *   for the reused string), so home's copy of the same heading shape must
 *   too, and is translated rather than excepted here.
 * - `content:schoolWellness.photoCaption` ("Kids & Teens Pediatric
 *   Protocol"): this programme's own named protocol, the same proper-noun
 *   class as "Kids & Teens Medical Group" itself.
 * - `careers:jobOpenings[4].title` ("Radiographer, Digital X-ray"), and the
 *   `.department` / `.type` entries below: `.title` is now imported from
 *   `career`'s own `sharedJobTitlesSi` / `sharedJobTitlesTa` (see
 *   `careers.ts`'s own header), carrying that feature's own already-reviewed
 *   KEEPS_ENGLISH reasoning for the same four titles this teaser shares with
 *   it (see the file header in careers.si.ts / careers.ta.ts). Of the three
 *   department values "Emergency", "Pharmacy"
 *   and "Imaging", only "Pharmacy" actually has an entry in career's own
 *   `departmentLabels` (an English-identity key there); that map's taxonomy is
 *   All / Medical / Nursing / Allied health / Pharmacy / Administration /
 *   Support services, with no Emergency or Imaging entry at all, so
 *   "Emergency" and "Imaging" here rest on the site's independent
 *   register-word precedent (the same class as "Digital X-ray"), not on any
 *   match in that map.
 *   "Full time" and "Shift" match career's own `jobs[*].line`, which keeps
 *   "Full Time" and "Shift Roster" English throughout.
 * - `network:networkNodes[0].name` ("St. Joseph Hospital"): the hospital's
 *   own name, never translated. `network:networkNodes[1].name` ("Kids &
 *   Teens Medical Group") and `.location` ("Los Angeles, US"): the group's
 *   own name and its home city, both English throughout this feature.
 */
const KEEPS_ENGLISH = new Set<string>([
  "content:servicesBento.tiles[3].badge",
  "content:servicesBento.tiles[4].badge",
  "content:pharmacy.eyebrow",
  "content:schoolWellness.photoCaption",
  "media:sectionEyebrow",
  "careers:jobOpenings[0].department",
  "careers:jobOpenings[0].type",
  "careers:jobOpenings[1].type",
  "careers:jobOpenings[2].department",
  "careers:jobOpenings[2].type",
  "careers:jobOpenings[3].type",
  "careers:jobOpenings[4].title",
  "careers:jobOpenings[4].department",
  "careers:jobOpenings[4].type",
  "network:networkNodes[0].name",
  "network:networkNodes[1].name",
  "network:networkNodes[1].location",
]);

for (const { name, base, si, ta } of MODULES) {
  test(`every translatable string in home's ${name} has Sinhala`, () => {
    const missing = assertTranslationParity(base, si, (path) => isUntranslatable(name, path));
    assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
  });

  test(`every translatable string in home's ${name} has Tamil`, () => {
    const missing = assertTranslationParity(base, ta, (path) => isUntranslatable(name, path));
    assert.deepEqual(missing, [], `Tamil is missing: ${missing.join(", ")}`);
  });
}

// The overlays are merged into the base by index, so an overlay that grew or
// shrank an array would silently attach a translation to the wrong entry.
test("the overlays keep every module's array lengths", () => {
  for (const { name, base, si, ta } of MODULES) {
    for (const [locale, overlay] of [["si", si], ["ta", ta]] as const) {
      assertArrayLengths(name, locale, base as Record<string, unknown>, overlay as Record<string, unknown>);
    }
  }
});

/** Walks two parallel objects, asserting every array found matches length. */
function assertArrayLengths(moduleName: string, locale: string, base: unknown, overlay: unknown, path = ""): void {
  if (Array.isArray(base)) {
    const overlayArray = Array.isArray(overlay) ? overlay : [];
    assert.equal(overlayArray.length, base.length, `${moduleName}:${locale}:${path}`);
    base.forEach((item, index) => assertArrayLengths(moduleName, locale, item, overlayArray[index], `${path}[${index}]`));
    return;
  }
  if (base !== null && typeof base === "object") {
    for (const [key, value] of Object.entries(base as Record<string, unknown>)) {
      if (key.startsWith("__")) continue;
      const overlayValue =
        overlay !== null && typeof overlay === "object" ? (overlay as Record<string, unknown>)[key] : undefined;
      assertArrayLengths(moduleName, locale, value, overlayValue, path === "" ? key : `${path}.${key}`);
    }
  }
}

// A translation that is still the English sentence is not a translation. This
// catches a copy-paste that was never actually translated, which a parity
// check alone would happily pass. The comparison normalises case and
// surrounding whitespace before comparing, so a translation that differs from
// English only by capitalisation or by stray leading/trailing space still
// fails: JS string comparison is case-sensitive, and that gap is how
// `international-care` shipped "Bank Transfer" as a translation of "Bank
// transfer" past a green suite.
test("no translated string is left identical to its English source, ignoring case and whitespace", () => {
  for (const { name, base, si, ta } of MODULES) {
    const englishByPath = new Map<string, string>();
    collect(base, "", englishByPath);

    for (const [locale, overlay] of [["si", si], ["ta", ta]] as const) {
      const translatedByPath = new Map<string, string>();
      collect(overlay, "", translatedByPath);

      for (const [path, translated] of translatedByPath) {
        if (isUntranslatable(name, path)) continue;
        if (KEEPS_ENGLISH.has(`${name}:${path}`)) continue;
        const english = englishByPath.get(path);
        const normalize = (s: string | undefined) => s?.trim().toLowerCase();
        assert.notEqual(
          normalize(translated),
          normalize(english),
          `${name}:${locale}:${path} differs from the English only by case or whitespace, which is not a translation. If that is deliberate, add "${name}:${path}" to KEEPS_ENGLISH with a reason.`
        );
      }
    }
  }
});

test("KEEPS_ENGLISH has no stale or duplicate entries", () => {
  for (const { name, base } of MODULES) {
    const basePaths = new Set(stringPaths(base));
    for (const key of KEEPS_ENGLISH) {
      if (!key.startsWith(`${name}:`)) continue;
      const path = key.slice(name.length + 1);
      assert.ok(basePaths.has(path), `KEEPS_ENGLISH has a stale path: ${key}`);
      assert.ok(!isUntranslatable(name, path), `KEEPS_ENGLISH duplicates isUntranslatable: ${key}`);
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
