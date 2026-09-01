import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Sora,
  Bricolage_Grotesque,
  Manrope,
  Noto_Sans_Sinhala,
  Gemunu_Libre,
  Noto_Sans_Tamil,
  Catamaran,
} from "next/font/google";
import { notFound } from "next/navigation";
import { LOCALES, hasLocale } from "@/lib/i18n/locales";
import "../globals.css";

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

// preload is off for these four on purpose. All eight families are declared in
// one module, so preloading would make an English reader fetch Sinhala and
// Tamil files they will never see. Without the preload hint a browser fetches a
// face only when text actually uses it, which is exactly the behaviour wanted.
const notoSansSinhala = Noto_Sans_Sinhala({
  variable: "--font-noto-sinhala",
  subsets: ["sinhala"],
  weight: ["400", "500", "600", "700"],
  preload: false,
  display: "swap",
});

const gemunuLibre = Gemunu_Libre({
  variable: "--font-gemunu",
  subsets: ["sinhala"],
  weight: ["400", "600", "700", "800"],
  preload: false,
  display: "swap",
});

const notoSansTamil = Noto_Sans_Tamil({
  variable: "--font-noto-tamil",
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
  preload: false,
  display: "swap",
});

const catamaran = Catamaran({
  variable: "--font-catamaran",
  subsets: ["tamil", "latin"],
  weight: ["400", "600", "700", "800"],
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  title: "St. Joseph Hospital Negombo | To Live Is a Privilege",
  description:
    "US-standard healthcare in Negombo, Sri Lanka. 24/7 OPD, Emergency, Pharmacy, in-house doctors, and digital X-ray, with inpatient rooms from 10,000 LKR.",
};

/**
 * Prerender all three locales. Without this the tree is dynamic and every page
 * loses static rendering, which is the whole reason the cookie is read in the
 * proxy rather than in a page.
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;

  // A path such as /xx/contact-us must be a 404, not an English page wearing a
  // nonsense prefix.
  if (!hasLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${plusJakartaSans.variable} ${sora.variable} ${bricolageGrotesque.variable} ${manrope.variable} ${notoSansSinhala.variable} ${gemunuLibre.variable} ${notoSansTamil.variable} ${catamaran.variable} antialiased`}
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
