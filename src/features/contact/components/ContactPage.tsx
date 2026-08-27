import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { contactFooterColumns } from "@/config/contactNavigation";
import { ContactHero } from "./ContactHero";
import { JumpCards } from "./JumpCards";
import { ReachSection } from "./ReachSection";
import { MessageSection } from "./MessageSection";
import { MapSection } from "./MapSection";

/**
 * The contact-us page in source order: hero, jump cards, then the three
 * numbered sections and the footer.
 */
export function ContactPage() {
  return (
    <>
      <main>
        <ContactHero />
        <JumpCards />
        <ReachSection />
        <MessageSection />
        <MapSection />
      </main>
      <ThemedFooter columns={contactFooterColumns} id="footer" />
    </>
  );
}
