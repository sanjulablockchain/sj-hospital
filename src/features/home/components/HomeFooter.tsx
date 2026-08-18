import Image from "next/image";
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from "./icons";

const careLinks = [
  { label: "Services", href: "#services" },
  { label: "Surgical care", href: "#surgical" },
  { label: "Pharmacy", href: "#pharmacy" },
  { label: "Accommodation", href: "#rooms" },
];

const hospitalLinks = [
  { label: "Facilities", href: "#facilities" },
  { label: "International patient care", href: "#international" },
  { label: "Health tips", href: "#tips" },
  { label: "School wellness", href: "#wellness" },
  { label: "Network", href: "#network" },
  { label: "Media", href: "#media" },
  { label: "Careers", href: "#career" },
];

export function HomeFooter() {
  return (
    <footer id="contact" className="mx-auto max-w-[1440px] px-5 pb-10 pt-26 sm:px-8 lg:px-11">
      <div className="flex flex-wrap items-start justify-between gap-13">
        <div className="max-w-[34ch]">
          <span className="flex items-center gap-3.5">
            <Image src="/images/logo.png" alt="St. Joseph Hospital" width={60} height={60} className="h-15 w-auto" />
            <span className="block leading-[1.1]">
              <span className="font-display block text-[20px] font-extrabold tracking-[-0.02em] text-[var(--home-heading)]">
                ST. JOSEPH HOSPITAL
              </span>
              <span className="mt-1 block text-[10.5px] tracking-[0.22em] text-[var(--home-accent-soft)]">
                TO LIVE IS A PRIVILEGE
              </span>
            </span>
          </span>
          <p className="mt-4.5 text-[15px] leading-[1.62] text-[var(--home-muted)]">
            Compassionate, patient centered care, bringing American healthcare standards to Sri Lanka.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.facebook.com/sjhospitalNegombo"
              title="Facebook"
              className="flex h-[46px] w-[46px] items-center justify-center border border-[var(--home-hairline)] text-[var(--home-heading)]"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/sjhospital.lk/"
              title="Instagram"
              className="flex h-[46px] w-[46px] items-center justify-center border border-[var(--home-hairline)] text-[var(--home-heading)]"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/sjhnegomb/"
              title="LinkedIn"
              className="flex h-[46px] w-[46px] items-center justify-center border border-[var(--home-hairline)] text-[var(--home-heading)]"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://wa.me/94742223334"
              title="WhatsApp"
              className="flex h-[46px] w-[46px] items-center justify-center border border-[var(--home-hairline)] text-[var(--home-heading)]"
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 text-[15px]">
          <span className="mb-2 text-[11.5px] tracking-[0.22em] text-[var(--home-accent)] uppercase">Care</span>
          {careLinks.map((item) => (
            <a key={item.href} href={item.href} className="text-[var(--home-body)] opacity-90 hover:opacity-100">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2.5 text-[15px]">
          <span className="mb-2 text-[11.5px] tracking-[0.22em] text-[var(--home-accent)] uppercase">Hospital</span>
          {hospitalLinks.map((item) => (
            <a key={item.href} href={item.href} className="text-[var(--home-body)] opacity-90 hover:opacity-100">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2.5 text-[15px]">
          <span className="mb-2 text-[11.5px] tracking-[0.22em] text-[var(--home-accent)] uppercase">Reach us</span>
          <span className="text-[var(--home-body)] opacity-90">229/10 St. Joseph Street, Negombo</span>
          <a href="tel:+94117848484" className="text-[var(--home-body)] opacity-90 tabular-nums hover:opacity-100">
            0117 84 84 84
          </a>
          <a href="https://wa.me/94742223334" className="text-[var(--home-body)] opacity-90 tabular-nums hover:opacity-100">
            WhatsApp 074 222 333 4
          </a>
          <a href="mailto:info@sjhospital.lk" className="text-[var(--home-body)] opacity-90 hover:opacity-100">
            info@sjhospital.lk
          </a>
        </div>
      </div>

      <div className="mt-15 flex flex-wrap items-center justify-between gap-5 border-t border-[var(--home-hairline)] pt-5 text-[13px]">
        <span className="text-[var(--home-muted)]">&copy; 2026 St. Joseph Hospital, Negombo</span>
        <span className="tracking-[0.18em] text-[var(--home-muted)] uppercase">To live is a privilege</span>
      </div>
    </footer>
  );
}
