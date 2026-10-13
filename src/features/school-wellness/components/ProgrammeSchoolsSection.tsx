import { RevealStagger } from "@/components/ui/RevealStagger";
import type { Locale } from "@/lib/i18n/locales";
import type { SchoolWellnessContent } from "../data/getContent";
import { SectionHead } from "./SectionHead";

/** The date locale each site locale formats "Updated …" in. */
const DATE_LOCALES: Record<Locale, string> = { en: "en-GB", si: "si-LK", ta: "ta-LK" };

/**
 * `#schools`: the schools in the Wellness Center Program, straight under the
 * jump cards so the first thing after the pitch is proof the programme runs.
 *
 * The three headline numbers are counted from `schools` here rather than
 * written into the copy, so updating a school's status in `data/schools.ts`
 * moves them too. The eyebrow is unnumbered on purpose: the page's eight
 * numbered sections keep their numbers.
 *
 * The stat strip uses the page's hairline grid (a 1px gap showing
 * `--home-hairline` through), the same as `#jump`. The card grid draws its
 * hairlines as borders instead, because the list rarely fills its last row
 * and a gap grid would paint the empty cells solid. Cards drop from
 * three columns to two at 1024px and to one at 640px. `min-w-0` and
 * `wrap-break-word` keep a long Sinhala or Tamil token inside a 360px card.
 */
export function ProgrammeSchoolsSection({
  content,
  locale,
}: {
  content: SchoolWellnessContent;
  locale: Locale;
}) {
  const { schools, schoolsCopy: copy, schoolsAsOf } = content.programme;
  const open = schools.filter((s) => s.status === "open").length;
  const stats = [
    { n: schools.length, label: copy.stats.total },
    { n: open, label: copy.stats.open },
    { n: schools.length - open, label: copy.stats.joining },
  ];
  // Wide letter spacing pulls Sinhala and Tamil apart into loose glyphs, so
  // the small caps labels are tracked in English only.
  const label = locale === "en" ? "tracking-[0.16em] uppercase" : "tracking-normal";
  const updated = new Intl.DateTimeFormat(DATE_LOCALES[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(schoolsAsOf));

  return (
    <section
      id="schools"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <SectionHead
        eyebrow={copy.eyebrow}
        heading={
          <>
            {copy.heading.line1}
            <br />
            {copy.heading.line2}
          </>
        }
        intro={copy.intro}
      />

      <dl className="mt-12 grid grid-cols-3 gap-px bg-[var(--home-hairline)] max-[640px]:grid-cols-1">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex min-w-0 flex-col-reverse gap-2 bg-[var(--home-surface)] px-6 py-6"
          >
            <dt className={`text-[11.5px] font-bold text-[var(--home-muted)] ${label}`}>
              {stat.label}
            </dt>
            <dd className="font-display text-[clamp(40px,4.4vw,60px)] leading-none font-extrabold tracking-[-0.04em] text-[var(--home-accent)] tabular-nums">
              {String(stat.n).padStart(2, "0")}
            </dd>
          </div>
        ))}
      </dl>

      <RevealStagger
        stepMs={60}
        className="grid grid-cols-3 border-l border-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1"
      >
        {schools.map((school) => {
          const joining = school.status === "joining";
          return (
            <article
              key={school.name}
              className="flex min-w-0 flex-col gap-3.5 border-r border-b border-[var(--home-hairline)] bg-[var(--home-bg)] px-6 py-6"
            >
              <span
                className={`${label} ${
                  joining
                    ? "self-start border border-[var(--home-accent)] px-2.5 py-1 text-[11px] font-bold text-[var(--home-accent)]"
                    : "self-start bg-[var(--home-accent)] px-2.5 py-1 text-[11px] font-bold text-[var(--home-on-accent)]"
                }`}
              >
                {joining ? copy.status.joining : copy.status.open}
              </span>
              <h3 className="font-display wrap-break-word text-[21px] leading-[1.15] font-bold tracking-[-0.02em] text-[var(--home-heading)]">
                {school.name}
              </h3>
              {(school.done.length > 0 || school.next) && (
                <ul className="flex flex-col gap-1.5">
                  {school.done.map((line) => (
                    <li
                      key={line}
                      className="flex gap-2.5 text-[14.5px] leading-[1.5] text-[var(--home-body)]"
                    >
                      <span aria-hidden className="text-[var(--home-accent)]">
                        &#10003;
                      </span>
                      <span className="min-w-0 wrap-break-word">{line}</span>
                    </li>
                  ))}
                  {school.next && (
                    <li className="flex gap-2.5 text-[14.5px] leading-[1.5] text-[var(--home-muted)]">
                      <span aria-hidden className="text-[var(--home-accent)]">
                        &#8594;
                      </span>
                      <span className="min-w-0 wrap-break-word">{school.next}</span>
                    </li>
                  )}
                </ul>
              )}
            </article>
          );
        })}
      </RevealStagger>

      <p className="mt-4 text-[13px] text-[var(--home-muted)]">
        {copy.updated} <time dateTime={schoolsAsOf}>{updated}</time>
      </p>
    </section>
  );
}
