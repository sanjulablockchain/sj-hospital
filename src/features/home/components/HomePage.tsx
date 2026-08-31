import { ThemedShell } from "@/components/layout/ThemedShell";
import { FloatingActions } from "@/components/layout/FloatingActions";
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

export function HomePage() {
  return (
    <ThemedShell flowHeader>
      <main>
        <HeroSection />
        <WhoWeAreSection />
        <ServicesBentoSection />
        <SurgicalSection />
        <FacilitiesSection />
        <PharmacySection />
        <HomeCareSection />
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
    </ThemedShell>
  );
}
