import { HomeCareHero } from "./HomeCareHero";
import { JumpCards } from "./JumpCards";
import { VisitsSection } from "./VisitsSection";
import { WhoSection } from "./WhoSection";
import { SamplingSection } from "./SamplingSection";
import { HowSection } from "./HowSection";
import { HandoffSection } from "./HandoffSection";
import { BookSection } from "./BookSection";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { homeCareFooterColumns } from "@/config/homeCareNavigation";
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";
import { getHomeCareContent } from "../data/getContent";

/**
 * The care at home page: hero, jump cards, the four bands this page owns, the
 * two that hand off to the pages holding the detail, then the FAQ and the
 * contact rail.
 *
 * The order is deliberate. A reader learns what a visit is, who it is for, what
 * happens about samples and how to arrange one, and only then meets medicine
 * delivery and telemedicine. Putting either of those earlier would send them
 * off to /pharmacy or /services before they had read the page they came for.
 *
 * `handoffs` is indexed rather than mapped, because the two bands are not
 * interchangeable: each needs the id its own footer link and the nav point at.
 *
 * `FaqAccordion` is the shared section, so `#faq` is not built here. It renders
 * the same one-open-at-a-time rows the pharmacy, international care and service
 * detail pages use, with its own eyebrow.
 *
 * The copy is fetched once here and handed down, rather than each section
 * importing the English module directly. That is what makes the page
 * translatable: this is the only component on the route that knows which
 * language it is rendering.
 */
export async function HomeCarePage({ locale }: { locale: Locale }) {
  const content = await getHomeCareContent(locale);
  const { faq, faqHeading, handoffs, sectionEyebrows } = content;

  return (
    <>
      <main>
        <HomeCareHero content={content} />
        <JumpCards content={content} />
        <VisitsSection content={content} />
        <WhoSection content={content} />
        <SamplingSection content={content} />
        <HowSection content={content} />
        <HandoffSection id="medicine" band={handoffs[0]} />
        <HandoffSection id="telemedicine" band={handoffs[1]} />
        <FaqAccordion
          faq={faq}
          heading={
            <>
              {faqHeading.line1}
              <br />
              {faqHeading.line2}
            </>
          }
          eyebrow={sectionEyebrows.faq}
        />
        <BookSection content={content} />
      </main>
      <ThemedFooter
        columns={translateFooterColumns(homeCareFooterColumns, locale)}
        reachUsLabel={navLabel("Reach us", locale)}
        id="footer"
      />
    </>
  );
}
