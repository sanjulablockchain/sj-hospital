import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import * as content from "./content.ts";
import { bookRail, jumpCards, roomTypes, specialties } from "./content.ts";

test("four room types in the site's own order, with their ids", () => {
  assert.deepEqual(
    roomTypes.map((r) => r.id),
    ["standard", "deluxe", "super-deluxe", "wards"]
  );
});

test("every room type has photos, amenities, a price and a short label", () => {
  for (const room of roomTypes) {
    assert.ok(room.amenities.length >= 6, `${room.id} has ${room.amenities.length} amenities`);
    assert.equal(room.photos.length, 2);
    assert.ok(room.description.trim().length > 0);
    assert.ok(room.price.trim().length > 0);
    // FIX 8: RoomTypeNav.tsx's chips read `shortName`, not `name`, so they
    // match the short forms the jump cards and footer already use. Any value
    // here must be a substring of `name`, never new wording.
    assert.ok(room.name.includes(room.shortName), `${room.id}'s shortName "${room.shortName}" is not part of "${room.name}"`);
  }
});

// The repo publishes exactly one room price. The other three categories are
// quoted on request, and inventing numbers for them would be inventing a price
// list. features/facilities/data/content.ts is the authority for this.
test("only the standard room carries a figure; the rest are on request", () => {
  const byId = new Map(roomTypes.map((r) => [r.id, r]));
  assert.equal(byId.get("standard")?.price, "From 10,000 LKR");
  for (const id of ["deluxe", "super-deluxe", "wards"]) {
    assert.equal(byId.get(id)?.price, "On request");
  }
});

// FIX 4: the #book contact rail used to be hardcoded inside BookSection.tsx,
// outside data/content.ts and outside every test, while the same values in
// contact/data/content.ts were pinned. Pinned here the same way
// contact/data/content.test.ts pins `contactRows`, so a transposed digit on
// the page whose whole purpose is booking a room can no longer ship silently.
test("the booking rail carries the hospital's real contact details, unchanged", () => {
  const byLabel = new Map(bookRail.map((r) => [r.label, r]));
  assert.equal(byLabel.get("Call us")?.value, "0117 84 84 84");
  assert.equal(byLabel.get("Call us")?.href, "tel:+94117848484");
  assert.equal(byLabel.get("WhatsApp")?.value, "074 222 333 4");
  assert.equal(byLabel.get("WhatsApp")?.href, "https://wa.me/94742223334");
  assert.equal(byLabel.get("Email")?.value, "info@sjhospital.lk");
  assert.equal(byLabel.get("Email")?.href, "mailto:info@sjhospital.lk");
  assert.equal(byLabel.get("Book a doctor instead")?.href, "/e-channeling");
});

// FIX 5c: every string export in this module, gathered by reflection rather
// than by hand, so a newly added export cannot be silently missed the way an
// earlier version of this file missed `heroStandfirst`, `roomsHeading`,
// `specialtiesHeading`, `bookHeading`, `bookIntro` (both scans below) and
// `heroFacts` (the em-dash scan only). `content.ts` has no `specialtiesIntro`:
// see its file-level comment for why `#specialties` has no standfirst at all.
function collectStrings(value: unknown, seen: Set<object> = new Set()): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap((entry) => collectStrings(entry, seen));
  if (value !== null && typeof value === "object") {
    if (seen.has(value)) return [];
    seen.add(value);
    return Object.values(value).flatMap((entry) => collectStrings(entry, seen));
  }
  return [];
}

const allCopy: string[] = Object.values(content).flatMap((value) => collectStrings(value));

// FIX 1: src/app/accommodation/page.tsx's <meta name="description"> lives
// outside this module entirely, so no reflection over content.ts's own
// exports can ever see it, and it is exactly what a search engine or a social
// unfurl publishes. A fabricated "starting from 10,000 LKR" there once
// attributed the Standard-only price to all four room categories; read the
// route file's source directly so a price introduced there fails this suite
// too.
const pageSource = readFileSync(
  fileURLToPath(new URL("../../../app/accommodation/page.tsx", import.meta.url)),
  "utf8"
);
const metadataDescriptionMatch = pageSource.match(/description:\s*\n?\s*"((?:[^"\\]|\\.)*)"/);
if (!metadataDescriptionMatch) {
  throw new Error(
    "could not find accommodation/page.tsx's metadata description; update this test's regex"
  );
}
const routeMetadataDescription = metadataDescriptionMatch[1];

// Controller ruling B: the brief's original version of this test asserted zero
// matches of /LKR|Rs\.?\s*\d/ across a copy array that includes `heroFacts`,
// but Step 3 specifies a hero fact of "10,000 LKR" restating the standard
// room's own price, so a zero-match assertion fails against the very data this
// task specifies. This replaces it with an exact-set assertion over `allCopy`
// plus the route's own metadata description: gather every price-bearing string
// across all of the page's data, and require that set to be exactly the
// standard room's price and the hero fact restating it. Any third
// price-bearing string (a fabricated figure, a stray currency, a typo that
// duplicates the real price under different phrasing, or a price smuggled into
// a heading, an intro, or the route's metadata) still fails.
test("no price figure appears anywhere except the standard room's own and the hero fact restating it", () => {
  const priceRegex = /LKR|Rs\.?\s*\d/;
  const found = new Set(
    [...allCopy, routeMetadataDescription].filter((value) => priceRegex.test(value))
  );
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
