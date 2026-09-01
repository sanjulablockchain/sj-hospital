# Trilingual Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Translate every remaining page of the SJ Hospital site into Sinhala and Tamil, so that a reader who picks a language never falls back into English.

**Architecture:** The infrastructure and the pattern already exist and are proven on `/contact-us`. Each feature keeps its English `content.ts` as the shape and the single home for facts, gains `content.si.ts` and `content.ta.ts` overlays carrying only strings, and exposes one `get<Feature>Content(locale)` getter. The feature's top-level Page component becomes the only component on the route that knows the locale, and hands the merged copy down. Shared chrome is translated once through a label dictionary rather than once per route.

**Tech Stack:** Next.js 16.2.11 App Router, React 19.2.4, TypeScript strict, Tailwind v4, `node:test`, Playwright for visual verification.

**Spec:** `docs/superpowers/specs/2026-09-01-trilingual-i18n-design.md`

**Predecessor plan:** `docs/superpowers/plans/2026-09-01-trilingual-i18n-infrastructure.md` (complete)

**Reference implementation:** the `contact` feature, commits `5c8c109`, `52f26cc`, `94d2058`, `0feb6d7`.

**Branch:** `worktree-trilingual-i18n`. Do not merge to `main`.

## Scope

14 features, the shared chrome, the form validation messages, and a final QA and sign-off sweep. Roughly **7,120 lines** of English copy to translate, of which `services` alone is 2,821.

`contact` is already done and is not in this plan.

## Global Constraints

Every task's requirements implicitly include this section.

- **Next.js 16.2.11.** The bundled docs in `node_modules/next/dist/docs/` are the source of truth. `params` is a Promise and must be awaited.
- **Server Components by default.** `'use client'` only at the smallest leaf. A client component NEVER imports content: it receives copy as a prop from a Server Component parent, or all three locales end up in the browser bundle.
- **`npm test` runs plain `node --test`,** which does NOT resolve the `@/*` alias. In any `.test.ts`, and anywhere under `src/lib/i18n/`, imports must be relative with an explicit `.ts` extension. `@/` is fine in application code.
- **Only erasable TypeScript:** no `enum`, no `namespace`, no parameter properties.
- **Never use an em dash** in copy, comments or commit messages, in any encoding: the literal character, `&mdash;`, `&#8212;`, `&#x2014;`.
- **No leading UTF-8 BOM** on any file.
- **Baseline: 346 tests passing, `npm run lint` at 0 errors, `npm run build` succeeding.** None of these may regress. Each feature task adds 4 tests (its parity file), so the count only ever climbs.
- **The register is code-mixed.** See "The register" below. This is not a stylistic preference, it is the decision the pilot settled with the user.
- **Every overlay ships marked `draft`.** `npm run i18n:status` lists them; `npm run i18n:status -- --require-reviewed` exits non-zero while any remain. Nothing in this plan flips a file to `reviewed`; only Task 17 does, and only on a real reviewer's say-so.

## The register, the patterns, and the recipe

All three live in **`docs/superpowers/i18n-feature-recipe.md`**, which is a
committed document rather than a section of this plan, because it outlives the
plan and every feature task depends on it.

**Read that document before starting any task in this plan.** It carries the
code-mixed register with worked examples, the five patterns the pilot
established, and the seven-step recipe each feature task applies.


---

### Task 1: Shared chrome

The header, footer, mobile menu and floating rail appear on all 17 routes. Translating them once here is what stops every page showing English chrome around translated content.

**Files:**
- Create: `src/config/navigationLabels.ts`, `navigationLabels.si.ts`, `navigationLabels.ta.ts`
- Create: `src/config/navigationLabels.test.ts`
- Create: `src/components/layout/chromeCopy.ts`, `chromeCopy.si.ts`, `chromeCopy.ta.ts`
- Create: `src/components/i18n/NavLabel.tsx`
- Modify: `src/components/layout/ThemedHeader.tsx`, `MobileNavPanel.tsx`, `FloatingActions.tsx`, `ThemedFooter.tsx`
- Modify: `src/components/theme/ThemeToggleButton.tsx`, `ThemeMenuToggle.tsx`

**Interfaces:**
- Consumes: `useLocale()` from `@/lib/i18n/useLocale`, `type Locale`, `localize`.
- Produces: `navLabel(label: string, locale: Locale): string`, `footerHeading(heading: string, locale: Locale): string`, `type ChromeCopy`, `getChromeCopy(locale: Locale): Promise<ChromeCopy>` for server callers, `chromeCopyFor(locale: Locale): ChromeCopy` for client ones, and `<NavLabel text kind />`.

- [ ] **Step 1: Take the inventory**

Run these and keep the output; the dictionary must cover all of it.

```bash
grep -rhoE 'label: "[^"]+"' src/config/*Navigation.ts | sort -u
grep -rhoE 'heading: "[^"]+"' src/config/*Navigation.ts | sort -u
```

Expected: **92 unique labels** across 380 occurrences, and **17 unique footer headings**. The repetition is why this is a dictionary and not 17 overlay files: a nav item added anywhere needs one entry, not seventeen.

- [ ] **Step 2: Write the failing dictionary test**

Create `src/config/navigationLabels.test.ts`. It reads the 17 config files as text, extracts every unique `label:` and `heading:` string, and asserts both dictionaries cover them. Keying a dictionary by the English string is safe only because this test exists: reword an English label and the suite fails rather than silently falling back.

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import * as si from "./navigationLabels.si.ts";
import * as ta from "./navigationLabels.ta.ts";

const CONFIG_DIR = fileURLToPath(new URL(".", import.meta.url));

function englishStrings(field: "label" | "heading"): string[] {
  const found = new Set<string>();
  for (const file of readdirSync(CONFIG_DIR)) {
    if (!file.endsWith("Navigation.ts")) continue;
    const source = readFileSync(CONFIG_DIR + file, "utf8");
    for (const m of source.matchAll(new RegExp(`${field}: "([^"]+)"`, "g"))) found.add(m[1]);
  }
  return [...found].sort();
}

test("every nav label in every config has Sinhala and Tamil", () => {
  const missingSi = englishStrings("label").filter((l) => !(l in si.NAV_LABELS));
  const missingTa = englishStrings("label").filter((l) => !(l in ta.NAV_LABELS));
  assert.deepEqual(missingSi, [], `Sinhala nav labels missing: ${missingSi.join(", ")}`);
  assert.deepEqual(missingTa, [], `Tamil nav labels missing: ${missingTa.join(", ")}`);
});

test("every footer heading in every config has Sinhala and Tamil", () => {
  const missingSi = englishStrings("heading").filter((h) => !(h in si.FOOTER_HEADINGS));
  const missingTa = englishStrings("heading").filter((h) => !(h in ta.FOOTER_HEADINGS));
  assert.deepEqual(missingSi, [], `Sinhala footer headings missing: ${missingSi.join(", ")}`);
  assert.deepEqual(missingTa, [], `Tamil footer headings missing: ${missingTa.join(", ")}`);
});

// The dictionary is keyed by the English string, so an entry whose value is
// still the English string is either a real gap or a decision. Decisions go in
// KEEPS_ENGLISH; gaps fail here.
const KEEPS_ENGLISH = new Set(["Media", "WhatsApp", "Pharmacy"]);
// Add any further label you deliberately keep in English, with a reason.

test("no dictionary entry is left as its English key", () => {
  for (const [name, dict] of [["si", si.NAV_LABELS], ["ta", ta.NAV_LABELS]] as const) {
    for (const [english, translated] of Object.entries(dict)) {
      if (KEEPS_ENGLISH.has(english)) continue;
      assert.notEqual(translated, english, `${name} "${english}" is untranslated`);
    }
  }
});
```

- [ ] **Step 3: Run it and watch it fail**

Run: `npm test 2>&1 | tail -20`
Expected: FAIL, `Cannot find module './navigationLabels.si.ts'`.

- [ ] **Step 4: Write the dictionaries and the lookup**

`src/config/navigationLabels.ts` holds the lookup helpers:

```ts
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import { NAV_LABELS as SI_NAV, FOOTER_HEADINGS as SI_FOOTER } from "./navigationLabels.si";
import { NAV_LABELS as TA_NAV, FOOTER_HEADINGS as TA_FOOTER } from "./navigationLabels.ta";

const NAV: Record<string, Record<string, string>> = { si: SI_NAV, ta: TA_NAV };
const FOOTER: Record<string, Record<string, string>> = { si: SI_FOOTER, ta: TA_FOOTER };

/**
 * A nav label in the reader's language. Falls back to the English string, so a
 * label added without a dictionary entry shows readable English rather than
 * nothing. `navigationLabels.test.ts` is what stops that shipping.
 */
export function navLabel(label: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return label;
  return NAV[locale]?.[label] ?? label;
}

export function footerHeading(heading: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return heading;
  return FOOTER[locale]?.[heading] ?? heading;
}
```

Then write `navigationLabels.si.ts` and `navigationLabels.ta.ts`, each exporting `NAV_LABELS` and `FOOTER_HEADINGS` as `Record<string, string>` covering every string from Step 1, in the register above. Examples for the nav, which is the most-seen text on the site:

```ts
export const NAV_LABELS: Record<string, string> = {
  Services: "සේවා",
  Facilities: "පහසුකම්",
  Pharmacy: "Pharmacy",
  "Care at Home": "නිවසේ සත්කාර",
  "Health Tips": "සෞඛ්‍ය උපදෙස්",
  "International Patient Care": "විදේශීය රෝගී සත්කාර",
  "School Wellness": "පාසල් සුවතාව",
  Network: "ජාලය",
  Media: "Media",
  Careers: "රැකියා",
  // ...every remaining label from Step 1
};
```

- [ ] **Step 5: Localize the chrome components**

`ThemedHeader` and `MobileNavPanel` already call `useLocale()`. Wrap each rendered label:

```tsx
{navLabel(item.label, locale)}
```

`ThemedFooter` is a Server Component and **stays one**. Its headings and link labels come from `columns`, and it must not gain a `locale` prop, because that would mean editing all 15 Page components that render it and drag this task across the whole codebase.

Instead add one client leaf beside the existing `LocaleLink`, which already sets the precedent:

```tsx
// src/components/i18n/NavLabel.tsx
"use client";

import { navLabel, footerHeading } from "@/config/navigationLabels";
import { useLocale } from "@/lib/i18n/useLocale";

/**
 * A nav or footer string in the reader's language, looked up at render.
 *
 * A client leaf rather than a prop on ThemedFooter: the footer is a Server
 * Component rendered by 15 different Page components, and threading a locale
 * through all of them to translate a heading would be a far larger change
 * than the one this solves.
 */
export function NavLabel({ text, kind = "nav" }: { text: string; kind?: "nav" | "heading" }) {
  const locale = useLocale();
  return <>{kind === "heading" ? footerHeading(text, locale) : navLabel(text, locale)}</>;
}
```

Then in `ThemedFooter.tsx`, wrap the heading and the link label: `<NavLabel text={column.heading} kind="heading" />` and `<NavLabel text={item.label} />`. `LocaleLink` already handles the hrefs, so leave those alone.

- [ ] **Step 6: Translate the chrome's own strings**

Create `chromeCopy.ts` plus `.si.ts` and `.ta.ts` overlays, merged with `localize`. `chromeCopy.ts` follows the same shape as a feature's content module and getter, in one file since it is small:

```ts
// src/components/layout/chromeCopy.ts
import { localize } from "@/lib/i18n/localize";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

export const chromeCopy = {
  bookNow: "Book now",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  backToTop: "Back to top",
  whatsappUs: "WhatsApp us",
  whatsapp: "WhatsApp",
  callUs: "Call us",
  reachUs: "Reach us",
  toLightMode: "Switch to light mode",
  toDarkMode: "Switch to dark mode",
};

export type ChromeCopy = typeof chromeCopy;

const overlays = { si: () => import("./chromeCopy.si"), ta: () => import("./chromeCopy.ta") };

export async function getChromeCopy(locale: Locale): Promise<ChromeCopy> {
  if (locale === DEFAULT_LOCALE) return chromeCopy;
  return localize(chromeCopy, await overlays[locale]());
}
```

Every consumer here is already a client component, and `getChromeCopy` is async, so a client component cannot await it. Give the client components a synchronous lookup instead, in the same file:

```ts
import { chromeCopy as en } from "./chromeCopy";
import { chromeCopy as si } from "./chromeCopy.si";
import { chromeCopy as ta } from "./chromeCopy.ta";

const BY_LOCALE = { en, si, ta };

/**
 * Synchronous because every caller is a client component. This is the one
 * place all three locales are allowed into the client bundle: ten short
 * strings, against the alternative of threading a prop through the header,
 * the mobile panel, the floating rail and both theme toggles.
 */
export function chromeCopyFor(locale: Locale): ChromeCopy {
  return BY_LOCALE[locale] ?? en;
}
```

Write the two overlays as full objects rather than partials, since all ten strings are translated and the synchronous path does not merge.

The strings to cover, which are every hardcoded user-visible string in the chrome:

| Where | String |
|---|---|
| `ThemedHeader.tsx` | `Book now` |
| `MobileNavPanel.tsx` | `Open menu`, `Close menu` |
| `FloatingActions.tsx` | `Back to top`, `WhatsApp us`, `WhatsApp`, `Call us` |
| `ThemedFooter.tsx` | `Reach us` |
| `ThemeToggleButton.tsx` | `Switch to light mode`, `Switch to dark mode` |
| `ThemeMenuToggle.tsx` | `Switch to light mode`, `Switch to dark mode` |

Leave these alone, and say so in the commit: `St. Joseph Hospital` (brand, and the logo asserts the English spelling), `Facebook` / `Instagram` / `LinkedIn` / `WhatsApp` (product names), and `To live is a privilege` (the hospital's motto, which is brand rather than copy).

The two theme components are client leaves that do not currently take props. Give them `useLocale()` and read from `getChromeCopy`, matching how `LanguageToggleButton` already works.

- [ ] **Step 7: Verify**

Run: `npm test && npm run lint && npm run build`
Expected: tests at 349 or above, lint 0, build succeeds.

Then follow **Step F** of the recipe against `/si/` and `/ta/` and confirm from the screenshots: the header's Book now, the hamburger, the floating WhatsApp and Call us buttons, and the footer headings are all translated. Confirm the logo wordmark is still English.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(i18n): translate the chrome once, not seventeen times"
```

---

### Task 2: Form validation messages

The contact and careers forms validate server-side through Zod and return English messages whatever language submitted them.

**Files:**
- Modify: `src/features/contact/schemas.ts`
- Modify: `src/features/contact/actions/` (the action calling that schema)
- Modify: `src/features/contact/components/ContactForm.tsx`
- Test: `src/features/contact/schemas.i18n.test.ts`

- [ ] **Step 1: Read how the form submits today**

```bash
cat src/features/contact/schemas.ts
grep -rn "sendContactMessage" src/features/contact --include="*.ts" --include="*.tsx"
```

The action receives `FormData` and has no locale. That is the gap.

- [ ] **Step 2: Write the failing test**

Create `src/features/contact/schemas.i18n.test.ts`. Test the factory directly: a Server Action cannot be invoked from `node --test`.

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { contactMessageSchema, VALIDATION_MESSAGES } from "./schemas.ts";

const EMPTY = { firstName: "", lastName: "", email: "", message: "" };

test("English messages are unchanged from before this task", () => {
  const result = contactMessageSchema("en").safeParse(EMPTY);
  assert.equal(result.success, false);
  const messages = result.error.issues.map((i) => i.message);
  assert.ok(messages.includes("First name is required"));
  assert.ok(messages.includes("Last name is required"));
});

test("a form filled in Sinhala is answered in Sinhala", () => {
  const result = contactMessageSchema("si").safeParse(EMPTY);
  assert.equal(result.success, false);
  for (const issue of result.error.issues) {
    assert.match(issue.message, /[඀-෿]/, `"${issue.message}" is not Sinhala`);
  }
});

test("a form filled in Tamil is answered in Tamil", () => {
  const result = contactMessageSchema("ta").safeParse(EMPTY);
  assert.equal(result.success, false);
  for (const issue of result.error.issues) {
    assert.match(issue.message, /[஀-௿]/, `"${issue.message}" is not Tamil`);
  }
});

// A message key added to English and forgotten in the other two would
// otherwise fall back silently and answer a Sinhala reader in English.
test("every locale defines every message key", () => {
  const keys = Object.keys(VALIDATION_MESSAGES.en).sort();
  assert.deepEqual(Object.keys(VALIDATION_MESSAGES.si).sort(), keys);
  assert.deepEqual(Object.keys(VALIDATION_MESSAGES.ta).sort(), keys);
});
```

- [ ] **Step 3: Run it and watch it fail**

Run: `npm test 2>&1 | tail -20`
Expected: FAIL, because `schemas.ts` exports a schema object rather than a `contactMessageSchema(locale)` factory and has no `VALIDATION_MESSAGES`.

- [ ] **Step 4: Make the schema locale-aware**

In `src/features/contact/schemas.ts`, replace the module-level schema with a message map and a factory. Keep the English strings byte-identical to the ones there now, so nothing but the language changes.

```ts
import { z } from "zod";
import type { Locale } from "@/lib/i18n/locales";

/**
 * Validation messages by locale. The keys are shared, and
 * `schemas.i18n.test.ts` fails if one locale is missing any of them: a missing
 * key would otherwise fall back and answer a Sinhala reader in English.
 */
export const VALIDATION_MESSAGES = {
  en: {
    firstNameRequired: "First name is required",
    lastNameRequired: "Last name is required",
    emailRequired: "Email is required",
    emailInvalid: "Enter a valid email address",
  },
  si: {
    firstNameRequired: "මුල් නම අවශ්‍යයි",
    lastNameRequired: "වාසගම අවශ්‍යයි",
    emailRequired: "Email එක අවශ්‍යයි",
    emailInvalid: "වලංගු Email එකක් ඇතුළත් කරන්න",
  },
  ta: {
    firstNameRequired: "முதல் பெயர் தேவை",
    lastNameRequired: "கடைசிப் பெயர் தேவை",
    emailRequired: "Email தேவை",
    emailInvalid: "சரியான Email ஒன்றை உள்ளிடுங்கள்",
  },
} satisfies Record<Locale, Record<string, string>>;

export function contactMessageSchema(locale: Locale) {
  const m = VALIDATION_MESSAGES[locale];
  return z.object({
    firstName: z.string().trim().min(1, m.firstNameRequired),
    lastName: z.string().trim().min(1, m.lastNameRequired),
    email: z.string().trim().min(1, m.emailRequired).pipe(z.email(m.emailInvalid)),
    message: z.string().trim().optional(),
  });
}

// The existing type export derives from a const schema, which no longer
// exists. Rederive it from the factory's return type or every importer breaks.
export type ContactMessageInput = z.infer<ReturnType<typeof contactMessageSchema>>;
```

Three details in that code are not incidental, and getting any of them wrong breaks the build rather than just the translation:

- **Zod here is 4.4.3, not 3.** The email rule is `.pipe(z.email(msg))`, which is what `schemas.ts` already uses. `.email()` as a string method is the Zod 3 idiom and is wrong here.
- **`message` is `.optional()`** in the current schema. Keep it optional; making it required silently rejects every message-less submission.
- **`ContactMessageInput` is exported today** as `z.infer<typeof contactMessageSchema>`. Once the schema is a factory that no longer type-checks, so it is rederived from `ReturnType<>` above. Check who imports it.

Read the existing `schemas.ts` first and carry over every field and rule it already has. The four message keys above are the ones visible in it today; if it validates more fields, add their messages in all three locales rather than dropping them.

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test 2>&1 | tail -8`
Expected: PASS, four tests added.

- [ ] **Step 6: Carry the locale through the form**

`ContactForm` is a client component and already calls nothing locale-aware, so add `useLocale()` and a hidden field:

```tsx
<input type="hidden" name="locale" value={useLocale()} />
```

In the Server Action, read it and validate before use. It arrives from the browser, so it is untrusted input:

```ts
const submitted = String(formData.get("locale") ?? "");
const locale = hasLocale(submitted) ? submitted : DEFAULT_LOCALE;
const parsed = contactMessageSchema(locale).safeParse(/* ...existing fields... */);
```

`hasLocale` and `DEFAULT_LOCALE` come from `@/lib/i18n/locales`. A missing or unrecognised value falls back to English rather than throwing: a validation message in the wrong language is a nuisance, a 500 on a contact form is a lost patient.

- [ ] **Step 7: Verify**

Run: `npm test && npm run lint && npm run build`

Then submit the form empty at `/si/contact-us` and at `/ta/contact-us`, and confirm the field errors come back in that script. This one genuinely needs a browser or a real POST: the test covers the factory, not the round trip.

- [ ] **Step 8: Commit**

```bash
git commit -am "feat(i18n): answer a form in the language it was filled in"
```

---

### Tasks 3 to 16: the fourteen features

Each is **the per-feature recipe, applied**. Read that section first; each task below carries only what is specific to it.

Ordered smallest first, so the register is well worn before the hard content. `home` sits late because its plumbing is the most tangled, and `services` and `health-tips` come last because they are respectively the largest and the highest-risk.

---

### Task 3: about

**Files:**
- Modify: `src/features/about/data/content.ts` (to receive copy currently stranded in components)
- Create: `src/features/about/data/content.si.ts`, `src/features/about/data/content.ta.ts`
- Create: `src/features/about/data/content.i18n.test.ts`
- Create: `src/features/about/data/getContent.ts`
- Modify: `src/features/about/components/AboutPage.tsx` and the section components it renders
- Modify: `src/app/[locale]/about-us/page.tsx`

**Size:** 132 lines of English copy across 1 data file.

**Route to screenshot:** `/si/about-us` and its `/ta` equivalent.

**Before you start:** read `docs/superpowers/i18n-feature-recipe.md` in full. Every step below is that document applied to this feature, and the traps it describes are invisible in English.

- [ ] **Step 1: Inventory** following recipe Step A. Report how many stranded component strings you found, and which files held them.

- [ ] **Step 2: Parity test first** following recipe Step B. Run `npm test` and confirm it fails with a `Cannot find module` error naming the first overlay you are about to write, before writing a single translation. For a feature with several data files, that is the first of them, not `content.si.ts`.

- [ ] **Step 3: Write both overlays** following recipe Step C, until `npm test` passes. Anything left in English goes in `KEEPS_ENGLISH` with a reason.

- [ ] **Step 4: Getter and threading** following recipe Steps D and E.

- [ ] **Step 5: Verify, and look** following recipe Step F. Run `npm test && npm run lint && npm run build`, restart the dev server, screenshot both locales at 360 and 1280, and report: any remaining English, any missing icon or image, any overflow, any bad wrap.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(i18n): translate about into Sinhala and Tamil"
```

---

### Task 4: e-channeling

**Files:**
- Modify: `src/features/e-channeling/data/content.ts`, `src/features/e-channeling/data/doctors.ts` (to receive copy currently stranded in components)
- Create: one `.si.ts` and one `.ta.ts` overlay beside each of the 2 data files
- Create: `src/features/e-channeling/data/content.i18n.test.ts`
- Create: `src/features/e-channeling/data/getContent.ts`
- Modify: `src/features/e-channeling/components/EChannelingPage.tsx` and the section components it renders
- Modify (copy as a prop, never an import): `DoctorDirectory.tsx`
- Modify: `src/app/[locale]/e-channeling/page.tsx`

**Size:** 200 lines of English copy across 2 data files.

**Route to screenshot:** `/si/e-channeling` and its `/ta` equivalent.

**Specific to this feature:** `doctors.ts` holds doctors' names and their specialities. **Doctors' names are proper nouns and stay in English.** Specialities translate. Exclude the name field in `isUntranslatable` rather than listing every name in `KEEPS_ENGLISH`, and say in the comment why.

**Before you start:** read `docs/superpowers/i18n-feature-recipe.md` in full. Every step below is that document applied to this feature, and the traps it describes are invisible in English.

- [ ] **Step 1: Inventory** following recipe Step A. Report how many stranded component strings you found, and which files held them.

- [ ] **Step 2: Parity test first** following recipe Step B. Run `npm test` and confirm it fails with a `Cannot find module` error naming the first overlay you are about to write, before writing a single translation. For a feature with several data files, that is the first of them, not `content.si.ts`.

- [ ] **Step 3: Write both overlays** following recipe Step C, until `npm test` passes. Anything left in English goes in `KEEPS_ENGLISH` with a reason.

- [ ] **Step 4: Getter and threading** following recipe Steps D and E.

- [ ] **Step 5: Verify, and look** following recipe Step F. Run `npm test && npm run lint && npm run build`, restart the dev server, screenshot both locales at 360 and 1280, and report: any remaining English, any missing icon or image, any overflow, any bad wrap.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(i18n): translate e-channeling into Sinhala and Tamil"
```

---

### Task 5: accommodation

**Files:**
- Modify: `src/features/accommodation/data/content.ts` (to receive copy currently stranded in components)
- Create: `src/features/accommodation/data/content.si.ts`, `src/features/accommodation/data/content.ta.ts`
- Create: `src/features/accommodation/data/content.i18n.test.ts`
- Create: `src/features/accommodation/data/getContent.ts`
- Modify: `src/features/accommodation/components/AccommodationPage.tsx` and the section components it renders
- Modify (copy as a prop, never an import): `RoomTypeNav.tsx`
- Modify: `src/app/[locale]/accommodation/page.tsx`

**Size:** 231 lines of English copy across 1 data file.

**Route to screenshot:** `/si/accommodation` and its `/ta` equivalent.

**Specific to this feature:** `RoomTypeNav.tsx` is a sticky in-page nav whose labels must match the room-type headings it scrolls to. Both read the same content, so translate once and let both read it. Do not translate the nav labels separately.

**Before you start:** read `docs/superpowers/i18n-feature-recipe.md` in full. Every step below is that document applied to this feature, and the traps it describes are invisible in English.

- [ ] **Step 1: Inventory** following recipe Step A. Report how many stranded component strings you found, and which files held them.

- [ ] **Step 2: Parity test first** following recipe Step B. Run `npm test` and confirm it fails with a `Cannot find module` error naming the first overlay you are about to write, before writing a single translation. For a feature with several data files, that is the first of them, not `content.si.ts`.

- [ ] **Step 3: Write both overlays** following recipe Step C, until `npm test` passes. Anything left in English goes in `KEEPS_ENGLISH` with a reason.

- [ ] **Step 4: Getter and threading** following recipe Steps D and E.

- [ ] **Step 5: Verify, and look** following recipe Step F. Run `npm test && npm run lint && npm run build`, restart the dev server, screenshot both locales at 360 and 1280, and report: any remaining English, any missing icon or image, any overflow, any bad wrap.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(i18n): translate accommodation into Sinhala and Tamil"
```

---

### Task 6: home-care

**Files:**
- Modify: `src/features/home-care/data/content.ts` (to receive copy currently stranded in components)
- Create: `src/features/home-care/data/content.si.ts`, `src/features/home-care/data/content.ta.ts`
- Create: `src/features/home-care/data/content.i18n.test.ts`
- Create: `src/features/home-care/data/getContent.ts`
- Modify: `src/features/home-care/components/HomeCarePage.tsx` and the section components it renders
- Modify: `src/app/[locale]/home-care/page.tsx`

**Size:** 274 lines of English copy across 1 data file.

**Route to screenshot:** `/si/home-care` and its `/ta` equivalent.

**Before you start:** read `docs/superpowers/i18n-feature-recipe.md` in full. Every step below is that document applied to this feature, and the traps it describes are invisible in English.

- [ ] **Step 1: Inventory** following recipe Step A. Report how many stranded component strings you found, and which files held them.

- [ ] **Step 2: Parity test first** following recipe Step B. Run `npm test` and confirm it fails with a `Cannot find module` error naming the first overlay you are about to write, before writing a single translation. For a feature with several data files, that is the first of them, not `content.si.ts`.

- [ ] **Step 3: Write both overlays** following recipe Step C, until `npm test` passes. Anything left in English goes in `KEEPS_ENGLISH` with a reason.

- [ ] **Step 4: Getter and threading** following recipe Steps D and E.

- [ ] **Step 5: Verify, and look** following recipe Step F. Run `npm test && npm run lint && npm run build`, restart the dev server, screenshot both locales at 360 and 1280, and report: any remaining English, any missing icon or image, any overflow, any bad wrap.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(i18n): translate home-care into Sinhala and Tamil"
```

---

### Task 7: pharmacy

**Files:**
- Modify: `src/features/pharmacy/data/content.ts` (to receive copy currently stranded in components)
- Create: `src/features/pharmacy/data/content.si.ts`, `src/features/pharmacy/data/content.ta.ts`
- Create: `src/features/pharmacy/data/content.i18n.test.ts`
- Create: `src/features/pharmacy/data/getContent.ts`
- Modify: `src/features/pharmacy/components/PharmacyPage.tsx` and the section components it renders
- Modify: `src/app/[locale]/pharmacy/page.tsx`

**Size:** 290 lines of English copy across 1 data file.

**Route to screenshot:** `/si/pharmacy` and its `/ta` equivalent.

**Before you start:** read `docs/superpowers/i18n-feature-recipe.md` in full. Every step below is that document applied to this feature, and the traps it describes are invisible in English.

- [ ] **Step 1: Inventory** following recipe Step A. Report how many stranded component strings you found, and which files held them.

- [ ] **Step 2: Parity test first** following recipe Step B. Run `npm test` and confirm it fails with a `Cannot find module` error naming the first overlay you are about to write, before writing a single translation. For a feature with several data files, that is the first of them, not `content.si.ts`.

- [ ] **Step 3: Write both overlays** following recipe Step C, until `npm test` passes. Anything left in English goes in `KEEPS_ENGLISH` with a reason.

- [ ] **Step 4: Getter and threading** following recipe Steps D and E.

- [ ] **Step 5: Verify, and look** following recipe Step F. Run `npm test && npm run lint && npm run build`, restart the dev server, screenshot both locales at 360 and 1280, and report: any remaining English, any missing icon or image, any overflow, any bad wrap.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(i18n): translate pharmacy into Sinhala and Tamil"
```

---

### Task 8: network

**Files:**
- Modify: `src/features/network/data/content.ts` (to receive copy currently stranded in components)
- Create: `src/features/network/data/content.si.ts`, `src/features/network/data/content.ta.ts`
- Create: `src/features/network/data/content.i18n.test.ts`
- Create: `src/features/network/data/getContent.ts`
- Modify: `src/features/network/components/NetworkPage.tsx` and the section components it renders
- Modify: `src/app/[locale]/network/page.tsx`

**Size:** 307 lines of English copy across 1 data file.

**Route to screenshot:** `/si/network` and its `/ta` equivalent.

**Specific to this feature:** This page names the group's other companies. **Company names are proper nouns and stay in English.**

**Before you start:** read `docs/superpowers/i18n-feature-recipe.md` in full. Every step below is that document applied to this feature, and the traps it describes are invisible in English.

- [ ] **Step 1: Inventory** following recipe Step A. Report how many stranded component strings you found, and which files held them.

- [ ] **Step 2: Parity test first** following recipe Step B. Run `npm test` and confirm it fails with a `Cannot find module` error naming the first overlay you are about to write, before writing a single translation. For a feature with several data files, that is the first of them, not `content.si.ts`.

- [ ] **Step 3: Write both overlays** following recipe Step C, until `npm test` passes. Anything left in English goes in `KEEPS_ENGLISH` with a reason.

- [ ] **Step 4: Getter and threading** following recipe Steps D and E.

- [ ] **Step 5: Verify, and look** following recipe Step F. Run `npm test && npm run lint && npm run build`, restart the dev server, screenshot both locales at 360 and 1280, and report: any remaining English, any missing icon or image, any overflow, any bad wrap.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(i18n): translate network into Sinhala and Tamil"
```

---

### Task 9: international-care

**Files:**
- Modify: `src/features/international-care/data/content.ts` (to receive copy currently stranded in components)
- Create: `src/features/international-care/data/content.si.ts`, `src/features/international-care/data/content.ta.ts`
- Create: `src/features/international-care/data/content.i18n.test.ts`
- Create: `src/features/international-care/data/getContent.ts`
- Modify: `src/features/international-care/components/InternationalCarePage.tsx` and the section components it renders
- Modify: `src/app/[locale]/international-care/page.tsx`

**Size:** 367 lines of English copy across 1 data file.

**Route to screenshot:** `/si/international-care` and its `/ta` equivalent.

**Specific to this feature:** Country names translate. Currency codes, visa terminology and airline names do not.

**Before you start:** read `docs/superpowers/i18n-feature-recipe.md` in full. Every step below is that document applied to this feature, and the traps it describes are invisible in English.

- [ ] **Step 1: Inventory** following recipe Step A. Report how many stranded component strings you found, and which files held them.

- [ ] **Step 2: Parity test first** following recipe Step B. Run `npm test` and confirm it fails with a `Cannot find module` error naming the first overlay you are about to write, before writing a single translation. For a feature with several data files, that is the first of them, not `content.si.ts`.

- [ ] **Step 3: Write both overlays** following recipe Step C, until `npm test` passes. Anything left in English goes in `KEEPS_ENGLISH` with a reason.

- [ ] **Step 4: Getter and threading** following recipe Steps D and E.

- [ ] **Step 5: Verify, and look** following recipe Step F. Run `npm test && npm run lint && npm run build`, restart the dev server, screenshot both locales at 360 and 1280, and report: any remaining English, any missing icon or image, any overflow, any bad wrap.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(i18n): translate international-care into Sinhala and Tamil"
```

---

### Task 10: school-wellness

**Files:**
- Modify: `src/features/school-wellness/data/content.ts` (to receive copy currently stranded in components)
- Create: `src/features/school-wellness/data/content.si.ts`, `src/features/school-wellness/data/content.ta.ts`
- Create: `src/features/school-wellness/data/content.i18n.test.ts`
- Create: `src/features/school-wellness/data/getContent.ts`
- Modify: `src/features/school-wellness/components/SchoolWellnessPage.tsx` and the section components it renders
- Modify: `src/app/[locale]/school-wellness/page.tsx`

**Size:** 391 lines of English copy across 1 data file.

**Route to screenshot:** `/si/school-wellness` and its `/ta` equivalent.

**Before you start:** read `docs/superpowers/i18n-feature-recipe.md` in full. Every step below is that document applied to this feature, and the traps it describes are invisible in English.

- [ ] **Step 1: Inventory** following recipe Step A. Report how many stranded component strings you found, and which files held them.

- [ ] **Step 2: Parity test first** following recipe Step B. Run `npm test` and confirm it fails with a `Cannot find module` error naming the first overlay you are about to write, before writing a single translation. For a feature with several data files, that is the first of them, not `content.si.ts`.

- [ ] **Step 3: Write both overlays** following recipe Step C, until `npm test` passes. Anything left in English goes in `KEEPS_ENGLISH` with a reason.

- [ ] **Step 4: Getter and threading** following recipe Steps D and E.

- [ ] **Step 5: Verify, and look** following recipe Step F. Run `npm test && npm run lint && npm run build`, restart the dev server, screenshot both locales at 360 and 1280, and report: any remaining English, any missing icon or image, any overflow, any bad wrap.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(i18n): translate school-wellness into Sinhala and Tamil"
```

---

### Task 11: facilities

**Files:**
- Modify: `src/features/facilities/data/content.ts` (to receive copy currently stranded in components)
- Create: `src/features/facilities/data/content.si.ts`, `src/features/facilities/data/content.ta.ts`
- Create: `src/features/facilities/data/content.i18n.test.ts`
- Create: `src/features/facilities/data/getContent.ts`
- Modify: `src/features/facilities/components/FacilitiesPage.tsx` and the section components it renders
- Modify: `src/app/[locale]/facilities/page.tsx`

**Size:** 393 lines of English copy across 1 data file.

**Route to screenshot:** `/si/facilities` and its `/ta` equivalent.

**Specific to this feature:** Equipment names such as X-ray, CT and MRI stay in English, which is how they are said in all three languages.

**Before you start:** read `docs/superpowers/i18n-feature-recipe.md` in full. Every step below is that document applied to this feature, and the traps it describes are invisible in English.

- [ ] **Step 1: Inventory** following recipe Step A. Report how many stranded component strings you found, and which files held them.

- [ ] **Step 2: Parity test first** following recipe Step B. Run `npm test` and confirm it fails with a `Cannot find module` error naming the first overlay you are about to write, before writing a single translation. For a feature with several data files, that is the first of them, not `content.si.ts`.

- [ ] **Step 3: Write both overlays** following recipe Step C, until `npm test` passes. Anything left in English goes in `KEEPS_ENGLISH` with a reason.

- [ ] **Step 4: Getter and threading** following recipe Steps D and E.

- [ ] **Step 5: Verify, and look** following recipe Step F. Run `npm test && npm run lint && npm run build`, restart the dev server, screenshot both locales at 360 and 1280, and report: any remaining English, any missing icon or image, any overflow, any bad wrap.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(i18n): translate facilities into Sinhala and Tamil"
```

---

### Task 12: media

**Files:**
- Modify: `src/features/media/data/content.ts` (to receive copy currently stranded in components)
- Create: `src/features/media/data/content.si.ts`, `src/features/media/data/content.ta.ts`
- Create: `src/features/media/data/content.i18n.test.ts`
- Create: `src/features/media/data/getContent.ts`
- Modify: `src/features/media/components/MediaPage.tsx` and the section components it renders
- Modify (copy as a prop, never an import): `NewsroomSection.tsx`, `RulesSection.tsx`
- Modify: `src/app/[locale]/media/page.tsx`

**Size:** 410 lines of English copy across 1 data file.

**Route to screenshot:** `/si/media` and its `/ta` equivalent.

**Specific to this feature:** Press release titles and publication names are quoted material: leave them exactly as they are and record them in `KEEPS_ENGLISH`. Translating a quotation misrepresents it.

**Before you start:** read `docs/superpowers/i18n-feature-recipe.md` in full. Every step below is that document applied to this feature, and the traps it describes are invisible in English.

- [ ] **Step 1: Inventory** following recipe Step A. Report how many stranded component strings you found, and which files held them.

- [ ] **Step 2: Parity test first** following recipe Step B. Run `npm test` and confirm it fails with a `Cannot find module` error naming the first overlay you are about to write, before writing a single translation. For a feature with several data files, that is the first of them, not `content.si.ts`.

- [ ] **Step 3: Write both overlays** following recipe Step C, until `npm test` passes. Anything left in English goes in `KEEPS_ENGLISH` with a reason.

- [ ] **Step 4: Getter and threading** following recipe Steps D and E.

- [ ] **Step 5: Verify, and look** following recipe Step F. Run `npm test && npm run lint && npm run build`, restart the dev server, screenshot both locales at 360 and 1280, and report: any remaining English, any missing icon or image, any overflow, any bad wrap.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(i18n): translate media into Sinhala and Tamil"
```

---

### Task 13: career

**Files:**
- Modify: `src/features/career/data/content.ts` (to receive copy currently stranded in components)
- Create: `src/features/career/data/content.si.ts`, `src/features/career/data/content.ta.ts`
- Create: `src/features/career/data/content.i18n.test.ts`
- Create: `src/features/career/data/getContent.ts`
- Modify: `src/features/career/components/CareersPage.tsx` and the section components it renders
- Modify (copy as a prop, never an import): `ApplicationForm.tsx`, `OpeningsSection.tsx`
- Modify: `src/app/[locale]/careers/page.tsx`

**Size:** 481 lines of English copy across 1 data file.

**Route to screenshot:** `/si/careers` and its `/ta` equivalent.

**Specific to this feature:** `ApplicationForm.tsx` carries its own Zod schema. Apply Task 2's locale-aware-schema pattern to it in this task, including the hidden locale field and the `hasLocale` guard. Job titles translate; professional qualifications such as MBBS and RN do not.

**Before you start:** read `docs/superpowers/i18n-feature-recipe.md` in full. Every step below is that document applied to this feature, and the traps it describes are invisible in English.

- [ ] **Step 1: Inventory** following recipe Step A. Report how many stranded component strings you found, and which files held them.

- [ ] **Step 2: Parity test first** following recipe Step B. Run `npm test` and confirm it fails with a `Cannot find module` error naming the first overlay you are about to write, before writing a single translation. For a feature with several data files, that is the first of them, not `content.si.ts`.

- [ ] **Step 3: Write both overlays** following recipe Step C, until `npm test` passes. Anything left in English goes in `KEEPS_ENGLISH` with a reason.

- [ ] **Step 4: Getter and threading** following recipe Steps D and E.

- [ ] **Step 5: Verify, and look** following recipe Step F. Run `npm test && npm run lint && npm run build`, restart the dev server, screenshot both locales at 360 and 1280, and report: any remaining English, any missing icon or image, any overflow, any bad wrap.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(i18n): translate career into Sinhala and Tamil"
```

---

### Task 14: home

**Files:**
- Modify: `src/features/home/data/careers.ts`, `src/features/home/data/facilities.ts`, `src/features/home/data/healthTips.ts`, `src/features/home/data/homeCare.ts`, `src/features/home/data/internationalCare.ts`, `src/features/home/data/media.ts`, `src/features/home/data/network.ts`, `src/features/home/data/testimonials.ts` (to receive copy currently stranded in components)
- Create: one `.si.ts` and one `.ta.ts` overlay beside each of the 8 data files
- Create: `src/features/home/data/content.i18n.test.ts`
- Create: `src/features/home/data/getContent.ts`
- Modify: `src/features/home/components/HomePage.tsx` and the section components it renders
- Modify (copy as a prop, never an import): `CountUp.tsx`, `HeroParallaxBackground.tsx`, `NetworkAccordion.tsx`, `PharmacySection.tsx`, `RoomsSection.tsx`, `SchoolWellnessSection.tsx`, `SurgicalSection.tsx`, `TestimonialsSection.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Size:** 284 lines of English copy across 8 data files.

**Route to screenshot:** `/si` and its `/ta` equivalent.

**Specific to this feature:** Eight data files and eight client components, the most plumbing of any feature. Expose ONE getter returning an object keyed by data file, so `HomePage` awaits once rather than eight times. Screenshot at 360, 768 and 1280: this is the most visited page on the site. Testimonials are quoted speech from named patients, so translate the quote, leave the name, and say so in the commit.

**Before you start:** read `docs/superpowers/i18n-feature-recipe.md` in full. Every step below is that document applied to this feature, and the traps it describes are invisible in English.

- [ ] **Step 1: Inventory** following recipe Step A. Report how many stranded component strings you found, and which files held them.

- [ ] **Step 2: Parity test first** following recipe Step B. Run `npm test` and confirm it fails with a `Cannot find module` error naming the first overlay you are about to write, before writing a single translation. For a feature with several data files, that is the first of them, not `content.si.ts`.

- [ ] **Step 3: Write both overlays** following recipe Step C, until `npm test` passes. Anything left in English goes in `KEEPS_ENGLISH` with a reason.

- [ ] **Step 4: Getter and threading** following recipe Steps D and E.

- [ ] **Step 5: Verify, and look** following recipe Step F. Run `npm test && npm run lint && npm run build`, restart the dev server, screenshot both locales at 360 and 1280, and report: any remaining English, any missing icon or image, any overflow, any bad wrap.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(i18n): translate home into Sinhala and Tamil"
```

---

### Task 15: services

**Files:**
- Modify: `src/features/services/data/atHome.ts`, `src/features/services/data/clinics.ts`, `src/features/services/data/diagnostics.ts`, `src/features/services/data/emergency.ts`, `src/features/services/data/groups.ts`, `src/features/services/data/indexContent.ts`, `src/features/services/data/services.ts`, `src/features/services/data/surgical.ts`, `src/features/services/data/womenChildren.ts` (to receive copy currently stranded in components)
- Create: one `.si.ts` and one `.ta.ts` overlay beside each of the 9 data files
- Create: `src/features/services/data/content.i18n.test.ts`
- Create: `src/features/services/data/getContent.ts`
- Modify: `src/features/services/components/ServicesIndexPage.tsx` and the section components it renders
- Modify (copy as a prop, never an import): `ServiceDirectory.tsx`
- Modify: `src/app/[locale]/services/page.tsx`

**Size:** 2821 lines of English copy across 9 data files.

**Route to screenshot:** `/si/services` and its `/ta` equivalent.

**Specific to this feature:** 2,821 lines, 40 percent of all remaining copy, and the only dynamic route. **`serviceSlugs` in `services.ts` are URLs and never translate**, and both `generateStaticParams` and `src/app/sitemap.ts` read them, so changing one breaks routing and the sitemap together. Also modify `src/features/services/components/ServiceDetailPage.tsx` and `src/app/[locale]/services/[slug]/page.tsx`, and screenshot one detail page such as `/si/services/cardiology` as well as the index. Split this task per data file if a single overlay grows past a few hundred lines: nobody can meaningfully review 2,800 lines of translation in one diff. Clinical procedure names stay in English where that is what a Sri Lankan doctor says.

**Before you start:** read `docs/superpowers/i18n-feature-recipe.md` in full. Every step below is that document applied to this feature, and the traps it describes are invisible in English.

- [ ] **Step 1: Inventory** following recipe Step A. Report how many stranded component strings you found, and which files held them.

- [ ] **Step 2: Parity test first** following recipe Step B. Run `npm test` and confirm it fails with a `Cannot find module` error naming the first overlay you are about to write, before writing a single translation. For a feature with several data files, that is the first of them, not `content.si.ts`.

- [ ] **Step 3: Write both overlays** following recipe Step C, until `npm test` passes. Anything left in English goes in `KEEPS_ENGLISH` with a reason.

- [ ] **Step 4: Getter and threading** following recipe Steps D and E.

- [ ] **Step 5: Verify, and look** following recipe Step F. Run `npm test && npm run lint && npm run build`, restart the dev server, screenshot both locales at 360 and 1280, and report: any remaining English, any missing icon or image, any overflow, any bad wrap.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(i18n): translate services into Sinhala and Tamil"
```

---

### Task 16: health-tips

**Files:**
- Modify: `src/features/health-tips/data/dengue.ts`, `src/features/health-tips/data/firstAid.ts`, `src/features/health-tips/data/library.ts`, `src/features/health-tips/data/myths.ts`, `src/features/health-tips/data/pageContent.ts`, `src/features/health-tips/data/screening.ts`, `src/features/health-tips/data/warnings.ts` (to receive copy currently stranded in components)
- Create: one `.si.ts` and one `.ta.ts` overlay beside each of the 7 data files
- Create: `src/features/health-tips/data/content.i18n.test.ts`
- Create: `src/features/health-tips/data/getContent.ts`
- Modify: `src/features/health-tips/components/HealthTipsPage.tsx` and the section components it renders
- Modify (copy as a prop, never an import): `DisclosureRow.tsx`, `LibrarySection.tsx`, `MythsSection.tsx`, `WarningSection.tsx`
- Modify: `src/app/[locale]/health-tips/page.tsx`

**Size:** 539 lines of English copy across 7 data files.

**Route to screenshot:** `/si/health-tips` and its `/ta` equivalent.

**Specific to this feature:** Symptoms, first aid, dengue guidance, screening intervals and myth corrections. Two rules here are not negotiable. **Do not paraphrase, soften or reorder a clinical instruction:** translate what is written, and if an English sentence looks wrong or ambiguous, flag it in your report rather than fixing it in translation. **Every number, dose, interval and age stays exactly as it is in the English:** put bare values in `isUntranslatable`, and check by eye wherever a number sits inside a sentence. This is the feature the review gate exists for.

**Before you start:** read `docs/superpowers/i18n-feature-recipe.md` in full. Every step below is that document applied to this feature, and the traps it describes are invisible in English.

- [ ] **Step 1: Inventory** following recipe Step A. Report how many stranded component strings you found, and which files held them.

- [ ] **Step 2: Parity test first** following recipe Step B. Run `npm test` and confirm it fails with a `Cannot find module` error naming the first overlay you are about to write, before writing a single translation. For a feature with several data files, that is the first of them, not `content.si.ts`.

- [ ] **Step 3: Write both overlays** following recipe Step C, until `npm test` passes. Anything left in English goes in `KEEPS_ENGLISH` with a reason.

- [ ] **Step 4: Getter and threading** following recipe Steps D and E.

- [ ] **Step 5: Verify, and look** following recipe Step F. Run `npm test && npm run lint && npm run build`, restart the dev server, screenshot both locales at 360 and 1280, and report: any remaining English, any missing icon or image, any overflow, any bad wrap.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(i18n): translate health-tips into Sinhala and Tamil"
```

---

### Task 17: QA sweep and the review gate

**Files:** only files the sweep proves need changing. No new features, no new overlays. If the sweep is clean, this task changes no code and its deliverable is the report.

- [ ] **Step 1: Confirm nothing is left in English**

For every route, in both locales, fetch the page and look for Latin-script sentences that are not on the deliberate list. Report what you find as a table of route, locale and string; do not fix silently.

- [ ] **Step 2: Sweep four widths in three locales**

Screenshot every route at 360, 768, 1280 and 1440 in `en`, `si` and `ta`, using the recipe's overflow detector. Report every overflow, every bad wrap, every clipped heading and every missing icon or image.

- [ ] **Step 3: Move the nav dictionary off the client**

Task 1 shipped `navigationLabels.ts` statically importing both the Sinhala and the Tamil dictionaries into three client components, so every visitor on every route downloads roughly 16KB of labels in two languages they are not reading. That was mandated by Task 1 own brief and accepted as a deviation at the time, because translating nav labels on the server needed a locale that the Page components did not yet carry.

By now they do: every one of the 17 routes threads a locale into its Page component. So translate the nav items and footer columns at the server boundary, pass the already-translated strings into `ThemedHeader`, `MobileNavPanel` and `ThemedFooter`, and delete `NavLabel.tsx` and the client-side dictionary import along with it. Keep `chromeCopyFor`: ten strings is the bounded exception the plan sanctioned.

Verify with a production build that neither `navigationLabels.si` nor `navigationLabels.ta` appears in any client chunk.

- [ ] **Step 4: Fix what the sweep found**

One commit per class of problem, not one per screenshot.

- [ ] **Step 5: Confirm the gate still refuses**

Run: `npm run i18n:status`
Expected: every overlay listed as DRAFT, and `-- --require-reviewed` exits 1. Roughly 30 overlay files by now.

- [ ] **Step 6: Hand over for review**

Report to the user: the count of overlays awaiting sign-off, the register decisions their reviewer should confirm, and every string deliberately left in English. **Do not flip any `__review` status yourself.** That is the reviewer's act, and the whole gate exists to make it one.

## Done when

- Every route renders fully in Sinhala and Tamil, with no English left except the recorded, deliberate list.
- `npm test` passes with none of the original 346 modified. Expect around 409: 346, plus 4 per feature for 14 features, plus 3 for the chrome dictionaries and 4 for the schema messages. Treat the exact figure as approximate and the direction as not: it must only ever climb.
- `npm run lint` at 0 errors, `npm run build` succeeding, every page still prerendered in all three locales.
- No text overflows its box at 360, 768, 1280 or 1440 in any locale.
- `npm run i18n:status -- --require-reviewed` exits 1, because nothing has been signed off yet, and that is correct.
