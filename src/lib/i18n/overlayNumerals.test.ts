import { test } from "node:test";
import assert from "node:assert/strict";
import { droppedNumerals, nonAsciiNumerals } from "./numerals.ts";
import { overlayFiles, toImportUrl, type OverlayFile } from "./overlayFiles.ts";
import { stringPaths } from "./stringPaths.ts";

/**
 * Numbers must survive translation, checked across every overlay on disk.
 *
 * Deliberately one cross-cutting walk rather than a helper each of the 16
 * per-feature test files has to remember to call. The feature tests are
 * hand-maintained lists of imports, and this project has already shipped two
 * overlays (`chromeCopy.si.ts`, `chromeCopy.ta.ts`) that no test imported at
 * all. Enumerating from the filesystem means a new feature's overlays are
 * covered by this guarantee the moment they exist, with nobody having to add
 * them anywhere. `overlayCoverage.test.ts` is what makes sure they also reach
 * the checks that DO need per-feature knowledge.
 *
 * See `numerals.ts` for the rule itself and for what it deliberately does not
 * enforce.
 */

const OVERLAYS = overlayFiles();

/**
 * A floor, not a fixed count. Adding a feature must not require editing this
 * number, but losing one must fail: a broken walk that finds nothing would
 * otherwise report a green suite having checked no overlay at all, which is
 * exactly the shape of failure this file exists to end. 82 is what is on disk
 * today (39 si and 39 ta feature and chrome overlays, plus the two form
 * validation overlays each for `contact` and `career`).
 */
const OVERLAY_FLOOR = 82;

/**
 * The overlays that are keyed by their own English source rather than laid
 * over a parallel English module.
 *
 * `navigationLabels.si.ts` and `.ta.ts` are dictionaries: `{ "Book a doctor":
 * "වෛද්‍යවරයෙක් Book කරන්න" }`, where the KEY is the English string. So the
 * English source of a value is its own key, and there is no base module to
 * read (`navigationLabels.ts` is the lookup function, and it cannot be
 * imported here anyway: it resolves `@/` alias specifiers, which Node's test
 * runner does not).
 *
 * Every other overlay is shaped: same keys and same array indices as its
 * English module, and the English source of a string is the base's string at
 * the same path.
 */
const DICTIONARY_OVERLAYS = new Set([
  "src/config/navigationLabels.si.ts",
  "src/config/navigationLabels.ta.ts",
]);

type Pair = { readonly path: string; readonly english: string; readonly translated: string };

test("the overlay walk still finds every overlay on disk", () => {
  assert.ok(
    OVERLAYS.length >= OVERLAY_FLOOR,
    `found only ${OVERLAYS.length} overlays, expected at least ${OVERLAY_FLOOR}. ` +
      `Either an overlay was deleted or the walk in overlayFiles.ts is broken.`
  );
});

for (const overlay of OVERLAYS) {
  // An overlay path with no counterpart in the base is dropped by `localize`,
  // so the translation never renders. The realistic cause is a typo in an
  // overlay key, and parity reports that against the base path, which points
  // at the wrong file. Dictionary overlays are keyed by their own English, so
  // there is no base path for them to miss.
  if (!DICTIONARY_OVERLAYS.has(overlay.relative)) {
    test(`every string in ${overlay.relative} has an English source at the same path`, async () => {
      const translated = (await import(toImportUrl(overlay.path))) as object;
      const base = await loadBase(overlay);
      const orphans = stringPaths(translated).filter((path) => typeof read(base, path) !== "string");
      assert.deepEqual(
        orphans,
        [],
        `${overlay.relative} defines ${orphans.join(", ")}, which ${overlay.baseRelative} ` +
          `does not have as a string. localize would drop it, so the translation would ` +
          `never reach the page. Check the key for a typo.`
      );
    });
  }

  test(`every number in the English survives into ${overlay.relative}`, async () => {
    for (const { path, english, translated } of await pairs(overlay)) {
      const dropped = droppedNumerals(english, translated);
      assert.deepEqual(
        dropped,
        [],
        `${overlay.relative} ${path} loses the number(s) ${dropped.join(", ")} from its ` +
          `English source. A number may move within the sentence, because word order ` +
          `differs, but its value may never change.\n  en: ${english}\n  tr: ${translated}`
      );

      const foreign = nonAsciiNumerals(translated);
      assert.deepEqual(
        foreign,
        [],
        `${overlay.relative} ${path} writes the numeral(s) ${foreign.join(" ")} in a ` +
          `non-Western script. The site keeps Western numerals in all three languages, ` +
          `which is what a reader sees on a prescription, a bill and a phone keypad.\n` +
          `  tr: ${translated}`
      );
    }
  });
}

/** Every (English, translation) pair the overlay carries, however it is keyed. */
async function pairs(overlay: OverlayFile): Promise<Pair[]> {
  const translated = await import(toImportUrl(overlay.path));
  return DICTIONARY_OVERLAYS.has(overlay.relative)
    ? dictionaryPairs(translated)
    : shapedPairs(overlay, translated);
}

/** A dictionary overlay: the English source of each value is its own key. */
function dictionaryPairs(translated: Record<string, unknown>): Pair[] {
  const found: Pair[] = [];
  for (const [name, dictionary] of Object.entries(translated)) {
    if (name.startsWith("__")) continue;
    if (dictionary === null || typeof dictionary !== "object") continue;
    for (const [english, value] of Object.entries(dictionary as Record<string, unknown>)) {
      if (typeof value === "string") found.push({ path: `${name}[${english}]`, english, translated: value });
    }
  }
  return found;
}

/**
 * The English module an overlay translates.
 *
 * A base that will not import is a failure worth being loud about: it means
 * this overlay is checked by nothing. The fix is the base's own imports
 * (relative specifiers with explicit `.ts` extensions, the way
 * `career/schemas.ts` and `chromeCopy.ts` do it), not an exception here.
 */
async function loadBase(overlay: OverlayFile): Promise<object> {
  try {
    return (await import(toImportUrl(overlay.basePath))) as object;
  } catch (error) {
    assert.fail(
      `${overlay.baseRelative} cannot be imported, so nothing checks ` +
        `${overlay.relative}: ${(error as Error).message.split("\n")[0]}`
    );
  }
}

/**
 * A shaped overlay: the English source is the base's string at the same path.
 *
 * A path the base does not have is skipped rather than failed here; the
 * per-overlay "has an English source" test above is what reports it, and
 * reporting it once with the right name is better than twice with the wrong
 * one.
 */
async function shapedPairs(overlay: OverlayFile, translated: object): Promise<Pair[]> {
  const base = await loadBase(overlay);
  return stringPaths(translated)
    .filter((path) => typeof read(base, path) === "string")
    .map((path) => ({
      path,
      english: read(base, path) as string,
      translated: read(translated, path) as string,
    }));
}

/** Follow a `stringPaths` path such as `jumpCards[0].label` back to its value. */
function read(root: unknown, path: string): unknown {
  let current: unknown = root;
  for (const step of path.split(/\.|\[|\]\.?/).filter(Boolean)) {
    if (current === null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[step];
  }
  return current;
}
