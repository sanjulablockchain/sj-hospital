import type { ReactNode } from "react";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, SmartphoneIcon } from "@/components/ui/Icons";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=7.206699127328975,79.8453343846586";

type ContactRow = {
  icon: ReactNode;
  label: string;
  value: string;
  sub: string;
  href: string;
  external?: boolean;
};

const CONTACT_ROWS: ContactRow[] = [
  {
    icon: <MapPinIcon className="h-5 w-5" />,
    label: "Location",
    value: "229/10 St. Joseph Street",
    sub: "Negombo, Sri Lanka",
    href: DIRECTIONS_URL,
    external: true,
  },
  {
    icon: <PhoneIcon className="h-5 w-5" />,
    label: "Call Us",
    value: "0117 84 84 84",
    sub: "Reception, 24 hours",
    href: "tel:+94117848484",
  },
  {
    icon: <SmartphoneIcon className="h-5 w-5" />,
    label: "WhatsApp / Mobile",
    value: "074 222 333 4",
    sub: "Fastest reply",
    href: "tel:+94742223334",
  },
  {
    icon: <MailIcon className="h-5 w-5" />,
    label: "Email",
    value: "info@sjhospital.lk",
    sub: "Replies within a day",
    href: "mailto:info@sjhospital.lk",
  },
];

export function ContactDetailsPanel() {
  return (
    <div className="relative isolate flex flex-col gap-7 overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-mid px-6 py-10 text-white sm:px-9 sm:py-12">
      <div className="decorative-blob decorative-blob--a animate-float-a pointer-events-none absolute -right-12 -top-14 h-48 w-48" />

      <div className="relative">
        <h2 className="mb-2 font-heading text-2xl font-extrabold tracking-tight">Reach Us Directly</h2>
        <p className="max-w-[34ch] text-[15px] leading-relaxed text-white/80">
          Call, message, or walk in, whichever is easiest for you.
        </p>
      </div>

      <div className="relative flex flex-col gap-3">
        {CONTACT_ROWS.map((row) => (
          <a
            key={row.label}
            href={row.href}
            target={row.external ? "_blank" : undefined}
            rel={row.external ? "noopener noreferrer" : undefined}
            className="flex items-start gap-3.5 rounded-2xl border border-white/15 bg-white/8 p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-white/15"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-[#0E2E3D]">
              {row.icon}
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-accent">
                {row.label}
              </span>
              <span className="wrap-break-word text-[15px] font-semibold text-white">{row.value}</span>
              <span className="text-[13px] text-white/65">{row.sub}</span>
            </span>
          </a>
        ))}
      </div>

      <div className="relative flex items-center gap-2.5 rounded-2xl bg-accent px-4 py-3.5 text-[#0E2E3D]">
        <ClockIcon className="h-5 w-5 shrink-0" />
        <span className="text-sm font-bold">Open 24/7, every hour of every day</span>
      </div>
    </div>
  );
}
