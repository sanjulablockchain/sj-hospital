import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  PLACEHOLDER_NOTICE,
  breedingSites,
  bookingChecklist,
  contactRows,
  disclaimer,
  faq,
  findings,
  followUp,
  gradeBands,
  heroFacts,
  jumpCards,
  stations,
  tickerItems,
  training,
  whyBody,
  whyHeading,
} from "./content.ts";

const source = readFileSync(fileURLToPath(new URL("./content.ts", import.meta.url)), "utf8");

/** Everything on the page that is prose the reader sees. */
const allCopy = [
  ...tickerItems,
  ...heroFacts.flatMap((f) => [f.k, f.v]),
  ...jumpCards.flatMap((c) => [c.count, c.label, c.note]),
  whyHeading,
  whyBody,
  ...findings,
  ...stations.flatMap((s) => [s.kicker, s.title, s.body, s.more]),
  ...gradeBands.flatMap((g) => [g.band, g.title, g.body]),
  ...training.flatMap((t) => [t.kicker, t.title, t.body, t.more]),
  ...breedingSites,
  ...followUp.flatMap((f) => [f.when, f.what]),
  ...faq.flatMap((f) => [f.q, f.a]),
  ...bookingChecklist,
  ...contactRows.map((c) => c.label),
  disclaimer,
].join("\n");

// ---- The placeholder notice ----
//
// This is the whole point of the file. Almost nothing on /school-wellness is
// confirmed by the hospital, and the notice is what stops it being read as
// verified fact. If someone confirms or rewrites a block, they should delete
// the notice deliberately and watch this test fail, not discover later that it
// drifted away while unverified claims stayed on the page.

test("the placeholder notice is present and unmissable", () => {
  assert.match(source, /PLACEHOLDER CONTENT, NOT YET APPROVED BY ST\. JOSEPH HOSPITAL/);
  assert.match(PLACEHOLDER_NOTICE, /^Placeholder copy, not verified\./);
});

test("the notice names every unverified block still on the page", () => {
  for (const claim of [
    // Cost and eligibility.
    /Katana and Kochchikade/,
    /per\s+student rate/,
    // Capacity and turnaround.
    /300 students/,
    /within ten days/,
    /forty five minutes/,
    // The follow-up process, the spectacle fund, the consent form.
    /followUp/,
    /spectacle fund/,
    /consent form/,
    // The clinical protocol detail and the section counts.
    /Snellen chart/,
    /nine station count/,
    /gradeBands/,
    // Teacher training beyond the half day course, and the dengue service.
    /sick room audit/,
    /dengue section/,
    // What the programme reportedly finds.
    /findings/,
  ]) {
    assert.match(PLACEHOLDER_NOTICE, claim, `the notice no longer mentions ${claim}`);
  }
});

// ---- Claims the repo can actually check ----

// The hospital's real switchboard, address and WhatsApp number, as they appear
// in components/layout/ThemedFooter. The reference happened to get these right,
// which is exactly why they are worth pinning: a later edit to the copy should
// not be able to invent a school-programme hotline.
test("the contact rail uses the hospital's published details", () => {
  const byLabel = Object.fromEntries(contactRows.map((row) => [row.label, row.href]));
  assert.equal(byLabel["0117 84 84 84"], "tel:+94117848484");
  assert.equal(byLabel["Email the hospital"], "mailto:info@sjhospital.lk");
  assert.equal(byLabel["WhatsApp us"], "https://wa.me/94742223334");
});

// A dedicated schools address or phone line would be a new fact about the
// hospital, and there is nothing in the repo to support one.
test("no separate school-programme contact is invented", () => {
  assert.ok(!/schools?@/i.test(allCopy), "the copy names a schools email address");
  const emails = allCopy.match(/[\w.+-]+@[\w.-]+/g) ?? [];
  for (const email of emails) assert.equal(email, "info@sjhospital.lk");
});

// ---- The statutory framing ----
//
// This is the claim that makes the rest of the page safe to publish: the
// programme adds to the Ministry of Health school medical inspection rather
// than standing in for it. Both the disclaimer and the first FAQ answer say so,
// and neither may quietly soften.

test("the page says it complements rather than replaces the national programme", () => {
  assert.match(disclaimer, /complements, and does not replace/);
  assert.match(disclaimer, /Ministry of Health school medical inspection/);
  assert.match(disclaimer, /Medical Officer of Health/);

  const first = faq[0];
  assert.match(first.q, /replace the government school medical inspection/);
  assert.match(first.a, /^No\b/);
  assert.match(first.a, /remains the statutory programme/);
});

// Consent and privacy are the two things a principal and a parent will look
// for. The reference committed to written consent, to opting out without being
// singled out, and to individual findings going to the parent rather than the
// staff room. Those are promises about how children are treated, so they are
// pinned rather than left to survive a copy edit.
test("the consent and privacy promises stay on the page", () => {
  const answers = faq.map((f) => f.a).join("\n");
  assert.match(answers, /Yes, in writing, before the day/);
  assert.match(answers, /is not examined/);
  assert.match(answers, /Nobody is singled out/);
  assert.match(answers, /Individual clinical findings go to the parent, not to the staff room/);
  assert.match(answers, /same sex staff member present/);
});

// ---- Counts the jump cards advertise ----

test("the jump card counts match the lists they advertise", () => {
  const byLabel = Object.fromEntries(jumpCards.map((card) => [card.label, card.count]));
  assert.equal(byLabel["The screening"], `${stations.length} stations`);
  assert.equal(byLabel["By age group"], `${gradeBands.length} bands`);
  assert.equal(byLabel["Fair questions"], `${faq.length} answers`);
});

// The headings say "Nine stations" and the reference's own copy says nine
// again inside an FAQ answer, so the grid and the prose have to agree.
test("the station count in the prose matches the station list", () => {
  assert.equal(stations.length, 9);
  assert.match(
    faq.map((f) => f.a).join("\n"),
    /nine stations running/,
    "the FAQ no longer says nine stations",
  );
});

test("every station carries the line that only appears on hover", () => {
  for (const station of stations) {
    assert.ok(station.numeral, `${station.title} is not numbered`);
    assert.match(station.kicker, /^0[1-9]$/, `${station.title} has an odd numeral`);
    assert.match(station.more, /^Catches: /, `${station.title} has no catch line`);
  }
  const numerals = stations.map((s) => s.kicker);
  assert.deepEqual(numerals, [...numerals].sort(), "the stations are out of order");
});

// ---- House style ----

test("no em dash reaches the page in any encoding", () => {
  for (const form of ["—", "&mdash;", "&#8212;", "&#x2014;"]) {
    assert.ok(!allCopy.includes(form), `copy contains ${form}`);
    assert.ok(!source.includes(form), `content.ts contains ${form}`);
  }
});
