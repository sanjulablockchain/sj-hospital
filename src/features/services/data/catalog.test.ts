import { test } from "node:test";
import assert from "node:assert/strict";
import type { Service } from "../types.ts";
import { emergencyServices } from "./emergency.ts";
import { surgicalServices } from "./surgical.ts";
import { diagnosticServices } from "./diagnostics.ts";
import { womenChildrenServices } from "./womenChildren.ts";

const SO_FAR: Service[] = [
  ...emergencyServices,
  ...surgicalServices,
  ...diagnosticServices,
  ...womenChildrenServices,
];

test("group modules have the expected sizes", () => {
  assert.equal(emergencyServices.length, 2);
  assert.equal(surgicalServices.length, 7);
  assert.equal(diagnosticServices.length, 4);
  assert.equal(womenChildrenServices.length, 5);
});

test("every service is tagged with its own group", () => {
  for (const s of emergencyServices) assert.equal(s.group, "Emergency");
  for (const s of surgicalServices) assert.equal(s.group, "Surgical");
  for (const s of diagnosticServices) assert.equal(s.group, "Diagnostics");
  for (const s of womenChildrenServices) assert.equal(s.group, "Women & children");
});

test("slugs are unique, lowercase and url-safe", () => {
  const slugs = SO_FAR.map((s) => s.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const slug of slugs) assert.match(slug, /^[a-z][a-z0-9-]*[a-z0-9]$/);
});

test("required string fields are non-empty", () => {
  const fields = [
    "title", "directoryTitle", "hours", "cta", "desc",
    "lede", "aboutHead", "body1", "body2", "location",
  ] as const;
  for (const s of SO_FAR) {
    for (const f of fields) {
      assert.ok(s[f].trim().length > 0, `${s.slug}.${f} is empty`);
    }
  }
});

test("collection fields have the shapes the pages assume", () => {
  for (const s of SO_FAR) {
    assert.equal(s.strip.length, 4, `${s.slug} needs 4 hero stats`);
    assert.equal(s.steps.length, 4, `${s.slug} needs 4 journey steps`);
    assert.deepEqual(
      s.steps.map((st) => st.no),
      ["01", "02", "03", "04"],
      `${s.slug} steps must be numbered 01-04`,
    );
    assert.ok(s.covers.length >= 4, `${s.slug} needs >=4 covers`);
    assert.ok(s.conditions.length >= 4, `${s.slug} needs >=4 conditions`);
    assert.ok(s.facts.length >= 3, `${s.slug} needs >=3 facts`);
    assert.ok(s.prep.length >= 3, `${s.slug} needs >=3 prep items`);
    assert.ok(s.team.length >= 3, `${s.slug} needs >=3 team entries`);
    assert.ok(s.faq.length >= 3, `${s.slug} needs >=3 FAQs`);
  }
});

test("facts and strips are non-empty key/value pairs", () => {
  for (const s of SO_FAR) {
    for (const kv of [...s.facts, ...s.strip]) {
      assert.ok(kv.k.trim() && kv.v.trim(), `${s.slug} has an empty key/value`);
    }
  }
});
