import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ALLOWED_EMAILS, GENERAL_EMAIL, APPOINTMENTS_EMAIL } from "./contactEmails.ts";

// Walks all of src for every .ts/.tsx file, the same set
// `globSync("src/**/*.{ts,tsx}")` would return. Written by hand for the same
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

// Strips full-line `//` comments and `/* ... */` blocks, the only comment
// styles this codebase uses. Needed because contactEmails.ts explains itself
// by naming the very addresses these scans forbid, and a file's reasoning
// about a retired address must not fail a check aimed at shipped copy.
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

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

// example.com is IETF-reserved for documentation (RFC 2606) and is not a
// mailbox anyone can write to. It appears only as `placeholder` text inside
// form inputs and as a fixture in schemas.test.ts, so it is exempt: nothing
// here is an address the hospital publishes or receives mail at.
const EXEMPT_DOMAINS = ["example.com"];

const SOURCE_FILES = findSourceFiles("src").filter(
  (file) => !file.endsWith("contactEmails.test.ts")
);

// The rule this whole module exists to enforce. Five published addresses had
// accumulated across the site, two of them invented by a design reference.
// A sixth would be invisible until someone mailed it and got a bounce, so it
// fails the suite instead.
test("src publishes no email address outside the allowed two", () => {
  assert.ok(SOURCE_FILES.length > 50, `only walked ${SOURCE_FILES.length} files`);
  for (const file of SOURCE_FILES) {
    const copy = stripCommentLines(readFileSync(file, "utf8"));
    for (const found of copy.match(EMAIL) ?? []) {
      const domain = found.slice(found.indexOf("@") + 1);
      if (EXEMPT_DOMAINS.includes(domain)) continue;
      assert.ok(
        ALLOWED_EMAILS.includes(found),
        `${file} publishes ${found}, which is not one of ${ALLOWED_EMAILS.join(" or ")}`
      );
    }
  }
});

// Guards the other direction. A mapping that quietly sent everything to
// info@ would satisfy the check above while leaving the appointments mailbox
// unreachable from anywhere on the site, which is not what it is for.
test("both allowed addresses are actually reachable from the site", () => {
  const all = SOURCE_FILES.map((file) => stripCommentLines(readFileSync(file, "utf8"))).join("\n");
  for (const email of [GENERAL_EMAIL, APPOINTMENTS_EMAIL]) {
    assert.ok(all.includes(email), `${email} appears nowhere in src`);
  }
});

// Every published address has to be clickable. A bare address in body copy is
// fine, but the buttons and rails that exist to be actioned must carry the
// mailto:, and dropping the scheme is an easy edit to miss.
test("no allowed address is published on a non-mailto href", () => {
  for (const file of SOURCE_FILES) {
    const copy = stripCommentLines(readFileSync(file, "utf8"));
    for (const email of ALLOWED_EMAILS) {
      const pattern = email.replace(/\./g, "\\.");
      const wrongScheme = new RegExp(`href=[{"'\`]+(?!mailto:)[^"'\`]*${pattern}`);
      assert.ok(!wrongScheme.test(copy), `${file} links ${email} without a mailto: scheme`);
    }
  }
});
