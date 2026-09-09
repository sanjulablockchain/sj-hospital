import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { careerFooterColumns } from "@/config/careerNavigation";
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";
import { getCareerContent } from "../data/getContent";
import { CareersHero } from "./CareersHero";
import { JumpCards } from "./JumpCards";
import { FeatureSplit } from "./FeatureSplit";
import { BenefitsSection } from "./BenefitsSection";
import { OpeningsSection } from "./OpeningsSection";
import { ProcessSection } from "./ProcessSection";
import { StudentsSection } from "./StudentsSection";
import { ApplicationSection } from "./ApplicationSection";
import { ApplySection } from "./ApplySection";

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
 *
 * The copy is fetched once here and handed down, rather than each section
 * importing the English module directly. That is what makes the page
 * translatable: this is the only component on the route that knows which
 * language it is rendering. `OpeningsSection` and `ApplicationForm` (via
 * `ApplicationSection`) are the only Client Components on this page; every
 * Server Component section still takes `content` as a prop rather than
 * importing `../data/content` itself, the same as `media`'s and `contact`'s
 * own pages.
 */
export async function CareersPage({ locale }: { locale: Locale }) {
  const content = await getCareerContent(locale);
  const { commitments, fraudChecks, faq, whySection, fraudSection, faqHeading, sectionEyebrows } = content;

  return (
    <>
      <main>
        <CareersHero content={content} />
        <JumpCards content={content} />

        <FeatureSplit
          id="why"
          eyebrow={sectionEyebrows.why}
          heading={whySection.heading}
          body={whySection.body}
          listHeading={whySection.listHeading}
          items={commitments}
        />

        <BenefitsSection content={content} />
        <OpeningsSection content={content} />
        <ProcessSection content={content} />
        <StudentsSection content={content} />

        <FeatureSplit
          id="fraud"
          eyebrow={sectionEyebrows.fraud}
          heading={fraudSection.heading}
          body={fraudSection.body}
          listHeading={fraudSection.listHeading}
          items={fraudChecks}
          headingMaxCh={26}
        />

        {/* Hard-broken to the reference's two lines, which the shared
            FaqAccordion allows now that its heading takes a node. */}
        <FaqAccordion
          faq={[...faq]}
          heading={
            <>
              {faqHeading.line1}
              <br />
              {faqHeading.line2}
            </>
          }
          eyebrow={sectionEyebrows.faq}
        />

        <ApplicationSection content={content} locale={locale} />
        <ApplySection content={content} />
      </main>
      <ThemedFooter
        columns={translateFooterColumns(careerFooterColumns, locale)}
        reachUsLabel={navLabel("Reach us", locale)}
        id="footer"
      />
    </>
  );
}
