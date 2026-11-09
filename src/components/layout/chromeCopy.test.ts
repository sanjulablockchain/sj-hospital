import { test } from "node:test";
import assert from "node:assert/strict";
import { chromeCopy } from "./chromeCopy.ts";

// The home hero says every insurer is accepted and a cashless option exists
// (owner, 2026-10-28); the booking modal's footer line must not still say
// "corporate insurance" beside it.
test("the booking footer says all insurance is accepted, cashless available", () => {
  assert.equal(chromeCopy.bookFooter, "Free OPD consultation. All insurance accepted, cashless available.");
});
