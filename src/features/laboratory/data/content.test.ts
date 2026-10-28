import { test } from "node:test";
import assert from "node:assert/strict";
import { labTests } from "./catalogue.ts";
import {
  bookActions,
  featuredCodes,
  hero,
  heroFacts,
  heroStandfirst,
  sectionEyebrows,
  table,
} from "./content.ts";

test("every featured test is in the catalogue with a price", () => {
  assert.equal(featuredCodes.length, 8);
  for (const { code, label } of featuredCodes) {
    const found = labTests.find((t) => t.code === code);
    assert.ok(found, `${label} (${code}) is not in the catalogue`);
    assert.ok(found.price !== null, `${label} (${code}) has no price`);
  }
});

test("the hero quotes the catalogue through templates, never typed figures", () => {
  assert.equal(heroFacts.length, 4);
  assert.match(heroFacts[0].v, /\{count\}/);
  assert.match(heroFacts[1].v, /\{fromPrice\}/);
  assert.match(heroFacts[2].v, /\{sameDayCount\}/);
  assert.match(heroFacts[3].v, /\{opdDiscount\}/);
  assert.match(heroStandfirst, /\{fromPrice\}/);
  assert.ok(!/\d{3,}/.test(heroStandfirst), "a figure typed into the standfirst");
  assert.equal(hero.call.value, "0117 84 84 84");
});

test("the closing rail calls the hospital and books through the laboratory service", () => {
  assert.equal(bookActions[0].href, "/services/laboratory");
  assert.equal(bookActions[0].internal, true);
  assert.equal(bookActions[1].href, "tel:+94117848484");
  assert.equal(bookActions[1].value, hero.call.value);
});

test("the table copy carries the count template and three numbered sections exist", () => {
  assert.match(table.showingTemplate, /\{n\}/);
  assert.match(table.showingTemplate, /\{total\}/);
  assert.deepEqual(Object.keys(sectionEyebrows), ["list", "how", "book"]);
});
