import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const paragraphs = [
  "St. Joseph Hospital in Negombo delivers US standard, high-quality healthcare to Sri Lankans at affordable prices. Our hospital was recently refurbished with a USD 1 million investment led by Kids & Teens Pediatric Medical Group (Los Angeles) and Asia Corp.",
  "We are the first hospital in Negombo to offer corporate insurance acceptance at our OPD, ensuring convenience and accessibility to healthcare for the local community.",
  "Our modern and advanced laboratory is known to be one of the best in Sri Lanka. It has the latest high-quality equipment. The digital X-ray machine at the hospital is one of the latest in the industry to give you accurate information for the right diagnosis.",
  "We also provide digital file access for our patients' convenience. Visit us today to experience international standard healthcare here in Sri Lanka.",
];

export function Intro() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <RevealOnScroll>
          <div className="space-y-4 text-base leading-relaxed text-ink/75">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll
          delayMs={120}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(20,10,50,0.35)]"
        >
          <Image
            src="/images/about-facility.jpg"
            alt="St. Joseph Hospital Negombo facility"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
