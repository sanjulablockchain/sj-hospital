import { test } from "node:test";
import assert from "node:assert/strict";
import { defaultMode, initialPage, parseStoredMode, parseStoredPage } from "./readerState.ts";

test("a phone held upright scrolls; everything wider turns pages", () => {
  assert.equal(defaultMode(375, 812), "scroll");
  assert.equal(defaultMode(768, 1024), "scroll");
  assert.equal(defaultMode(812, 375), "pages");
  assert.equal(defaultMode(1280, 900), "pages");
  assert.equal(defaultMode(1024, 1366), "pages");
});

test("a stored mode is read back only when it is one of the two", () => {
  assert.equal(parseStoredMode("scroll"), "scroll");
  assert.equal(parseStoredMode("pages"), "pages");
  assert.equal(parseStoredMode("sideways"), null);
  assert.equal(parseStoredMode(""), null);
  assert.equal(parseStoredMode(null), null);
});

test("a stored page is read back only when it is a page of the book", () => {
  assert.equal(parseStoredPage("21", 41), 21);
  assert.equal(parseStoredPage("41", 41), 41);
  for (const bad of ["abc", "0", "-3", "99", "2.5", "", null]) {
    assert.equal(parseStoredPage(bad, 41), null, String(bad));
  }
});

test("a shared page link wins over the remembered page", () => {
  assert.deepEqual(initialPage("#page-20", 31, 41), { page: 20, resumed: false });
});

test("with no link the reader resumes where it left off", () => {
  assert.deepEqual(initialPage("", 31, 41), { page: 31, resumed: true });
  assert.deepEqual(initialPage("#top", 31, 41), { page: 31, resumed: true });
});

test("page 1, or nothing remembered, starts at the beginning", () => {
  assert.deepEqual(initialPage("", 1, 41), { page: 1, resumed: false });
  assert.deepEqual(initialPage("", null, 41), { page: 1, resumed: false });
});
