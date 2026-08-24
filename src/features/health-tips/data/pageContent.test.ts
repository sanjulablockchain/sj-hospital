import { test } from "node:test";
import assert from "node:assert/strict";
import { factStrip, tickerLines, jumpCards, disclaimer } from "./pageContent.ts";
import { articles } from "./library.ts";
import { warnings } from "./warnings.ts";
import { firstAidSteps } from "./firstAid.ts";
import { screening } from "./screening.ts";
import { denguePoints } from "./dengue.ts";
import { myths } from "./myths.ts";
import { homeKit, emergencyNumbers } from "./firstAid.ts";

test("four fact strip tiles", () => {
  assert.equal(factStrip.length, 4);
  for (const t of factStrip) {
    assert.ok(t.label.length > 3, `tile label too terse: ${t.label}`);
    assert.ok(t.value.length > 3, `tile value too terse: ${t.value}`);
  }
});

test("the fact strip makes no claim that goes stale with the calendar", () => {
  const MONTHS =
    /\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/i;
  const SEASONAL = /\b(monsoon|this month|right now it is|currently|season is)\b/i;
  for (const t of factStrip) {
    const text = `${t.label} ${t.value}`;
    assert.ok(!MONTHS.test(text), `fact strip names a month: ${text}`);
    assert.ok(!SEASONAL.test(text), `fact strip hard-codes a season: ${text}`);
  }
});

test("five ticker lines, short enough to read as they scroll", () => {
  assert.equal(tickerLines.length, 5);
  for (const line of tickerLines) {
    assert.ok(line.length > 15, `ticker line too terse: ${line}`);
    assert.ok(line.length < 45, `ticker line too long to scan: ${line}`);
  }
});

test("four jump cards, each anchoring a section on this page", () => {
  assert.equal(jumpCards.length, 4);
  const anchors = jumpCards.map((c) => c.href);
  assert.deepEqual(anchors, ["#library", "#warning", "#screening", "#firstaid"]);
});

test("jump card counts stay consistent with the data behind them", () => {
  const byHref = Object.fromEntries(jumpCards.map((c) => [c.href, c.count]));
  assert.equal(byHref["#library"], `${articles.length} articles`);
  assert.equal(byHref["#warning"], `${warnings.length} signs`);
  assert.equal(byHref["#firstaid"], `${firstAidSteps.length} basics`);
});

test("the disclaimer states the page is not a diagnosis", () => {
  assert.ok(disclaimer.length > 150);
  assert.match(disclaimer, /not a diagnosis/i);
  assert.match(disclaimer, /doctor/i);
});

const everyString = [
  ...factStrip.flatMap((t) => [t.label, t.value]),
  ...tickerLines,
  ...jumpCards.flatMap((c) => [c.count, c.label, c.note]),
  disclaimer,
  ...articles.flatMap((a) => [a.tag, a.title, a.lede, a.by]),
  ...warnings.flatMap((w) => [w.level, w.symptom, w.advice]),
  ...screening.flatMap((s) => [s.check, s.who, s.freq]),
  ...firstAidSteps.flatMap((s) => [s.kind, s.title, s.action, s.avoid]),
  ...homeKit,
  ...emergencyNumbers.flatMap((n) => [n.label, n.number]),
  ...denguePoints,
  ...myths.flatMap((m) => [m.q, m.a]),
];

test("no em dash anywhere in the health tips copy, in any encoding", () => {
  for (const v of everyString) {
    assert.ok(!v.includes("—"), `literal em dash: ${v}`);
    assert.ok(!/&mdash;|&#8212;|&#x2014;/i.test(v), `encoded em dash: ${v}`);
  }
});

test("the only hospital phone numbers in the copy are our own and the national lines", () => {
  const ALLOWED = ["0117848484", "0742223334", "1990", "0112686143"];
  for (const v of everyString) {
    const flat = v.replace(/[\s()\-.]/g, "");
    for (const match of flat.match(/\d{4,}/g) ?? []) {
      assert.ok(ALLOWED.includes(match), `unknown phone number ${match} in: ${v}`);
    }
  }
});

test("no dental treatment is offered, only the routine check recommendation", () => {
  // This hospital has no dental department, so the screening row may recommend
  // a dental check but nothing may present it as ours. Adding "our dental
  // clinic" or "dental surgery" to any string below fails this.
  const OFFERS_DENTAL =
    /\b(our|the hospital'?s)\s+dental\b|\bdental\s+(surgery|department|clinic|theatre|unit)\b|\bdentists?\s+(here|on site)\b/i;
  for (const v of everyString) {
    assert.ok(!OFFERS_DENTAL.test(v), `implies a dental service we do not have: ${v}`);
  }
});
