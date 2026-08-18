import { HomeThemeScript } from "./HomeThemeScript";
import { HomeThemeProvider } from "../hooks/useHomeTheme";
import { HeroSection } from "./HeroSection";
import { WhoWeAreSection } from "./WhoWeAreSection";
import { ServicesBentoSection } from "./ServicesBentoSection";
import { SurgicalSection } from "./SurgicalSection";
import { FacilitiesSection } from "./FacilitiesSection";
import { HomeFooter } from "./HomeFooter";
import { FloatingActions } from "./FloatingActions";

export function HomePage() {
  return (
    <div
      id="home-root"
      data-home
      data-theme="dark"
      suppressHydrationWarning
      className="min-h-screen bg-[var(--home-bg)] text-[var(--home-body)] antialiased"
    >
      <HomeThemeScript />
      <HomeThemeProvider>
        <main>
          <HeroSection />
          <WhoWeAreSection />
          <ServicesBentoSection />
          <SurgicalSection />
          <FacilitiesSection />
        </main>
        <HomeFooter />
        <FloatingActions />
      </HomeThemeProvider>
    </div>
  );
}
