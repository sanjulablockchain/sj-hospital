import { test } from "node:test";
import assert from "node:assert/strict";
import * as content from "./content.ts";
import { contactRows, DIRECTIONS_URL, HOSPITAL_COORDS } from "./content.ts";

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
  const byLabel = new Map(contactRows.map((r) => [r.label, r]));
  assert.equal(byLabel.get("Location")?.value, "229/10 St. Joseph Street");
  assert.equal(byLabel.get("Location")?.sub, "Negombo, Sri Lanka");
  assert.equal(byLabel.get("Call us")?.value, "0117 84 84 84");
  assert.equal(byLabel.get("Call us")?.href, "tel:+94117848484");
  assert.equal(byLabel.get("WhatsApp / Mobile")?.value, "074 222 333 4");
  assert.equal(byLabel.get("Email")?.value, "info@sjhospital.lk");
  assert.equal(byLabel.get("Email")?.href, "mailto:info@sjhospital.lk");
});

test("the map sits on the hospital, not a rounded guess", () => {
  assert.deepEqual(HOSPITAL_COORDS, [7.206699127328975, 79.8453343846586]);
});

// FIX 5c: every string export in this module, gathered by reflection rather
// than by hand, so a newly added export cannot be silently missed. The
// hand-maintained arrays the two scans below used to build separately both
// missed `reachIntro`, `messageIntro`, `mapIntro`, `heroStandfirst` and
// `DIRECTIONS_URL`, the same bug class an equivalent fix closed in
// accommodation/data/content.test.ts. `HOSPITAL_COORDS` is a numeric tuple,
// not copy, and needs no special-casing: `collectStrings` only ever keeps
// strings, so it drops out on its own.
function collectStrings(value: unknown, seen: Set<object> = new Set()): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap((entry) => collectStrings(entry, seen));
  if (value !== null && typeof value === "object") {
    if (seen.has(value)) return [];
    seen.add(value);
    return Object.values(value).flatMap((entry) => collectStrings(entry, seen));
  }
  return [];
}

const allCopy: string[] = Object.values(content).flatMap((value) => collectStrings(value));

// DIRECTIONS_URL bakes the hospital's map coordinate into its query string
// (also reachable via contactRows[0].href, the same string): a long digit run
// that is not a phone number and would fail the allow-list below for a reason
// that has nothing to do with a wrong phone number. Every other string this
// module exports can only ever be a real contact detail or ordinary prose, so
// the digit scan runs over everything except this one value (precedent:
// about/data/content.test.ts's "Ruling A" carve-out for `jumpCards[].count`).
const allCopyForPhoneScan = allCopy.filter((value) => value !== DIRECTIONS_URL);

// The reflection-built `allCopy` sweeps in `contactRows[].href` too
// ("tel:+94117848484", "tel:+94742223334"), which the old hand-picked array
// never scanned: those hrefs spell the same two numbers with the country code
// in place of the leading 0, so both forms are allowed. Widening the scan to
// hrefs is a strict improvement over the old test, not a loosened one: a typo
// inside an href now fails this suite too.
const allowedPhoneDigits = ["0117848484", "0742223334", "94117848484", "94742223334"];

test("no phone number other than the hospital's own appears anywhere", () => {
  const copy = allCopyForPhoneScan.join(" ");
  const digits = copy.match(/\d[\d\s]{6,}/g) ?? [];
  for (const run of digits) {
    const bare = run.replace(/\s/g, "");
    assert.ok(
      allowedPhoneDigits.includes(bare),
      `unexpected number ${run}`
    );
  }
});

test("no em dash in any encoding", () => {
  for (const value of allCopy) {
    for (const form of ["—", "&mdash;", "&#8212;", "&#x2014;"]) {
      assert.ok(!value.includes(form), `${value} contains ${form}`);
    }
  }
});
