import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { InvestorForm } from "@/components/forms/forms";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TagList } from "@/components/sections/lists";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { ecosystem2030, growthStrategy, investmentHighlights, marketTrends, revenueStreams, vision2030Pillars } from "@/content/company";
import { getSiteSettings } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Investors",
  description: "Investing in Africa's digital future: CEDELA's investment highlights, Vision 2030, growth strategy, business model, governance and ESG approach.",
  path: "/investors",
});

export default async function InvestorsPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <PageHero
        crumbs={[{ label: "Investors" }]}
        eyebrow="Investment opportunity"
        title="Investing in Africa's digital future"
        intro="The future belongs to organizations that combine innovation, trusted technology, strong governance and local relevance. CEDELA is building that future."
        image={{ src: "/images/lagos-bridge.jpg", alt: "Lagos skyline and bridge" }}
        actions={
          <>
            <ButtonLink href="#memorandum" variant="sky">
              Investor information
            </ButtonLink>
            <ButtonLink href="#vision-2030" variant="outline-light">
              Vision 2030
            </ButtonLink>
          </>
        }
      />

      <Section>
        <SectionHeading align="split" eyebrow="Investment highlights" title="A company positioned for growth." intro="CEDELA's business model combines consulting, managed services, proprietary digital platforms, executive education and innovation. Our ambition is not simply to participate in Africa's digital economy, but to help shape it." />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {investmentHighlights.map((h) => (
            <StaggerItem key={h.title} className="rounded-3xl bg-mist p-8 ring-1 ring-line">
              <Icon name={h.icon} className="h-7 w-7 text-navy" />
              <h3 className="mt-6 text-2xl">{h.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{h.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="midnight" className="grain">
        <SectionHeading align="split" eyebrow="Why Africa, why now" title="Long-term trends driving sustained demand." />
        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {marketTrends.map((t) => (
            <StaggerItem key={t.title} className="bg-midnight p-7">
              <h3 className="text-xl">{t.title}</h3>
              <p className="mt-3 text-[0.96rem] leading-relaxed text-white/65">{t.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section id="vision-2030">
        <SectionHeading align="split" eyebrow="Vision 2030" title="Shaping Africa's digital future." intro="By 2030, CEDELA aims to be recognised as a leading African innovation and technology company, a trusted advisor, a cybersecurity and digital trust specialist, and a catalyst for innovation and digital inclusion." />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {vision2030Pillars.map((p, i) => (
            <StaggerItem key={p.title} className={`rounded-3xl p-7 ${i === 0 ? "bg-navy text-white" : "bg-mist ring-1 ring-line"}`}>
              <div className="flex items-center justify-between">
                <Icon name={p.icon} className={`h-6 w-6 ${i === 0 ? "text-sky" : "text-navy"}`} />
                <span className={`font-mono text-xs ${i === 0 ? "text-sky" : "text-muted"}`}>Pillar {i + 1}</span>
              </div>
              <h3 className={`mt-6 text-xl ${i === 0 ? "text-white" : ""}`}>{p.title}</h3>
              <p className={`mt-2 text-[0.96rem] leading-relaxed ${i === 0 ? "text-white/75" : "text-muted"}`}>{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-14 rounded-[2rem] bg-tint p-8 sm:p-10">
          <p className="eyebrow mb-5">The CEDELA innovation ecosystem by 2030</p>
          <TagList items={ecosystem2030} />
        </Reveal>
      </Section>

      <Section tone="mist">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Growth strategy" title="Six strategic pillars" titleClassName="!text-4xl" />
            <ol className="mt-10 space-y-4">
              {growthStrategy.map((g, i) => (
                <Reveal as="li" key={g.title} delay={i * 0.04} className="flex gap-5 rounded-2xl bg-white p-6 ring-1 ring-line">
                  <span className="font-serif text-lg font-bold text-navy">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-xl">{g.title}</h3>
                    <p className="mt-1 text-muted">{g.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading eyebrow="Business model" title="Diversified revenue streams" titleClassName="!text-4xl" intro="Project-based engagements balanced with recurring revenue and scalable digital products." />
            <div className="mt-10 divide-y divide-line border-y border-line">
              {revenueStreams.map((r) => (
                <Reveal key={r.title} className="py-5">
                  <h3 className="text-xl">{r.title}</h3>
                  <p className="mt-1 text-muted">{r.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Areas for strategic investment" title="Where capital accelerates the vision" />
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Product development", b: "Enhancing proprietary platforms, AI capabilities, automation and digital solutions." },
            { t: "Innovation infrastructure", b: "Innovation Labs, Centres of Excellence and collaborative research facilities." },
            { t: "Talent", b: "Recruiting, developing and retaining world-class consultants, engineers and security professionals." },
            { t: "Technology", b: "Secure cloud infrastructure, modern development environments and operational capability." },
            { t: "Market expansion", b: "Business development, regional partnerships and presence across Africa." },
            { t: "Brand and thought leadership", b: "Research, industry events and executive education that reinforce reputation." },
          ].map((x) => (
            <StaggerItem key={x.t} className="rounded-3xl border border-line p-7">
              <h3 className="text-xl">{x.t}</h3>
              <p className="mt-2 text-muted">{x.b}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="tint" spacing="tight">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { href: "/about/leadership", title: "Corporate governance", body: "Board structure, committees and our governance framework." },
            { href: "/sustainability", title: "ESG approach", body: "Environmental, social and governance commitments and priorities." },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="group flex items-center justify-between gap-6 rounded-3xl bg-white p-8 ring-1 ring-line transition hover:ring-navy/30">
              <div>
                <h3 className="text-2xl group-hover:text-navy">{l.title}</h3>
                <p className="mt-1 text-muted">{l.body}</p>
              </div>
              <ArrowUpRight className="h-6 w-6 shrink-0 text-navy" />
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="midnight" id="memorandum" className="grain">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky text-midnight">
              <FileText className="h-6 w-6" />
            </span>
            <p className="eyebrow mb-5 mt-6">Investor Information Memorandum</p>
            {settings.investorMemorandumUrl ? (
              <>
                <h2 className="text-4xl">Download the memorandum.</h2>
                <p className="mt-5 text-lg text-white/70">Our Investor Information Memorandum sets out our strategy, market opportunity and growth plans in detail.</p>
                <div className="mt-8">
                  <ButtonLink href={settings.investorMemorandumUrl} variant="sky" external>
                    Download PDF
                  </ButtonLink>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-4xl">Request investor information.</h2>
                <p className="mt-5 text-lg text-white/70">The Investor Information Memorandum is being finalised. Register your interest and our investor relations team will share it as soon as it is available.</p>
              </>
            )}
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2rem] bg-white p-8 text-ink sm:p-10 lg:col-span-7">
            <InvestorForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
