import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { facilities } from "./data/facilities.ts";

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

// Every home band that is now only a teaser for a page of its own. Clicking a
// teaser has to leave the home page, which is the whole point of a teaser; a
// bare hash just scrolls the reader further down the page they are already on
// and the destination page never gets visited.
//
// This is the same failure navigation.test.ts already guards for the header
// and footer ("no nav item still points at a retired home or services band").
// The teaser cards were missed by that check because they are not nav items,
// so thirteen of them still scrolled in place.
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

// The four facilities cards are rendered from data, so their hrefs never
// appear as literals in the JSX above. Each one has a section of its own on
// /facilities except the rooms card, which belongs to /accommodation.
test("every facilities teaser card reaches a page, not a home anchor", () => {
  assert.equal(facilities.length, 4);
  for (const card of facilities) {
    assert.ok(card.href.startsWith("/"), `${card.title} links ${card.href}`);
    assert.ok(card.linkLabel.trim().length > 0, `${card.title} has no link label`);
  }
});

// Deep links, not just the page root: a reader who clicks "Reports read twice"
// on the imaging card should land on the diagnostics section, not at the top of
// a long facilities page with the relevant part somewhere below the fold.
test("the facilities teasers deep link to the section each one describes", () => {
  const byTitle = new Map(facilities.map((card) => [card.title, card.href]));
  assert.equal(byTitle.get("Six floor hospital"), "/facilities#ambulance");
  assert.equal(byTitle.get("Outpatient wing"), "/facilities#floors");
  assert.equal(byTitle.get("Imaging, lab & theatres"), "/facilities#diagnostic");
  assert.equal(byTitle.get("Inpatient rooms"), "/accommodation#rooms");
});
