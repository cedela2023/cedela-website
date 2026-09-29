import { Check, Phone, ShieldAlert, Sparkles } from "lucide-react";
import { DemoForm } from "@/components/forms/forms";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { IresConsole } from "@/components/sections/ires-console";
import { TagList } from "@/components/sections/lists";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { ires } from "@/content/ires";
import { getSiteSettings } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "iRES | 24/7 Cyber Incident Response Centre",
  description: "iRES, Intelligent Response & Emergency Service: 24/7 hotline, secure incident reporting, rapid triage, ransomware response, forensics coordination and recovery.",
  path: "/products/ires",
});

export default async function IresPage() {
  const settings = await getSiteSettings();
  const hotline = settings.phones[0];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Products", href: "/products" }, { label: "iRES" }]}
        eyebrow={ires.descriptor}
        title="iRES. Intelligent Response & Emergency Service."
        highlight={["iRES."]}
        intro={ires.quote}
        actions={
          <>
            <ButtonLink href="/products/ires/report" variant="sky">
              Report an incident
            </ButtonLink>
            <ButtonLink href="#demo" variant="outline-light">
              Request a demonstration
            </ButtonLink>
          </>
        }
        aside={<IresConsole />}
      />

      {/* Emergency strip */}
      <div className="bg-alert text-white">
        <div className="container-x flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center">
          <p className="flex items-center gap-3 font-semibold">
            <ShieldAlert className="h-5 w-5 shrink-0" /> Under attack right now? Do not wait. Call the iRES hotline.
          </p>
          <a href={`tel:${hotline.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-bold text-alert transition hover:bg-white/90">
            <Phone className="h-4 w-4" /> {hotline}
          </a>
        </div>
      </div>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow mb-6">Overview</p>
            <p className="font-serif text-2xl leading-snug text-ink sm:text-[2.1rem] sm:leading-[1.3]">{ires.overview}</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-muted">Designed for</p>
            <TagList items={ires.audiences} />
          </Reveal>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading align="split" eyebrow="Key capabilities" title="Everything you need when an incident hits." intro="From the first call to the lessons-learned report, iRES coordinates the people, tools and communication that limit damage." />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.05}>
          {ires.capabilities.map((c) => (
            <StaggerItem key={c.title} className="rounded-3xl bg-white p-7 ring-1 ring-line">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-tint text-navy">
                <Icon name={c.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl">{c.title}</h3>
              <p className="mt-2 text-[0.97rem] leading-relaxed text-muted">{c.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="midnight" className="grain">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Incident reporting and 24/7 response" title="Report in minutes. Response within the target window." />
            <Reveal delay={0.1} className="mt-8 space-y-5 text-lg leading-relaxed text-white/70">
              <p>Report through the emergency hotline or the secure iRES portal, any hour of any day. Every report is triaged, classified and assigned to an incident handler.</p>
              <p>You receive a case reference, clear next steps and regular executive situation reports until the incident is closed.</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/products/ires/report" variant="sky">
                Open the iRES portal
              </ButtonLink>
              <ButtonLink href={`tel:${hotline.replace(/\s/g, "")}`} variant="outline-light" arrow={false}>
                Call {hotline}
              </ButtonLink>
            </Reveal>
          </div>
          <Stagger className="grid content-start gap-3 sm:grid-cols-3">
            {ires.workflow.map((w, i) => (
              <StaggerItem key={w.step} className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
                <span className="font-mono text-xs text-sky">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-serif text-lg font-bold">{w.step}</p>
                <p className="mt-1 text-sm leading-snug text-white/55">{w.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white">
              <Sparkles className="h-6 w-6" />
            </span>
            <p className="eyebrow mb-4 mt-6">AI-powered workflows</p>
            <h2 className="text-4xl">Faster decisions, with humans firmly in control.</h2>
            <p className="mt-5 text-lg text-muted">Responsible AI accelerates the repetitive work so responders can focus on judgement, containment and communication.</p>
          </Reveal>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {ires.aiWorkflows.map((a) => (
              <StaggerItem key={a} className="rounded-3xl bg-tint p-7">
                <Check className="h-5 w-5 text-navy" />
                <p className="mt-4 text-[1.05rem] font-semibold leading-snug text-ink">{a}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section tone="mist" id="packages">
        <SectionHeading align="center" eyebrow="Service packages" title="Choose the level of cover you need." intro="Every package includes access to the 24/7 hotline and reporting portal. Pricing is tailored to your size and risk profile." className="mx-auto" />
        <Stagger className="mt-14 grid gap-5 lg:grid-cols-3">
          {ires.packages.map((p) => (
            <StaggerItem
              key={p.name}
              className={cn("relative flex flex-col rounded-[2rem] p-8 sm:p-10", p.featured ? "on-dark bg-midnight text-white shadow-2xl lg:-my-4" : "bg-white ring-1 ring-line")}
            >
              {p.featured && <span className="absolute right-8 top-8 rounded-full bg-sky px-3 py-1 text-xs font-bold uppercase tracking-wider text-midnight">Most chosen</span>}
              <h3 className="text-3xl">{p.name}</h3>
              <p className={cn("mt-2", p.featured ? "text-white/65" : "text-muted")}>{p.tagline}</p>
              <ul className="mt-8 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className={cn("mt-1 h-4 w-4 shrink-0", p.featured ? "text-sky" : "text-navy")} strokeWidth={2.5} />
                    <span className={p.featured ? "text-white/85" : "text-ink-soft"}>{f}</span>
                  </li>
                ))}
              </ul>
              <ButtonLink href="#demo" variant={p.featured ? "sky" : "secondary"} className="mt-10 w-full">
                Talk to us about {p.name}
              </ButtonLink>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section id="guidance">
        <SectionHeading eyebrow="Emergency guidance" title="The first hour matters most." intro="If you suspect a cyber incident, these steps help protect evidence and limit damage while help is on the way." />
        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2 lg:grid-cols-3">
          {ires.emergencyGuidance.map((g, i) => (
            <StaggerItem key={g.title} className="bg-white p-8">
              <span className={cn("font-serif text-sm font-bold", i === ires.emergencyGuidance.length - 1 ? "text-alert" : "text-navy")}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl">{g.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{g.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="midnight" id="demo" className="grain">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5">Request a demonstration</p>
            <h2 className="text-4xl sm:text-5xl">See how iRES would work for your organization.</h2>
            <p className="mt-6 text-lg text-white/70">A tailored walkthrough of the reporting portal, response workflow and executive reporting, with time for your questions.</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <DemoForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
