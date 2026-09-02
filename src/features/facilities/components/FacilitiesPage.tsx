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
import type { Locale } from "@/lib/i18n/locales";
import { getFacilitiesContent } from "../data/getContent";

/**
 * The facilities page, in the reference's order: hero, jump, the building,
 * showcase, theatres, critical care, rooms, diagnostics, ambulance, support,
 * hygiene, visitors, book, footer.
 *
 * The copy is fetched once here and handed down, rather than each section
 * importing the English module directly. That is what makes the page
 * translatable: this is the only component on the route that knows which
 * language it is rendering.
 */
export async function FacilitiesPage({ locale }: { locale: Locale }) {
  const content = await getFacilitiesContent(locale);

  return (
    <>
      <main>
        <FacilitiesHero content={content} />
        <JumpCards content={content} />
        <BuildingSection content={content} />
        <ShowcaseSection content={content} />
        <TheatresSection content={content} />
        <CriticalCareSection content={content} />
        <RoomsSection content={content} />
        <DiagnosticSection content={content} />
        <AmbulanceSection content={content} />
        <SupportSection content={content} />
        <HygieneSection content={content} />
        <VisitorsSection content={content} />
        <BookSection content={content} />
      </main>
      <ThemedFooter columns={facilitiesFooterColumns} id="contact" />
    </>
  );
}
