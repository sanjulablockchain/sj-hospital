import { ServiceHero } from "./detail/ServiceHero";
import { ServicePicker } from "./detail/ServicePicker";
import { AboutSection } from "./detail/AboutSection";
import { JourneySection } from "./detail/JourneySection";
import type { Service } from "@/features/services/types";

// The first four sections of a per-service detail page: hero, the
// all-services picker, the about split and the visit journey. Remaining
// sections (team, FAQ, related, book) land in Task 18.
export function ServiceDetailPage({ service }: { service: Service }) {
  return (
    <>
      <ServiceHero service={service} />
      <ServicePicker current={service.slug} />
      <AboutSection service={service} />
      <JourneySection service={service} />
    </>
  );
}
