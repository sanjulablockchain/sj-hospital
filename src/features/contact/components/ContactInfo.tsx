import { PhoneIcon, SmartphoneIcon, MailIcon, ClockIcon } from "@/components/ui/Icons";

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent-dark">
      {children}
    </div>
  );
}

function ContactCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center gap-3 rounded-2xl border border-ink/10 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md">
      {children}
    </div>
  );
}

export function ContactInfo() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 items-stretch gap-4 @sm:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4 @6xl:grid-cols-5">
        <ContactCard>
          <IconBadge>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </IconBadge>
          <div className="min-w-0">
            <p className="text-sm font-bold text-ink">Location</p>
            <p className="text-sm text-muted">229/10 St. Joseph Street, Negombo</p>
          </div>
        </ContactCard>

        <ContactCard>
          <IconBadge>
            <PhoneIcon className="h-5 w-5" />
          </IconBadge>
          <div className="min-w-0">
            <p className="text-sm font-bold text-ink">Call Us</p>
            <a href="tel:+94117848484" className="block text-sm text-muted hover:text-primary">
              0117 84 84 84
            </a>
          </div>
        </ContactCard>

        <ContactCard>
          <IconBadge>
            <SmartphoneIcon className="h-5 w-5" />
          </IconBadge>
          <div className="min-w-0">
            <p className="text-sm font-bold text-ink">WhatsApp / Mobile</p>
            <a href="tel:+94742223334" className="block text-sm text-muted hover:text-primary">
              074 222 333 4
            </a>
          </div>
        </ContactCard>

        <ContactCard>
          <IconBadge>
            <MailIcon className="h-5 w-5" />
          </IconBadge>
          <div className="min-w-0">
            <p className="text-sm font-bold text-ink">Email</p>
            <a
              href="mailto:info@sjhospital.lk"
              className="block wrap-break-word text-sm text-muted hover:text-primary"
            >
              info@<wbr />sjhospital.lk
            </a>
          </div>
        </ContactCard>

        <ContactCard>
          <IconBadge>
            <ClockIcon className="h-5 w-5" />
          </IconBadge>
          <div className="min-w-0">
            <p className="text-sm font-bold text-ink">Hours of Operation</p>
            <p className="text-sm text-muted">Open 24/7, every hour of every day</p>
          </div>
        </ContactCard>
      </div>
    </div>
  );
}
