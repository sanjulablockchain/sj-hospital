import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { chapters } from "../data/chapters";
import type { ServiceBookContent } from "../data/getContent";
import { formatPageHash } from "../lib/pageHash";

/**
 * `#inside`: each chapter in a sentence, as real text. The pages are
 * flattened artwork, so this is what a screen reader and a search engine get
 * of the book's substance. "Open in the book" is a plain `#page-N` anchor;
 * `BookViewer` listens for the hash change and turns to that page.
 */
export function ChapterGuide({ content }: { content: ServiceBookContent }) {
  const { sectionEyebrows, insideHeading, insideIntro, chapterGuide, openInBookCta } = content;
  return (
    <section id="inside" className="bg-[var(--home-surface-2)]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-11">
        <Reveal>
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent-soft)] uppercase">
            {sectionEyebrows.inside}
          </div>
          <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(34px,3.8vw,54px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-[var(--home-heading)] uppercase">
            {insideHeading}
          </h2>
          <p
            className="mt-5 max-w-[62ch] text-[16.5px] leading-[1.65] text-[var(--home-body)]"
            style={{ textWrap: "pretty" }}
          >
            {insideIntro}
          </p>
        </Reveal>
        <RevealStagger
          stepMs={70}
          className="mt-11.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] sm:grid-cols-2 lg:grid-cols-3"
        >
          {chapterGuide.map((entry) => {
            const chapter = chapters.find((item) => item.id === entry.id)!;
            return (
              <article key={entry.id} className="flex flex-col bg-[var(--home-surface-2)] p-7.5">
                <div className="text-[12px] font-bold tracking-[0.16em] text-[var(--home-muted)] uppercase tabular-nums">
                  {chapter.first} to {chapter.last}
                </div>
                <h3 className="font-display mt-2.5 text-[22px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
                  {chapter.label}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-[var(--home-body)]">{entry.summary}</p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  <a
                    href={formatPageHash(chapter.first)}
                    className="inline-flex min-h-11 items-center text-[14px] font-bold text-[var(--home-accent)] underline-offset-4 hover:underline"
                  >
                    {openInBookCta}
                  </a>
                  <LocaleLink
                    href={entry.href}
                    className="inline-flex min-h-11 items-center text-[14px] font-bold text-[var(--home-heading)] underline-offset-4 hover:underline"
                  >
                    {entry.linkLabel}
                  </LocaleLink>
                </div>
              </article>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
