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
import { faq } from "../data/content";

// The pharmacy page in the reference's order: hero, jump cards, then the eight
// numbered sections (counters, dispensing standards, stock, delivery, repeat
// prescriptions, safety, questions, start here) and the footer.
export function PharmacyPage() {
  return (
    <>
      <main>
        <PharmacyHero />
        <JumpCards />
        <CountersSection />
        <StandardsSection />
        <StockSection />
        <DeliverySection />
        <RefillsSection />
        <SafetySection />
        <FaqAccordion faq={faq} heading="Asked at the counter" eyebrow="07 / Questions" />
        <BookSection />
      </main>
      <ThemedFooter columns={pharmacyFooterColumns} id="contact" />
    </>
  );
}
