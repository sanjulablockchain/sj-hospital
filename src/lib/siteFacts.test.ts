import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";

/**
 * Facts the 2026 Service Book settled (owner, 2026-11-20) that used to read
 * differently across the site: the OPD keeps 7.00 AM to 6.00 PM (not 24
 * hours), and rooms are Ward 9,500, Standard 12,500, Deluxe 15,500 and Super
 * Deluxe 19,500 LKR a day (not "from 10,000"). This walks every source string
 * in English, Sinhala and Tamil so an old figure cannot survive in a page,
 * an overlay or a metadata description nobody thought to check.
 */
const ROOTS = ["src/features", "src/config", "src/components"];
const SKIP = [/\.test\.ts$/, /laboratory[\\/]data[\\/](catalogue|overrides)\.ts$/];

const STALE: [RegExp, string][] = [
  // Any 10,000 at all: the room price is the only one the site ever printed,
  // and the overlays write it with රුපියල් / ரூபாய் rather than LKR.
  [/(?<![\d,])10,000(?![\d,])/, "the old 10,000 LKR room price"],
  [/24\/7 OPD|\b24 hour OPD|OPD (?:open )?around the clock|outpatient department (?:is )?open 24 hours/i, "a 24 hour OPD"],
  [/every hour we are open/i, "a 24 hour OPD (\"every hour we are open\")"],
  [/consulting suites open 24 hours/i, "24 hour OPD consulting suites"],
  [/පැය 24ම විවෘත (?:Outpatient|Consulting)|24 மணி நேரமும் திறந்திருக்கும் (?:Outpatient|Consulting)/, "a 24 hour OPD, in Sinhala or Tamil"],
];

function files(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) out.push(...files(path));
    else if (/\.tsx?$/.test(entry.name) && !SKIP.some((re) => re.test(path))) out.push(path);
  }
  return out;
}

/** String literals only: comments are notes to the next developer, not copy. */
function literals(source: string): string[] {
  const code = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
  return [...code.matchAll(/"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)].map((m) => m[1] ?? m[2] ?? "");
}

/**
 * Any string that names the OPD (in any of the three languages) alongside a
 * round the clock claim. Broader than the phrases above, so a rewording such
 * as "a 24-hour outpatient department" cannot slip through.
 */
const CLOCK = String.raw`(?:\b24\b|around the clock|every hour|any hour|පැය 24|24 மணி)`;
const OPD = String.raw`(?:OPD|outpatient|Outpatient|බාහිර රෝගී|வெளிநோயாளர்)`;
// The two within one clause (no full stop, comma or semicolon between them).
const OPD_ROUND_THE_CLOCK = new RegExp(`${CLOCK}[^.,;]{0,18}${OPD}|${OPD}[^.,;]{0,25}${CLOCK}`, "i");

test("no clause pairs the OPD with a round the clock claim", () => {
  const hits: string[] = [];
  for (const file of ROOTS.flatMap(files)) {
    if (/features[\\/]locations[\\/]/.test(file)) continue; // Blue Sapphire is a different hospital
    for (const text of literals(readFileSync(file, "utf8"))) {
      if (OPD_ROUND_THE_CLOCK.test(text)) hits.push(`${file}: ${text.slice(0, 100)}`);
    }
  }
  assert.deepEqual(hits, []);
});

test("no page states a room price or OPD hours the Service Book replaced", () => {
  const hits: string[] = [];
  for (const file of ROOTS.flatMap(files)) {
    for (const text of literals(readFileSync(file, "utf8"))) {
      for (const [re, what] of STALE) if (re.test(text)) hits.push(`${file}: ${what}: ${text.slice(0, 90)}`);
    }
  }
  assert.deepEqual(hits, []);
});

// The home "Who we are" strip splits a claim across fields: a "24/7" value
// over a label. That value must not sit over the OPD (7.00 AM to 6.00 PM), and
// no stat may promise "every service open", with seven services not open yet.
test("the home strip's round the clock stat is about emergency only", async () => {
  const { whoWeAre } = await import("../features/home/data/content.ts");
  for (const stat of whoWeAre.stats) {
    if (stat.value === "24/7") assert.doesNotMatch(stat.label, /OPD|outpatient/i, `24/7 over "${stat.label}"`);
    assert.doesNotMatch(stat.desc, /every service open/i, stat.desc);
  }
});
