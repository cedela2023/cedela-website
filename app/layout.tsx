import type { Metadata, Viewport } from "next";
import { Caladea, Carlito } from "next/font/google";
import { company } from "@/content/company";
import "./globals.css";

// Caladea and Carlito are metric-compatible open equivalents of Cambria and
// Calibri, the typefaces specified in the CEDELA Brand Identity Guide.
const caladea = Caladea({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--font-caladea", display: "swap" });
const carlito = Carlito({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--font-carlito", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cedelatechpark.ng";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CEDELA Tech Park Solutions | Innovation, Technology & Digital Trust",
    template: "%s | CEDELA",
  },
  description: company.description,
  applicationName: "CEDELA",
  keywords: [
    "Digital Transformation Consulting in Nigeria",
    "Cybersecurity Consulting Africa",
    "AI Strategy Consulting",
    "CISO as a Service",
    "SOC as a Service",
    "Governance, Risk & Compliance",
    "ISO 27001 Consulting",
    "Executive Cybersecurity Training",
    "Incident Response Services",
    "Digital Trust Consulting",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "CEDELA Tech Park Solutions",
    title: "CEDELA Tech Park Solutions",
    description: company.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08123f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG" className={`${caladea.variable} ${carlito.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
