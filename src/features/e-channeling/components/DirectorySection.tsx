import { SectionHead } from "./SectionHead";
import { DoctorDirectory } from "./DoctorDirectory";
import { doctors } from "../data/doctors";

/**
 * `#directory`: the whole reason this page exists. No `intro`: the search
 * box, speciality rail and result count immediately below are
 * self-explanatory, and the only sentence this page has that is true of the
 * whole directory rather than one consultant is already spent as `#top`'s
 * standfirst, directly above this section. Quoting it again here would print
 * the same sentence twice in a row.
 */
export function DirectorySection() {
  return (
    <section
      id="directory"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <SectionHead eyebrow="01 / Find a consultant" heading="Search our consultants" />

      <div className="mt-10.5">
        <DoctorDirectory doctors={doctors} />
      </div>
    </section>
  );
}
