import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { slides, title, ariaPrev, ariaNext, ariaClose, ariaSlide } from "./announcement.ts";
import { services } from "../../services/data/services.ts";

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

test("the pop-up carries exactly the five slides the brief asked for", () => {
  assert.equal(slides.length, 5);
});

test("the slides number themselves in an unbroken run", () => {
  assert.deepEqual(
    slides.map((s) => s.eyebrow.split(" / ")[0]),
    ["01", "02", "03", "04", "05"],
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

/**
 * The room rate has exactly one home, the `CountUp` in `RoomsSection.tsx`.
 * Quoting it here too would be the same fact in two files with nothing to
 * keep them together, so the rooms slide sends the reader to /accommodation
 * for the rate instead of restating it.
 */
test("no slide quotes a room rate", () => {
  assert.ok(!/\b\d{1,3},\d{3}\b|\bLKR\b|\bRs\.?\b/i.test(allCopy), "a price restated in the pop-up");
});

/**
 * The rooms slide's pitch is that our rooms are good, not that anyone else's
 * are dirty. An unnamed competitor is still a competitor, and a hospital
 * running down other hospitals' wards on its own front page is a claim it
 * cannot support and would not want quoted back at it.
 */
test("no slide disparages other hospitals", () => {
  assert.ok(
    !/dirty|filthy|worn.?out|fed up|other hospitals|elsewhere in|unlike/i.test(allCopy),
    "a swipe at other hospitals",
  );
});

/**
 * The OPD slide and the OPD service page are one promise in two places, and
 * the two tests below are what stop them drifting apart.
 *
 * The slide used to point at `/services`, the whole directory, because no OPD
 * page had been found. There is one, `/services/outpatient-department`, so the
 * slide links straight to it. A slug typo or a later rename would 404 with
 * nothing on screen to say so, which is what the first test catches.
 */
const OPD_SLUG = "outpatient-department";

test("the OPD slide links to a service page that actually exists", () => {
  const opd = slides[1];
  assert.equal(opd.hrefPrimary, `/services/${OPD_SLUG}`);
  assert.ok(
    services.some((service) => service.slug === OPD_SLUG),
    `no service in the catalog has the slug ${OPD_SLUG}`,
  );
});

/**
 * The pop-up tells the reader an OPD consultation costs nothing. Following its
 * CTA must not land them on a page that says nothing about it, so the service
 * page has to carry the same fact, and has to be equally clear about what is
 * NOT free: the hospital charges for tests, and separately advertises a 10%
 * laboratory discount that would read as a contradiction otherwise.
 */
test("the OPD service page confirms the free consultation, and says what is still charged", () => {
  const opd = services.find((service) => service.slug === OPD_SLUG);
  assert.ok(opd, `no ${OPD_SLUG} service`);

  const freeFact = opd.facts.find((fact) => /free/i.test(fact.v));
  assert.ok(freeFact, "no fact row states the consultation is free");
  assert.match(freeFact.k, /consultation/i);

  assert.ok(
    opd.faq.some((entry) => /free/i.test(entry.q)),
    "no FAQ entry answers whether the consultation is really free",
  );

  const prose = [opd.desc, opd.lede, opd.body1, opd.body2].join("\n");
  assert.match(prose, /free/i, "the page body never mentions the free consultation");
  assert.match(prose, /charged|charge/i, "the page never says what is still charged");
});

test("the hospital's name is never re-scripted in the pop-up title", () => {
  assert.match(title, /St\. Joseph/);
});
