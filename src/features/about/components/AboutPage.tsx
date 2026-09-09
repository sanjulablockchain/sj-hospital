import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { aboutFooterColumns } from "@/config/aboutNavigation";
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";
import { getAboutContent } from "../data/getContent";
import { AboutHero } from "./AboutHero";
import { JumpCards } from "./JumpCards";
import { StorySection } from "./StorySection";
import { DifferentSection } from "./DifferentSection";
import { MissionSection } from "./MissionSection";
import { GroupSection } from "./GroupSection";

/**
 * The about-us page in source order: hero, jump cards, then the four numbered
 * sections and the footer.
 *
 * The copy is fetched once here and handed down, rather than each section
 * importing the English module directly. That is what makes the page
 * translatable: this is the only component on the route that knows which
 * language it is rendering.
 */
export async function AboutPage({ locale }: { locale: Locale }) {
  const content = await getAboutContent(locale);

  return (
    <>
      <main>
        <AboutHero content={content} />
        <JumpCards content={content} />
        <StorySection content={content} />
        <DifferentSection content={content} />
        <MissionSection content={content} />
        <GroupSection content={content} />
      </main>
      <ThemedFooter
        columns={translateFooterColumns(aboutFooterColumns, locale)}
        reachUsLabel={navLabel("Reach us", locale)}
        id="footer"
      />
    </>
  );
}
