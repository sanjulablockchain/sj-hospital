import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Walks all of src for hero components. PolicyHero lives under src/app rather
// than src/features, so this starts at src. Hand-written for the same reason
// navigation.test.ts writes its own walker: @types/node@20 (pinned here)
// predates fs.globSync's type declarations, so importing it fails
// `tsc --noEmit` even though the pinned Node runtime would run it fine.
function findHeroFiles(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...findHeroFiles(full));
    else if (entry.isFile() && entry.name.endsWith("Hero.tsx")) found.push(full);
  }
  return found;
}

const HEROES = findHeroFiles("src");

/**
 * ParallaxLayer is deliberately bigger than the box it drifts inside: every
 * hero mounts it at `-top-[14%] h-[128%]` so the drift can never expose an
 * edge of the photograph. That only works if the box clips, and the box is
 * always the one carrying the hero's `min-h-[Nvh]`.
 *
 * FacilitiesHero got this wrong. Its `overflow-hidden` sat on the outer
 * <section>, but the photo lived in a nested min-h div, and the fact strip and
 * marquee are siblings *after* that div. So the photo spilled 14% of the hero's
 * height downward, past the gradient overlay (which is `inset-0` of the same
 * nested div and therefore stops short of the spill) and into the band below.
 * The fact strip hid the middle of it, being capped at `max-w-[1440px]`, but on
 * any viewport wider than that the raw, ungraded photograph showed through the
 * left and right gutters as two bright fragments.
 *
 * It is invisible below 1440px and invisible in a narrow dev window, which is
 * why it shipped, and why it is asserted here rather than left to review.
 */
test("every hero's min-height box clips the parallax layer that overflows it", () => {
  assert.ok(HEROES.length >= 14, `only found ${HEROES.length} heroes`);
  for (const file of HEROES) {
    const src = readFileSync(file, "utf8");
    if (!src.includes("<ParallaxLayer")) continue;

    // Each opening tag's className, so a min-h box is checked against the
    // classes on that same element rather than anywhere in the file.
    const classNames = [...src.matchAll(/className="([^"]*)"/g)].map((m) => m[1]);
    const boxes = classNames.filter((c) => /min-h-\[\d+(\.\d+)?vh\]/.test(c));
    assert.ok(boxes.length > 0, `${file} mounts a ParallaxLayer with no min-height box`);

    for (const box of boxes) {
      assert.ok(
        box.includes("overflow-hidden"),
        `${file} has a min-height box that does not clip its parallax photo: "${box}"`
      );
    }
  }
});
