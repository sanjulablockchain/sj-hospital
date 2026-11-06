import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { CALENDLY_BASE, doctors } from "./doctors.ts";

const source = readFileSync(fileURLToPath(new URL("./doctors.ts", import.meta.url)), "utf8");

// The hospital roster of 2026-11-06: 85 consultants carried over from the
// 2026-10-05 roster (3 dropped, see docs/consultants-removed-2026-11-06.md)
// and 2 added. Dropping the only Clinical Embryologist took a speciality with
// it.
test("87 consultants across 32 specialities", () => {
  assert.equal(doctors.length, 87);
  assert.equal(new Set(doctors.map((d) => d.specialization)).size, 32);
});

// 29 of the rows added on 2026-10-05 and both rows added on 2026-11-06 have no
// Calendly event yet (their cards offer a call and a text to the channelling
// desk instead). When a slug is filled in, lower the waiting number; when it
// reaches zero, every card that can book online does.
test("52 consultants book online, 31 still wait for a Calendly link", () => {
  assert.equal(doctors.filter((d) => d.calendlySlug).length, 52);
  assert.equal(doctors.filter((d) => !d.calendlySlug && !d.contactOnly).length, 31);
});

// Decided 2026-11-06: radiology is arranged with the desk by call or text,
// never through a Calendly event, so every radiologist is `contactOnly` and
// no other speciality is. A slug on a radiologist, or a radiologist without
// the flag, means somebody undid that decision by accident.
test("radiologists, and only radiologists, are booked by contact only", () => {
  for (const doctor of doctors) {
    const isRadiologist = doctor.specialization === "Radiologist";
    assert.equal(doctor.contactOnly === true, isRadiologist, `${doctor.name} contactOnly`);
    if (isRadiologist) assert.equal(doctor.calendlySlug, undefined, `${doctor.name} still has a slug`);
  }
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
