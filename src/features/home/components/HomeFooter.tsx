import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { homeFooterColumns } from "@/config/homeNavigation";

export function HomeFooter() {
  return <ThemedFooter columns={homeFooterColumns} />;
}
