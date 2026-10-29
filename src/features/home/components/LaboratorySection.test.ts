import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// The owner asked (2026-10-29) for the prices to come off the home band's
// tiles: they name the eight common tests and the price list page carries
// the figures.
test("the laboratory band's tiles show no prices", () => {
  const source = readFileSync(fileURLToPath(new URL("./LaboratorySection.tsx", import.meta.url)), "utf8");
  assert.ok(!/tile\.price|LKR|toLocaleString/.test(source), "the band still renders a price");
});
