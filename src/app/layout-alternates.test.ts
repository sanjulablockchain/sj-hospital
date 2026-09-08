import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

// Guards against the exact failure this branch exists to prevent: the root
// layout sets `alternates` for the whole tree, and every route layout under
// `[locale]` overrides it with a path of its own. A route added later without
// that override would silently inherit an ancestor's alternates, publishing
// <link rel="canonical"> pointing at the wrong page and telling search
// engines the new page is a duplicate of it. That is not hypothetical: this
// branch already shipped every translated page declaring the English page
// canonical once, asking Google to drop every Sinhala and Tamil page from
// its index.
//
// This walks the real directory tree, recursively, rather than a hard-coded
// list or a single level: `services/[slug]` sits two levels down and has no
// layout.tsx of its own at all (it inherits `services/layout.tsx` and
// overrides `alternates` from its own `page.tsx` instead), so a walk that
// stopped at one level, or that only ever looked at `layout.tsx`, would never
// have seen it. A route folder is anything that directly contains a
// `page.tsx`: that is what actually serves a URL and therefore needs its own
// canonical, as opposed to an intermediate folder that only groups other
// routes under a shared layout.
//
// `_`-prefixed folders (`privacy-policy/_components`) and `(group)` folders
// are Next's own conventions for "not a route segment", so they are skipped
// rather than walked into: neither ever resolves to a URL, and a naive walk
// that tried to read a `layout.tsx` or `page.tsx` inside one would either
// wrongly demand alternates of a components folder or crash with ENOENT the
// moment one exists with no page of its own.
const localeDir = fileURLToPath(new URL("./[locale]", import.meta.url));

function isRoutable(name: string): boolean {
  return !name.startsWith("_") && !(name.startsWith("(") && name.endsWith(")"));
}

/**
 * Every folder under `[locale]`, at any depth, that directly contains a
 * `page.tsx`, as its site-relative path (`"services"`, `"services/[slug]"`).
 */
function routeFolders(dir: string, prefix = "", into: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || !isRoutable(entry.name)) continue;
    const childDir = join(dir, entry.name);
    const routePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (existsSync(join(childDir, "page.tsx"))) into.push(routePath);
    routeFolders(childDir, routePath, into);
  }
  return into;
}

const ROUTE_FOLDERS = routeFolders(localeDir);

test("every route folder under [locale] has at least one route", () => {
  assert.ok(ROUTE_FOLDERS.length > 0, "found no route folders under src/app/[locale]");
});

for (const routePath of ROUTE_FOLDERS) {
  test(`${routePath} sets its own alternates path`, () => {
    const segments = routePath.split("/");
    const lastSegment = segments[segments.length - 1];
    const isDynamic = lastSegment.startsWith("[");

    // A dynamic segment's value (`slug`) is only known at request time, so
    // its own page can only ever build the alternates path from a template
    // literal, never the literal string a static route uses. Either way the
    // call has to live in THIS folder's own layout.tsx or page.tsx, not an
    // ancestor's: that is exactly what silent inheritance looks like.
    const staticPrefix = "/" + (isDynamic ? segments.slice(0, -1).join("/") : routePath);
    const expected = isDynamic
      ? `localeAlternates(\`${staticPrefix}/`
      : `localeAlternates("${staticPrefix}"`;

    const dir = join(localeDir, ...segments);
    const sources = ["layout.tsx", "page.tsx"]
      .map((file) => join(dir, file))
      .filter((path) => existsSync(path))
      .map((path) => readFileSync(path, "utf8"));

    assert.ok(
      sources.some((source) => source.includes(expected)),
      `${routePath} has no layout.tsx or page.tsx calling ${expected} - it will inherit an ` +
        `ancestor's alternates and publish a canonical pointing at the wrong page`
    );
  });
}
