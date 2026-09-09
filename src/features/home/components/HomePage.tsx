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
    <ThemedShell>
      <main>
        <HeroSection hero={content.hero} tickerItems={content.statTickerItems} />
        <WhoWeAreSection content={content.whoWeAre} locale={locale} />
        <ServicesBentoSection content={content.servicesBento} locale={locale} />
        <SurgicalSection content={content.surgical} locale={locale} />
        <FacilitiesSection
          items={home.facilities.facilities}
          eyebrow={home.facilities.sectionEyebrow}
          heading={home.facilities.heading}
          locale={locale}
        />
        <PharmacySection content={content.pharmacy} locale={locale} />
        <HomeCareSection
          items={home.homeCare.homeCareCards}
          eyebrow={home.homeCare.sectionEyebrow}
          heading={home.homeCare.heading}
          body={home.homeCare.body}
          cta={home.homeCare.cta}
          locale={locale}
        />
        <RoomsSection content={content.rooms} locale={locale} />
        <InternationalCareSection
          items={home.internationalCare.internationalCareItems}
          eyebrow={home.internationalCare.sectionEyebrow}
          heading={home.internationalCare.heading}
          body={home.internationalCare.body}
          ctaPrimary={home.internationalCare.ctaPrimary}
          ctaSecondary={home.internationalCare.ctaSecondary}
          locale={locale}
        />
        <HealthTipsSection
          items={home.healthTips.healthTips}
          eyebrow={home.healthTips.sectionEyebrow}
          heading={home.healthTips.heading}
          cta={home.healthTips.cta}
          locale={locale}
        />
        <SchoolWellnessSection content={content.schoolWellness} locale={locale} />
        <NetworkSection
          nodes={home.network.networkNodes}
          eyebrow={home.network.sectionEyebrow}
          heading={home.network.heading}
          body={home.network.body}
          cta={home.network.cta}
          accordionAria={home.network.accordionAria}
          locale={locale}
        />
        <MediaSection
          items={home.media.mediaItems}
          eyebrow={home.media.sectionEyebrow}
          heading={home.media.heading}
          cta={home.media.cta}
          locale={locale}
        />
        <CareersSection
          jobs={home.careers.jobOpenings}
          eyebrow={home.careers.sectionEyebrow}
          heading={home.careers.heading}
          body={home.careers.body}
          cta={home.careers.cta}
          locale={locale}
        />
        <TestimonialsSection
          items={home.testimonials.testimonials}
          eyebrow={home.testimonials.sectionEyebrow}
          ariaPrev={home.testimonials.ariaPrev}
          ariaNext={home.testimonials.ariaNext}
        />
        <ContactCtaSection content={content.contactCta} locale={locale} />
      </main>
      <HomeFooter locale={locale} />
      <FloatingActions />
    </ThemedShell>
  );
}
