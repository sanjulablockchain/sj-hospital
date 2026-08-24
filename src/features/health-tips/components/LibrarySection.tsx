"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { Article, Category, FeaturedArticle } from "../types";

type LibrarySectionProps = {
  categories: readonly Category[];
  articles: Article[];
  counts: Record<Category, number>;
  featured: FeaturedArticle;
  featuredKicker: string;
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
  articles,
  counts,
  featured,
  featuredKicker,
}: LibrarySectionProps) {
  const [filter, setFilter] = useState<Category>("All");

  const shown = filter === "All" ? articles : articles.filter((a) => a.tag === filter);
  const heading = filter === "All" ? "Everything worth reading" : filter;

  return (
    <section id="library" className="mx-auto max-w-[1440px] px-5 pt-18.5 sm:px-8 min-[641px]:pt-26 lg:px-11">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              01 / The library
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              {heading}
            </h2>
          </div>
          <p
            aria-live="polite"
            className="text-[13px] tracking-[0.12em] text-[var(--home-muted)] uppercase tabular-nums"
          >
            {shown.length} of {articles.length} articles
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-8">
        <div
          role="group"
          aria-label="Filter health tips by topic"
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
                {category} ({counts[category]})
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="mt-7.5">
        <article className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-[1.35fr_0.65fr]">
          <div className="bg-[var(--home-accent)] px-9.5 py-10 text-[var(--home-on-accent)]">
            <p className="text-[11.5px] font-bold tracking-[0.2em] uppercase opacity-[0.68]">
              {featured.tag} &middot; {featuredKicker}
            </p>
            <h3 className="font-display mt-4 max-w-[24ch] text-[clamp(30px,3.6vw,50px)] leading-[0.96] font-extrabold tracking-[-0.035em] uppercase">
              {featured.title}
            </h3>
            <p className="mt-4.5 max-w-[54ch] text-[17px] leading-[1.6] opacity-[0.85]">
              {featured.lede}
            </p>
            <p className="mt-6.5 flex flex-wrap gap-5 text-[13px] font-bold tracking-[0.12em] uppercase opacity-[0.7]">
              <span>{featured.by}</span>
              <span>{featured.read}</span>
            </p>
          </div>
          <div className="flex flex-col bg-[var(--home-bg)] px-7.5 py-8.5">
            <h4 className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
              Take away
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
            className="group flex min-h-[268px] flex-col bg-[var(--home-bg)] px-6.5 pt-7.5 pb-7 transition-[background-color,transform] duration-[450ms] hover:-translate-y-1.5 hover:bg-[rgba(44,166,240,0.1)] motion-reduce:transform-none"
          >
            <p className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
              {article.tag}
            </p>
            <h3 className="font-display mt-3.5 text-[25px] leading-[1.06] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
              {article.title}
            </h3>
            <p className="mt-3 text-[15px] leading-[1.55] text-[var(--home-muted)]">
              {article.lede}
            </p>
            {/* The byline slides up on hover in the reference. It must stay
                readable without hover (touch, keyboard), so it is only faded
                on devices that actually have a hover-capable pointer. */}
            <p className="mt-auto pt-4.5 text-[13.5px] font-bold text-[var(--home-accent-soft)] transition-[opacity,transform] duration-[450ms] motion-reduce:transform-none [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
              {article.by}
            </p>
          </article>
        ))}
      </RevealStagger>
    </section>
  );
}
