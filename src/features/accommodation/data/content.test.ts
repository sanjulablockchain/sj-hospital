import { test } from "node:test";
import assert from "node:assert/strict";
import {
  bookHeading,
  bookIntro,
  heroFacts,
  heroStandfirst,
  jumpCards,
  mealsNote,
  roomsHeading,
  roomsIntro,
  roomTypes,
  specialties,
  specialtiesHeading,
  specialtiesIntro,
  tickerItems,
} from "./content.ts";

test("four room types in the site's own order, with their ids", () => {
  assert.deepEqual(
    roomTypes.map((r) => r.id),
    ["standard", "deluxe", "super-deluxe", "wards"]
  );
});

test("every room type has photos, amenities and a price", () => {
  for (const room of roomTypes) {
    assert.ok(room.amenities.length >= 6, `${room.id} has ${room.amenities.length} amenities`);
    assert.equal(room.photos.length, 2);
    assert.ok(room.description.trim().length > 0);
    assert.ok(room.price.trim().length > 0);
  }
});

// The repo publishes exactly one room price. The other three categories are
// quoted on request, and inventing numbers for them would be inventing a price
// list. features/facilities/data/content.ts is the authority for this.
test("only the standard room carries a figure; the rest are on request", () => {
  const byId = new Map(roomTypes.map((r) => [r.id, r]));
  assert.equal(byId.get("standard")!.price, "From 10,000 LKR");
  for (const id of ["deluxe", "super-deluxe", "wards"]) {
    assert.equal(byId.get(id)!.price, "On request");
  }
});

// Every string export in this file, flattened to one array, so the price and
// em-dash tests below cannot silently miss a newly added export the way the
// original version of this file missed `heroStandfirst`, `roomsHeading`,
// `specialtiesHeading`, `bookHeading`, `bookIntro` (all five tests) and
// `heroFacts` (the em-dash test only). Anything with copy that a reader can
// see belongs in this array.
const allCopy: string[] = [
  ...tickerItems,
  mealsNote,
  ...specialties,
  ...heroFacts.flatMap((f) => [f.k, f.v]),
  ...jumpCards.flatMap((c) => [c.count, c.label, c.note]),
  ...roomTypes.flatMap((r) => [r.name, r.description, r.price, ...r.amenities]),
  heroStandfirst,
  roomsHeading,
  roomsIntro,
  specialtiesHeading,
  specialtiesIntro,
  bookHeading,
  bookIntro,
];

// Controller ruling B: the brief's original version of this test asserted zero
// matches of /LKR|Rs\.?\s*\d/ across a copy array that includes `heroFacts`,
// but Step 3 specifies a hero fact of "10,000 LKR" restating the standard
// room's own price, so a zero-match assertion fails against the very data this
// task specifies. This replaces it with an exact-set assertion over `allCopy`,
// every string export in this file: gather every price-bearing string across
// all of the page's data, and require that set to be exactly the standard
// room's price and the hero fact restating it. Any third price-bearing string
// (a fabricated figure, a stray currency, a typo that duplicates the real
// price under different phrasing, or a price smuggled into a heading or an
// intro) still fails.
test("no price figure appears anywhere except the standard room's own and the hero fact restating it", () => {
  const priceRegex = /LKR|Rs\.?\s*\d/;
  const found = new Set(allCopy.filter((value) => priceRegex.test(value)));
  assert.deepEqual(found, new Set(["From 10,000 LKR", "10,000 LKR"]));
});

test("ten inpatient specialties", () => {
  assert.equal(specialties.length, 10);
});

test("every jump card anchors to a room section this page renders", () => {
  assert.deepEqual(
    jumpCards.map((c) => c.href),
    ["#standard", "#deluxe", "#super-deluxe", "#wards"]
  );
});

test("no em dash in any encoding", () => {
  for (const value of allCopy) {
    for (const form of ["—", "&mdash;", "&#8212;", "&#x2014;"]) {
      assert.ok(!value.includes(form), `${value} contains ${form}`);
    }
  }
});
