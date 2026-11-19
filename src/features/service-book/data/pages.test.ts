import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { PAGE_COUNT, bookPages } from "./pages.ts";
import { chapterForPage, chapters } from "./chapters.ts";

test("the book has 41 pages, numbered in order", () => {
  assert.equal(PAGE_COUNT, 41);
  assert.deepEqual(
    bookPages.map((page) => page.number),
    Array.from({ length: 41 }, (_, index) => index + 1)
  );
});

test("there is one page image per page", () => {
  const files = readdirSync("public/images/service-book/2026").filter((name) => name.endsWith(".webp"));
  assert.deepEqual(
    files.sort(),
    bookPages.map((page) => `page-${String(page.number).padStart(2, "0")}.webp`)
  );
});

test("every page has its own alt text with no dash punctuation", () => {
  for (const { number, alt } of bookPages) {
    assert.ok(alt.length >= 25, `page ${number} alt is too short`);
    assert.ok(!/[–—]| - /.test(alt), `page ${number} alt uses a dash`);
  }
  assert.equal(new Set(bookPages.map((page) => page.alt)).size, bookPages.length);
});

test("chapters cover every page once, in order", () => {
  assert.equal(chapters[0].first, 1);
  assert.equal(chapters[chapters.length - 1].last, PAGE_COUNT);
  for (let index = 1; index < chapters.length; index += 1) {
    assert.equal(chapters[index].first, chapters[index - 1].last + 1, chapters[index].id);
  }
  for (const chapter of chapters) assert.ok(chapter.first <= chapter.last, chapter.id);
});

test("chapterForPage finds the chapter a page sits in", () => {
  assert.equal(chapterForPage(1).id, "welcome");
  assert.equal(chapterForPage(4).id, "welcome");
  assert.equal(chapterForPage(5).id, "about");
  assert.equal(chapterForPage(17).id, "services");
  assert.equal(chapterForPage(18).id, "lab");
  assert.equal(chapterForPage(30).id, "lab");
  assert.equal(chapterForPage(31).id, "doctors");
  assert.equal(chapterForPage(41).id, "guide");
});
