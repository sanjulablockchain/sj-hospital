import { ThemedShell } from "@/components/layout/ThemedShell";
import { FloatingActions } from "@/components/layout/FloatingActions";
import type { Locale } from "@/lib/i18n/locales";
import { services } from "@/features/services";
import { getHomeContent } from "../data/getContent";
import { HeroSection } from "./HeroSection";
import { QuickAccessSection } from "./QuickAccessSection";
import { WhoWeAreSection } from "./WhoWeAreSection";
import { FreeOpdSection } from "./FreeOpdSection";
import { SpecialtiesSection } from "./SpecialtiesSection";
import { PatientCareSection } from "./PatientCareSection";
import { PharmacySection } from "./PharmacySection";
import { StandardsSection } from "./StandardsSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { InternationalCareSection } from "./InternationalCareSection";
import { NetworkSection } from "./NetworkSection";
import { PartnerLogosSection } from "./PartnerLogosSection";
import { FaqSection } from "./FaqSection";
import { MediaCareersSection } from "./MediaCareersSection";
import { ContactCtaSection } from "./ContactCtaSection";
import { HomeFooter } from "./HomeFooter";
import { AnnouncementModal } from "./AnnouncementModal";

/**
 * The home page, rebuilt to the v4 reference
 * (docs/superpowers/specs/2026-09-23-home-page-v4-design.md): the brand
 * palette, the solid header with the utility bar above it, and the bands in
 * the reference's order. All copy is fetched ONCE here through
 * `getHomeContent` and handed down as props, so the Client Component leaves
 * (the slideshow, the specialties carousel, the reviews carousel, the network
 * accordion, the FAQ list and the announcement pop-up) never import a data
 * file and no translation reaches the client bundle.
 *
 * `AnnouncementModal` sits last, outside `<main>` beside `FloatingActions`:
 * it is chrome over the page rather than a band of it.
 */
export async function HomePage({ locale }: { locale: Locale }) {
  const home = await getHomeContent(locale);
  const { content } = home;

  return (
    <ThemedShell palette="brand" header="solid" utilityBar>
      <main>
        <HeroSection hero={content.hero} tickerItems={content.statTickerItems} />
        <QuickAccessSection content={content.quickAccess} servicesCount={services.length} locale={locale} />
        <WhoWeAreSection content={content.whoWeAre} servicesCount={services.length} locale={locale} />
        <FreeOpdSection content={content.freeOpd} locale={locale} />
        <SpecialtiesSection content={content.specialties} servicesCount={services.length} locale={locale} />
        <PatientCareSection content={content.patientCare} locale={locale} />
        <PharmacySection content={content.pharmacy} locale={locale} />
        <StandardsSection content={content.standards} />
        <TestimonialsSection
          items={home.testimonials.testimonials}
          heading={home.testimonials.heading}
          body={home.testimonials.body}
          ariaShow={home.testimonials.ariaShow}
          ariaPrev={home.testimonials.ariaPrev}
          ariaNext={home.testimonials.ariaNext}
          photo={home.testimonials.photo}
          photoAlt={home.testimonials.photoAlt}
        />
        <InternationalCareSection content={home.internationalCare} locale={locale} />
        <NetworkSection content={home.network} locale={locale} />
        <PartnerLogosSection content={home.network} locale={locale} />
        <FaqSection content={home.faq} locale={locale} />
        <MediaCareersSection media={home.media} careers={home.careers} locale={locale} />
        <ContactCtaSection content={content.contactCta} locale={locale} />
      </main>
      <HomeFooter locale={locale} />
      <FloatingActions />
      <AnnouncementModal content={home.announcement} locale={locale} />
    </ThemedShell>
  );
}
