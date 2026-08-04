"use client";

import { useMemo, useState } from "react";
import { CALENDLY_BASE, type Doctor } from "../data/doctors";

type DoctorDirectoryProps = {
  doctors: Doctor[];
};

export function DoctorDirectory({ doctors }: DoctorDirectoryProps) {
  const [nameFilter, setNameFilter] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");

  const filtered = useMemo(() => {
    const name = nameFilter.trim().toLowerCase();
    const specialization = specializationFilter.trim().toLowerCase();
    return doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(name) &&
        doctor.specialization.toLowerCase().includes(specialization)
    );
  }, [doctors, nameFilter, specializationFilter]);

  const grouped = useMemo(() => {
    const groups = new Map<string, Doctor[]>();
    for (const doctor of filtered) {
      const existing = groups.get(doctor.specialization) ?? [];
      existing.push(doctor);
      groups.set(doctor.specialization, existing);
    }
    return Array.from(groups.entries());
  }, [filtered]);

  return (
    <div>
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          value={nameFilter}
          onChange={(event) => setNameFilter(event.target.value)}
          placeholder="Filter by doctor name"
          aria-label="Filter by doctor name"
          className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
        />
        <input
          type="text"
          value={specializationFilter}
          onChange={(event) => setSpecializationFilter(event.target.value)}
          placeholder="Filter by specialization"
          aria-label="Filter by specialization"
          className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
        />
      </div>

      {grouped.length === 0 && <p className="text-sm text-muted">No doctors match your search.</p>}

      <div className="flex flex-col gap-10">
        {grouped.map(([specialization, group]) => (
          <div key={specialization}>
            <h3 className="mb-4 font-heading text-lg font-bold text-ink">{specialization}</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.map((doctor) => (
                <a
                  key={doctor.name + doctor.calendlySlug}
                  href={`${CALENDLY_BASE}${doctor.calendlySlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white p-4 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary"
                >
                  {doctor.name}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-accent-dark"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
