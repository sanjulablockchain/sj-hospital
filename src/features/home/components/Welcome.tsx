import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const checklist = ["Evidence-based billing", "In-house doctors", "Digital X-ray"];

export function Welcome() {
  return (
    <section id="about" className="bg-white px-6 py-20">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <RevealOnScroll className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(20,10,50,0.35)]">
            <Image
              src="/images/welcome.jpg"
              alt="Reception desk at St. Joseph Hospital Negombo"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-4 -top-4 -z-10 h-24 w-24 rounded-3xl bg-gradient-to-br from-accent to-accent-dark opacity-90 sm:-right-5 sm:-top-5" />
        </RevealOnScroll>

        <RevealOnScroll delayMs={120}>
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            Welcome to St. Joseph Hospital
          </p>
          <h2 className="mb-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            US-standard healthcare, made affordable for Negombo
          </h2>
          <p className="mb-4 text-base leading-relaxed text-ink/75">
            Our core belief is simple: <strong className="text-primary">to live is a privilege</strong>. We
            offer high-quality healthcare in Sri Lanka at affordable prices, managed and operated by the{" "}
            <strong>Kids &amp; Teens Pediatric Medical Group, USA</strong>.
          </p>
          <p className="mb-6 text-base leading-relaxed text-ink/75">
            Consumables are never reused, our waste management is excellent, and the hospital is cleaned every
            two hours to American standards. We follow evidence-based billing. Our in-house doctors only
            request the tests you actually need.
          </p>
          <div className="flex flex-wrap gap-6">
            {checklist.map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#33B4E5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
