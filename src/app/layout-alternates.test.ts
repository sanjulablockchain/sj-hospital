import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Guards against the exact failure this branch exists to prevent: the root
// layout sets `alternates` for the whole tree, and every route layout under
// `[locale]` overrides it with a path of its own. A route added later without
// that override would silently inherit the root's alternates, publishing
// <link rel="canonical"> pointing at the home page and telling search engines
// the new page is a duplicate of it.
//
// This walks the real directory rather than a hard-coded list, so a new route
// folder fails this test the moment it appears, until its own layout carries
// `localeAlternates("/its-own-path"`.
const localeDir = fileURLToPath(new URL("./[locale]", import.meta.url));

const routeFolders = readdirSync(localeDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

test("every route folder under [locale] has at least one route", () => {
  assert.ok(routeFolders.length > 0, "found no route folders under src/app/[locale]");
});

for (const folder of routeFolders) {
  test(`${folder}/layout.tsx sets its own alternates path`, () => {
    const layoutPath = fileURLToPath(new URL(`./[locale]/${folder}/layout.tsx`, import.meta.url));
    const source = readFileSync(layoutPath, "utf8");
    const expected = `localeAlternates("/${folder}"`;
    assert.ok(
      source.includes(expected),
      `${folder}/layout.tsx does not call ${expected} - it will inherit the root layout's alternates and publish a canonical pointing at the home page`
    );
  });
}
