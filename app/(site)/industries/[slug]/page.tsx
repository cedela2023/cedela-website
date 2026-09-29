import { notFound } from "next/navigation";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { LinkCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { CheckList } from "@/components/sections/lists";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { industries as seedIndustries } from "@/content/industries";
import { serviceHref } from "@/content/services";
import { getIndustries, getServices } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return seedIndustries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const i = (await getIndustries()).find((x) => x.slug === slug);
  return i ? pageMetadata({ title: i.title, description: i.summary, path: `/industries/${i.slug}`, image: i.image.src }) : {};
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const [industries, services] = await Promise.all([getIndustries(), getServices()]);
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();
  const relevant = industry.services.map((s) => services.find((x) => x.slug === s)).filter((s): s is NonNullable<typeof s> => !!s);
  const others = industries.filter((i) => i.slug !== industry.slug).slice(0, 6);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries", href: "/industries" }, { label: industry.title }]}
        eyebrow={industry.tagline}
        title={industry.title}
        intro={industry.summary}
        image={industry.image}
        actions={
          <ButtonLink href={`/consultation?interest=${encodeURIComponent(industry.title)}`} variant="sky">
            Talk to a sector specialist
          </ButtonLink>
        }
      />

      <Section>
        <SectionHeading align="split" eyebrow="Sector challenges" title="What leaders in this sector are navigating." />
        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-2">
          {industry.challenges.map((c, i) => (
            <StaggerItem key={c.title} className="bg-white p-8 sm:p-10">
              <span className="font-serif text-sm font-bold text-navy">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-2xl">{c.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{c.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="midnight" className="grain">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="CEDELA solutions" title="How we help" />
            <div className="mt-10">
              <CheckList items={industry.solutions} columns={2} tone="dark" />
            </div>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6">
            <ParallaxImage src={industry.image.src} alt={industry.image.alt} className="aspect-[4/3] rounded-[2rem]" />
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading align="center" eyebrow="Business outcomes" title="What success looks like" className="mx-auto" />
        <Stagger className="mt-12 flex flex-wrap justify-center gap-4">
          {industry.outcomes.map((o) => (
            <StaggerItem key={o} className="rounded-full bg-tint px-7 py-4 font-serif text-xl font-bold text-navy">
              {o}
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {relevant.length > 0 && (
        <Section tone="mist">
          <SectionHeading eyebrow="Relevant services" title="Capabilities we bring" />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relevant.map((s) => (
              <StaggerItem key={s.slug}>
                <LinkCard href={serviceHref(s)} icon={s.icon} title={s.title} body={s.summary} />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      <Section spacing="tight">
        <p className="eyebrow mb-6">Other industries</p>
        <div className="flex flex-wrap gap-2">
          {others.map((o) => (
            <a key={o.slug} href={`/industries/${o.slug}`} className="rounded-full px-5 py-2.5 font-semibold ring-1 ring-line transition hover:bg-navy hover:text-white hover:ring-navy">
              {o.title}
            </a>
          ))}
        </div>
      </Section>

      <CtaBand title={`Transforming ${industry.title.toLowerCase()} together.`} primary={{ label: "Book a consultation", href: `/consultation?interest=${encodeURIComponent(industry.title)}` }} />
    </>
  );
}
