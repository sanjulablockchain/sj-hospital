"use client";

import { useId, useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Modal } from "@/components/ui/Modal";
import { JobApplicationForm } from "./JobApplicationForm";

type Role = {
  title: string;
  summary: string;
  requirements: string[];
  location: string;
  apply: string;
};

const roles: Role[] = [
  {
    title: "Pharmacist",
    summary:
      "Dispense medication, advise patients on drug use, manage inventory, and collaborate with a multidisciplinary team to ensure high-quality patient care.",
    requirements: [
      "Bachelor's in Pharmacy",
      "Valid SLMC / pharmaceutical registration",
      "1-2 years of hospital or retail pharmacy experience preferred",
      "Strong interpersonal skills, team player",
    ],
    location: "St. Joseph Hospital, Negombo",
    apply:
      'Send your CV to hr@ktdoctor.com or contact us at 074 220 8704 for more information. Please include "Pharmacist" in the subject line.',
  },
  {
    title: "Business Development / Insurance Coordinator",
    summary:
      "Develop sales strategies, build partnerships with insurance companies, engage with potential clients, and coordinate insurance coverage to expand the insured client base.",
    requirements: [
      "2+ years of insurance sales, healthcare marketing, or business development experience",
      "Understanding of health insurance, claims, and the Sri Lanka healthcare landscape",
      "Self-motivated with strong record-keeping habits",
      "Fluent in English and Sinhala (Tamil a plus)",
    ],
    location: "Negombo",
    apply: "Send your CV to hr@ktdoctor.com. For inquiries, call 074 220 8704.",
  },
];

const cardHover =
  "transition hover:-translate-y-2 hover:shadow-[0_26px_48px_-24px_rgba(74,42,130,0.4)]";

function RequirementRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2.5 rounded-full bg-surface px-4 py-2 text-sm text-ink/80">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#33B4E5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      {children}
    </li>
  );
}

export function OpenRoles() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const titleId = useId();
  const activeRole = openIndex !== null ? roles[openIndex] : null;

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto mb-13 max-w-xl text-center">
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            We&apos;re Hiring
          </p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Open Roles
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {roles.map((role, index) => (
            <RevealOnScroll key={role.title} delayMs={index * 100}>
              <div
                className={`flex h-full flex-col rounded-[22px] border border-ink/10 bg-surface p-7 ${cardHover}`}
              >
                <div className="flex-1">
                  <h3 className="mb-2 font-heading text-xl font-bold text-ink">{role.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted">{role.summary}</p>
                  <p className="mb-5 text-sm text-ink/80">
                    <span className="font-bold uppercase tracking-wide text-accent-dark">
                      Location:{" "}
                    </span>
                    {role.location}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark"
                >
                  View Full Details
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <Modal
        open={activeRole !== null}
        onClose={() => setOpenIndex(null)}
        title={activeRole?.title ?? ""}
        labelledBy={titleId}
      >
        {activeRole && (
          <div className="p-7 sm:p-8">
            <p className="mb-5 text-sm leading-relaxed text-muted">{activeRole.summary}</p>

            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-accent-dark">
              Requirements
            </p>
            <ul className="mb-5 space-y-2">
              {activeRole.requirements.map((requirement) => (
                <RequirementRow key={requirement}>{requirement}</RequirementRow>
              ))}
            </ul>

            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-accent-dark">Location</p>
            <p className="mb-5 text-sm text-ink/80">{activeRole.location}</p>

            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-accent-dark">
              How to Apply
            </p>
            <p className="mb-6 text-sm text-ink/80">{activeRole.apply}</p>

            <div className="border-t border-ink/10 pt-6">
              <h4 className="mb-4 font-heading text-base font-bold text-ink">
                Apply Now
              </h4>
              <JobApplicationForm roleTitle={activeRole.title} />
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
