import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { homeNavigation } from "@/config/homeNavigation";
import { translateNavItems } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";

export function HomeHeader({ locale }: { locale: Locale }) {
  return <ThemedHeader navItems={translateNavItems(homeNavigation, locale)} bookHref="/e-channeling" />;
}
