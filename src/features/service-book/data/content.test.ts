import { test } from "node:test";
import assert from "node:assert/strict";
import { statSync } from "node:fs";
import { chapterGuide, download, editionLinks, heroFacts, viewer } from "./content.ts";
import { chapters } from "./chapters.ts";
import { PAGE_COUNT } from "./pages.ts";

test("the chapter guide follows the chapters, in order", () => {
  assert.deepEqual(
    chapterGuide.map((entry) => entry.id),
    chapters.map((chapter) => chapter.id)
  );
});

test("the download is the committed PDF, and its stated size is its real size", () => {
  assert.match(download.href, /^\/downloads\/.+\.pdf$/);
  const bytes = statSync(`public${download.href}`).size;
  assert.equal(download.size, `${(bytes / 1024 / 1024).toFixed(1)} MB`);
});

test("the hero's page count is the book's", () => {
  assert.equal(heroFacts[0].v, String(PAGE_COUNT));
});

test("every link stays on this site", () => {
  for (const { href } of [...chapterGuide, ...editionLinks]) assert.match(href, /^\/[a-z]/);
});

test("the viewer's templates carry their placeholders", () => {
  assert.match(viewer.pageOf, /\{page\}/);
  assert.match(viewer.pageOf, /\{count\}/);
  assert.match(viewer.goToPage, /\{page\}/);
});
