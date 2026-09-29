import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Analytics } from "@/components/layout/analytics";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { company } from "@/content/company";
import { getSiteSettings } from "@/lib/data";
import { absoluteUrl } from "@/lib/utils";
import { isSanityConfigured } from "@/sanity/env";
import { SanityLive } from "@/sanity/lib/live";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();
  const { isEnabled: isDraft } = await draftMode();

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    alternateName: "CEDELA",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo/cedela-logo.png"),
    slogan: company.tagline,
    foundingDate: String(company.founded),
    email: settings.email,
    telephone: settings.phones[0],
    sameAs: settings.socials.map((s) => s.href),
    address: settings.offices.map((o) => ({
      "@type": "PostalAddress",
      streetAddress: o.lines[0],
      addressLocality: o.name,
      addressCountry: "NG",
    })),
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-white">
        Skip to content
      </a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c") }} />
      <Header announcement={settings.announcement} />
      <main id="main">{children}</main>
      <Footer settings={settings} />
      <SmoothScroll />
      <Analytics />
      {isSanityConfigured && <SanityLive />}
      {isDraft && <VisualEditing />}
    </>
  );
}
