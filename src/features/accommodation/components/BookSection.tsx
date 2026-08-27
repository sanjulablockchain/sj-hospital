import Link from "next/link";
import { ClockIcon, MailIcon, PhoneIcon, SmartphoneIcon } from "@/components/ui/Icons";
import { ContactForm } from "@/features/contact";
import { SectionHead } from "./SectionHead";
import { bookHeading, bookIntro } from "../data/content";

// The hospital's own phone, WhatsApp and email, the same values
// features/contact/data/content.ts's `contactRows` and
// features/facilities/components/BookSection.tsx's `rows` carry, plus a link
// to /e-channeling for booking a doctor instead. Icons are JSX, so they stay
// here rather than in `data/content.ts`.
const rail = [
  { label: "Call us", value: "0117 84 84 84", href: "tel:+94117848484", icon: <PhoneIcon className="h-5 w-5" /> },
  {
    label: "WhatsApp",
    value: "074 222 333 4",
    href: "https://wa.me/94742223334",
    icon: <SmartphoneIcon className="h-5 w-5" />,
    external: true,
  },
  {
    label: "Email",
    value: "info@sjhospital.lk",
    href: "mailto:info@sjhospital.lk",
    icon: <MailIcon className="h-5 w-5" />,
  },
  {
    label: "Book a doctor instead",
    value: "e-Channeling",
    href: "/e-channeling",
    icon: <ClockIcon className="h-5 w-5" />,
    internal: true,
  },
];

/**
 * `#book`: the consolidated `ContactForm` beside a contact rail carrying the
 * hospital's phone, WhatsApp and email, plus a link to /e-channeling for a
 * doctor's appointment instead of a room.
 *
 * `heading` and `intro` are `bookHeading` and `bookIntro`, the old
 * index.tsx's own booking panel copy, so this section states nothing new.
 */
export function BookSection() {
  return (
    <section id="book" className="mx-auto max-w-[1440px] px-5 pt-26 pb-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <SectionHead eyebrow="03 / Book a room" heading={bookHeading} intro={bookIntro} />

      <div className="mt-10.5 grid gap-10 min-[900px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="border border-[var(--home-hairline)] bg-[var(--home-surface)] px-6 py-8 sm:px-9 sm:py-10">
          <ContactForm />
        </div>

        <div className="flex flex-col gap-px bg-[var(--home-hairline)]">
          {rail.map((row) =>
            row.internal ? (
              <Link
                key={row.href}
                href={row.href}
                className="sj-fill flex items-center gap-3.5 bg-[var(--home-bg)] px-6 py-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[var(--home-accent)] text-[var(--home-on-accent)]">
                  {row.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
                    {row.label}
                  </span>
                  <span className="block wrap-break-word text-[15px] font-semibold text-[var(--home-heading)]">
                    {row.value}
                  </span>
                </span>
              </Link>
            ) : (
              <a
                key={row.href}
                href={row.href}
                target={row.external ? "_blank" : undefined}
                rel={row.external ? "noopener noreferrer" : undefined}
                className="sj-fill flex items-center gap-3.5 bg-[var(--home-bg)] px-6 py-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[var(--home-accent)] text-[var(--home-on-accent)]">
                  {row.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
                    {row.label}
                  </span>
                  <span className="block wrap-break-word text-[15px] font-semibold text-[var(--home-heading)]">
                    {row.value}
                  </span>
                </span>
              </a>
            )
          )}
        </div>
      </div>
    </section>
  );
}
