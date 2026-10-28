import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// The list renders 334 rows. One responsive structure, not a table for wide
// screens plus a card list for phones, or the page ships every cell twice.
test("the price list renders each row once", () => {
  const source = readFileSync(fileURLToPath(new URL("./LabTestTable.tsx", import.meta.url)), "utf8");
  assert.equal(source.match(/filtered\.map\(/g)?.length, 1);
});
