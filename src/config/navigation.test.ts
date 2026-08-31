import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { homeNavigation, homeFooterColumns } from "./homeNavigation.ts";
import { healthTipsNavigation, healthTipsFooterColumns } from "./healthTipsNavigation.ts";
import { servicesNavigation, servicesDetailNavigation, servicesFooterColumns } from "./servicesNavigation.ts";
import { pharmacyNavigation, pharmacyFooterColumns } from "./pharmacyNavigation.ts";
import { facilitiesNavigation, facilitiesFooterColumns } from "./facilitiesNavigation.ts";
import { internationalNavigation, internationalFooterColumns } from "./internationalNavigation.ts";
import { networkNavigation, networkFooterColumns } from "./networkNavigation.ts";
import { mediaNavigation, mediaFooterColumns } from "./mediaNavigation.ts";
import { wellnessNavigation, wellnessFooterColumns } from "./wellnessNavigation.ts";
import { careerNavigation, careerFooterColumns } from "./careerNavigation.ts";
import { aboutNavigation, aboutFooterColumns } from "./aboutNavigation.ts";
import { contactNavigation, contactFooterColumns } from "./contactNavigation.ts";
import { accommodationNavigation, accommodationFooterColumns } from "./accommodationNavigation.ts";
import { channelingNavigation, channelingFooterColumns } from "./channelingNavigation.ts";
import { privacyNavigation, privacyFooterColumns } from "./privacyNavigation.ts";
import { homeCareNavigation, homeCareFooterColumns } from "./homeCareNavigation.ts";

const labels = (items: { label: string }[]) => items.map((i) => i.label);

// Every nav on the site. Add a page's nav here when you add the page: these
// checks are what caught the health tips, pharmacy and facilities navs
// drifting apart from each other when three branches landed in turn.
const ALL_NAVS = [
  homeNavigation,
  healthTipsNavigation,
  servicesNavigation,
  servicesDetailNavigation,
  pharmacyNavigation,
  facilitiesNavigation,
  internationalNavigation,
  networkNavigation,
  mediaNavigation,
  wellnessNavigation,
  careerNavigation,
  aboutNavigation,
  contactNavigation,
  accommodationNavigation,
  channelingNavigation,
  privacyNavigation,
  homeCareNavigation,
];

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

// The header must read identically on every page: only the targets differ.
// This is the check that stops a new page's nav from quietly growing its own
// items, which is exactly what the health tips reference design did.
test("every page's nav carries the same labels in the same order", () => {
  const expected = labels(homeNavigation);
  for (const nav of ALL_NAVS) assert.deepEqual(labels(nav), expected);
});

// A page whose nav points at its own section uses a bare hash; every other
// nav has to reach the page itself. Getting this wrong is invisible until
// someone clicks, so it is asserted rather than reviewed.
test("Health Tips points at the health tips page from every nav but its own", () => {
  for (const nav of ALL_NAVS) {
    if (nav === healthTipsNavigation) continue;
    const item = nav.find((i) => i.label === "Health Tips");
    assert.ok(item, "no Health Tips item");
    assert.equal(item.href, "/health-tips");
  }
});

test("Facilities, Pharmacy, International and Media reach their pages from every other nav", () => {
  for (const nav of ALL_NAVS) {
    for (const [label, href] of [
      ["Facilities", "/facilities"],
      ["Pharmacy", "/pharmacy"],
      ["International Patient Care", "/international-care"],
      ["School Wellness", "/school-wellness"],
      ["Network", "/network"],
      ["Media", "/media"],
      ["Careers", "/careers"],
      ["Care at Home", "/home-care"],
    ]) {
      const item = nav.find((i) => i.label === label);
      assert.ok(item, `no ${label} item`);
      // The page's own nav anchors into itself instead; anything else must be
      // the page, never a superseded /services band.
      if (item.href.startsWith("#")) continue;
      assert.equal(item.href, href, `${label} points at ${item.href}`);
    }
  }
});

test("on the health tips page itself, Health Tips is an in-page anchor", () => {
  const item = healthTipsNavigation.find((i) => i.label === "Health Tips");
  assert.ok(item);
  assert.equal(item.href, "#library");
});

test("on the international page itself, International Patient Care is an in-page anchor", () => {
  const item = internationalNavigation.find((i) => i.label === "International Patient Care");
  assert.ok(item);
  assert.equal(item.href, "#journey");
});

test("on the network page itself, Network is an in-page anchor", () => {
  const item = networkNavigation.find((i) => i.label === "Network");
  assert.ok(item);
  assert.equal(item.href, "#family");
});

test("on the school wellness page itself, School Wellness is an in-page anchor", () => {
  const item = wellnessNavigation.find((i) => i.label === "School Wellness");
  assert.ok(item);
  assert.equal(item.href, "#programme");
});

test("on the careers page itself, Careers is an in-page anchor", () => {
  const item = careerNavigation.find((i) => i.label === "Careers");
  assert.ok(item);
  assert.equal(item.href, "#openings");
});

test("on the media page itself, Media is an in-page anchor", () => {
  const item = mediaNavigation.find((i) => i.label === "Media");
  assert.ok(item);
  assert.equal(item.href, "#newsroom");
});

test("on the home care page itself, Care at Home is an in-page anchor", () => {
  const item = homeCareNavigation.find((i) => i.label === "Care at Home");
  assert.ok(item);
  assert.equal(item.href, "#visits");
});

// Care at Home is the tenth nav item, and the four bands it gathers all had a
// home elsewhere first: home visits and telemedicine as service detail pages,
// medicine delivery on /pharmacy too. So the label has to reach the new page
// rather than deep linking into whichever of those came to mind, or the nav
// would mean something different depending on the page you clicked it from.
test("Care at Home reaches the home care page from every nav but its own", () => {
  for (const nav of ALL_NAVS) {
    if (nav === homeCareNavigation) continue;
    const item = nav.find((i) => i.label === "Care at Home");
    assert.ok(item, "no Care at Home item");
    assert.equal(item.href, "/home-care");
  }
});

// The bands on /home-care that only summarise a page which already owns the
// detail. Both must stay outbound links: the point of keeping those two bands
// thin is that the reader ends up on the page holding the real content, and a
// bare hash would strand them on the summary.
test("the home care footer sends medicine and telemedicine to the pages that own them", () => {
  const hrefs = homeCareFooterColumns.flatMap((c) => c.links.map((l) => l.href));
  assert.ok(hrefs.includes("/pharmacy#delivery"), "no pharmacy delivery link");
  assert.ok(hrefs.includes("/services/telemedicine"), "no telemedicine link");
});

test("no nav item still points at the superseded home network band", () => {
  for (const nav of ALL_NAVS) {
    const item = nav.find((i) => i.label === "Network");
    assert.ok(item, "no Network item");
    // Only the network page's own nav may anchor into itself with #family;
    // every other nav must reach the page, or this could regress to #family
    // without the test noticing.
    const allowed = nav === networkNavigation ? ["#family", "/network"] : ["/network"];
    assert.ok(allowed.includes(item.href), `Network points at ${item.href}`);
  }
});

test("no nav item still points at a retired home or services band", () => {
  for (const nav of ALL_NAVS) {
    for (const item of nav) {
      assert.ok(!/#tips$/.test(item.href), `${item.label} still points at ${item.href}`);
      // International patient care has a page of its own now, so neither the
      // home band nor the /services band is a valid target any more.
      assert.ok(!/#international$/.test(item.href), `${item.label} still points at ${item.href}`);
      // Media has a page of its own now, so the home page's #media teaser band
      // is no longer a valid nav target either.
      assert.ok(!/#media$/.test(item.href), `${item.label} still points at ${item.href}`);
      // And the same for Network, whose #network band on the home page is now
      // only a teaser.
      assert.ok(!/#network$/.test(item.href), `${item.label} still points at ${item.href}`);
      // School wellness has a page of its own now, so the home page's #wellness
      // teaser band is no longer a valid nav target either.
      assert.ok(!/#wellness$/.test(item.href), `${item.label} still points at ${item.href}`);
      // And the same for Careers: the home page's #career band is now only a
      // five-row teaser, and /careers carries the roles, the hiring process and
      // the application form.
      assert.ok(!/#career$/.test(item.href), `${item.label} still points at ${item.href}`);
    }
  }
});

// The retired-band check above covers nav items only. Footer columns were
// checked for reachability and shape but never against the bands, so two links
// in the home footer (Surgical care -> #surgical, Media -> #media) still
// scrolled to a teaser while the pages they name sat a click further away.
//
// The home footer is the one footer this rule can apply to wholesale. Every
// other page owns sections worth linking to, which is why facilitiesFooter
// legitimately carries #theatres and #rooms; but every band on the home page is
// a teaser for a page somewhere else, so nothing there should hold a reader on
// the home page. #top is the exception a back-to-top link needs.
test("every home nav and footer link leaves the page, apart from back to top", () => {
  const hrefs = [
    ...homeNavigation.map((item) => item.href),
    ...homeFooterColumns.flatMap((column) => column.links.map((link) => link.href)),
  ];
  assert.ok(hrefs.length > 10, `only found ${hrefs.length} home chrome links`);
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

const RETIRED_COMPONENTS = ["SiteHeader", "SiteFooter", "PageBanner", "BackToTopButton", "MobileNav"];
const RETIRED_IDENTIFIERS = ["primaryNavigation", "footerQuickLinks"];

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
// MobileNav shares this generic treatment with the other four rather than a
// narrower path-only special case: MobileNavPanel (which stays) does not
// false-positive on either half. The path pattern requires the closing quote
// immediately after the name, so "MobileNavPanel" never matches "MobileNav"
// there; the JSX pattern's `\b` requires a word boundary, and there isn't one
// between the "v" and the "P" in "<MobileNavPanel". Verified empirically, not
// just by inspection: see the Round 2 section of the task report.
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

test("navigation.ts still exports the NavItem type every nav depends on", () => {
  const src = readFileSync("src/config/navigation.ts", "utf8");
  assert.match(src, /export type NavItem/);
  assert.ok(!src.includes("primaryNavigation"));
});

// The header's "Book now" button has to mean the same thing on every page. It
// used to be a per-page anchor (#form, #book, #enquiry, #press, #contact), so
// the same button scrolled somewhere different depending on where you clicked
// it. ThemedHeader and MobileNavPanel are off limits for this fix (their
// "#book" default stays untouched), so every hero is required to pass the
// prop explicitly instead: a hero that forgets it would silently fall back to
// the unfixed default, which is exactly the regression this guards against.
test("every hero passes bookHref=\"/e-channeling\" to ThemedHeader", () => {
  const heroes = findHeroFiles("src/features");
  assert.ok(heroes.length >= 6, `only found ${heroes.length} heroes`);
  for (const file of heroes) {
    const src = readFileSync(file, "utf8");
    if (!src.includes("<ThemedHeader")) continue;
    const match = src.match(/bookHref=\{?"([^"]+)"\}?/);
    assert.ok(match, `${file} renders ThemedHeader without an explicit bookHref`);
    assert.equal(match[1], "/e-channeling", `${file} passes bookHref="${match[1]}"`);
  }
});
