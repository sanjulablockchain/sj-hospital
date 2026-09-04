import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import {
  isSignedOff,
  overlayFiles,
  readReviewMarker,
  SRC_DIR,
  toRelative,
} from "./overlayFiles.ts";

/**
 * Binds the overlays on disk to the overlays the suite actually checks.
 *
 * Every feature's parity, array-length and identity tests are hand-written
 * lists of imports, so an overlay nobody remembered to import is verified by
 * nothing while the suite stays green. That is not hypothetical: final review
 * 3 confirmed that `chromeCopy.si.ts` and `chromeCopy.ta.ts` had been sitting
 * outside the harness the whole time, carrying the strings on every page in
 * every locale, and that a brand-new feature whose overlays were verbatim
 * English left the suite at 469 pass / 0 fail.
 *
 * The check is deliberately structural rather than clever: walk `src` for
 * overlay files, walk `src` for test files, read the import specifiers out of
 * each test, and fail when an overlay appears in the first list and not the
 * second. It cannot tell a thorough test from a lazy one, but it can tell the
 * difference between covered and forgotten, which is the failure that has
 * actually happened here twice.
 */

/**
 * The two cross-cutting walkers do not name overlays in their imports: they
 * discover them from the filesystem, the way this file does. Listing them here
 * documents that, and stops a future static import in either one from
 * satisfying the binding for free.
 */
const WALKERS = new Set([
  "src/lib/i18n/overlayCoverage.test.ts",
  "src/lib/i18n/overlayNumerals.test.ts",
]);

const OVERLAY_NAME = /\.(si|ta)\.tsx?$/;

function testFiles(dir: string, into: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) testFiles(path, into);
    else if (entry.name.endsWith(".test.ts") || entry.name.endsWith(".test.tsx")) into.push(path);
  }
  return into;
}

/** Every overlay some test file imports by name, as a repository-relative path. */
function overlaysUnderTest(): Map<string, string[]> {
  const found = new Map<string, string[]>();

  for (const file of testFiles(SRC_DIR)) {
    if (WALKERS.has(toRelative(file))) continue;
    const source = readFileSync(file, "utf8");

    for (const match of source.matchAll(/(?:from|import)\s*\(?\s*["']([^"']+)["']/g)) {
      const specifier = match[1];
      if (!specifier.startsWith(".")) continue;
      if (!OVERLAY_NAME.test(specifier)) continue;

      const overlay = toRelative(resolve(dirname(file), specifier));
      found.set(overlay, [...(found.get(overlay) ?? []), toRelative(file)]);
    }
  }

  return found;
}

test("every overlay on disk is imported by a test that checks it", () => {
  const underTest = overlaysUnderTest();
  const unbound = overlayFiles()
    .map((overlay) => overlay.relative)
    .filter((relative) => !underTest.has(relative));

  assert.deepEqual(
    unbound,
    [],
    `${unbound.length} overlay(s) on disk are imported by no test, so nothing checks ` +
      `their parity, their array lengths or whether they are still the English ` +
      `string: ${unbound.join(", ")}. Add them to their feature's own ` +
      `\`*.i18n.test.ts\` (copy the shape of ` +
      `src/features/contact/data/content.i18n.test.ts), which is what makes an ` +
      `overlay verified rather than merely present.`
  );
});

test("no test imports an overlay that is not on disk", () => {
  const onDisk = new Set(overlayFiles().map((overlay) => overlay.relative));
  const stale = [...overlaysUnderTest().keys()].filter((relative) => !onDisk.has(relative));
  assert.deepEqual(stale, [], `imported but missing: ${stale.join(", ")}`);
});

// The review gate reads these markers, so their shape is part of the contract
// and belongs under test rather than only being asserted by the script that
// consumes it. Nothing here flips a status: `draft` is the correct value for
// every overlay until a Sinhala or Tamil speaker signs it off, and that is
// their act, not the suite's.
test("every overlay carries a well-formed __review marker", async () => {
  for (const overlay of overlayFiles()) {
    const marker = await readReviewMarker(overlay.path);
    assert.ok(
      marker.status === "draft" || marker.status === "reviewed",
      `${overlay.relative} has __review.status "${marker.status}". It must be exactly ` +
        `"draft" or "reviewed": anything else, including a missing or unreadable ` +
        `marker, leaves npm run i18n:status unable to say whether a speaker has read ` +
        `the file.`
    );
    assert.ok(
      marker.status !== "reviewed" || isSignedOff(marker),
      `${overlay.relative} is marked reviewed with no reviewer named. A sign-off with ` +
        `nobody's name on it is not a sign-off.`
    );
  }
});

test("a sign-off needs a name on it", () => {
  assert.equal(isSignedOff({ status: "reviewed", reviewer: "A speaker" }), true);
  assert.equal(isSignedOff({ status: "reviewed", reviewer: null }), false);
  assert.equal(isSignedOff({ status: "reviewed", reviewer: "   " }), false);
  assert.equal(isSignedOff({ status: "draft", reviewer: "A speaker" }), false);
});
