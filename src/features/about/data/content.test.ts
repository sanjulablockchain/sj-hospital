import { test } from "node:test";
import assert from "node:assert/strict";
import {
  groupBody,
  heroFacts,
  jumpCards,
  mission,
  partnerLogos,
  reasons,
  storyParagraphs,
  tickerItems,
  vision,
} from "./content.ts";

const allCopy = [
  ...tickerItems,
  ...heroFacts.flatMap((f) => [f.k, f.v]),
  ...jumpCards.flatMap((c) => [c.count, c.label, c.note]),
  ...storyParagraphs,
  ...reasons.flatMap((r) => [r.title, r.description]),
  mission.title,
  mission.body,
  vision.title,
  vision.body,
  ...groupBody,
];

// Ruling A (controller): the brief's numeric scan below includes
// `jumpCards[].count`, but Step 3 specifies counts of "01".."04", which are
// ordinals, not hospital claims, and fail the numeric allow-list as written.
// This copy of `allCopy` drops `count` from the NUMERIC scan only; `count`
// stays in `allCopy` above (and therefore in the em-dash scan) unchanged.
const allCopyForNumberScan = [
  ...tickerItems,
  ...heroFacts.flatMap((f) => [f.k, f.v]),
  ...jumpCards.flatMap((c) => [c.label, c.note]),
  ...storyParagraphs,
  ...reasons.flatMap((r) => [r.title, r.description]),
  mission.title,
  mission.body,
  vision.title,
  vision.body,
  ...groupBody,
];

test("four story paragraphs, six reasons, four hero facts, four jump cards", () => {
  assert.equal(storyParagraphs.length, 4);
  assert.equal(reasons.length, 6);
  assert.equal(heroFacts.length, 4);
  assert.equal(jumpCards.length, 4);
  assert.equal(partnerLogos.length, 5);
});

// The facts the live site actually publishes. Each one is repeated on the page
// and in the hero strip, so a drift in one place is a contradiction on screen.
//
// One phrase per source paragraph, so "copy it verbatim" is enforced rather
// than trusted. The four paragraphs come from the deleted Intro.tsx in this
// order, and this test fails if one is reworded, merged, or dropped.
test("the four story paragraphs survive verbatim, in order", () => {
  assert.match(storyParagraphs[0], /USD 1 million investment led by Kids & Teens Pediatric Medical Group \(Los Angeles\) and Asia Corp/);
  assert.match(storyParagraphs[1], /first hospital in Negombo to offer corporate insurance acceptance at our OPD/);
  assert.match(storyParagraphs[2], /digital X-ray machine at the hospital is one of the latest in the industry/);
  assert.match(storyParagraphs[3], /digital file access for our patients/);
});

// Same enforcement for the six differentiators, which are the page's spine.
test("the six reasons keep their live-site titles, in order", () => {
  assert.deepEqual(
    reasons.map((r) => r.title),
    [
      "Managed and Operated by USA",
      "Affordable US Healthcare Standards",
      "Advanced Technology",
      "Commitment to Safety and Hygiene",
      "Convenient Location and Comprehensive Services",
      "Evidence Based Billing",
    ]
  );
});

test("the mission and vision are the hospital's own wording", () => {
  assert.match(mission.body, /complete healthcare solutions that combine\s+advanced technology with patient-centered care/);
  assert.match(vision.body, /highest quality healthcare available to everyone in Sri Lanka/);
});

test("the parent group copy keeps the roster figure and the expansion paragraph", () => {
  assert.equal(groupBody.length, 2);
  assert.match(groupBody[0], /over 50 board-certified\s+pediatricians/);
  assert.match(groupBody[1], /extending their expertise beyond the United States/);
});

test("every jump card anchors to a section this page renders", () => {
  const ids = ["#story", "#different", "#mission", "#group"];
    for (const card of jumpCards) {
    assert.ok(ids.includes(card.href), `${card.label} points at ${card.href}`);
  }
  assert.equal(new Set(jumpCards.map((c) => c.href)).size, 4);
});

test("no invented figure: the only money and count claims are the refurbishment and the pediatrician roster", () => {
  const numbers = allCopyForNumberScan.join(" ").match(/\b\d[\d,.]*\b/g) ?? [];
  const allowed = new Set(["1", "50", "24", "7"]);
  for (const n of numbers) {
    assert.ok(allowed.has(n), `unexpected figure ${n} in about copy`);
  }
});

test("no em dash in any encoding", () => {
  for (const value of allCopy) {
    for (const form of ["—", "&mdash;", "&#8212;", "&#x2014;"]) {
      assert.ok(!value.includes(form), `${value} contains ${form}`);
    }
  }
});
