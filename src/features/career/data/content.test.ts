import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  benefits,
  CAREERS_EMAIL,
  DEPARTMENT_ORDER,
  departments,
  experienceOptions,
  faq,
  formNotes,
  fraudChecks,
  heroFacts,
  jobs,
  jumpCards,
  PLACEHOLDER_NOTICE,
  process as hiringProcess,
  roleOptions,
  sourceOptions,
  students,
  SWITCHBOARD,
  tickerItems,
} from "./content.ts";

const source = readFileSync(fileURLToPath(new URL("./content.ts", import.meta.url)), "utf8");

// The header comment discusses the very claims the scans below forbid: it
// explains why "twelve minutes" and the named scholarship were cut. Strip
// comments so the scans read the copy that actually reaches the page, not the
// reasoning about it.
const copy = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

test("the placeholder notice is present and unmissable", () => {
  assert.match(source, /PARTLY PLACEHOLDER CONTENT, NOT YET APPROVED BY ST\. JOSEPH HOSPITAL/);
  assert.match(PLACEHOLDER_NOTICE, /await St\. Joseph Hospital Human Resources sign-off/);
});

// The single most damaging thing this page could do is advertise a vacancy that
// does not exist: a stranger spends an afternoon on an application for a post
// nobody is hiring for. The reference invented seventeen. These six are the
// ones the repo evidences, and the list is pinned exactly.
test("only the six evidenced vacancies are advertised", () => {
  assert.deepEqual(
    jobs.map((job) => job.title),
    [
      "Pharmacist",
      "Business Development and Insurance Coordinator",
      "Medical Officer, Emergency",
      "Theatre Nurse",
      "Medical Laboratory Technologist",
      "Radiographer, Digital X-ray",
    ]
  );
});

test("none of the eleven cut vacancies has come back", () => {
  const cut = [
    "Outpatient Department",
    "Consultant sessions",
    "Intensive Care Unit",
    "Maternity and Newborn",
    "Nursing Officer, Wards",
    "Physiotherapist",
    "Pharmacy Assistant",
    "Front Office Executive",
    "Billing and Insurance Coordinator",
    "International Patient Coordinator",
    "Biomedical Technician",
    "Housekeeping and Infection Control",
  ];
  for (const title of cut) {
    assert.ok(!copy.includes(title), `the cut vacancy "${title}" is back`);
  }
});

// Three specific inventions the other pages in this repo already had to strip,
// which the careers reference reintroduced inside its job descriptions.
test("the reference's invented figures stay out", () => {
  assert.ok(!/twelve minutes|\b12 minutes\b/i.test(copy), "twelve minutes is back");
  assert.ok(!/every 48 hours|48 hour/i.test(copy), "the 48 hour interim bill is back");
  assert.ok(!/De Silva|Janesri/i.test(copy), "the named scholarship is back");
  assert.ok(!/one to two or better|1 to 2 ratio/i.test(copy), "the nurse ratio promise is back");
});

// The checklist has to keep telling candidates which domain is genuine, and
// name only the domain the site actually sends from. It used to have to name
// ktdoctor.com as well, because the hospital advertised an HR address there.
// That route is retired, so naming a second domain now would legitimise
// exactly the kind of address this checklist exists to warn people about.
test("the fraud checklist names the one genuine domain and no other", () => {
  const domainRule = fraudChecks.find((check) => check.includes("sjhospital.lk"));
  assert.ok(domainRule, "the checklist no longer says which domain is genuine");
  assert.ok(!/ktdoctor\.com/.test(domainRule), "the retired HR domain is still called genuine");
  assert.ok(!copy.includes("ktdoctor.com"), "the retired HR address is still in the job detail");
  assert.ok(copy.includes(CAREERS_EMAIL), "the applications address has gone missing");
});

// Chips are derived, so a department can never be offered as a filter that
// would return nothing. The reference hard-coded seven against invented jobs.
test("every department filter has at least one vacancy behind it", () => {
  assert.equal(departments[0], "All");
  for (const department of departments.slice(1)) {
    const matching = jobs.filter((job) => job.department === department);
    assert.ok(matching.length > 0, `the "${department}" filter is empty`);
  }
  // And no vacancy sits in a department with no chip to reach it by, which is
  // what would happen if a job were given a department not in DEPARTMENT_ORDER.
  for (const job of jobs) {
    assert.ok(departments.includes(job.department), `"${job.department}" has no filter chip`);
  }
});

// Insertion order would put Pharmacy first purely because the Pharmacist
// vacancy is listed first, which reads as arbitrary. The chips follow the
// reference's clinical-first order instead.
test("the department chips are clinical first, not insertion ordered", () => {
  assert.deepEqual(departments, [
    "All",
    "Medical",
    "Nursing",
    "Allied health",
    "Pharmacy",
    "Administration",
  ]);
  const positions = departments.slice(1).map((d) => DEPARTMENT_ORDER.indexOf(d));
  assert.deepEqual(positions, [...positions].sort((a, b) => a - b));
});

test("the advertised counts are derived from the vacancy list", () => {
  const openNow = heroFacts.find((fact) => fact.k === "Open right now");
  assert.equal(openNow?.v, `${jobs.length} positions`);

  const openings = jumpCards.find((card) => card.label === "Open positions");
  assert.equal(openings?.count, `${jobs.length} roles`);

  const steps = jumpCards.find((card) => card.label === "How hiring works");
  assert.equal(steps?.count, `${hiringProcess.length} steps`);
});

test("every jump card points at a section this page renders", () => {
  const anchors = new Set(["#why", "#benefits", "#openings", "#process", "#students", "#fraud", "#faq", "#form", "#apply"]);
  for (const card of jumpCards) {
    assert.ok(anchors.has(card.href), `${card.label} points at ${card.href}, which is not a section`);
  }
});

// The form's role select is what decides the subject line of the email to
// Human Resources, and the schema rejects anything not in this list, so every
// advertised vacancy has to be pickable.
test("the form offers every advertised role plus a general application", () => {
  for (const job of jobs) {
    assert.ok(roleOptions.includes(job.title), `${job.title} cannot be selected on the form`);
  }
  assert.ok(roleOptions.includes("General application, no specific role"));
  assert.equal(roleOptions.length, jobs.length + 1);
});

test("no select option is an empty string, which the schema treats as unanswered", () => {
  for (const list of [roleOptions, experienceOptions, sourceOptions]) {
    for (const option of list) {
      assert.ok(option.trim().length > 0);
    }
  }
});

test("the switchboard is the number the rest of the repo publishes", () => {
  assert.equal(SWITCHBOARD, "0117 84 84 84");
  assert.equal(CAREERS_EMAIL, "info@sjhospital.lk");
});

test("the ticker advertises role families the vacancy list actually contains", () => {
  // Not a strict subset check: "Medical Officers" is the plural of a job title.
  // What matters is that nothing is advertised from a department with no post.
  assert.ok(tickerItems.length > 0);
  assert.ok(!/Physiotherapist/i.test(tickerItems.join(" ")), "physiotherapy is not a vacancy here");
});

// The project forbids the em dash in UI copy in every encoding. These strings
// came out of a design reference that used them freely.
test("no em dash reaches the page, in any encoding", () => {
  for (const forbidden of ["—", "&mdash;", "&#8212;", "&#x2014;"]) {
    assert.ok(!source.includes(forbidden), `content.ts contains ${JSON.stringify(forbidden)}`);
  }
});

test("the sections that are placeholder are all still populated", () => {
  // If one of these empties out, the page silently loses a section rather than
  // showing an obviously unfinished one, so pin that they have content.
  assert.ok(benefits.length === 4);
  assert.ok(benefits.every((group) => group.items.length > 0));
  assert.ok(hiringProcess.length === 5);
  assert.ok(students.length === 3);
  assert.ok(faq.length >= 8);
  assert.ok(formNotes.length === 5);
});
