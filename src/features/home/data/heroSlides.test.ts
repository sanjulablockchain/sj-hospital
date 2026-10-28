import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { heroSlides, HERO_SLIDE_INTERVAL_MS } from "./heroSlides.ts";
import { serviceSlugs } from "../../services/data/services.ts";

const REPO = fileURLToPath(new URL("../../../../", import.meta.url));

/** Every static route under src/app/[locale], the way megaNavigation.test.ts walks them. */
function staticRoutes(dir: string, prefix = ""): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith("[") || entry.name.startsWith("_")) continue;
    const route = `${prefix}/${entry.name}`;
    if (existsSync(join(dir, entry.name, "page.tsx"))) found.push(route);
    found.push(...staticRoutes(join(dir, entry.name), route));
  }
  return found;
}

/** Whether some component under src/features/<feature>/components renders `id="<fragment>"`. */
function sectionExists(feature: string, fragment: string): boolean {
  const dir = join(REPO, "src", "features", feature, "components");
  if (!existsSync(dir)) return false;
  const pattern = new RegExp(`id="${fragment}"`);
  const walk = (d: string): boolean =>
    readdirSync(d, { withFileTypes: true }).some((entry) =>
      entry.isDirectory() ? walk(join(d, entry.name)) : pattern.test(readFileSync(join(d, entry.name), "utf8"))
    );
  return walk(dir);
}

test("eight slides in the owner's order, each with a distinct id and a photo on disk", () => {
  assert.deepEqual(
    heroSlides.map((s) => s.id),
    ["free-opd", "medicine-delivery", "patient-transport", "digital-xray", "laboratory", "channeling", "insurance", "cashless"]
  );
  assert.equal(new Set(heroSlides.map((s) => s.photo)).size, 8);
  for (const s of heroSlides) {
    assert.ok(existsSync(join(REPO, "public", s.photo)), `${s.id}: ${s.photo} is not in public/`);
    assert.ok(s.photoAlt.length > 10, `${s.id} has no alt text`);
  }
  assert.equal(HERO_SLIDE_INTERVAL_MS, 7000);
});

test("every slide link is a call or a page on this site, and every fragment names a real section", () => {
  const routes = new Set([...staticRoutes(join(REPO, "src", "app", "[locale]")), "/", ...serviceSlugs.map((slug) => `/services/${slug}`)]);
  // Route → the feature folder whose components render that page's sections.
  const featureOf: Record<string, string> = { "/facilities": "facilities", "/e-channeling": "e-channeling", "/school-wellness": "school-wellness" };
  for (const s of heroSlides) {
    for (const cta of [s.ctaPrimary, s.ctaSecondary]) {
      if (!cta) continue;
      if (cta.href.startsWith("tel:")) continue;
      const [path, fragment] = cta.href.split("#");
      assert.ok(routes.has(path), `${s.id}: ${cta.href} is not a route`);
      if (fragment) {
        const feature = featureOf[path];
        assert.ok(feature, `${s.id}: add ${path} to featureOf to check #${fragment}`);
        assert.ok(sectionExists(feature, fragment), `${s.id}: no section id="${fragment}" under features/${feature}`);
      }
    }
  }
});

test("no slide types a figure that has a home elsewhere", () => {
  for (const s of heroSlides) {
    const copy = `${s.kicker} ${s.heading.lead} ${s.heading.accent} ${s.body}`;
    assert.ok(!/\d+\s*%/.test(copy), `${s.id} quotes a percentage`);
    assert.ok(!/\b\d{1,3},\d{3}\b/.test(copy), `${s.id} quotes a price`);
  }
  const laboratory = heroSlides.find((s) => s.id === "laboratory");
  assert.ok(laboratory);
  assert.match(laboratory.body, /\{count\}/);
  assert.match(laboratory.body, /\{fromPrice\}/);
});

test("every slide carries a focal point class for object-cover cropping", () => {
  for (const s of heroSlides) assert.match(s.positionClass, /object-\[/, `${s.id} needs an object-position`);
});

test("the two call buttons print the switchboard number from its one home", () => {
  const callers = heroSlides.flatMap((s) => [s.ctaPrimary, s.ctaSecondary]).filter((c) => c?.href.startsWith("tel:"));
  assert.equal(callers.length, 2);
  for (const c of callers) {
    assert.equal(c?.href, "tel:+94117848484");
    assert.equal(c?.label, "Call 0117 84 84 84");
  }
});
