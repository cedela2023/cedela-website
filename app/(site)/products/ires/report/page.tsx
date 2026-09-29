import Link from "next/link";
import { LayoutDashboard, MessagesSquare, Phone, Search, ShieldAlert } from "lucide-react";
import { IncidentForm } from "@/components/forms/forms";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { ires } from "@/content/ires";
import { getSiteSettings } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = {
  ...pageMetadata({
    title: "iRES Portal | Report a Cyber Incident",
    description: "Report a cyber incident to the iRES 24/7 Cyber Incident Response Centre and access emergency guidance.",
    path: "/products/ires/report",
  }),
  robots: { index: true, follow: true },
};

export default async function ReportPage() {
  const settings = await getSiteSettings();
  const hotline = settings.phones[0];
  return (
    <>
      <PageHero
        compact
        crumbs={[{ label: "Products", href: "/products" }, { label: "iRES", href: "/products/ires" }, { label: "Report an incident" }]}
        eyebrow="iRES portal"
        title="Report a cyber incident"
        intro="Tell us what is happening and an iRES incident handler will call you. For critical incidents that are stopping operations, call the hotline first."
        aside={
          <a href={`tel:${hotline.replace(/\s/g, "")}`} className="group flex items-center gap-5 rounded-3xl bg-alert p-7 text-white shadow-2xl transition hover:bg-[#d63c41]">
            <span className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white/30" />
              <Phone className="relative h-6 w-6" />
            </span>
            <span>
              <span className="block text-sm font-bold uppercase tracking-[0.16em] text-white/80">24/7 emergency hotline</span>
              <span className="mt-1 block font-serif text-3xl font-bold">{hotline}</span>
            </span>
          </a>
        }
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="rounded-[2rem] p-0 sm:p-2">
                <IncidentForm />
              </div>
            </Reveal>
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <Reveal className="rounded-[2rem] bg-midnight p-8 text-white">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-sky">
                <ShieldAlert className="h-4 w-4" /> While you wait
              </p>
              <ol className="mt-6 space-y-5">
                {ires.emergencyGuidance.map((g, i) => (
                  <li key={g.title} className="flex gap-4">
                    <span className="font-mono text-sm text-sky">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-semibold text-white">{g.title}</p>
                      <p className="mt-1 text-[0.95rem] leading-relaxed text-white/60">{g.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.1} className="rounded-[2rem] bg-tint p-8">
              <p className="font-serif text-2xl font-bold">Existing iRES clients</p>
              <p className="mt-2 text-muted">Sign in to the secure portal to track investigations, communicate with responders and view response dashboards.</p>
              <ul className="mt-6 space-y-3 text-[0.97rem] font-semibold text-ink">
                <li className="flex items-center gap-3"><Search className="h-4 w-4 text-navy" /> Track investigations</li>
                <li className="flex items-center gap-3"><MessagesSquare className="h-4 w-4 text-navy" /> Communicate with responders</li>
                <li className="flex items-center gap-3"><LayoutDashboard className="h-4 w-4 text-navy" /> View response dashboards</li>
              </ul>
              <Link href="/portal" className="mt-6 inline-flex font-semibold text-navy underline decoration-sky decoration-2 underline-offset-4">
                Go to the client portal
              </Link>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  );
}
