import Image from "next/image";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { chapters } from "../data/chapters";
import type { ServiceBookContent } from "../data/getContent";
import { pageImages } from "../data/pageImages";
import { formatPageHash } from "../lib/pageHash";

/**
 * `#inside`: the six chapters as cards, each with its opening page, a
 * summary in real text (the pages themselves are flattened artwork, so this
 * is what search engines and screen readers get), a way into the reader at
 * that chapter, and the live page on this site that covers the same ground.
 */
export function InsideTheBook({ content }: { content: ServiceBookContent }) {
  const { sectionEyebrows, insideHeading, insideIntro, chapterGuide, openInBookCta, reader } = content;
  return (
    <section id="inside" className="scroll-mt-20">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-16 sm:px-8 lg:px-11">
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

        <RevealStagger stepMs={70} className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {chapterGuide.map((entry) => {
            const chapter = chapters.find((item) => item.id === entry.id)!;
            const readHref = `/service-book/read${formatPageHash(chapter.first)}`;
            return (
              <article
                key={entry.id}
                className="flex flex-col overflow-hidden rounded-[10px] border border-[var(--home-hairline)] bg-[var(--home-surface)]"
              >
                <LocaleLink href={readHref} className="group relative block aspect-[2000/1414] overflow-hidden">
                  <Image
                    src={pageImages[chapter.first - 1]}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1440px) 450px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                  <span className="sr-only">
                    {openInBookCta}: {chapter.label}
                  </span>
                </LocaleLink>
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-[12px] font-bold tracking-[0.16em] text-[var(--home-muted)] uppercase tabular-nums">
                    {reader.chapterPages
                      .replace("{first}", String(chapter.first))
                      .replace("{last}", String(chapter.last))}
                  </div>
                  <h3 className="font-display mt-2 text-[22px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
                    {chapter.label}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-[var(--home-body)]">{entry.summary}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <LocaleLink
                      href={readHref}
                      className="inline-flex min-h-11 items-center rounded-full bg-[var(--home-accent)] px-5 text-[14px] font-bold text-[var(--home-on-accent)] transition-colors hover:bg-[var(--home-accent-hover)]"
                    >
                      {openInBookCta}
                    </LocaleLink>
                    <LocaleLink
                      href={entry.href}
                      className="inline-flex min-h-11 items-center text-[14px] font-bold text-[var(--home-heading)] underline-offset-4 hover:underline"
                    >
                      {entry.linkLabel}
                    </LocaleLink>
                  </div>
                </div>
              </article>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
