/**
 * The schools in the Wellness Center Program, from the hospital's own
 * programme tracker (statuses reported through 12 October 2026). Unlike
 * `content.ts`, this is verified content: the hospital supplied the list and
 * gave permission for every school to be named.
 *
 * Only the public milestones are published. The tracker's internal working
 * notes (painting in progress, consent forms distributed, visit and MOU
 * dates) stay off the site, and a school that has not yet signed its MOU is
 * shown as `joining` rather than announced as a partner.
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
export const schoolsAsOf = "2026-10-12";

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
    name: "St. Joseph College",
    status: "open",
    done: ["Parents' meeting held", "Grade 1 and 2 screening completed"],
  },
  {
    name: "Loyola College",
    status: "open",
    done: ["Dental programme completed", "Hygiene programme completed", "Grade 2 screening completed"],
  },
  {
    name: "St. Peter's College",
    status: "open",
    done: ["Grade 1 and 2 screening completed"],
  },
  { name: "Ave Maria College", status: "open", done: [], next: "Screening coming soon" },
  { name: "St. Nicholas Upper", status: "open", done: [] },
  { name: "St. Nicholas Primary", status: "open", done: [] },
  { name: "Maris Stella College, Thimbirigaskatuwa", status: "open", done: [] },
  { name: "Joseph Vaz College", status: "open", done: [] },
  { name: "Lasallian Community Services Centre", status: "open", done: [] },
  { name: "Adventist International School", status: "joining", done: [] },
  { name: "St. Thomas International School", status: "joining", done: [] },
];
