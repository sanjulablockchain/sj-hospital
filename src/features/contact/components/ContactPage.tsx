import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { contactFooterColumns } from "@/config/contactNavigation";
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";
import { getContactContent } from "../data/getContent";
import { ContactHero } from "./ContactHero";
import { JumpCards } from "./JumpCards";
import { ReachSection } from "./ReachSection";
import { MessageSection } from "./MessageSection";
import { MapSection } from "./MapSection";

/**
 * The contact-us page in source order: hero, jump cards, then the three
 * numbered sections and the footer.
 *
 * The copy is fetched once here and handed down, rather than each section
 * importing the English module directly. That is what makes the page
 * translatable: this is the only component on the route that knows which
 * language it is rendering.
 */
export async function ContactPage({ locale }: { locale: Locale }) {
  const content = await getContactContent(locale);

  return (
    <>
      <main>
        <ContactHero content={content} locale={locale} />
        <JumpCards content={content} locale={locale} />
        <ReachSection content={content} />
        <MessageSection content={content} />
        <MapSection content={content} />
      </main>
      <ThemedFooter
        columns={translateFooterColumns(contactFooterColumns, locale)}
        reachUsLabel={navLabel("Reach us", locale)}
        id="footer"
      />
    </>
  );
}
