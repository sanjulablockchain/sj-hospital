import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora, Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "St. Joseph Hospital Negombo | To Live Is a Privilege",
  description:
    "US-standard healthcare in Negombo, Sri Lanka. 24/7 OPD, Emergency, Pharmacy, in-house doctors, and digital X-ray, with inpatient rooms from 10,000 LKR.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${sora.variable} ${bricolageGrotesque.variable} ${manrope.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <noscript>
          <style>{`[data-reveal] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
