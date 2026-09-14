import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { slides, title, ariaPrev, ariaNext, ariaClose, ariaSlide } from "./announcement.ts";

/** Repo root, four levels up from src/features/home/data. */
const ROOT = fileURLToPath(new URL("../../../../", import.meta.url));

/** Everything in the pop-up that is prose the reader sees. */
const allCopy = [
  title,
  ariaPrev,
  ariaNext,
  ariaClose,
  ariaSlide,
  ...slides.flatMap((s) => [
    s.eyebrow,
    s.heading.line1,
    s.heading.line2,
    s.body,
    s.ctaPrimary,
    s.ctaSecondary,
  ]),
].join("\n");

test("the pop-up carries exactly the three slides the brief asked for", () => {
  assert.equal(slides.length, 3);
});

test("the slides number themselves in an unbroken run", () => {
  assert.deepEqual(
    slides.map((s) => s.eyebrow.split(" / ")[0]),
    ["01", "02", "03"],
  );
});

/**
 * The modal prefixes a site-root-relative href with the reader's locale and
 * leaves anything else alone, so an href that is neither breaks one of the
 * two branches. `tel:` and `https:` are the call and WhatsApp actions, which
 * must never be locale prefixed.
 */
test("every link is either a site path or an external action, never a bare word", () => {
  for (const slide of slides) {
    for (const href of [slide.hrefPrimary, slide.hrefSecondary]) {
      assert.match(href, /^(\/[a-z0-9/#-]*|tel:\+\d+|https:\/\/\S+)$/, `${slide.eyebrow}: ${href}`);
    }
  }
});

test("every internal link points at a route that exists", () => {
  const internal = slides
    .flatMap((s) => [s.hrefPrimary, s.hrefSecondary])
    .filter((href) => href.startsWith("/"));

  assert.ok(internal.length > 0, "no internal links to check");

  for (const href of internal) {
    const segment = href.replace(/[#?].*$/, "").split("/")[1];
    if (segment === "") continue; // the home page itself
    const route = `${ROOT}src/app/[locale]/${segment}`;
    assert.ok(existsSync(route), `${href} has no route at src/app/[locale]/${segment}`);
  }
});

test("every slide photograph exists in the public image library", () => {
  for (const slide of slides) {
    assert.ok(
      existsSync(`${ROOT}public${slide.photo}`),
      `${slide.eyebrow}: no file at public${slide.photo}`,
    );
  }
});

test("every slide photograph carries alt text", () => {
  for (const slide of slides) {
    assert.ok(slide.photoAlt.length > 10, `${slide.eyebrow}: alt text too thin`);
  }
});

/**
 * The same guard `pharmacy`'s own content.test.ts carries. The hospital has
 * published no delivery cutoff, no delivery window and no payment method, so
 * the pop-up, which is the loudest copy on the site, must not invent one.
 */
test("no slide promises a delivery time, cutoff or payment method", () => {
  assert.ok(
    !/same day|within \d+ (hour|minute)|by \d+ ?[ap]m|cash or card|card on delivery/i.test(allCopy),
    "an unbacked delivery promise",
  );
});

/**
 * Free OPD is a live offer the hospital stands behind, so the slide states it
 * plainly. What it must not do is attach a deadline or a quota to it, neither
 * of which the hospital has published.
 */
test("the free OPD slide states the offer without inventing a limit on it", () => {
  const opd = slides[1];
  assert.match(opd.eyebrow, /OPD/);
  assert.ok(
    !/limited time|first \d+|while stocks|offer ends|valid until|terms apply/i.test(
      [opd.heading.line1, opd.heading.line2, opd.body].join("\n"),
    ),
    "an unpublished limit on the free OPD offer",
  );
});

test("the hospital's name is never re-scripted in the pop-up title", () => {
  assert.match(title, /St\. Joseph/);
});
