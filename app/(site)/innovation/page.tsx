import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { LinkCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { CheckList, TagList } from "@/components/sections/lists";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { innovation } from "@/content/innovation";
import { getServicesByPillar, serviceHref } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Innovation & Research",
  description: "CEDELA's innovation philosophy, research focus areas, AI Centre of Excellence, Innovation Labs and product incubation programme.",
  path: "/innovation",
});

export default function InnovationPage() {
  const lir = getServicesByPillar("learning-innovation-research");
  return (
    <>
      <PageHero
        crumbs={[{ label: "Innovation & research" }]}
        eyebrow="Driving innovation. Creating the future."
        title="Innovation is about solving meaningful problems"
        intro="Not simply inventing new technologies, but creating sustainable value and shaping a better future. We invest in research, experimentation and collaboration so our clients are ready for tomorrow."
        image={{ src: "/images/circuit-security.jpg", alt: "Illuminated circuit board" }}
        actions={
          <ButtonLink href="/partnerships#partner" variant="sky">
            Collaborate with us
          </ButtonLink>
        }
      />

      <Section>
        <SectionHeading align="split" eyebrow="Our innovation philosophy" title="Five guiding principles." />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {innovation.principles.map((p, i) => (
            <StaggerItem key={p.title} className="rounded-3xl bg-mist p-7 ring-1 ring-line">
              <span className="font-serif text-sm font-bold text-navy">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-xl leading-snug">{p.title}</h3>
              <p className="mt-2 text-[0.96rem] leading-relaxed text-muted">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="midnight" className="grain">
        <SectionHeading eyebrow="From ideas to impact" title="A systematic innovation pipeline" intro="Managing innovation deliberately reduces risk while accelerating value creation." />
        <Stagger className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {innovation.pipeline.map((step, i) => (
            <StaggerItem key={step} className="relative rounded-2xl bg-white/[0.05] p-5 ring-1 ring-white/10">
              <span className="font-mono text-xs text-sky">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-3 font-serif text-lg font-bold">{step}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Research & development" title="Research is the foundation of sustainable innovation." titleClassName="!text-4xl" intro="Our research outputs include white papers, policy briefs, executive insights, benchmarking reports and practical frameworks." />
            <div className="mt-8">
              <ButtonLink href="/insights" variant="secondary">
                Read our insights
              </ButtonLink>
            </div>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-muted">Research focus areas</p>
            <TagList items={innovation.researchAreas} />
          </Reveal>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading align="split" eyebrow="Emerging technologies" title="What we evaluate and adopt." />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {innovation.emerging.map((e) => (
            <StaggerItem key={e.title} className="rounded-3xl bg-white p-8 ring-1 ring-line">
              <Icon name={e.icon} className="h-7 w-7 text-navy" />
              <h3 className="mt-6 text-2xl">{e.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{e.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <ParallaxImage src="/images/developer.jpg" alt="Developer working on a laptop" className="aspect-[4/3] rounded-[2rem]" />
          </Reveal>
          <div>
            <SectionHeading eyebrow="AI Centre of Excellence" title="A trusted partner in responsible AI adoption." titleClassName="!text-4xl" intro="Helping organizations harness AI while maintaining transparency, accountability, fairness and security." />
            <div className="mt-8">
              <CheckList items={innovation.aiCoe} columns={2} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Innovation Labs" title="Where ideas are tested and refined." titleClassName="!text-4xl" intro="CEDELA is establishing Innovation Labs that bring together multidisciplinary teams, startups, researchers, clients and technology partners to co-create practical solutions." />
            <div className="mt-8">
              <TagList items={innovation.labs} />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Product incubation" title="From concept to commercial product." titleClassName="!text-4xl" intro="Our incubation programme supports the design, development, validation and commercialisation of digital products and platforms." />
            <div className="mt-8">
              <TagList items={innovation.incubationFocus} />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Our vision for 2030" title="Where we are headed" />
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {innovation.aspirations2030.map((a, i) => (
            <StaggerItem key={a} className="rounded-3xl border border-line p-7">
              <span className="font-serif text-sm font-bold text-navy">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-4 text-[1.05rem] font-semibold leading-snug">{a}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="mist">
        <SectionHeading eyebrow="Learning, Innovation & Research services" title="Engage our practice" />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {lir.map((s) => (
            <StaggerItem key={s.slug}>
              <LinkCard href={serviceHref(s)} icon={s.icon} title={s.title} body={s.summary} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CtaBand eyebrow="Collaborate" title="Innovation flourishes through collaboration." primary={{ label: "Propose a partnership", href: "/partnerships#partner" }} />
    </>
  );
}
