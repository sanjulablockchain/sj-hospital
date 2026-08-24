import { test } from "node:test";
import assert from "node:assert/strict";
import {
  deskServices,
  enquiryChips,
  estimateNote,
  faq,
  heroFacts,
  insuranceNotes,
  journeySteps,
  jumpCards,
  payChips,
  practical,
  roomStandard,
  roomTiles,
  tickerItems,
  treatments,
} from "./content.ts";

/** Everything on the page that is prose the reader sees. */
const allCopy = [
  ...tickerItems,
  ...heroFacts.flatMap((f) => [f.k, f.v]),
  ...jumpCards.flatMap((c) => [c.count, c.label, c.note]),
  ...journeySteps.flatMap((s) => [s.title, s.desc, s.when]),
  ...deskServices.flatMap((s) => [s.kind, s.title, s.desc]),
  ...treatments.flatMap((t) => [t.name, t.note, t.stay]),
  estimateNote,
  ...roomTiles.flatMap((r) => [r.tier, r.name, r.desc, r.extra]),
  ...roomStandard,
  ...payChips,
  ...insuranceNotes,
  ...practical.flatMap((p) => [p.k, p.v]),
  ...faq.flatMap((q) => [q.q, q.a]),
  ...enquiryChips,
].join("\n");

test("every jump card anchors a section on this page", () => {
  assert.equal(jumpCards.length, 4);
  assert.deepEqual(
    jumpCards.map((c) => c.href),
    ["#journey", "#services", "#estimates", "#faq"],
  );
});

test("the jump card counts stay consistent with the lists they point at", () => {
  const count = (href: string) => {
    const card = jumpCards.find((c) => c.href === href);
    assert.ok(card, `no jump card anchors ${href}`);
    return card.count;
  };
  assert.equal(count("#journey"), `${journeySteps.length} steps`);
  assert.equal(count("#services"), `${deskServices.length} services`);
  assert.equal(count("#faq"), `${faq.length} answers`);
});

test("the journey is numbered in an unbroken run", () => {
  assert.deepEqual(
    journeySteps.map((s) => s.no),
    ["01", "02", "03", "04", "05", "06"],
  );
});

test("the airport is ten minutes away, never twelve, and carries no distance", () => {
  // The reference said twelve minutes and "roughly 9 kilometres". The repo says
  // ten minutes in four places and publishes no distance at all.
  assert.ok(/ten minutes/i.test(allCopy), "the ten minute figure has gone missing");
  assert.ok(!/twelve minutes|\b12 minutes\b/i.test(allCopy), "twelve minutes is back");
  assert.ok(!/kilometre|\bkm\b|\bmiles?\b/i.test(allCopy), "an unpublished distance is quoted");
});

test("no visa, immigration or letter-of-appointment service is offered", () => {
  // Central to the reference (ticker, service card, a journey step and the
  // first question) and backed nowhere in this repo.
  assert.ok(
    !/\bvisas?\b|immigration|electronic travel|letterhead|appointment letter/i.test(allCopy),
    "a visa service the repo does not back has crept back in",
  );
});

test("no turnaround, validity or interim billing promise", () => {
  assert.ok(
    !/48 hours|two working days|sixty days|60 days|within \d+ hours/i.test(allCopy),
    "an unbacked turnaround or validity window is promised",
  );
  assert.ok(!/interim bill|itemised bill/i.test(allCopy), "an unbacked billing cadence is promised");
});

test("no desk hours, and no clock times anywhere", () => {
  // The hospital publishes no international desk hours, and the facilities page
  // makes the same check for the same reason.
  assert.ok(!/\b\d{1,2}\s?(am|pm)\b/i.test(allCopy), "an unbacked clock time is promised");
  assert.ok(!/\b\d{1,2}[:.]\d{2}\b/.test(allCopy), "an unbacked clock time is promised");
});

test("no direct billing, guarantee of payment or commission claims", () => {
  assert.ok(
    !/direct billing|direct settlement|guarantee of payment|pre[- ]?authorisation/i.test(allCopy),
    "an insurance arrangement the repo does not back",
  );
  assert.ok(
    !/facilitation|commission|referring agent/i.test(allCopy),
    "a claim about agent commissions the repo does not make",
  );
});

test("no money changer, ATM or foreign currency handling", () => {
  assert.ok(
    !/money changer|\bATM\b|foreign currency|wire transfer/i.test(allCopy),
    "a currency service the repo does not offer",
  );
  // What the repo does publish, and therefore what the page may say.
  assert.ok(/bank transfer/i.test(allCopy), "the backed payment methods have gone missing");
});

test("no guest house, hotel or holiday arrangement is offered", () => {
  assert.ok(
    // `\bspa\b`, not a bare `spa`, or "dispatched" trips it.
    !/guest house|hotel|negotiated rate|\bspa\b|beach|lagoon|fish market/i.test(allCopy),
    "an accommodation or tourism claim the repo does not back",
  );
});

test("the room categories are the four the hospital actually offers", () => {
  assert.deepEqual(
    roomTiles.map((r) => r.name),
    ["Super Deluxe Rooms", "Deluxe Rooms", "Standard Rooms", "Wards"],
  );
  // The reference invented a Category A/B/C ladder with a semi private fourth
  // tier; the facilities page's own test rejects the same two names.
  assert.ok(
    !/private suite|semi[- ]private room|category [abc]\b/i.test(allCopy),
    "an invented room tier is back",
  );
});

test("10,000 LKR is the only price quoted anywhere on the page", () => {
  const prices = allCopy.match(/\b\d{1,3},\d{3}\b/g) ?? [];
  assert.deepEqual([...new Set(prices)], ["10,000"]);
  const standard = roomTiles.find((r) => r.name === "Standard Rooms");
  assert.ok(standard);
  assert.match(standard.extra, /10,000 LKR/);
});

test("only treatments the repo publishes are offered to travelling patients", () => {
  assert.ok(
    !/knee replacement|hip replacement|arthroplasty|hysterectomy|caesarean/i.test(allCopy),
    "a procedure the repo does not publish is back on the estimates table",
  );
  // Dental is excluded across the whole site, not just here.
  assert.ok(!/dental|dentist|orthodont/i.test(allCopy), "a dental claim is back");
});

test("no treatment row promises a night count", () => {
  for (const row of treatments) {
    assert.ok(
      !/\d+ (to \d+ )?nights?\b/i.test(row.stay),
      `${row.name} promises a night count the hospital has not published`,
    );
    assert.ok(row.stay.length > 0 && row.note.length > 0, `${row.name} is missing a column`);
  }
  assert.ok(treatments.length >= 10);
});

test("the estimate note says what an estimate is and is not", () => {
  assert.match(estimateNote, /not a guarantee/i);
  assert.match(estimateNote, /before treatment starts/i);
  assert.match(estimateNote, /CT and MRI/);
});

test("interpreters are on request, with no language roster", () => {
  assert.ok(/interpreters? (are |is )?(arranged )?on request/i.test(allCopy));
  // The reference listed eight languages the hospital has never claimed.
  assert.ok(
    !/arabic|russian|mandarin|dhivehi|\burdu\b|german\b/i.test(allCopy),
    "an interpreter language roster the repo does not back",
  );
  // Only the three the repo's own copy stands behind may be named at all.
  assert.ok(!/halal/i.test(allCopy), "a dietary claim the repo does not make");
});

test("no written fit to fly opinion is promised", () => {
  assert.ok(!/fit to fly|airline requires/i.test(allCopy), "an unbacked discharge document");
  // What the repo does publish about going home.
  assert.ok(/discharge summary/i.test(allCopy));
});

test("no superlative about the hospital's position", () => {
  assert.ok(
    !/closest|nearest|only (private )?hospital|best\b/i.test(allCopy),
    "an unbacked superlative",
  );
});

test("the only phone number in the copy is the hospital's own", () => {
  const numbers = allCopy.match(/\b0\d[\d\s]{7,}\b/g) ?? [];
  for (const number of numbers) assert.equal(number.replace(/\s/g, ""), "0117848484");
});

// Assembled from parts rather than written out, so this guard is not itself a
// match when the repo is grepped for the four banned em dash spellings.
const emDashForms = [String.fromCharCode(0x2014), "&mdash" + ";", "&#" + "8212;", "&#x" + "2014;"];

test("no em dash in any encoding", () => {
  for (const form of emDashForms) {
    assert.ok(
      !allCopy.includes(form),
      `em dash as ${JSON.stringify(form)} found in international care copy`,
    );
  }
});

test("hero facts and practical rows are short key/value pairs", () => {
  for (const row of heroFacts) {
    assert.ok(row.k.length <= 26, `${row.k} is too long for a label`);
    assert.ok(row.v.length <= 30, `${row.v} is too long for a value`);
  }
  for (const row of practical) {
    assert.ok(row.k.length <= 26, `${row.k} is too long for a label`);
    assert.ok(row.v.length <= 60, `${row.v} is too long for a value`);
  }
  assert.ok(practical.length >= 8);
});

test("ten questions, each with a real answer", () => {
  assert.equal(faq.length, 10);
  for (const item of faq) {
    assert.match(item.q, /\?$/);
    assert.ok(item.a.length >= 120, `${item.q} has a stub answer`);
  }
});

test("the ticker has enough phrases to fill a track", () => {
  assert.ok(tickerItems.length >= 4);
  for (const item of tickerItems) assert.ok(item.length <= 46, `${item} is too long for the ticker`);
});

test("the desk lists ten services, each with a kind and a body", () => {
  assert.equal(deskServices.length, 10);
  for (const service of deskServices) {
    assert.ok(service.kind.length <= 24, `${service.kind} is too long for an eyebrow`);
    assert.ok(service.desc.length >= 80, `${service.title} has a stub body`);
  }
});
