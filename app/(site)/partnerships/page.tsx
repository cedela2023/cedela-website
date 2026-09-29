import Image from "next/image";
import { PartnershipForm } from "@/components/forms/forms";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { NumberedList } from "@/components/sections/lists";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { collaborationPrinciples, partnershipLifecycle, partnershipTypes } from "@/content/company";
import { getPartners } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Partnerships",
  description: "Technology alliances, academic collaborations, professional memberships, government engagements, industry associations and development partners.",
  path: "/partnerships",
});

const objectives = [
  { title: "Expand capabilities", body: "We collaborate with leading technology companies and specialist organizations to complement our expertise and deliver best-in-class solutions." },
  { title: "Accelerate innovation", body: "Working with research institutions, innovation hubs and startups, we explore emerging technologies and develop practical solutions quickly." },
  { title: "Build capacity", body: "Through universities, professional bodies and training institutions, we help develop the next generation of technology and security professionals." },
  { title: "Create shared value", body: "Partnerships should create sustainable benefits for clients, communities and every participating organization." },
];

export default async function PartnershipsPage() {
  const partners = await getPartners();
  return (
    <>
      <PageHero
        crumbs={[{ label: "Partnerships" }]}
        eyebrow="Strategic partnerships & ecosystem"
        title="Building stronger outcomes through collaboration"
        intro="The most enduring innovations are rarely created in isolation. They emerge through collaboration, shared expertise and trusted partnerships."
        image={{ src: "/images/leaders-duo.jpg", alt: "Two professionals standing together in an office" }}
        actions={
          <ButtonLink href="#partner" variant="sky">
            Become a partner
          </ButtonLink>
        }
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-6">Our partnership philosophy</p>
            <h2 className="text-4xl leading-tight">No single organization has every capability required.</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-7">
            <p>
              Digital transformation, cybersecurity, AI, cloud adoption, digital inclusion and regulatory compliance are complex and interconnected challenges. Our
              approach is to build a dynamic ecosystem of partnerships that combines global expertise with local insight.
            </p>
            <p>Through collaboration with technology providers, academia, government, professional bodies, development partners and startups, we expand our capabilities and create greater value for our clients.</p>
          </Reveal>
        </div>
        <div className="mt-16">
          <NumberedList items={objectives} />
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading align="split" eyebrow="The CEDELA ecosystem" title="Six partnership communities." />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partnershipTypes.map((p) => {
            const list = partners.filter((x) => x.category === p.slug);
            return (
              <StaggerItem key={p.slug} className="flex flex-col rounded-3xl bg-white p-8 ring-1 ring-line">
                <Icon name={p.icon} className="h-7 w-7 text-navy" />
                <h3 className="mt-6 text-2xl">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {p.items.map((i) => (
                    <li key={i} className="rounded-full bg-tint px-3 py-1 text-sm font-semibold text-navy">
                      {i}
                    </li>
                  ))}
                </ul>
                {list.length > 0 && (
                  <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line pt-6">
                    {list.map((x) =>
                      x.logo ? (
                        <a key={x.name} href={x.url} target="_blank" rel="noreferrer" title={x.name} className="relative h-10 w-24 grayscale transition hover:grayscale-0">
                          <Image src={x.logo.src} alt={x.logo.alt || x.name} fill sizes="96px" className="object-contain" />
                        </a>
                      ) : (
                        <span key={x.name} className="text-sm font-semibold text-ink">
                          {x.name}
                        </span>
                      ),
                    )}
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <Section tone="midnight" className="grain">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Strategic collaboration framework" title="Principles behind every partnership" titleClassName="!text-4xl" />
            <Stagger className="mt-10 space-y-3">
              {collaborationPrinciples.map((c) => (
                <StaggerItem key={c.title} className="flex gap-5 rounded-2xl bg-white/[0.05] p-5 ring-1 ring-white/10">
                  <span className="font-serif text-lg font-bold text-sky">{c.title}</span>
                  <span className="text-white/70">{c.body}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div>
            <SectionHeading eyebrow="Partnership lifecycle" title="Purposeful and well-governed" titleClassName="!text-4xl" />
            <ol className="relative mt-10 space-y-3 border-l border-white/15 pl-8">
              {partnershipLifecycle.map((s, i) => (
                <Reveal as="li" key={s} delay={i * 0.05} className="relative">
                  <span className="absolute -left-[calc(2rem+5px)] top-2 h-2.5 w-2.5 rounded-full bg-sky" />
                  <span className="font-mono text-sm text-sky">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ml-4 font-serif text-xl font-bold">{s}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section id="partner">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5">Invitation to partner</p>
            <h2 className="text-4xl sm:text-5xl">Let us build Africa&apos;s digital future together.</h2>
            <p className="mt-6 text-lg text-muted">
              We welcome strategic investors, technology companies, universities, research institutions, development finance institutions, government innovation
              agencies and startups who share our commitment to secure, inclusive and sustainable digital transformation.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2rem] bg-mist p-8 ring-1 ring-line sm:p-10 lg:col-span-7">
            <PartnershipForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
