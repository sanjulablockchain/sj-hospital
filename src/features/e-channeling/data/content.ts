/**
 * Copy for the /e-channeling page.
 *
 * `heroFacts`' Consultants and Specialities counts, and `tickerItems`, are all
 * derived from `doctors` below rather than typed in: the hero states these
 * counts and the directory computes them from the same array, so a hand-typed
 * figure could silently disagree with what the directory actually shows or
 * advertise a speciality the directory cannot filter to. content.test.ts pins
 * this.
 *
 * `helpRail`'s heading and body are lifted verbatim from the gradient rail
 * that used to sit inside DoctorDirectory.tsx. `heroStandfirst` is the old
 * index.tsx page banner's own subtitle, verbatim. None of this is a new
 * hospital fact.
 */
import { doctors } from "./doctors.ts";

const specialityCount = new Set(doctors.map((d) => d.specialization)).size;

export const heroFacts = [
  { k: "Consultants", v: String(doctors.length) },
  { k: "Specialities", v: String(specialityCount) },
  { k: "Booking", v: "Online, 24/7" },
  { k: "Channelling desk", v: "0117 84 84 84" },
];

// Derived, not typed: the ticker lists what you can actually book, so it must
// not be able to advertise a speciality the directory cannot filter to. Sorted
// by headcount so the ticker opens with the specialities most people want.
export const tickerItems: readonly string[] = Object.entries(
  doctors.reduce<Record<string, number>>((counts, d) => {
    counts[d.specialization] = (counts[d.specialization] ?? 0) + 1;
    return counts;
  }, {})
)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([speciality]) => speciality);

// The old index.tsx page banner's own subtitle, verbatim.
export const heroStandfirst =
  "Consult our in-house doctors at St. Joseph Hospital in Negombo. We have a 24/7 online doctor channeling system to help you book online.";

// Lifted verbatim from the gradient rail that used to sit at the bottom of
// DoctorDirectory.tsx.
export const helpRail = {
  heading: "Not sure who to see?",
  body: "Our channelling desk will match you to the right consultant, any hour of the day.",
  phone: "0117 84 84 84",
  phoneHref: "tel:+94117848484",
  email: "info@sjhospital.lk",
};
