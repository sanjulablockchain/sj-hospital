import { notFound } from "next/navigation";
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
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import { getServicesContent, findService, relatedInCatalog } from "@/features/services/data/getContent";
import type { Locale } from "@/lib/i18n/locales";

/**
 * The complete per-service detail page: hero, the all-services picker, then
 * the eight remaining sections (about, journey, team, faq, related, book)
 * and the shared services footer.
 *
 * This is the feature's async, locale-aware top-level Page component for the
 * dynamic route (the same role `CareersPage`/`MediaPage` play for their own
 * routes): it fetches the localized catalog once via `getServicesContent`,
 * resolves `slug` against it, and hands the resolved `service` and `content`
 * down as props. `notFound()` runs here rather than in the route's
 * `page.tsx` so `generateStaticParams` (which reads the never-translated
 * `serviceSlugs` from `services.ts`) stays the only place slug lookups for
 * routing happen; this page's own lookup is purely for rendering.
 */
export async function ServiceDetailPage({ slug, locale }: { slug: string; locale: Locale }) {
  const content = await getServicesContent(locale);
  const service = findService(content.services, slug);
  if (!service) notFound();

  const related = relatedInCatalog(content.services, slug);

  return (
    <>
      <main>
        <ServiceHero service={service} content={content} locale={locale} />
        <ServicePicker
          services={content.services}
          current={service.slug}
          ariaLabel={content.indexContent.allServicesLabel}
          locale={locale}
        />
        <AboutSection service={service} content={content} />
        <JourneySection service={service} content={content} />
        <TeamSection service={service} content={content} />
        <FaqAccordion faq={service.faq} heading={content.indexContent.detailChrome.faqHeading} />
        <RelatedSection related={related} content={content} />
        <DetailBookSection service={service} content={content} />
      </main>
      <ThemedFooter
        columns={translateFooterColumns(servicesFooterColumns, locale)}
        reachUsLabel={navLabel("Reach us", locale)}
        id="contact"
      />
    </>
  );
}
