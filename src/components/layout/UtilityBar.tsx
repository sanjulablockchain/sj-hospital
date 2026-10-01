import { LocaleLink } from "@/components/i18n/LocaleLink";

/**
 * The emergency strip above the header on the v4 home page: fixed ink
 * (`#1A1540`) in both themes, white text, the reference's 9px vertical
 * padding. Left, the pulsing red dot, "Emergency 24/7" and the switchboard as a
 * bold tel link, then the address; right, WhatsApp, Careers and Media. The
 * right group hides under 640px so the strip stays one or two lines on a phone.
 *
 * Every string here is chrome and stays English in every locale, the same
 * rule the footer's tagline and the header's labels follow. The two internal
 * links go through LocaleLink so a Sinhala reader stays on /si.
 */
export function UtilityBar() {
  return (
    <div className="bg-[#1A1540] text-[13px] text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-x-5 gap-y-1 px-5 py-[9px] sm:px-8 lg:px-11">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <span className="flex items-center gap-2">
            <span aria-hidden className="animate-sj-pulse-dot h-[7px] w-[7px] rounded-full bg-[#F04438]" />
            <span>Emergency 24/7</span>
            <a href="tel:+94117848484" className="font-extrabold text-white tabular-nums hover:text-white">
              0117 84 84 84 / 031
            </a>
          </span>
          <span className="text-white/75">229/10 St. Joseph Street, Negombo</span>
        </div>
        <div className="hidden gap-[22px] sm:flex">
          <a href="https://wa.me/94742223334" className="text-white/85 transition-colors hover:text-white">
            WhatsApp 074 222 333 4
          </a>
          <LocaleLink href="/careers" className="text-white/85 transition-colors hover:text-white">
            Careers
          </LocaleLink>
          <LocaleLink href="/media" className="text-white/85 transition-colors hover:text-white">
            Media
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}
