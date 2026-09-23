import { ThemedShell } from "@/components/layout/ThemedShell";
import { FloatingActions } from "@/components/layout/FloatingActions";
import type { Locale } from "@/lib/i18n/locales";
import { services } from "@/features/services";
import { getHomeContent } from "../data/getContent";
import { HeroSection } from "./HeroSection";
import { QuickAccessSection } from "./QuickAccessSection";
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
      </main>
      <FloatingActions />
      <AnnouncementModal content={home.announcement} locale={locale} />
    </ThemedShell>
  );
}
