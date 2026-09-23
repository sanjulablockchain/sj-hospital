import { test } from "node:test";
import assert from "node:assert/strict";
import * as faq from "./faq.ts";

test("the FAQ carries the reference's seven questions, each a question", () => {
  assert.equal(faq.items.length, 7);
  for (const item of faq.items) {
    assert.match(item.q, /\?$/, item.q);
    assert.ok(item.a.length > 40, `thin answer: ${item.q}`);
  }
});

// Prices have one home (facilities/data/content.ts, accommodation) and the
// FAQ must not become a second, driftable copy of them.
test("no FAQ answer quotes a price", () => {
  for (const item of faq.items) {
    assert.ok(!/\bLKR\b|\b\d{1,3},\d{3}\b|\bRs\.?/.test(item.a), `price in: ${item.q}`);
  }
});

test("the emergency answer gives the switchboard number the rest of the site gives", () => {
  const emergency = faq.items.find((i) => /emergency/i.test(i.q));
  assert.ok(emergency);
  assert.match(emergency.a, /0117 84 84 84/);
});

test("the FAQ sends readers with more questions to the contact page", () => {
  assert.equal(faq.seeAll.href, "/contact-us");
});
