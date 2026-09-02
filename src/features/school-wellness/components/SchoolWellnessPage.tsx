import { WellnessHero } from "./WellnessHero";
import { JumpCards } from "./JumpCards";
import { WhySchoolSection } from "./WhySchoolSection";
import { ScreeningSection } from "./ScreeningSection";
import { GradeBandsSection } from "./GradeBandsSection";
import { TeacherTrainingSection } from "./TeacherTrainingSection";
import { DengueSection } from "./DengueSection";
import { FollowUpSection } from "./FollowUpSection";
import { BookSection } from "./BookSection";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { wellnessFooterColumns } from "@/config/wellnessNavigation";
import type { Locale } from "@/lib/i18n/locales";
import { getSchoolWellnessContent } from "../data/getContent";

/**
 * The school wellness page in the reference's order: hero, jump cards, then the
 * eight numbered sections and the footer.
 *
 * `FaqAccordion` is the shared section, so `#faq` is not built here. It renders
 * the same one-open-at-a-time rows the reference does, with the `+` rotating on
 * open, and pharmacy, international care and the service detail pages already
 * use it with their own eyebrow.
 *
 * ThemedFooter keeps its default id rather than taking `#contact`: this page
 * puts its contact rail inside `#book`, so there is no separate contact section
 * for the footer to stand in for.
 *
 * The copy is fetched once here and handed down, rather than each section
 * importing the English module directly. That is what makes the page
 * translatable: this is the only component on the route that knows which
 * language it is rendering.
 */
export async function SchoolWellnessPage({ locale }: { locale: Locale }) {
  const content = await getSchoolWellnessContent(locale);
  const { faq, faqHeading, sectionEyebrows } = content;

  return (
    <>
      <main>
        <WellnessHero content={content} />
        <JumpCards content={content} />
        <WhySchoolSection content={content} />
        <ScreeningSection content={content} />
        <GradeBandsSection content={content} />
        <TeacherTrainingSection content={content} />
        <DengueSection content={content} />
        <FollowUpSection content={content} />
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
      <ThemedFooter columns={wellnessFooterColumns} id="footer" />
    </>
  );
}
