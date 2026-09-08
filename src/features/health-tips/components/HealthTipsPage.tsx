import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { healthTipsFooterColumns } from "@/config/healthTipsNavigation";
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";
import { getHealthTipsContent } from "../data/getContent";
import { TipsHero } from "./TipsHero";
import { JumpCards } from "./JumpCards";
import { SeasonalSection } from "./SeasonalSection";
import { LibrarySection } from "./LibrarySection";
import { WarningSection } from "./WarningSection";
import { ScreeningSection } from "./ScreeningSection";
import { FirstAidSection } from "./FirstAidSection";
import { MythsSection } from "./MythsSection";
import { BookSection } from "./BookSection";

/**
 * The health tips page, in the reference's order: hero, jump, dengue, library,
 * when to come in, screening, first aid, straight answers, book, footer.
 *
 * The copy is fetched once here and handed down, rather than each section
 * importing an English data file directly. That is what makes the page
 * translatable: this is the only component on the route that knows which
 * language it is rendering. `LibrarySection`, `WarningSection` and
 * `MythsSection` (the three Client Component sections) take their data as
 * props for the same reason `ContactPage`'s sections do, so their client
 * bundles carry only what they render.
 */
export async function HealthTipsPage({ locale }: { locale: Locale }) {
  const content = await getHealthTipsContent(locale);
  const { dengue, firstAid, library, myths, pageContent, screening, warnings } = content;

  return (
    <>
      <main>
        <TipsHero pageContent={pageContent} locale={locale} />
        <JumpCards jumpCards={pageContent.jumpCards} />
        <SeasonalSection dengue={dengue} />
        <LibrarySection
          categories={library.CATEGORIES}
          categoryLabels={library.categoryLabels}
          articles={library.articles}
          counts={library.categoryCounts()}
          featured={library.featured}
          featuredKicker={library.featuredKicker}
          copy={library.librarySection}
        />
        <WarningSection
          warnings={warnings.warnings}
          levelTone={warnings.LEVEL_TONE}
          levelLabels={warnings.LEVEL_LABELS}
          copy={warnings.warningSection}
        />
        <ScreeningSection screening={screening} />
        <FirstAidSection firstAid={firstAid} />
        <MythsSection myths={myths.myths} copy={myths.mythsSection} />
        <BookSection pageContent={pageContent} />
      </main>
      <ThemedFooter
        columns={translateFooterColumns(healthTipsFooterColumns, locale)}
        reachUsLabel={navLabel("Reach us", locale)}
        id="contact"
      />
    </>
  );
}
