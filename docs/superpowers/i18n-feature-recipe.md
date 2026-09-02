# Translating a feature into Sinhala and Tamil

How this site's copy gets translated, and the traps that are invisible in English.

This outlives any one plan: it was written from what the `contact` feature
actually cost, and it is the reference for every feature translated after it.
Read it before touching a feature's copy.

**Reference implementation:** `contact`, commits `5c8c109`, `52f26cc`,
`94d2058`, `0feb6d7`.

## The register

Sentences are Sinhala or Tamil. Everyday English nouns stay in English, because that is what Sri Lankans actually say and read:

- keep in English: **Email, WhatsApp, Reception, Mobile, Form, Map, Doctor, OPD, Emergency, X-ray**, and **call / message / book** used as verbs
- polite plural throughout: `කරන්න`, `අழையுங்கள்`. Never the familiar imperative.
- **The hospital's name never changes script.** The logo says "ST. JOSEPH HOSPITAL . NEGOMBO" in English on every page, so `ශාන්ත ජෝසප් රෝහල` contradicts it. Same for "St. Joseph Street", which is the address a driver is shown.
- City names DO translate: `මීගමුව`, `நீர்கொழும்பு`.
- Example values in form placeholders get local names, not John and Doe.

Worked examples, from the committed contact overlays:

| English | Sinhala | Tamil |
|---|---|---|
| Call us | අපට call කරන්න | எங்களை call செய்யுங்கள் |
| Send a message | Message එකක් යවන්න | Message அனுப்புங்கள் |
| Book a doctor | වෛද්‍යවරයෙක් Book කරන්න | Doctor ஐ Book செய்யுங்கள் |
| Reception, 24 hours | Reception, පැය 24 | Reception, 24 மணி நேரம் |

## The five patterns the pilot established

Break any of these and the failure is silent in English and visible only in Sinhala and Tamil.

1. **Never key JSX off translatable copy.** `ICONS[row.label]` blanked four icons the moment the label was translated. Add a structural key (`icon: "location"`) and exclude it from parity.
2. **Client components take copy as a prop.** Never import content into a `'use client'` file.
3. **Interpolate with a token, not a split.** `"...call {phone}. The form is not..."`, split on `{phone}` in the component. Word order moves between languages.
4. **A string used twice has one home.** The contact accent band had its own copy of a hero sentence and stayed English while the hero translated.
5. **Deliberate English is recorded by path** in `KEEPS_ENGLISH`, so a forgotten translation still fails the suite.

## The per-feature recipe

**Read this before any of Tasks 3 to 16.** Every feature task is this recipe applied to a different feature, and each task lists only what is specific to it. The reference implementation is real committed code, not pseudocode: read these five files before your first feature.

```
src/features/contact/data/content.ts              English + facts + structure
src/features/contact/data/content.si.ts           Sinhala overlay
src/features/contact/data/content.i18n.test.ts    the parity gate
src/features/contact/data/getContent.ts           the getter
src/features/contact/components/ContactPage.tsx   where the locale enters
```

### Step A: inventory the feature's strings

Read every file in `src/features/<feature>/data/`. Then find the copy still stranded in components:

```bash
grep -rnoE '>[A-Z][a-z][^<>{}]{3,70}<|"[A-Z][a-z][^"]{3,70}"' src/features/<feature>/components/ \
  | grep -viE 'className|import|next/|@/|http|aria-|alt=|src=|href=|use client'
```

Anything that is user-visible copy moves into `content.ts` as a new export, the way `sectionEyebrows`, `hero` and `form` did for contact. Anything structural stays.

### Step A2: check whether a fact is sitting in a copy field

Three features have now shipped a contact row whose `label` held the phone number itself, with no separate `value`. The row then renders as bare digits with no action phrase, in every language INCLUDING English, and it forces the parity test to carry a one-off exception for a fact that is sitting in a field meant for copy.

`contact` and `accommodation` model it correctly: a translatable `label` such as "Call us", plus a `value` holding the fact. Fix the shape rather than special-casing the test.

```bash
grep -rnE 'label: "(0117|074|+94|[a-z.]+@)' src/features/<feature>/data/
```

As of this writing that grep still hits `network` and `school-wellness`. If it hits yours, fixing it improves the English page too, which is worth saying in the commit.

### Step B: write the parity test first, and watch it fail

Copy `src/features/contact/data/content.i18n.test.ts` and adapt: the imports, the `isUntranslatable` predicate for this feature's facts and structural keys, and the array-length assertions for this feature's arrays. Leave `KEEPS_ENGLISH` empty at first.

Run `npm test`. It must fail with `Cannot find module './content.si.ts'`. That is the gate proving it works before you rely on it.

### Step C: write the overlays

Create `content.si.ts` and `content.ta.ts`. Each starts with the review marker:

```ts
export const __review = { status: "draft", reviewer: null, date: null } as const;
```

Carry only translatable strings. Facts, hrefs, coordinates, counts and structural keys stay in `content.ts` and are absent here by design. Arrays must keep the base's length. Objects carry only the keys they translate.

Run `npm test` until parity passes. When it complains that a string is still English, either translate it or add its path to `KEEPS_ENGLISH` with a comment saying why.

### Step D: add the getter

Create `src/features/<feature>/data/getContent.ts`, which is this, with the names changed:

```ts
import { localize } from "@/lib/i18n/localize";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import * as base from "./content";

const overlays = {
  si: () => import("./content.si"),
  ta: () => import("./content.ta"),
};

export type ContactContent = typeof base;

export async function getContactContent(locale: Locale): Promise<ContactContent> {
  if (locale === DEFAULT_LOCALE) return base;
  return localize(base, await overlays[locale]());
}
```

For a feature whose copy spans several data files, import each and expose one getter per file, or one getter returning an object of them. Keep one getter file per feature.

### Step E: thread the locale

The feature's top-level Page component becomes `async`, takes `{ locale }`, awaits the getter once, and passes `content` down. Each child stops importing content and destructures from the prop instead, which leaves its JSX untouched:

```tsx
export function ReachSection({ content }: { content: ContactContent }) {
  const { contactRows, jumpCards, reachIntro, sectionEyebrows } = content;
```

Then the route hands the locale in:

```tsx
export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <ContactPage locale={locale as Locale} />;
}
```

Client components get their slice as a prop from their Server parent, never by import.

### Step E2: give every heading container room to shrink

Sinhala and Tamil form long unbreakable tokens where English would have a space. A Tamil heading that ends in an enclitic such as `-உம்` is one word to the browser, and a flex item does not shrink below its content width by default, so it pushes straight out of a 360px column. In English the same layout never overflows, so nothing warns you.

Each feature has its own `SectionHead` (there are seven, plus career's `SectionHeading`). Before you screenshot, check yours: if the heading group sits in a `flex` row without `min-w-0`, add it.

```tsx
<Reveal className="flex flex-wrap items-end justify-between gap-10">
  <div className="min-w-0">   {/* without this, a long Tamil token overflows */}
```

`min-w-0` is already the idiom for this elsewhere in the codebase (`Modal.tsx`, `BookSection.tsx`). Fix the layout rather than rephrasing the translation around it: rephrasing works, but it means every future translator has to rediscover the trap.

### Step E3: let grid tracks shrink too

The same trap as Step E2, one layer out. A track declared as a bare `fr` will not shrink below the intrinsic width of its content, so a long Sinhala or Tamil token pushes the whole column out. `minmax(0, 1fr)` fixes it, and is already the convention in `about` and parts of `accommodation`.

```
 grid-cols-[1.1fr_0.9fr]        <- a long token overflows this
 grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]   <- this shrinks
```

Before you screenshot, grep your feature for it:

```bash
grep -rnE "grid-cols-[[0-9.]+fr" src/features/<feature>/components/
```

This is not hypothetical: `home-care` had three such grids, and the pattern is still present in `career`, `health-tips`, `home` and `accommodation`. English never reveals it, because English breaks at spaces.

### Step F: verify, including with your eyes

```bash
npm test && npm run lint && npm run build
```

Then restart the dev server and screenshot. **The dev server does not reliably pick up changes on Windows: restart it, or you will screenshot stale output and believe it.** This affects component edits as well as data files, and it has already produced a false clean overflow measurement in this plan. If a measurement surprises you, restart and measure again before drawing a conclusion from it. If port 3000 is in use, do NOT kill the process using it; take the fallback port and stop only the server you started.

```js
// shot.tmp.mjs at the worktree root, deleted afterwards
import { chromium } from "playwright";
const b = await chromium.launch();
for (const [tag, url] of [["si", "/si/<route>"], ["ta", "/ta/<route>"]]) {
  for (const w of [360, 1280]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 2 });
    await p.goto("http://localhost:3001" + url, { waitUntil: "networkidle" });
    await p.waitForTimeout(600);
    await p.screenshot({ path: `shots/${tag}-${w}.png`, fullPage: true });
    const bad = await p.evaluate(() =>
      [...document.querySelectorAll("[data-sj] *")]
        .filter((el) => el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0)
        .filter((el) => !/overflow-hidden/.test(el.className || ""))
        .map((el) => el.tagName + " +" + (el.scrollWidth - el.clientWidth) + "px"));
    if (bad.length) console.log(tag, w, "OVERFLOW", bad);
    await p.close();
  }
}
await b.close();
```

**Look at the screenshots.** Report: any remaining English text, any missing icon or image, any text overflowing its box, and any line that wraps badly. The two worst bugs in the pilot were invisible to a green test suite.

### Step G: commit

One commit per feature. Say in the message what you deliberately left in English and why.
