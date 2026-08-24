import { test } from "node:test";
import assert from "node:assert/strict";
import { CATEGORIES, TIP_CATEGORIES, articles, categoryCounts, featured } from "./library.ts";

test("CATEGORIES leads with All and matches the reference order", () => {
  assert.deepEqual(CATEGORIES, [
    "All",
    "Dengue & fever",
    "Diabetes",
    "Heart & pressure",
    "Children",
    "Women",
    "Kidney",
    "Living well",
  ]);
});

test("TIP_CATEGORIES is CATEGORIES without All", () => {
  assert.equal(TIP_CATEGORIES.length, 7);
  assert.ok(!TIP_CATEGORIES.includes("All" as never));
  assert.deepEqual([...TIP_CATEGORIES], CATEGORIES.slice(1));
});

test("twenty-two articles, every one tagged with a real category", () => {
  assert.equal(articles.length, 22);
  for (const a of articles) {
    assert.ok(TIP_CATEGORIES.includes(a.tag), `${a.title} has an unknown tag: ${a.tag}`);
  }
});

test("every category carries at least one article", () => {
  for (const c of TIP_CATEGORIES) {
    assert.ok(
      articles.some((a) => a.tag === c),
      `no article tagged ${c}`,
    );
  }
});

test("categoryCounts totals All and sums to the article count", () => {
  const counts = categoryCounts();
  assert.equal(counts.All, articles.length);
  const sum = TIP_CATEGORIES.reduce((n, c) => n + counts[c], 0);
  assert.equal(sum, articles.length);
});

test("the featured article is one of the library articles", () => {
  assert.ok(
    articles.some((a) => a.title === featured.title && a.tag === featured.tag),
    "featured article is not in the library",
  );
});

test("the featured article carries four takeaway points", () => {
  assert.equal(featured.points.length, 4);
  for (const p of featured.points) assert.ok(p.length > 10, `takeaway too short: ${p}`);
});

test("no article claims readership figures we cannot back", () => {
  const all = [
    ...articles.flatMap((a) => [a.title, a.lede, a.by]),
    featured.title,
    featured.lede,
    featured.by,
    featured.read,
    ...featured.points,
  ];
  for (const v of all) {
    assert.ok(!/most read|most popular|trending|views?\b/i.test(v), `unbacked claim: ${v}`);
  }
});

test("every article has a byline naming a team, not a person", () => {
  for (const a of articles) {
    assert.ok(a.by.length > 3, `${a.title} has no byline`);
    assert.ok(!/\bDr\.?\s/i.test(a.by), `${a.title} names an individual doctor: ${a.by}`);
  }
});
