/**
 * Copy for the /service-book page: the hospital's printed Service Book,
 * read page by page in `BookViewer`.
 *
 * The book's facts (41 pages, 323 tests, 74 consultants) are as printed in
 * the 2026 edition, which is the thing this page shows; the live price list
 * and doctor directory own the current figures, and `editionNote` says so.
 *
 * Register (docs/superpowers/i18n-register-rule.md): the hero, the eyebrows,
 * the headings, every link and button label and the viewer's controls stay
 * English in every locale. `editionNote`, `insideIntro` and each chapter's
 * `summary` are prose and translate in content.si.ts and content.ta.ts.
 */
import type { ChapterId } from "../types.ts";

export const hero = {
  strapline: "St. Joseph Hospital, 2026 edition",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Service book",
  headingLead: "Service",
  headingAccent: "Book",
  readCta: "Start reading",
  downloadCta: "Download PDF",
  /** What the book covers, as printed in the 2026 edition. */
  ticker: [
    "Free OPD, 7.00 AM to 6.00 PM",
    "Emergency care, 24 hours",
    "Laboratory open 24/7",
    "323 tests with prices",
    "74 consultants",
    "Pharmacy open 24/7",
    "Home visits",
  ],
};

export const heroStandfirst =
  "Everything in one book: our services, room prices, the 2026 laboratory price list, our doctors and how to book. Read it here page by page, or download a copy to keep.";

/** The first cell renders in accent. */
export const heroFacts = [
  { k: "Pages", v: "41" },
  { k: "Laboratory tests", v: "323" },
  { k: "Consultants", v: "74" },
  { k: "Edition", v: "2026" },
];

/** `size` is the file's real size; content.test.ts checks it against the file. */
export const download = {
  href: "/downloads/sj-service-book-2026.pdf",
  size: "5.9 MB",
};

/**
 * The viewer's controls and its screen reader announcements: chrome, like
 * the filter row on the laboratory page, so English in every locale.
 * `{page}` and `{count}` are filled by the viewer.
 */
export const viewer = {
  regionLabel: "Service Book reader",
  chaptersLabel: "Chapters",
  thumbnailsLabel: "All pages",
  previous: "Previous page",
  next: "Next page",
  fullScreen: "Full screen",
  close: "Close full screen",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  pageOf: "Page {page} of {count}",
  goToPage: "Go to page {page}",
};

export const sectionEyebrows = {
  read: "01 / Read the book",
  inside: "02 / What's inside",
};

export const readHeading = "Page by page";

export const editionNote =
  "This is the 2026 edition. Prices and the doctor list can change during the year, so the Laboratory Tests page and the Doctor directory always carry the current details. Please confirm a price when you book.";

export const editionLinks = [
  { linkLabel: "Current lab prices", href: "/laboratory-tests" },
  { linkLabel: "Doctor directory", href: "/e-channeling#directory" },
];

export const insideHeading = "What's inside";

export const insideIntro =
  "After the welcome pages the book has five chapters. Each is summarised below, with a link that opens it in the book and a link to the page on this site that covers the same ground.";

export const openInBookCta = "Open in the book";

/** One entry per chapter, in `chapters.ts` order (content.test.ts pins it). */
export const chapterGuide: { id: ChapterId; summary: string; linkLabel: string; href: string }[] = [
  {
    id: "welcome",
    summary:
      "A welcome from St. Joseph Hospital and a message from the Chairman, Mr. Sunil De Silva, followed by the contents.",
    linkLabel: "About us",
    href: "/about-us",
  },
  {
    id: "about",
    summary:
      "Who we are: a hospital in Negombo managed by the USA based Kids and Teens Medical Group, run to American hospital standards, with 74 consultants from Sunday to Saturday. Also how to reach us and where to park.",
    linkLabel: "Contact and directions",
    href: "/contact-us",
  },
  {
    id: "services",
    summary:
      "The nine services in brief: free OPD, 24 hour emergency care, super channelling, exercise ECG, digital X-ray, the 24/7 laboratory, home visits, the 24/7 pharmacy with delivery, and room prices for inpatient stays.",
    linkLabel: "All services",
    href: "/services",
  },
  {
    id: "lab",
    summary:
      "The 2026 laboratory price list: 323 tests in sections from blood count to histology, each with the sample we need, the usual report time and the price in LKR.",
    linkLabel: "Current lab prices",
    href: "/laboratory-tests",
  },
  {
    id: "doctors",
    summary:
      "How to book a specialist, then the full list of 74 consultants and 13 allied health professionals by speciality.",
    linkLabel: "Doctor directory",
    href: "/e-channeling#directory",
  },
  {
    id: "guide",
    summary:
      "How to book a doctor step by step, what to remember on the day, our opening hours and how to find us.",
    linkLabel: "Book a doctor",
    href: "/e-channeling",
  },
];
