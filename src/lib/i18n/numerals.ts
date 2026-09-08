/**
 * Numeric integrity between an English string and its translation.
 *
 * Translations are drafted, not transcribed, and a digit is the one thing in a
 * sentence a non-speaker reviewer can still check mechanically. The site's
 * emergency copy carries the hospital's own ambulance number inside a
 * translated instruction, blood pressure thresholds inside a warning, and age
 * bands inside a screening table. A single transposed digit there is a wrong
 * number on a medical instruction, and no parity or identity check sees it:
 * both sides are non-blank and the strings differ, which is all those checks
 * ask for.
 *
 * ## The rule this module implements
 *
 * Every numeric token in the English string must still be present in the
 * translation. The comparison is a MULTISET, not a sequence: Sinhala and Tamil
 * word order differs from English, so "call 0117 84 84 84 immediately" can
 * legitimately become "immediately 0117 84 84 84 call", and a positional
 * comparison would reject that correct translation. What may never change is a
 * VALUE, so the tokens are compared by how many of each appear, ignoring where
 * they appear. `84` appearing three times in the English and twice in the
 * translation is a defect even though the set of distinct tokens is unchanged,
 * which is why this counts multiplicity rather than using a Set.
 *
 * A token is a maximal run of ASCII digits, compared as text rather than as a
 * number, so `0117` and `117` are different tokens: the leading zero is part
 * of the number a reader dials. Whole runs also mean `1` is not found inside
 * `10`, so "USD 1 million" rendered as "මිලියන 10" fails.
 *
 * Punctuation between digits is not part of a token, so `160/100` yields
 * `160` and `100` and `160/10` yields `160` and `10`, which differ. Splitting
 * on the separator rather than keeping `160/100` whole is deliberate: a
 * translation may reformat `24/7` or `1,000` around its own punctuation
 * without changing either number.
 *
 * ## What is NOT enforced, and why
 *
 * A translation may introduce a numeral the English does not have, and 71
 * strings on the site legitimately do: "around the clock" and "at every hour"
 * both read naturally in Sinhala and Tamil as "පැය 24" / "24 மணி நேரம்", and
 * "two doctors" as "2". Requiring equality rather than containment would mean
 * 71 per-path opt-outs, a list too long for anyone to read, which is the sort
 * of exception list that stops being a decision and becomes noise. The
 * companion guard against a fact being invented in an overlay is the
 * "no overlay supplies a value at an untranslatable path" test each feature
 * carries: facts (phone numbers, prices, counts, hrefs) have exactly one home
 * in the English module and an overlay may not restate them at all.
 */

/**
 * `24/7` is an English idiom, not two facts. Both target languages render it
 * as "24 hours" (`පැය 24`, `24 மணி நேரம்`), so the `7` legitimately
 * disappears; 26 strings across 8 features do exactly that. Rewriting the
 * English before tokenising excuses that one idiom by rule instead of listing
 * 26 paths, and it excuses nothing else: only the `7` of a literal `24/7`
 * goes, and the `24` is still required.
 *
 * This is the only rewrite. Anything else that vanishes from a translation is
 * reported.
 */
const ENGLISH_IDIOMS: readonly (readonly [RegExp, string])[] = [[/24\/7/g, "24"]];

/** Every maximal run of ASCII digits, in the order it appears. */
export function numericTokens(value: string): string[] {
  return value.match(/[0-9]+/g) ?? [];
}

/**
 * The numeric tokens the English has that the translation does not, counting
 * multiplicity: `["84"]` means the translation is one `84` short of the
 * English, whatever order either string puts its numbers in.
 *
 * An empty array means every number in the English survived translation.
 */
export function droppedNumerals(english: string, translated: string): string[] {
  let source = english;
  for (const [pattern, replacement] of ENGLISH_IDIOMS) source = source.replace(pattern, replacement);

  const remaining = numericTokens(translated);
  const dropped: string[] = [];

  for (const token of numericTokens(source)) {
    const at = remaining.indexOf(token);
    if (at === -1) dropped.push(token);
    else remaining.splice(at, 1);
  }

  return dropped;
}

/**
 * Every numeral in the string that is not an ASCII digit: Sinhala `෦ ෧ ෨`,
 * Tamil `௦ ௧ ௨` and their number signs, Devanagari, Arabic-Indic, and the
 * enclosed and fraction forms.
 *
 * This is a defect in its own right, not only a comparison problem. The site's
 * register keeps Western numerals in all three languages, which is what Sri
 * Lankan readers see on a prescription, a bill and a phone keypad, so a
 * Tamil-script numeral in an overlay is wrong copy even where the value is
 * right. It also has to be caught separately from `droppedNumerals`, because
 * JavaScript's `\d` is ASCII-only: a substituted `௪௦` reads to a digit regex
 * as ordinary letters, so the English `40` would look merely dropped without
 * anything saying why.
 */
export function nonAsciiNumerals(value: string): string[] {
  return [...value].filter((char) => /[\p{Nd}\p{Nl}\p{No}]/u.test(char) && !/[0-9]/.test(char));
}
