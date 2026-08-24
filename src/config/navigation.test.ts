import { test } from "node:test";
import assert from "node:assert/strict";
import { homeNavigation } from "./homeNavigation.ts";
import { healthTipsNavigation } from "./healthTipsNavigation.ts";
import { servicesNavigation, servicesDetailNavigation } from "./servicesNavigation.ts";

const labels = (items: { label: string }[]) => items.map((i) => i.label);

// The header must read identically on every page: only the targets differ.
// This is the check that stops a new page's nav from quietly growing its own
// items, which is exactly what the health tips reference design did.
test("every page's nav carries the same labels in the same order", () => {
  const expected = labels(homeNavigation);
  assert.deepEqual(labels(healthTipsNavigation), expected);
  assert.deepEqual(labels(servicesNavigation), expected);
  assert.deepEqual(labels(servicesDetailNavigation), expected);
});

test("Health Tips points at the health tips page from every nav but its own", () => {
  for (const nav of [homeNavigation, servicesNavigation, servicesDetailNavigation]) {
    const item = nav.find((i) => i.label === "Health Tips");
    assert.ok(item, "no Health Tips item");
    assert.equal(item.href, "/health-tips");
  }
});

test("on the health tips page itself, Health Tips is an in-page anchor", () => {
  const item = healthTipsNavigation.find((i) => i.label === "Health Tips");
  assert.ok(item);
  assert.equal(item.href, "#library");
});

test("no nav item still points at the retired #tips home section", () => {
  for (const nav of [
    homeNavigation,
    healthTipsNavigation,
    servicesNavigation,
    servicesDetailNavigation,
  ]) {
    for (const item of nav) {
      assert.ok(!/#tips$/.test(item.href), `${item.label} still points at ${item.href}`);
    }
  }
});
