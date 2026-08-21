"use client";

import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { GROUPS } from "@/features/services/data/groups";
import type { Service } from "@/features/services/types";

type ServiceDirectoryProps = {
  services: Service[];
  counts: Record<string, number>;
};

// The first row (or a filter's freshly mounted first row) opens by default —
// the user never clicked it. If height were measured in a plain `useEffect`,
// the browser paints one frame at max-height 0 *before* that effect runs,
// then the panel visibly grows to full height over the 550ms transition on
// load. Measuring before paint instead means that frame never happens: a CSS
// transition only plays between two values the browser has already painted,
// so a row's first-ever paint (mount) never animates no matter what value is
// set during it — only a later, genuine open/close (which does have a prior
// painted frame) transitions. `useLayoutEffect` does nothing on the server
// and only logs a warning there, so it's aliased to the ordinary effect
// during the framework's server render pass and left as the real
// pre-paint effect in the browser.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * `#directory`: the page's only client component and its only stateful piece —
 * a group filter paired with a one-open-row-at-a-time accordion over the full
 * catalog. Data arrives as props (`services`, `counts`) rather than being
 * pulled from `data/services` here, so the rest of the page — and this
 * component's client bundle — never has to import that module's server-side
 * helpers.
 */
export function ServiceDirectory({ services, counts }: ServiceDirectoryProps) {
  const [filter, setFilter] = useState<(typeof GROUPS)[number]>("All");
  const [open, setOpen] = useState(0);
  const baseId = useId();

  const shown = filter === "All" ? services : services.filter((service) => service.group === filter);
  const heading = filter === "All" ? "Everything we treat" : `${filter} services`;

  const selectFilter = (group: (typeof GROUPS)[number]) => {
    setFilter(group);
    setOpen(0);
  };

  return (
    <section id="directory" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          02 / Full directory
        </div>
        <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
          {heading}
        </h2>
        <p aria-live="polite" className="mt-4 text-[14px] font-bold tabular-nums text-[var(--home-muted)]">
          {shown.length} of {services.length} services
        </p>
      </Reveal>

      <Reveal className="mt-8">
        <div
          role="group"
          aria-label="Filter services by group"
          className="flex flex-nowrap gap-2.5 overflow-x-auto pb-1 min-[1024px]:flex-wrap min-[1024px]:overflow-visible"
        >
          {GROUPS.map((group) => {
            const isActive = filter === group;
            return (
              <button
                key={group}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectFilter(group)}
                className={`shrink-0 border px-4.5 py-2.5 text-[13.5px] font-bold whitespace-nowrap transition-colors duration-300 ${
                  isActive
                    ? "border-transparent bg-[var(--home-accent)] text-[var(--home-on-accent)]"
                    : "border-[var(--home-hairline-strong)] text-[var(--home-heading)] hover:border-[var(--home-accent)]"
                }`}
              >
                {group} ({counts[group]})
              </button>
            );
          })}
        </div>
      </Reveal>

      <RevealStagger stepMs={35} className="mt-10 flex flex-col gap-px bg-[var(--home-hairline)]">
        {shown.map((service, index) => (
          <DirectoryRow
            key={service.slug}
            service={service}
            index={index}
            isOpen={open === index}
            onToggle={() => setOpen((current) => (current === index ? -1 : index))}
            idPrefix={`${baseId}-${index}`}
          />
        ))}
      </RevealStagger>
    </section>
  );
}

type DirectoryRowProps = {
  service: Service;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  idPrefix: string;
};

function DirectoryRow({ service, index, isOpen, onToggle, idPrefix }: DirectoryRowProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Measure the panel's natural content height instead of hard-coding a cap:
  // the reference used a fixed 700px, but several services here carry more
  // tags and facts than the reference's did, and a fixed cap would clip real
  // clinical information. ResizeObserver watches the *inner* content node
  // (never itself clipped by the animated wrapper's max-height/overflow), so
  // it keeps reporting the true height even while the row is collapsed —
  // covering both the open/close transition and any reflow from a resize.
  // Runs pre-paint (see useIsomorphicLayoutEffect above) so a row that's
  // already open on mount never flashes collapsed first.
  useIsomorphicLayoutEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const measure = () => setContentHeight(node.scrollHeight);
    measure();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const buttonId = `${idPrefix}-trigger`;
  const panelId = `${idPrefix}-panel`;
  const orderLabel = String(index + 1).padStart(2, "0");

  return (
    <div className="bg-[var(--home-bg)]">
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="grid w-full grid-cols-[50px_1fr_34px] items-center gap-4 px-1 py-6 text-left min-[900px]:grid-cols-[64px_1fr_auto_34px]"
      >
        {/* Decorative ordinal only — aria-hidden so the row's accessible name
            starts with the service name, not a leading "01". */}
        <span aria-hidden className="text-[13px] font-bold text-[var(--home-accent)] tabular-nums">
          /{orderLabel}
        </span>
        <span className="font-display text-[clamp(18px,1.8vw,23px)] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
          {service.directoryTitle}
        </span>
        <span className="hidden text-[13px] font-bold tracking-[0.05em] text-[var(--home-muted)] uppercase min-[900px]:block">
          {service.hours}
        </span>
        <span
          aria-hidden
          className={`flex h-8.5 w-8.5 items-center justify-center border border-[var(--home-hairline-strong)] text-[18px] leading-none font-bold text-[var(--home-heading)] transition-transform duration-[350ms] ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      {/* A collapsed panel must be unreachable by keyboard and screen reader,
          but `hidden` sets display:none, which cannot be transitioned — so the
          expand/collapse would just snap. Instead the height/opacity animation
          runs on max-height + opacity, and `inert` is what actually removes the
          panel from the tab order and the accessibility tree while collapsed
          (a zero max-height with overflow-hidden hides it visually, but does
          NOT by itself stop a keyboard user from tabbing into the links and
          buttons inside). `aria-hidden` is kept alongside `inert` for older
          assistive tech that doesn't yet honour `inert`'s AT semantics. */}
      <div
        id={panelId}
        aria-hidden={!isOpen}
        inert={!isOpen}
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : "0px",
          transitionProperty: "max-height, opacity",
          transitionDuration: "550ms, 400ms",
          transitionTimingFunction: "cubic-bezier(0.2,0.8,0.2,1), ease",
        }}
        className={`overflow-hidden ${isOpen ? "opacity-100" : "opacity-0"}`}
      >
        <div ref={contentRef} className="px-1 pb-8">
          <p className="max-w-[62ch] text-[15px] leading-[1.65] text-[var(--home-muted)]">{service.desc}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <li
                key={tag}
                className="border border-[var(--home-hairline-strong)] px-3 py-1.5 text-[12.5px] font-bold text-[var(--home-heading)]"
              >
                {tag}
              </li>
            ))}
          </ul>

          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 min-[640px]:grid-cols-2">
            {service.facts.map((fact) => (
              <Fact key={fact.k} k={fact.k} v={fact.v} />
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#book"
              className="sj-invert inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
            >
              {service.cta} <span aria-hidden>&rarr;</span>
            </a>
            <Link
              href={`/services/${service.slug}`}
              className="inline-flex items-center gap-2 text-[14px] font-bold text-[var(--home-accent)]"
            >
              Read more about {service.title} <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Fact({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--home-hairline)] pb-2">
      <dt className="text-[13px] text-[var(--home-muted)]">{k}</dt>
      <dd className="text-right text-[13.5px] font-bold text-[var(--home-heading)]">{v}</dd>
    </div>
  );
}
