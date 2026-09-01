import type { ReactNode } from "react";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { ClockIcon, MailIcon, PhoneIcon, SmartphoneIcon } from "@/components/ui/Icons";
import { ContactForm, getContactContent } from "@/features/contact";
import type { Locale } from "@/lib/i18n/locales";
import { SectionHead } from "./SectionHead";
import type { AccommodationContent } from "../data/getContent";

// `bookRail`'s icon, keyed by the structural `icon` name rather than by
// `label`: keying it off translatable text is what left four blank squares
// on every Sinhala and Tamil page in the pilot the moment a label was
// translated. Icons are JSX, so they still can't live in `data/content.ts`
// with the rest of the rail's fields; every value that can drift (phone,
// WhatsApp, email, href) does live there now, and is pinned by content.test.ts.
const railIcons: Record<string, ReactNode> = {
  phone: <PhoneIcon className="h-5 w-5" />,
  whatsapp: <SmartphoneIcon className="h-5 w-5" />,
  email: <MailIcon className="h-5 w-5" />,
  doctor: <ClockIcon className="h-5 w-5" />,
};

/**
 * `#book`: the consolidated `ContactForm` beside a contact rail carrying the
 * hospital's phone, WhatsApp and email, plus a link to /e-channeling for a
 * doctor's appointment instead of a room.
 *
 * `heading` and `intro` are `bookHeading` and `bookIntro`, the old
 * index.tsx's own booking panel copy, so this section states nothing new.
 *
 * `ContactForm` takes its copy as a prop rather than importing it, so this
 * fetches the contact feature's own copy for whichever locale
 * `AccommodationPage` is rendering, via `locale` rather than the fixed
 * English default the page used before it had a locale to hand down.
 */
export async function BookSection({
  content,
  locale,
}: {
  content: AccommodationContent;
  locale: Locale;
}) {
  const { bookHeading, bookIntro, bookRail, sectionEyebrows } = content;
  const { form } = await getContactContent(locale);
  const rail = bookRail.map((row) => ({ ...row, icon: railIcons[row.icon] }));

  return (
    <section id="book" className="mx-auto max-w-[1440px] px-5 pt-26 pb-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <SectionHead eyebrow={sectionEyebrows.book} heading={bookHeading} intro={bookIntro} />

      <div className="mt-10.5 grid gap-10 min-[900px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="border border-[var(--home-hairline)] bg-[var(--home-surface)] px-6 py-8 sm:px-9 sm:py-10">
          <ContactForm copy={form} />
        </div>

        {/* The grid column stretches this rail to the form's own height (grid
            items default to `align-items: stretch`), but a flex column's
            children don't grow to fill leftover space on their own. Without
            `flex-1` on each row below, that leftover space showed this
            container's own background, `--home-hairline` (a colour meant only
            for the 1px gaps between rows), as a large solid block under the
            last row. `flex-1` has the rows themselves consume that space
            instead, the same fix in spirit as filling empty org-grid cells:
            no gap is left for the hairline colour to paint over. */}
        <div className="flex flex-col gap-px bg-[var(--home-hairline)]">
          {rail.map((row) =>
            row.internal ? (
              <LocaleLink
                key={row.href}
                href={row.href}
                className="sj-fill flex flex-1 items-center gap-3.5 bg-[var(--home-bg)] px-6 py-6"
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
              </LocaleLink>
            ) : (
              <a
                key={row.href}
                href={row.href}
                target={row.external ? "_blank" : undefined}
                rel={row.external ? "noopener noreferrer" : undefined}
                className="sj-fill flex flex-1 items-center gap-3.5 bg-[var(--home-bg)] px-6 py-6"
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
