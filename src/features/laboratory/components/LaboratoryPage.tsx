import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { laboratoryFooterColumns } from "@/config/laboratoryNavigation";
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import { getServicesContent } from "@/features/services";
import type { Locale } from "@/lib/i18n/locales";
import { labTests } from "../data/catalogue";
import { getLaboratoryContent } from "../data/getContent";
import { labCatalogueSummary } from "../data/summary";
import { fillTemplate } from "../lib/fillTemplate";
import { LaboratoryHero } from "./LaboratoryHero";
import { LabListSection } from "./LabListSection";
import { HowSection } from "./HowSection";
import { LabBookSection } from "./LabBookSection";

/**
 * The price list page: hero, the list (this page's one job), how a visit
 * goes, and the closing rail. The copy is fetched once here and handed
 * down, so this is the only component on the route that knows which
 * language it renders.
 *
 * Every figure the hero quotes is filled here from `labCatalogueSummary`
 * (the catalogue) and from the localized laboratory service entry (the OPD
 * discount, read from its fourth strip cell, and the four steps), which own
 * those facts; nothing is typed twice.
 */
export async function LaboratoryPage({ locale }: { locale: Locale }) {
  const [content, servicesContent] = await Promise.all([getLaboratoryContent(locale), getServicesContent(locale)]);
  const laboratory = servicesContent.services.find((service) => service.slug === "laboratory");
  if (!laboratory) throw new Error("the laboratory service entry is missing");

  const values = {
    count: labCatalogueSummary.count,
    fromPrice: labCatalogueSummary.fromPrice,
    sameDayCount: labCatalogueSummary.sameDayCount,
    opdDiscount: laboratory.strip[3].v,
  };
  const standfirst = fillTemplate(content.heroStandfirst, values);
  const facts = content.heroFacts.map((fact) => ({ k: fact.k, v: fillTemplate(fact.v, values) }));
  const tickerItems = content.featuredCodes.flatMap(({ code, label }) => {
    const test = labTests.find((t) => t.code === code);
    return test && test.price !== null ? [`${label} ${test.price.toLocaleString("en")} LKR`] : [];
  });

  return (
    <>
      <main>
        <LaboratoryHero content={content} standfirst={standfirst} facts={facts} tickerItems={tickerItems} />
        <LabListSection content={content} tests={labTests} />
        <HowSection content={content} steps={laboratory.steps} />
        <LabBookSection content={content} />
      </main>
      <ThemedFooter
        columns={translateFooterColumns(laboratoryFooterColumns, locale)}
        reachUsLabel={navLabel("Reach us", locale)}
        id="contact"
      />
    </>
  );
}
