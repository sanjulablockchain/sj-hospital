import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { heroSlides } from "./heroSlides.ts";

// A slide whose file is missing renders as a blank layer for a third of the
// rotation, and nothing in the build catches it: next/image resolves the URL
// at request time. Check the disk here instead.
test("every hero slide points at a file that ships in public/", () => {
  for (const slide of heroSlides) {
    const onDisk = fileURLToPath(new URL(`../../../../public${slide.src}`, import.meta.url));
    assert.ok(existsSync(onDisk), `${slide.src} is not in public/`);
  }
});

test("hero slides are distinct and there are enough of them to rotate", () => {
  assert.ok(heroSlides.length >= 2);
  assert.equal(new Set(heroSlides.map((slide) => slide.src)).size, heroSlides.length);
});

// `hero.photoAlt` says "building at dusk" in all three languages and is
// attached to the first slide only, so the first slide has to be that shot.
test("the first slide is the dusk facade the translated alt text describes", () => {
  assert.match(heroSlides[0].src, /dusk/);
});

test("every slide carries a focal-point class for object-cover cropping", () => {
  for (const slide of heroSlides) {
    assert.match(slide.positionClass, /object-\[/, `${slide.src} needs an object-position`);
  }
});
