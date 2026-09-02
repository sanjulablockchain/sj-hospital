import { test } from "node:test";
import assert from "node:assert/strict";
import * as base from "./content.ts";
import * as si from "./content.si.ts";
import * as ta from "./content.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * What this feature refuses to translate.
 *
 * `href` is every anchor target. `slug` and `logo` are structural: the React
 * key and the logo file path, never copy. `n` is the stat number on each
 * `#reach` row ("9", "25+", "2010"), a fact rather than prose. `glyph` is
 * which character a `#contact` row shows, a name the code switches on rather
 * than copy. `internal` is a boolean, not copy. `value` is the fact a
 * contact row carries alongside its own translatable `label` (only the
 * phone row has one: the hospital's own number), the same role `contact`'s,
 * `accommodation`'s, `home-care`'s and `pharmacy`'s own `value` fields play,
 * so it stays untranslated the same way `href` does. `PLACEHOLDER_NOTICE` is
 * excluded entirely: it is internal review documentation asserted verbatim
 * by content.test.ts, and no component on this page ever renders it to a
 * reader.
 */
function isUntranslatable(path: string): boolean {
  return (
    path === "PLACEHOLDER_NOTICE" ||
    path.endsWith(".href") ||
    path.endsWith(".slug") ||
    path.endsWith(".logo") ||
    path.endsWith(".n") ||
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
 * product-adjacent or brand-adjacent names people really say (Emergency,
 * OPD, Telemedicine, Pharmacy, Insurance, Reception, WhatsApp, X-ray). "Los
 * Angeles" and "California" (and every abbreviation of the first, "LA" and
 * "Greater LA") also stay in English wherever they appear inside an
 * otherwise-translated sentence, the same way "St. Joseph Street" stays
 * untranslated in `contact`'s own overlays: they are the group's own
 * American cities, not places a Sri Lankan reader would expect rewritten in
 * Sinhala or Tamil script. Neither is listed here path by path, because
 * neither ever leaves a whole field identical to its English source (see the
 * "identical to English" test below); only a field that would otherwise be
 * indistinguishable from a forgotten translation is.
 *
 * Every remaining entry below is this page's own company names, addresses
 * and domains: proper nouns that never change script, the same way the
 * hospital's own name never does. `tickerItems` is the marquee of the other
 * eight companies in the group, so all eight are company names outright.
 * `heroFacts[0].v` is the parent company's own name. Each org's `wordmark`
 * and `name` is that company's own name, exactly as `ktdoctor.com/network`
 * prints it; recasting "Kids & Teens Medical Group" into Sinhala or Tamil
 * letters would not be a translation, it would be a different name. Each
 * org's `cta` is either "This hospital" (translated below, since it is a
 * statement rather than a name) or the literal domain the card links to
 * ("acig.lk", "ktdoctor.com", and so on), which content.test.ts pins against
 * the href on the same row and so can never be recast either.
 *
 * The last group of entries is a handful of individual chips. "Telemedicine",
 * "Telehealth" (x3) and "Speech therapy" were excused here too until a
 * review applied the sibling test: every other chip in each of those arrays
 * gets a translation or a code-mixed connector, and this page's own
 * `reachRows[6].who` translates "Speech" to "කථන" / "பேச்சு" two sections
 * further down the same overlay file while the LAIPT chip claimed "Speech
 * therapy" had no equivalent. Both claims did not hold, so all five are now
 * translated in the code-mixed register their siblings use ("Telemedicine
 * සත්කාර" / "Telemedicine சிகிச்சை", "Telehealth සත්කාර" / "Telehealth
 * சிகிச்சை", "කථන Therapy" / "பேச்சு Therapy") and removed from this set.
 *
 * "Occupational therapy" and "Sensory integration" are clinical
 * therapy-service names a Sri Lankan therapist says in English, the same
 * reason pharmacy's `stock[].name` keeps dosage-form English names
 * ("Antibiotics", "Chronic medicine"). "Occupational" is a more specialised
 * clinical modifier than "Speech" or "Developmental", without the same
 * everyday one-word equivalent, which is why `reachRows[6].who` also keeps
 * it in English while translating its two neighbours: the chip and the
 * reach row agree with each other now, rather than contradicting. "Paediatric
 * HMO/IPA" is a US insurance-scheme acronym with nothing to translate.
 */
const KEEPS_ENGLISH = new Set<string>([
  // The other eight companies in the group, exactly as ktdoctor.com/network
  // names them.
  "tickerItems[0]",
  "tickerItems[1]",
  "tickerItems[2]",
  "tickerItems[3]",
  "tickerItems[4]",
  "tickerItems[5]",
  "tickerItems[6]",
  "tickerItems[7]",

  // The parent company's own name.
  "heroFacts[0].v",

  // Sri Lanka group: St. Joseph Hospital (this site) and ACIG.
  "orgGroups[0].orgs[0].wordmark",
  "orgGroups[0].orgs[0].name",
  "orgGroups[0].orgs[1].wordmark",
  "orgGroups[0].orgs[1].name",
  "orgGroups[0].orgs[1].cta",

  // California group: Kids & Teens, St. Gianna, LAIPT, Serendib Healthways,
  // After-Hours Pediatric Urgent Care.
  "orgGroups[1].orgs[0].wordmark",
  "orgGroups[1].orgs[0].name",
  "orgGroups[1].orgs[0].cta",
  "orgGroups[1].orgs[1].wordmark",
  "orgGroups[1].orgs[1].name",
  "orgGroups[1].orgs[1].cta",
  "orgGroups[1].orgs[2].wordmark",
  "orgGroups[1].orgs[2].name",
  "orgGroups[1].orgs[2].cta",
  "orgGroups[1].orgs[3].wordmark",
  "orgGroups[1].orgs[3].name",
  "orgGroups[1].orgs[3].cta",
  "orgGroups[1].orgs[4].wordmark",
  "orgGroups[1].orgs[4].name",
  "orgGroups[1].orgs[4].cta",

  // Business and support group: Human Compass MSO, Blockchain BPO.
  "orgGroups[2].orgs[0].wordmark",
  "orgGroups[2].orgs[0].name",
  "orgGroups[2].orgs[0].cta",
  "orgGroups[2].orgs[1].wordmark",
  "orgGroups[2].orgs[1].name",
  "orgGroups[2].orgs[1].cta",

  // A handful of individual chips: clinical therapy-service names and a US
  // insurance-scheme acronym with nothing to translate. See the comment
  // above.
  "orgGroups[1].orgs[2].chips[1]", // Occupational therapy, LAIPT
  "orgGroups[1].orgs[2].chips[2]", // Sensory integration, LAIPT
  "orgGroups[1].orgs[3].chips[0]", // Paediatric HMO/IPA, Serendib Healthways
]);

test("every translatable string in network has Sinhala", () => {
  const missing = assertTranslationParity(base, si, isUntranslatable);
  assert.deepEqual(missing, [], `Sinhala is missing: ${missing.join(", ")}`);
});

test("every translatable string in network has Tamil", () => {
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
    assert.equal(overlay.practice.length, base.practice.length, `${name} practice`);
    assert.equal(overlay.orgGroups.length, base.orgGroups.length, `${name} orgGroups`);
    assert.equal(overlay.reachRows.length, base.reachRows.length, `${name} reachRows`);
    assert.equal(overlay.referrals.length, base.referrals.length, `${name} referrals`);
    assert.equal(overlay.contactRows.length, base.contactRows.length, `${name} contactRows`);
    for (let i = 0; i < base.orgGroups.length; i++) {
      assert.equal(
        overlay.orgGroups[i].orgs.length,
        base.orgGroups[i].orgs.length,
        `${name} orgGroups[${i}].orgs`,
      );
      for (let j = 0; j < base.orgGroups[i].orgs.length; j++) {
        assert.equal(
          overlay.orgGroups[i].orgs[j].chips.length,
          base.orgGroups[i].orgs[j].chips.length,
          `${name} orgGroups[${i}].orgs[${j}].chips`,
        );
      }
    }
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
