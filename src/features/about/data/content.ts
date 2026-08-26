// Every string of substance below is a copy-paste out of the four components
// this page replaces: Intro.tsx, WhyDifferent.tsx, MissionVision.tsx and
// ParentGroup.tsx. `content.test.ts` pins a phrase from each source paragraph,
// so a reword, a merge or a dropped sentence fails the suite.
//
// The only new strings on this page are `tickerItems`, `heroFacts`' labels and
// `jumpCards`' notes: each restates a claim already present in the copy below,
// so none of them is a new hospital fact.

export const tickerItems = [
  "US standard care",
  "Managed from Los Angeles",
  "Corporate insurance at OPD",
  "Digital X-ray",
  "Modern laboratory",
  "Digital file access",
  "Open 24/7",
] as const;

export const heroFacts = [
  { k: "Refurbishment", v: "USD 1 million" },
  { k: "Managed from", v: "Los Angeles" },
  { k: "First in Negombo", v: "OPD insurance" },
  { k: "Reception", v: "Open 24/7" },
];

export const jumpCards = [
  { count: "01", label: "Who we are", note: "US standard care, brought to Negombo.", href: "#story" },
  { count: "02", label: "What makes us different", note: "Six things we hold ourselves to.", href: "#different" },
  { count: "03", label: "Mission and vision", note: "What we are aiming at.", href: "#mission" },
  { count: "04", label: "Our parent group", note: "Kids & Teens Medical Group, USA.", href: "#group" },
];

// The 4 strings in Intro.tsx's `paragraphs`, verbatim and in order.
export const storyParagraphs: string[] = [
  "St. Joseph Hospital in Negombo delivers US standard, high-quality healthcare to Sri Lankans at affordable prices. Our hospital was recently refurbished with a USD 1 million investment led by Kids & Teens Pediatric Medical Group (Los Angeles) and Asia Corp.",
  "We are the first hospital in Negombo to offer corporate insurance acceptance at our OPD, ensuring convenience and accessibility to healthcare for the local community.",
  "Our modern and advanced laboratory is known to be one of the best in Sri Lanka. It has the latest high-quality equipment. The digital X-ray machine at the hospital is one of the latest in the industry to give you accurate information for the right diagnosis.",
  "We also provide digital file access for our patients' convenience. Visit us today to experience international standard healthcare here in Sri Lanka.",
];

// WhyDifferent.tsx's `reasons`, verbatim and in order.
export const reasons: { title: string; description: string }[] = [
  {
    title: "Managed and Operated by USA",
    description: "International standards with American healthcare management expertise.",
  },
  {
    title: "Affordable US Healthcare Standards",
    description: "High-quality healthcare at accessible prices for Sri Lankan families.",
  },
  {
    title: "Advanced Technology",
    description: "State-of-the-art equipment including digital X-ray and modern laboratory.",
  },
  {
    title: "Commitment to Safety and Hygiene",
    description: "Maintaining the highest standards of cleanliness and patient safety.",
  },
  {
    title: "Convenient Location and Comprehensive Services",
    description: "Easily accessible location in Negombo with full-service healthcare.",
  },
  {
    title: "Evidence Based Billing",
    description: "Transparent and accurate billing practices with digital file access.",
  },
];

// MissionVision.tsx's mission <p>, verbatim.
export const mission = {
  title: "Our mission",
  body: "Our aim is to provide our community with complete healthcare solutions that combine advanced technology with patient-centered care, empowering them to take charge of their health.",
};

// MissionVision.tsx's vision <p>, verbatim.
export const vision = {
  title: "Our vision",
  body: "We aim to make the highest quality healthcare available to everyone in Sri Lanka through collective efforts.",
};

export const groupHeading = "About Kids & Teens Medical Group";

// ParentGroup.tsx's two <p> blocks, in order. The JSX source spells these with
// &amp; and &apos; entities and hard line breaks (the paragraph wraps across
// several source lines); here they are the literal & and ' characters and the
// breaks collapse to single spaces, matching how the browser renders the JSX.
export const groupBody: string[] = [
  "Kids & Teens Medical Group, a leading pediatric care provider in Southern California, is dedicated to delivering compassionate and comprehensive healthcare services for children and adolescents. With a team of over 50 board-certified pediatricians, they offer a wide range of services, including primary care, urgent care, telehealth consultations, and after-hours care, ensuring that young patients receive timely and personalized medical attention.",
  "This strategic expansion reflects Kids & Teens Medical Group's commitment to extending their expertise beyond the United States, bringing their patient-centric approach and high-quality pediatric care to families in Sri Lanka. The revitalized St. Joseph Hospital is set to become a cornerstone of pediatric healthcare in Negombo, offering state-of-the-art medical services and facilities for children and adolescents.",
];

// ParentGroup.tsx's `partnerLogos`, all 5 paths, verbatim.
export const partnerLogos: string[] = [
  "/images/partners/partner-1.png",
  "/images/partners/partner-2.png",
  "/images/partners/partner-3.png",
  "/images/partners/partner-4.png",
  "/images/partners/partner-5.png",
];
