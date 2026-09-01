import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { channelingFooterColumns } from "@/config/channelingNavigation";
import type { Locale } from "@/lib/i18n/locales";
import { getEChannelingContent, getLocalizedDoctors } from "../data/getContent";
import { ChannelingHero } from "./ChannelingHero";
import { DirectorySection } from "./DirectorySection";
import { HelpSection } from "./HelpSection";

/**
 * The e-channeling page in source order: hero, then the directory (this
 * page's one job) and the closing help rail. No jump cards: a page with two
 * sections and one job has nothing worth four shortcuts to.
 *
 * The copy and the localized doctor list are both fetched once here and
 * handed down, rather than each section or DoctorDirectory importing the
 * English modules directly. That is what makes the page translatable: this
 * is the only component on the route that knows which language it is
 * rendering.
 */
export async function EChannelingPage({ locale }: { locale: Locale }) {
  const [content, doctors] = await Promise.all([
    getEChannelingContent(locale),
    getLocalizedDoctors(locale),
  ]);

  return (
    <>
      <main>
        <ChannelingHero content={content} />
        <DirectorySection content={content} doctors={doctors} />
        <HelpSection content={content} />
      </main>
      <ThemedFooter columns={channelingFooterColumns} id="footer" />
    </>
  );
}
