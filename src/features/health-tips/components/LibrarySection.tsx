"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { Article, Category, FeaturedArticle } from "../types";

type LibrarySectionCopy = {
  eyebrow: string;
  allHeading: string;
  filterAriaLabel: string;
  /** "{shown} of {total} articles": both counts are substituted, never split. */
  countTemplate: string;
  takeAwayHeading: string;
};

type LibrarySectionProps = {
  categories: readonly Category[];
  /**
   * Display text for each category, keyed by the same English structural
   * value `categories`, `article.tag` and `featured.tag` carry. Neither
   * `categories` nor a `tag` is ever displayed directly: the English value is
   * only ever used to filter and to look up its label here, which is what
   * lets it stay untranslated (`counts` is keyed by it too) while the reader
   * still sees a translated word.
   */
  categoryLabels: Record<Category, string>;
  articles: Article[];
  counts: Record<Category, number>;
  featured: FeaturedArticle;
  featuredKicker: string;
  copy: LibrarySectionCopy;
};

/**
 * `#library`: the category filter over the article summaries. Data arrives as
 * props rather than being imported here, so the client bundle carries only the
 * strings it renders and not the `categoryCounts` helper alongside them: the
 * same arrangement `ServiceDirectory` uses.
 *
 * The cards are not links. There are no article pages behind these summaries
 * yet, and the reference did not link them either; a card that looks clickable
 * and goes nowhere is worse than one that plainly does not. When articles get
 * their own routes, add a slug to the data and wrap the card in a `Link`.
 */
export function LibrarySection({
  categories,
  categoryLabels,
  articles,
  counts,
  featured,
  featuredKicker,
  copy,
}: LibrarySectionProps) {
  const [filter, setFilter] = useState<Category>("All");

  const shown = filter === "All" ? articles : articles.filter((a) => a.tag === filter);
  const heading = filter === "All" ? copy.allHeading : categoryLabels[filter];
  const countText = copy.countTemplate
    .replace("{shown}", String(shown.length))
    .replace("{total}", String(articles.length));

  return (
    <section id="library" className="mx-auto max-w-[1440px] px-5 pt-18.5 sm:px-8 min-[641px]:pt-26 lg:px-11">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="min-w-0">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              {copy.eyebrow}
            </div>
            <h2 className="font-display mt-4.5 wrap-break-word text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              {heading}
            </h2>
          </div>
          <p
            aria-live="polite"
            className="text-[13px] tracking-[0.12em] text-[var(--home-muted)] uppercase tabular-nums"
          >
            {countText}
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <div
          role="group"
          aria-label={copy.filterAriaLabel}
          className="flex flex-nowrap gap-2.5 overflow-x-auto pb-1.5 min-[1025px]:flex-wrap min-[1025px]:overflow-visible"
        >
          {categories.map((category) => {
            const isActive = filter === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(category)}
                className={`shrink-0 border px-4.75 py-3 text-[13.5px] font-bold whitespace-nowrap transition-colors duration-300 ${
                  isActive
                    ? "border-transparent bg-[var(--home-accent)] text-[var(--home-on-accent)]"
                    : "border-[var(--home-hairline-strong)] text-[var(--home-heading)] hover:border-[var(--home-accent)]"
                }`}
              >
                {categoryLabels[category]} ({counts[category]})
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="mt-7.5">
        <article className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
          <div className="min-w-0 bg-[var(--home-accent)] px-9.5 py-10 text-[var(--home-on-accent)]">
            <p className="wrap-break-word text-[11.5px] font-bold tracking-[0.2em] uppercase opacity-[0.68]">
              {categoryLabels[featured.tag]} &middot; {featuredKicker}
            </p>
            <h3 className="font-display mt-4 max-w-[24ch] wrap-break-word text-[clamp(30px,3.6vw,50px)] leading-[0.96] font-extrabold tracking-[-0.035em] uppercase">
              {featured.title}
            </h3>
            <p className="mt-4.5 max-w-[54ch] wrap-break-word text-[17px] leading-[1.6] opacity-[0.85]">
              {featured.lede}
            </p>
            <p className="mt-6.5 flex flex-wrap gap-5 text-[13px] font-bold tracking-[0.12em] uppercase opacity-[0.7]">
              <span className="wrap-break-word">{featured.by}</span>
              <span className="wrap-break-word">{featured.read}</span>
            </p>
          </div>
          <div className="flex min-w-0 flex-col bg-[var(--home-bg)] px-7.5 py-8.5">
            <h4 className="wrap-break-word text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
              {copy.takeAwayHeading}
            </h4>
            <ul className="mt-4.5 flex flex-col gap-3.25">
              {featured.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-[15.5px] leading-[1.5] text-[var(--home-body)]"
                >
                  <span className="shrink-0 text-[var(--home-accent)]" aria-hidden>
                    &#10022;
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </Reveal>

      {/* `key` on the grid remounts it when the filter changes, so the stagger
          replays over the new set instead of leaving fresh cards invisible
          (RevealStagger only arms and reveals once per mount). */}
      <RevealStagger
        key={filter}
        stepMs={40}
        className="mt-px grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[641px]:grid-cols-2 min-[1025px]:grid-cols-3"
      >
        {shown.map((article) => (
          <article
            key={article.title}
            className="group flex min-h-[268px] min-w-0 flex-col bg-[var(--home-bg)] px-6.5 pt-7.5 pb-7 transition-[background-color,transform] duration-[450ms] hover:-translate-y-1.5 hover:bg-[rgba(44,166,240,0.1)] motion-reduce:transform-none"
          >
            <p className="wrap-break-word text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
              {categoryLabels[article.tag]}
            </p>
            <h3 className="font-display mt-3.5 wrap-break-word text-[25px] leading-[1.06] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
              {article.title}
            </h3>
            <p className="mt-3 wrap-break-word text-[15px] leading-[1.55] text-[var(--home-muted)]">
              {article.lede}
            </p>
            {/* The byline slides up on hover in the reference. It must stay
                readable without hover (touch, keyboard), so it is only faded
                on devices that actually have a hover-capable pointer. */}
            <p className="mt-auto pt-4.5 wrap-break-word text-[13.5px] font-bold text-[var(--home-accent-soft)] transition-[opacity,transform] duration-[450ms] motion-reduce:transform-none [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
              {article.by}
            </p>
          </article>
        ))}
      </RevealStagger>
    </section>
  );
}
