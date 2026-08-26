import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { aboutFooterColumns } from "@/config/aboutNavigation";
import { AboutHero } from "./AboutHero";
import { JumpCards } from "./JumpCards";
import { StorySection } from "./StorySection";
import { DifferentSection } from "./DifferentSection";
import { MissionSection } from "./MissionSection";
import { GroupSection } from "./GroupSection";

/**
 * The about-us page in source order: hero, jump cards, then the four numbered
 * sections and the footer.
 */
export function AboutPage() {
  return (
    <>
      <main>
        <AboutHero />
        <JumpCards />
        <StorySection />
        <DifferentSection />
        <MissionSection />
        <GroupSection />
      </main>
      <ThemedFooter columns={aboutFooterColumns} id="footer" />
    </>
  );
}
