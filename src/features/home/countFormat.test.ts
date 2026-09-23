import { test } from "node:test";
import assert from "node:assert/strict";
import { splitCount } from "./countFormat.ts";

// The stat cards and pharmacy rows animate their figure from zero, but the
// figures are strings that carry their own dressing ("24/7", "2h", "10%",
// "24 / 7"). The split keeps the dressing as fixed text and hands only the
// leading integer to the counter.
test("splits a figure into what precedes the number, the number, and what follows", () => {
  assert.deepEqual(splitCount("24/7"), { prefix: "", value: 24, suffix: "/7" });
  assert.deepEqual(splitCount("2h"), { prefix: "", value: 2, suffix: "h" });
  assert.deepEqual(splitCount("10%"), { prefix: "", value: 10, suffix: "%" });
  assert.deepEqual(splitCount("24 / 7"), { prefix: "", value: 24, suffix: " / 7" });
  assert.deepEqual(splitCount("36"), { prefix: "", value: 36, suffix: "" });
  assert.deepEqual(splitCount("LKR 10,000"), { prefix: "LKR ", value: 10000, suffix: "" });
});

test("a figure with no digits is not animated", () => {
  assert.equal(splitCount("Negombo"), null);
  assert.equal(splitCount("Digital"), null);
  assert.equal(splitCount(""), null);
});

// `{count}` is substituted by the component before the split, so the split
// never sees a template token; if it ever does, it must not treat it as zero.
test("a template token that was not substituted is not animated", () => {
  assert.equal(splitCount("{count}"), null);
});
