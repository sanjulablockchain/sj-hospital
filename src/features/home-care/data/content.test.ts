import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { atHomeServices } from "../../services/data/atHome.ts";
import {
  PLACEHOLDER_NOTICE,
  contactRows,
  faq,
  handoffs,
  heroFacts,
  jumpCards,
  prepPoints,
  samplingFacts,
  samplingPoints,
  steps,
  suitedCases,
  tickerItems,
  visitLede,
  visitRoles,
} from "./content.ts";

const source = readFileSync(fileURLToPath(new URL("./content.ts", import.meta.url)), "utf8");

/** Everything on the page that is prose the reader sees. */
const allCopy = [
  ...tickerItems,
  ...heroFacts.flatMap((f) => [f.k, f.v]),
  ...jumpCards.flatMap((c) => [c.count, c.label, c.note]),
  visitLede,
  ...visitRoles.flatMap((r) => [r.kicker, r.title, r.body]),
  ...suitedCases.flatMap((c) => [c.title, c.body]),
  ...samplingPoints,
  ...samplingFacts.flatMap((f) => [f.k, f.v]),
  ...handoffs.flatMap((h) => [h.eyebrow, h.heading, h.body, h.linkLabel, ...h.points]),
  ...steps.flatMap((s) => [s.no, s.title, s.desc]),
  ...faq.flatMap((f) => [f.q, f.a]),
  ...prepPoints,
  ...contactRows.map((c) => c.label),
].join("\n");

/** The `home-visits` service, which is where every checkable fact here comes from. */
const homeVisits = atHomeServices.find((s) => s.slug === "home-visits");

// ---- The placeholder notice ----

// /home-care gathers four things the site already describes, so a good deal of
// this file is grounded. What is new is the page-level framing: the bands that
// stitch the four together, and anything a landing page wants that a service
// entry never had to state (coverage area, a fee, a response time). The notice
// is what stops those being read as verified fact. If someone confirms or
// rewrites a block they should delete the notice deliberately and watch this
// test fail, not discover later that it drifted away while unverified claims
// stayed on the page.
test("the placeholder notice is present and unmissable", () => {
  assert.match(source, /PLACEHOLDER CONTENT, NOT YET APPROVED BY ST\. JOSEPH HOSPITAL\./);
  assert.ok(PLACEHOLDER_NOTICE.length > 400, "the notice is too short to say anything useful");
  assert.match(PLACEHOLDER_NOTICE, /not verified/i);
});

test("the notice names every unverified block still on the page", () => {
  for (const topic of ["coverage", "fee", "response", "sampling"]) {
    assert.match(
      PLACEHOLDER_NOTICE.toLowerCase(),
      new RegExp(topic),
      `the notice does not mention ${topic}`
    );
  }
});

// ---- The hospital's own wording ----

// The one string on this page that came from the hospital rather than from a
// design reference or from the services data. It is the reason the page exists,
// so it is pinned verbatim: a copy edit that "tightens" it is throwing away the
// only approved sentence here.
test("the home visit lede keeps the hospital's wording verbatim", () => {
  assert.equal(
    visitLede,
    "Our doctors, nurses, and laboratory technicians visit your homes to give you personalized care in the comfort of your home."
  );
});

test("the three visiting roles are the three the lede names", () => {
  assert.equal(visitRoles.length, 3);
  const titles = visitRoles.map((r) => r.title.toLowerCase()).join(" ");
  for (const role of ["doctor", "nurse", "laboratory technician"]) {
    assert.match(titles, new RegExp(role), `no visiting ${role}`);
  }
});

// ---- Agreement with the service entry ----

// This page and /services/home-visits describe the same service, and a reader
// may well see both. Two files stating different vehicle counts is the failure
// this guards: the figures here are not independent facts, they are the service
// entry's facts re-presented, so they are asserted against it rather than
// against a number typed into this test.
test("the home visits service this page summarises still exists", () => {
  assert.ok(homeVisits, "no home-visits entry in atHomeServices");
  assert.equal(homeVisits.group, "At home");
});

test("every hero fact agrees with the home visits service entry", () => {
  assert.ok(homeVisits);
  const serviceFacts = new Map(homeVisits.facts.map((f) => [f.k.toLowerCase(), f.v.toLowerCase()]));
  const shared = heroFacts.filter((f) => serviceFacts.has(f.k.toLowerCase()));
  assert.ok(shared.length >= 3, `only ${shared.length} hero facts overlap the service entry`);
  for (const fact of shared) {
    assert.equal(
      fact.v.toLowerCase(),
      serviceFacts.get(fact.k.toLowerCase()),
      `the hero states ${fact.k} as "${fact.v}", the service entry disagrees`
    );
  }
});

test("the vehicle count matches the service entry rather than being restated", () => {
  assert.ok(homeVisits);
  const fromService = JSON.stringify(homeVisits).match(/(\d+)\s+dedicated/i);
  assert.ok(fromService, "the service entry no longer states a dedicated vehicle count");
  const here = allCopy.match(/(\d+)\s+dedicated/i);
  assert.ok(here, "the page no longer states a dedicated vehicle count");
  assert.equal(here[1], fromService[1]);
});

test("the four visit steps mirror the service entry's steps", () => {
  assert.ok(homeVisits);
  assert.equal(steps.length, 4);
  assert.deepEqual(
    steps.map((s) => s.no),
    ["01", "02", "03", "04"]
  );
  assert.deepEqual(
    steps.map((s) => s.title),
    homeVisits.steps.map((s) => s.title)
  );
});

test("who a visit suits is drawn from the service entry's conditions", () => {
  assert.ok(homeVisits);
  assert.equal(suitedCases.length, homeVisits.conditions.length);
  for (const item of suitedCases) {
    assert.ok(item.title.trim().length > 0, "an empty suited case title");
    assert.ok(item.body.trim().length > 20, `${item.title} has no real body copy`);
  }
});

// ---- The two bands that hand off ----

// #medicine and #telemedicine are summaries on purpose: /pharmacy#delivery and
// /services/telemedicine already carry the detail, and duplicating it means two
// pages to keep in step. So both bands stay short and both must point outward.
// A band that grew past a summary, or lost its link, fails here.
test("both handoff bands are short and point at the page that owns the detail", () => {
  assert.equal(handoffs.length, 2);
  const hrefs = handoffs.map((h) => h.href);
  assert.ok(hrefs.includes("/pharmacy#delivery"), "the medicine band does not reach /pharmacy");
  assert.ok(hrefs.includes("/services/telemedicine"), "the telemedicine band does not reach it");
  for (const band of handoffs) {
    assert.ok(band.body.length < 420, `the ${band.eyebrow} band has grown past a summary`);
    assert.ok(band.linkLabel.trim().length > 0, `the ${band.eyebrow} band has no link label`);
  }
});

// The delivery specifics live on /pharmacy, which states them once. If this
// page starts repeating them it becomes a second source that can go stale.
test("the handoff bands do not restate the delivery specifics", () => {
  const summaries = handoffs.flatMap((h) => [h.body, ...h.points]).join("\n");
  assert.ok(!/\bcutoff\b|\bcut-off\b/i.test(summaries), "a delivery cutoff is restated here");
  assert.ok(!/\b\d+\s*pm\b/i.test(summaries), "a delivery time is restated here");
  // \bRs rather than a bare "rs", which would fire on "hours 7" and similar.
  assert.ok(!/\bcash\b|\bcard\b|\bfee\b|\bcharge\b|\bRs\.?\s*\d/i.test(summaries), "a price is stated here");
});

// ---- The page's own shape ----

test("four jump cards, each anchoring to a section on this page", () => {
  assert.equal(jumpCards.length, 4);
  const SECTIONS = ["#visits", "#who", "#sampling", "#how"];
  for (const card of jumpCards) {
    assert.ok(SECTIONS.includes(card.href), `${card.label} anchors to ${card.href}`);
    assert.ok(card.count.trim().length > 0, `${card.label} has no count`);
  }
  assert.equal(new Set(jumpCards.map((c) => c.href)).size, 4, "two cards share an anchor");
});

// The Ticker sets its items uppercase at 12.5px with 0.2em tracking, so a
// phrase that reads fine in a paragraph runs half the band on its own. The
// existing tickers sit around two to five words; 42 characters is the ceiling
// that keeps this one in the same register rather than a scrolling sentence.
test("the ticker items are short enough to read while moving", () => {
  assert.ok(tickerItems.length >= 5, `only ${tickerItems.length} ticker items`);
  for (const item of tickerItems) {
    assert.ok(item.trim().length > 0, "an empty ticker item");
    assert.ok(item.length <= 42, `"${item}" is too long for the marquee`);
    // Sentence case in the data, uppercased by the component. A full stop
    // means someone wrote prose for a band that takes labels.
    assert.ok(!item.endsWith("."), `"${item}" is a sentence, not a label`);
  }
});

test("the ticker names the three roles the page leads with", () => {
  const joined = tickerItems.join(" ").toLowerCase();
  for (const role of ["doctor", "nurse", "laboratory technician"]) {
    assert.match(joined, new RegExp(role), `the ticker does not mention a ${role}`);
  }
});

test("the sampling band has points and facts, not just a heading", () => {
  assert.ok(samplingPoints.length >= 3, `only ${samplingPoints.length} sampling points`);
  assert.ok(samplingFacts.length >= 3, `only ${samplingFacts.length} sampling facts`);
});

test("prep points tell the reader what to have ready", () => {
  assert.ok(prepPoints.length >= 4, `only ${prepPoints.length} prep points`);
  for (const point of prepPoints) assert.ok(point.trim().length > 10, `"${point}" says nothing`);
});

test("every faq row is a real question with a real answer", () => {
  assert.ok(faq.length >= 4, `only ${faq.length} faq rows`);
  for (const row of faq) {
    assert.match(row.q, /\?$/, `"${row.q}" is not a question`);
    assert.ok(row.a.trim().length > 30, `"${row.q}" has a stub answer`);
  }
});

// ---- Claims the repo can actually check ----

// The hospital's real switchboard, mailbox and WhatsApp number, as they appear
// in components/layout/ThemedFooter. Pinned for the same reason /school-wellness
// pins them: a later edit to the copy must not be able to invent a home-visit
// hotline.
test("the contact rail uses the hospital's published details", () => {
  const byLabel = Object.fromEntries(contactRows.map((row) => [row.label, row.href]));
  assert.equal(byLabel["0117 84 84 84"], "tel:+94117848484");
  assert.equal(byLabel["Email the hospital"], "mailto:info@sjhospital.lk");
  assert.equal(byLabel["WhatsApp us"], "https://wa.me/94742223334");
});

// A dedicated home-visit line or mailbox would be a new fact about the
// hospital, and there is nothing in the repo to support one. config/
// contactEmails.ts allows exactly two addresses site wide.
test("no separate home-visit contact is invented", () => {
  assert.ok(!/homecare@|homevisits?@|visits?@/i.test(allCopy), "the copy invents a mailbox");
  const emails = allCopy.match(/[\w.+-]+@[\w.-]+/g) ?? [];
  for (const email of emails) assert.equal(email, "info@sjhospital.lk");
  const phones = allCopy.match(/\b0\d[\d\s]{7,}\b/g) ?? [];
  for (const phone of phones) assert.equal(phone.replace(/\s/g, ""), "0117848484");
});

// The project forbids the em dash in UI copy in every encoding, so the bare
// character alone is not enough to check for.
test("no em dash reaches the page in any encoding", () => {
  for (const form of ["—", "&mdash;", "&#8212;", "&#x2014;"]) {
    assert.ok(!source.includes(form), `content.ts contains ${JSON.stringify(form)}`);
  }
});
