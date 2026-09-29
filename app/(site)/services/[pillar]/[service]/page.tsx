import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { CheckList, TagList } from "@/components/sections/lists";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { getPillar } from "@/content/pillars";
import { services as seedServices, serviceHref } from "@/content/services";
import { getIndustries, getServices } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return seedServices.map((s) => ({ pillar: s.pillar, service: s.slug }));
}

async function load(pillar: string, slug: string) {
  const services = await getServices();
  const service = services.find((s) => s.pillar === pillar && s.slug === slug);
  return { service, services };
}

export async function generateMetadata({ params }: PageProps<"/services/[pillar]/[service]">) {
  const { pillar, service: slug } = await params;
  const { service } = await load(pillar, slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.summary, path: serviceHref(service) });
}

export default async function ServicePage({ params }: PageProps<"/services/[pillar]/[service]">) {
  const { pillar: pillarSlug, service: slug } = await params;
  const [{ service, services }, industries] = await Promise.all([load(pillarSlug, slug), getIndustries()]);
  const pillar = getPillar(pillarSlug);
  if (!service || !pillar) notFound();

  const siblings = services.filter((s) => s.pillar === pillar.slug && s.slug !== service.slug).slice(0, 3);
  const sectors = industries.filter((i) => i.services.includes(service.slug));
  const consultHref = `/consultation?interest=${encodeURIComponent(service.title)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: { "@type": "Organization", name: "CEDELA Tech Park Solutions Ltd." },
    areaServed: "Africa",
    serviceType: pillar.title,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: pillar.title, href: `/services/${pillar.slug}` }, { label: service.title }]}
        eyebrow={pillar.title}
        title={service.title}
        intro={service.summary}
        actions={
          <>
            <ButtonLink href={consultHref} variant="sky">
              Discuss your needs
            </ButtonLink>
            <ButtonLink href="#approach" variant="outline-light">
              Our approach
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10 backdrop-blur">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky text-midnight">
              <Icon name={service.icon} className="h-7 w-7" />
            </span>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-sky">At a glance</p>
            <dl className="mt-4 space-y-3 text-[0.97rem]">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-white/60">Practice</dt>
                <dd className="text-right font-semibold">{pillar.shortTitle}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <dt className="text-white/60">Deliverables</dt>
                <dd className="font-semibold">{service.deliverables.length}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/60">Frameworks</dt>
                <dd className="text-right font-semibold">{service.frameworks.slice(0, 2).join(", ")}</dd>
              </div>
            </dl>
          </div>
        }
      />

      {service.challenge && (
        <Section>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow">The business challenge</p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <p className="font-serif text-2xl leading-snug text-ink sm:text-[2.1rem] sm:leading-[1.3]">{service.challenge}</p>
            </Reveal>
          </div>
        </Section>
      )}

      {service.approach.length > 0 && (
        <Section tone="midnight" id="approach" className="grain">
          <SectionHeading eyebrow="The CEDELA approach" title="How we work with you" />
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {service.approach.map((step, i) => (
              <StaggerItem key={step.title} className="relative bg-midnight p-8">
                <span className="font-mono text-sm text-sky">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-2xl">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-white/65">{step.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-5">Deliverables</p>
            <h2 className="mb-8 text-3xl sm:text-4xl">What you receive</h2>
            <CheckList items={service.deliverables} />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-5">Benefits</p>
            <h2 className="mb-8 text-3xl sm:text-4xl">The difference it makes</h2>
            <ul className="space-y-4">
              {service.benefits.map((b, i) => (
                <li key={b} className="flex items-baseline gap-5 rounded-2xl bg-tint px-6 py-5">
                  <span className="font-serif text-lg font-bold text-navy">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[1.05rem] font-semibold text-ink">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {service.frameworks.length > 0 && (
        <Section tone="mist" spacing="tight">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow mb-3">Relevant frameworks</p>
              <p className="text-muted">Aligned with internationally recognised standards, adapted to local regulation.</p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-8">
              <TagList items={service.frameworks} />
            </Reveal>
          </div>
        </Section>
      )}

      {(siblings.length > 0 || sectors.length > 0) && (
        <Section>
          <div className="grid gap-14 lg:grid-cols-12">
            {siblings.length > 0 && (
              <div className="lg:col-span-8">
                <p className="eyebrow mb-8">Related services</p>
                <div className="divide-y divide-line border-y border-line">
                  {siblings.map((s) => (
                    <Link key={s.slug} href={serviceHref(s)} className="group flex items-center gap-6 py-6">
                      <Icon name={s.icon} className="h-6 w-6 shrink-0 text-navy" />
                      <span className="flex-1">
                        <span className="block font-serif text-xl font-bold group-hover:text-navy">{s.title}</span>
                        <span className="mt-1 block text-muted">{s.summary}</span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-navy opacity-40 transition group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {sectors.length > 0 && (
              <div className="lg:col-span-4">
                <p className="eyebrow mb-8">Industries</p>
                <ul className="space-y-2">
                  {sectors.map((i) => (
                    <li key={i.slug}>
                      <Link href={`/industries/${i.slug}`} className="flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold hover:bg-mist hover:text-navy">
                        <Icon name={i.icon} className="h-5 w-5 text-navy" />
                        {i.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      <CtaBand title={`Ready to explore ${service.title}?`} body="Tell us about your objectives and we will bring the right specialists to the conversation." primary={{ label: "Book a consultation", href: consultHref }} />
    </>
  );
}
