import { test } from "node:test";
import assert from "node:assert/strict";
import { localize } from "./localize.ts";

test("a translated string replaces the English one", () => {
  assert.deepEqual(localize({ label: "Reach us" }, { label: "Sinhala here" }), {
    label: "Sinhala here",
  });
});

// The overlay only carries copy, so everything it omits has to fall through.
// A missing translation shows readable English, never an empty node.
test("anything the overlay omits falls back to English", () => {
  const base = { label: "Reach us", note: "Location, phone, WhatsApp, and email." };
  assert.deepEqual(localize(base, { label: "Sinhala here" }), {
    label: "Sinhala here",
    note: "Location, phone, WhatsApp, and email.",
  });
  assert.deepEqual(localize(base, {}), base);
  assert.deepEqual(localize(base, undefined), base);
});

test("an empty or blank overlay string is treated as no translation", () => {
  const base = { label: "Reach us" };
  assert.deepEqual(localize(base, { label: "" }), base);
  assert.deepEqual(localize(base, { label: "   " }), base);
});

// Facts and structure live only in the English file, and the overlay never
// mentions them, so the merge must not disturb them.
test("non-strings are returned untouched", () => {
  const base = {
    coords: [7.206699127328975, 79.8453343846586],
    count: 4,
    featured: true,
    missing: null,
  };
  assert.deepEqual(localize(base, { count: 9, featured: false }), base);
});

test("arrays align by index", () => {
  const base = [{ label: "One" }, { label: "Two" }, { label: "Three" }];
  assert.deepEqual(localize(base, [{ label: "Eka" }, {}, { label: "Thuna" }]), [
    { label: "Eka" },
    { label: "Two" },
    { label: "Thuna" },
  ]);
});

test("an overlay array shorter than the base leaves the tail in English", () => {
  const base = [{ label: "One" }, { label: "Two" }];
  assert.deepEqual(localize(base, [{ label: "Eka" }]), [{ label: "Eka" }, { label: "Two" }]);
});

// An overlay must never be able to add or remove entries: the English file owns
// the shape, and a longer overlay array is a mistake, not an instruction.
test("the base owns the shape, so extra overlay entries are dropped", () => {
  const base = [{ label: "One" }];
  assert.deepEqual(localize(base, [{ label: "Eka" }, { label: "Deka" }]), [{ label: "Eka" }]);
  assert.deepEqual(localize({ a: "A" }, { a: "Aa", b: "Bb" }), { a: "Aa" });
});

test("nesting is followed all the way down", () => {
  const base = { hero: { facts: [{ k: "Reception", v: "Open 24/7" }] } };
  const overlay = { hero: { facts: [{ v: "Sinhala hours" }] } };
  assert.deepEqual(localize(base, overlay), {
    hero: { facts: [{ k: "Reception", v: "Sinhala hours" }] },
  });
});

test("the English base is never mutated", () => {
  const base = { label: "Reach us", nested: { note: "Note" } };
  const before = JSON.stringify(base);
  localize(base, { label: "Sinhala here", nested: { note: "Sinhala note" } });
  assert.equal(JSON.stringify(base), before);
});
