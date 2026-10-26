import { test } from "node:test";
import assert from "node:assert/strict";
import {
  NEGOMBO_DIRECTIONS_URL,
  contactRows,
  helpBody,
  helpHeading,
  hero,
  heroFacts,
  heroStandfirst,
  hospitals,
  hospitalsHeading,
  hospitalsIntro,
  sectionEyebrows,
  tickerItems,
} from "./content.ts";
import { DIRECTIONS_URL, contactRows as contactPageRows } from "../../contact/data/content.ts";
import { megaNavLinks } from "../../../config/megaNavigation.ts";

/** Everything on the page that is prose the reader sees. */
const allCopy = [
  ...tickerItems,
  ...Object.values(hero),
  heroStandfirst,
  ...heroFacts.flatMap((f) => [f.k, f.v]),
  ...Object.values(sectionEyebrows),
  ...Object.values(hospitalsHeading),
  hospitalsIntro,
  ...hospitals.flatMap((h) => [
    h.name,
    h.city,
    h.region,
    h.statusLabel,
    h.body,
    h.photoAlt ?? "",
    h.address?.street ?? "",
    h.address?.locality ?? "",
    ...h.facts.flatMap((f) => [f.label, f.value]),
    ...h.actions.map((a) => a.label),
  ]),
  ...Object.values(helpHeading),
  helpBody,
  ...contactRows.flatMap((c) => [c.label, ...(c.value ? [c.value] : [])]),
].join("\n");

// ---- The hospital facts have one home ----

// Every Negombo fact on this page is the contact page's own, restated. The
// contact page's content.test.ts pins those to the hospital's published
// details; this pins the two pages to each other, so a later edit here
// cannot invent a second street or switchboard.
test("the Negombo card repeats the contact page's own facts", () => {
  const negombo = hospitals.find((h) => h.id === "negombo");
  assert.ok(negombo, "no Negombo card");
  assert.equal(NEGOMBO_DIRECTIONS_URL, DIRECTIONS_URL);

  const byIcon = new Map(contactPageRows.map((row) => [row.icon, row]));
  assert.equal(negombo.address?.street, byIcon.get("location")?.value);
  assert.equal(negombo.address?.locality, byIcon.get("location")?.sub);

  const facts = new Map(negombo.facts.map((f) => [f.label, f.value]));
  assert.equal(facts.get("Reception"), byIcon.get("phone")?.value);
  assert.equal(facts.get("WhatsApp"), byIcon.get("whatsapp")?.value);

  const hrefs = negombo.actions.map((a) => a.href);
  assert.ok(hrefs.includes(DIRECTIONS_URL), "no directions link");
  assert.ok(hrefs.includes(byIcon.get("phone")?.href ?? ""), "no reception tel: link");
});

test("the help rail uses the hospital's published numbers", () => {
  const byLabel = new Map(contactRows.map((row) => [row.label, row]));
  assert.equal(byLabel.get("Call the hospital")?.href, "tel:+94117848484");
  assert.equal(byLabel.get("WhatsApp us")?.href, "https://wa.me/94742223334");
  assert.equal(byLabel.get("Book a doctor")?.href, "/e-channeling");
  assert.equal(byLabel.get("Book a doctor")?.internal, true);
});

// ---- Pending means pending ----

// Blue Sapphire Hospital is listed before its details are known. A `pending`
// card must not carry an address, a phone fact or a photograph (there is
// nothing to back one yet), and an `open` card must carry all three, so the
// switch from one to the other cannot be half made.
test("an open card has its details and a pending card has none", () => {
  for (const hospital of hospitals) {
    if (hospital.status === "open") {
      assert.ok(hospital.address, `${hospital.name} is open but has no address`);
      assert.ok(hospital.photo, `${hospital.name} is open but has no photograph`);
      assert.ok(hospital.photoAlt, `${hospital.name} has a photograph with no alt text`);
      assert.ok(hospital.facts.length >= 2, `${hospital.name} is open but lists no facts`);
    } else {
      assert.equal(hospital.address, undefined, `${hospital.name} is pending but has an address`);
      assert.equal(hospital.photo, undefined, `${hospital.name} is pending but has a photograph`);
      assert.deepEqual(hospital.facts, [], `${hospital.name} is pending but lists facts`);
    }
    assert.ok(hospital.actions.length >= 1, `${hospital.name} has nothing to do`);
  }
});

test("the Ratnapura card is still pending", () => {
  const ratnapura = hospitals.find((h) => h.id === "ratnapura");
  assert.ok(ratnapura, "no Ratnapura card");
  assert.equal(ratnapura.name, "Blue Sapphire Hospital");
  assert.equal(ratnapura.status, "pending");
});

// ---- Wiring ----

// The header's Locations menu deep links to `/locations#<id>`; a card renamed
// here would leave the menu pointing at nothing.
test("every hospital the header links to is a card on this page, and vice versa", () => {
  const linked = megaNavLinks()
    .map((l) => l.href)
    .filter((h) => h.startsWith("/locations#"))
    .map((h) => h.slice("/locations#".length))
    .filter((id) => id !== "hospitals" && id !== "help")
    .sort();
  assert.deepEqual(
    linked,
    hospitals.map((h) => h.id).sort()
  );
});

test("card ids are unique and usable as element ids", () => {
  const ids = hospitals.map((h) => h.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z][a-z0-9-]*$/);
});

test("external actions are the only ones that leave the site", () => {
  for (const hospital of hospitals) {
    for (const action of hospital.actions) {
      if (action.external) assert.match(action.href, /^https:\/\//, `${action.label} is external but not https`);
      else assert.doesNotMatch(action.href, /^https?:/, `${action.label} leaves the site without external: true`);
      if (action.internal) assert.match(action.href, /^\//, `${action.label} is internal but not a route`);
    }
  }
});

// ---- House style ----

test("no copy uses an em dash, an en dash or a spaced hyphen", () => {
  assert.doesNotMatch(allCopy, /—|–| - |&mdash;|&ndash;/);
});
