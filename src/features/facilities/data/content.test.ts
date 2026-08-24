import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ambulanceSpecs,
  buildingZones,
  careNotes,
  careUnits,
  comforts,
  equipment,
  gettingHere,
  heroFacts,
  hygieneRows,
  jumpCards,
  roomExtras,
  roomRows,
  roomStandard,
  showcaseCards,
  support,
  theatreFigures,
  theatreSpecs,
  tickerItems,
  visitingRows,
} from "./content.ts";

/**
 * Every piece of prose on the page, for the whole-page claim assertions.
 *
 * Bare index numbers (a zone's "04", a figure's "1:1") are deliberately left
 * out: joined to the neighbouring label they fabricate phrases that appear
 * nowhere on the rendered page, and "04" + "Theatres & recovery" would trip the
 * theatre-count assertion below. Those fields have their own tests instead.
 */
const allCopy = [
  ...heroFacts.flatMap((r) => [r.k, r.v]),
  ...tickerItems,
  ...jumpCards.flatMap((c) => [c.count, c.label, c.note]),
  ...buildingZones.flatMap((z) => [z.name, z.contents]),
  ...showcaseCards.flatMap((c) => [c.title, c.body, c.linkLabel]),
  ...theatreFigures.map((f) => f.label),
  ...theatreSpecs.flatMap((r) => [r.k, r.v]),
  ...careUnits.flatMap((u) => [u.code, u.name, u.desc, u.lead]),
  ...roomRows.flatMap((r) => [r.name, r.occupancy, r.amenities, r.price]),
  ...roomStandard,
  ...roomExtras,
  ...equipment.flatMap((e) => [e.name, e.note, e.avail]),
  ...ambulanceSpecs.flatMap((r) => [r.k, r.v]),
  ...careNotes.flatMap((n) => [n.title, n.body]),
  ...support.flatMap((s) => [s.name, s.desc]),
  ...hygieneRows.flatMap((r) => [r.k, r.v]),
  ...visitingRows.flatMap((r) => [r.k, r.v]),
  ...gettingHere,
  ...comforts,
].join(" ");

test("six building zones, numbered 01-06 to match a six floor hospital", () => {
  assert.equal(buildingZones.length, 6);
  assert.deepEqual(
    buildingZones.map((z) => z.no),
    ["01", "02", "03", "04", "05", "06"],
  );
});

test("the building zones never claim a specific floor for a department", () => {
  // The reference design assigned each department a storey (G, 1, 2 ... 6).
  // Nothing the hospital publishes backs that mapping, so no zone may name a
  // level, whether as a word or a "3rd floor" style ordinal.
  for (const zone of buildingZones) {
    const text = `${zone.name} ${zone.contents}`;
    assert.doesNotMatch(text, /\b(ground|first|second|third|fourth|fifth|sixth)\s+floor\b/i, zone.name);
    assert.doesNotMatch(text, /\b\d+(st|nd|rd|th)\s+floor\b/i, zone.name);
    assert.doesNotMatch(text, /\blevel\s+\d\b/i, zone.name);
  }
});

test("four jump cards, each anchoring to a section on this page", () => {
  assert.equal(jumpCards.length, 4);
  for (const card of jumpCards) assert.match(card.href, /^#[a-z]+$/);
});

test("four showcase cards, numbered 01-04, every one with a photo and alt text", () => {
  assert.equal(showcaseCards.length, 4);
  assert.deepEqual(
    showcaseCards.map((c) => c.no),
    ["01", "02", "03", "04"],
  );
  for (const card of showcaseCards) {
    assert.match(card.photo, /^\/images\//, card.title);
    assert.ok(card.photoAlt.length > 10, `${card.title} needs real alt text`);
  }
});

test("no theatre, bed or ambulance is counted, because no count is published", () => {
  // "Three operating theatres", "four critical care units" and the like came
  // from the reference and are not backed anywhere in this repo.
  assert.doesNotMatch(allCopy, /\b(one|two|three|four|five|six|seven|eight|nine|\d+)\s+(operating\s+)?theatres\b/i);
  assert.doesNotMatch(allCopy, /\b\d+\s+(icu|intensive\s+care|critical\s+care|monitored)\s+beds\b/i);
  assert.doesNotMatch(allCopy, /\b\d+\s+ambulances\b/i);
});

test("the room categories are the four the hospital actually offers", () => {
  assert.deepEqual(
    roomRows.map((r) => r.name),
    ["Super Deluxe Rooms", "Deluxe Rooms", "Standard Rooms", "Wards"],
  );
  // The reference invented "Private suite" and "Semi private room" tiers.
  assert.doesNotMatch(allCopy, /private suite|semi[- ]private room/i);
});

test("10,000 LKR is the only price quoted anywhere on the page", () => {
  const prices = allCopy.match(/\b\d{1,3},\d{3}\b/g) ?? [];
  assert.deepEqual([...new Set(prices)], ["10,000"]);
  // and it is attached to the entry private room, the one figure the repo publishes
  const standard = roomRows.find((r) => r.name === "Standard Rooms");
  assert.ok(standard);
  assert.match(standard.price, /10,000 LKR/);
});

test("no clock-time visiting hours, which the hospital does not publish", () => {
  assert.doesNotMatch(allCopy, /\b\d{1,2}[:.]\d{2}\b/);
  const critical = visitingRows.find((r) => r.k === "Critical care");
  assert.ok(critical);
  assert.match(critical.v, /fixed hours/i);
});

test("no unbacked regulatory, engineering or dental claims", () => {
  assert.doesNotMatch(allCopy, /atomic energy|licen[cs]ed|shielded/i);
  assert.doesNotMatch(allCopy, /laminar flow|modular|generator|manifold|blood bank/i);
  assert.doesNotMatch(allCopy, /dental|dentist|orthodont/i);
});

test("critical care names only units the repo backs", () => {
  assert.equal(careUnits.length, 3);
  // HDU, SICU and NCU were reference inventions.
  assert.doesNotMatch(allCopy, /\bHDU\b|\bSICU\b|\bNCU\b|high dependency/i);
});

test("CT and MRI are stated as a referral, never as an on-site turnaround", () => {
  const offsite = equipment.find((e) => /CT & MRI/.test(e.name));
  assert.ok(offsite);
  assert.match(offsite.note, /not performed on site/i);
  assert.match(offsite.avail, /referral/i);
});

test("every equipment row carries a note and an availability", () => {
  assert.ok(equipment.length >= 8);
  for (const row of equipment) {
    assert.ok(row.note.length > 10, row.name);
    assert.ok(row.avail.length > 2, row.name);
  }
});

test("eight support entries, numbered 01-08", () => {
  assert.equal(support.length, 8);
  assert.deepEqual(
    support.map((s) => s.no),
    ["01", "02", "03", "04", "05", "06", "07", "08"],
  );
});

test("chips and ticker items stay short enough to sit on one line", () => {
  for (const chip of [...roomStandard, ...comforts]) {
    assert.ok(chip.length <= 26, `chip too long: ${chip}`);
  }
  for (const item of tickerItems) {
    assert.ok(item.length <= 34, `ticker item too long: ${item}`);
  }
});

test("the only phone number in the copy would be the hospital's own", () => {
  const numbers = allCopy.match(/\b0\d{3}\s?\d{2}\s?\d{2}\s?\d{2}\b/g) ?? [];
  for (const number of numbers) {
    assert.match(number.replace(/\s/g, ""), /^0117848484$/);
  }
});

// Assembled from parts rather than written out, so this guard is not itself a
// match when the repo is grepped for the four banned em dash spellings, the
// same reason the pharmacy suite builds its list this way.
const emDashForms = ["\u2014", "&mdash" + ";", "&#" + "8212;", "&#x" + "2014;"];

test("no em dash in any encoding", () => {
  for (const form of emDashForms) {
    assert.ok(!allCopy.includes(form), `em dash as ${JSON.stringify(form)} found in copy`);
  }
});
