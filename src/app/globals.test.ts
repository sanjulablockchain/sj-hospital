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

// The brand palette (home page v4) is a second set of values for the SAME
// tokens the default palette defines, switched on by data-palette="brand".
// The shared chrome (header, footer, toggles, floating rail) paints from those
// tokens without knowing which palette it is under, so a token the default
// block defines and the brand block forgets would silently fall through to
// the navy value on a purple page.
test("the brand palette defines every token the default palette defines, in both themes", () => {
  const block = (selector: string) => {
    const start = declarations.indexOf(selector + " {");
    assert.ok(start !== -1, `missing block ${selector}`);
    return declarations.slice(start, declarations.indexOf("}", start));
  };
  const tokensIn = (text: string) => [...text.matchAll(/(--home-[a-z0-9-]+):/g)].map((m) => m[1]);

  // The default palette is declared across several [data-sj] blocks (the
  // core tokens, then the hover tokens further down), so collect from all of
  // them rather than the first match only.
  const defaults = new Set<string>();
  for (const match of declarations.matchAll(/\n\[data-sj\](?:\[data-theme="light"\])? \{([^}]*)\}/g)) {
    for (const token of tokensIn(match[1])) defaults.add(token);
  }
  assert.ok(defaults.size >= 10, `only ${defaults.size} default tokens found`);

  const light = new Set(tokensIn(block('[data-sj][data-palette="brand"]')));
  const dark = new Set(tokensIn(block('[data-sj][data-palette="brand"][data-theme="dark"]')));

  for (const token of defaults) {
    assert.ok(light.has(token), `brand palette (light) is missing ${token}`);
  }
  // Fixed-value tokens are declared once, in the light block; the dark block
  // must redefine every token whose value changes with the theme.
  for (const token of [
    "--home-bg",
    "--home-surface",
    "--home-surface-2",
    "--home-heading",
    "--home-body",
    "--home-muted",
    "--home-muted-2",
    "--home-hairline",
    "--home-hairline-strong",
    "--home-brand-text",
    "--home-accent-soft",
    "--home-sky-bg",
    "--home-sky-bg-2",
    "--home-chip-on",
    "--home-chip-on-fg",
    "--home-fade-a",
    "--home-fade-b",
    "--home-fade-c",
    "--home-dot",
  ]) {
    assert.ok(dark.has(token), `brand palette (dark) is missing ${token}`);
  }
  // The header's Book now paints from the CTA pair in every palette.
  for (const token of ["--home-cta-bg", "--home-cta-fg", "--home-cta-hover"]) {
    assert.ok(defaults.has(token), `default palette is missing ${token}`);
    assert.ok(light.has(token), `brand palette is missing ${token}`);
  }
});

// Neither the browser's own stylesheet nor Tailwind's preflight gives a
// native <button> a pointer cursor (unlike an <a> with an href), so every
// button-based control on the site rendered the plain arrow cursor on
// hover: the v4 home page's carousel arrows among them. Scoped to
// [data-sj], which every page's ThemedShell renders inside, so one rule
// fixes it site-wide rather than only on the home page.
test("an enabled button gets a pointer cursor", () => {
  assert.match(
    declarations,
    /\[data-sj\]\s*button:not\(:disabled\)\s*\{[^}]*cursor:\s*pointer/,
    "no rule gives an enabled <button> under [data-sj] a pointer cursor"
  );
});

// Toggling the theme flips a batch of CSS custom properties, which cannot be
// transitioned directly: the colour under every background, border and icon
// on the page changes in a single frame. `.sj-theme-transitioning` is a class
// applied to #sj-root for one moment around a toggle (see useSiteTheme.tsx),
// so every descendant crossfades instead of snapping. It is deliberately its
// own opt-in class rather than a permanent rule on every element: an
// always-on rule would sit outside any @layer, so it would beat every
// Tailwind utility class at equal specificity regardless of source order
// (unlayered CSS outranks every layer), overriding the site's own hover-tuned
// durations (the header's scroll fade, the FAQ toggle's "+", every sj-invert
// hover) rather than only the moment a toggle fires.
test("the theme toggle crossfades colours instead of snapping, without touching hover-tuned transitions", () => {
  assert.match(
    declarations,
    /\.sj-theme-transitioning,\s*\.sj-theme-transitioning\s+\*\s*\{[^}]*transition-property:[^};]*background-color[^};]*color[^};]*border-color/,
    "no .sj-theme-transitioning rule crossfades background, text and border colour on both the element and its descendants"
  );
  assert.match(
    declarations,
    /@media \(prefers-reduced-motion:\s*reduce\)\s*\{[^}]*\.sj-theme-transitioning[^}]*\}/,
    "the theme crossfade is not disabled under prefers-reduced-motion: reduce"
  );
});
