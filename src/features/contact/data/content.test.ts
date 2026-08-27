import { test } from "node:test";
import assert from "node:assert/strict";
import { HOSPITAL_COORDS, contactRows, heroFacts, jumpCards, tickerItems } from "./content.ts";

test("four contact rows: location, phone, WhatsApp, email", () => {
  assert.equal(contactRows.length, 4);
  assert.deepEqual(
    contactRows.map((r) => r.label),
    ["Location", "Call us", "WhatsApp / Mobile", "Email"]
  );
});

// These five strings appear on this page, in ThemedFooter, and in the
// FloatingActions rail. If one drifts the site contradicts itself, so they are
// pinned rather than reviewed.
test("the hospital's real contact details, unchanged", () => {
  // Non-null assertions below: `Map#get` types as `T | undefined`, but every
  // key here is one of the four labels `contactRows` just supplied, so a
  // strict `npx tsc --noEmit` needs the assertion even though it can't miss.
  const byLabel = new Map(contactRows.map((r) => [r.label, r]));
  assert.equal(byLabel.get("Location")!.value, "229/10 St. Joseph Street");
  assert.equal(byLabel.get("Location")!.sub, "Negombo, Sri Lanka");
  assert.equal(byLabel.get("Call us")!.value, "0117 84 84 84");
  assert.equal(byLabel.get("Call us")!.href, "tel:+94117848484");
  assert.equal(byLabel.get("WhatsApp / Mobile")!.value, "074 222 333 4");
  assert.equal(byLabel.get("Email")!.value, "info@sjhospital.lk");
  assert.equal(byLabel.get("Email")!.href, "mailto:info@sjhospital.lk");
});

test("the map sits on the hospital, not a rounded guess", () => {
  assert.deepEqual(HOSPITAL_COORDS, [7.206699127328975, 79.8453343846586]);
});

test("no phone number other than the hospital's own appears anywhere", () => {
  const copy = [
    ...tickerItems,
    ...heroFacts.flatMap((f) => [f.k, f.v]),
    ...jumpCards.flatMap((c) => [c.count, c.label, c.note]),
    ...contactRows.flatMap((r) => [r.label, r.value, r.sub]),
  ].join(" ");
  const digits = copy.match(/\d[\d\s]{6,}/g) ?? [];
  for (const run of digits) {
    const bare = run.replace(/\s/g, "");
    assert.ok(
      ["0117848484", "0742223334"].includes(bare),
      `unexpected number ${run}`
    );
  }
});

test("no em dash in any encoding", () => {
  const copy = [
    ...tickerItems,
    ...jumpCards.flatMap((c) => [c.label, c.note]),
    ...contactRows.flatMap((r) => [r.label, r.value, r.sub]),
  ];
  for (const value of copy) {
    for (const form of ["—", "&mdash;", "&#8212;", "&#x2014;"]) {
      assert.ok(!value.includes(form), `${value} contains ${form}`);
    }
  }
});
