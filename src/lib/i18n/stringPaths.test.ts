import { test } from "node:test";
import assert from "node:assert/strict";
import { assertTranslationParity, stringPaths } from "./stringPaths.ts";

test("every string in a tree is named by its path", () => {
  const value = {
    heroFacts: [{ k: "Reception", v: "Open 24/7" }],
    intro: "Hello",
    count: 4,
  };
  assert.deepEqual(stringPaths(value).sort(), [
    "heroFacts[0].k",
    "heroFacts[0].v",
    "intro",
  ]);
});

test("non-strings contribute no paths", () => {
  assert.deepEqual(stringPaths({ n: 1, b: true, z: null, list: [1, 2] }), []);
});

// Module namespace objects carry the review marker, which is metadata about
// the translation rather than copy to be translated.
test("keys beginning with a double underscore are skipped", () => {
  const value = { __review: { status: "draft" }, label: "Reach us" };
  assert.deepEqual(stringPaths(value), ["label"]);
});

test("parity passes when every translatable path is present", () => {
  const base = { label: "Reach us", note: "A note" };
  const overlay = { label: "Sinhala label", note: "Sinhala note" };
  assert.deepEqual(assertTranslationParity(base, overlay, () => false), []);
});

test("parity reports exactly the paths a translation is missing", () => {
  const base = { label: "Reach us", note: "A note", extra: "Third" };
  const overlay = { label: "Sinhala label" };
  assert.deepEqual(
    assertTranslationParity(base, overlay, () => false).sort(),
    ["extra", "note"]
  );
});

// Facts and hrefs are absent from an overlay on purpose, so they must not be
// reported as gaps.
test("excluded paths are not required of a translation", () => {
  const base = { label: "Call us", value: "0117 84 84 84", href: "tel:+94117848484" };
  const overlay = { label: "Sinhala label" };
  const exclude = (path: string) => path === "value" || path.endsWith("href");
  assert.deepEqual(assertTranslationParity(base, overlay, exclude), []);
});

test("an empty translation counts as missing, not as present", () => {
  const base = { label: "Reach us" };
  assert.deepEqual(assertTranslationParity(base, { label: "   " }, () => false), ["label"]);
});

// A blank string in the English source is a bug someone should see, so it stays
// a required path rather than quietly exempting itself.
test("a blank string in the base is still a path a translation owes", () => {
  assert.deepEqual(stringPaths({ label: "", note: "A note" }).sort(), ["label", "note"]);
  assert.deepEqual(
    assertTranslationParity({ label: "" }, {}, () => false),
    ["label"]
  );
});

test("double underscore keys are skipped at any depth, not just the top", () => {
  const value = { outer: { __review: { status: "draft" }, label: "Reach us" } };
  assert.deepEqual(stringPaths(value), ["outer.label"]);
});
