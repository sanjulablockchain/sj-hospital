import { test } from "node:test";
import assert from "node:assert/strict";
import { LAB_CATALOGUE_YEAR, labTests } from "./catalogue.ts";
import { labOverrides } from "./overrides.ts";
import { labCatalogueSummary, summarise } from "./summary.ts";

const DAY_COUNTS = [1, 2, 3, 4, 7, 10, 14, 21];

test("the catalogue is the 2026 sheet", () => {
  assert.equal(LAB_CATALOGUE_YEAR, 2026);
  assert.ok(labTests.length >= 330, `only ${labTests.length} tests`);
});

test("every test has a code, a sentence case name, a container and a day count", () => {
  for (const t of labTests) {
    assert.ok(t.code, `${t.name} has no code`);
    assert.ok(t.name, `${t.code} has no name`);
    assert.ok(!/[A-Z]{6,}/.test(t.name), `${t.code} is still uppercase: ${t.name}`);
    assert.ok(!/\( | \)| - /.test(t.name), `${t.code} has loose punctuation: ${t.name}`);
    assert.ok(t.container, `${t.name} has no container`);
    assert.ok(DAY_COUNTS.includes(t.turnaroundDays), `${t.name}: ${t.turnaroundDays} days`);
  }
});

test("the summary is derived from the list, and the lowest price is a real test", () => {
  assert.equal(labCatalogueSummary.fromPrice, 350);
  assert.equal(labCatalogueSummary.count, labTests.length);
  assert.equal(labCatalogueSummary.year, LAB_CATALOGUE_YEAR);
  assert.ok(labCatalogueSummary.sameDayCount > 200, `${labCatalogueSummary.sameDayCount} same day`);
  assert.ok(labTests.every((t) => t.price === null || t.price >= 350));
  assert.deepEqual(
    summarise([{ code: "x", name: "X", container: "c", turnaroundDays: 2, price: null }], 2030),
    { count: 1, fromPrice: 0, sameDayCount: 0, year: 2030 }
  );
});

test("no excluded row ships and every override key still names a code in the sheet", () => {
  const codes = new Set(labTests.map((t) => t.code));
  for (const [key, override] of Object.entries(labOverrides)) {
    const code = key.split("#")[0];
    if (override.exclude) {
      assert.ok(!labTests.some((t) => t.name.toLowerCase().includes("csr medical")), "the corporate package shipped");
    } else {
      assert.ok(codes.has(code), `override ${key} matches no test`);
    }
  }
});

test("a note is short", () => {
  for (const t of labTests) if (t.note) assert.ok(t.note.length <= 24, `${t.name}: ${t.note}`);
});
