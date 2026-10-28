import { test } from "node:test";
import assert from "node:assert/strict";
import { labTests } from "../data/catalogue.ts";
import { labCatalogueSummary } from "../data/summary.ts";
import { filterTests } from "./filterTests.ts";
import { fillTemplate } from "./fillTemplate.ts";

test("filter matches name and code, ignoring case, spaces and regex characters", () => {
  assert.ok(filterTests(labTests, "  fbc ", "all").some((t) => t.code === "10073"));
  assert.ok(filterTests(labTests, "g4000", "all").some((t) => t.name.includes("CRP")));
  assert.doesNotThrow(() => filterTests(labTests, "C3 (complement)", "all"));
  assert.deepEqual(filterTests(labTests, "zzzz", "all"), []);
});

test("the turnaround bands split the list the way the controls say", () => {
  assert.equal(filterTests(labTests, "", "all").length, labTests.length);
  assert.equal(filterTests(labTests, "", "1").length, labCatalogueSummary.sameDayCount);
  assert.ok(filterTests(labTests, "", "2-4").every((t) => t.turnaroundDays >= 2 && t.turnaroundDays <= 4));
  assert.ok(filterTests(labTests, "", "7+").every((t) => t.turnaroundDays >= 7));
  assert.equal(
    filterTests(labTests, "", "1").length +
      filterTests(labTests, "", "2-4").length +
      filterTests(labTests, "", "7+").length,
    labTests.length
  );
});

test("fillTemplate formats numbers with thousands separators and leaves unknown tokens alone", () => {
  assert.equal(fillTemplate("From {p} LKR", { p: 10000 }), "From 10,000 LKR");
  assert.equal(fillTemplate("{count} tests, {x}", { count: 334 }), "334 tests, {x}");
  assert.equal(fillTemplate("Showing {n} of {total}", { n: "12", total: 334 }), "Showing 12 of 334");
});
