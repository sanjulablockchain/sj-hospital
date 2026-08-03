import type { ReactNode } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ClockIcon } from "@/components/ui/Icons";

type Service = {
  title: string;
  description: string;
  icon: ReactNode;
};

function BedIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9v11" />
      <path d="M22 20v-8a2 2 0 0 0-2-2H8v8" />
      <path d="M2 14h20" />
      <path d="M6 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </svg>
  );
}

function PillIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  );
}

function ScanIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 3v18M15 3v18" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}

function HouseIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M12 8v6M9 11h6" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 3h6v5l4 9a2 2 0 0 1-1.8 3H6.8A2 2 0 0 1 5 17l4-9V3Z" />
      <path d="M7.5 13h9" />
    </svg>
  );
}

const services: Service[] = [
  {
    title: "24/7 Services",
    description:
      "We're here for you 24/7 with our OPD, Emergency, Pharmacy, Lab, and X-ray, ready to provide care at all times.",
    icon: <ClockIcon className="text-white" />,
  },
  {
    title: "Inpatient Care & Room Booking",
    description:
      "Our US-standard inpatient rooms offer personalized care, the best treatment, and good hygiene at affordable rates starting from 10,000 LKR.",
    icon: <BedIcon />,
  },
  {
    title: "Prescription of Pharmacy",
    description:
      "Our 24/7 in-house pharmacy sells only authorized medicine, because your well-being is our priority.",
    icon: <PillIcon />,
  },
  {
    title: "Digital X-ray",
    description:
      "Get the most accurate and quick X-rays right here in Negombo, we've got an advanced digital X-ray machine.",
    icon: <ScanIcon />,
  },
  {
    title: "Telemedicine",
    description:
      "Want to chat with the best doctors in Sri Lanka but don't want to travel? No worries, our online consultations are smooth and simple.",
    icon: <MonitorIcon />,
  },
  {
    title: "Home Visit Services",
    description:
      "Our doctors, nurses, and laboratory technicians visit your home to give you personalized care in the comfort of your home.",
    icon: <HouseIcon />,
  },
  {
    title: "Home Delivery Service",
    description:
      "We deliver authorized prescription and over-the-counter medicine right to your doorstep, for your convenience.",
    icon: <TruckIcon />,
  },
  {
    title: "Laboratory Services",
    description:
      "24/7 advanced laboratory offering fast, accurate diagnostics with verified reports, ensuring exceptional safety and hygiene standards.",
    icon: <FlaskIcon />,
  },
];

export function Services() {
  return (
    <section id="services" className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto mb-13 max-w-xl text-center">
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            Our Services
          </p>
          <h2 className="mb-3 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Comprehensive care, all in one place
          </h2>
          <p className="text-base text-muted">
            From emergencies to home visits, everything you need for your family&apos;s health.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <RevealOnScroll key={service.title} delayMs={(index % 4) * 70}>
              <div className="h-full rounded-[22px] border border-ink/10 bg-white p-7 transition hover:-translate-y-2 hover:shadow-[0_26px_48px_-24px_rgba(74,42,130,0.4)]">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-mid">
                  {service.icon}
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-ink">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
