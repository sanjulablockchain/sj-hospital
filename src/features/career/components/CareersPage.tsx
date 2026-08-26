import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { careerFooterColumns } from "@/config/careerNavigation";
import { CareersHero } from "./CareersHero";
import { JumpCards } from "./JumpCards";
import { FeatureSplit } from "./FeatureSplit";
import { BenefitsSection } from "./BenefitsSection";
import { OpeningsSection } from "./OpeningsSection";
import { ProcessSection } from "./ProcessSection";
import { StudentsSection } from "./StudentsSection";
import { ApplicationSection } from "./ApplicationSection";
import { ApplySection } from "./ApplySection";
import { commitments, fraudChecks, faq } from "../data/content";

/**
 * The careers page in the reference's order: hero, jump cards, then the nine
 * numbered sections and the footer.
 *
 * `#why` and `#fraud` are the same `FeatureSplit` with different strings, which
 * is how the reference draws them too.
 *
 * The footer keeps its default `#footer` id rather than the reference's
 * `#contact`, because `#apply` is this page's real contact section and two
 * elements cannot share one fragment.
 */
export function CareersPage() {
  return (
    <>
      <main>
        <CareersHero />
        <JumpCards />

        <FeatureSplit
          id="why"
          eyebrow="01 / Why here"
          heading="The reasons people actually give for leaving"
          body="When a nurse or a technologist leaves for the Gulf, it is rarely only about money. It is the twelve hour shift with no relief, the equipment that has been broken for a year, and the sense that nobody is going to train you into anything better. We cannot fix a national salary market. We can fix those three things, and we have set the hospital up to try."
          listHeading="What we commit to"
          items={commitments}
        />

        <BenefitsSection />
        <OpeningsSection />
        <ProcessSection />
        <StudentsSection />

        <FeatureSplit
          id="fraud"
          eyebrow="06 / Recruitment fraud"
          heading="Nobody here will ever ask you for money"
          body="There is a real trade in fake hospital and overseas nursing jobs in Sri Lanka, and it targets exactly the people who can least afford it. We do not charge application fees, registration fees, training deposits, agent commissions or visa processing money at any stage. If someone claiming to be from this hospital asks you for a payment, it is a fraud. Call us on the number below and tell us."
          listHeading="How to check a posting is ours"
          items={fraudChecks}
          headingMaxCh={26}
        />

        <FaqAccordion faq={[...faq]} heading="Before you apply" eyebrow="07 / Candidate questions" />

        <ApplicationSection />
        <ApplySection />
      </main>
      <ThemedFooter columns={careerFooterColumns} id="footer" />
    </>
  );
}
