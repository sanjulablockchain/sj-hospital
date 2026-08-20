import { ServicesHero } from "./index/ServicesHero";
import { JumpCards } from "./index/JumpCards";

// Tasks 11-15 append their sections here, in the spec's order: centres,
// directory, surgical, diagnostics, packages, admissions, facilities,
// pharmacy, international, book, footer.
export function ServicesIndexPage() {
  return (
    <>
      <ServicesHero />
      <JumpCards />
    </>
  );
}
