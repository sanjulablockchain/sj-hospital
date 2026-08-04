import Image from "next/image";
import Link from "next/link";
import { footerQuickLinks } from "@/config/navigation";
import { PhoneIcon, SmartphoneIcon, MailIcon } from "@/components/ui/Icons";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="rounded-t-4xl bg-[#2A183F] px-6 pb-7 pt-16 text-[#C9BBE0]"
    >
      <div className="mx-auto grid max-w-[1240px] gap-11 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.3fr_1fr]">
        <div>
          <Image
            src="/images/logo.png"
            alt="St Joseph Hospital"
            width={1248}
            height={386}
            className="mb-5 h-10 w-auto brightness-0 invert"
          />
          <p className="max-w-xs text-sm leading-relaxed">
            St. Joseph Hospital Negombo offers high-quality, compassionate,
            patient-centered care, bringing American healthcare standards to
            Sri Lanka.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-heading text-[15px] font-bold text-white">
            Quick Links
          </h4>
          <div className="flex flex-col gap-3 text-sm">
            {footerQuickLinks.map((item) =>
              item.href.startsWith("http") ? (
                <a key={item.href} href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-heading text-[15px] font-bold text-white">
            Get In Touch
          </h4>
          <div className="flex flex-col gap-3 text-sm leading-snug">
            <div className="flex gap-2.5">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#33B4E5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>229/10 St. Joseph Street, Negombo</span>
            </div>
            <a href="tel:+94117848484" className="flex gap-2.5 hover:text-white">
              <PhoneIcon className="shrink-0 text-accent" />
              0117 84 84 84
            </a>
            <a href="tel:+94742223334" className="flex gap-2.5 hover:text-white">
              <SmartphoneIcon className="shrink-0 text-accent" />
              074 222 333 4
            </a>
            <a
              href="mailto:info@sjhospital.lk"
              className="flex gap-2.5 hover:text-white"
            >
              <MailIcon className="shrink-0 text-accent" />
              info@sjhospital.lk
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-heading text-[15px] font-bold text-white">
            Connect
          </h4>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/sjhospitalNegombo"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-accent"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9.5c0-.3.2-.5.5-.5H14z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/sjhospital.lk/"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-accent"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/sjhnegomb/"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-accent"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-9 flex max-w-[1240px] flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-[13px] text-[#9A8BB5]">
        <p>© 2026 St. Joseph Hospital</p>
        <div className="flex gap-5">
          <Link href="/privacy-policy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="https://sjhospital.lk/gallery/" className="hover:text-white">
            Gallery
          </Link>
        </div>
      </div>
    </footer>
  );
}
