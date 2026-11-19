import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { serviceBookFooterColumns } from "@/config/serviceBookNavigation";
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";
import { getServiceBookContent } from "../data/getContent";
import { InsideTheBook } from "./InsideTheBook";
import { ServiceBookHero } from "./ServiceBookHero";

/**
 * The Service Book's intro page, and the printed QR code's target: hero
 * ("Read now" opens the reader), the six chapters, and the edition note.
 * Reading itself happens in the full screen reader at `/service-book/read`.
 * The copy is fetched once here and handed down, so this is the only
 * component on the route that knows its language.
 */
export async function ServiceBookPage({ locale }: { locale: Locale }) {
  const content = await getServiceBookContent(locale);
  const { editionNote, editionLinks } = content;

  return (
    <>
      <main>
        <ServiceBookHero content={content} />
        <InsideTheBook content={content} />

        <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:px-11">
          <div className="border-l-2 border-[var(--home-accent)] bg-[var(--home-accent-tint-soft)] px-5 py-4.5 sm:px-6">
            <p className="max-w-[78ch] text-[15px] leading-[1.6] text-[var(--home-body)]">{editionNote}</p>
            <div className="mt-2 flex flex-wrap gap-x-6">
              {editionLinks.map((link) => (
                <LocaleLink
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-[14px] font-bold text-[var(--home-accent)] underline-offset-4 hover:underline"
                >
                  {link.linkLabel}
                </LocaleLink>
              ))}
            </div>
          </div>
        </section>
      </main>
      <ThemedFooter
        columns={translateFooterColumns(serviceBookFooterColumns, locale)}
        reachUsLabel={navLabel("Reach us", locale)}
        id="contact"
      />
    </>
  );
}
