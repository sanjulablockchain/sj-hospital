import { test } from "node:test";
import assert from "node:assert/strict";
import { doctors } from "./doctors.ts";
import { heroFacts, helpRail, tickerItems } from "./content.ts";

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
  assert.equal(helpRail.email, "info@sjhospital.lk");
});

test("no em dash in any encoding", () => {
  const copy = [...tickerItems, ...heroFacts.flatMap((f) => [f.k, f.v]), helpRail.heading, helpRail.body];
  for (const value of copy) {
    for (const form of ["—", "&mdash;", "&#8212;", "&#x2014;"]) {
      assert.ok(!value.includes(form), `${value} contains ${form}`);
    }
  }
});
