import { test } from "node:test";
import assert from "node:assert/strict";
import { droppedNumerals, nonAsciiNumerals, numericTokens } from "./numerals.ts";

// The five defect shapes final review 3 demonstrated by mutation, each of
// which passed the whole suite before this module existed. They are pinned
// here as unit cases as well as being run against every overlay on disk by
// overlayNumerals.test.ts, so a future loosening of the tokeniser fails on a
// named example rather than only on whichever overlay happens to trip it.

test("a changed digit in a phone number is reported", () => {
  assert.deepEqual(droppedNumerals("0117 84 84 84", "0117 84 84 48"), ["84"]);
});

test("a dropped digit in a blood pressure reading is reported", () => {
  assert.deepEqual(droppedNumerals("160/100", "160/10"), ["100"]);
});

test("an altered age range is reported", () => {
  assert.deepEqual(droppedNumerals("ages 25 to 65", "වයස 52 සිට 56 දක්වා"), ["25", "65"]);
});

test("a changed magnitude in a mixed English and Sinhala string is reported", () => {
  assert.deepEqual(droppedNumerals("USD 1 million", "ඇමෙරිකානු ඩොලර් මිලියන 10"), ["1"]);
});

test("a Tamil or Sinhala numeral substituted for an ASCII one is reported twice over", () => {
  assert.deepEqual(droppedNumerals("40 years", "௪௦ ஆண்டுகள்"), ["40"]);
  assert.deepEqual(nonAsciiNumerals("௪௦ ஆண்டுகள்"), ["௪", "௦"]);
  assert.deepEqual(nonAsciiNumerals("෪෦ අවුරුදු"), ["෪", "෦"]);
});

// The properties that make the rule safe to apply to 82 overlays at once:
// a number is allowed to move, and is not allowed to change.

test("a number that moves position within the sentence is not reported", () => {
  assert.deepEqual(
    droppedNumerals("Call 0117 84 84 84 immediately", "වහාම 0117 84 84 84 අමතන්න"),
    []
  );
});

test("multiplicity is counted, so a repeated number cannot be quietly dropped", () => {
  assert.deepEqual(droppedNumerals("84 84 84", "84 84"), ["84"]);
  assert.deepEqual(droppedNumerals("84 84", "84 84 84"), []);
});

test("tokens are compared as text, so a leading zero is part of the number", () => {
  assert.deepEqual(droppedNumerals("0117", "117"), ["0117"]);
});

test("a token is a whole run of digits, so 1 is not found inside 10", () => {
  assert.deepEqual(numericTokens("160/100 and 10%"), ["160", "100", "10"]);
  assert.deepEqual(droppedNumerals("1", "10"), ["1"]);
});

test("a translation may introduce a number the English does not have", () => {
  assert.deepEqual(droppedNumerals("open around the clock", "පැය 24ම විවෘත"), []);
});

test("24/7 is the one idiom whose 7 may disappear, and its 24 may not", () => {
  assert.deepEqual(droppedNumerals("Open 24/7", "පැය 24ම විවෘත"), []);
  assert.deepEqual(droppedNumerals("Open 24/7", "විවෘත"), ["24"]);
  // Not a blanket pardon for a bare 7 elsewhere in the same string.
  assert.deepEqual(droppedNumerals("7 days, open 24/7", "පැය 24ම විවෘත"), ["7"]);
});

test("a string with no numbers reports nothing either way", () => {
  assert.deepEqual(numericTokens("Call us"), []);
  assert.deepEqual(droppedNumerals("Call us", "අපට call කරන්න"), []);
  assert.deepEqual(nonAsciiNumerals("අපට call කරන්න"), []);
});
