import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync("src/app/globals.css", "utf8");

/**
 * globals.css with `/* ... *\/` blocks removed. Same reason navigation.test.ts
 * strips comments before its identifier checks: a comment that merely names a
 * retired value, e.g. recording which purple the scrollbar used to carry so the
 * next reader knows what was replaced, is documentation and must not fail the
 * check meant for live declarations.
 */
const declarations = css.replace(/\/\*[\s\S]*?\*\//g, "");

// The document scrollbar was the browser default while every inner scroll
// container on the site had a thin themed one, so the widest scrollbar on the
// page was the only unstyled thing on it. Both halves are needed: Firefox and
// Chrome 121+ honour the standard `scrollbar-width`, older Chromium and Safari
// need the ::-webkit- rules.
test("the document scrollbar is thinned in both syntaxes", () => {
  assert.match(css, /html\s*\{[^}]*scrollbar-width:\s*thin/, "no standard rule on html");
  assert.match(css, /html::-webkit-scrollbar\s*\{[^}]*width:/, "no webkit width rule on html");
});

// One scrollbar identity site wide. The document bar and the inner containers
// read the same custom properties, so a colour change cannot land on one and
// miss the other, which is exactly how the two drifted apart before.
test("the document and inner scrollbars share one thumb colour", () => {
  for (const prop of ["--sj-scrollbar-thumb", "--sj-scrollbar-thumb-hover"]) {
    assert.match(css, new RegExp(`${prop}:`), `${prop} is not defined`);
  }
  const uses = css.match(/var\(--sj-scrollbar-thumb\)/g) ?? [];
  assert.ok(uses.length >= 2, `only ${uses.length} places use the shared thumb colour`);
});

// The purple `.themed-scrollbar` shipped with predates the current blue accent
// (--home-accent is #2ca6f0 dark / #0b6fc0 light), so the modal, the doctor
// directory rail and the room type nav all scrolled purple on a blue site. It
// is not a colour anyone would pick for this palette today, so its return
// should fail rather than be noticed by eye months later.
test("the retired purple scrollbar colour is gone", () => {
  assert.ok(!/74,\s*42,\s*130/.test(declarations), "the purple scrollbar thumb is back");
});
