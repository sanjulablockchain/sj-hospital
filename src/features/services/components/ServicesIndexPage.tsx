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
import { services, groupCounts } from "@/features/services/data/services";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { servicesFooterColumns } from "@/config/servicesNavigation";

// The full 13-section services index, in the spec's order: hero, jump,
// centres, directory, surgical, diagnostics, packages, admissions,
// facilities, pharmacy, international, book, footer.
export function ServicesIndexPage() {
  return (
    <>
      <ServicesHero />
      <JumpCards />
      <CentresSection />
      <ServiceDirectory services={services} counts={groupCounts()} />
      <SurgicalSection />
      <DiagnosticsSection />
      <PackagesSection />
      <AdmissionsSection />
      <FacilitiesSection />
      <PharmacySection />
      <InternationalSection />
      <BookSection />
      <ThemedFooter columns={servicesFooterColumns} id="contact" />
    </>
  );
}
