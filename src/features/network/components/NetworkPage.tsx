import { NetworkHero } from "./NetworkHero";
import { JumpCards } from "./JumpCards";
import { MattersSection } from "./MattersSection";
import { FamilySection } from "./FamilySection";
import { ReachSection } from "./ReachSection";
import { ReferralSection } from "./ReferralSection";
import { ContactSection } from "./ContactSection";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { networkFooterColumns } from "@/config/networkNavigation";
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";
import { getNetworkContent } from "../data/getContent";

// The network page in the reference's order: hero, jump cards, then the five
// numbered sections (why it matters, the family, the numbers, moving between
// us, get in touch) and the footer.
//
// ThemedFooter's own id is left at its default rather than pointed at
// #contact, because unlike the international care page this one has a real
// #contact section of its own.
//
// The copy is fetched once here and handed down, rather than each section
// importing the English module directly. That is what makes the page
// translatable: this is the only component on the route that knows which
// language it is rendering.
export async function NetworkPage({ locale }: { locale: Locale }) {
  const content = await getNetworkContent(locale);
  return (
    <>
      <main>
        <NetworkHero content={content} />
        <JumpCards content={content} />
        <MattersSection content={content} />
        <FamilySection content={content} />
        <ReachSection content={content} />
        <ReferralSection content={content} />
        <ContactSection content={content} />
      </main>
      <ThemedFooter
        columns={translateFooterColumns(networkFooterColumns, locale)}
        reachUsLabel={navLabel("Reach us", locale)}
        id="footer"
      />
    </>
  );
}
