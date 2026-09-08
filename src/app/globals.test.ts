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

// [data-sj] and its .font-display heading utility must read the two custom
// properties that actually vary by locale, --sj-body and --sj-display, rather
// than a fixed font stack or the @theme inline --font-sans/--font-heading
// pair (whose generated utilities bake in a value and are not used by the
// site at all). Rebinding those two instead of these two is exactly the bug
// this stylesheet shipped with.
test("[data-sj] and its heading utility read the shared body/display variables", () => {
  assert.match(
    declarations,
    /\[data-sj\]\s*\{[^}]*font-family:\s*var\(--sj-body\)/,
    "[data-sj] does not paint with var(--sj-body)"
  );
  assert.match(
    declarations,
    /\[data-sj\]\s*\.font-display\s*\{[^}]*font-family:\s*var\(--sj-display\)/,
    "[data-sj] .font-display does not paint with var(--sj-display)"
  );
});

// Both html[lang="si"] and html[lang="ta"] must rebind both variables, each
// with its own script's font first, so a Sinhala or Tamil page actually picks
// up its own type instead of silently falling back to the English faces.
test("Sinhala and Tamil each rebind both shared font variables with their own faces", () => {
  const siBlockMatch = declarations.match(/html\[lang="si"\]\s*\{([^}]*)\}/);
  const taBlockMatch = declarations.match(/html\[lang="ta"\]\s*\{([^}]*)\}/);
  assert.ok(siBlockMatch, "no html[lang=\"si\"] rule");
  assert.ok(taBlockMatch, "no html[lang=\"ta\"] rule");

  const siBlock = siBlockMatch![1];
  const taBlock = taBlockMatch![1];

  assert.match(siBlock, /--sj-body:[^;]*--font-noto-sinhala/, "si does not rebind --sj-body with the Sinhala face");
  assert.match(siBlock, /--sj-display:[^;]*--font-gemunu/, "si does not rebind --sj-display with the Sinhala display face");

  assert.match(taBlock, /--sj-body:[^;]*--font-noto-tamil/, "ta does not rebind --sj-body with the Tamil face");
  assert.match(taBlock, /--sj-display:[^;]*--font-catamaran/, "ta does not rebind --sj-display with the Tamil display face");

  // The Latin face must come FIRST in every locale stack. A browser picks a
  // font per character and falls through only on a missing glyph, and all four
  // script faces ship Latin glyphs of their own, so script-first made them
  // paint the English text too: the English hero heading rendered in Gemunu
  // Libre on /si and Catamaran on /ta, and English body copy in Noto Sans
  // Sinhala rather than Manrope. The assertions above pass either way, which
  // is exactly why that shipped, so these pin the order rather than the
  // membership.
  const order: Array<[string, string, string, string]> = [
    ["si", siBlock, "--sj-body", "--font-manrope"],
    ["si", siBlock, "--sj-display", "--font-bricolage"],
    ["ta", taBlock, "--sj-body", "--font-manrope"],
    ["ta", taBlock, "--sj-display", "--font-bricolage"],
  ];
  for (const [locale, block, property, latin] of order) {
    const value = block.match(new RegExp(property + ":([^;]*)"))?.[1];
    assert.ok(value, `${locale} has no ${property}`);
    const families = value!.split(",").map((part) => part.trim());
    assert.ok(
      families[0]?.includes(latin),
      `${locale} ${property} must list ${latin} first so English keeps its own` +
        ` typeface; found "${families[0]}". A script face first repaints every` +
        ` English word on the page, which is most of it.`
    );
  }
});
