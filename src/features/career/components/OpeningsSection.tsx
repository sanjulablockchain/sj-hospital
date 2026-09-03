"use client";

import { useId, useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useMeasuredHeight } from "@/hooks/useMeasuredHeight";
import type { Job } from "../types";
import type { CareerContent } from "../data/getContent";

/**
 * `#openings`: the department chip row and the one-open-at-a-time list of
 * vacancies.
 *
 * Client, because the filter and the accordion are both interactive. It is the
 * only interactive section on the page besides the form, so the rest of the
 * page stays a Server Component.
 *
 * Unlike the shared `AccordionList`, each row here opens a two-column panel
 * (requirements and detail) plus an apply button rather than a single
 * paragraph, so the row markup is owned here. The height measurement is still
 * the shared `useMeasuredHeight`, so a long vacancy is never clipped.
 *
 * Changing the filter closes whatever was open: the open row is tracked by
 * `job.id` rather than by `job.title` or by index, so a translated title
 * (which changes per locale) or a stale index can never leave an unrelated
 * vacancy expanded after the list changes underneath it. Filtering itself
 * compares `job.department` against `content.departments`, both of which stay
 * fixed English strings in every locale; `content.departmentLabels` carries
 * the translated word shown on each chip and beside each open vacancy.
 *
 * i18n (Task 13): every string is read from the `content` prop rather than
 * imported, per the recipe's "client components take copy as a prop" rule.
 */
export function OpeningsSection({ content }: { content: CareerContent }) {
  const { departments, departmentLabels, jobs, sectionEyebrows, openings } = content;
  const [department, setDepartment] = useState("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  const visible = useMemo(
    () => (department === "All" ? jobs : jobs.filter((job) => job.department === department)),
    [department, jobs]
  );

  const countFor = (label: string) =>
    label === "All" ? jobs.length : jobs.filter((job) => job.department === label).length;

  const headingText = department === "All" ? openings.headingAllRoles : departmentLabels[department] ?? department;
  const positionsCount = openings.positionsCountTemplate
    .replace("{shown}", String(visible.length))
    .replace("{total}", String(jobs.length));

  return (
    <section
      id="openings"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="min-w-0">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              {sectionEyebrows.openings}
            </div>
            <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              {headingText}
            </h2>
          </div>
          <p
            aria-live="polite"
            className="text-[13px] tracking-[0.12em] text-[var(--home-muted)] uppercase"
          >
            {positionsCount}
          </p>
        </div>
      </Reveal>

      {/* Scrolls rather than wrapping below 1024px, per the reference's
          [data-r="chiprow"] rule, so the row never becomes three ragged lines. */}
      <Reveal>
        <div
          role="group"
          aria-label={openings.filterAriaLabel}
          className="no-scrollbar mt-8 flex flex-wrap gap-2.5 max-[1023px]:flex-nowrap max-[1023px]:overflow-x-auto max-[1023px]:pb-1.5"
        >
          {departments.map((label) => {
            const isActive = label === department;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setDepartment(label);
                  setOpenId(null);
                }}
                className={`border px-4.75 py-3 text-[13.5px] font-bold whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-[var(--home-accent)] bg-[var(--home-accent)] text-[var(--home-on-accent)]"
                    : "border-[var(--home-hairline-strong)] text-[var(--home-heading)] hover:border-[var(--home-accent)] hover:text-[var(--home-accent)]"
                }`}
              >
                {departmentLabels[label] ?? label} ({countFor(label)})
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="mt-7.5 border-t border-[var(--home-hairline)]">
        {visible.map((job) => (
          <JobRow
            key={job.id}
            job={job}
            departmentLabel={departmentLabels[job.department] ?? job.department}
            copy={openings}
            isOpen={openId === job.id}
            onToggle={() => setOpenId((current) => (current === job.id ? null : job.id))}
            idPrefix={`${baseId}-${job.id}`}
          />
        ))}
      </div>

      <p className="mt-5 max-w-[84ch] text-[14px] leading-[1.6] text-[var(--home-muted)]">
        {openings.emptyNote}
      </p>
    </section>
  );
}

type JobRowProps = {
  job: Job;
  departmentLabel: string;
  copy: CareerContent["openings"];
  isOpen: boolean;
  onToggle: () => void;
  idPrefix: string;
};

function JobRow({ job, departmentLabel, copy, isOpen, onToggle, idPrefix }: JobRowProps) {
  const { ref: contentRef, height: contentHeight } = useMeasuredHeight<HTMLDivElement>();

  const buttonId = `${idPrefix}-trigger`;
  const panelId = `${idPrefix}-panel`;

  return (
    <div className="border-b border-[var(--home-hairline)]">
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-5.5 py-6 pr-1.5 text-left"
      >
        <span className="flex flex-1 items-baseline justify-between gap-6 max-[899px]:flex-col max-[899px]:items-start max-[899px]:gap-3">
          <span className="flex min-w-0 flex-col gap-1.75">
            <span className="font-display wrap-break-word text-[clamp(19px,2vw,27px)] leading-[1.08] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
              {job.title}
            </span>
            <span className="text-[14px] text-[var(--home-muted)]">{job.line}</span>
          </span>
          <span className="text-right text-[12.5px] font-bold tracking-[0.14em] whitespace-nowrap text-[var(--home-accent-soft)] uppercase max-[899px]:text-left">
            {departmentLabel}
          </span>
        </span>
        {/* Decorative only: the button's accessible name is the job title. */}
        <span
          aria-hidden
          className={`shrink-0 text-[23px] leading-none text-[var(--home-heading)] transition-transform duration-[350ms] ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      {/* `hidden` can't be transitioned, so this animates on max-height and
          opacity; `inert` is what actually pulls the apply link out of the tab
          order while the panel is collapsed. */}
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
        <div ref={contentRef} className="pb-6.5">
          <p className="max-w-[76ch] text-[16.5px] leading-[1.65] text-[var(--home-body)]">
            {job.body}
          </p>

          <div className="mt-5.5 grid max-w-[900px] grid-cols-2 gap-8 max-[899px]:grid-cols-1">
            <JobColumn heading={copy.requirementsHeading} items={job.requirements} />
            <JobColumn heading={copy.detailHeading} items={job.detail} />
          </div>

          <a
            href="#form"
            className="sj-invert mt-5.5 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-5 py-3.25 text-[14px] font-bold text-[var(--home-on-accent)]"
          >
            {copy.applyForRoleCta} <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function JobColumn({ heading, items }: { heading: string; items: readonly string[] }) {
  return (
    <div>
      <span className="block text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
        {heading}
      </span>
      <ul className="mt-3 flex flex-col gap-2.25">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[15px] leading-[1.5] text-[var(--home-muted)]">
            <span aria-hidden className="text-[var(--home-accent)]">
              &middot;
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
