import { test } from "node:test";
import assert from "node:assert/strict";
import type { Service } from "../types.ts";
import { emergencyServices } from "./emergency.ts";
import { surgicalServices } from "./surgical.ts";

const ALL: Service[] = [...emergencyServices, ...surgicalServices];

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

test("no prices anywhere", () => {
  // LKR/Rs amounts, or bare thousands separators like 9,500 / 32,000.
  const price = /\b(?:LKR|Rs\.?|USD|\$)\s?[\d,]+|\b\d{1,3},\d{3}\b/i;
  for (const s of ALL) {
    for (const [label, v] of strings(s)) {
      assert.ok(!price.test(v), `${label} contains a price: ${v}`);
    }
  }
});

test("the only phone number is the hospital's own", () => {
  const anyPhone = /\b(?:0\d{3}\s?\d{2}\s?\d{2}\s?\d{2}|\+94[\d\s]{7,})\b/g;
  for (const s of ALL) {
    for (const [label, v] of strings(s)) {
      for (const hit of v.match(anyPhone) ?? []) {
        assert.equal(hit.trim(), "0117 84 84 84", `${label} has a foreign number: ${hit}`);
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
