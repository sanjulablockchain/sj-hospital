import { ThemedShell } from "@/components/layout/ThemedShell";
import { FloatingActions } from "@/components/layout/FloatingActions";
import type { Locale } from "@/lib/i18n/locales";
import { getHomeContent } from "../data/getContent";
import { HeroSection } from "./HeroSection";
import { WhoWeAreSection } from "./WhoWeAreSection";
import { ServicesBentoSection } from "./ServicesBentoSection";
import { SurgicalSection } from "./SurgicalSection";
import { FacilitiesSection } from "./FacilitiesSection";
import { PharmacySection } from "./PharmacySection";
import { HomeCareSection } from "./HomeCareSection";
import { RoomsSection } from "./RoomsSection";
import { InternationalCareSection } from "./InternationalCareSection";
import { HealthTipsSection } from "./HealthTipsSection";
import { SchoolWellnessSection } from "./SchoolWellnessSection";
import { NetworkSection } from "./NetworkSection";
import { MediaSection } from "./MediaSection";
import { CareersSection } from "./CareersSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { ContactCtaSection } from "./ContactCtaSection";
import { HomeFooter } from "./HomeFooter";

/**
 * The home page, the most visited on the site and the most plumbing of any
 * feature: eight pre-existing per-teaser data files plus `content.ts` (added
 * by this task, see its own header comment), fetched ONCE here via the
 * single `getHomeContent` getter rather than once per section.
 *
 * Every section below takes its own slice of the already localized result as
 * a prop, never by importing a data file itself: that is what makes the page
 * translatable, and it is what keeps translation data out of the client
 * bundle for the eight sections that are Client Components
 * (`HeroParallaxBackground` inside `HeroSection`, `SurgicalSection`,
 * `PharmacySection`, `RoomsSection`, `SchoolWellnessSection`,
 * `NetworkAccordion` inside `NetworkSection`, `TestimonialsSection`, and
 * `CountUp` wherever it is used).
 */
export async function HomePage({ locale }: { locale: Locale }) {
  const home = await getHomeContent(locale);
  const { content } = home;

  return (
    <ThemedShell flowHeader>
      <main>
        <HeroSection hero={content.hero} tickerItems={content.statTickerItems} />
        <WhoWeAreSection content={content.whoWeAre} />
        <ServicesBentoSection content={content.servicesBento} />
        <SurgicalSection content={content.surgical} />
        <FacilitiesSection
          items={home.facilities.facilities}
          eyebrow={home.facilities.sectionEyebrow}
          heading={home.facilities.heading}
        />
        <PharmacySection content={content.pharmacy} />
        <HomeCareSection
          items={home.homeCare.homeCareCards}
          eyebrow={home.homeCare.sectionEyebrow}
          heading={home.homeCare.heading}
          body={home.homeCare.body}
          cta={home.homeCare.cta}
        />
        <RoomsSection content={content.rooms} />
        <InternationalCareSection
          items={home.internationalCare.internationalCareItems}
          eyebrow={home.internationalCare.sectionEyebrow}
          heading={home.internationalCare.heading}
          body={home.internationalCare.body}
          ctaPrimary={home.internationalCare.ctaPrimary}
          ctaSecondary={home.internationalCare.ctaSecondary}
        />
        <HealthTipsSection
          items={home.healthTips.healthTips}
          eyebrow={home.healthTips.sectionEyebrow}
          heading={home.healthTips.heading}
          cta={home.healthTips.cta}
        />
        <SchoolWellnessSection content={content.schoolWellness} />
        <NetworkSection
          nodes={home.network.networkNodes}
          eyebrow={home.network.sectionEyebrow}
          heading={home.network.heading}
          body={home.network.body}
          cta={home.network.cta}
          accordionAria={home.network.accordionAria}
        />
        <MediaSection
          items={home.media.mediaItems}
          eyebrow={home.media.sectionEyebrow}
          heading={home.media.heading}
          cta={home.media.cta}
        />
        <CareersSection
          jobs={home.careers.jobOpenings}
          eyebrow={home.careers.sectionEyebrow}
          heading={home.careers.heading}
          body={home.careers.body}
          cta={home.careers.cta}
        />
        <TestimonialsSection
          items={home.testimonials.testimonials}
          eyebrow={home.testimonials.sectionEyebrow}
          ariaPrev={home.testimonials.ariaPrev}
          ariaNext={home.testimonials.ariaNext}
        />
        <ContactCtaSection content={content.contactCta} />
      </main>
      <HomeFooter />
      <FloatingActions />
    </ThemedShell>
  );
}
