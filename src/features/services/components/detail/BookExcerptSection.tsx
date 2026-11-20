import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import { formatPageHash } from "@/features/service-book";
import type { ServiceBookExcerpt } from "@/features/services/types";

/** The section's fixed labels; `eyebrow` and `read` carry a `{page}` token. */
export type BookExcerptLabels = { eyebrow: string; why: string; read: string };

/**
 * `#service-book`: what the hospital's printed 2026 Service Book says about a
 * service, on the page that service has on the site (and, for Super
 * Channelling, on /e-channeling). One printed page: its summary, its fact
 * rows and its "Why St. Joseph" points, then a link that opens the book
 * reader at that page (`/service-book/read#page-N`; reader page N is printed
 * page N).
 *
 * The facts grid stacks on a phone and sizes its columns from the number of
 * facts from 641px, so a two fact page and the four room prices both fill the
 * row without an empty cell.
 */
export function BookExcerptSection({
  excerpt,
  title,
  labels,
}: {
  excerpt: ServiceBookExcerpt;
  title: string;
  labels: BookExcerptLabels;
}) {
  const page = String(excerpt.page);

  return (
    <section id="service-book" className="mx-auto mt-30 max-w-[1440px] px-5 sm:px-8 lg:px-11">
      <Reveal className="border border-[var(--home-hairline)] px-6 py-10 sm:px-10 sm:py-12">
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          {labels.eyebrow.replace("{page}", page)}
        </div>
        <h2 className="font-display wrap-break-word mt-4 text-[clamp(30px,3.4vw,48px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-[var(--home-heading)] uppercase">
          {title}
        </h2>
        <p
          className="mt-5 max-w-[62ch] text-[17px] leading-[1.6] text-[var(--home-body)]"
          style={{ textWrap: "pretty" }}
        >
          {excerpt.summary}
        </p>

        <dl className="mt-8 grid grid-cols-1 gap-px border border-[var(--home-hairline)] bg-[var(--home-hairline)] min-[641px]:grid-flow-col min-[641px]:auto-cols-fr min-[641px]:grid-cols-none">
          {excerpt.facts.map((fact) => (
            <div key={fact.k} className="min-w-0 bg-[var(--home-bg)] px-5 py-4">
              <dt className="text-[11px] font-bold tracking-[0.16em] text-[var(--home-muted)] uppercase">{fact.k}</dt>
              <dd className="wrap-break-word mt-1.5 text-[16px] leading-[1.4] font-semibold text-[var(--home-heading)] tabular-nums">
                {fact.v}
              </dd>
            </div>
          ))}
        </dl>

        <h3 className="font-display mt-10 text-[19px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
          {labels.why}
        </h3>
        <ul className="mt-4 flex flex-col gap-2.5">
          {excerpt.why.map((point) => (
            <li key={point} className="flex gap-3 text-[15px] leading-[1.55] text-[var(--home-body)]">
              <span aria-hidden className="text-[var(--home-accent)]">
                &#10003;
              </span>
              {point}
            </li>
          ))}
        </ul>

        <LocaleLink
          href={`/service-book/read${formatPageHash(excerpt.page)}`}
          className="mt-9 inline-flex min-h-11 items-center gap-2.5 border border-[var(--home-hairline)] px-5 py-3 text-[14px] font-bold text-[var(--home-heading)] transition-colors hover:border-[var(--home-accent)] hover:text-[var(--home-accent)]"
        >
          {labels.read.replace("{page}", page)} <span aria-hidden>&rarr;</span>
        </LocaleLink>
      </Reveal>
    </section>
  );
}
