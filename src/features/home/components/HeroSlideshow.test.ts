import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { heroControls } from "../data/content.ts";

// The slideshow is a Client Component, so `node --test` reads its source
// rather than rendering it. These pin the carousel role description, a live
// region that is silent while the slides rotate on their own, and the
// absence of the pause control the owner asked to remove.
const source = readFileSync(fileURLToPath(new URL("./HeroSlideshow.tsx", import.meta.url)), "utf8");

test("the slideshow names itself a carousel", () => {
  assert.match(source, /aria-roledescription="carousel"/);
});

test("the live region is off while the slides rotate and polite once they stop", () => {
  assert.match(source, /aria-live=\{rotating \? "off" : "polite"\}/);
});

// The owner asked for the pause button to go (2026-10-29). Hover and focus
// still hold the rotation; there is no visible stop control.
test("there is no pause control and no copy for one", () => {
  assert.ok(!/ariaPause|ariaPlay|togglePlay/.test(source));
  assert.ok(!("ariaPause" in heroControls) && !("ariaPlay" in heroControls));
});
