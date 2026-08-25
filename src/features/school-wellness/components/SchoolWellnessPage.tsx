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
import { faq } from "../data/content";

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
 */
export function SchoolWellnessPage() {
  return (
    <>
      <main>
        <WellnessHero />
        <JumpCards />
        <WhySchoolSection />
        <ScreeningSection />
        <GradeBandsSection />
        <TeacherTrainingSection />
        <DengueSection />
        <FollowUpSection />
        <FaqAccordion
          faq={faq}
          heading={
            <>
              Fair questions
              <br />
              to ask us
            </>
          }
          eyebrow="07 / For principals and parents"
        />
        <BookSection />
      </main>
      <ThemedFooter columns={wellnessFooterColumns} id="footer" />
    </>
  );
}
