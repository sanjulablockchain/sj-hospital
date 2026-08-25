import { NetworkHero } from "./NetworkHero";
import { JumpCards } from "./JumpCards";
import { MattersSection } from "./MattersSection";
import { FamilySection } from "./FamilySection";
import { ReachSection } from "./ReachSection";
import { ReferralSection } from "./ReferralSection";
import { ContactSection } from "./ContactSection";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { networkFooterColumns } from "@/config/networkNavigation";

// The network page in the reference's order: hero, jump cards, then the five
// numbered sections (why it matters, the family, the numbers, moving between
// us, get in touch) and the footer.
//
// ThemedFooter's own id is left at its default rather than pointed at
// #contact, because unlike the international care page this one has a real
// #contact section of its own.
export function NetworkPage() {
  return (
    <>
      <main>
        <NetworkHero />
        <JumpCards />
        <MattersSection />
        <FamilySection />
        <ReachSection />
        <ReferralSection />
        <ContactSection />
      </main>
      <ThemedFooter columns={networkFooterColumns} id="footer" />
    </>
  );
}
