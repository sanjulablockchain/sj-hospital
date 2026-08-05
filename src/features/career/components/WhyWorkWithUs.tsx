import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Benefit = { title: string; description: string };

const benefits: Benefit[] = [
  {
    title: "Supportive, Team-Based Culture",
    description: "Work alongside colleagues who value collaboration and mutual respect.",
  },
  {
    title: "Growth & Development",
    description: "Ongoing training and clear paths to advance your career.",
  },
  {
    title: "Modern Facilities & Technology",
    description: "Work with US-standard equipment, including digital X-ray and a modern laboratory.",
  },
  {
    title: "Competitive Pay & Health Benefits",
    description: "Fair compensation and health coverage for you and your family.",
  },
  {
    title: "Inclusive & Respectful Work Culture",
    description: "An environment where every team member is valued.",
  },
  {
    title: "Work-Life Balance",
    description: "Schedules that respect your time outside of work.",
  },
  {
    title: "Opportunities for All Roles",
    description: "From clinical to administrative, every role makes a real difference here.",
  },
  {
    title: "Job Security & Stability",
    description: "Join a well-established hospital with a stable, long-term employment history.",
  },
  {
    title: "Wellness & Mental Health Support",
    description: "Support programs for your physical and mental wellbeing, on top of health benefits.",
  },
];

export function WhyWorkWithUs() {
  return (
    <section className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto mb-13 max-w-xl text-center">
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            Why Work With Us
          </p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Experience a Career That&apos;s Fulfilling and Impactful
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <RevealOnScroll key={benefit.title} delayMs={(index % 3) * 80}>
              <div className="flex h-full items-start gap-3 rounded-[20px] border border-ink/10 bg-white p-6 transition hover:-translate-y-2 hover:shadow-[0_26px_48px_-24px_rgba(74,42,130,0.4)]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#33B4E5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <div>
                  <h3 className="mb-1.5 font-heading text-[15px] font-bold text-ink">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{benefit.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
