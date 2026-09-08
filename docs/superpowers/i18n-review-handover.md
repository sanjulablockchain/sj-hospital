# Sinhala and Tamil review hand-over

Everything on this branch is a **draft translation**. Nothing has been signed off,
and the build refuses to treat it as reviewed until a Sinhala or Tamil speaker
does so. This document is what that reviewer needs.

**Branch:** `worktree-trilingual-i18n`. `main` is untouched.

## What to do first

```bash
npm run i18n:status                        # lists all 84 overlays and their state
npm run i18n:status -- --require-reviewed  # the gate: exits 1 while any is a draft
```

Today the gate exits 1, and that is correct: **84 overlays, 42 Sinhala and 42
Tamil, 0 reviewed.** Nothing ships until that changes.

Six of those 84 want your attention specially. Four are new to the list rather than new copy: the contact and
careers form validation messages (`schemas.si.ts` / `schemas.ta.ts` in each
feature). They were drafted alongside everything else but were sitting inline in
a file the gate could not see, so no earlier version of this document told you
they existed. They are the words a patient or an applicant reads when a form
rejects what they typed, and they need your read like any other page copy.

The other two are genuinely new copy, added last: `pageMetadata.si.ts` /
`pageMetadata.ta.ts`, the `<title>` and search-result description for all 17
routes. Until these landed, every Sinhala browser tab, Google result and shared
link preview was in English, which rather undercut the point. Two titles stay
English on purpose and are the ones to sanity-check: the home page, whose title
is the motto set as a brand mark, and `/pharmacy`, because the nav dictionary
already decided "Pharmacy" stays English and a title should not disagree with
the menu.

Read the pages, not the files. Start the site and click through:

```bash
npm run dev        # then / for English, /si for Sinhala, /ta for Tamil
```

## Signing off

Each overlay file carries a `__review` marker:

```ts
export const __review = { status: "draft", reviewer: null, date: null };
```

Name yourself in `reviewer`. The gate requires it: `status: "reviewed"` with
`reviewer: null` counts as outstanding and still exits 1, because a sign-off with
nobody's name on it is not a sign-off.

Flipping `status` to `"reviewed"` and naming yourself is **the reviewer's act,
and only the reviewer's**. No agent has flipped a single one, deliberately: the
whole gate exists to make sign-off a human decision. Sign off per file, as you
finish reading that file's pages, rather than in one sweep at the end.

## The register: settled, and much narrower than the first draft

**`docs/superpowers/i18n-register-rule.md` is the authority.** Read it before
this document's detail; everything below assumes it.

The first draft translated nearly everything, and reading it the owner called
that wrong: "only nessassary part shold be traslated." So the site now keeps its
**structure** English and translates the **explanation**. A reader scans and
navigates in English, then reads in their own language.

English in every language: the nav bar, the footer, the Book CTA and every other
CTA and link label, each hero in full including its fact strip, section eyebrows,
section headings, card and article titles, the filter chips and the filter row,
and each page's `<title>`.

Translated: body paragraphs and descriptions, page meta descriptions, the
health-tips clinical content, the contact and career form labels and error
messages, and the FAQ questions and answers.

**That change removed 1,271 strings per language**, so what you are reading is
**4,010 Sinhala and 4,010 Tamil strings**, not the 5,281 the earlier draft had.
A consequence worth expecting rather than discovering: **an article has an
English title and a Sinhala body**, and so does every card on the site.

Inside translated copy the register is **code-mixed**, unchanged: everyday
English nouns stay English, because that is how people speak in Negombo. So this
is correct, not a defect:

> රෝගී **Records** එක **Update** කරන්න

Formal literary Sinhala and Tamil was considered and rejected: it reads as
officialese, and patients say "Records", "Channel", "Ambulance" and "Scan" in
English in ordinary speech.

Further categories stay English by design, beyond the rule's table:

- **The hospital's own name and brand strings**, in every language.
- **URL slugs.** `/si/contact-us`, not a transliterated path.
- **The privacy policy's legal text.**
- **The motto, everywhere.** "To live is a privilege" is now English in all
  three languages, in every position: the footer's logo lockup, the footer's
  bottom bar, the page `<title>`, the email signature, and the home hero. The
  hero used to compose its own Sinhala and Tamil phrase across three segments;
  the register change made heroes English, so that translation is gone and the
  question of whether the motto should be translated has answered itself.
- **The footer copyright line**, being the registered name and a year.

The register itself is settled, so it is no longer a question put to you. If
reading the pages changes your mind about it, say so early: it moves thousands
of strings and is far cheaper to revisit before sign-off than after.

## Read these strings first: known-uncertain wording

These were drafted by Claude and **could not be corroborated** from anywhere
else in the codebase. They are the likeliest errors on the branch, and they are
all in `health-tips`, which is the highest-consequence content on the site
(symptoms, first aid, dengue warning signs).

| what it should say | what it currently says | where |
|---|---|---|
| bleeding **gums** (a dengue warning sign) | `මුඛයේ ලේ ගැලීම`, which is "bleeding in the mouth" | `health-tips/data/library.si.ts:173`, `warnings.si.ts:43` |
| single-use **gloves** | `අත්කොට්ට` | `health-tips/data/firstAid.si.ts:70` |
| **shoulder blades** | `උරහිස් අස්තකර` | `health-tips/data/firstAid.si.ts:42` |
| blood in the **sputum** | `පිච්චලේ ලේ`, where `පිච්චලේ` is the unattested word | `health-tips/data/warnings.si.ts:70` |
| before you feel **thirsty** | `තිගිතෙන්න` | `health-tips/data/library.si.ts:128`, `pageContent.si.ts:30` |

On "bleeding gums": the Tamil is correct (`ஈறு`), so only the Sinhala is at
issue. `විදුරුමස්වලින් ලේ ගැලීම` is the formal form and `දත් මුල්වලින් ලේ ගැලීම`
the colloquial one that better fits these pages' register. **Neither was
committed**, because guessing at a dengue warning sign is exactly the kind of
change this gate exists to prevent. Please pick one.

## Why the Sinhala medical copy needs a careful read specifically

An independent review of `health-tips` found five defects that **every automated
check passed**, because a test can see that a string changed but not that it now
says the wrong thing:

- a **lump** ("a lump anywhere that is new, hard or growing", the row aimed at
  early cancer detection) rendered as a **neck**
- **waist** rendered as **hip**, twice, in the row whose whole point is that
  waist measurement beats the scale
- **five abdominal thrusts** rendered as **five pats**, softening a
  resuscitation manoeuvre
- **wet nappies**, a dehydration sign in infants, rendered as **bitter**
- the kidney-screening lede readable as **the reverse of the English**: the
  English says a urine test finds the problem long *before* swelling or
  tiredness appear

All five are fixed and re-verified word by word. They are listed here because
they are the evidence for how this content should be read: **the suite is green
and the suite cannot see this class of error.** Please read the Sinhala
`health-tips` pages as clinical copy, not as translations.

One further note in the same vein: a fix round rendered "five back blows" as
Tamil `அறைகள்`, which is the word this very site uses 38 times for **rooms**.
Corrected to `அடிகள்`.

## Decision needed: alt text is English in all three languages

**64 image descriptions stay English on the Sinhala and Tamil pages.** They are
excused from translation by a rule matching the `.alt` / `.heroAlt` / `.photoAlt`
path suffixes, written when the branch began and never revisited.

Alt text is what a screen reader speaks aloud. So today a blind Sinhala visitor
hears the page in Sinhala and then, at each image, an English sentence. That is
the group least able to work around it.

The argument for leaving it: nobody sees alt text unless they need it, and 60 of
the 64 are full sentences of three words or more, so translating them adds 120
strings to the queue you are already reading.

The argument for translating it: it is the one place where leaving English is not
a stylistic choice but an accessibility gap, and this is a hospital.

**I have not changed it either way, because it is your call.** Note one thing
found while measuring: the rule is already applied inconsistently. The home
hero's own `photoAlt` **is** translated in both locales, and the suffix rule was
silently excusing it from the check. So the site does not currently do either
thing consistently, and whichever you choose will be a change.

## Open decision that is yours, not a defect

The pharmacy hero headline appears in two places: the band on the home page and
the pharmacy page's own hero. The English matches. **The Sinhala `line2`/`line3`
and the Tamil `line2` have drifted into different wording between the two.**
Both readings are defensible, so neither was overwritten: picking one would
change what a visitor reads. Decide which wording is right and the two will be
consolidated to it.

## What the machine already guarantees

So you can spend your attention on meaning rather than on mechanics:

- **Every English string has a Sinhala and a Tamil counterpart.** Parity is
  enforced by reflection over the whole content tree, so a missing translation
  fails the build rather than falling back silently.
- **No translation is still its English source**, compared case- and
  whitespace-insensitively. That check exists because `"Bank Transfer"` for
  `"Bank transfer"` once shipped past a case-sensitive one.
- **Every number in an English string still appears in its translation.** This
  line previously said the opposite, and said so correctly at the time: nothing
  enforced it, and changing the ambulance number in the Sinhala heart-attack
  instruction from `0117 84 84 84` to `0117 84 84 48` passed the whole suite.
  That is now a test failure, on every one of the 84 overlays. So is a dropped
  digit (`160/100` to `160/10`), an altered range (`25-65` to `52-56`), a
  changed magnitude in a mixed sentence (`USD 1 million` to `මිලියන 10`), and a
  Sinhala or Tamil numeral written where the English has an ASCII one (`40` to
  `௪௦`), which the site's register does not use anywhere. A number is allowed
  to MOVE within a sentence, because word order differs; its value is not.
  Each of those five was verified by mutation before and after.

  Two boundaries worth knowing while you read. First, a translation may still
  ADD a number the English does not have, because 71 strings legitimately do
  ("around the clock" reads naturally as `පැය 24`); an invented number in
  translated prose would therefore pass. Second, `24/7` rendered as "24 hours"
  is the one English idiom whose `7` is allowed to disappear. Everything else
  numeric is enforced.
- **No overlay carries a second copy of a fact.** Phone numbers, prices, hrefs,
  anchor ids and structural keys live in exactly one place, the English module,
  and a translation that restated one now fails. Before this, an overlay could
  put its own phone number on a Sinhala page and the suite stayed green.
- **Structural keys are never translated.** Icon lookups, `<option value>`s and
  validation match lists use keys that are separate from display text, so
  translating a label can no longer blank an icon or break a form.

None of that tells you whether the words are *right*. That is the part only you
can do.
