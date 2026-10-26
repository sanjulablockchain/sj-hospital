import { LocationsHero } from "./LocationsHero";
import { HospitalsSection } from "./HospitalsSection";
import { HelpSection } from "./HelpSection";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { locationsFooterColumns } from "@/config/locationsNavigation";
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";
import { getLocationsContent } from "../data/getContent";

/**
 * The locations page: hero, one card per hospital, the "which hospital?"
 * rail and the footer.
 *
 * The copy is fetched once here and handed down, rather than each section
 * importing the English module directly. That is what makes the page
 * translatable: this is the only component on the route that knows which
 * language it is rendering.
 */
export async function LocationsPage({ locale }: { locale: Locale }) {
  const content = await getLocationsContent(locale);

  return (
    <>
      <main>
        <LocationsHero content={content} />
        <HospitalsSection content={content} />
        <HelpSection content={content} />
      </main>
      <ThemedFooter
        columns={translateFooterColumns(locationsFooterColumns, locale)}
        reachUsLabel={navLabel("Reach us", locale)}
        id="footer"
      />
    </>
  );
}
