import Image from "next/image";
import Link from "next/link";
import { primaryNavigation } from "@/config/navigation";
import { PhoneIcon, SmartphoneIcon, MailIcon } from "@/components/ui/Icons";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-primary-dark text-[13px] text-white/90">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-6 py-2">
          <div className="hidden items-center gap-5 md:flex">
            <a
              href="tel:+94117848484"
              className="flex items-center gap-2 font-semibold text-white/90 hover:text-white"
            >
              <PhoneIcon />
              0117 84 84 84
            </a>
            <a
              href="tel:+94742223334"
              className="flex items-center gap-2 font-semibold text-white/90 hover:text-white"
            >
              <SmartphoneIcon />
              074 222 333 4
            </a>
            <a
              href="mailto:info@sjhospital.lk"
              className="flex items-center gap-2 text-white/90 hover:text-white"
            >
              <MailIcon />
              info@sjhospital.lk
            </a>
          </div>

          <a
            href="tel:+94117848484"
            className="font-semibold text-white/90 md:hidden"
          >
            0117 84 84 84
          </a>

          <div className="flex items-center gap-2">
            <Link
              href="/e-channeling"
              className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-primary-dark"
            >
              Book Appointment
            </Link>
            <Link
              href="/accommodation"
              className="hidden rounded-full border border-white/40 px-3 py-1.5 text-xs font-semibold text-white/90 sm:inline-block"
            >
              Inpatient Room Booking
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-b border-ink/10 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6 py-3">
          <Link href="/" className="block shrink-0">
            <Image
              src="/images/logo.png"
              alt="St Joseph Hospital Negombo"
              width={1248}
              height={386}
              className="h-10 w-auto sm:h-11"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {primaryNavigation.map((item) =>
              item.href.startsWith("http") ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[15px] font-semibold text-ink/80 hover:text-primary"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[15px] font-semibold text-ink/80 hover:text-primary"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/e-channeling"
              className="hidden shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/30 hover:bg-primary-dark lg:inline-block"
            >
              Appointments
            </Link>
            <MobileNav items={primaryNavigation} />
          </div>
        </div>
      </div>
    </header>
  );
}
