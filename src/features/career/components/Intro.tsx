import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const paragraphs = [
  "At St. Joseph Hospital Negombo, we believe that our people are the heart of our success. From our skilled medical professionals to our compassionate support staff, every team member plays a vital role in delivering exceptional care to our community.",
  "We are proudly operated and managed by California's largest pediatric group, Kids and Teens Medical Group (USA), bringing world-class expertise and global standards of care right here to Negombo. Joining us is not just a career move. It's an opportunity to work with internationally recognized leaders in healthcare and add exceptional value to your CV.",
  "We are always looking for passionate, qualified, and service-driven individuals to join our growing family. If you're guided by compassion, committed to excellence, and eager to contribute to world-class patient care, then St. Joseph Hospital is the place for you.",
  "Start your journey with us and discover a career where every role makes a meaningful difference.",
];

export function Intro() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <RevealOnScroll className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(20,10,50,0.35)]">
          <Image
            src="/images/career-staff.jpg"
            alt="St. Joseph Hospital Negombo staff"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </RevealOnScroll>

        <RevealOnScroll delayMs={120}>
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            Building a Healthier Tomorrow, Together
          </p>
          <div className="space-y-4 text-base leading-relaxed text-ink/75">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
