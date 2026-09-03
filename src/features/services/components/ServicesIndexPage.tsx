import { ServicesHero } from "./index/ServicesHero";
import { JumpCards } from "./index/JumpCards";
import { CentresSection } from "./index/CentresSection";
import { ServiceDirectory } from "./index/ServiceDirectory";
import { SurgicalSection } from "./index/SurgicalSection";
import { DiagnosticsSection } from "./index/DiagnosticsSection";
import { PackagesSection } from "./index/PackagesSection";
import { AdmissionsSection } from "./index/AdmissionsSection";
import { FacilitiesSection } from "./index/FacilitiesSection";
import { PharmacySection } from "./index/PharmacySection";
import { InternationalSection } from "./index/InternationalSection";
import { BookSection } from "./index/BookSection";
import { groupCounts } from "@/features/services/data/services";
import { getServicesContent } from "@/features/services/data/getContent";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { servicesFooterColumns } from "@/config/servicesNavigation";
import type { Locale } from "@/lib/i18n/locales";

/**
 * The full 13-section services index, in the spec's order: hero, jump,
 * centres, directory, surgical, diagnostics, packages, admissions,
 * facilities, pharmacy, international, book, footer.
 *
 * The copy is fetched once here and handed down as `content` to every
 * section, rather than each section importing an English data file
 * directly, the same shape `MediaPage` uses. `ServiceDirectory` is the only
 * Client Component on this page; it takes its slice of `content` as a
 * `copy` prop rather than importing a data file itself.
 *
 * `groupCounts()` stays a direct, unlocalized import: the counts are plain
 * numbers (36 services, 2 emergency, etc.) that never change with locale,
 * only their labels do, and those labels live in `content.groups.groupLabels`.
 */
export async function ServicesIndexPage({ locale }: { locale: Locale }) {
  const content = await getServicesContent(locale);
  const counts = groupCounts();

  return (
    <>
      <main>
        <ServicesHero content={content} />
        <JumpCards content={content} />
        <CentresSection content={content} />
        <ServiceDirectory services={content.services} counts={counts} groupLabels={content.groups.groupLabels} copy={content.indexContent.directory} />
        <SurgicalSection content={content} />
        <DiagnosticsSection content={content} />
        <PackagesSection content={content} />
        <AdmissionsSection content={content} />
        <FacilitiesSection content={content} />
        <PharmacySection content={content} />
        <InternationalSection content={content} />
        <BookSection content={content} />
      </main>
      <ThemedFooter columns={servicesFooterColumns} id="contact" />
    </>
  );
}
