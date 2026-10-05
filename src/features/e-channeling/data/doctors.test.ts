import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { CALENDLY_BASE, doctors } from "./doctors.ts";

const source = readFileSync(fileURLToPath(new URL("./doctors.ts", import.meta.url)), "utf8");

// The hospital roster of 2026-10-05: 57 consultants carried over, 31 added.
test("88 consultants across 33 specialities", () => {
  assert.equal(doctors.length, 88);
  assert.equal(new Set(doctors.map((d) => d.specialization)).size, 33);
});

// The 31 added on 2026-10-05 have no Calendly event yet (their cards dial the
// channelling desk instead). When a slug is filled in, lower this number; when
// it reaches 57 + 31 = 88, every card books online.
test("57 consultants book online, 31 still wait for a Calendly link", () => {
  assert.equal(doctors.filter((d) => d.calendlySlug).length, 57);
});

// Every one of the slugs of the time was verified against the live Calendly
// og:title on 2026-08-26: all 71 resolved to the consultant named in the row. The slugs are
// stale clone artifacts, not a booking bug, so the old linkMismatch flag and
// the docstring calling it "a pre-existing data-quality bug" are both gone.
// This test fails if either comes back.
test("no row carries a linkMismatch flag", () => {
  assert.ok(!source.includes("linkMismatch"), "linkMismatch is back in doctors.ts");
  for (const doctor of doctors) {
    assert.ok(!("linkMismatch" in doctor), `${doctor.name} still carries the flag`);
  }
});

test("every doctor has a non-empty name and speciality, and any slug is well formed", () => {
  for (const doctor of doctors) {
    assert.ok(doctor.name.trim().length > 0);
    assert.ok(doctor.specialization.trim().length > 0);
    if (doctor.calendlySlug === undefined) continue;
    assert.ok(doctor.calendlySlug.trim().length > 0, `${doctor.name} slug is blank`);
    assert.ok(!doctor.calendlySlug.startsWith("/"), `${doctor.name} slug is absolute`);
    assert.ok(!doctor.calendlySlug.includes(" "), `${doctor.name} slug has a space`);
  }
});

test("names are unique, so a search never shows a consultant twice", () => {
  const names = doctors.map((d) => d.name);
  assert.equal(new Set(names).size, names.length);
});

// The roster this list comes from carries fees, qualifications and personal
// mobile numbers, several marked "Do not give the number". None of it is
// published: a nine-digit run or a "Rs" price in doctors.ts means it leaked.
test("no phone number or fee from the roster reaches the page", () => {
  assert.ok(!/d{9}/.test(source), "doctors.ts contains a phone-number-like digit run");
  assert.ok(!/Rs.?s*d|LKR/i.test(source), "doctors.ts contains a fee");
});

test("slugs are unique, so no two consultants share a calendar", () => {
  const slugs = doctors.flatMap((d) => (d.calendlySlug ? [d.calendlySlug] : []));
  assert.equal(new Set(slugs).size, slugs.length);
});

test("the Calendly base is the hospital's own account", () => {
  assert.equal(CALENDLY_BASE, "https://calendly.com/appointments-sjhospital/");
});

test("no em dash in any consultant name or speciality", () => {
  for (const value of doctors.flatMap((d) => [d.name, d.specialization])) {
    for (const form of ["—", "&mdash;", "&#8212;", "&#x2014;"]) {
      assert.ok(!value.includes(form), `${value} contains ${form}`);
    }
  }
});
