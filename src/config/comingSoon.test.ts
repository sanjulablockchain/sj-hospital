import { test } from "node:test";
import assert from "node:assert/strict";
import { COMING_SOON_SLUGS, isComingSoonHref, isComingSoonSlug } from "./comingSoon.ts";
import { serviceSlugs } from "../features/services/data/services.ts";

// The owner's list of services not yet open (2026-11-20). Adding or removing
// one is a decision for the owner, so this pins the list rather than its size.
const OWNER_LIST = [
  "endoscopy",
  "fertility",
  "fetal-monitoring",
  "intensive-critical-care",
  "obstetrics-maternity",
  "telemedicine",
  "vaccination-clinic",
];

test("the coming soon list is the owner's seven services", () => {
  assert.deepEqual([...COMING_SOON_SLUGS].sort(), OWNER_LIST);
});

test("every coming soon slug is a real service page", () => {
  for (const slug of COMING_SOON_SLUGS) {
    assert.ok(serviceSlugs.includes(slug), `${slug} is not a service`);
    assert.equal(isComingSoonSlug(slug), true);
  }
  assert.equal(isComingSoonSlug("laboratory"), false);
});

test("isComingSoonHref recognises a coming soon service link in any locale, with or without a fragment", () => {
  assert.equal(isComingSoonHref("/services/telemedicine"), true);
  assert.equal(isComingSoonHref("/services/endoscopy#faq"), true);
  assert.equal(isComingSoonHref("/si/services/fertility"), true);
  assert.equal(isComingSoonHref("/ta/services/vaccination-clinic"), true);
  assert.equal(isComingSoonHref("/services/laboratory"), false);
  assert.equal(isComingSoonHref("/e-channeling"), false);
  assert.equal(isComingSoonHref("/services"), false);
  assert.equal(isComingSoonHref("/services/telemedicine-extra"), false);
});
