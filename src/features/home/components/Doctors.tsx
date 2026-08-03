import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Doctors() {
  return (
    <section className="relative overflow-hidden bg-primary px-6 py-20">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-2 lg:items-center">
        <RevealOnScroll>
          <div className="relative aspect-square overflow-hidden rounded-3xl shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]">
            <Image
              src="/images/doctors.jpg"
              alt="Doctor at St. Joseph Hospital Negombo"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={120}>
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent">
            Consulted by experienced doctors
          </p>
          <h2 className="mb-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            Your health, in expert hands
          </h2>
          <p className="mb-4 text-base leading-relaxed text-white/80">
            Your health is in the hands of highly skilled and experienced doctors dedicated to the best
            medical care. Our team of specialists diagnose, treat, and guide you toward a healthier life with
            personalized attention and advanced medical solutions.
          </p>
          <p className="mb-8 text-base leading-relaxed text-white/80">
            With a commitment to accuracy and patient-centered care, every consultation leads to the best
            possible treatment plan, helping you recover faster and live healthier.
          </p>
          <Link
            href="https://sjhospital.lk/e-channeling/"
            className="shadow-accent-glow inline-block rounded-full bg-accent px-7 py-3.5 text-base font-bold text-[#0E2E3D] transition hover:-translate-y-0.5"
          >
            Make an Appointment
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
