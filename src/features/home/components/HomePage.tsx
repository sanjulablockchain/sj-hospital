import { ThemeScript } from "@/components/theme/ThemeScript";
import { SiteThemeProvider } from "@/components/theme/useSiteTheme";
import { HeroSection } from "./HeroSection";
import { WhoWeAreSection } from "./WhoWeAreSection";
import { ServicesBentoSection } from "./ServicesBentoSection";
import { SurgicalSection } from "./SurgicalSection";
import { FacilitiesSection } from "./FacilitiesSection";
import { PharmacySection } from "./PharmacySection";
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
import { FloatingActions } from "./FloatingActions";

export function HomePage() {
  return (
    <div
      id="sj-root"
      data-sj
      data-theme="dark"
      suppressHydrationWarning
      className="min-h-screen bg-[var(--home-bg)] text-[var(--home-body)] antialiased"
    >
      <ThemeScript />
      <SiteThemeProvider>
        <main>
          <HeroSection />
          <WhoWeAreSection />
          <ServicesBentoSection />
          <SurgicalSection />
          <FacilitiesSection />
          <PharmacySection />
          <RoomsSection />
          <InternationalCareSection />
          <HealthTipsSection />
          <SchoolWellnessSection />
          <NetworkSection />
          <MediaSection />
          <CareersSection />
          <TestimonialsSection />
          <ContactCtaSection />
        </main>
        <HomeFooter />
        <FloatingActions />
      </SiteThemeProvider>
    </div>
  );
}
