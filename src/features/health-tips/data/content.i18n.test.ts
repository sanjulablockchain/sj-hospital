import { test } from "node:test";
import assert from "node:assert/strict";
import * as dengue from "./dengue.ts";
import * as dengueSi from "./dengue.si.ts";
import * as dengueTa from "./dengue.ta.ts";
import * as firstAid from "./firstAid.ts";
import * as firstAidSi from "./firstAid.si.ts";
import * as firstAidTa from "./firstAid.ta.ts";
import * as library from "./library.ts";
import * as librarySi from "./library.si.ts";
import * as libraryTa from "./library.ta.ts";
import * as myths from "./myths.ts";
import * as mythsSi from "./myths.si.ts";
import * as mythsTa from "./myths.ta.ts";
import * as pageContent from "./pageContent.ts";
import * as pageContentSi from "./pageContent.si.ts";
import * as pageContentTa from "./pageContent.ta.ts";
import * as screening from "./screening.ts";
import * as screeningSi from "./screening.si.ts";
import * as screeningTa from "./screening.ta.ts";
import * as warnings from "./warnings.ts";
import * as warningsSi from "./warnings.si.ts";
import * as warningsTa from "./warnings.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * The seven data files task 16 translates, each treated as one module (the
 * same way `contact`'s single `content.ts` is one module): every export in
 * the file, walked as one namespace object, the same shape `localize` merges
 * in `getContent.ts`.
 */
const MODULES = [
  { name: "dengue", base: dengue, si: dengueSi, ta: dengueTa },
  { name: "firstAid", base: firstAid, si: firstAidSi, ta: firstAidTa },
  { name: "library", base: library, si: librarySi, ta: libraryTa },
  { name: "myths", base: myths, si: mythsSi, ta: mythsTa },
  { name: "pageContent", base: pageContent, si: pageContentSi, ta: pageContentTa },
  { name: "screening", base: screening, si: screeningSi, ta: screeningTa },
  { name: "warnings", base: warnings, si: warningsSi, ta: warningsTa },
] as const;

/**
 * Facts and structural keys, not copy, in each module.
 *
 * `firstAid`: `emergencyNumbers[*].number` and `.tel` are the hospital's,
 * the pharmacy's and the two national lines' own digits (a `tel:` fact, not
 * copy); the task's own rule is that every number stays exactly as the
 * English has it, so these never carry a translation at all, matching
 * `EmergencyNumber.tel`'s existing "lines we own" comment.
 *
 * `library`: `CATEGORIES` and `TIP_CATEGORIES` are the exact English values
 * the filter buttons compare against and `categoryCounts()` keys its result
 * by (the same never-translate role `groups.ts`'s own `GROUPS` plays for
 * `Service.group`); `categoryLabels` (NOT excluded) carries the translated
 * word. `.tag` on every article and on `featured` is the same structural
 * value, looked up in `categoryLabels` for display rather than shown
 * directly.
 *
 * `pageContent`: `jumpCards[*].href` is an in-page anchor. `bookSection.
 * actions[*].href` is a route, a `tel:` link or an external URL; `.glyph` is
 * a structural key ("arrow" / "phone") the component maps to a glyph, not
 * copy; `.value` is the one action that carries a fact (the hospital's own
 * number) rather than only an action phrase, the same "fact in a `value`,
 * not the `label`" shape `facilities/data/content.ts`'s own `contactRows`
 * already uses.
 *
 * `warnings`: `WARNING_LEVELS` is the exact English value every `Warning.
 * level` carries and `LEVEL_TONE` is keyed by (the same never-translate role
 * `groups.ts`'s own `GROUPS` plays); `LEVEL_LABELS` (NOT excluded) carries
 * the translated badge text, looked up by `WarningSection` instead of
 * displaying `warning.level` itself.
 */
function isUntranslatable(moduleName: string, path: string): boolean {
  if (moduleName === "firstAid") {
    if (/^emergencyNumbers\[\d+\]\.(number|tel)$/.test(path)) return true;
  }
  if (moduleName === "library") {
    if (path.startsWith("CATEGORIES[")) return true;
    if (path.startsWith("TIP_CATEGORIES[")) return true;
    if (path.endsWith(".tag")) return true;
  }
  if (moduleName === "pageContent") {
    if (/^jumpCards\[\d+\]\.href$/.test(path)) return true;
    if (/^bookSection\.actions\[\d+\]\.(href|glyph|value)$/.test(path)) return true;
  }
  if (moduleName === "warnings") {
    if (path.startsWith("WARNING_LEVELS[")) return true;
    if (path.startsWith("LEVEL_TONE.")) return true;
    if (path.endsWith(".level")) return true;
  }
  return false;
}

/**
 * Strings the translations deliberately leave in English, keyed
 * `"<module>:<path>"`.
 *
 * - `library:articles[19].by` and `library:articles[20].by` ("Pharmacy",
 *   "Physiotherapy"): both are on `navigationLabels.si.ts`'s / `.ta.ts`'s
 *   own established English-stays list (`Pharmacy`; `Physiotherapy` is kept
 *   bare throughout `facilities`, `international-care` and `media`'s own
 *   overlays, and the services feature's own `clinics.si.ts`/`.ta.ts`), the
 *   same class "Media" already is. `library:articles[22].by` (the second
 *   "Physiotherapy" byline) is the same word, same reason.
 * - Every other `articles[*].by` DOES translate (team names such as
 *   "Emergency team", "Paediatrics" and "Nephrology" all carry a Sinhala or
 *   Tamil form), which is the sibling-test evidence that these three are a
 *   genuine exception and not a miss.
 */
const KEEPS_ENGLISH = new Set<string>([
  "library:articles[19].by",
  "library:articles[20].by",
  "library:articles[22].by",
]);

for (const { name, base, si, ta } of MODULES) {
  test(`every translatable string in health-tips' ${name} has Sinhala`, () => {
    const missing = assertTranslationParity(base, si, (path) => isUntranslatable(name, path));
    assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
  });

  test(`every translatable string in health-tips' ${name} has Tamil`, () => {
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
  if (typeof base === "function") return;
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

/** Every string in a value, keyed by the same paths `stringPaths` reports. */
function collect(value: unknown, prefix: string, into: Map<string, string>) {
  for (const path of stringPaths(value, prefix)) {
    into.set(path, read(value, path));
  }
}

/** Follow a `stringPaths` path such as `articles[0].title` back to its value. */
function read(root: unknown, path: string): string {
  let current: unknown = root;
  for (const step of path.split(/\.|\[|\]\.?/).filter(Boolean)) {
    current = (current as Record<string, unknown>)[step];
  }
  return current as string;
}
