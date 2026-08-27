import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { channelingFooterColumns } from "@/config/channelingNavigation";
import { ChannelingHero } from "./ChannelingHero";
import { DirectorySection } from "./DirectorySection";
import { HelpSection } from "./HelpSection";

/**
 * The e-channeling page in source order: hero, then the directory (this
 * page's one job) and the closing help rail. No jump cards: a page with two
 * sections and one job has nothing worth four shortcuts to.
 */
export function EChannelingPage() {
  return (
    <>
      <main>
        <ChannelingHero />
        <DirectorySection />
        <HelpSection />
      </main>
      <ThemedFooter columns={channelingFooterColumns} id="footer" />
    </>
  );
}
