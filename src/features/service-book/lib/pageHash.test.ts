import { test } from "node:test";
import assert from "node:assert/strict";
import { formatPageHash, parsePageHash } from "./pageHash.ts";

test("a page hash opens that page", () => {
  assert.equal(parsePageHash("#page-21", 41), 21);
  assert.equal(parsePageHash("page-7", 41), 7);
  assert.equal(parsePageHash("#page-41", 41), 41);
});

test("a malformed or empty hash opens the first page", () => {
  for (const hash of ["", "#", "#page-", "#page-abc", "#page-0", "#page--3", "#page-2.5", "#top", "#read"]) {
    assert.equal(parsePageHash(hash, 41), 1, hash);
  }
});

test("a page past the end opens the last page", () => {
  assert.equal(parsePageHash("#page-99", 41), 41);
});

test("formatPageHash round trips", () => {
  assert.equal(formatPageHash(21), "#page-21");
  assert.equal(parsePageHash(formatPageHash(18), 41), 18);
});
