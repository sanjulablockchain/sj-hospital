import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_LOCALE,
  hasLocale,
  LOCALE_COOKIE,
  LOCALE_LABELS,
  LOCALES,
  PREFIXED_LOCALES,
} from "./locales.ts";

test("three locales, English first and default", () => {
  assert.deepEqual([...LOCALES], ["en", "si", "ta"]);
  assert.equal(DEFAULT_LOCALE, "en");
});

test("only Sinhala and Tamil carry a URL prefix", () => {
  assert.deepEqual([...PREFIXED_LOCALES], ["si", "ta"]);
  assert.ok(!(PREFIXED_LOCALES as readonly string[]).includes(DEFAULT_LOCALE));
});

test("hasLocale accepts the three and rejects everything else", () => {
  for (const locale of LOCALES) assert.ok(hasLocale(locale));
  for (const other of ["", "EN", "en-US", "fr", "contact-us", "si/", "..", "sitemap"]) {
    assert.ok(!hasLocale(other), `${other} must not be treated as a locale`);
  }
});

// A reader picks their language out of a menu by recognising its own script,
// so an English transliteration would defeat the control.
test("each language is labelled in its own script", () => {
  assert.equal(LOCALE_LABELS.en, "English");
  // Escapes rather than literal characters: this assertion must keep working
  // whatever a future editor does to the file's encoding.
  assert.match(LOCALE_LABELS.si, /[\u0D80-\u0DFF]/, "Sinhala label must use Sinhala characters");
  assert.match(LOCALE_LABELS.ta, /[\u0B80-\u0BFF]/, "Tamil label must use Tamil characters");
});

test("every locale has a label, with no gaps", () => {
  assert.deepEqual(Object.keys(LOCALE_LABELS).sort(), [...LOCALES].sort());
});

test("the cookie name is site-scoped", () => {
  assert.equal(LOCALE_COOKIE, "sj-locale");
});
