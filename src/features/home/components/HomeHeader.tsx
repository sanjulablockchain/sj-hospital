import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { homeNavigation } from "@/config/homeNavigation";

export function HomeHeader() {
  return <ThemedHeader navItems={homeNavigation} bookHref="/e-channeling" />;
}
