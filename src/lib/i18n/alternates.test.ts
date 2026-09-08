import { test } from "node:test";
import assert from "node:assert/strict";
import { localeAlternates, SITE_URL } from "./alternates.ts";

// Each locale is canonical for itself. Pointing a translation's canonical at
// the English URL would tell a search engine the Sinhala page is a duplicate
// to drop from the index, which would throw away the whole translation effort.
test("a page is canonical for itself, in its own locale", () => {
  assert.equal(localeAlternates("/contact-us", "en").canonical, `${SITE_URL}/contact-us`);
  assert.equal(localeAlternates("/contact-us", "si").canonical, `${SITE_URL}/si/contact-us`);
  assert.equal(localeAlternates("/contact-us", "ta").canonical, `${SITE_URL}/ta/contact-us`);
});

test("every locale is offered as an alternate, absolute, plus x-default", () => {
  const { languages } = localeAlternates("/contact-us", "en");
  assert.deepEqual(languages, {
    en: `${SITE_URL}/contact-us`,
    si: `${SITE_URL}/si/contact-us`,
    ta: `${SITE_URL}/ta/contact-us`,
    "x-default": `${SITE_URL}/contact-us`,
  });
});

// English is the unprefixed fallback locale, so it also stands in as
// x-default: the entry a search engine falls back to for a searcher whose
// language matches none of the explicit hreflang values.
test("x-default points at the English URL", () => {
  assert.equal(localeAlternates("/contact-us", "en").languages["x-default"], `${SITE_URL}/contact-us`);
  assert.equal(localeAlternates("/contact-us", "si").languages["x-default"], `${SITE_URL}/contact-us`);
  assert.equal(localeAlternates("/contact-us", "ta").languages["x-default"], `${SITE_URL}/contact-us`);
});

// The three pages must agree about the set they belong to, or a search engine
// treats the cluster as inconsistent and ignores the hreflang entirely.
test("the alternate set is the same whichever locale asks for it", () => {
  const fromEnglish = localeAlternates("/services", "en").languages;
  assert.deepEqual(localeAlternates("/services", "si").languages, fromEnglish);
  assert.deepEqual(localeAlternates("/services", "ta").languages, fromEnglish);
});

test("the home page alternates do not collect a double slash", () => {
  const { canonical, languages } = localeAlternates("/", "si");
  assert.equal(canonical, `${SITE_URL}/si`);
  assert.equal(languages.en, `${SITE_URL}/`);
  assert.equal(languages.si, `${SITE_URL}/si`);
  assert.equal(languages.ta, `${SITE_URL}/ta`);
});

test("the site URL is absolute and carries no trailing slash", () => {
  assert.match(SITE_URL, /^https:\/\//);
  assert.ok(!SITE_URL.endsWith("/"));
});
