import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { accommodationFooterColumns } from "@/config/accommodationNavigation";
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";
import { getAccommodationContent } from "../data/getContent";
import { RoomsHero } from "./RoomsHero";
import { JumpCards } from "./JumpCards";
import { RoomsSection } from "./RoomsSection";
import { SpecialtiesSection } from "./SpecialtiesSection";
import { BookSection } from "./BookSection";

/**
 * The accommodation page in source order: hero, jump cards, then the three
 * numbered sections and the footer.
 *
 * The copy is fetched once here and handed down, rather than each section
 * importing the English module directly. That is what makes the page
 * translatable: this is the only component on the route that knows which
 * language it is rendering. `BookSection` also gets `locale` directly, since
 * it fetches the contact feature's own copy for the form it embeds.
 */
export async function AccommodationPage({ locale }: { locale: Locale }) {
  const content = await getAccommodationContent(locale);

  return (
    <>
      <main>
        <RoomsHero content={content} locale={locale} />
        <JumpCards content={content} />
        <RoomsSection content={content} />
        <SpecialtiesSection content={content} />
        <BookSection content={content} locale={locale} />
      </main>
      <ThemedFooter
        columns={translateFooterColumns(accommodationFooterColumns, locale)}
        reachUsLabel={navLabel("Reach us", locale)}
        id="footer"
      />
    </>
  );
}
