import type { FactTile, JumpCard } from "../types";
import { articles } from "./library.ts";
import { warnings } from "./warnings.ts";
import { firstAidSteps } from "./firstAid.ts";

/**
 * The strip under the hero. The reference's third tile read "Right now /
 * Monsoon: dengue season", which is only true for part of the year on a page
 * that is served every day; it is stated as a standing risk instead, and
 * `pageContent.test.ts` fails if a month or season creeps back in.
 */
export const factStrip: FactTile[] = [
  { label: "Written by", value: "Our own clinicians" },
  { label: "Reviewed", value: "By our clinical team" },
  { label: "Dengue", value: "A year round risk here", accent: true },
  { label: "Not a substitute", value: "For seeing a doctor" },
];

/** The marquee under the fact strip: five habits, scrolling on a loop. */
export const tickerLines = [
  "Empty standing water weekly",
  "Check your blood pressure yearly",
  "Finish the antibiotic course",
  "Drink water before you feel thirsty",
  "Fever in a baby is never routine",
];

/**
 * Counts are read from the data they point at, so a new article or warning
 * row can never leave a stale number on the card. The count itself is kept
 * apart from the translatable word beside it (`countTemplate`, a `{n}`
 * token): Sinhala and Tamil put the counted word in a different place than
 * English does, so the component substitutes rather than concatenating
 * translated strings (Pattern 3). The "By age" card carries no count at all.
 */
export const jumpCards: JumpCard[] = [
  {
    countTemplate: "{n} articles",
    count: articles.length,
    label: "The library",
    note: "Sorted by the conditions we see most.",
    href: "#library",
  },
  {
    countTemplate: "{n} signs",
    count: warnings.length,
    label: "When to come in",
    note: "Tonight, today, this week, or routinely.",
    href: "#warning",
  },
  {
    countTemplate: "By age",
    label: "Screening",
    note: "The checks our physicians actually order.",
    href: "#screening",
  },
  {
    countTemplate: "{n} basics",
    count: firstAidSteps.length,
    label: "First aid at home",
    note: "What to do, and what never to do.",
    href: "#firstaid",
  },
];

export const disclaimer =
  "General information only, written for a Sri Lankan reader and reviewed by our clinical team. It cannot account for your history, medicines or examination findings, and it is not a diagnosis. Always speak to a doctor about your own situation.";

/**
 * `#top`'s own copy, moved here out of `TipsHero.tsx`. `heading` mirrors the
 * component's own two-weight treatment (a plain line, then an outlined word
 * and an accented word on the same visual line), so each piece is its own
 * field rather than a literal split of one English sentence.
 * `breadcrumbHome` goes through `LocaleLink` in the component rather than a
 * plain `next/link`, so a reader on `/si/health-tips` or `/ta/health-tips`
 * who taps it stays in the language they are already reading, matching
 * `contact`'s, `career`'s and `e-channeling`'s own hero breadcrumbs.
 */
export const hero = {
  verticalLabel: "Written by our doctors",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Health Tips",
  headingLine1: "Small habits,",
  headingOutline: "big",
  headingAccent: "difference.",
  body: "Practical advice written by the doctors who see you in clinic, for the conditions that actually turn up in Negombo. No miracle cures, no scare stories.",
  ctaLibrary: "Read the library",
  ctaWarning: "When to come in tonight",
};

/**
 * `#book`'s own copy, moved here out of `BookSection.tsx`. The third action
 * used to carry the hospital's own number as its whole `label`, with no
 * separate action phrase, so it rendered as bare digits with no translatable
 * text at all, in every language including English: the same fact-sitting-
 * in-a-copy-field bug `contact`'s, `accommodation`'s and `facilities`' own
 * contact rows had. `label` is now the action phrase ("Call us") and `value`
 * the fact, matching `facilities/data/content.ts`'s own `contactRows` shape;
 * only the first action is internal, so it alone goes through `LocaleLink`.
 */
export const bookSection = {
  eyebrow: "06 / Still unsure",
  heading: { line1: "Reading is", line2: "not the same", line3: "as asking." },
  body: "Nothing on this page replaces a doctor who can examine you. If something has been worrying you for a fortnight, book the consultation.",
  actions: [
    { label: "Book a consultation", href: "/services", internal: true, glyph: "arrow" as const },
    {
      label: "Ask on WhatsApp",
      href: "https://wa.me/94742223334",
      internal: false,
      glyph: "arrow" as const,
    },
    {
      label: "Call us",
      value: "0117 84 84 84",
      href: "tel:+94117848484",
      internal: false,
      glyph: "phone" as const,
    },
  ],
};
