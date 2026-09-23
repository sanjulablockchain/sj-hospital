/**
 * Which content paths stay English in every language.
 *
 * This module is the one authoritative encoding of
 * `docs/superpowers/i18n-register-rule.md`, which supersedes the register
 * section of `i18n-feature-recipe.md`. The owner's correction, after reading
 * the fully translated draft, was that the page's STRUCTURE stays English and
 * the EXPLANATION is translated: a reader scans in English and reads in their
 * own language.
 *
 * `localize(base, overlay)` iterates the English base keys, so a key absent
 * from an overlay renders the English value. **"This string stays English" is
 * therefore expressed by DELETING the key from the overlay**, never by copying
 * the English text into it, which the identity assertion would reject anyway.
 *
 * ## This is a SECOND, separate reason for a path to be English
 *
 * Each feature's `*.i18n.test.ts` already has an `isUntranslatable(path)`
 * predicate. That one means "this is not copy at all": an href, an icon name,
 * a phone number, an anchor id, a structural key the code switches on. Those
 * paths have exactly one home in the English module and an overlay must never
 * restate them.
 *
 * `staysEnglish` means something different: this IS copy, it IS translatable,
 * and the owner has decided it renders in English anyway. The two predicates
 * are deliberately kept apart rather than merged into one blob, because they
 * fail differently and are reviewed by different people. `isUntranslatable` is
 * a fact about the data shape and is permanent; `staysEnglish` is an editorial
 * decision about register and could be revised by the owner tomorrow.
 *
 * ## Erasable TypeScript only
 *
 * `npm test` runs `node --test` over `src/**\/*.test.ts` with Node's own type
 * stripping, which does not resolve the `@/*` alias and does not transform
 * TypeScript beyond removing types. So: relative imports with explicit `.ts`
 * extensions, no `enum`, no `namespace`, no parameter properties.
 */

/**
 * Why a path is English, so the audit script can report per-category totals
 * and a reader of a red suite can see which row of the rule table bit.
 */
export type RegisterReason =
  | "hero"
  | "eyebrow"
  | "heading"
  | "title"
  | "cta"
  | "chip"
  | "nav"
  | "footer"
  | "pageTitle";

/** Human wording for each reason, used in the audit output and failures. */
export const REGISTER_REASONS: Record<RegisterReason, string> = {
  hero: "hero section (eyebrow, heading, standfirst, breadcrumbs, hero CTAs)",
  eyebrow: "section eyebrow",
  heading: "section or display heading",
  title: "card or article title",
  cta: "CTA or link label",
  chip: "filter or category chip",
  nav: "nav label",
  footer: "footer heading, link label or tagline",
  pageTitle: "route <title> (a page name, must match its nav label)",
};

/**
 * `articles[3].title` becomes `["articles", "title"]`.
 *
 * Array indices are dropped: the rule is about what a field IS, and the third
 * article's title is the same kind of thing as the first one's. Dictionary keys
 * are kept as they are, which is why `NAV_LABELS.About us` yields a segment
 * with a space in it.
 */
function segments(path: string): string[] {
  return path
    .replace(/\[\d+\]/g, "")
    .split(".")
    .filter((segment) => segment !== "");
}

/* ------------------------------------------------------------------ *
 * Guards: paths that stay TRANSLATED however much they look like
 * structure. Checked before every rule below, so a later rule cannot
 * reach them by accident.
 * ------------------------------------------------------------------ */

/**
 * Assistive text no sighted reader ever sees. The rule document leaves these
 * translated on purpose ("Still open, and not decided here"): they are read
 * aloud to somebody who chose a Sinhala or Tamil page, and that is the group
 * least able to work around English.
 *
 * `alt` and `photoAlt` and `heroAlt` are the 64 image descriptions.
 * `filterAriaLabel`, `searchAriaLabel`, `ariaNext` and the `accordionAria`
 * pair are the aria-labels. `hero.photoAlt` is the reason this is a guard
 * rather than an ordinary exception: without it the hero rule below would
 * delete an image description.
 */
function isAssistiveText(segs: string[], leaf: string): boolean {
  if (leaf === "alt" || /[a-z]Alt$/.test(leaf)) return true;
  if (/^aria[A-Z]/.test(leaf) || /Aria[A-Za-z]*$/.test(leaf)) return true;
  if (segs.includes("accordionAria")) return true;
  // The chrome's own aria-labels. `language` is NOT here: the rule document
  // says the visible "Language" label in the mobile panel is chrome and is
  // English.
  if (segs[0] === "chromeCopy") {
    return (
      leaf === "openMenu" ||
      leaf === "closeMenu" ||
      leaf === "backToTop" ||
      leaf === "toLightMode" ||
      leaf === "toDarkMode" ||
      leaf === "changeLanguage"
    );
  }
  return false;
}

/**
 * Health-tips clinical content, which the rule document calls the
 * highest-consequence copy on the site and keeps translated: symptoms, first
 * aid steps, dengue warning signs, screening advice.
 *
 * Only the collections whose fields would otherwise be caught by a rule below
 * need naming. `firstAidSteps[].title` is the whole point: a `title` leaf, but
 * it holds "Cool water, twenty minutes", which is the instruction itself and
 * not a card title. `warnings[].symptom`, `screening[].check`, `myths[].q/a`
 * and `LEVEL_LABELS` (the "Come in now" / "Same day" triage badges) are
 * already translated by default because no rule below reaches them, and they
 * are listed here so a future rule cannot quietly start reaching them.
 */
const CLINICAL_ROOTS = new Set([
  "firstAidSteps",
  "warnings",
  "screening",
  "myths",
  "denguePoints",
  "homeKit",
  "LEVEL_LABELS",
  "emergencyNumbers",
]);

/**
 * `pageMetadata` is a route's `<title>` and meta `description`, in
 * `src/config/pageMetadata.ts`. The owner ruled on both, 2026-09-09:
 *
 * - The `<title>` goes English (ruling 3). A page name is a topic, not a
 *   sentence, and a tab title must not disagree with the menu label for the
 *   same page: `NAV_LABELS` is now English, so `pageMetadata.*.title` has to
 *   match.
 * - The `description` stays translated (ruling 4). It is prose, and it is
 *   what a Sinhala or Tamil reader actually sees under the link in a search
 *   result.
 */
function pageMetadataReason(leaf: string): RegisterReason | null {
  return leaf === "title" ? "pageTitle" : null;
}

/* ------------------------------------------------------------------ *
 * The rule table itself.
 * ------------------------------------------------------------------ */

/**
 * The hero, entirely: its eyebrow or strapline, every heading segment, the
 * standfirst under it, its breadcrumbs and its CTA buttons.
 *
 * Two shapes carry it. Most features nest everything under `hero`; nine
 * features hold the descriptive paragraph in a sibling `heroStandfirst`
 * instead, and that paragraph is literally the "descriptive paragraph under
 * it" the rule names, so it belongs here.
 *
 * `heroFacts` is here too, per the owner's ruling on 2026-09-09: it is the
 * strip of `k`/`v` fact chips beside the hero ("Refurbishment / USD 1
 * million"), and "hero sections, entirely" reaches a fact strip that sits
 * inside the hero even though it is not the eyebrow, the heading, or the
 * standfirst by name. This moved 91 Sinhala and 91 Tamil strings.
 */
const HERO_ROOTS = new Set(["hero", "heroStandfirst", "heroFacts"]);

/**
 * Section eyebrows: the small `/01 Emergency & OPD` line above a heading.
 *
 * Three shapes, all of them the same thing on the page: a leaf `eyebrow`, a
 * leaf ending `Eyebrow` (`sectionEyebrow`, `contactEyebrow`, `reachEyebrow`),
 * and a whole `sectionEyebrows` dictionary keyed by section name, which is
 * where most of them actually live.
 */
function isEyebrow(segs: string[], leaf: string): boolean {
  if (leaf === "eyebrow" || /[a-z]Eyebrow$/.test(leaf)) return true;
  if (segs.includes("sectionEyebrows")) return true;
  // Two sections render their eyebrow through a field called `badge`, and one
  // of them holds the exact string the rule document quotes as its eyebrow
  // example. Named individually because `badge` elsewhere is a genuine status
  // chip ("You are here") and stays translated.
  return segs.join(".") === "servicesBento.tiles.badge" || segs.join(".") === "seasonalSection.badge";
}

/**
 * Section and display headings, in every shape this codebase uses:
 *
 * - a scalar `heading`, or a scalar named `<section>Heading`
 * - the split display headings `headingLine1` / `headingOutline` /
 *   `headingAccent` / `headingLead` / `headingTail` / `headingPlace`
 * - a nested object, `heading.line1` / `heading.line2` / `heading.line3` and
 *   `hero.heading.accent`, or `<section>Heading.line1`
 * - `headingAll`, `headingFiltered`, `headingAllRoles`, the directory's
 *   heading in each of its states
 *
 * The nested and `<section>Heading` shapes are why this tests every segment
 * rather than only the leaf: `faqHeading.line1` is a heading whose leaf is
 * `line1`. Nothing in this repo puts a bare `line1` anywhere except under a
 * heading, which is what makes that safe.
 *
 * `Head` as well as `Heading`, because the six service detail modules call
 * theirs `aboutHead` and `AboutSection.tsx` renders it as that page's only
 * `<h2>`. Matching only `Heading` left 36 display headings translated.
 */
function isHeading(segs: string[], leaf: string): boolean {
  if (segs.some((segment) => segment === "heading" || /[a-z]Head(ing)?$/.test(segment))) {
    return true;
  }
  return /^heading[A-Z0-9]/.test(leaf);
}

/**
 * Card and article titles: service cards, health-tip articles, job openings,
 * news items, journey and admission steps, room and station cards.
 *
 * `directoryTitle` is the same card under a shorter name, used where a service
 * appears in the all-services directory.
 */
function isCardTitle(segs: string[], leaf: string): boolean {
  if (leaf === "title" || leaf === "directoryTitle") return true;
  // `career`'s `sharedJobTitles` is four of its own `jobs[].title` values read
  // back through a named export, so the home page's careers teaser imports the
  // string instead of carrying a second copy of it. Same fact, so the same
  // classification: without this, one deletion done and the other forgotten
  // would render a job title in English on the careers page and in Sinhala on
  // the home page teaser.
  return segs[0] === "sharedJobTitles";
}

/**
 * The parents whose `label` is a link or a button rather than copy.
 *
 * `label` is the broadest key name in the codebase and it means two different
 * things. Under these parents it is the clickable text of a jump card, a
 * contact row, a book rail or an apply row: a link label, English by the rule
 * table. Everywhere else it is a form field label (`form.emailLabel`), a form
 * select option (`experienceOptions[].label`), a stat caption
 * (`pharmacy.stats[].label`, `theatreFigures[].label`), a fact strip caption
 * (`factStrip[].label`) or a clinical one (`emergencyNumbers[].label`), all of
 * which the rule table keeps translated.
 *
 * The discriminator is therefore where the `label` lives, not the key name. A
 * blanket rule on the key name would have deleted every form label on the
 * site, which the rule document explicitly protects.
 */
const LINK_LABEL_PARENTS = new Set([
  "jumpCards",
  "contactRows",
  "enquiryContactRows",
  "bookRail",
  "bookActions",
  "applyRows",
  // health-tips `bookSection.actions[].label`
  "actions",
  // facilities `ambulanceCall.label`
  "ambulanceCall",
  // `servicesBento.footer.label`
  "footer",
  // home `specialties.tabs[].label`: the six filter chips over the carousel,
  // the same species as `groupLabels` in services.
  "tabs",
]);

/**
 * CTA and link labels. The Book CTA is called out in its own row of the rule
 * table and is the same thing.
 *
 * Ruling 5 (2026-09-09): the owner confirmed the broad category, not only the
 * Book CTA. "All CTA and link labels go English." A CTA is scaffolding, the
 * same as nav: the reader scans and navigates in English and reads in their
 * own language. This keeps the ~211 per-language total the policy already
 * encoded rather than shrinking it to the ~20 that would be left if only
 * `bookNow` and its siblings qualified.
 *
 * The `cta` test is on the LEAF only, on purpose: `contactCta` is also the
 * name of a whole section object whose `body` is a paragraph and whose
 * `heading` is a heading, and a segment-wide test would have deleted that
 * paragraph.
 *
 * Not here: `form.submit` and its siblings, which are the submit button of a
 * form the rule table protects and stay translated; `stations[].more`, which
 * despite its name holds descriptive copy rather than a "more" link, and also
 * stays translated; and `clearFilters` / `allSpecialities` /
 * `searchPlaceholder`, which go English under ruling 6 but as `isChip` below,
 * not here, because they belong to the filter row rather than to a CTA.
 */
const CTA_LEAVES = new Set([
  "linkLabel",
  "allServicesLabel",
  "backToServices",
  "exploreLabel",
  "readMore",
  "browseServices",
  "bookNow",
  // The Book CTA on each doctor card in the e-channeling directory. The rule
  // table's first row is "every Book now button, in the header, the rail and
  // in-page", and this is the in-page one.
  "bookAppointment",
  // "Show all doctors" and "View all {count} services": the same species as
  // `allServicesLabel`, a link that opens the full list.
  "showAllDoctors",
  "viewAllTemplate",
  // chromeCopy's floating rail and footer actions
  "callUs",
  "whatsappUs",
]);

function isCta(segs: string[], leaf: string): boolean {
  if (/cta/i.test(leaf)) return true;
  if (CTA_LEAVES.has(leaf)) return true;
  if (leaf === "label") return LINK_LABEL_PARENTS.has(segs[segs.length - 2] ?? "");
  return false;
}

/**
 * Filter and category chips: the chip row above a filtered list.
 *
 * All four live in dictionaries keyed by the English chip text, which is what
 * the component filters on: `categoryLabels` in health-tips and in media,
 * `groupLabels` in services, `departmentLabels` in career. `newsroomCopy.allLabel`
 * is the "All" chip of a list whose other chips come from such a dictionary.
 *
 * Per-card chips are mostly NOT here: `articles[].tag`, `news[].tag`,
 * `<x>Services[].tags[]` and `orgGroups[].orgs[].chips[]` describe the card
 * they sit on and stay translated. The one exception is ruling 2, below.
 *
 * Ruling 2 (2026-09-09): `mediaItems[].tag` (home's media teaser, "News",
 * "Report", "Press", "Gallery") and `gallery[].tag` (the media page's photo
 * grid, "Exterior", "Clinical team", "Brand") are display chips of the exact
 * same kind as the filter chips above, not a fact the card is reporting on
 * itself the way `articles[].tag` is (that one doubles as the health-tips
 * filter key and is already `isUntranslatable`). Left translated, a Sinhala
 * tag would sit directly under an English filter chip meaning the same
 * thing, which is the mixed row the rule document warns against. This moved
 * 7 Sinhala and 7 Tamil strings.
 *
 * Ruling 6 (2026-09-09): `clearFilters`, `allSpecialities` and
 * `searchPlaceholder` (e-channeling's directory filter row) go English too.
 * They sit in the same control row as the chips above, which are now
 * English, and the ruling is explicit that this is about the filter row, not
 * about form fields: the contact and career forms' own labels and error
 * messages are unaffected, and stay translated by the `form` guard above.
 */
function isChip(segs: string[], leaf: string): boolean {
  if (
    segs.includes("categoryLabels") ||
    segs.includes("groupLabels") ||
    segs.includes("departmentLabels")
  ) {
    return true;
  }
  if (leaf === "allLabel") return true;
  if (leaf === "tag") return segs[0] === "mediaItems" || segs[0] === "gallery";
  return leaf === "clearFilters" || leaf === "allSpecialities" || leaf === "searchPlaceholder";
}

/**
 * Why this path is English, or `null` if it is translated.
 *
 * Order matters: the guards come first so that assistive text and clinical
 * content cannot be reached by a later rule. `pageMetadata` is resolved as
 * its own root right after them, before any generic rule, so that its
 * `description` (translated) cannot fall through to a rule that would
 * misclassify it and its `title` (English) does not depend on also matching
 * `isCardTitle` below. The nav and footer dictionaries come next because they
 * are whole-file decisions.
 */
export function registerReason(path: string): RegisterReason | null {
  const segs = segments(path);
  if (segs.length === 0) return null;
  const leaf = segs[segs.length - 1];
  const root = segs[0];

  // Guards.
  if (isAssistiveText(segs, leaf)) return null;
  if (CLINICAL_ROOTS.has(root)) return null;
  // `pageMetadata` splits between the two rulings above: `title` English,
  // `description` (and everything else under the root) translated. Handled
  // as its own root, before the generic rules below, because `description`
  // must never fall through to a later rule by accident.
  if (root === "pageMetadata") return pageMetadataReason(leaf);
  // "Form labels and error messages" is its own row of the "gets translated"
  // table. Every form field label, placeholder, status line and validation
  // message in this codebase sits under a `form` object or in a
  // `schemas.{si,ta}.ts` overlay of error strings, and none of them is reached
  // by a rule below. The segment test is a belt-and-braces guard so that a
  // future rule cannot start reaching them.
  // `form` must be a PARENT here, not the leaf: `sectionEyebrows.form` is the
  // eyebrow of the form section ("08 / Submit your CV"), and an
  // `includes`-only test let that through as though it were a field label.
  if (segs.includes("form") && segs.indexOf("form") < segs.length - 1) return null;

  // Nav bar, in the header, the mobile panel and the breadcrumbs.
  if (root === "NAV_LABELS") return "nav";
  // Footer column headings and link labels.
  if (root === "FOOTER_HEADINGS") return "footer";
  // The chrome's own visible strings.
  if (root === "chromeCopy") {
    if (leaf === "language") return "nav";
    if (leaf === "tagline") return "footer";
    if (leaf === "bookNow" || leaf === "callUs" || leaf === "whatsappUs") return "cta";
    return null;
  }

  if (HERO_ROOTS.has(root)) return "hero";
  if (isEyebrow(segs, leaf)) return "eyebrow";
  if (isHeading(segs, leaf)) return "heading";
  if (isCardTitle(segs, leaf)) return "title";
  if (isCta(segs, leaf)) return "cta";
  if (isChip(segs, leaf)) return "chip";
  return null;
}

/**
 * Whether this content path renders in English in every language, and so must
 * be ABSENT from `*.si.ts` and `*.ta.ts`.
 */
export function staysEnglish(path: string): boolean {
  return registerReason(path) !== null;
}
