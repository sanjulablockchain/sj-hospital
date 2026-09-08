import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { homeFooterColumns } from "@/config/homeNavigation";
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";

export function HomeFooter({ locale }: { locale: Locale }) {
  return (
    <ThemedFooter
      columns={translateFooterColumns(homeFooterColumns, locale)}
      reachUsLabel={navLabel("Reach us", locale)}
    />
  );
}
