import type { ReactNode } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { InfinityIcon, StethoscopeIcon, PillIcon, AmbulanceIcon, BoltIcon, BedIcon, FlaskIcon } from "./DepartmentIcons";

type MainService = { title: string; description: string; icon: ReactNode };

const mainServices: MainService[] = [
  {
    title: "Emergency",
    description: "Immediate medical attention available 24/7 for all critical conditions.",
    icon: <InfinityIcon className="text-white" />,
  },
  {
    title: "OPD",
    description: "Open 24/7, with free consultations from 7:00 AM to 12:00 PM daily.",
    icon: <StethoscopeIcon className="text-white" />,
  },
  {
    title: "Pharmacy",
    description: "Get authorized medicines from our 24/7 open pharmacy.",
    icon: <PillIcon className="text-white" />,
  },
  {
    title: "Home Visiting Services",
    description: "24/7 home consultations with 6 dedicated vehicles for patient care.",
    icon: <AmbulanceIcon className="text-white" />,
  },
  {
    title: "X-Ray Service",
    description: "Advanced digital X-ray diagnostics available 24/7 for fast, accurate results.",
    icon: <BoltIcon className="text-white" />,
  },
  {
    title: "Inpatient Rooms",
    description: "Comfortable standard, deluxe, and super deluxe rooms, bookable 24/7.",
    icon: <BedIcon className="text-white" />,
  },
  {
    title: "Laboratory Services",
    description: "Open 24/7, with discounts available.",
    icon: <FlaskIcon className="text-white" />,
  },
];

export function MainServicesGrid() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto mb-13 max-w-xl text-center">
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            Our Main Services
          </p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Comprehensive care, all in one place
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mainServices.map((service, index) => (
            <RevealOnScroll key={service.title} delayMs={(index % 4) * 70}>
              <div className="h-full rounded-[22px] border border-ink/10 bg-white p-7 transition hover:-translate-y-2 hover:shadow-[0_26px_48px_-24px_rgba(74,42,130,0.4)]">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-mid">
                  {service.icon}
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-ink">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{service.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
