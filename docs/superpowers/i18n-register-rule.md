# What gets translated, and what stays English

The binding rule for Sinhala and Tamil copy on this site. It supersedes the
register section of `i18n-feature-recipe.md` wherever the two disagree.

Decided by the owner on 2026-09-09, after reading the drafted branch:

> "only nessassary part shold be traslated."

The first draft translated nearly everything. That made the site read as a
Sinhala site with English words in it. The owner's correction is the opposite
emphasis: **the page's structure stays English, and the explanation is
translated.** A reader scans in English and reads in their own language.

## Stays English, in every language

| What | Examples |
|---|---|
| **The Book CTA** | `bookNow`, every "Book now" button, in the header, the rail and in-page |
| **Nav bar** | every menu label, in the header, the mobile panel and breadcrumbs |
| **Footer** | column headings, link labels, the tagline, "Reach us", "Call us" |
| **Hero sections, entirely** | eyebrow, heading, and the descriptive paragraph under it, on every page |
| **Section eyebrows** | `/01 EMERGENCY and OPD`, `08 / Cleanliness and safety` |
| **Section headings** | the large display headings inside every page section |
| **Card and article titles** | service cards, health-tip articles, job openings, news items |
| **Filter and category chips** | `All`, `Emergency`, `Surgical`, `Diagnostics`, `Clinic`, `Women & Children`, `At home` |

## Gets translated

| What | Why |
|---|---|
| **Body paragraphs and descriptions** | the explanation a reader actually reads |
| **Health-tips clinical content** | symptoms, first aid steps, dengue warning signs, screening advice: the highest-consequence copy on the site |
| **Form labels and error messages** | what a patient reads when a form rejects what they typed |
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
