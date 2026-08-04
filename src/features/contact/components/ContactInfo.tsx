import { PhoneIcon, SmartphoneIcon, MailIcon } from "@/components/ui/Icons";

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 shrink-0 text-accent-dark"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <div>
          <p className="text-sm font-bold text-ink">Location</p>
          <p className="text-sm text-muted">229/10 St. Joseph Street, Negombo</p>
        </div>
      </div>

      <div className="flex gap-3">
        <PhoneIcon className="mt-0.5 shrink-0 text-accent-dark" />
        <div>
          <p className="text-sm font-bold text-ink">Call Us</p>
          <a href="tel:+94117848484" className="block text-sm text-muted hover:text-primary">
            0117 84 84 84
          </a>
        </div>
      </div>

      <div className="flex gap-3">
        <SmartphoneIcon className="mt-0.5 shrink-0 text-accent-dark" />
        <div>
          <p className="text-sm font-bold text-ink">WhatsApp / Mobile</p>
          <a href="tel:+94742223334" className="block text-sm text-muted hover:text-primary">
            074 222 333 4
          </a>
        </div>
      </div>

      <div className="flex gap-3">
        <MailIcon className="mt-0.5 shrink-0 text-accent-dark" />
        <div>
          <p className="text-sm font-bold text-ink">Email</p>
          <a href="mailto:info@sjhospital.lk" className="block text-sm text-muted hover:text-primary">
            info@sjhospital.lk
          </a>
          <a
            href="mailto:appointments@sjhospital.lk"
            className="block text-sm text-muted hover:text-primary"
          >
            appointments@sjhospital.lk
          </a>
        </div>
      </div>
    </div>
  );
}
