import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

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

export function OpenRoles() {
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
              <div className="h-full rounded-[22px] border border-ink/10 bg-surface p-7">
                <h3 className="mb-2 font-heading text-xl font-bold text-ink">{role.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted">{role.summary}</p>
                <ul className="mb-5 space-y-2">
                  {role.requirements.map((requirement) => (
                    <li key={requirement} className="flex items-start gap-2.5 text-sm text-ink/80">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#33B4E5"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-1 shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {requirement}
                    </li>
                  ))}
                </ul>
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-accent-dark">Location</p>
                <p className="mb-4 text-sm text-ink/80">{role.location}</p>
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-accent-dark">
                  How to Apply
                </p>
                <p className="text-sm text-ink/80">{role.apply}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
