import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { AFFILIATION } from "./affiliation.ts";

// The owner asked (2026-10-28) that the Kids & Teens mark open the group's
// own site rather than the network page.
test("the affiliation mark opens ktdoctor.com", () => {
  assert.equal(AFFILIATION.href, "https://www.ktdoctor.com");
  assert.equal(AFFILIATION.name, "Kids & Teens Medical Group");
});

// An external link opened in a new tab must carry rel="noopener noreferrer"
// (CLAUDE.md, security). Read from the component source: `node --test`
// cannot load the .tsx.
test("the mark is an external link with the safe rel attributes", () => {
  const source = readFileSync(fileURLToPath(new URL("./AffiliationMark.tsx", import.meta.url)), "utf8");
  assert.match(source, /target="_blank"/);
  assert.match(source, /rel="noopener noreferrer"/);
  assert.ok(!/from "@\/components\/i18n\/LocaleLink"/.test(source), "an external link must not go through LocaleLink");
});
