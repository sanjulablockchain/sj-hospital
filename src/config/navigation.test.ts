import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { homeFooterColumns } from "./homeNavigation.ts";
import { healthTipsFooterColumns } from "./healthTipsNavigation.ts";
import { servicesFooterColumns } from "./servicesNavigation.ts";
import { pharmacyFooterColumns } from "./pharmacyNavigation.ts";
import { facilitiesFooterColumns } from "./facilitiesNavigation.ts";
import { internationalFooterColumns } from "./internationalNavigation.ts";
import { networkFooterColumns } from "./networkNavigation.ts";
import { mediaFooterColumns } from "./mediaNavigation.ts";
import { wellnessFooterColumns } from "./wellnessNavigation.ts";
import { careerFooterColumns } from "./careerNavigation.ts";
import { aboutFooterColumns } from "./aboutNavigation.ts";
import { contactFooterColumns } from "./contactNavigation.ts";
import { accommodationFooterColumns } from "./accommodationNavigation.ts";
import { channelingFooterColumns } from "./channelingNavigation.ts";
import { privacyFooterColumns } from "./privacyNavigation.ts";
import { homeCareFooterColumns } from "./homeCareNavigation.ts";

// The header's own tree (one for the whole site, src/config/megaNavigation.ts)
// is checked in megaNavigation.test.ts. This file covers the per-page footers
// and the chrome wiring around them.

// Every footer on the site. About us, Contact us and Accommodation were each
// unreachable before this change: no footer anywhere linked to them, so the
// only way in was to type the URL. This list is what the reachability checks
// below iterate over.
const ALL_FOOTERS = [
  aboutFooterColumns,
  contactFooterColumns,
  accommodationFooterColumns,
  channelingFooterColumns,
  privacyFooterColumns,
  careerFooterColumns,
  facilitiesFooterColumns,
  healthTipsFooterColumns,
  internationalFooterColumns,
  mediaFooterColumns,
  networkFooterColumns,
  pharmacyFooterColumns,
  servicesFooterColumns,
  wellnessFooterColumns,
  homeCareFooterColumns,
  homeFooterColumns,
];

// The bands on /home-care that only summarise a page which already owns the
// detail. Both must stay outbound links: the point of keeping those two bands
// thin is that the reader ends up on the page holding the real content, and a
// bare hash would strand them on the summary.
test("the home care footer sends medicine and telemedicine to the pages that own them", () => {
  const hrefs = homeCareFooterColumns.flatMap((c) => c.links.map((l) => l.href));
  assert.ok(hrefs.includes("/pharmacy#delivery"), "no pharmacy delivery link");
  assert.ok(hrefs.includes("/services/telemedicine"), "no telemedicine link");
});

// Footer columns were checked for reachability and shape but never against the
// home page's teaser bands, so two links in the home footer (Surgical care ->
// #surgical, Media -> #media) still scrolled to a teaser while the pages they
// name sat a click further away.
//
// The home footer is the one footer this rule can apply to wholesale. Every
// other page owns sections worth linking to, which is why facilitiesFooter
// legitimately carries #theatres and #rooms; but every band on the home page is
// a teaser for a page somewhere else, so nothing there should hold a reader on
// the home page. #top is the exception a back-to-top link needs.
test("every home footer link leaves the page, apart from back to top", () => {
  const hrefs = homeFooterColumns.flatMap((column) => column.links.map((link) => link.href));
  assert.ok(hrefs.length > 10, `only found ${hrefs.length} home footer links`);
  for (const href of hrefs) {
    if (href === "#top") continue;
    assert.ok(!href.startsWith("#"), `the home chrome links ${href}, which scrolls in place`);
  }
});

// The three pages that were unreachable before this change. No footer column
// anywhere linked to them, so on the redesigned site the only way in was to
// type the URL. These assertions are the reason the wiring cannot regress.
//
// A page is exempt from linking to itself: /about-us does not need an "About
// us" entry in its own footer, and adding one would be a self-link. OWN records
// that exemption per page.
test("every footer reaches about, contact and accommodation", () => {
  const REQUIRED = ["/about-us", "/contact-us", "/accommodation"];
  const OWN = new Map([
    [aboutFooterColumns, "/about-us"],
    [contactFooterColumns, "/contact-us"],
    [accommodationFooterColumns, "/accommodation"],
  ]);
  for (const columns of ALL_FOOTERS) {
    const hrefs = columns.flatMap((c) => c.links.map((l) => l.href));
    for (const href of REQUIRED) {
      if (OWN.get(columns) === href) continue;
      assert.ok(hrefs.includes(href), `no ${href} in ${columns[0].heading}`);
    }
  }
});

// The privacy policy takes no self-link exemption, unlike the three above.
// A policy page is the one page a reader may arrive at from anywhere and then
// want to leave and come back to, and every footer on the web carries the link
// unconditionally, including on the policy itself. It was briefly reachable
// only from its own footer, which is to say not reachable at all.
test("every footer reaches the privacy policy, with no exemption", () => {
  for (const columns of ALL_FOOTERS) {
    const hrefs = columns.flatMap((c) => c.links.map((l) => l.href));
    assert.ok(
      hrefs.includes("/privacy-policy"),
      `no /privacy-policy in the footer whose first column is ${columns[0].heading}`
    );
  }
});

test("footer links are either bare hashes or absolute paths", () => {
  for (const columns of ALL_FOOTERS) {
    for (const column of columns) {
      for (const link of column.links) {
        assert.ok(
          link.href.startsWith("#") || link.href.startsWith("/"),
          `${link.label} points at ${link.href}`
        );
      }
    }
  }
});

test("no footer column is empty and no heading repeats within a page", () => {
  for (const columns of ALL_FOOTERS) {
    const headings = columns.map((c) => c.heading);
    assert.equal(new Set(headings).size, headings.length, `duplicate heading in ${headings}`);
    for (const column of columns) {
      assert.ok(column.links.length > 0, `${column.heading} has no links`);
    }
  }
});

// Walks src/features for every *Hero.tsx file, the same set `globSync("src/
// features/**/*Hero.tsx")` would return. Written by hand instead: the
// @types/node version pinned in this repo (20.x) predates fs.globSync's type
// declarations, so importing it fails `tsc --noEmit` even though the pinned
// Node runtime (which does have it) would run it fine.
function findHeroFiles(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...findHeroFiles(full));
    else if (entry.isFile() && entry.name.endsWith("Hero.tsx")) found.push(full);
  }
  return found;
}

// Walks all of src for every .ts/.tsx file, the same set
// `globSync("src/**/*.{ts,tsx}")` would return. Written by hand instead, for
// the same reason findHeroFiles above is: @types/node@20 (pinned in this
// repo) predates fs.globSync's type declarations, so importing it fails
// `tsc --noEmit` even though the pinned Node runtime would run it fine.
function findSourceFiles(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...findSourceFiles(full));
    else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")))
      found.push(full);
  }
  return found;
}

// Strips full-line `//` comments and `/* ... */` blocks (the only comment
// styles this codebase uses; nothing here ever trails a comment after real
// code on the same line). Used below so a comment that merely *names* a
// retired component, e.g. "the old page's page-banner title", cannot fail
// the identifier checks meant for actual code.
function stripCommentLines(src: string): string {
  let inBlock = false;
  return src
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (inBlock) {
        if (trimmed.endsWith("*/")) inBlock = false;
        return "";
      }
      if (trimmed.startsWith("/*")) {
        if (!trimmed.endsWith("*/")) inBlock = true;
        return "";
      }
      if (trimmed.startsWith("//") || trimmed.startsWith("*")) return "";
      return line;
    })
    .join("\n");
}

// MobileNavPanel and HomeHeader joined the list with the mega menu: the
// hamburger now opens MobileNavDrawer, and the home page takes the header from
// ThemedShell like every other page. translateNavItems went with the per-page
// nav arrays it translated.
const RETIRED_COMPONENTS = [
  "SiteHeader",
  "SiteFooter",
  "PageBanner",
  "BackToTopButton",
  "MobileNav",
  "MobileNavPanel",
  "HomeHeader",
];
const RETIRED_IDENTIFIERS = ["primaryNavigation", "footerQuickLinks", "translateNavItems"];

// The old chrome is gone. These files were the last thing rendering the
// pre-redesign header, footer and page banner, and (marketing) was the only
// route group still using them. A stray re-import would silently reintroduce a
// second design system, so it fails the suite instead.
//
// This matches actual code references, not any occurrence of the word: an
// import from the retired module's path, a JSX usage, or (for the two nav
// exports, comment-stripped first) a bare identifier reference. Comments
// don't produce valid `from "..."` or `<Foo` syntax, so the component checks
// need no stripping; the identifier checks do, since a plain word like
// "primaryNavigation" could otherwise appear inside a sentence.
//
// MobileNav shares this generic treatment with the others rather than a
// narrower path-only special case: MobileNavDrawer (which stays) does not
// false-positive on either half. The path pattern requires the closing quote
// immediately after the name, so "MobileNavDrawer" never matches "MobileNav"
// there; the JSX pattern's `\b` requires a word boundary, and there isn't one
// between the "v" and the "D" in "<MobileNavDrawer".
test("the retired chrome is not referenced anywhere in src", () => {
  const files = findSourceFiles("src");
  for (const file of files) {
    if (file.endsWith("navigation.test.ts")) continue;
    const src = readFileSync(file, "utf8");

    for (const name of RETIRED_COMPONENTS) {
      const importPath = new RegExp(`from\\s+["'][^"']*/${name}["']`);
      const jsxUsage = new RegExp(`<${name}\\b`);
      assert.ok(!importPath.test(src), `${file} imports the retired ${name} module`);
      assert.ok(!jsxUsage.test(src), `${file} still renders <${name}`);
    }

    const stripped = stripCommentLines(src);
    for (const name of RETIRED_IDENTIFIERS) {
      const identifier = new RegExp(`\\b${name}\\b`);
      assert.ok(!identifier.test(stripped), `${file} still references ${name} outside a comment`);
    }
  }
});

// Every hero on the site closes with a marquee under the fact strip, and it is
// the band that tells a reader at a glance what the page covers. /home-care
// shipped without one and nothing failed, because the convention lived in
// thirteen files and in nobody's test. It lives here now.
//
// Matches any component whose name ends in Ticker, not just <Ticker: /health-tips
// wraps its own TipsTicker around a live seasonal list, and the home page's
// StatTicker wraps the shared one. Both are the band this is asking for.
//
// ServiceHero is the one exemption, and it is a real one rather than a file that
// slipped through. It is not a page hero: it is a single template rendered for
// all 37 service detail routes, and it closes on `service.strip`, the per
// service stat row, which is that band's equivalent. A ticker there would need
// eight phrases per service, invented 37 times over.
const HERO_WITHOUT_TICKER = "ServiceHero.tsx";

test("every page hero closes with a ticker", () => {
  const heroes = findHeroFiles("src/features");
  assert.ok(heroes.length >= 6, `only found ${heroes.length} heroes`);
  const checked = heroes.filter((file) => !file.endsWith(HERO_WITHOUT_TICKER));
  assert.equal(checked.length, heroes.length - 1, "the ServiceHero exemption no longer matches");
  for (const file of checked) {
    const src = stripCommentLines(readFileSync(file, "utf8"));
    assert.match(src, /<\w*Ticker\b/, `${file} renders no ticker`);
  }
});

// The header is fixed over the page and rendered once, by ThemedShell. A hero
// that rendered its own copy would stack a second header under the first, and
// a page whose shell forgot it would have no navigation at all. Both fail here.
// The "Book now" target is no longer a per-hero prop for the same reason: the
// one header owns it, so it means the same thing on every page by construction.
test("ThemedShell renders the header and no hero does", () => {
  const shell = readFileSync("src/components/layout/ThemedShell.tsx", "utf8");
  assert.match(shell, /<ThemedHeader\b/, "ThemedShell does not render ThemedHeader");

  for (const file of findSourceFiles("src")) {
    if (file.endsWith("ThemedShell.tsx") || file.endsWith("navigation.test.ts")) continue;
    const src = readFileSync(file, "utf8");
    assert.ok(!/<ThemedHeader\b/.test(src), `${file} renders its own ThemedHeader`);
  }
});

// Heroes used to hold the header in their flow, so the hero copy started 88px
// down. With the header fixed, each hero pads by the header's height instead
// so nothing moves and the first line of copy never slides under the bar.
test("every hero pads for the fixed header", () => {
  const heroes = [...findHeroFiles("src/features"), "src/app/[locale]/privacy-policy/_components/PolicyHero.tsx"];
  assert.ok(heroes.length >= 6, `only found ${heroes.length} heroes`);
  for (const file of heroes) {
    const src = readFileSync(file, "utf8");
    assert.ok(src.includes("pt-[var(--sj-header-h)]"), `${file} does not pad for the header`);
  }
});

// Anchor scrolling has to clear the fixed bar on every page now, so the
// per-layout flowHeader switch that used to cancel the offset is gone.
test("no layout opts out of the sticky-header anchor offset", () => {
  for (const file of findSourceFiles("src")) {
    if (file.endsWith("navigation.test.ts")) continue;
    const src = readFileSync(file, "utf8");
    assert.ok(!/\bflowHeader\b/.test(src), `${file} still uses flowHeader`);
  }
  const css = readFileSync("src/app/globals.css", "utf8");
  assert.ok(!css.includes("data-flow-header"), "globals.css still carries the data-flow-header rule");
  assert.match(css, /scroll-margin-top:\s*calc\(var\(--sj-header-h\)/, "anchor offset is not derived from the header height");
});
