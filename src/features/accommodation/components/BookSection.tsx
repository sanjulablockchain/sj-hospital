import Link from "next/link";
import type { ReactNode } from "react";
import { ClockIcon, MailIcon, PhoneIcon, SmartphoneIcon } from "@/components/ui/Icons";
import { ContactForm } from "@/features/contact";
import { SectionHead } from "./SectionHead";
import { bookHeading, bookIntro, bookRail } from "../data/content";

// `bookRail`'s icon, keyed by `label`. Icons are JSX, so they can't live in
// `data/content.ts` with the rest of the rail's fields; every value that can
// drift (phone, WhatsApp, email, href) does live there now, and is pinned by
// content.test.ts.
const railIcons: Record<string, ReactNode> = {
  "Call us": <PhoneIcon className="h-5 w-5" />,
  WhatsApp: <SmartphoneIcon className="h-5 w-5" />,
  Email: <MailIcon className="h-5 w-5" />,
  "Book a doctor instead": <ClockIcon className="h-5 w-5" />,
};

const rail = bookRail.map((row) => ({ ...row, icon: railIcons[row.label] }));

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
