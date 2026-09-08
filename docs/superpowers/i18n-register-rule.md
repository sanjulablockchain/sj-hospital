# What gets translated, and what stays English

The binding rule for Sinhala and Tamil copy on this site. It supersedes the
register section of `i18n-feature-recipe.md` wherever the two disagree.

Decided by the owner on 2026-09-09, after reading the drafted branch:

> "only nessassary part shold be traslated."

The first draft translated nearly everything. That made the site read as a
Sinhala site with English words in it. The owner's correction is the opposite
emphasis: **the page's structure stays English, and the explanation is
translated.** A reader scans in English and reads in their own language.

## Six rulings, 2026-09-09

`register-policy-report.md` (the policy build) raised six ambiguities in the
table below. The owner ruled on all six, and the tables in this document
already reflect the outcome; this section is the record of what changed and
why.

1. **`heroFacts` goes English.** "Hero sections, entirely" reaches the fact
   strip beside the hero (`heroFacts[].k` / `.v`, "Refurbishment" / "USD 1
   million") even though it is not the eyebrow, heading, or standfirst by
   name: it sits inside the hero. Moved roughly 91 strings per language.
2. **Display `tag` values go English** on media items and gallery items
   (`mediaItems[].tag`, `gallery[].tag`). They are the same kind of short
   category label as the filter chips, which are already English; left
   translated, a Sinhala tag would sit directly under an English chip meaning
   the same thing.
3. **Page `<title>` goes English** (`pageMetadata.*.title`). A page name is a
   topic, and a tab title must not disagree with the menu label for the same
   page.
4. **Page `description` stays translated** (`pageMetadata.*.description`). It
   is prose, and it is what a Sinhala reader sees in a search result.
5. **All CTA and link labels go English**, not only the Book CTA. The
   broad category the policy already encoded (~211 strings per language)
   stands: a CTA is scaffolding, the same as nav, and the reader scans and
   navigates in English before reading in their own language.
6. **Filter controls go English**: `clearFilters`, `allSpecialities`, and the
   filter row's `searchPlaceholder`. They belong to the filter row, which is
   now English, not to a patient-facing data-entry form. Form labels and
   error messages on the contact and career forms stay translated, per the
   row above.

## Stays English, in every language

| What | Examples |
|---|---|
| **CTA and link labels** | not only the Book CTA: every link label and every button, `bookNow`, "Book now" in the header, the rail and in-page, jump cards, contact rows, apply rows |
| **Nav bar** | every menu label, in the header, the mobile panel and breadcrumbs |
| **Footer** | column headings, link labels, the tagline, "Reach us", "Call us" |
| **Hero sections, entirely, including the fact strip** | eyebrow, heading, the descriptive paragraph under it, and the `k`/`v` fact chips beside it ("Refurbishment / USD 1 million"), on every page |
| **Section eyebrows** | `/01 EMERGENCY and OPD`, `08 / Cleanliness and safety` |
| **Section headings** | the large display headings inside every page section |
| **Card and article titles** | service cards, health-tip articles, job openings, news items |
| **Filter and category chips, and the filter row around them** | `All`, `Emergency`, `Surgical`, `Diagnostics`, `Clinic`, `Women & Children`, `At home`; also each card's own display tag when it sits under a chip meaning the same thing (`mediaItems[].tag`, `gallery[].tag`); also the filter row's own controls (`clearFilters`, `allSpecialities`, `searchPlaceholder`), which are not form fields |
| **Page `<title>`** | `pageMetadata.*.title`: a page name, and a tab title must not disagree with the menu label for the same page |

## Gets translated

| What | Why |
|---|---|
| **Body paragraphs and descriptions, including page meta descriptions** | the explanation a reader actually reads; `pageMetadata.*.description` is prose and what a Sinhala or Tamil reader sees in a search result, unlike the `<title>` beside it |
| **Health-tips clinical content** | symptoms, first aid steps, dengue warning signs, screening advice: the highest-consequence copy on the site |
| **Form labels and error messages** | what a patient reads when a form rejects what they typed; this is the contact and career forms specifically, not the filter row above, which looks similar but is chrome now that its chips are English |
| **FAQ questions and answers** | the accordion Q&A on service pages |

## The consequence for an article, spelled out

A health-tips article now has an **English title** and **Sinhala body**. That is
deliberate: the title is how a reader finds the article, and the body is what
they need to understand. The same split applies to every card on the site.

## Register inside translated copy

Unchanged from the original decision: **code-mixed.** Everyday English nouns
stay English inside a Sinhala or Tamil sentence, because that is how people
speak in Negombo. `රෝගී Records එක Update කරන්න`, not a formal literary
rendering. Keep Western numerals.

## How "stays English" is implemented

`localize(base, overlay)` iterates the **English base** keys, so a key absent
from an overlay renders the English value. **Keeping a string English means
deleting that key from the overlay**, not translating it to itself. The path
policy in `src/lib/i18n/registerPolicy.ts` encodes the table above, and every
feature's `*.i18n.test.ts` asserts both directions: a path the policy says is
English must NOT appear in an overlay, and a path it says is translated must.

## Still open, and not decided here

Two categories of **assistive text** that no sighted reader ever sees:

- **`alt` text**, 64 image descriptions.
- **Chrome aria-labels**: `openMenu`, `closeMenu`, `backToTop`, the two theme
  toggles, and `changeLanguage`.

These are read aloud by a screen reader to someone who has chosen a Sinhala or
Tamil page. They are currently translated and have been left translated, on the
grounds that the rule above is about the visible register and that this is the
group least able to work around English. The visible `Language` label in the
mobile panel is chrome and **is** English, per the table.

If the owner wants assistive text English too, it is a small change: both
categories are already isolated behind path rules.
