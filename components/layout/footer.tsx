import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo, LogoMark } from "@/components/brand/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { SocialIcon } from "@/components/ui/social-icons";
import { company } from "@/content/company";
import { footerNav, legalNav } from "@/content/navigation";
import type { SiteSettings } from "@/content/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark grain relative isolate overflow-hidden bg-midnight-900 text-white">
      <LogoMark className="pointer-events-none absolute -bottom-40 -right-40 -z-10 h-[36rem] w-[36rem] opacity-[0.04]" color="#77D4FC" />

      <div className="container-x border-b border-white/10 py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Insights briefing</p>
            <h2 className="max-w-xl text-3xl leading-tight sm:text-4xl">Thinking on technology, cyber risk and transformation in Africa, in your inbox.</h2>
          </div>
          <div className="lg:col-span-5">
            <NewsletterForm />
            <p className="mt-3 pl-4 text-sm text-white/50">Monthly. No spam. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="light" height={40} />
          <p className="mt-6 max-w-sm font-serif text-lg italic leading-relaxed text-white/75">{company.tagline}</p>
          <div className="mt-8 flex gap-2">
            {settings.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition hover:bg-sky hover:text-midnight"
              >
                <SocialIcon name={s.label} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          {footerNav.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-sky">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline text-[0.97rem] text-white/70 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-6 lg:col-span-3">
          {settings.offices.map((o) => (
            <div key={o.name} className="flex gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-sky" aria-hidden />
              <div className="text-[0.95rem] leading-relaxed text-white/70">
                <p className="font-semibold text-white">{o.label}</p>
                {o.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="flex gap-3">
            <Phone className="mt-1 h-4 w-4 shrink-0 text-sky" aria-hidden />
            <div className="text-[0.95rem] text-white/70">
              {settings.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block hover:text-white">
                  {p}
                </a>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Mail className="mt-1 h-4 w-4 shrink-0 text-sky" aria-hidden />
            <a href={`mailto:${settings.email}`} className="text-[0.95rem] text-white/70 hover:text-white">
              {settings.email}
            </a>
          </div>
        </div>
      </div>

      <div className="container-x flex flex-col gap-4 border-t border-white/10 py-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {company.name} All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-6">
          {legalNav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/sitemap.xml" className="hover:text-white">
              Sitemap
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
