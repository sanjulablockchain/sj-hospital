import { test } from "node:test";
import assert from "node:assert/strict";
import * as content from "./content.ts";
import { sectionEyebrow as facilities } from "./facilities.ts";
import { sectionEyebrow as homeCare } from "./homeCare.ts";
import { sectionEyebrow as internationalCare } from "./internationalCare.ts";
import { sectionEyebrow as healthTips } from "./healthTips.ts";
import { sectionEyebrow as network } from "./network.ts";
import { sectionEyebrow as media } from "./media.ts";
import { sectionEyebrow as careers } from "./careers.ts";
import { sectionEyebrow as testimonials } from "./testimonials.ts";

/**
 * The home page's bands are numbered in their eyebrows, "01 / Who we are"
 * through to the last one, and a reader scrolling the page sees that run as
 * the spine of it. The numbers live in ten different files, though: seven in
 * `content.ts` and one each in the eight per-teaser files, so inserting a
 * band means renumbering every band below it by hand across up to nine files.
 *
 * Nothing guarded that until this test. It was written when `02 / Free OPD`
 * was inserted, which shifted thirteen bands down by one; a single missed
 * file would have left the page counting 03, 03, 05 with nothing failing and
 * nobody noticing until someone read the page carefully.
 */
const BAND_EYEBROW = /^(\d{2}) \/ .+/;

/**
 * Every eyebrow in `content.ts`, found by walking its exports rather than
 * listing them, so a band added there in future is covered without anyone
 * remembering to extend this file.
 */
function eyebrowsIn(module: object): string[] {
  const found: string[] = [];
  const walk = (value: unknown) => {
    if (typeof value === "string") {
      if (BAND_EYEBROW.test(value)) found.push(value);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (value !== null && typeof value === "object") {
      for (const [key, inner] of Object.entries(value as Record<string, unknown>)) {
        if (key.startsWith("__")) continue;
        walk(inner);
      }
    }
  };
  walk(module);
  return found;
}

/**
 * `content.ts`'s own bands plus the eight per-teaser files. `announcement.ts`
 * numbers its slides the same way and is deliberately NOT here: the pop-up is
 * chrome over the page with its own 01-05 run, not part of this sequence.
 */
function allBandEyebrows(): string[] {
  return [
    ...eyebrowsIn(content),
    facilities,
    homeCare,
    internationalCare,
    healthTips,
    network,
    media,
    careers,
    testimonials,
  ];
}

test("the home page's bands are numbered in an unbroken run from 01", () => {
  const numbers = allBandEyebrows()
    .map((eyebrow) => BAND_EYEBROW.exec(eyebrow)?.[1])
    .filter((n): n is string => n !== undefined)
    .sort();

  const expected = Array.from({ length: numbers.length }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

  assert.deepEqual(numbers, expected, `band numbers are ${numbers.join(", ")}`);
});

test("no two bands claim the same number", () => {
  const eyebrows = allBandEyebrows();
  const numbers = eyebrows.map((eyebrow) => BAND_EYEBROW.exec(eyebrow)?.[1]);
  assert.equal(
    new Set(numbers).size,
    numbers.length,
    `duplicate band number among: ${eyebrows.join(" | ")}`,
  );
});

test("the free OPD band exists, sits second, and sends the reader to the OPD page", () => {
  assert.match(content.freeOpd.eyebrow, /^02 \/ /);
  assert.match(content.freeOpd.eyebrow, /OPD/);
  assert.equal(content.freeOpd.hrefPrimary, "/services/outpatient-department");
});

/**
 * The band says the consultation is free and links onward for the rest. Every
 * figure about the OPD (the 24 hours, the same-day slots, the 10% laboratory
 * discount) has its one home in `services/data/clinics.ts`, and a second copy
 * here could drift from it with nothing to notice, the same reason the
 * announcement pop-up does not quote the room rate.
 */
test("the free OPD band quotes no figures that belong to the service page", () => {
  const copy = [
    content.freeOpd.heading.line1,
    content.freeOpd.heading.line2,
    content.freeOpd.body,
    content.freeOpd.ctaPrimary,
    content.freeOpd.ctaSecondary,
    ...content.freeOpd.points,
  ].join("\n");

  assert.ok(!/\d+\s*%/.test(copy), "a percentage that belongs to the service page");
  assert.ok(!/\b\d{1,3},\d{3}\b|\bLKR\b/.test(copy), "a price");
  assert.ok(!/\b24\b|\bhours\b/i.test(copy), "an opening-hours figure");
});
