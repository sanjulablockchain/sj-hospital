import { test } from "node:test";
import assert from "node:assert/strict";
import { homeNavigation } from "./homeNavigation.ts";
import { healthTipsNavigation } from "./healthTipsNavigation.ts";
import { servicesNavigation, servicesDetailNavigation } from "./servicesNavigation.ts";
import { pharmacyNavigation } from "./pharmacyNavigation.ts";
import { facilitiesNavigation } from "./facilitiesNavigation.ts";
import { internationalNavigation } from "./internationalNavigation.ts";

const labels = (items: { label: string }[]) => items.map((i) => i.label);

// Every nav on the site. Add a page's nav here when you add the page: these
// checks are what caught the health tips, pharmacy and facilities navs
// drifting apart from each other when three branches landed in turn.
const ALL_NAVS = [
  homeNavigation,
  healthTipsNavigation,
  servicesNavigation,
  servicesDetailNavigation,
  pharmacyNavigation,
  facilitiesNavigation,
  internationalNavigation,
];

// The header must read identically on every page: only the targets differ.
// This is the check that stops a new page's nav from quietly growing its own
// items, which is exactly what the health tips reference design did.
test("every page's nav carries the same labels in the same order", () => {
  const expected = labels(homeNavigation);
  for (const nav of ALL_NAVS) assert.deepEqual(labels(nav), expected);
});

// A page whose nav points at its own section uses a bare hash; every other
// nav has to reach the page itself. Getting this wrong is invisible until
// someone clicks, so it is asserted rather than reviewed.
test("Health Tips points at the health tips page from every nav but its own", () => {
  for (const nav of ALL_NAVS) {
    if (nav === healthTipsNavigation) continue;
    const item = nav.find((i) => i.label === "Health Tips");
    assert.ok(item, "no Health Tips item");
    assert.equal(item.href, "/health-tips");
  }
});

test("Facilities, Pharmacy and International reach their pages from every other nav", () => {
  for (const nav of ALL_NAVS) {
    for (const [label, href] of [
      ["Facilities", "/facilities"],
      ["Pharmacy", "/pharmacy"],
      ["International Patient Care", "/international-care"],
    ]) {
      const item = nav.find((i) => i.label === label);
      assert.ok(item, `no ${label} item`);
      // The page's own nav anchors into itself instead; anything else must be
      // the page, never a superseded /services band.
      if (item.href.startsWith("#")) continue;
      assert.equal(item.href, href, `${label} points at ${item.href}`);
    }
  }
});

test("on the health tips page itself, Health Tips is an in-page anchor", () => {
  const item = healthTipsNavigation.find((i) => i.label === "Health Tips");
  assert.ok(item);
  assert.equal(item.href, "#library");
});

test("on the international page itself, International Patient Care is an in-page anchor", () => {
  const item = internationalNavigation.find((i) => i.label === "International Patient Care");
  assert.ok(item);
  assert.equal(item.href, "#journey");
});

test("no nav item still points at a retired home or services band", () => {
  for (const nav of ALL_NAVS) {
    for (const item of nav) {
      assert.ok(!/#tips$/.test(item.href), `${item.label} still points at ${item.href}`);
      // International patient care has a page of its own now, so neither the
      // home band nor the /services band is a valid target any more.
      assert.ok(!/#international$/.test(item.href), `${item.label} still points at ${item.href}`);
    }
  }
});
