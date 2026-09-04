# Sinhala and Tamil review hand-over

Everything on this branch is a **draft translation**. Nothing has been signed off,
and the build refuses to treat it as reviewed until a Sinhala or Tamil speaker
does so. This document is what that reviewer needs.

**Branch:** `worktree-trilingual-i18n`. `main` is untouched.

## What to do first

```bash
npm run i18n:status                        # lists all 78 overlays and their state
npm run i18n:status -- --require-reviewed  # the gate: exits 1 while any is a draft
```

Today the gate exits 1, and that is correct: **78 overlays, 39 Sinhala and 39
Tamil, 0 reviewed.** Nothing ships until that changes.

Read the pages, not the files. Start the site and click through:

```bash
npm run dev        # then / for English, /si for Sinhala, /ta for Tamil
```

## Signing off

Each overlay file carries a `__review` marker:

```ts
export const __review = { status: "draft", reviewer: null };
```

Flipping `status` to `"reviewed"` and naming yourself is **the reviewer's act,
and only the reviewer's**. No agent has flipped a single one, deliberately: the
whole gate exists to make sign-off a human decision. Sign off per file, as you
finish reading that file's pages, rather than in one sweep at the end.

## The register: the decision to confirm first

This is the one judgement that shapes every page, so confirm it before reading
for detail. The site is **deliberately code-mixed**: everyday English nouns stay
in English inside Sinhala and Tamil sentences. So this is correct, not a defect:

> රෝගී **Records** එක **Update** කරන්න

The alternative was full translation into formal literary Sinhala and Tamil,
which was rejected: it reads as officialese, and Colombo patients say "Records",
"Channel", "Ambulance" and "Scan" in English in ordinary speech.

**251 individual strings are recorded as deliberately English**, each in its
feature's `KEEPS_ENGLISH` set with a written reason, and each enforced by a test
that fails if a string leaves the set without being translated:

| feature | deliberate English strings | | feature | deliberate English strings |
|---|---|---|---|---|
| pharmacy | 47 | | facilities | 17 |
| network | 38 | | contact | 6 |
| career | 33 | | about | 3 |
| media | 29 | | health-tips | 3 |
| accommodation | 27 | | international-care | 3 |
| services | 26 | | e-channeling | 1 |
| home | 17 | | school-wellness | 1 |

Further categories stay English by design, beyond those 251:

- **The hospital's own name and brand strings**, in every language.
- **URL slugs.** `/si/contact-us`, not a transliterated path.
- **The privacy policy's legal text.**
- **The motto, where it is set as a brand mark.** The rule the site follows is
  that "To live is a privilege" is translated where it appears as a *sentence*
  (the home hero, which composes its own phrase across three segments in each
  locale) and stays English where it is set as a *mark*: the footer's logo
  lockup and the footer's bottom bar, both uppercase and letterspaced, plus the
  page `<title>` and the email signature. **This one is worth your explicit
  yes or no**, because it is a judgement about your brand rather than about
  language: an independent reader of the site flagged the bottom-bar instance as
  an untranslated string. It was kept English and the reasoning written at the
  site. Say the word and it becomes translated copy.
- **The footer copyright line**, being the registered name and a year.

If you disagree with the register itself, say so before reading further: it
would change every one of the 74 feature overlay files, and it is much cheaper
to change now than after sign-off.

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
- **No number was changed by any translation.** Verified per string: phone
  numbers, doses, ages, prices and counts are identical across all three
  languages.
- **Structural keys are never translated.** Icon lookups, `<option value>`s and
  validation match lists use keys that are separate from display text, so
  translating a label can no longer blank an icon or break a form.

None of that tells you whether the words are *right*. That is the part only you
can do.
