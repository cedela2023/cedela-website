import { CalendarDays, FileDown, FileText, KeyRound, LifeBuoy, LineChart, ShieldAlert } from "lucide-react";
import { PortalAccessForm } from "@/components/forms/forms";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = {
  ...pageMetadata({ title: "Client Portal", description: "Secure client portal for CEDELA clients: project status, reports, deliverables, iRES incident tracking, support and meetings.", path: "/portal" }),
  robots: { index: false, follow: true },
};

const features = [
  { icon: LineChart, title: "View project status", body: "Milestones, progress and risks at a glance." },
  { icon: FileText, title: "Access reports", body: "Assessments, executive summaries and dashboards." },
  { icon: FileDown, title: "Download deliverables", body: "Every deliverable in one secure library." },
  { icon: ShieldAlert, title: "Track incidents", body: "Follow iRES cases and communicate with responders." },
  { icon: LifeBuoy, title: "Manage support requests", body: "Raise and track managed service tickets." },
  { icon: CalendarDays, title: "Schedule meetings", body: "Book time with your engagement team." },
];

export default function PortalPage() {
  const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL;
  return (
    <>
      <PageHero
        compact
        crumbs={[{ label: "Client portal" }]}
        eyebrow="Secure area"
        title="Client portal"
        intro="A secure space for CEDELA clients to follow engagements, access deliverables, track iRES incidents and work with our teams."
        aside={
          <div className="rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky text-midnight">
              <KeyRound className="h-6 w-6" />
            </span>
            <p className="mt-5 font-serif text-2xl font-bold">Existing clients</p>
            {portalUrl ? (
              <>
                <p className="mt-2 text-white/70">Sign in with the credentials issued by your engagement manager. Multi-factor authentication is required.</p>
                <div className="mt-6">
                  <ButtonLink href={portalUrl} variant="sky" external>
                    Sign in securely
                  </ButtonLink>
                </div>
              </>
            ) : (
              <p className="mt-2 text-white/70">Portal access is being rolled out to clients in stages. Your engagement manager will send secure sign-in instructions, or request access below.</p>
            )}
          </div>
        }
      />
      <Section>
        <SectionHeading eyebrow="What you can do" title="Everything about your engagement, in one place." />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <StaggerItem key={f.title} className="rounded-3xl bg-mist p-8 ring-1 ring-line">
              <f.icon className="h-7 w-7 text-navy" />
              <h3 className="mt-6 text-xl">{f.title}</h3>
              <p className="mt-2 text-muted">{f.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <Section tone="tint">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5">Request access</p>
            <h2 className="text-4xl">New to the portal?</h2>
            <p className="mt-5 text-lg text-muted">Access is verified against your active engagement before credentials are issued. Protected by encryption and multi-factor authentication.</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2rem] bg-white p-8 ring-1 ring-line sm:p-10 lg:col-span-7">
            <PortalAccessForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
