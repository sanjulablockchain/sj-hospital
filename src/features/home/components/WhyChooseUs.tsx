import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type Reason = {
  number: string;
  title: string;
  description: string;
};

const reasons: Reason[] = [
  {
    number: "01",
    title: "Managed & operated by USA",
    description:
      "Run by the largest pediatric medical group in Los Angeles, aligning our standards with the US.",
  },
  {
    number: "02",
    title: "Affordable US standards",
    description:
      "The high-quality benchmarks of U.S. healthcare, at a cost that's accessible for the local economy.",
  },
  {
    number: "03",
    title: "Advanced technology",
    description:
      "Modern, state-of-the-art equipment including digital X-ray and superior waste management.",
  },
  {
    number: "04",
    title: "Safety & hygiene",
    description:
      "Strict sanitation protocols and frequent cleaning of the entire facility for a sterile environment.",
  },
  {
    number: "05",
    title: "Convenient location",
    description:
      "At 229/10 St. Joseph Street, Negombo, easily accessible, with comprehensive services in one place.",
  },
  {
    number: "06",
    title: "Evidence-based billing",
    description:
      "Transparent charges, clearly justified by the specific services and treatments provided.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto mb-13 max-w-xl text-center">
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            Why Choose Us
          </p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Six reasons families trust us
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <RevealOnScroll key={reason.number} delayMs={(index % 3) * 80}>
              <div className="h-full rounded-[22px] border border-ink/10 bg-gradient-to-b from-[#FBFCFE] to-surface p-7">
                <div className="mb-3.5 font-heading text-[15px] font-extrabold text-accent-dark">
                  {reason.number}
                </div>
                <h3 className="mb-2.5 font-heading text-[19px] font-bold text-ink">
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{reason.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
