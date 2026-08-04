import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function CtaBanner() {
  return (
    <section id="accommodation" className="bg-white px-6 pb-[88px] pt-5">
      <RevealOnScroll>
        <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[32px] bg-gradient-to-br from-primary-dark to-primary-mid px-8 py-14 sm:px-14">
          <div className="decorative-blob decorative-blob--cta animate-float-a pointer-events-none absolute -right-8 -top-16 h-60 w-60" />

          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="mb-3.5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                Ready when you are, day or night
              </h2>
              <p className="max-w-lg text-base leading-relaxed text-white/85 sm:text-[17px]">
                Book an appointment online, reserve an inpatient room from 10,000 LKR, or call us any hour.
                American healthcare standards, right here in Negombo.
              </p>
            </div>
            <div className="flex flex-col gap-3.5">
              <Link
                href="/e-channeling"
                className="shadow-accent-glow rounded-full bg-accent px-7 py-4 text-center text-base font-bold text-[#0E2E3D] transition hover:-translate-y-0.5"
              >
                Book an Appointment
              </Link>
              <Link
                href="/accommodation"
                className="rounded-full border border-white/30 bg-white/10 px-7 py-4 text-center text-base font-bold text-white transition hover:bg-white/20"
              >
                Inpatient Room Booking
              </Link>
              <a
                href="tel:+94117848484"
                className="text-center text-[15px] font-semibold text-[#BEE7F8]"
              >
                or call 0117 84 84 84
              </a>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
