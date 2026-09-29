import { notFound } from "next/navigation";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { LinkCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { CheckList } from "@/components/sections/lists";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { pillars, getPillar } from "@/content/pillars";
import { serviceHref } from "@/content/services";
import { solutions } from "@/content/solutions";
import { getIndustries, getServices } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[pillar]">) {
  const { pillar } = await params;
  const p = getPillar(pillar);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.summary, path: `/services/${p.slug}`, image: p.image.src });
}

const pillarSolutions: Record<string, string[]> = {
  "strategy-advisory": ["digital-readiness-assessment", "ai-readiness-assessment", "digital-transformation-office", "executive-strategy-retreat"],
  "technology-solutions": ["digital-readiness-assessment", "ai-readiness-assessment", "digital-transformation-office"],
  "cybersecurity-digital-trust": ["cyber-maturity-assessment", "ciso-as-a-service", "soc-as-a-service", "ires"],
  "learning-innovation-research": ["executive-strategy-retreat", "ai-readiness-assessment", "digital-readiness-assessment"],
};

export default async function PillarPage({ params }: PageProps<"/services/[pillar]">) {
  const { pillar } = await params;
  const p = getPillar(pillar);
  if (!p) notFound();

  const [services, industries] = await Promise.all([getServices(), getIndustries()]);
  const list = services.filter((s) => s.pillar === p.slug);
  const related = solutions.filter((s) => pillarSolutions[p.slug]?.includes(s.slug));
  const relevantIndustries = industries.filter((i) => i.services.some((slug) => list.some((s) => s.slug === slug))).slice(0, 8);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: p.title }]}
        eyebrow={p.tagline}
        title={p.title}
        intro={p.summary}
        image={p.image}
        actions={
          <>
            <ButtonLink href={`/consultation?interest=${encodeURIComponent(p.title)}`} variant="sky">
              Speak to a specialist
            </ButtonLink>
            <ButtonLink href="#services" variant="outline-light">
              View {list.length} services
            </ButtonLink>
          </>
        }
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-6">Overview</p>
            <p className="font-serif text-2xl leading-snug text-ink sm:text-[2rem]">{p.intro}</p>
            <div className="mt-10">
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-muted">Outcomes we deliver</p>
              <CheckList items={p.outcomes} columns={2} />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6">
            <ParallaxImage src={p.image.src} alt={p.image.alt} className="aspect-[4/3] rounded-[2rem]" />
          </Reveal>
        </div>
      </Section>

      <Section tone="mist" id="services">
        <SectionHeading eyebrow="Our services" title={`${list.length} ways we help`} intro="Each service can be engaged on its own or combined into an integrated programme." />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <StaggerItem key={s.slug}>
              <LinkCard href={serviceHref(s)} icon={s.icon} title={s.title} body={s.summary} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {related.length > 0 && (
        <Section>
          <SectionHeading align="split" eyebrow="Signature solutions" title="Where many clients begin." intro="Focused engagements that create clarity and momentum quickly." />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((s) => (
              <StaggerItem key={s.slug}>
                <LinkCard href={s.href} icon={s.icon} kicker={s.kicker} title={s.title} body={s.summary} />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      {relevantIndustries.length > 0 && (
        <Section tone="midnight" spacing="tight">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <Reveal>
              <p className="eyebrow mb-3">Industries</p>
              <h2 className="text-3xl">Applied across sectors</h2>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-wrap gap-2 lg:max-w-3xl lg:justify-end">
              {relevantIndustries.map((i) => (
                <a key={i.slug} href={`/industries/${i.slug}`} className="rounded-full bg-white/5 px-4 py-2 text-[0.95rem] font-semibold text-white/85 ring-1 ring-white/10 transition hover:bg-sky hover:text-midnight">
                  {i.title}
                </a>
              ))}
            </Reveal>
          </div>
        </Section>
      )}

      <CtaBand title={`Talk to our ${p.shortTitle.toLowerCase()} team.`} primary={{ label: "Book a consultation", href: `/consultation?interest=${encodeURIComponent(p.title)}` }} />
    </>
  );
}
