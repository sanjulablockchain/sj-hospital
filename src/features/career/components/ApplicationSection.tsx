import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "./SectionHeading";
import { ApplicationForm } from "./ApplicationForm";
import type { CareerContent } from "../data/getContent";
import type { Locale } from "@/lib/i18n/locales";

/**
 * `#form`: the application form beside a panel saying where the application
 * goes and what happens to it.
 *
 * The section itself stays a Server Component; only `ApplicationForm` is a
 * client leaf, so nothing but the form and its action ships to the browser.
 */
export function ApplicationSection({ content, locale }: { content: CareerContent; locale: Locale }) {
  const {
    CAREERS_EMAIL,
    formNotes,
    applicationHeading,
    applicationAside,
    applicationSidebarHeading,
    applicationEmailPrompt,
    applicationEmailNote,
    sectionEyebrows,
  } = content;
  return (
    <section
      id="form"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <SectionHeading
        eyebrow={sectionEyebrows.form}
        heading={
          <>
            {applicationHeading.line1}
            <br />
            {applicationHeading.line2}
          </>
        }
        aside={applicationAside}
      />

      <Reveal>
        <div className="mt-10.5 grid grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
          <div className="bg-[var(--home-bg)] px-10 py-11 max-[640px]:px-6 max-[640px]:py-8">
            <ApplicationForm content={content} locale={locale} />
          </div>

          <aside className="flex min-w-0 flex-col bg-[var(--home-bg)] px-8.5 py-10 max-[640px]:px-6">
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
              {applicationSidebarHeading}
            </span>
            <ul className="mt-4.5 flex flex-col gap-3.5">
              {formNotes.map((note) => (
                <li
                  key={note}
                  className="flex gap-3 text-[15px] leading-[1.55] text-[var(--home-body)]"
                >
                  <span aria-hidden className="text-[var(--home-accent)]">
                    &#10022;
                  </span>
                  {note}
                </li>
              ))}
            </ul>

            <div className="mt-6.5 border-t border-[var(--home-hairline)] pt-5.5">
              <span className="font-display block text-[17px] font-bold tracking-[-0.02em] text-[var(--home-heading)]">
                {applicationEmailPrompt}
              </span>
              <a
                href={`mailto:${CAREERS_EMAIL}`}
                className="sj-link mt-2 inline-block text-[15px] font-semibold text-[var(--home-accent)]"
              >
                {CAREERS_EMAIL}
              </a>
              <p className="mt-2 text-[14px] leading-[1.55] text-[var(--home-muted)]">
                {applicationEmailNote}
              </p>
            </div>
          </aside>
        </div>
      </Reveal>
    </section>
  );
}
