import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Intro() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Our Expert Doctors
          </h2>
          <p className="text-base leading-relaxed text-muted">
            Meet our team of experienced and compassionate doctors dedicated to providing
            exceptional care and personalized medical attention. With diverse specialties and a
            commitment to your health, our doctors are here to support you on your wellness
            journey. Book your appointment today to receive expert medical guidance.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
