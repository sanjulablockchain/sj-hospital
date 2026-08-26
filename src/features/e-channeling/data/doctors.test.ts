import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { CALENDLY_BASE, doctors } from "./doctors.ts";

const source = readFileSync(fileURLToPath(new URL("./doctors.ts", import.meta.url)), "utf8");

test("71 consultants across 28 specialities", () => {
  assert.equal(doctors.length, 71);
  assert.equal(new Set(doctors.map((d) => d.specialization)).size, 28);
});

// Every one of these was verified against the live Calendly og:title on
// 2026-08-26: all 71 resolve to the consultant named in the row. The slugs are
// stale clone artifacts, not a booking bug, so the old linkMismatch flag and
// the docstring calling it "a pre-existing data-quality bug" are both gone.
// This test fails if either comes back.
test("no row carries a linkMismatch flag", () => {
  assert.ok(!source.includes("linkMismatch"), "linkMismatch is back in doctors.ts");
  for (const doctor of doctors) {
    assert.ok(!("linkMismatch" in doctor), `${doctor.name} still carries the flag`);
  }
});

test("every doctor has a non-empty name, speciality and slug", () => {
  for (const doctor of doctors) {
    assert.ok(doctor.name.trim().length > 0);
    assert.ok(doctor.specialization.trim().length > 0);
    assert.ok(doctor.calendlySlug.trim().length > 0);
    assert.ok(!doctor.calendlySlug.startsWith("/"), `${doctor.name} slug is absolute`);
    assert.ok(!doctor.calendlySlug.includes(" "), `${doctor.name} slug has a space`);
  }
});

test("slugs are unique, so no two consultants share a calendar", () => {
  const slugs = doctors.map((d) => d.calendlySlug);
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
