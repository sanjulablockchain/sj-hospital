import { test } from "node:test";
import assert from "node:assert/strict";
import {
  internalDefaultPath,
  localeHref,
  localePath,
  splitLocale,
  swapLocale,
} from "./paths.ts";

test("an unprefixed path is English, and keeps its whole path", () => {
  assert.deepEqual(splitLocale("/"), { locale: "en", rest: "/" });
  assert.deepEqual(splitLocale("/contact-us"), { locale: "en", rest: "/contact-us" });
  assert.deepEqual(splitLocale("/services/cardiology"), {
    locale: "en",
    rest: "/services/cardiology",
  });
});

test("a prefixed path yields its locale and the path underneath", () => {
  assert.deepEqual(splitLocale("/si"), { locale: "si", rest: "/" });
  assert.deepEqual(splitLocale("/si/"), { locale: "si", rest: "/" });
  assert.deepEqual(splitLocale("/ta/contact-us"), { locale: "ta", rest: "/contact-us" });
  assert.deepEqual(splitLocale("/si/services/cardiology"), {
    locale: "si",
    rest: "/services/cardiology",
  });
});

// A route that merely starts with the same letters is not a locale prefix.
// `/site-map` must not be read as Sinhala.
test("a prefix only counts on a whole segment", () => {
  assert.deepEqual(splitLocale("/site-map"), { locale: "en", rest: "/site-map" });
  assert.deepEqual(splitLocale("/talks"), { locale: "en", rest: "/talks" });
  assert.deepEqual(splitLocale("/services/silver"), {
    locale: "en",
    rest: "/services/silver",
  });
});

test("localePath moves a path under a prefix, and leaves English bare", () => {
  assert.equal(localePath("/contact-us", "en"), "/contact-us");
  assert.equal(localePath("/contact-us", "si"), "/si/contact-us");
  assert.equal(localePath("/", "ta"), "/ta");
  assert.equal(localePath("/", "en"), "/");
});

// English pages physically live under app/[locale], so the proxy needs the
// real internal path even though the address bar never shows it.
test("internalDefaultPath exposes where English actually lives", () => {
  assert.equal(internalDefaultPath("/"), "/en");
  assert.equal(internalDefaultPath("/contact-us"), "/en/contact-us");
});

test("swapLocale lands on the same page in another language", () => {
  assert.equal(swapLocale("/contact-us", "si"), "/si/contact-us");
  assert.equal(swapLocale("/si/contact-us", "ta"), "/ta/contact-us");
  assert.equal(swapLocale("/si/contact-us", "en"), "/contact-us");
  assert.equal(swapLocale("/ta", "en"), "/");
  assert.equal(swapLocale("/", "si"), "/si");
});

test("swapping to the locale you are already in changes nothing", () => {
  assert.equal(swapLocale("/si/services", "si"), "/si/services");
  assert.equal(swapLocale("/services", "en"), "/services");
});

test("localeHref prefixes internal links only", () => {
  assert.equal(localeHref("/services", "si"), "/si/services");
  assert.equal(localeHref("/", "si"), "/si");
  assert.equal(localeHref("/services", "en"), "/services");
});

// Everything that does not point inside this site must survive untouched, or
// the footer's phone, mail and social links break in two locales out of three.
test("localeHref leaves anything that is not an internal path alone", () => {
  for (const href of [
    "#reach",
    "tel:+94117848484",
    "mailto:info@sjhospital.lk",
    "https://wa.me/94742223334",
    "//cdn.example.com/x.png",
  ]) {
    assert.equal(localeHref(href, "si"), href, `${href} must not be rewritten`);
  }
});

// Applying the pass twice must not produce /si/si/services.
test("localeHref is idempotent on an already-prefixed href", () => {
  assert.equal(localeHref("/si/services", "si"), "/si/services");
  assert.equal(localeHref(localeHref("/services", "ta"), "ta"), "/ta/services");
});

// A path that is exactly a locale prefix can still carry a query or a
// fragment. The prefix has to be recognised there too, or the locale is
// silently lost and the next href built from it is wrong.
test("a bare locale prefix is still recognised before a query or fragment", () => {
  assert.deepEqual(splitLocale("/si?ref=1"), { locale: "si", rest: "/?ref=1" });
  assert.deepEqual(splitLocale("/ta#top"), { locale: "ta", rest: "/#top" });
  assert.equal(localeHref("/si?ref=1", "ta"), "/si?ref=1");
});
