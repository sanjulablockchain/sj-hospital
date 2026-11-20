import { test } from "node:test";
import assert from "node:assert/strict";
import { COMING_SOON_SLUGS, isComingSoonHref, isComingSoonSlug } from "./comingSoon.ts";
import { serviceSlugs } from "../features/services/data/services.ts";
import { readdirSync, readFileSync } from "node:fs";

// The owner's list of services not yet open (2026-11-20). Adding or removing
// one is a decision for the owner, so this pins the list rather than its size.
const OWNER_LIST = [
  "endoscopy",
  "fertility",
  "fetal-monitoring",
  "intensive-critical-care",
  "obstetrics-maternity",
  "telemedicine",
  "vaccination-clinic",
];

test("the coming soon list is the owner's seven services", () => {
  assert.deepEqual([...COMING_SOON_SLUGS].sort(), OWNER_LIST);
});

test("every coming soon slug is a real service page", () => {
  for (const slug of COMING_SOON_SLUGS) {
    assert.ok(serviceSlugs.includes(slug), `${slug} is not a service`);
    assert.equal(isComingSoonSlug(slug), true);
  }
  assert.equal(isComingSoonSlug("laboratory"), false);
});

test("isComingSoonHref recognises a coming soon service link in any locale, with or without a fragment", () => {
  assert.equal(isComingSoonHref("/services/telemedicine"), true);
  assert.equal(isComingSoonHref("/services/endoscopy#faq"), true);
  assert.equal(isComingSoonHref("/si/services/fertility"), true);
  assert.equal(isComingSoonHref("/ta/services/vaccination-clinic"), true);
  assert.equal(isComingSoonHref("/services/laboratory"), false);
  assert.equal(isComingSoonHref("/e-channeling"), false);
  assert.equal(isComingSoonHref("/services"), false);
  assert.equal(isComingSoonHref("/services/telemedicine-extra"), false);
});

// ---- Every link to a coming soon service is badged ----

// The badge is drawn by the components that render these modules' links (the
// header menu, the footer, the home carousel and network teaser, the home
// care hand-off band, the services index admissions band). A link to a coming
// soon service added in any other file would render without it, so this walks
// the source for `/services/<slug>` literals and fails on a file nobody has
// taught to draw the badge. Service objects themselves (the directory, the
// related cards, the picker) carry the slug, not a link, and are badged by
// slug in their components.
const BADGED_SOURCES = [
  "src/config/homeCareNavigation.ts",
  "src/config/megaNavigation.ts",
  "src/features/home-care/data/content.ts",
  "src/features/home/data/content.ts",
  "src/features/home/data/network.ts",
  "src/features/services/data/indexContent.ts",
];

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) out.push(...sourceFiles(path));
    else if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith(".test.ts")) out.push(path);
  }
  return out;
}

test("every link to a coming soon service sits in a source whose renderer draws the badge", () => {
  const linking = sourceFiles("src")
    .filter((file) => {
      const text = readFileSync(file, "utf8");
      return COMING_SOON_SLUGS.some((slug) => text.includes(`"/services/${slug}`));
    })
    .sort();
  assert.deepEqual(linking, BADGED_SOURCES);
});
