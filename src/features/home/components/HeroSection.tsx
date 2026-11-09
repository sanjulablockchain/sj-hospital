import { AffiliationMark } from "@/components/layout/AffiliationMark";
import { Ticker } from "@/components/ui/Ticker";
import type { HomeContent } from "../data/getContent";
import { HeroSlideshow, type HeroSlideView } from "./HeroSlideshow";

/**
 * The hero: eight message slides, one per advantage the hospital leads with
 * (`content.heroSlides`), each with its own photograph crossfading under the
 * fixed-dark gradient, the sheen and scan-line effects, with the affiliation
 * mark above the copy and the stat ticker along the foot. Fixed-dark in both
 * themes because the photographs are. The literals below are the ones this
 * band has always used; see CLAUDE.md's theme rule for why they stay.
 *
 * This stays a Server Component. `HeroSlideshow` is the one client leaf and
 * receives the decorative layers, the rail and the mark as props, so it
 * holds nothing but behaviour and never imports a data file.
 *
 * The header is in normal flow above this band (ThemedShell `header="solid"`),
 * so unlike every other hero on the site this one pads by nothing and fills
 * the rest of the first viewport: 100vh less the utility bar and the header.
 */
export function HeroSection({
  slides,
  intervalMs,
  controls,
  locationLabel,
  tickerItems,
}: {
  slides: HeroSlideView[];
  intervalMs: number;
  controls: HomeContent["content"]["heroControls"];
  locationLabel: string;
  tickerItems: readonly string[];
}) {
  const backdrop = (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(rgba(12,8,38,0.84) 0%, rgba(12,8,38,0.4) 40%, rgba(12,8,38,0.95) 100%)",
        }}
      />
      <div
        className="animate-sj-sheen pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(70% 55% at 78% 26%, rgba(82,181,232,0.34) 0%, rgba(12,8,38,0) 66%)",
        }}
      />
      <div
        className="animate-sj-scan pointer-events-none absolute inset-x-0 top-0 h-[14%]"
        style={{
          background: "linear-gradient(rgba(159,214,245,0) 0%, rgba(159,214,245,0.16) 60%, rgba(159,214,245,0) 100%)",
        }}
      />
    </>
  );

  const rail = (
    <div className="hidden min-w-0 flex-col items-center gap-4.5 pb-2.5 min-[900px]:flex" style={{ flex: "0 0 44px" }}>
      <span className="text-[11px] tracking-[0.3em] text-white/55 uppercase" style={{ writingMode: "vertical-rl" }}>
        {locationLabel}
      </span>
      <span className="w-px flex-1 bg-gradient-to-b from-white/40 to-transparent" />
    </div>
  );

  return (
    <section id="top" className="relative flex min-h-[calc(100vh-120px)] flex-col overflow-hidden bg-[#0B0826]">
      <HeroSlideshow
        slides={slides}
        intervalMs={intervalMs}
        copy={controls}
        backdrop={backdrop}
        rail={rail}
        mark={<AffiliationMark tone="dark" />}
      />
      <Ticker items={tickerItems} />
    </section>
  );
}
