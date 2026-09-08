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
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";
import { getInternationalCareContent } from "../data/getContent";

// The international care page in the reference's order: hero, jump cards, then
// the eight numbered sections (the journey, the desk, estimates, rooms, paying
// for it, Negombo, questions, start here) and the footer.
//
// The copy is fetched once here and handed down, rather than each section
// importing the English module directly. That is what makes the page
// translatable: this is the only component on the route that knows which
// language it is rendering.
export async function InternationalCarePage({ locale }: { locale: Locale }) {
  const content = await getInternationalCareContent(locale);
  const { faq, faqHeading, sectionEyebrows } = content;

  return (
    <>
      <main>
        <InternationalHero content={content} locale={locale} />
        <JumpCards content={content} locale={locale} />
        <JourneySection content={content} />
        <DeskSection content={content} />
        <EstimatesSection content={content} />
        <RoomsSection content={content} />
        <BillingSection content={content} />
        <NegomboSection content={content} />
        <FaqAccordion faq={faq} heading={faqHeading} eyebrow={sectionEyebrows.faq} />
        <EnquirySection content={content} locale={locale} />
      </main>
      <ThemedFooter
        columns={translateFooterColumns(internationalFooterColumns, locale)}
        reachUsLabel={navLabel("Reach us", locale)}
        id="contact"
      />
    </>
  );
}
