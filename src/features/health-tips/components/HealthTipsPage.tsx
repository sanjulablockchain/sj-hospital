import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { healthTipsFooterColumns } from "@/config/healthTipsNavigation";
import { TipsHero } from "./TipsHero";
import { JumpCards } from "./JumpCards";
import { SeasonalSection } from "./SeasonalSection";
import { LibrarySection } from "./LibrarySection";
import { WarningSection } from "./WarningSection";
import { ScreeningSection } from "./ScreeningSection";
import { FirstAidSection } from "./FirstAidSection";
import { MythsSection } from "./MythsSection";
import { BookSection } from "./BookSection";
import { CATEGORIES, articles, categoryCounts, featured, featuredKicker } from "../data/library";
import { warnings, LEVEL_TONE } from "../data/warnings";
import { myths } from "../data/myths";

/**
 * The health tips page, in the reference's order: hero, jump, dengue, library,
 * when to come in, screening, first aid, straight answers, book, footer.
 *
 * The three interactive sections (`LibrarySection`, `WarningSection`,
 * `MythsSection`) take their data as props from here rather than importing it
 * themselves, so this stays the one place the page's content is assembled and
 * their client bundles carry only what they render.
 */
export function HealthTipsPage() {
  return (
    <>
      <main>
        <TipsHero />
        <JumpCards />
        <SeasonalSection />
        <LibrarySection
          categories={CATEGORIES}
          articles={articles}
          counts={categoryCounts()}
          featured={featured}
          featuredKicker={featuredKicker}
        />
        <WarningSection warnings={warnings} levelTone={LEVEL_TONE} />
        <ScreeningSection />
        <FirstAidSection />
        <MythsSection myths={myths} />
        <BookSection />
      </main>
      <ThemedFooter columns={healthTipsFooterColumns} id="contact" />
    </>
  );
}
