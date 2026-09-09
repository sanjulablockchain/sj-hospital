import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { megaNavigation, megaNavLinks, type MegaNavMenu } from "./megaNavigation.ts";
import { serviceSlugs } from "../features/services/data/services.ts";
import { SERVICE_GROUPS } from "../features/services/data/groups.ts";
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

const menus = megaNavigation.filter((s): s is MegaNavMenu => s.kind === "menu");
const menu = (id: string): MegaNavMenu => {
  const found = menus.find((m) => m.id === id);
  assert.ok(found, `no "${id}" menu`);
  return found;
};

// One header for every page now, so the tree is checked once rather than
// seventeen near-identical per-page navs being checked against each other.
test("the header carries Services, Patient Care and About menus and a Contact link, in that order", () => {
  assert.deepEqual(
    megaNavigation.map((s) => [s.kind, s.label]),
    [
      ["menu", "Services"],
      ["menu", "Patient Care"],
      ["menu", "About"],
      ["link", "Contact"],
    ]
  );
});

test("section ids are unique and usable as element ids", () => {
  const ids = megaNavigation.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z][a-z0-9-]*$/);
});

// The Services panel is the service directory in miniature: one column per
// group, in the directory's own order, and every service exactly once. A
// service added to the catalogue without a menu entry fails here rather than
// quietly becoming reachable only through the directory.
test("the Services menu has one column per service group, in directory order", () => {
  const headings = menu("services").columns.map((c) => c.heading);
  assert.deepEqual(headings, [...SERVICE_GROUPS]);
});

test("every service appears exactly once in the Services menu, and nothing that is not a service does", () => {
  const hrefs = menu("services")
    .columns.flatMap((c) => c.links.map((l) => l.href))
    .filter((h) => h.startsWith("/services/"));
  const slugs = hrefs.map((h) => h.slice("/services/".length));
  assert.deepEqual([...slugs].sort(), [...serviceSlugs].sort());
});

// Services is a dense directory (Clinics alone holds fourteen), so its links are
// title-only. The two tile menus have room for a line under each title, and a
// tile without one reads as unfinished next to its neighbours.
test("every Patient Care and About tile carries a short description and an icon", () => {
  for (const id of ["patient-care", "about"]) {
    for (const column of menu(id).columns) {
      for (const link of column.links) {
        assert.ok(link.description, `${link.label} has no description`);
        assert.ok(link.description.length <= 60, `${link.label}'s description is too long for a tile`);
        assert.ok(link.icon, `${link.label} has no icon`);
      }
    }
  }
});

test("Services links are title-only so the panel fits a laptop viewport", () => {
  for (const column of menu("services").columns) {
    for (const link of column.links) {
      assert.equal(link.description, undefined, `${link.label} carries a description`);
    }
  }
});

// The header is rendered once per page from the shell rather than inside each
// hero, so an href can never be a bare hash: it would mean something different
// on every page it was clicked from.
test("every link is an absolute path, never a bare hash or an external URL", () => {
  for (const link of megaNavLinks()) {
    assert.match(link.href, /^\/[a-z0-9\-/]*(#[a-z0-9-]+)?$/, `${link.label} points at ${link.href}`);
  }
});

test("no href repeats within a menu", () => {
  for (const m of menus) {
    const hrefs = [
      ...m.columns.flatMap((c) => c.links.map((l) => l.href)),
      ...(m.footer ? [m.footer.primary.href, ...m.footer.links.map((l) => l.href)] : []),
    ];
    assert.equal(new Set(hrefs).size, hrefs.length, `${m.label} repeats an href: ${hrefs}`);
  }
});

// Walks src/app/[locale] for every static route with a page.tsx. Written by
// hand for the same reason navigation.test.ts's walkers are: @types/node@20
// predates fs.globSync's declarations.
function staticRoutes(dir: string, prefix = ""): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    // Dynamic segments ([slug]) and private folders (_components) are not
    // pages the menu could name.
    if (entry.name.startsWith("[") || entry.name.startsWith("_")) continue;
    const route = `${prefix}/${entry.name}`;
    if (existsSync(join(dir, entry.name, "page.tsx"))) found.push(route);
    found.push(...staticRoutes(join(dir, entry.name), route));
  }
  return found;
}

// About us, Contact us, Accommodation and E-channeling were footer-only before
// the mega menu; this is what stops any page sliding back to that.
test("every public page is reachable from the header", () => {
  const routes = staticRoutes("src/app/[locale]");
  assert.ok(routes.length >= 15, `only found ${routes.length} routes`);
  const reachable = new Set(megaNavLinks().map((l) => l.href.split("#")[0]));
  for (const route of routes) {
    assert.ok(reachable.has(route), `${route} is not in the header`);
  }
});

test("every /services/<slug> link is a real service page", () => {
  for (const link of megaNavLinks()) {
    if (!link.href.startsWith("/services/")) continue;
    const slug = link.href.slice("/services/".length).split("#")[0];
    assert.ok(serviceSlugs.includes(slug), `${link.label} points at the unknown service ${slug}`);
  }
});

// A `/page#section` link is only as good as the section it names. The footers
// are curated per page against the sections that actually exist, so any anchor
// the header uses has to be one a footer already vouches for. A footer links
// to its own page's sections with a bare hash, so each is paired with the page
// it sits on to expand those.
const FOOTERS_BY_PAGE: [string, typeof homeFooterColumns][] = [
  ["/about-us", aboutFooterColumns],
  ["/contact-us", contactFooterColumns],
  ["/accommodation", accommodationFooterColumns],
  ["/e-channeling", channelingFooterColumns],
  ["/privacy-policy", privacyFooterColumns],
  ["/careers", careerFooterColumns],
  ["/facilities", facilitiesFooterColumns],
  ["/health-tips", healthTipsFooterColumns],
  ["/international-care", internationalFooterColumns],
  ["/media", mediaFooterColumns],
  ["/network", networkFooterColumns],
  ["/pharmacy", pharmacyFooterColumns],
  ["/services", servicesFooterColumns],
  ["/school-wellness", wellnessFooterColumns],
  ["/home-care", homeCareFooterColumns],
  ["/", homeFooterColumns],
];

test("every anchored link names a section some footer already links to", () => {
  const known = new Set(
    FOOTERS_BY_PAGE.flatMap(([page, cols]) =>
      cols.flatMap((c) => c.links.map((l) => (l.href.startsWith("#") ? `${page}${l.href}` : l.href)))
    )
  );
  for (const link of megaNavLinks()) {
    if (!link.href.includes("#")) continue;
    assert.ok(known.has(link.href), `${link.label} points at ${link.href}, which no footer vouches for`);
  }
});

test("no label or description uses an em dash in any encoding", () => {
  for (const link of megaNavLinks()) {
    for (const text of [link.label, link.description ?? ""]) {
      assert.ok(!/—|&mdash;|&#8212;|&#x2014;/i.test(text), `"${text}" contains an em dash`);
    }
  }
});

// The register rule: the nav bar is English in every locale. The sitewide
// walker only reads the .si/.ta overlays, and this tree has none, so the base
// strings are checked here directly for Sinhala or Tamil script.
test("every label, heading and description is English in every locale", () => {
  const texts = [
    ...megaNavigation.map((s) => s.label),
    ...menus.flatMap((m) => m.columns.map((c) => c.heading ?? "")),
    ...megaNavLinks().flatMap((l) => [l.label, l.description ?? ""]),
  ];
  for (const text of texts) {
    assert.ok(!/[඀-෿஀-௿]/.test(text), `"${text}" is not English`);
  }
});

test("megaNavLinks flattens every link in every menu, footer and top-level link", () => {
  const all = megaNavLinks();
  assert.ok(all.some((l) => l.href === "/contact-us"), "top-level Contact link missing");
  assert.ok(all.some((l) => l.href === "/services"), "Services footer primary missing");
  assert.ok(all.some((l) => l.href === "/services/accident-emergency"), "a column link missing");
});
