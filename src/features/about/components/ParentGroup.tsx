import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const partnerLogos = [
  "/images/partners/partner-1.png",
  "/images/partners/partner-2.png",
  "/images/partners/partner-3.png",
  "/images/partners/partner-4.png",
  "/images/partners/partner-5.png",
];

export function ParentGroup() {
  return (
    <section className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
          <Image
            src="/images/kids-teens-logo.png"
            alt="Kids & Teens Medical Group logo"
            width={223}
            height={218}
            className="h-28 w-auto"
          />
          <div>
            <h2 className="mb-4 font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              About Kids &amp; Teens Medical Group
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-ink/75">
              Kids &amp; Teens Medical Group, a leading pediatric care provider in Southern
              California, is dedicated to delivering compassionate and comprehensive healthcare
              services for children and adolescents. With a team of over 50 board-certified
              pediatricians, they offer a wide range of services, including primary care, urgent
              care, telehealth consultations, and after-hours care, ensuring that young patients
              receive timely and personalized medical attention.
            </p>
            <p className="text-sm leading-relaxed text-ink/75">
              This strategic expansion reflects Kids &amp; Teens Medical Group&apos;s commitment to
              extending their expertise beyond the United States, bringing their patient-centric
              approach and high-quality pediatric care to families in Sri Lanka. The revitalized St.
              Joseph Hospital is set to become a cornerstone of pediatric healthcare in Negombo,
              offering state-of-the-art medical services and facilities for children and adolescents.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-10">
          {partnerLogos.map((src) => (
            <Image
              key={src}
              src={src}
              alt="Partner organization logo"
              width={140}
              height={70}
              className="h-12 w-auto object-contain opacity-80 grayscale"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
