import { ServicesHero } from "./index/ServicesHero";
import { JumpCards } from "./index/JumpCards";
import { CentresSection } from "./index/CentresSection";
import { ServiceDirectory } from "./index/ServiceDirectory";
import { SurgicalSection } from "./index/SurgicalSection";
import { DiagnosticsSection } from "./index/DiagnosticsSection";
import { PackagesSection } from "./index/PackagesSection";
import { AdmissionsSection } from "./index/AdmissionsSection";
import { services, groupCounts } from "@/features/services/data/services";

// Tasks 13-15 append their sections here, in the spec's order: directory,
// surgical, diagnostics, packages, admissions, facilities, pharmacy,
// international, book, footer.
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
    </>
  );
}
