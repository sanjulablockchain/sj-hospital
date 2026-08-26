import { ThemedFooter } from "@/components/layout/ThemedFooter";

const careLinks = [
  { label: "Services", href: "/services" },
  { label: "Surgical care", href: "#surgical" },
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Accommodation", href: "#rooms" },
];

const hospitalLinks = [
  { label: "Facilities", href: "/facilities" },
  { label: "International patient care", href: "/international-care" },
  { label: "Health tips", href: "/health-tips" },
  { label: "School wellness", href: "#wellness" },
  { label: "Network", href: "/network" },
  { label: "Media", href: "#media" },
  { label: "Careers", href: "/careers" },
];

export function HomeFooter() {
  return (
    <ThemedFooter
      columns={[
        { heading: "Care", links: careLinks },
        { heading: "Hospital", links: hospitalLinks },
      ]}
    />
  );
}
