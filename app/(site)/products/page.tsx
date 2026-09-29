import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PlatformInterestForm } from "@/components/forms/forms";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { innovation } from "@/content/innovation";
import { futurePlatforms, productCategories } from "@/content/solutions";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Products & Platforms",
  description: "iRES, our 24/7 Cyber Incident Response Centre, and a growing portfolio of AI governance, GRC, compliance automation and executive dashboard platforms.",
  path: "/products",
});

const statusLabel = { live: "Live", "in-development": "In development", planned: "Planned" } as const;

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Products" }]}
        eyebrow="Products, platforms & digital solutions"
        title="Building intelligent solutions for a digital future"
        intro="Innovation is most valuable when it becomes a scalable solution to a real problem. Our products complement our advisory and implementation services and create lasting value for clients."
      />

      <Section>
        <Reveal>
          <Link href="/products/ires" className="on-dark group relative isolate grid overflow-hidden rounded-[2rem] bg-midnight text-white lg:grid-cols-2">
            <div className="relative z-10 p-8 sm:p-12 lg:p-16">
              <span className="rounded-full bg-sky px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-midnight">Flagship platform</span>
              <p className="mt-8 font-serif text-7xl font-bold sm:text-8xl">iRES</p>
              <p className="mt-2 text-xl text-sky">Intelligent Response & Emergency Service</p>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
                A 24/7 Cyber Incident Response Centre with an emergency hotline, secure reporting portal, AI-assisted workflows and expert responders.
              </p>
              <span className="mt-10 inline-flex items-center gap-2 font-semibold text-sky">
                Explore iRES <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
            </div>
            <div className="relative min-h-72">
              <Image src="/images/soc-operations.jpg" alt="Security analysts at monitoring stations" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-70 transition-transform duration-[1.2s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/40 to-transparent" />
            </div>
          </Link>
        </Reveal>
      </Section>

      <Section tone="mist">
        <SectionHeading align="split" eyebrow="Our product portfolio" title="Six strategic categories." intro="Together, these offerings form an integrated ecosystem for secure and sustainable digital transformation." />
        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((c, i) => (
            <StaggerItem key={c.title} className="bg-white p-8">
              <span className="font-serif text-sm font-bold text-navy">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-2xl">{c.title}</h3>
              <p className="mt-2 text-muted">{c.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <SectionHeading eyebrow="Future digital platforms" title="What we are building next" intro="These platforms are in our innovation pipeline. Register interest to join early access and help shape them." />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {futurePlatforms.map((p) => (
            <StaggerItem key={p.slug} className="flex h-full flex-col rounded-3xl p-8 ring-1 ring-line">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-tint text-navy">
                  <Icon name={p.icon} className="h-6 w-6" />
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${p.status === "in-development" ? "bg-sky/20 text-navy" : "bg-mist text-muted"}`}>{statusLabel[p.status]}</span>
              </div>
              <h3 className="mt-6 text-2xl">{p.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{p.summary}</p>
            </StaggerItem>
          ))}
          <StaggerItem className="flex h-full flex-col justify-between rounded-3xl bg-navy p-8 text-white">
            <p className="font-serif text-2xl font-bold text-white">And more in the pipeline</p>
            <ul className="mt-4 space-y-1.5 text-white/75">
              {["AI-powered cyber risk analytics", "Secure digital identity services", "Cyber resilience dashboards", "Enterprise AI assistants"].map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>
      </Section>

      <Section tone="tint" id="early-access">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5">Early access</p>
            <h2 className="text-4xl">Help shape our next platforms.</h2>
            <p className="mt-5 text-lg text-muted">Every CEDELA product is purpose-driven, secure by design, scalable, standards-aligned and user-centred. Early adopters work with our product teams directly.</p>
            <ul className="mt-8 space-y-2">
              {innovation.incubationFocus.slice(0, 4).map((f) => (
                <li key={f} className="flex items-center gap-3 font-semibold text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy" /> {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2rem] bg-white p-8 ring-1 ring-line sm:p-10 lg:col-span-7">
            <PlatformInterestForm platforms={futurePlatforms.map((p) => p.title)} />
          </Reveal>
        </div>
      </Section>

      <CtaBand title="See iRES in action." primary={{ label: "Request a demonstration", href: "/products/ires#demo" }} secondary={{ label: "Contact us", href: "/contact" }} />
    </>
  );
}
