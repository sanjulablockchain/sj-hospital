import { test } from "node:test";
import assert from "node:assert/strict";
import {
  counters,
  deliveryFacts,
  faq,
  heroFacts,
  jumpCards,
  refills,
  safety,
  sendingWell,
  standards,
  steps,
  stock,
  tickerItems,
} from "./content.ts";

/** Everything on the page that is prose the reader sees. */
const allCopy = [
  ...tickerItems,
  ...heroFacts.flatMap((f) => [f.k, f.v]),
  ...jumpCards.flatMap((c) => [c.count, c.label, c.note]),
  ...counters.flatMap((c) => [c.where, c.name, c.desc, c.hours]),
  ...standards.flatMap((s) => [s.k, s.v]),
  ...stock.flatMap((s) => [s.name, s.note, s.tag]),
  ...steps.flatMap((s) => [s.title, s.desc]),
  ...sendingWell,
  ...deliveryFacts.flatMap((f) => [f.k, f.v]),
  ...refills.flatMap((r) => [r.name, r.note]),
  ...safety.flatMap((s) => [s.name, s.desc]),
  ...faq.flatMap((q) => [q.q, q.a]),
].join("\n");

test("every jump card anchors a section on this page", () => {
  assert.equal(jumpCards.length, 4);
  for (const card of jumpCards) assert.match(card.href, /^#[a-z]+$/);
  assert.deepEqual(
    jumpCards.map((c) => c.href),
    ["#counters", "#stock", "#delivery", "#refills"],
  );
});

test("the stock jump card count stays consistent with the stock list", () => {
  const card = jumpCards.find((c) => c.href === "#stock");
  assert.ok(card, "no jump card anchors #stock");
  assert.equal(card.count, `${stock.length} categories`);
});

test("the delivery jump card count stays consistent with the steps", () => {
  const card = jumpCards.find((c) => c.href === "#delivery");
  assert.ok(card, "no jump card anchors #delivery");
  assert.equal(card.count, `${steps.length} steps`);
});

test("steps and safety cards are numbered in an unbroken run", () => {
  assert.deepEqual(
    steps.map((s) => s.no),
    ["01", "02", "03", "04"],
  );
  assert.deepEqual(
    safety.map((s) => s.no),
    ["01", "02", "03", "04", "05", "06", "07", "08"],
  );
});

test("one counter, described by job rather than as separate windows", () => {
  assert.equal(counters.length, 3);
  // The design reference invented an A&E counter and a ward dispensing window.
  // The catalog describes neither, so neither may reappear here.
  assert.ok(
    !/\bA&E\b|emergency counter|ward dispensing|second (counter|window)/i.test(allCopy),
    "a counter the catalog does not describe has crept back in",
  );
});

test("no delivery cutoff time or payment method is promised", () => {
  assert.ok(!/\b\d{1,2}\s?(am|pm)\b/i.test(allCopy), "an unbacked clock time is promised");
  assert.ok(!/same day|cash or card|card on delivery/i.test(allCopy), "an unbacked delivery promise");
});

test("no cold chain, batch tracking or register claims", () => {
  assert.ok(
    !/cold chain|refrigerat|temperature log|batch (number|and expiry)|bound register|insulin|vaccin/i.test(
      allCopy,
    ),
    "a storage or traceability claim the repo does not back",
  );
});

test("the only phone number in the copy is the pharmacy's own", () => {
  const numbers = allCopy.match(/\b0\d[\d\s]{7,}\b/g) ?? [];
  for (const number of numbers) assert.equal(number.replace(/\s/g, ""), "0742223334");
});

// Assembled from parts rather than written out, so this guard is not itself a
// match when the repo is grepped for the four banned em dash spellings.
const emDashForms = ["\u2014", "&mdash" + ";", "&#" + "8212;", "&#x" + "2014;"];

test("no em dash in any encoding", () => {
  for (const form of emDashForms) {
    assert.ok(!allCopy.includes(form), `em dash as ${JSON.stringify(form)} found in pharmacy copy`);
  }
});

test("stock rows carry a legal-status tag", () => {
  assert.ok(stock.length >= 8);
  for (const row of stock) assert.match(row.tag, /^(On file|Rx only|Refillable|No Rx)$/);
});

test("every refill row names a condition and a note", () => {
  assert.ok(refills.length >= 5);
  for (const row of refills) {
    assert.ok(row.name.length > 0 && row.note.length > 0);
  }
});

test("standards and delivery facts are short key/value pairs", () => {
  for (const row of [...standards, ...deliveryFacts, ...heroFacts]) {
    assert.ok(row.k.length <= 26, `${row.k} is too long for a label`);
    assert.ok(row.v.length <= 30, `${row.v} is too long for a value`);
  }
});

test("eight questions, each with a real answer", () => {
  assert.equal(faq.length, 8);
  for (const item of faq) {
    assert.match(item.q, /\?$/);
    assert.ok(item.a.length >= 80, `${item.q} has a stub answer`);
  }
});

test("the ticker has enough phrases to fill a track", () => {
  assert.ok(tickerItems.length >= 4);
  for (const item of tickerItems) assert.ok(item.length <= 46);
});
