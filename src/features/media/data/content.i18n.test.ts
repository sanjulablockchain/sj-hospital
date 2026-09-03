import { test } from "node:test";
import assert from "node:assert/strict";
import * as base from "./content.ts";
import * as si from "./content.si.ts";
import * as ta from "./content.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * What this feature refuses to translate.
 *
 * `PLACEHOLDER_NOTICE`, `MEDIA_EMAIL`, `SWITCHBOARD` and `SWITCHBOARD_TEL`
 * are top level facts, not copy a reader sees rendered as a sentence: the
 * first is a dev/test marker no component ever prints, and the other three
 * are the one press address and the one phone number this page is allowed
 * to publish, the same role `DIRECTIONS_URL` plays in `contact`'s own
 * content.i18n.test.ts. `kitRequestSubject` is a mailto `?subject=`
 * parameter, part of a link's own machinery rather than page copy, so it is
 * excluded the same way every `.href` is.
 *
 * `.href` is every jump card's anchor. `.src` is an image path and `.alt` is
 * its alt text, which stays in English on every page this plan has shipped
 * so far, the same as `accommodation`'s, `about`'s, `contact`'s and
 * `facilities`' own hero and room photos. `.fit` is a structural literal
 * ("cover" or "contain") the component switches on, the same role `.glyph`
 * plays elsewhere. `.format` is a kit row's file format list ("SVG, PNG,
 * EPS"), which is a set of format codes rather than a sentence.
 *
 * `.date` covers `news[*].date` and `featured.date`: a press date is a fact
 * with a fixed value, the same role `.price` plays in `accommodation`'s own
 * content.i18n.test.ts ("On request", "From 10,000 LKR" are facts, not
 * sentences); `featured.kickerDate` is `featured.date` at month precision
 * and shares the same reasoning, but the field is not named `.date` so it
 * is listed by its own exact path below rather than by suffix.
 *
 * `newsCategories` (the whole array, every index) and `news[*].tag` are the
 * structural category identity `NewsroomSection`'s own filter state and
 * `===` comparisons key off: translating either would silently break every
 * filter the moment a Sinhala or Tamil reader clicked a chip, the same trap
 * that blanked four icons on `contact`'s own page when `ICONS[row.label]`
 * keyed off translated text. `categoryLabels`, which is NOT excluded here,
 * carries the words a reader actually sees for the same six categories.
 */
function isUntranslatable(path: string): boolean {
  return (
    path === "PLACEHOLDER_NOTICE" ||
    path === "MEDIA_EMAIL" ||
    path === "SWITCHBOARD" ||
    path === "SWITCHBOARD_TEL" ||
    path === "kitRequestSubject" ||
    path === "featured.kickerDate" ||
    path.endsWith(".href") ||
    path.endsWith(".src") ||
    path.endsWith(".alt") ||
    path.endsWith(".fit") ||
    path.endsWith(".format") ||
    path.endsWith(".date") ||
    path.startsWith("newsCategories[") ||
    /^news\[\d+\]\.tag$/.test(path)
  );
}

/**
 * Strings the translations deliberately leave in English.
 *
 * The register is code-mixed, the way a Sri Lankan hospital site actually
 * reads: a Sinhala or Tamil sentence carrying the English nouns and terms
 * people really say (Email, Logo, Communications, Press desk's own
 * department name). Listing them by path rather than waving through any
 * English-looking string keeps each one a decision somebody made, so a
 * genuinely forgotten translation still fails the suite.
 *
 * `hero.breadcrumbCurrent` ("Media") is reused verbatim from
 * `navigationLabels.si.ts` and `.ta.ts`, where it is itself KEEPS_ENGLISH
 * for the same reason: this page's own header nav prints the untranslated
 * word "Media", so the breadcrumb has to agree with it.
 *
 * `desk[0].title` ("Corporate Communications") is the bare department name
 * with nothing else in the field. It stays English the same way
 * "Reception" and "OPD" do elsewhere on the site: `pressIntro`,
 * `spokespeopleIntro1` and two of the `rules[*].a` answers also carry
 * "Communications" or "Corporate Communications" inside a translated
 * sentence, which needs no exception here because the sentence around it
 * still changes; only this one field is nothing but the proper noun itself.
 *
 * `featured.title` and every `news[*].title` (all seventeen) are the
 * feature's own specific instruction: press release and news item titles
 * are quoted material, and translating a quotation misrepresents it. This
 * feature's `news` array has no separate field naming an outside
 * publication, so "publication names" from the same instruction has
 * nothing else to apply to here. `featured.title` restates `news[0].title`
 * verbatim, the same fact appearing twice with one home, which
 * `content.test.ts`'s own "the featured release is also in the newsroom
 * list" test already asserts on the English text.
 *
 * `topics[*].v` (all ten) is a job title, not prose: "Medical Director",
 * "Chief Pharmacist", "Director of Nursing" and the rest are institutional
 * position names, the same register that keeps "Consultant" itself in
 * English throughout this feature's own overlays. All ten rows get the
 * same treatment, so there is no odd one out translated beside nine that
 * are not; `topics[*].k`, the topic each role answers for, is ordinary
 * prose and is translated in full.
 */
const KEEPS_ENGLISH = new Set<string>([
  "hero.breadcrumbCurrent",
  "desk[0].title",
  "featured.title",
  "news[0].title",
  "news[1].title",
  "news[2].title",
  "news[3].title",
  "news[4].title",
  "news[5].title",
  "news[6].title",
  "news[7].title",
  "news[8].title",
  "news[9].title",
  "news[10].title",
  "news[11].title",
  "news[12].title",
  "news[13].title",
  "news[14].title",
  "news[15].title",
  "news[16].title",
  "topics[0].v",
  "topics[1].v",
  "topics[2].v",
  "topics[3].v",
  "topics[4].v",
  "topics[5].v",
  "topics[6].v",
  "topics[7].v",
  "topics[8].v",
  "topics[9].v",
]);

test("every translatable string in media has Sinhala", () => {
  const missing = assertTranslationParity(base, si, isUntranslatable);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every translatable string in media has Tamil", () => {
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
    assert.equal(overlay.news.length, base.news.length, `${name} news`);
    assert.equal(overlay.featured.points.length, base.featured.points.length, `${name} featured.points`);
    assert.equal(overlay.desk.length, base.desk.length, `${name} desk`);
    assert.equal(overlay.kit.length, base.kit.length, `${name} kit`);
    assert.equal(overlay.gallery.length, base.gallery.length, `${name} gallery`);
    assert.equal(overlay.topics.length, base.topics.length, `${name} topics`);
    assert.equal(overlay.rules.length, base.rules.length, `${name} rules`);
    assert.equal(overlay.jumpCards.length, base.jumpCards.length, `${name} jumpCards`);
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
