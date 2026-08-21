import Image from "next/image";
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { LOGO_MARK } from "@/config/brand";

export type FooterColumn = {
  heading: string;
  links: { label: string; href: string }[];
};

type ThemedFooterProps = {
  columns: FooterColumn[];
  id?: string;
};

// Each button hovers to its own network's brand colour.
const socials = [
  {
    href: "https://www.facebook.com/sjhospitalNegombo",
    title: "Facebook",
    icon: <FacebookIcon />,
    hover: "hover:border-[#1877F2] hover:bg-[#1877F2]",
  },
  {
    href: "https://www.instagram.com/sjhospital.lk/",
    title: "Instagram",
    icon: <InstagramIcon />,
    hover: "hover:border-[#D62976] hover:bg-[#D62976]",
  },
  {
    href: "https://www.linkedin.com/company/sjhnegomb/",
    title: "LinkedIn",
    icon: <LinkedInIcon />,
    hover: "hover:border-[#0A66C2] hover:bg-[#0A66C2]",
  },
  {
    href: "https://wa.me/94742223334",
    title: "WhatsApp",
    icon: <WhatsAppIcon />,
    hover: "hover:border-[#1FAF54] hover:bg-[#1FAF54]",
  },
];

export function ThemedFooter({ columns, id = "contact" }: ThemedFooterProps) {
  return (
    <footer id={id} className="mx-auto max-w-[1440px] px-5 pb-10 pt-26 sm:px-8 lg:px-11">
      <div className="flex flex-wrap items-start justify-between gap-13">
        <div className="max-w-[34ch]">
          <span className="flex items-center gap-3.5">
            <Image
              src={LOGO_MARK.src}
              alt="St. Joseph Hospital"
              width={LOGO_MARK.width}
              height={LOGO_MARK.height}
              className="block h-15 w-auto"
            />
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
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                title={social.title}
                className={`flex h-[46px] w-[46px] items-center justify-center border border-[var(--home-hairline-strong)] text-[var(--home-heading)] transition-colors hover:text-white ${social.hover}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.heading} className="flex flex-col gap-2.5 text-[15px]">
            <span className="mb-2 text-[11.5px] tracking-[0.22em] text-[var(--home-accent)] uppercase">
              {column.heading}
            </span>
            {column.links.map((item) => (
              <a key={item.href} href={item.href} className="sj-link text-[var(--home-body)]">
                {item.label}
              </a>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-2.5 text-[15px]">
          <span className="mb-2 text-[11.5px] tracking-[0.22em] text-[var(--home-accent)] uppercase">Reach us</span>
          <span className="text-[var(--home-body)] opacity-90">229/10 St. Joseph Street, Negombo</span>
          <a href="tel:+94117848484" className="sj-link text-[var(--home-body)] tabular-nums">
            0117 84 84 84
          </a>
          <a href="https://wa.me/94742223334" className="sj-link text-[var(--home-body)] tabular-nums">
            WhatsApp 074 222 333 4
          </a>
          <a href="mailto:info@sjhospital.lk" className="sj-link text-[var(--home-body)]">
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
