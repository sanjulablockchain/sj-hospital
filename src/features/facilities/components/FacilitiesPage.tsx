import { FacilitiesHero } from "./FacilitiesHero";
import { JumpCards } from "./JumpCards";
import { BuildingSection } from "./BuildingSection";
import { ShowcaseSection } from "./ShowcaseSection";
import { TheatresSection } from "./TheatresSection";
import { CriticalCareSection } from "./CriticalCareSection";
import { RoomsSection } from "./RoomsSection";
import { DiagnosticSection } from "./DiagnosticSection";
import { AmbulanceSection } from "./AmbulanceSection";
import { SupportSection } from "./SupportSection";
import { HygieneSection } from "./HygieneSection";
import { VisitorsSection } from "./VisitorsSection";
import { BookSection } from "./BookSection";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { facilitiesFooterColumns } from "@/config/facilitiesNavigation";

/**
 * The facilities page, in the reference's order: hero, jump, the building,
 * showcase, theatres, critical care, rooms, diagnostics, ambulance, support,
 * hygiene, visitors, book, footer.
 */
export function FacilitiesPage() {
  return (
    <>
      <main>
        <FacilitiesHero />
        <JumpCards />
        <BuildingSection />
        <ShowcaseSection />
        <TheatresSection />
        <CriticalCareSection />
        <RoomsSection />
        <DiagnosticSection />
        <AmbulanceSection />
        <SupportSection />
        <HygieneSection />
        <VisitorsSection />
        <BookSection />
      </main>
      <ThemedFooter columns={facilitiesFooterColumns} id="contact" />
    </>
  );
}
