import { test } from "node:test";
import assert from "node:assert/strict";
import { doctors } from "./doctors.ts";
import { bookExcerpt, heroFacts, helpRail, tickerItems } from "./content.ts";

// The hero states these counts and the directory computes them from the same
// array. If they disagree the page contradicts itself in the first screen.
test("the hero's counts are computed from the doctor list, not typed in", () => {
  const specialities = new Set(doctors.map((d) => d.specialization)).size;
  const facts = new Map(heroFacts.map((f) => [f.k, f.v]));
  assert.equal(facts.get("Consultants"), String(doctors.length));
  assert.equal(facts.get("Specialities"), String(specialities));
});

test("the help rail offers the hospital's own desk only", () => {
  assert.equal(helpRail.phone, "0117 84 84 84");
  assert.equal(helpRail.phoneHref, "tel:+94117848484");
  assert.equal(helpRail.whatsapp, "074 222 333 4");
  assert.equal(helpRail.whatsappHref, "https://wa.me/94742223334");
  assert.equal(helpRail.email, "appointments@sjhospital.lk");
});

test("no em dash in any encoding", () => {
  const copy = [...tickerItems, ...heroFacts.flatMap((f) => [f.k, f.v]), helpRail.heading, helpRail.body];
  for (const value of copy) {
    for (const form of ["—", "&mdash;", "&#8212;", "&#x2014;"]) {
      assert.ok(!value.includes(form), `${value} contains ${form}`);
    }
  }
});

// Super Channelling is page 11 of the 2026 Service Book. It has no service
// page of its own, so its excerpt is quoted here, on /e-channeling, with the
// two numbers the book prints (both lines are in use, owner 2026-11-20).
test("the Super Channelling excerpt quotes page 11 of the Service Book", () => {
  assert.equal(bookExcerpt.page, 11);
  const facts = new Map(bookExcerpt.facts.map((f) => [f.k, f.v]));
  assert.equal(facts.get("Call"), "031 784 84 84");
  assert.equal(facts.get("WhatsApp"), "076 422 8898");
  assert.equal(bookExcerpt.why.length, 3);
});
