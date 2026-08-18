import Image from "next/image";
import { homeNavigation } from "@/config/homeNavigation";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { MobileNavPanel } from "./MobileNavPanel";

export function HomeHeader() {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-5 px-5 py-5 sm:px-8 lg:px-11">
      <a href="#top" className="flex shrink-0 items-center gap-3">
        <Image
          src="/images/logo.png"
          alt="St. Joseph Hospital"
          width={1248}
          height={386}
          className="h-10 w-auto brightness-0 invert"
          priority
        />
        <span className="block text-[10px] tracking-[0.22em] text-[#7FCBFF]">HOSPITAL &middot; NEGOMBO</span>
      </a>

      <nav className="ml-auto hidden items-center gap-5 text-[13px] font-semibold min-[1120px]:flex max-[1279px]:gap-4 max-[1279px]:text-[12.5px]">
        {homeNavigation.map((item) => (
          <a key={item.href} href={item.href} className="text-white/82 hover:text-white">
            {item.label}
          </a>
        ))}
      </nav>

      <MobileNavPanel items={homeNavigation} />

      <ThemeToggleButton />

      <a
        href="#book"
        className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap bg-[var(--home-accent)] px-5 py-3.5 text-[13.5px] font-bold text-[var(--home-on-accent)]"
      >
        Book now <span aria-hidden>&rarr;</span>
      </a>
    </header>
  );
}
