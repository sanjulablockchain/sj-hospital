import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { serviceBookFooterColumns } from "@/config/serviceBookNavigation";
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";
import { chapters } from "../data/chapters";
import { getServiceBookContent } from "../data/getContent";
import { bookPages } from "../data/pages";
import { pageImages } from "../data/pageImages";
import { BookViewer } from "./BookViewer";
import { ChapterGuide } from "./ChapterGuide";
import { ServiceBookHero } from "./ServiceBookHero";

/**
 * The Service Book page: hero, the reader with the edition note under it,
 * and the chapter guide. The copy is fetched once here and handed down, so
 * this is the only component on the route that knows its language.
 */
export async function ServiceBookPage({ locale }: { locale: Locale }) {
  const content = await getServiceBookContent(locale);
  const { sectionEyebrows, readHeading, editionNote, editionLinks, viewer, download, hero } = content;

  return (
    <>
      <main>
        <ServiceBookHero content={content} />

        <section id="read" className="scroll-mt-20">
          <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-24 sm:px-8 lg:px-11">
            <Reveal>
              <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent-soft)] uppercase">
                {sectionEyebrows.read}
              </div>
              <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(34px,3.8vw,54px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-[var(--home-heading)] uppercase">
                {readHeading}
              </h2>
            </Reveal>

            <div className="mt-9">
              <BookViewer
                labels={viewer}
                download={{ label: hero.downloadCta, href: download.href, size: download.size }}
                chapters={chapters}
                pages={bookPages}
                images={pageImages}
              />
            </div>

            <div className="mt-10 border-l-2 border-[var(--home-accent)] bg-[var(--home-accent-tint-soft)] px-5 py-4.5 sm:px-6">
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
          </div>
        </section>

        <ChapterGuide content={content} />
      </main>
      <ThemedFooter
        columns={translateFooterColumns(serviceBookFooterColumns, locale)}
        reachUsLabel={navLabel("Reach us", locale)}
        id="contact"
      />
    </>
  );
}
