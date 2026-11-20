import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { services } from "../features/services/data/services.ts";
import { isComingSoonSlug } from "../config/comingSoon.ts";
import type { Service } from "../features/services/types.ts";

/**
 * Seven services are not open yet (`config/comingSoon.ts`; owner, 2026-11-20,
 * vaccines and deliveries included). A sentence anywhere on the site that
 * mentions one of them must say it is coming, in whichever language: this
 * scan fails on prose that names a coming soon service with no "soon" /
 * "opens" qualifier beside it.
 *
 * Short strings (40 characters or fewer) are names and labels (a menu entry,
 * a chip, a card title); every renderer of those draws the Coming soon badge
 * (`config/comingSoon.test.ts`). The seven services' own pages keep their
 * content by design (the spec), so their data is skipped, and so are the
 * features below whose mentions are not offers of the service.
 */
const TERMS =
  /telemedicine|endoscop|gastroscop|colonoscop|\bICU\b|critical care|intensive care|fertility|\bIVF\b|embryolog|vaccinat|maternity|obstetric|labour ward|at delivery|after delivery/i;
const QUALIFIED = /soon|\bopens?\b|once (?:the|our)|when it opens|ළඟදීම|විවෘත වූ පසු|විවෘත වන|விரைவில்|திறந்த பின்|திறக்கும்/i;

const SKIP_FILES = [
  /\.test\.ts$/,
  /features[\\/]services[\\/]data[\\/](emergency|surgical|diagnostics|womenChildren|atHome|clinics)(\.si|\.ta)?\.ts$/,
  /features[\\/]health-tips[\\/]/, // bylines ("Vaccination clinic") and first-aid advice, not offers
  /features[\\/]career[\\/]/, // staff benefits (vaccination, maternity leave)
  /features[\\/]school-wellness[\\/]/, // the school programme's own vaccination drives
  /features[\\/]media[\\/]/, // unverified sample press content, flagged to the owner
  /features[\\/]locations[\\/]/, // Blue Sapphire is a different hospital
  /features[\\/]service-book[\\/]/, // describes the printed book's pages
  /features[\\/]laboratory[\\/]data[\\/](catalogue|overrides)\.ts$/, // test names
  /features[\\/]network[\\/]/, // the US group's own companies
];

function files(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) out.push(...files(path));
    else if (/\.tsx?$/.test(entry.name) && !SKIP_FILES.some((re) => re.test(path))) out.push(path);
  }
  return out;
}

function literals(source: string): string[] {
  const code = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`])\/\/.*$/gm, "$1");
  return [...code.matchAll(/"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)].map((m) => m[1] ?? m[2] ?? "");
}

/**
 * Sentences that mention a coming soon service without offering it, each with
 * its reason. Keep this list short: a new entry is a decision, not a fix.
 */
const NOT_AN_OFFER = new Set([
  // The school programme's own vaccination drives, run in schools, not the clinic.
  "On campus screening and vaccination across partner schools.",
  // Paediatrics prep: bring the record you already have; not an offer.
  "Bring your child's health and vaccination record",
]);

function unqualified(text: string): boolean {
  // Prose only: names and labels are short, and slugs and paths have no spaces.
  if (text.length <= 40 || !text.includes(" ") || NOT_AN_OFFER.has(text)) return false;
  return TERMS.test(text) && !QUALIFIED.test(text);
}

test("no sentence outside the seven services' own pages offers a coming soon service as open", () => {
  const hits: string[] = [];
  for (const file of ["src/features", "src/config", "src/components"].flatMap(files)) {
    for (const text of literals(readFileSync(file, "utf8"))) {
      if (unqualified(text)) hits.push(`${file}: ${text.slice(0, 110)}`);
    }
  }
  assert.deepEqual(hits, []);
});

/** Every string in an open service's English data. */
function strings(s: Service): string[] {
  return [
    s.desc, s.lede, s.body1, s.body2, s.aboutHead, s.location,
    ...s.covers, ...s.conditions, ...s.prep,
    ...s.facts.map((f) => f.v), ...s.strip.map((f) => f.v),
    ...s.steps.map((st) => st.desc), ...s.team.map((t) => t.note),
    // A question and its answer read together: "Can vaccinations be done
    // here?" is answered "Not yet ... coming soon".
    ...s.faq.map((f) => `${f.q} ${f.a}`),
  ];
}

test("open services' pages do not offer a coming soon service as open", () => {
  const hits: string[] = [];
  for (const s of services) {
    if (isComingSoonSlug(s.slug)) continue;
    for (const text of strings(s)) {
      if (!NOT_AN_OFFER.has(text) && TERMS.test(text) && !QUALIFIED.test(text)) hits.push(`${s.slug}: ${text.slice(0, 110)}`);
    }
  }
  assert.deepEqual(hits, []);
});
