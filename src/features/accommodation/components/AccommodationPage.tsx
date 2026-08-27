import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { accommodationFooterColumns } from "@/config/accommodationNavigation";
import { RoomsHero } from "./RoomsHero";
import { JumpCards } from "./JumpCards";
import { RoomsSection } from "./RoomsSection";
import { SpecialtiesSection } from "./SpecialtiesSection";
import { BookSection } from "./BookSection";

/**
 * The accommodation page in source order: hero, jump cards, then the three
 * numbered sections and the footer.
 */
export function AccommodationPage() {
  return (
    <>
      <main>
        <RoomsHero />
        <JumpCards />
        <RoomsSection />
        <SpecialtiesSection />
        <BookSection />
      </main>
      <ThemedFooter columns={accommodationFooterColumns} id="footer" />
    </>
  );
}
