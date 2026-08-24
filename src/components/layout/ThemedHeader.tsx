import Image from "next/image";
import { ThemeToggleButton } from "@/components/theme/ThemeToggleButton";
import { MobileNavPanel } from "@/components/layout/MobileNavPanel";
import { LOGO_MARK } from "@/config/brand";

type ThemedHeaderProps = {
  navItems: { label: string; href: string }[];
  bookHref?: string;
  homeHref?: string;
};

export function ThemedHeader({ navItems, bookHref = "#book", homeHref = "#top" }: ThemedHeaderProps) {
  return (
    // z-20, not z-10: the header's z-index makes it a stacking context, so
    // MobileNavPanel's own z-30 cannot lift the open panel out of it. At z-10
    // the header tied with the hero content block that follows it in the DOM,
    // and the later sibling won, drawing the hero copy straight through the
    // open menu on every page that uses this header. z-20 keeps the header (and
    // the panel inside it) above hero content, and still below the z-60
    // FloatingActions.
    <header className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-5 px-5 py-5 sm:px-8 lg:px-11">
      <a href={homeHref} className="flex shrink-0 items-center gap-3.25">
        <Image
          src={LOGO_MARK.src}
          alt="St. Joseph Hospital"
          width={LOGO_MARK.width}
          height={LOGO_MARK.height}
          className="block h-12 w-auto"
          priority
        />
        {/* The header sits on the dark hero image in both themes, so these stay
            fixed-dark rather than following --home-heading / --home-accent-soft. */}
        <span className="block leading-[1.05]">
          <span className="font-display block text-[16.5px] font-extrabold tracking-[-0.02em] text-white">
            ST. JOSEPH
          </span>
          <span className="block text-[10px] tracking-[0.22em] text-[#7FCBFF]">
            HOSPITAL &middot; NEGOMBO
          </span>
        </span>
      </a>

      <nav className="ml-auto hidden items-center gap-5 text-[13px] font-semibold min-[1120px]:flex max-[1279px]:gap-4 max-[1279px]:text-[12.5px]">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="text-white/82 hover:text-white">
            {item.label}
          </a>
        ))}
      </nav>

      <MobileNavPanel items={navItems} bookHref={bookHref} />

      <ThemeToggleButton />

      <a
        href={bookHref}
        className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap bg-[var(--home-accent)] px-5 py-3.5 text-[13.5px] font-bold text-[var(--home-on-accent)]"
      >
        Book now <span aria-hidden>&rarr;</span>
      </a>
    </header>
  );
}
