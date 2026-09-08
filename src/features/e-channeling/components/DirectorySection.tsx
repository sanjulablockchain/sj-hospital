import { SectionHead } from "./SectionHead";
import { DoctorDirectory } from "./DoctorDirectory";
import type { Doctor } from "../data/doctors";
import type { EChannelingContent } from "../data/getContent";

/**
 * `#directory`: the whole reason this page exists. No `intro`: the search
 * box, speciality rail and result count immediately below are
 * self-explanatory, and the only sentence this page has that is true of the
 * whole directory rather than one consultant is already spent as `#top`'s
 * standfirst, directly above this section. Quoting it again here would print
 * the same sentence twice in a row.
 *
 * `doctors` arrives already localized (see EChannelingPage), so
 * DoctorDirectory's search and speciality filter operate on one language's
 * words throughout. `copy` is assembled here from `content.directory` plus
 * `content.helpRail`'s phone number, so DoctorDirectory (a Client Component)
 * never has to import content itself.
 */
export function DirectorySection({
  content,
  doctors,
}: {
  content: EChannelingContent;
  doctors: Doctor[];
}) {
  const { directory, directoryEyebrow, directoryHeading, helpRail } = content;

  return (
    <section
      id="directory"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <SectionHead eyebrow={directoryEyebrow} heading={directoryHeading} />

      <div className="mt-10.5">
        <DoctorDirectory
          doctors={doctors}
          copy={{
            introTemplate: directory.introTemplate,
            searchPlaceholder: directory.searchPlaceholder,
            searchAriaLabel: directory.searchAriaLabel,
            clearSearchAriaLabel: directory.clearSearchAriaLabel,
            allSpecialities: directory.allSpecialities,
            specialitiesLabel: directory.specialitiesLabel,
            clearFilters: directory.clearFilters,
            resultCountSingular: directory.resultCountSingular,
            resultCountPlural: directory.resultCountPlural,
            noResultsHeading: directory.noResultsHeading,
            noResultsBodyTemplate: directory.noResultsBodyTemplate,
            showAllDoctors: directory.showAllDoctors,
            bookAppointment: directory.bookAppointment,
            phone: helpRail.phone,
            phoneHref: helpRail.phoneHref,
          }}
        />
      </div>
    </section>
  );
}
