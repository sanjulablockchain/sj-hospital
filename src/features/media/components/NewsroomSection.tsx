"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { NewsCategory } from "../types";
import type { MediaContent } from "../data/getContent";

/** "All" is not a tag any item carries, so it is kept separate from the union. */
type Filter = NewsCategory | "All";

/**
 * `#newsroom`: the featured release, a category filter, and the item grid.
 *
 * The page's one Client Component, and the only reason it is one: the filter is
 * the single piece of state on /media. Everything above and below it stays a
 * Server Component, which is why this is a leaf rather than a wrapper around
 * the rest of the page.
 *
 * The featured release sits above the filter and is deliberately not filtered
 * out by it, matching the reference: it is the desk's current lead story, not
 * a member of the list.
 *
 * Counts on the chips come from the data, so a chip can never advertise a
 * category that has emptied out. `content.test.ts` asserts none of them is
 * empty in the first place.
 *
 * `content` arrives as a prop, built by the Server Component parent
 * (`MediaPage`) from the already localized data, rather than importing
 * `../data/content` here: importing that module into a Client Component
 * would pull all three locales' copy into the browser bundle.
 *
 * `newsCategories` stays the structural filter key every `NewsCategory`
 * comparison and this component's own `filter` state runs on: translating it
 * would silently break every chip's `===` check the moment a Sinhala or
 * Tamil reader clicked one. `categoryLabels` is the translated word actually
 * shown for each of those same six categories, so every chip, the active
 * heading and each card's own badge read it rather than the bare `tag`.
 */
export function NewsroomSection({ content }: { content: MediaContent }) {
  const { featured, news, newsCategories, categoryLabels, newsroomCopy, sectionEyebrows } = content;
  const [filter, setFilter] = useState<Filter>("All");

  const shown = useMemo(
    () => (filter === "All" ? news : news.filter((item) => item.tag === filter)),
    [filter, news],
  );

  const filters: Filter[] = ["All", ...newsCategories];

  const filterLabel = (label: Filter) => (label === "All" ? newsroomCopy.allLabel : categoryLabels[label]);

  const itemsCount = newsroomCopy.itemsCountTemplate
    .replace("{shown}", String(shown.length))
    .replace("{total}", String(news.length));

  return (
    <section id="newsroom" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18.5">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="min-w-0">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              {sectionEyebrows.newsroom}
            </div>
            <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              {filter === "All" ? newsroomCopy.headingAll : filterLabel(filter)}
            </h2>
          </div>
          {/* Polite rather than assertive: the count is useful confirmation
              that a chip did something, but it must not interrupt. */}
          <span
            aria-live="polite"
            className="text-[13px] tracking-[0.12em] text-[var(--home-muted)] uppercase"
          >
            {itemsCount}
          </span>
        </div>
      </Reveal>

      {/* Scrolls sideways rather than wrapping below 1024px, per the
          reference's own `[data-r="chiprow"]` rule. */}
      <Reveal className="mt-8 flex flex-wrap gap-2.5 max-[1023px]:flex-nowrap max-[1023px]:overflow-x-auto max-[1023px]:pb-1.5">
        {filters.map((label) => {
          const isActive = label === filter;
          const count = label === "All" ? news.length : news.filter((n) => n.tag === label).length;
          return (
            <button
              key={label}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(label)}
              className={`sj-invert border px-4.75 py-3 text-[13.5px] font-bold whitespace-nowrap ${
                isActive
                  ? "border-[var(--home-accent)] bg-[var(--home-accent)] text-[var(--home-on-accent)]"
                  : "border-[var(--home-hairline-strong)] text-[var(--home-heading)]"
              }`}
            >
              {filterLabel(label)} ({count})
            </button>
          );
        })}
      </Reveal>

      <Reveal className="mt-7.5 grid gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
        <div className="bg-[var(--home-accent)] px-9.5 pt-10 pb-9.5 text-[var(--home-on-accent)]">
          <span className="text-[11.5px] font-bold tracking-[0.2em] uppercase opacity-68">
            {featured.kickerDate} &middot; {featured.type}
          </span>
          <h3 className="font-display mt-4 max-w-[26ch] text-[clamp(30px,3.6vw,50px)] leading-[0.96] font-extrabold tracking-[-0.035em] uppercase">
            {featured.title}
          </h3>
          <p className="mt-4.5 max-w-[58ch] text-[17px] leading-[1.6] opacity-85">
            {featured.lede}
          </p>
          <div className="mt-6.5 flex flex-wrap gap-5 text-[13px] font-bold tracking-[0.12em] uppercase opacity-70">
            <span>{featured.date}</span>
            <span>{featured.type}</span>
          </div>
        </div>

        <div className="flex flex-col bg-[var(--home-bg)] px-7.5 py-8.5">
          <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
            {newsroomCopy.forJournalists}
          </span>
          <ul className="mt-4.5 flex flex-col gap-3.25">
            {featured.points.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-[15.5px] leading-[1.5] text-[var(--home-body)]"
              >
                <span aria-hidden className="text-[var(--home-accent)]">
                  &#10022;
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* `mt-px`, not a gap: the grid's own hairline background continues the
          one above it, so the featured block and the first row of tiles are
          separated by the same single line as every other pair of cards. */}
      <RevealStagger
        stepMs={60}
        className="mt-px grid grid-cols-3 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1"
      >
        {shown.map((item) => (
          <article
            key={item.title}
            className="sj-tint flex min-h-[272px] flex-col bg-[var(--home-bg)] px-6.5 pt-7.5 pb-7"
          >
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
              {categoryLabels[item.tag]}
            </span>
            <h3 className="font-display mt-3.5 text-[24px] leading-[1.07] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
              {item.title}
            </h3>
            <p className="mt-3 text-[14.5px] leading-[1.58] text-[var(--home-muted)]">
              {item.lede}
            </p>
            <span className="sj-hover-reveal mt-auto pt-4.5 text-[13px] font-bold tracking-[0.14em] text-[var(--home-accent-soft)] uppercase">
              {item.date}
            </span>
          </article>
        ))}
      </RevealStagger>
    </section>
  );
}
