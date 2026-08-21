import { test } from "node:test";
import assert from "node:assert/strict";
import { GROUPS, SERVICE_GROUPS } from "./groups.ts";

test("GROUPS leads with All and matches the reference order", () => {
  assert.deepEqual(GROUPS, [
    "All",
    "Emergency",
    "Surgical",
    "Diagnostics",
    "Clinics",
    "Women & children",
    "At home",
  ]);
});

test("SERVICE_GROUPS is GROUPS without All", () => {
  assert.equal(SERVICE_GROUPS.length, 6);
  assert.ok(!SERVICE_GROUPS.includes("All" as never));
  assert.deepEqual([...SERVICE_GROUPS], GROUPS.slice(1));
});
