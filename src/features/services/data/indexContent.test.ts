import { test } from "node:test";
import assert from "node:assert/strict";
import {
  centres,
  jumpCards,
  surgicalRows,
  diagnosticRows,
  packages,
  admissionSteps,
  bringWithYou,
  paymentNotes,
  comforts,
  internationalSteps,
} from "./indexContent.ts";

test("nine centres of excellence, numbered 01-09", () => {
  assert.equal(centres.length, 9);
  assert.deepEqual(
    centres.map((c) => c.no),
    ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
  );
});

test("four jump cards, each anchoring to a section on this page", () => {
  assert.equal(jumpCards.length, 4);
  for (const c of jumpCards) assert.match(c.href, /^#[a-z]+$/);
});

test("the directory jump card count stays consistent with 36 services", () => {
  const directory = jumpCards.find((c) => c.href === "#directory");
  assert.ok(directory, "no jump card anchors #directory");
  assert.match(directory.count, /36 services/);
});

test("three package tiers, none of them priced", () => {
  assert.equal(packages.length, 3);
  for (const p of packages) {
    assert.ok(p.items.length >= 4);
    const text = [p.tier, p.name, ...p.items].join(" ");
    assert.ok(!/\b\d{1,3},\d{3}\b|LKR|Rs\.?/i.test(text), `${p.name} is priced`);
    assert.match(p.ctaLabel, /quote/i);
  }
});

test("only the middle package tier is accented", () => {
  const accented = packages.filter((p) => p.accent);
  assert.equal(accented.length, 1);
  assert.equal(accented[0]?.tier, packages[1]?.tier);
});

test("seven surgical rows plus anaesthesia and post-operative care", () => {
  assert.equal(surgicalRows.length, 9);
});

test("eight diagnostic rows, CT & MRI stated as referral, not a turnaround", () => {
  assert.equal(diagnosticRows.length, 8);
  const ctMri = diagnosticRows.find((r) => /CT/i.test(r.name));
  assert.ok(ctMri, "no CT & MRI row");
  assert.match(ctMri.turnaround, /referral/i);
});

test("four admission steps and six international steps", () => {
  assert.deepEqual(
    admissionSteps.map((s) => s.no),
    ["01", "02", "03", "04"],
  );
  assert.equal(internationalSteps.length, 6);
});

test("bringWithYou and paymentNotes are non-empty short string lists", () => {
  assert.ok(bringWithYou.length >= 3);
  assert.ok(paymentNotes.length >= 3);
  for (const s of [...bringWithYou, ...paymentNotes]) {
    assert.equal(typeof s, "string");
    assert.ok(s.length > 0);
  }
});

test("comforts are short chips", () => {
  assert.ok(comforts.length >= 8);
  for (const c of comforts) assert.ok(c.length <= 32, `${c} is too long for a chip`);
});

test("no dental content anywhere in the index copy", () => {
  const all = [
    ...jumpCards.flatMap((c) => [c.label, c.note]),
    ...centres.flatMap((c) => [c.name, c.desc, c.lead]),
    ...surgicalRows.flatMap((r) => [r.name, r.note]),
    ...diagnosticRows.flatMap((r) => [r.name, r.note, r.turnaround]),
    ...packages.flatMap((p) => [p.tier, p.name, ...p.items, p.ctaLabel]),
    ...admissionSteps.flatMap((s) => [s.title, s.desc]),
    ...internationalSteps.flatMap((s) => [s.title, s.desc]),
    ...bringWithYou,
    ...paymentNotes,
    ...comforts,
  ];
  for (const v of all) assert.ok(!/\bdental\b|\bdentist\b/i.test(v), `contains dental content: ${v}`);
});

test("the only phone number in the index copy is the hospital's own", () => {
  const ALLOWED = "0117848484";
  const all = [
    ...jumpCards.flatMap((c) => [c.label, c.note]),
    ...centres.flatMap((c) => [c.name, c.desc, c.lead]),
    ...surgicalRows.flatMap((r) => [r.name, r.note]),
    ...diagnosticRows.flatMap((r) => [r.name, r.note, r.turnaround]),
    ...packages.flatMap((p) => [p.tier, p.name, ...p.items, p.ctaLabel]),
    ...admissionSteps.flatMap((s) => [s.title, s.desc]),
    ...internationalSteps.flatMap((s) => [s.title, s.desc]),
    ...bringWithYou,
    ...paymentNotes,
  ];
  for (const v of all) {
    const flat = v.replace(/[\s()\-.]/g, "");
    for (const hit of flat.match(/(?:\+94|0)\d{8,10}/g) ?? []) {
      const normalized = hit.replace(/^\+94/, "0");
      assert.equal(normalized, ALLOWED, `foreign number found: ${hit}`);
    }
  }
});
