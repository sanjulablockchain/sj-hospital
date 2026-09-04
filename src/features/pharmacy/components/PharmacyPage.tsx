import { PharmacyHero } from "./PharmacyHero";
import { JumpCards } from "./JumpCards";
import { CountersSection } from "./CountersSection";
import { StandardsSection } from "./StandardsSection";
import { StockSection } from "./StockSection";
import { DeliverySection } from "./DeliverySection";
import { RefillsSection } from "./RefillsSection";
import { SafetySection } from "./SafetySection";
import { BookSection } from "./BookSection";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { pharmacyFooterColumns } from "@/config/pharmacyNavigation";
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";
import { getPharmacyContent } from "../data/getContent";

/**
 * The pharmacy page in the reference's order: hero, jump cards, then the eight
 * numbered sections (counters, dispensing standards, stock, delivery, repeat
 * prescriptions, safety, questions, start here) and the footer.
 *
 * The copy is fetched once here and handed down, rather than each section
 * importing the English module directly. That is what makes the page
 * translatable: this is the only component on the route that knows which
 * language it is rendering.
 */
export async function PharmacyPage({ locale }: { locale: Locale }) {
  const content = await getPharmacyContent(locale);
  const { faq, faqHeading, sectionEyebrows } = content;

  return (
    <>
      <main>
        <PharmacyHero content={content} locale={locale} />
        <JumpCards content={content} />
        <CountersSection content={content} />
        <StandardsSection content={content} />
        <StockSection content={content} />
        <DeliverySection content={content} />
        <RefillsSection content={content} />
        <SafetySection content={content} />
        <FaqAccordion faq={faq} heading={faqHeading} eyebrow={sectionEyebrows.faq} />
        <BookSection content={content} />
      </main>
      <ThemedFooter
        columns={translateFooterColumns(pharmacyFooterColumns, locale)}
        reachUsLabel={navLabel("Reach us", locale)}
        id="contact"
      />
    </>
  );
}
