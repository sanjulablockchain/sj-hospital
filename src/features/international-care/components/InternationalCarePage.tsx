import { InternationalHero } from "./InternationalHero";
import { JumpCards } from "./JumpCards";
import { JourneySection } from "./JourneySection";
import { DeskSection } from "./DeskSection";
import { EstimatesSection } from "./EstimatesSection";
import { RoomsSection } from "./RoomsSection";
import { BillingSection } from "./BillingSection";
import { NegomboSection } from "./NegomboSection";
import { EnquirySection } from "./EnquirySection";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { internationalFooterColumns } from "@/config/internationalNavigation";
import { faq } from "../data/content";

// The international care page in the reference's order: hero, jump cards, then
// the eight numbered sections (the journey, the desk, estimates, rooms, paying
// for it, Negombo, questions, start here) and the footer.
export function InternationalCarePage() {
  return (
    <>
      <main>
        <InternationalHero />
        <JumpCards />
        <JourneySection />
        <DeskSection />
        <EstimatesSection />
        <RoomsSection />
        <BillingSection />
        <NegomboSection />
        <FaqAccordion faq={faq} heading="The questions we always get" eyebrow="07 / Before you fly" />
        <EnquirySection />
      </main>
      <ThemedFooter columns={internationalFooterColumns} id="contact" />
    </>
  );
}
