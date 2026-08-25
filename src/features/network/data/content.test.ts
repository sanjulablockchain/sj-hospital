import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import {
  PLACEHOLDER_NOTICE,
  contactRows,
  disclaimer,
  heroFacts,
  jumpCards,
  mattersBody,
  mattersHeading,
  orgGroups,
  practice,
  reachRows,
  referrals,
  tickerItems,
} from "./content.ts";

const orgs = orgGroups.flatMap((g) => g.orgs);

/** Everything on the page that is prose the reader sees. */
const allCopy = [
  ...tickerItems,
  ...heroFacts.flatMap((f) => [f.k, f.v]),
  ...jumpCards.flatMap((c) => [c.count, c.label, c.note]),
  mattersHeading,
  mattersBody,
  ...practice,
  ...orgGroups.flatMap((g) => [g.name, g.note]),
  ...orgs.flatMap((o) => [o.wordmark, o.badge, o.name, o.tagline, o.body, o.cta, ...o.chips]),
  ...reachRows.flatMap((r) => [r.n, r.k, r.who]),
  ...referrals.flatMap((r) => [r.q, r.a]),
  ...contactRows.map((c) => c.label),
  disclaimer,
].join("\n");

// ---- The placeholder notice ----
//
// Unlike every other reference in this project, this one's company
// descriptions and figures check out against ktdoctor.com/network. Two blocks
// do not check out against anything, and the notice is what stops them being
// read as verified fact. If someone confirms or rewrites those blocks, they
// should delete the notice deliberately and watch this test fail, not discover
// later that it drifted away.

test("the placeholder notice names both unverified blocks", () => {
  assert.match(PLACEHOLDER_NOTICE, /not verified/i);
  assert.match(PLACEHOLDER_NOTICE, /In practice/);
  assert.match(PLACEHOLDER_NOTICE, /referral/i);
});

test("the placeholder notice names each unverified claim", () => {
  for (const claim of [
    "protocol",
    "second opinion",
    "generic name",
    "training",
    "ACIG",
    "admitting rights",
    "pricing",
  ]) {
    assert.match(PLACEHOLDER_NOTICE, new RegExp(claim, "i"), `notice does not mention ${claim}`);
  }
});

// ---- Shape ----

test("nine companies across three groups", () => {
  assert.equal(orgGroups.length, 3);
  assert.equal(orgs.length, 9);
});

test("the groups read Sri Lanka first, then California, then support", () => {
  assert.deepEqual(
    orgGroups.map((g) => g.name),
    ["Sri Lanka", "Paediatric and family care, California", "Business and support"],
  );
});

test("exactly the two flagship cards carry the accent inset", () => {
  assert.deepEqual(
    orgs.filter((o) => o.flagship).map((o) => o.slug),
    ["st-joseph", "kids-and-teens"],
  );
});

test("only this hospital's card has no outbound link", () => {
  assert.deepEqual(
    orgs.filter((o) => !o.href).map((o) => o.slug),
    ["st-joseph"],
  );
});

test("the ticker lists the eight companies other than this hospital", () => {
  assert.equal(tickerItems.length, 8);
  assert.ok(!tickerItems.some((t) => /St\. Joseph/i.test(t)));
});

test("four hero facts and four contact rows", () => {
  assert.equal(heroFacts.length, 4);
  assert.equal(contactRows.length, 4);
  assert.equal(contactRows.filter((c) => c.glyph === "phone").length, 1);
});

test("five in-practice lines and seven referral answers", () => {
  assert.equal(practice.length, 5);
  assert.equal(referrals.length, 7);
});

// ---- Anchors ----

test("every jump card anchors a section this page renders", () => {
  assert.equal(jumpCards.length, 4);
  assert.deepEqual(
    jumpCards.map((c) => c.href),
    ["#matters", "#family", "#reach", "#referrals"],
  );
});

test("the numeric jump card counts agree with the lists they point at", () => {
  const count = (href: string) => {
    const card = jumpCards.find((c) => c.href === href);
    assert.ok(card, `no jump card anchors ${href}`);
    return card.count;
  };
  assert.equal(count("#family"), `${orgs.length} companies`);
  assert.equal(count("#referrals"), `${referrals.length} answers`);
});

// ---- Figures, as published by the group ----
//
// Recorded as expected values so an edit that drifts from
// ktdoctor.com/network fails here rather than shipping a wrong number.

test("the numbers section matches what the group publishes", () => {
  assert.equal(reachRows.length, 9);
  const byKey = new Map(reachRows.map((r) => [r.k, r.n]));
  assert.equal(byKey.get("Companies in the network"), "9");
  assert.equal(byKey.get("Kids & Teens clinics"), "25");
  assert.equal(byKey.get("Serendib Healthways locations"), "20+");
  assert.equal(byKey.get("Board certified doctors"), "50+");
  assert.equal(byKey.get("After hours urgent care clinics"), "20+");
  assert.equal(byKey.get("Years of Human Compass MSO"), "25");
  assert.equal(byKey.get("LA Intensive Pediatric Therapy since"), "2010");
  assert.equal(byKey.get("Countries with BPO teams"), "2");
  assert.equal(byKey.get("Hospital in Sri Lanka"), "1");
});

test("the company count in the numbers matches the cards actually rendered", () => {
  const stated = reachRows.find((r) => r.k === "Companies in the network");
  assert.ok(stated);
  assert.equal(Number(stated.n), orgs.length);
});

test("every company links to the domain it is credited with", () => {
  const expected = {
    acig: "acig.lk",
    "kids-and-teens": "ktdoctor.com",
    "st-gianna": "sgmdoctor.com",
    laipt: "laipt.org",
    "serendib-healthways": "serendibhealthways.com",
    "after-hours": "pediatricafterhour.com",
    "human-compass": "humancompassmso.com",
    "blockchain-bpo": "myblockchainbpo.com",
  };
  for (const [slug, domain] of Object.entries(expected)) {
    const org = orgs.find((o) => o.slug === slug);
    assert.ok(org, `no card for ${slug}`);
    assert.ok(org.href?.includes(domain), `${slug} links to ${org.href}, not ${domain}`);
    assert.ok(org.cta.includes(domain), `${slug} cta reads "${org.cta}"`);
  }
});

// ---- Assets ----

test("every logo path points at a file that exists", () => {
  for (const org of orgs) {
    assert.equal(org.logo, `/images/network/logos/${org.slug}.png`);
    assert.ok(existsSync(`public${org.logo}`), `missing public${org.logo}`);
  }
});

// ---- House rules ----

test("no em dash, in any encoding", () => {
  for (const form of ["\u2014", "&mdash;", "&#8212;", "&#x2014;"]) {
    assert.ok(!allCopy.includes(form), `copy contains ${form}`);
    assert.ok(!PLACEHOLDER_NOTICE.includes(form), `notice contains ${form}`);
  }
});

test("the airport distance is never the reference's twelve minutes", () => {
  assert.ok(!/twelve minutes/i.test(allCopy));
  assert.ok(!/12 minutes/i.test(allCopy));
});
