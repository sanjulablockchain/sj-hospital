import { MediaHero } from "./MediaHero";
import { JumpCards } from "./JumpCards";
import { NewsroomSection } from "./NewsroomSection";
import { PressDeskSection } from "./PressDeskSection";
import { PressKitSection } from "./PressKitSection";
import { GallerySection } from "./GallerySection";
import { SpokespeopleSection } from "./SpokespeopleSection";
import { RulesSection } from "./RulesSection";
import { EnquirySection } from "./EnquirySection";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { mediaFooterColumns } from "@/config/mediaNavigation";

/**
 * The media page, in the reference's order: hero, jump, newsroom, press desk,
 * press kit, image library, spokespeople, ground rules, enquiry, footer.
 *
 * Only `NewsroomSection` and `RulesSection` are Client Components, and each is
 * a leaf: the filter and the accordion are the page's only state.
 */
export function MediaPage() {
  return (
    <>
      <main>
        <MediaHero />
        <JumpCards />
        <NewsroomSection />
        <PressDeskSection />
        <PressKitSection />
        <GallerySection />
        <SpokespeopleSection />
        <RulesSection />
        <EnquirySection />
      </main>
      <ThemedFooter columns={mediaFooterColumns} id="contact" />
    </>
  );
}
