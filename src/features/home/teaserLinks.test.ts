import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { quickAccess, specialties, pharmacy, contactCta, patientCare, whoWeAre } from "./data/content.ts";
import * as faq from "./data/faq.ts";
import * as media from "./data/media.ts";
import * as careers from "./data/careers.ts";
import * as internationalCare from "./data/internationalCare.ts";
import { networkNodes, href as networkHref } from "./data/network.ts";

// Walks src/features/home for every .ts/.tsx file. Hand-written for the same
// reason navigation.test.ts writes its own walker: @types/node@20 (pinned in
// this repo) predates fs.globSync's type declarations, so importing it fails
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

// Both spellings this feature uses: JSX attributes on the sections, and object
// literals in data/. Dynamic ones (`href={card.href}`) are deliberately not
// matched here; the data behind them is asserted separately below.
function literalHrefs(src: string): string[] {
  const found: string[] = [];
  for (const pattern of [/href=["']([^"']+)["']/g, /href:\s*["']([^"']+)["']/g]) {
    for (const match of src.matchAll(pattern)) found.push(match[1]);
  }
  return found;
}

const HOME_FILES = findSourceFiles("src/features/home").filter(
  (file) => !file.endsWith("teaserLinks.test.ts")
);

// Every home band is a teaser for a page of its own. Clicking a teaser has to
// leave the home page, which is the whole point of a teaser; a bare hash just
// scrolls the reader further down the page they are already on and the
// destination page never gets visited.
//
// This is the same failure navigation.test.ts already guards for the header
// and footer ("no nav item still points at a retired home or services band").
// The v4 reference arrived with `href="#"` on every link, so the list now
// covers its bands too.
const RETIRED_BANDS = new Map([
  ["#facilities", "/facilities"],
  ["#rooms", "/accommodation"],
  ["#media", "/media"],
  ["#network", "/network"],
  ["#wellness", "/school-wellness"],
  ["#career", "/careers"],
  ["#tips", "/health-tips"],
  ["#international", "/international-care"],
  ["#pharmacy", "/pharmacy"],
  ["#services", "/services"],
  ["#surgical", "/services/general-surgery"],
  ["#book", "/e-channeling"],
  ["#standards", "/about-us"],
  ["#voices", "/about-us"],
  ["#home-care", "/home-care"],
  ["#free-opd", "/services/outpatient-department"],
  ["#care", "/facilities"],
  ["#about", "/about-us"],
  ["#faq", "/contact-us"],
  ["#contact", "/contact-us"],
  ["#", "a real page"],
]);

test("no home teaser links to a band that now has a page of its own", () => {
  assert.ok(HOME_FILES.length > 20, `only walked ${HOME_FILES.length} files`);
  for (const file of HOME_FILES) {
    for (const href of literalHrefs(stripCommentLines(readFileSync(file, "utf8")))) {
      const page = RETIRED_BANDS.get(href);
      assert.ok(!page, `${file} links ${href}, which should reach ${page}`);
    }
  }
});

// The positive half. The check above would also pass if a teaser simply lost
// its link, so every literal href on the home page has to be a real
// destination: a route, a phone call, an email, or an external site.
test("every literal home href is a route, a call, an email or an external site", () => {
  for (const file of HOME_FILES) {
    for (const href of literalHrefs(stripCommentLines(readFileSync(file, "utf8")))) {
      assert.ok(
        href.startsWith("/") ||
          href.startsWith("tel:") ||
          href.startsWith("mailto:") ||
          href.startsWith("https://"),
        `${file} links ${href}, which goes nowhere off this page`
      );
    }
  }
});

// The data-driven destinations never appear as literals in the JSX above, so
// each is asserted here: a route on this site, a call, an email or an external
// site, and never the home page itself.
const OUTBOUND = /^(\/[a-z0-9-]+(\/[a-z0-9-]+)*(#[a-z0-9-]+)?|tel:\+94\d+|mailto:[^\s]+|https:\/\/[^\s]+)$/;

test("every destination in the home data leaves the page", () => {
  const hrefs = [
    ...whoWeAre.stats.map((s) => s.href),
    quickAccess.channel.href,
    quickAccess.emergencyCall.href,
    quickAccess.emergency.href,
    quickAccess.facilities.href,
    quickAccess.location.href,
    specialties.findDoctor.href,
    specialties.exploreMore.href,
    specialties.viewAll.href,
    ...specialties.tabs.flatMap((t) => t.links.map((l) => l.href)),
    patientCare.href,
    pharmacy.hrefPrimary,
    pharmacy.hrefSecondary,
    ...contactCta.contactRows.map((r) => r.href),
    faq.seeAll.href,
    media.href,
    media.storyHref,
    careers.href,
    careers.openingsHref,
    internationalCare.hrefPrimary,
    internationalCare.hrefSecondary,
    networkHref,
    ...networkNodes.map((node) => node.href),
  ];
  assert.ok(hrefs.length > 40, `only ${hrefs.length} data destinations found`);
  for (const href of hrefs) {
    assert.match(href, OUTBOUND, `${href} does not leave the page`);
  }
});

// The network accordion's panels used to be buttons and nothing else, so an
// open panel described a place the reader then had no way to reach.
test("every network teaser panel reaches a page, not a home anchor", () => {
  assert.equal(networkNodes.length, 4);
  for (const node of networkNodes) {
    assert.ok(node.href.startsWith("/"), `${node.name} links ${node.href}`);
    assert.ok(node.linkLabel.trim().length > 0, `${node.name} has no link label`);
  }
});

test("the network teasers each point at the page that covers that node", () => {
  const byName = new Map(networkNodes.map((node) => [node.name, node.href]));
  assert.equal(byName.get("St. Joseph Hospital"), "/facilities");
  assert.equal(byName.get("Kids & Teens Medical Group"), "/network#family");
  assert.equal(byName.get("School wellness programme"), "/school-wellness");
  assert.equal(byName.get("Telemedicine & delivery"), "/services/telemedicine");
});
