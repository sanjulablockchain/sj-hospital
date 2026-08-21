import { ServiceHero } from "./detail/ServiceHero";
import { ServicePicker } from "./detail/ServicePicker";
import type { Service } from "@/features/services/types";

// The first two sections of a per-service detail page: hero and the
// all-services picker. Remaining sections land in Tasks 17-18.
export function ServiceDetailPage({ service }: { service: Service }) {
  return (
    <>
      <ServiceHero service={service} />
      <ServicePicker current={service.slug} />
    </>
  );
}
