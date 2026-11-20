import { test } from "node:test";
import assert from "node:assert/strict";
import type { Service } from "../types.ts";
import { services as ALL } from "./services.ts";
import { detailChrome } from "./indexContent.ts";
import { isComingSoonSlug } from "../../../config/comingSoon.ts";

/** Every string in a service, with a label for failure messages. */
function strings(s: Service): [string, string][] {
  const out: [string, string][] = [];
  const push = (label: string, v: string) => out.push([`${s.slug}.${label}`, v]);
  push("title", s.title);
  push("directoryTitle", s.directoryTitle);
  push("hours", s.hours);
  push("cta", s.cta);
  push("desc", s.desc);
  push("lede", s.lede);
  push("aboutHead", s.aboutHead);
  push("body1", s.body1);
  push("body2", s.body2);
  push("location", s.location);
  s.tags.forEach((t, i) => push(`tags[${i}]`, t));
  s.covers.forEach((t, i) => push(`covers[${i}]`, t));
  s.conditions.forEach((t, i) => push(`conditions[${i}]`, t));
  s.prep.forEach((t, i) => push(`prep[${i}]`, t));
  [...s.facts, ...s.strip].forEach((kv, i) => {
    push(`kv[${i}].k`, kv.k);
    push(`kv[${i}].v`, kv.v);
  });
  s.steps.forEach((st, i) => {
    push(`steps[${i}].title`, st.title);
    push(`steps[${i}].desc`, st.desc);
  });
  s.team.forEach((t, i) => {
    push(`team[${i}].role`, t.role);
    push(`team[${i}].note`, t.note);
  });
  s.faq.forEach((f, i) => {
    push(`faq[${i}].q`, f.q);
    push(`faq[${i}].a`, f.a);
  });
  if (s.book) {
    push("book.summary", s.book.summary);
    s.book.facts.forEach((f, i) => {
      push(`book.facts[${i}].k`, f.k);
      push(`book.facts[${i}].v`, f.v);
    });
    s.book.why.forEach((w, i) => push(`book.why[${i}]`, w));
  }
  return out;
}

// The hospital's own site already states "rooms from 10,000 LKR a night" for
// inpatient-rooms (Task 7), so that one service may carry a price. Every
// other service must not.
const PRICE_EXEMPT = new Set<string>(["inpatient-rooms"]);

test("no prices anywhere", () => {
  // LKR/Rs amounts, or bare thousands separators like 9,500 / 32,000.
  const price = /\b(?:LKR|Rs\.?|USD|\$)\s?[\d,]+|\b\d{1,3},\d{3}\b/i;
  for (const s of ALL) {
    if (PRICE_EXEMPT.has(s.slug)) continue;
    for (const [label, v] of strings(s)) {
      assert.ok(!price.test(v), `${label} contains a price: ${v}`);
    }
  }
});

test("the only phone number is the hospital's own", () => {
  // Normalize before matching rather than enumerating groupings: strip
  // separators, then find digit runs and compare against the flattened
  // allowed number. This catches any local grouping (011 234 5678,
  // 077 123 4567, etc.), not just the 4-2-2-2 shape the hospital's own
  // number happens to use.
  const ALLOWED = "0117848484";
  // The 2026 Service Book prints the hospital's other two lines (the owner
  // confirmed both are in use); a book excerpt quotes them as printed.
  const BOOK_ALLOWED = new Set([ALLOWED, "0317848484", "0764228898"]);
  for (const s of ALL) {
    for (const [label, v] of strings(s)) {
      const flat = v.replace(/[\s()\-.]/g, "");
      for (const hit of flat.match(/(?:\+94|0)\d{8,10}/g) ?? []) {
        const normalized = hit.replace(/^\+94/, "0");
        if (label.includes(".book.")) {
          assert.ok(BOOK_ALLOWED.has(normalized), `${label} has a foreign number: ${hit}`);
          continue;
        }
        assert.equal(normalized, ALLOWED, `${label} has a foreign number: ${hit}`);
      }
    }
  }
});

test("team entries carry roles, never personal names", () => {
  // "Dr", "Prof", or a Title Case two-word personal name pattern.
  const named = /\b(?:Dr\.?|Prof\.?|Professor)\s|\bMr\.?\s|\bMs\.?\s|\bMrs\.?\s/;
  for (const s of ALL) {
    for (const t of s.team) {
      assert.ok(!named.test(t.role), `${s.slug} team role names a person: ${t.role}`);
      assert.ok(!named.test(t.note), `${s.slug} team note names a person: ${t.note}`);
    }
  }
});

test("no dental service and no priced package language", () => {
  const banned = /\bdental\b|\bdentist\b|\bpackage price\b|\ball inclusive\b/i;
  for (const s of ALL) {
    for (const [label, v] of strings(s)) {
      assert.ok(!banned.test(v), `${label} contains banned content: ${v}`);
    }
  }
});

test("no success-rate or accreditation claims", () => {
  const banned = /\b\d{1,3}(?:\.\d+)?%\s*(?:success|survival|accura)|\baccredited\b|\bJCI\b|\bISO\s?\d/i;
  for (const s of ALL) {
    for (const [label, v] of strings(s)) {
      assert.ok(!banned.test(v), `${label} makes an unverifiable claim: ${v}`);
    }
  }
});

test("addresses, where present, are the hospital's own", () => {
  for (const s of ALL) {
    for (const [label, v] of strings(s)) {
      if (/\bStreet\b|\bRoad\b|\bMawatha\b|\bColombo\b/i.test(v)) {
        assert.match(v, /St\. Joseph Street, Negombo|Negombo/, `${label} cites a foreign address: ${v}`);
      }
    }
  }
});

// ---- Coming soon services ask, they do not book ----

// The owner's seven services not yet open (`config/comingSoon.ts`) keep their
// pages, but nothing on them may offer a booking: their `cta` (the hero
// button, the about card and the closing `#book` section) asks when it opens.
const ASK_CTA = "Ask us when it opens";

test("coming soon services ask when they open, and only they do", () => {
  for (const s of ALL) {
    if (isComingSoonSlug(s.slug)) assert.equal(s.cta, ASK_CTA, `${s.slug} still offers "${s.cta}"`);
    else assert.notEqual(s.cta, ASK_CTA, `${s.slug} is open but asks when it opens`);
  }
});

test("the detail chrome carries the coming soon note and heading", () => {
  assert.ok(detailChrome.comingSoonNote.length > 20);
  assert.equal(detailChrome.comingSoonHeading, ASK_CTA);
});

// ---- From our Service Book ----

// Each excerpt is one printed page of the 2026 Service Book's Services
// chapter. Web page N of the reader is printed page N (docs/service-book.md),
// so `page` is also the reader's `#page-N`. Super Channelling (page 11) has no
// service page; its excerpt lives in the e-channeling feature.
test("book excerpts sit on the pages the Service Book covers", () => {
  const pages = Object.fromEntries(ALL.filter((s) => s.book).map((s) => [s.slug, s.book!.page]));
  assert.deepEqual(pages, {
    "accident-emergency": 10,
    "cardiac-screening": 12,
    "home-visits": 15,
    "inpatient-rooms": 17,
    laboratory: 14,
    "outpatient-department": 9,
    pharmacy: 16,
    radiology: 13,
  });
});

test("every excerpt has a summary, two to four facts and two to four reasons", () => {
  for (const s of ALL) {
    if (!s.book) continue;
    assert.ok(s.book.summary.length > 20, `${s.slug} has no summary`);
    assert.ok(s.book.facts.length >= 2 && s.book.facts.length <= 4, `${s.slug} facts`);
    assert.ok(s.book.why.length >= 2 && s.book.why.length <= 4, `${s.slug} why`);
  }
});

test("no coming soon service quotes the Service Book", () => {
  for (const s of ALL) if (isComingSoonSlug(s.slug)) assert.equal(s.book, undefined, s.slug);
});

test("the excerpts print the book's facts that the owner confirmed", () => {
  const facts = (slug: string) => new Map(ALL.find((s) => s.slug === slug)!.book!.facts.map((f) => [f.k, f.v]));
  assert.equal(facts("outpatient-department").get("Hours"), "7.00 AM to 6.00 PM");
  assert.equal(facts("accident-emergency").get("Hours"), "24 hours, every day");
  assert.equal(facts("pharmacy").get("Delivery"), "Across Negombo");
  assert.deepEqual(
    [...facts("inpatient-rooms")],
    [
      ["Ward", "9,500 LKR"],
      ["Standard", "12,500 LKR"],
      ["Deluxe", "15,500 LKR"],
      ["Super Deluxe", "19,500 LKR"],
    ]
  );
});

test("no excerpt claims hospital standards or accreditation", () => {
  for (const s of ALL) {
    for (const why of s.book?.why ?? []) assert.doesNotMatch(why, /standard|accredit|certif/i, `${s.slug}: ${why}`);
  }
});
