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
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";
import { getMediaContent } from "../data/getContent";

/**
 * The media page, in the reference's order: hero, jump, newsroom, press desk,
 * press kit, image library, spokespeople, ground rules, enquiry, footer.
 *
 * The copy is fetched once here and handed down, rather than each section
 * importing the English module directly. That is what makes the page
 * translatable: this is the only component on the route that knows which
 * language it is rendering.
 *
 * `NewsroomSection` and `RulesSection` are Client Components, and each is a
 * leaf: the filter and the accordion are the page's only state. They take
 * their own slice of the already localized `content` as a prop, the same as
 * every Server Component section here, never by importing `../data/content`
 * themselves: that import would pull all three locales' copy into the
 * browser bundle.
 */
export async function MediaPage({ locale }: { locale: Locale }) {
  const content = await getMediaContent(locale);

  return (
    <>
      <main>
        <MediaHero content={content} locale={locale} />
        <JumpCards content={content} />
        <NewsroomSection content={content} />
        <PressDeskSection content={content} />
        <PressKitSection content={content} />
        <GallerySection content={content} />
        <SpokespeopleSection content={content} />
        <RulesSection content={content} />
        <EnquirySection content={content} />
      </main>
      <ThemedFooter
        columns={translateFooterColumns(mediaFooterColumns, locale)}
        reachUsLabel={navLabel("Reach us", locale)}
        id="contact"
      />
    </>
  );
}
