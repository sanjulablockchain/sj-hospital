import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyRules,
  cleanContainer,
  overrideKey,
  priceOf,
  sentenceCaseName,
  turnaroundDays,
  type RawRow,
} from "./importRules.ts";

test("every turnaround phrase in the 2026 sheet maps to a day count", () => {
  assert.equal(turnaroundDays("0ne day"), 1);
  assert.equal(turnaroundDays(" One  days "), 1);
  assert.equal(turnaroundDays("Ten to fourteen days"), 14);
  assert.equal(turnaroundDays("Twenty one days"), 21);
  assert.throws(() => turnaroundDays("Next week"), /Unknown turnaround phrase: Next week/);
});

test("names come out in sentence case with abbreviations kept", () => {
  assert.equal(sentenceCaseName("C- REACTIVE PROTEIN ( CRP )"), "C reactive protein (CRP)");
  assert.equal(sentenceCaseName("FNAC - SLIDE ONLY"), "FNAC, slide only");
  assert.equal(sentenceCaseName("DENGUE IGM  IGG ANTIBODY"), "Dengue IgM IgG antibody");
  assert.equal(sentenceCaseName("SERUM CREATININE & EGFR"), "Serum creatinine & eGFR");
});

test("single letters, roman numerals and short bracketed codes stay uppercase", () => {
  assert.equal(sentenceCaseName("INFLUENZA     A &  B"), "Influenza A & B");
  assert.equal(sentenceCaseName("HIV I & II ANTIBODY TEST"), "HIV I & II antibody test");
  assert.equal(sentenceCaseName("WIDAL TEST (SAT)"), "Widal test (SAT)");
  assert.equal(sentenceCaseName("FSH/LH/PROLACTIN"), "FSH/LH/prolactin");
  assert.equal(sentenceCaseName("STOOL FOR OCCULT BLOOD (BLOOD)"), "Stool for occult blood (blood)");
});

test("containers keep the patient instruction", () => {
  assert.equal(cleanContainer("EDTA Tube 10- 12 hrs Fasting"), "EDTA tube, 10 to 12 hours fasting");
  assert.equal(cleanContainer("Sterlized cotton swab"), "Sterilised cotton swab");
  assert.equal(cleanContainer("Plain Tube /EDTA Tube"), "Plain tube, EDTA tube");
  assert.equal(cleanContainer("Sterilized cotton swab"), "Sterilised cotton swab");
  assert.equal(cleanContainer("Special Containers"), "Special container");
  assert.equal(cleanContainer("Sterile Container (Stool) Plain Tube (Blood)"), "Sterile container (stool), plain tube (blood)");
});

test("a zero or blank price is unpriced", () => {
  assert.equal(priceOf(0), null);
  assert.equal(priceOf(""), null);
  assert.equal(priceOf(null), null);
  assert.equal(priceOf(500), 500);
  assert.equal(priceOf("1,100"), 1100);
});

test("a repeated code is keyed by its occurrence in the sheet", () => {
  const rows: RawRow[] = [
    { code: "10134", name: "VITAMIN B 12", container: "Plain Tube", turnaround: "One day", price: 8200 },
    { code: "10134", name: "VITAMIN B12", container: "Plain Tube", turnaround: "Seven days", price: 7150 },
  ];
  const { tests } = applyRules(rows, { [overrideKey("10134", 1)]: { note: "Seven day service" } });
  assert.equal(tests[0].note, undefined);
  assert.equal(tests[1].note, "Seven day service");
  assert.equal(overrideKey("10134", 1), "10134#1");
});

test("applyRules drops excluded rows, renames, notes, and reports unused keys", () => {
  const rows: RawRow[] = [
    { code: "A1", name: "CSR MEDICAL (BOI KATUNAYAKE)", container: "Plain Tube", turnaround: "One day", price: 1000 },
    { code: "B2", name: "ANTI NEUCLEAR ANTIBODY", container: "Plain Tube", turnaround: "One day", price: 4000 },
  ];
  const { tests, unusedOverrideKeys } = applyRules(rows, {
    [overrideKey("A1", 0)]: { exclude: true, reason: "corporate package" },
    [overrideKey("B2", 0)]: { name: "Antinuclear antibody (ANA)", note: "Night service" },
    "Z9#0": { name: "x" },
  });
  assert.deepEqual(tests, [
    {
      code: "B2",
      name: "Antinuclear antibody (ANA)",
      note: "Night service",
      container: "Plain tube",
      turnaroundDays: 1,
      price: 4000,
    },
  ]);
  assert.deepEqual(unusedOverrideKeys, ["Z9#0"]);
});

// An override keyed by code and occurrence can land on a different row after
// the sheet is re-ordered; `expect` is the mechanically cleaned name the
// importer must find there, so a shifted row stops the import instead of
// renaming the wrong test.
test("an override whose expected name does not match its row stops the import", () => {
  const rows: RawRow[] = [{ code: "10134", name: "VITAMIN B 12", container: "Plain Tube", turnaround: "One day", price: 8200 }];
  assert.doesNotThrow(() => applyRules(rows, { [overrideKey("10134", 0)]: { expect: "Vitamin B 12", name: "Vitamin B12" } }));
  assert.throws(
    () => applyRules(rows, { [overrideKey("10134", 0)]: { expect: "Vitamin B12", name: "Vitamin B12" } }),
    /10134#0 expected "Vitamin B12" but the row reads "Vitamin B 12"/
  );
});
