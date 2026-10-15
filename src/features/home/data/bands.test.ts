import { test } from "node:test";
import assert from "node:assert/strict";
import * as content from "./content.ts";
import * as faq from "./faq.ts";
import { sectionEyebrow as internationalCare } from "./internationalCare.ts";
import { sectionEyebrow as network } from "./network.ts";
import { sectionEyebrow as media } from "./media.ts";
import { sectionEyebrow as careers } from "./careers.ts";

/**
 * The v4 reference dropped the band numbers from the eyebrows ("Who we are",
 * not "01 / Who we are"), so the old unbroken-run guard is inverted: nothing
 * on the page may still count itself. A stray "03 / " would be the one band
 * somebody forgot.
 */
const NUMBERED = /^\d{2} \/ /;

/**
 * Every string under a key that names an eyebrow (`eyebrow`,
 * `sectionEyebrow`), found by walking the module. Only eyebrow keys, not every
 * string: the pharmacy band's "24 / 7" counter-hours value matches the same
 * pattern and is a fact, not a band number.
 */
function eyebrowsIn(module: object): string[] {
  const found: string[] = [];
  const walk = (value: unknown, key: string) => {
    if (typeof value === "string") {
      if (/eyebrow$/i.test(key)) found.push(value);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item) => walk(item, key));
      return;
    }
    if (value !== null && typeof value === "object") {
      for (const [innerKey, inner] of Object.entries(value as Record<string, unknown>)) {
        if (innerKey.startsWith("__")) continue;
        walk(inner, innerKey);
      }
    }
  };
  walk(module, "");
  return found;
}

test("no home band eyebrow still carries a band number", () => {
  const eyebrows = [...eyebrowsIn(content), ...eyebrowsIn(faq), internationalCare, network, media, careers];
  assert.ok(eyebrows.length >= 8, `only ${eyebrows.length} eyebrows found`);
  assert.deepEqual(eyebrows.filter((s) => NUMBERED.test(s)), []);
});

test("the free OPD band announces the first for Sri Lanka and sends the reader to the OPD page", () => {
  assert.equal(content.freeOpd.eyebrow, "A first for Sri Lanka");
  assert.match(content.freeOpd.heading, /costs you nothing/);
  assert.equal(content.freeOpd.hrefPrimary, "/services/outpatient-department");
  assert.equal(content.freeOpd.hrefSecondary, "tel:+94117848484");
});

/**
 * The band says the consultation is free and links onward for the rest. Every
 * figure about the OPD (the 24 hours, the same-day slots, the 10% laboratory
 * discount) has its one home in `services/data/clinics.ts`, and a second copy
 * here could drift from it with nothing to notice.
 */
test("the free OPD band quotes no figures that belong to the service page", () => {
  const copy = [
    content.freeOpd.heading,
    content.freeOpd.body,
    content.freeOpd.ctaPrimary,
    content.freeOpd.ctaSecondary,
    ...content.freeOpd.points,
  ].join("\n");
  assert.ok(!/\d+\s*%/.test(copy), "a percentage that belongs to the service page");
  assert.ok(!/\b\d{1,3},\d{3}\b|\bLKR\b/.test(copy), "a price");
  assert.ok(!/\b24\b|\bhours\b/i.test(copy), "an opening-hours figure");
});

test("the who we are stats read the services count live rather than hard-coding it", () => {
  const services = content.whoWeAre.stats.find((s) => s.label === "Services");
  assert.ok(services, "no Services stat");
  assert.equal(services.value, "{count}");
  assert.match(content.specialties.headingTemplate, /\{count\}/);
  assert.match(content.specialties.viewAll.ctaTemplate, /\{count\}/);
  assert.match(content.quickAccess.facilities.bodyTemplate, /\{count\}/);
});

test("every template only uses tokens the components substitute", () => {
  const templates = [
    content.whoWeAre.stats.map((s) => s.value).join(" "),
    content.specialties.headingTemplate,
    content.specialties.viewAll.ctaTemplate,
    content.specialties.countTemplate,
    content.quickAccess.facilities.bodyTemplate,
    content.community.stats.map((s) => s.value).join(" "),
  ].join(" ");
  const tokens = [...templates.matchAll(/\{([a-z]+)\}/g)].map((m) => m[1]);
  for (const token of tokens) {
    assert.ok(["count", "n", "total", "open"].includes(token), `unknown template token {${token}}`);
  }
});

/**
 * The community band's school figures are counted from the programme tracker
 * by the component, never typed, and it links to the two pages that back it.
 * It must not say the school programme is free: that claim sits in
 * school-wellness's own list of unverified placeholder copy. Its one price is
 * the OPD consultation's LKR 0.
 */
test("the community band counts its schools live and claims nothing the repo cannot back", () => {
  assert.deepEqual(
    content.community.stats.map((s) => s.value),
    ["{total}", "{open}", "LKR 0"],
  );
  assert.match(content.community.stats[2].label, /OPD consultation/);
  assert.equal(content.community.hrefPrimary, "/school-wellness");
  assert.equal(content.community.hrefSecondary, "/health-tips");
  const sentences = content.community.body.split(/(?<=\.)\s+/);
  for (const sentence of sentences.filter((s) => /school/i.test(s))) {
    assert.ok(!/\bfree\b|no cost|charge/i.test(sentence), `a free school claim: ${sentence}`);
  }
});
