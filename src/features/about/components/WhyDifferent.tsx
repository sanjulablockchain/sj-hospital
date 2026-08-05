import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Reason = { title: string; description: string };

const reasons: Reason[] = [
  {
    title: "Managed and Operated by USA",
    description: "International standards with American healthcare management expertise.",
  },
  {
    title: "Affordable US Healthcare Standards",
    description: "High-quality healthcare at accessible prices for Sri Lankan families.",
  },
  {
    title: "Advanced Technology",
    description: "State-of-the-art equipment including digital X-ray and modern laboratory.",
  },
  {
    title: "Commitment to Safety and Hygiene",
    description: "Maintaining the highest standards of cleanliness and patient safety.",
  },
  {
    title: "Convenient Location and Comprehensive Services",
    description: "Easily accessible location in Negombo with full-service healthcare.",
  },
  {
    title: "Evidence Based Billing",
    description: "Transparent and accurate billing practices with digital file access.",
  },
];

export function WhyDifferent() {
  return (
    <section className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto mb-13 max-w-xl text-center">
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            Why Choose Us
          </p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            What Makes Us Different
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <RevealOnScroll key={reason.title} delayMs={(index % 3) * 80}>
              <div className="h-full rounded-[22px] border border-ink/10 bg-white p-7 transition hover:-translate-y-2 hover:shadow-[0_26px_48px_-24px_rgba(74,42,130,0.4)]">
                <h3 className="mb-2.5 font-heading text-[17px] font-bold text-ink">{reason.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{reason.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
