/**
 * The schools in the Wellness Center Program, from the hospital's own
 * programme tracker (the "Wellness Center Overall Progress Sheet" of 26
 * October 2026). Unlike `content.ts`, this is verified content: the hospital
 * supplied the list and gave permission for every school to be named.
 *
 * Only the public milestones are published. The tracker's internal working
 * notes (painting in progress, consent forms distributed, visit and MOU
 * dates, student numbers, rescheduling remarks) stay off the site, and a
 * school that has not yet signed its MOU is shown as `joining` rather than
 * announced as a partner. A school that has signed but whose center is not
 * yet set up stays `joining` too: `open` means the center exists.
 *
 * Two rows on the site are deliberately not in the 26 October sheet, on the
 * owner's ruling of that date: Lasallian Community Services Centre stays (the
 * sheet tracks schools; the centre is not one), and Maris Stella stays `open`
 * although its setup cell was blank, because its screening is done.
 *
 * `name` is a proper name and stays English in every locale. `status` is a
 * structural key the component switches on; the label it shows lives in
 * `schoolsCopy.status`. The headline numbers are counted from this list by
 * the component, so they can never disagree with it.
 *
 * To update: change a school's `status` or `done`, add a row, and move
 * `schoolsAsOf` to the date of the tracker you copied from. Mirror any new
 * `done` line in `schools.si.ts` and `schools.ta.ts`.
 */
import type { ProgrammeSchool } from "../types";

/** ISO date of the tracker this list reflects; rendered as "Updated …". */
export const schoolsAsOf = "2026-10-26";

export const schoolsCopy = {
  eyebrow: "The programme today",
  heading: { line1: "A Wellness Center", line2: "inside the school" },
  intro:
    "We set up a Wellness Center inside each partner school, then run screening and health programmes there through the school year.",
  stats: {
    total: "Schools in the programme",
    open: "Wellness Centers set up",
    joining: "Joining soon",
  },
  status: { open: "Center open", joining: "Joining soon" },
  updated: "Updated",
};

export const schools: ProgrammeSchool[] = [
  {
    name: "St. Joseph's College",
    status: "open",
    done: ["Wellness Center set up", "Parents' meeting held", "Grade 1, 2 and 3 screening completed"],
  },
  {
    name: "Loyola College",
    status: "open",
    done: [
      "Wellness Center set up",
      "First aid training for the Red Cross Society completed",
      "Hygiene programme completed",
      "Dental programme completed",
      "Grade 2 screening completed",
    ],
  },
  {
    name: "St. Peter's College",
    status: "open",
    done: ["Wellness Center set up", "Grade 1 and 2 screening completed"],
  },
  {
    name: "Ave Maria College",
    status: "open",
    done: ["Wellness Center set up", "Grade 1, 2 and 3 screening completed"],
  },
  {
    name: "St. Nicholas International College",
    status: "open",
    done: ["Wellness Center set up"],
    next: "Screening coming soon",
  },
  {
    name: "St. Nicholas International College, Primary",
    status: "open",
    done: ["Wellness Center set up", "Nutrition programme for nursery parents completed"],
    next: "Screening coming soon",
  },
  {
    name: "Maris Stella College, Thimbirigaskatuwa",
    status: "open",
    done: ["Wellness Center set up", "Grade 1, 2 and 3 screening completed"],
  },
  {
    name: "Joseph Vaz College",
    status: "open",
    done: ["Wellness Center set up"],
    next: "Screening coming soon",
  },
  { name: "Lasallian Community Services Centre", status: "open", done: ["Wellness Center set up"] },
  {
    name: "Adventist International School",
    status: "joining",
    done: [],
    next: "Partnership agreed, Wellness Center to follow",
  },
  {
    name: "St. Thomas International School",
    status: "joining",
    done: [],
    next: "Partnership agreed, Wellness Center to follow",
  },
];
