import { ServiceHero } from "./detail/ServiceHero";
import { ServicePicker } from "./detail/ServicePicker";
import { AboutSection } from "./detail/AboutSection";
import { JourneySection } from "./detail/JourneySection";
import { TeamSection } from "./detail/TeamSection";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { RelatedSection } from "./detail/RelatedSection";
import { DetailBookSection } from "./detail/DetailBookSection";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { servicesFooterColumns } from "@/config/servicesNavigation";
import type { Service } from "@/features/services/types";

// The complete per-service detail page: hero, the all-services picker, then
// the eight remaining sections (about, journey, team, faq, related, book)
// and the shared services footer.
export function ServiceDetailPage({ service }: { service: Service }) {
  return (
    <>
      <main>
        <ServiceHero service={service} />
        <ServicePicker current={service.slug} />
        <AboutSection service={service} />
        <JourneySection service={service} />
        <TeamSection service={service} />
        <FaqAccordion faq={service.faq} heading="Asked before you ask" />
        <RelatedSection slug={service.slug} />
        <DetailBookSection service={service} />
      </main>
      <ThemedFooter columns={servicesFooterColumns} id="contact" />
    </>
  );
}
