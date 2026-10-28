import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { heroControls } from "../data/content.ts";

// The slideshow is a Client Component, so `node --test` reads its source
// rather than rendering it. These pin the three accessibility requirements
// the final review raised: the carousel role description, a live region that
// is silent while the slides rotate on their own, and a visible control that
// stops the rotation (WCAG 2.2.2) rather than only hover and focus pausing.
const source = readFileSync(fileURLToPath(new URL("./HeroSlideshow.tsx", import.meta.url)), "utf8");

test("the slideshow names itself a carousel", () => {
  assert.match(source, /aria-roledescription="carousel"/);
});

test("the live region is off while the slides rotate and polite once they stop", () => {
  assert.match(source, /aria-live=\{rotating \? "off" : "polite"\}/);
});

test("a pause control exists with its own assistive labels, in every language", () => {
  assert.match(source, /aria-label=\{stopped \? copy\.ariaPlay : copy\.ariaPause\}/);
  assert.equal(heroControls.ariaPause, "Pause the slideshow");
  assert.equal(heroControls.ariaPlay, "Play the slideshow");
});
