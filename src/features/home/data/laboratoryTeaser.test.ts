import { test } from "node:test";
import assert from "node:assert/strict";
import { laboratory } from "./content.ts";
// Relative imports straight to the laboratory feature's data files, not its
// `index.ts`, which re-exports a `.tsx` page `node --test` cannot load.
import { labTests } from "../../laboratory/data/catalogue.ts";
import { featuredCodes } from "../../laboratory/data/content.ts";

// The band's eight tiles are the laboratory feature's own featured list and
// read their price from the catalogue, so a code that is not in it would
// render a tile with no figure.
test("every featured test on the home band is in the catalogue with a price", () => {
  assert.equal(featuredCodes.length, 8);
  for (const { code, label } of featuredCodes) {
    const found = labTests.find((t) => t.code === code);
    assert.ok(found, `${label} (${code}) is not in the catalogue`);
    assert.ok(found.price !== null, `${label} (${code}) has no price`);
  }
});

// The count and the lowest price have one home, the catalogue summary, and
// reach the band through templates; a figure typed here could drift.
test("the band quotes the catalogue through templates and links to the price list", () => {
  assert.match(laboratory.bodyTemplate, /\{count\}/);
  assert.match(laboratory.bodyTemplate, /\{fromPrice\}/);
  assert.ok(!/\d{3,}/.test(laboratory.bodyTemplate), "a figure typed into the body");
  assert.equal(laboratory.hrefPrimary, "/laboratory-tests");
  assert.equal(laboratory.hrefSecondary, "/services/laboratory");
});
