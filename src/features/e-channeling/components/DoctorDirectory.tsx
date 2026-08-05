"use client";

import { useMemo, useState } from "react";
import { CALENDLY_BASE, type Doctor } from "../data/doctors";

type DoctorDirectoryProps = {
  doctors: Doctor[];
};

const MOBILE_CHIP_LIMIT = 6;

function chipClass(active: boolean) {
  return [
    "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-semibold transition",
    active
      ? "border-primary bg-primary text-white"
      : "border-ink/15 bg-white text-muted hover:border-primary/40 hover:text-primary",
  ].join(" ");
}

function railButtonClass(active: boolean) {
  return [
    "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold transition",
    active ? "bg-primary/10 text-primary" : "text-muted hover:bg-surface hover:text-ink",
  ].join(" ");
}

function countBadgeClass(active: boolean) {
  return [
    "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold",
    active ? "bg-primary/15 text-primary" : "bg-surface text-muted",
  ].join(" ");
}

export function DoctorDirectory({ doctors }: DoctorDirectoryProps) {
  const [query, setQuery] = useState("");
  const [activeSpec, setActiveSpec] = useState("All");

  const specs = useMemo(() => {
    const counts = new Map<string, number>();
    for (const doctor of doctors) {
      counts.set(doctor.specialization, (counts.get(doctor.specialization) ?? 0) + 1);
    }
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, [doctors]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return doctors.filter((doctor) => {
      const matchesSpec = activeSpec === "All" || doctor.specialization === activeSpec;
      const matchesQuery =
        !q ||
        doctor.name.toLowerCase().includes(q) ||
        doctor.specialization.toLowerCase().includes(q);
      return matchesSpec && matchesQuery;
    });
  }, [doctors, query, activeSpec]);

  const isFiltered = query.trim().length > 0 || activeSpec !== "All";

  function resetAll() {
    setQuery("");
    setActiveSpec("All");
  }

  const resultLabel = `${filtered.length} ${filtered.length === 1 ? "consultant" : "consultants"}${
    activeSpec === "All" ? "" : ` · ${activeSpec}`
  }`;

  return (
    <div>
      <div className="mb-4 text-sm text-muted">
        {doctors.length} consultants across {specs.length} specialities. Search by name or
        speciality, or browse the list below.
      </div>

      <div className="rounded-2xl border border-ink/10 bg-white p-3 shadow-sm sm:p-4">
        <div className="flex items-center gap-3 rounded-xl border border-ink/10 bg-surface px-4">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-muted"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a doctor or speciality&hellip;"
            aria-label="Search doctors by name or speciality"
            className="h-12 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted sm:h-13 sm:text-base"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/10 text-muted hover:bg-ink/15"
            >
              &times;
            </button>
          )}
        </div>

        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto lg:hidden">
          <button
            type="button"
            onClick={() => setActiveSpec("All")}
            className={chipClass(activeSpec === "All")}
          >
            All specialities
          </button>
          {specs.slice(0, MOBILE_CHIP_LIMIT).map((s) => (
            <button
              key={s.name}
              type="button"
              onClick={() => setActiveSpec(s.name)}
              className={chipClass(activeSpec === s.name)}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
        <aside className="hidden lg:block">
          <div className="themed-scrollbar sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto rounded-2xl border border-ink/10 bg-white p-2">
            <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted">
              Specialities
            </p>
            <div className="flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() => setActiveSpec("All")}
                className={railButtonClass(activeSpec === "All")}
              >
                <span>All specialities</span>
                <span className={countBadgeClass(activeSpec === "All")}>{doctors.length}</span>
              </button>
              {specs.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setActiveSpec(s.name)}
                  className={railButtonClass(activeSpec === s.name)}
                >
                  <span>{s.name}</span>
                  <span className={countBadgeClass(activeSpec === s.name)}>{s.count}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold text-ink">{resultLabel}</p>
            {isFiltered && (
              <button
                type="button"
                onClick={resetAll}
                className="rounded-full border border-ink/15 px-4 py-1.5 text-xs font-semibold text-primary transition hover:border-primary"
              >
                Clear filters
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((doctor) => (
                <a
                  key={doctor.name + doctor.calendlySlug}
                  href={`${CALENDLY_BASE}${doctor.calendlySlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent-dark">
                    {doctor.specialization}
                  </span>
                  <span className="font-heading text-lg font-bold text-ink">{doctor.name}</span>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:text-primary-dark">
                    Book appointment
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 transition group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink/15 bg-white px-6 py-16 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-xl text-accent-dark">
                &#63;
              </span>
              <p className="font-heading text-lg font-bold text-ink">
                No consultant matched that search
              </p>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                Try a different name or speciality, or call our channelling desk on{" "}
                <a href="tel:+94117848484" className="font-semibold text-primary">
                  0117 84 84 84
                </a>{" "}
                and we will find the right doctor for you.
              </p>
              <button
                type="button"
                onClick={resetAll}
                className="mt-1 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Show all doctors
              </button>
            </div>
          )}

          <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl bg-linear-to-br from-primary-dark via-primary to-primary-mid p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-heading text-lg font-bold text-white">Not sure who to see?</p>
              <p className="mt-1 text-sm text-white/80">
                Our channelling desk will match you to the right consultant, any hour of the day.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-center gap-3">
              <a
                href="tel:+94117848484"
                className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-bold text-primary-dark transition hover:bg-accent/90"
              >
                Call 0117 84 84 84
              </a>
              <a
                href="mailto:info@sjhospital.lk"
                className="inline-flex h-11 items-center rounded-full border border-white/40 px-5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Email us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
