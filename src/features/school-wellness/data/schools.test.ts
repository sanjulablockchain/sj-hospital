import { test } from "node:test";
import assert from "node:assert/strict";
import * as base from "./schools.ts";
import * as si from "./schools.si.ts";
import * as ta from "./schools.ta.ts";
import { assertTranslationParity, stringPaths } from "../../../lib/i18n/stringPaths.ts";

/**
 * School names are proper names, `status` is a structural key and
 * `schoolsAsOf` is a date: none of them is copy, so no overlay translates or
 * restates them.
 */
function isUntranslatable(path: string): boolean {
  return (
    path === "schoolsAsOf" ||
    /^schools\[\d+\]\.(name|status)$/.test(path)
  );
}

const overlays = [
  ["si", si],
  ["ta", ta],
] as const;

test("the tracker of 12 October 2026: eleven schools, nine centers set up, two joining", () => {
  assert.equal(base.schools.length, 11);
  assert.equal(base.schools.filter((s) => s.status === "open").length, 9);
  assert.equal(base.schools.filter((s) => s.status === "joining").length, 2);
  assert.equal(base.schoolsAsOf, "2026-10-12");
});

test("every school is listed once", () => {
  const names = base.schools.map((s) => s.name);
  assert.equal(new Set(names).size, names.length);
});

test("schoolsAsOf is a real ISO date", () => {
  assert.match(base.schoolsAsOf, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(!Number.isNaN(new Date(base.schoolsAsOf).getTime()));
});

// The tracker's working notes and dates are internal; only public milestones
// reach the site, and an unsigned MOU is never announced.
test("no internal tracker note reaches the page", () => {
  const copy = JSON.stringify(base);
  for (const banned of [/MOU/i, /painting/i, /consent form/i, /visit scheduled/i, /\d{1,2}\/\d{1,2}\/\d{4}/]) {
    assert.ok(!banned.test(copy), `schools.ts mentions ${banned}`);
  }
});

test("a joining school claims no finished milestone", () => {
  for (const school of base.schools.filter((s) => s.status === "joining")) {
    assert.deepEqual(school.done, [], school.name);
  }
});

test("every card says something: an open school lists its center, a joining one its next step", () => {
  for (const school of base.schools) {
    if (school.status === "open") assert.equal(school.done[0], "Wellness Center set up", school.name);
    else assert.ok(school.next, school.name);
  }
});

for (const [name, overlay] of overlays) {
  test(`the ${name} overlay translates next wherever the base has one`, () => {
    overlay.schools.forEach((school, i) => {
      assert.equal("next" in school, base.schools[i].next !== undefined, `schools[${i}].next`);
    });
  });
}

for (const [name, overlay] of overlays) {
  test(`every translatable schools string has ${name}`, () => {
    const missing = assertTranslationParity(base, overlay, isUntranslatable);
    assert.deepEqual(missing, [], `${name} is missing: ${missing.join(", ")}`);
  });

  test(`the ${name} overlay keeps the base's array lengths`, () => {
    assert.equal(overlay.schools.length, base.schools.length);
    overlay.schools.forEach((school, i) => {
      const done = ("done" in school ? school.done : undefined) ?? [];
      assert.equal(done.length, base.schools[i].done.length, `schools[${i}].done`);
    });
  });

  test(`the ${name} overlay restates no name, status or date`, () => {
    const supplied = stringPaths(overlay).filter(isUntranslatable);
    assert.deepEqual(supplied, []);
  });
}
