import type { Article, Category, FeaturedArticle } from "../types";

/**
 * Filter chips, in the order they appear. "All" leads, so it is part of this
 * list rather than a special case in the component; `TIP_CATEGORIES` below is
 * the same list without it, which is what an article can actually be tagged
 * with.
 */
export const CATEGORIES = [
  "All",
  "Dengue & fever",
  "Diabetes",
  "Heart & pressure",
  "Children",
  "Women",
  "Kidney",
  "Living well",
] as const;

export const TIP_CATEGORIES = CATEGORIES.slice(1) as readonly Exclude<Category, "All">[];

/**
 * The library. Bylines name the team rather than an individual, so a
 * consultant leaving does not silently make the page wrong.
 *
 * These are summaries, not links: there are no article pages behind them yet,
 * so `LibrarySection` renders them as plain cards. The day articles get their
 * own routes, add a `slug` here and the cards become links.
 */
export const articles: Article[] = [
  {
    tag: "Dengue & fever",
    title: "Fever on day four is the day that matters",
    by: "Emergency team",
    lede: "Dengue often feels better around day four, just as the platelet count is falling. That is the day to be checked, not the day to relax.",
  },
  {
    tag: "Dengue & fever",
    title: "Twenty minutes a week against dengue",
    by: "Community health",
    lede: "A walk around your own compound, tipping and scrubbing anything that holds water, beats any spray or coil.",
  },
  {
    tag: "Dengue & fever",
    title: "Paracetamol yes, ibuprofen no",
    by: "Physicians",
    lede: "In a suspected dengue fever, anti-inflammatory painkillers raise bleeding risk. Stick to paracetamol and fluids.",
  },
  {
    tag: "Diabetes",
    title: "The rice portion conversation nobody enjoys",
    by: "Dietitian",
    lede: "You do not have to give up rice. You do have to change how much, what goes with it, and what order you eat it in.",
  },
  {
    tag: "Diabetes",
    title: "Check your feet every night",
    by: "Wound clinic",
    lede: "Diabetic nerve damage means an ulcer can start without pain. A sixty second look under a light prevents amputations.",
  },
  {
    tag: "Diabetes",
    title: "HbA1c: the number that cannot be talked around",
    by: "Physicians",
    lede: "A fasting sugar shows this morning. HbA1c shows the last three months, including the days you would rather forget.",
  },
  {
    tag: "Heart & pressure",
    title: "High blood pressure has no symptoms. That is the problem",
    by: "Physicians",
    lede: "Most people feel completely well at 160/100. By the time it causes symptoms, it has usually caused damage.",
  },
  {
    tag: "Heart & pressure",
    title: "Salt hides in the things you would not suspect",
    by: "Dietitian",
    lede: "Dried fish, papadam, packet soup, biscuits and bread carry more salt than the pinch you add at the table.",
  },
  {
    tag: "Heart & pressure",
    title: "Chest pain: what makes it an emergency",
    by: "Emergency team",
    lede: "Pressure rather than a sharp catch, spreading to jaw or arm, with sweating or breathlessness. Do not drive yourself.",
  },
  {
    tag: "Children",
    title: "Fever in a child: when to wait, when to come in",
    by: "Paediatrics",
    lede: "Under three months, any fever is a hospital visit. Above that, it is how the child behaves that matters, not the number.",
  },
  {
    tag: "Children",
    title: "Dehydration in a child, spotted early",
    by: "Paediatrics",
    lede: "Fewer wet nappies, no tears when crying, a dry mouth and unusual sleepiness. Oral rehydration beats plain water.",
  },
  {
    tag: "Children",
    title: "Reading a growth chart without panicking",
    by: "Paediatrics",
    lede: "A child on the third centile who is following their own line is usually fine. A child crossing lines downward is not.",
  },
  {
    tag: "Children",
    title: "Keeping the vaccination card safe",
    by: "Vaccination clinic",
    lede: "A missed dose is easy to catch up, but only if you know which one. Photograph the card and keep it in your phone.",
  },
  {
    tag: "Women",
    title: "Iron deficiency is not just being tired",
    by: "Physicians",
    lede: "Heavy periods, pregnancy and a rice heavy diet make anaemia common here. A full blood count settles it in a day.",
  },
  {
    tag: "Women",
    title: "Breast self examination, done properly",
    by: "Women's health",
    lede: "Once a month, a week after your period, same time each cycle. You are learning what normal feels like for you.",
  },
  {
    tag: "Women",
    title: "Folic acid before pregnancy, not after",
    by: "Obstetrics",
    lede: "The neural tube closes in the first month, often before you know you are pregnant. That is why it starts beforehand.",
  },
  {
    tag: "Kidney",
    title: "Painkillers and your kidneys",
    by: "Physicians",
    lede: "Regular anti-inflammatory tablets for aches quietly damage kidneys, especially with diabetes or high blood pressure.",
  },
  {
    tag: "Kidney",
    title: "Drink before you are thirsty, especially outdoors",
    by: "Physicians",
    lede: "Repeated dehydration in field and outdoor work is linked to chronic kidney disease. Thirst arrives late.",
  },
  {
    tag: "Kidney",
    title: "Protein in your urine is the earliest warning",
    by: "Nephrology",
    lede: "Kidneys lose function for years without symptoms, and a simple urine test finds it long before swelling or tiredness do. With diabetes or high blood pressure, ask for it yearly.",
  },
  {
    tag: "Living well",
    title: "Finish the antibiotic course, even when you feel better",
    by: "Pharmacy",
    lede: "Stopping early leaves the toughest bacteria alive. That is how a simple infection becomes a resistant one.",
  },
  {
    tag: "Living well",
    title: "Thirty minutes of walking is not a compromise",
    by: "Physiotherapy",
    lede: "For blood pressure, sugar and mood, a brisk daily walk does most of what an expensive gym membership would.",
  },
  {
    tag: "Living well",
    title: "Sleep is not a luxury for the young",
    by: "Physicians",
    lede: "Under six hours a night pushes blood pressure, appetite and blood sugar the wrong way, quietly and steadily.",
  },
  {
    tag: "Living well",
    title: "Sitting is the new smoking, and offices are the worst",
    by: "Physiotherapy",
    lede: "Standing and moving for two minutes every half hour undoes a surprising amount of what a desk day does to you.",
  },
  {
    tag: "Living well",
    title: "Betel and areca nut: the habit worth stopping first",
    by: "ENT surgery",
    lede: "Chewing is the leading cause of mouth cancer in Sri Lankan men, and it does harm with no tobacco added. Any ulcer or white patch that has not healed in three weeks needs looking at.",
  },
];

/**
 * Chip counts, derived so a new article never leaves a stale number on screen.
 */
export function categoryCounts(): Record<Category, number> {
  const counts = { All: articles.length } as Record<Category, number>;
  for (const category of TIP_CATEGORIES) {
    counts[category] = articles.filter((a) => a.tag === category).length;
  }
  return counts;
}

/**
 * The card at the top of the library. Framed as "Start here" rather than the
 * reference's "Most read": nothing on this site measures readership, so that
 * was a number we could not stand behind.
 */
export const featured: FeaturedArticle = {
  tag: "Dengue & fever",
  title: "Fever on day four is the day that matters",
  lede: "Dengue has a cruel pattern. Around day four the fever often breaks and people feel better, which is precisely when plasma starts leaking and the platelet count falls. Every severe case we admit involves someone who relaxed on the day they should have come in.",
  by: "Emergency team",
  read: "4 minute read",
  points: [
    "Get a full blood count on day three of any fever in dengue season",
    "Paracetamol only, never ibuprofen or aspirin",
    "Feeling better on day four is not proof of recovery",
    "Bleeding gums, black stools or severe abdominal pain means come now",
  ],
};

/** Editorial framing for the featured card, kept out of the component. */
export const featuredKicker = "Start here";
