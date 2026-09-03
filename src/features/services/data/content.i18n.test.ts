import { test } from "node:test";
import assert from "node:assert/strict";
import * as groups from "./groups.ts";
import * as groupsSi from "./groups.si.ts";
import * as groupsTa from "./groups.ta.ts";
import * as indexContent from "./indexContent.ts";
import * as indexContentSi from "./indexContent.si.ts";
import * as indexContentTa from "./indexContent.ta.ts";
import { emergencyServices } from "./emergency.ts";
import { emergencyServices as emergencySi } from "./emergency.si.ts";
import { emergencyServices as emergencyTa } from "./emergency.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * The three data files this part of the task (15, part 1 of 4) actually
 * translates: `groups.ts`, `indexContent.ts`, and the first of the six
 * group-of-services files, `emergency.ts`. `services.ts` is not here: it
 * carries no copy (see the header comment in `getContent.ts`).
 *
 * The other five group files (`surgical.ts`, `diagnostics.ts`, `clinics.ts`,
 * `womenChildren.ts`, `atHome.ts`) are OUT of scope for this part on
 * purpose and have no `.si.ts` / `.ta.ts` yet. That is not a gap this suite
 * flags: they are simply absent from `MODULES` below, the same way a
 * feature with nine data files but only one translated would list one
 * module, not nine. Parts 2 to 4 each add their own group here (see
 * `getContent.ts`'s own "TO ADD A GROUP'S TRANSLATION" comment): write
 * `<file>.si.ts` / `<file>.ta.ts`, import them at the top of this file the
 * same way `emergencyServices` is imported twice below (English, then each
 * overlay under an alias), and add one `{ name, base, si, ta }` entry to
 * `MODULES`. No other part of this file changes.
 */
const MODULES = [
  { name: "groups", base: groups, si: groupsSi, ta: groupsTa },
  { name: "indexContent", base: indexContent, si: indexContentSi, ta: indexContentTa },
  { name: "emergency", base: emergencyServices, si: emergencySi, ta: emergencyTa },
] as const;

/**
 * Facts and structural keys, not copy, in each of the three modules above.
 *
 * `groups`: `GROUPS` and `SERVICE_GROUPS` are the exact strings
 * `Service.group` is compared against everywhere in this feature (the
 * directory filter, `groupCounts`, `servicesByGroup`, `relatedServices`),
 * the same never-translate role `serviceSlugs` plays in `services.ts` for
 * URLs; `groupLabels` (NOT excluded) carries the translated word.
 *
 * `indexContent`: `.no` is an ordinal (centres, admission and international
 * steps), never prose. `.href` is a route or in-page anchor.
 * `facilityCards[*].index/.photo/.photoAlt` are the same ordinal/path/
 * photo-description class every other feature's own `.photo`/`.photoAlt`
 * excludes (see `home`'s own content.i18n.test.ts header). `phoneNumber` is
 * the hospital's own switchboard number, the same class of fact
 * `career`'s `SWITCHBOARD` and `network`'s own phone constants are.
 *
 * `emergency`: `.slug` is a URL segment (never translate, the same rule
 * `services.ts`'s `serviceSlugs` states for the whole catalog).
 * `.heroImage` is a path. `.heroAlt` describes the photo, not the service,
 * and stays English on every page (the same rule `indexContent`'s own
 * `.photoAlt` follows). `.group` is `Service.group`, the exact structural
 * value `groups.ts`'s own `GROUPS` states the rule for.
 * `steps[*].no` is the same ordinal class as `indexContent`'s `.no`.
 * `[0].facts[0].v` is accident-emergency's own ambulance number
 * ("0117 84 84 84"): a fact sitting in a `facts` row's value, the same
 * shape `contact`'s own `value` field plays, not a `k`/label that got
 * merged with its fact (see the i18n recipe's Step A2): the label
 * ("Ambulance") DOES translate/keep-English normally, only the digits are
 * excluded here.
 */
function isUntranslatable(moduleName: string, path: string): boolean {
  if (moduleName === "groups") {
    if (path.startsWith("GROUPS[")) return true;
    if (path.startsWith("SERVICE_GROUPS[")) return true;
  }
  if (moduleName === "indexContent") {
    if (path.endsWith(".no")) return true;
    if (path.endsWith(".href")) return true;
    if (path.endsWith(".index")) return true;
    if (path.endsWith(".photo")) return true;
    if (path.endsWith(".photoAlt")) return true;
    if (path === "phoneNumber") return true;
  }
  if (moduleName === "emergency") {
    if (path.endsWith(".slug")) return true;
    if (path.endsWith(".heroImage")) return true;
    if (path.endsWith(".heroAlt")) return true;
    if (path.endsWith(".group")) return true;
    if (/\.steps\[\d+\]\.no$/.test(path)) return true;
    if (path === "[0].facts[0].v") return true;
  }
  return false;
}

/**
 * Strings the translations deliberately leave in English, keyed
 * `"<module>:<path>"`.
 *
 * - `groups:groupLabels.Clinics` ("Clinic"): the same established register
 *   word `navigationLabels.si.ts` / `.ta.ts` already keep English inline in
 *   "Why school, not clinic" ("Clinic එකක් නොව පාසලක් ඇයි" /
 *   "Clinic அல்ல, பள்ளி ஏன்"). Every other sibling in `groupLabels`
 *   translates in full (Emergency, Surgical, Diagnostics, Women & children,
 *   At home), which is what makes this the sibling-test exception and not a
 *   miss.
 * - `indexContent:pharmacySection.eyebrow` ("08 / Pharmacy"): the eyebrow
 *   numeral/slash is one field with the translatable word riding along, and
 *   here that word is "Pharmacy", which this repo's `groupLabels`/
 *   `navigationLabels` already establish as a keeps-English register word
 *   wherever it stands alone. `indexContent:bookSection.eyebrow` (the "10 /"
 *   sibling) is NOT in this set: its register word is "Book", which has no
 *   such precedent, so it translates in full ("10 / වෙන් කිරීම" / "10 /
 *   முன்பதிவு", reusing `navigationLabels`'s own `FOOTER_HEADINGS.Booking`),
 *   which is the sibling-test evidence that `pharmacySection.eyebrow` is a
 *   genuine exception and not a miss.
 * - `indexContent:centres[3].lead` ("Kids & Teens protocol", the Paediatric
 *   Care centre): this programme's own named protocol, the same proper-noun
 *   class `home`'s own content.i18n.test.ts keeps English for
 *   `schoolWellness.photoCaption` ("Kids & Teens Pediatric Protocol"), not
 *   an ordinary descriptive phrase. `centres[3].name` and `.desc` both
 *   translate in full.
 * - `indexContent:diagnosticRows[3].name` ("Digital X-ray"): this site's own
 *   established register compound, the same one `home`'s own
 *   content.i18n.test.ts keeps English for `content:servicesBento.tiles[4].badge`
 *   ("/05 Digital X-ray") and `career`'s own KEEPS_ENGLISH keeps for
 *   `jobs[4].title` ("Radiographer, Digital X-ray"). Every other
 *   `diagnosticRows[*].name` DOES translate (with an English clinical noun
 *   riding along where that is the established term, e.g. "Haematology
 *   සහ Biochemistry"), which is what makes this the sibling-test exception.
 * - `indexContent:packages[0].tier` ("Essential") and
 *   `indexContent:packages[2].tier` ("Executive"): brand-style tier names,
 *   the same class `navigationLabels.si.ts` / `.ta.ts` already keeps
 *   English for room classes ("Standard", "Deluxe", "Super deluxe" -
 *   "Sri Lankan hospitals and hotels alike print them in English rather
 *   than coining an equivalent nobody uses"). `packages[1].tier`
 *   ("Most chosen") is NOT this: it is a promotional ranking label, not a
 *   tier's own name, and it does translate ("වැඩිම තෝරන" / "அதிகம்
 *   தேர்ந்தது"), which is the sibling-test evidence that Essential/
 *   Executive are genuinely a different kind of string, not a miss.
 * - `emergency:[0].strip[0].v` ("24 / 7"): purely numeral notation with no
 *   word to translate, the same class of fact `indexContent:tickerItems`
 *   and `.no` ordinals are, just sitting in a `strip` row's `v` rather than
 *   a field this test's `isUntranslatable` already excludes by name.
 * - `emergency:[0].strip[2].k` and `emergency:[0].steps[1].title` (both
 *   "Triage"): the emergency department's own operational term, stated as
 *   staying English in this file's own header comment alongside
 *   "Ambulance", "X-ray", "Theatre" and "On-call" ("Appointment" from that
 *   same list is NOT here because it always carries a translated connector,
 *   e.g. "Appointment එකක්"). Every other `strip[*].k` and `steps[*].title`
 *   on both services DOES translate, which is the sibling-test evidence
 *   this is a genuine exception.
 * - `emergency:[0].facts[0].k` and `emergency:[0].strip[3].k` (both
 *   "Ambulance", on accident-emergency, index 0 of `emergencyServices`):
 *   the same established register word `facilities`'s own overlays already
 *   use ("Ambulance", "Imaging" and "Digital X-ray" stay English throughout",
 *   per `home/data/facilities.si.ts`'s file header). Every other
 *   `facts[*].k` and `strip[*].k` on both services in this file DOES
 *   translate, which is what makes this the sibling-test exception and not
 *   a miss.
 */
const KEEPS_ENGLISH = new Set<string>([
  "groups:groupLabels.Clinics",
  "indexContent:pharmacySection.eyebrow",
  "indexContent:centres[3].lead",
  "indexContent:diagnosticRows[3].name",
  "indexContent:packages[0].tier",
  "indexContent:packages[2].tier",
  "emergency:[0].strip[0].v",
  "emergency:[0].strip[2].k",
  "emergency:[0].steps[1].title",
  "emergency:[0].facts[0].k",
  "emergency:[0].strip[3].k",
]);

for (const { name, base, si, ta } of MODULES) {
  test(`every translatable string in services' ${name} has Sinhala`, () => {
    const missing = assertTranslationParity(base, si, (path) => isUntranslatable(name, path));
    assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
  });

  test(`every translatable string in services' ${name} has Tamil`, () => {
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

/**
 * Walks two parallel objects, asserting every array found matches length.
 *
 * An array of bare structural strings (`GROUPS`, `SERVICE_GROUPS`) never
 * appears in an overlay at all: `isUntranslatable` excludes every one of its
 * elements, so `${path}[0]` alone is enough to detect "this whole array is
 * structural" and skip it, the same way `career`'s own array-length test
 * simply never lists `departments` / `DEPARTMENT_ORDER` rather than
 * special-casing them here.
 */
function assertArrayLengths(moduleName: string, locale: string, base: unknown, overlay: unknown, path = ""): void {
  if (Array.isArray(base)) {
    if (base.length > 0 && typeof base[0] === "string" && isUntranslatable(moduleName, `${path}[0]`)) return;
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

// A translation that is still the English sentence is not a translation. The
// comparison normalises case and surrounding whitespace before comparing, so
// a translation that differs from English only by capitalisation or by
// stray leading/trailing space still fails: JS string comparison is
// case-sensitive, and that gap is how `international-care` shipped
// "Bank Transfer" as a translation of "Bank transfer" past a green suite.
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
