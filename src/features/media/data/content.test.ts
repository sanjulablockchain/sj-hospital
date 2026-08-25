import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  desk,
  featured,
  gallery,
  heroFacts,
  jumpCards,
  kit,
  MEDIA_EMAIL,
  news,
  newsCategories,
  PLACEHOLDER_NOTICE,
  rules,
  SWITCHBOARD,
  topics,
} from "./content.ts";

const source = readFileSync(fileURLToPath(new URL("./content.ts", import.meta.url)), "utf8");

// The comments in content.ts discuss the very things the scans below forbid:
// the header explains why `media@` is an assumption by contrasting it with
// `careers@sjhospital.lk`. Strip comments so the scans read the copy that
// actually reaches the page, not the reasoning about it.
const copy = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

// The whole point of this file. Everything on /media came out of a design
// reference and none of it is confirmed, so the warning has to survive edits.
test("the placeholder notice is present and unmissable", () => {
  assert.match(source, /PLACEHOLDER CONTENT, NOT YET APPROVED BY ST\. JOSEPH HOSPITAL/);
  assert.match(
    PLACEHOLDER_NOTICE,
    /awaiting St\. Joseph Hospital Corporate Communications sign-off/,
  );
});

// The press kit files do not exist in this repo. A row that grew an href would
// be a link to nothing, so the type has no href and this asserts nobody has
// worked around it by putting a path or a URL in one of the visible strings.
test("no press kit row offers a download", () => {
  for (const asset of kit) {
    for (const field of [asset.name, asset.note, asset.format]) {
      assert.ok(!/https?:\/\//.test(field), `${asset.name} carries a URL`);
      assert.ok(!/\.(svg|png|eps|pdf|docx|txt|jpe?g|zip)\b/i.test(field), `${asset.name} names a file`);
    }
  }
  // `format` lists what the kit will contain, so it does name extensions in
  // prose ("SVG, PNG, EPS"). That is fine; a dotted filename is not.
  assert.ok(kit.every((asset) => !asset.format.includes("/")));
});

test("the jump card counts are derived from the lists they advertise", () => {
  const byLabel = Object.fromEntries(jumpCards.map((card) => [card.label, card.count]));
  assert.equal(byLabel["Newsroom"], `${news.length} items`);
  assert.equal(byLabel["Press kit"], `${kit.length} assets`);
  assert.equal(byLabel["Filming and privacy"], `${rules.length} rules`);
});

test("every jump card anchors at a section this page actually renders", () => {
  const sections = new Set(["#newsroom", "#press", "#kit", "#gallery", "#spokespeople", "#usage"]);
  for (const card of jumpCards) assert.ok(sections.has(card.href), `${card.href} is not a section`);
});

// `tag` doubles as the filter value, so an item tagged with anything outside
// the category list would be unreachable by every chip including "All"'s count.
test("every news item carries a known category", () => {
  for (const item of news) {
    assert.ok(newsCategories.includes(item.tag), `${item.title} has tag ${item.tag}`);
  }
});

test("every category has at least one item behind it", () => {
  for (const category of newsCategories) {
    assert.ok(
      news.some((item) => item.tag === category),
      `${category} would render an empty grid`,
    );
  }
});

test("the featured release is also in the newsroom list", () => {
  assert.ok(news.some((item) => item.title === featured.title));
});

test("news titles are unique, since the grid keys on them", () => {
  assert.equal(new Set(news.map((item) => item.title)).size, news.length);
});

// The gallery is the one section whose content is genuinely the hospital's own.
// These three files ship in public/images and carry other pages on the site;
// the reference's own fallbacks pointed at paths that do not exist here.
test("every gallery image is a repo asset with alt text and a credit", () => {
  const known = ["/images/hero-exterior.png", "/images/career-staff.jpg", "/images/logo-mark.png"];
  assert.deepEqual(
    gallery.map((shot) => shot.src),
    known,
  );
  for (const shot of gallery) {
    assert.ok(shot.alt.length > 20, `${shot.title} needs real alt text`);
    assert.ok(shot.credit.length > 0, `${shot.title} needs a credit`);
  }
});

// This page states twice that no identifiable patient is released at any
// resolution: once in the gallery's own lede, once in the featured release's
// journalist notes. `doctors.jpg` shows a patient in a bed, so it is the one
// image on the site that must not appear here, however convenient it is
// elsewhere. The reference used it for both the hero and this grid.
test("no photograph of an identifiable patient is used on the press page", () => {
  const banned = "/images/doctors.jpg";
  for (const shot of gallery) assert.notEqual(shot.src, banned);
  const hero = readFileSync(
    fileURLToPath(new URL("../components/MediaHero.tsx", import.meta.url)),
    "utf8",
  );
  const heroSrc = hero.match(/src="(\/images\/[^"]+)"/)?.[1];
  assert.notEqual(heroSrc, banned, "the hero is back on the patient photograph");
  assert.ok(heroSrc, "could not find the hero image src");
});

// The logo mark must not be cropped to a 4:3 box like the two photographs.
test("the logo mark is contained, the photographs are covered", () => {
  const mark = gallery.find((shot) => shot.src === "/images/logo-mark.png");
  assert.equal(mark?.fit, "contain");
  for (const shot of gallery.filter((s) => s !== mark)) assert.equal(shot.fit, "cover");
});

// Only two contact points appear on this page, and one of them is the
// hospital's real switchboard. Guard against a third arriving unreviewed.
test("the only phone number on the page is the hospital's own", () => {
  const numbers = copy.match(/\b0\d[\d\s]{7,}\b/g) ?? [];
  for (const found of numbers) assert.equal(found.trim(), SWITCHBOARD);
});

test("the only email address on the page is the press desk", () => {
  const emails = copy.match(/[\w.+-]+@[\w.-]+\.\w+/g) ?? [];
  for (const found of emails) assert.equal(found, MEDIA_EMAIL);
});

// Sizes the layout assumes: the hero strip is a four column grid and the desk
// grid is two columns, so an odd count would leave a visible hole.
test("the fixed-size grids hold the counts their layouts assume", () => {
  assert.equal(heroFacts.length, 4);
  assert.equal(jumpCards.length, 4);
  assert.equal(gallery.length, 3);
  assert.equal(desk.length % 2, 0);
  assert.equal(featured.points.length, 4);
});

test("spokespeople rows name a topic and a role, never a person", () => {
  assert.ok(topics.length > 0);
  for (const row of topics) {
    assert.ok(row.k.length > 0 && row.v.length > 0);
    // A real name would need that person's consent and would go stale the day
    // they leave. The reference kept to roles and so does this.
    assert.ok(!/\b(Dr|Prof|Mr|Mrs|Ms)\.?\s/.test(row.v), `${row.k} names an individual`);
  }
});

test("no ground rule is left without an answer", () => {
  for (const rule of rules) {
    assert.ok(rule.q.endsWith("?"), `${rule.q} is not a question`);
    assert.ok(rule.a.length > 80, `${rule.q} has a stub answer`);
  }
});

// Project rule: no em dash in UI copy, in any encoding.
test("no em dash reaches the copy, in any encoding", () => {
  for (const form of ["—", "&mdash;", "&#8212;", "&#x2014;"]) {
    assert.ok(!source.includes(form), `content.ts contains ${form}`);
  }
});
