import { test } from "node:test";
import assert from "node:assert/strict";
import type { Service } from "../types.ts";
import { services as ALL } from "./services.ts";

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
  for (const s of ALL) {
    for (const [label, v] of strings(s)) {
      const flat = v.replace(/[\s()\-.]/g, "");
      for (const hit of flat.match(/(?:\+94|0)\d{8,10}/g) ?? []) {
        const normalized = hit.replace(/^\+94/, "0");
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
