import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { CheckList, TagList } from "@/components/sections/lists";
import { PageHero } from "@/components/sections/page-hero";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { esg } from "@/content/company";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Sustainability & ESG",
  description: "CEDELA's environmental, social and governance commitments, responsible AI principles and sustainability priorities for 2026 to 2030.",
  path: "/sustainability",
});

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Sustainability & ESG" }]}
        eyebrow="Sustainability, ESG & corporate citizenship"
        title="Creating sustainable impact through responsible leadership"
        intro="Our success is measured not only by the solutions we deliver, but by the positive and lasting impact we create for clients, communities and future generations."
        image={{ src: "/images/agriculture-farmer.jpg", alt: "Farmer tending crops" }}
      />

      <Section>
        <SectionHeading align="split" eyebrow="Our ESG framework" title="Three interconnected pillars." intro="Sustainability is integrated into our strategy, operations, partnerships and solutions." />
        <Stagger className="mt-14 grid gap-5 lg:grid-cols-3">
          {esg.pillars.map((p) => (
            <StaggerItem key={p.title} className="flex flex-col rounded-[2rem] bg-mist p-9 ring-1 ring-line">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white">
                <Icon name={p.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-7 text-3xl">{p.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
              <div className="mt-7 border-t border-line pt-7">
                <CheckList items={p.items} />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="midnight" className="grain">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Responsible artificial intelligence" title="AI should augment human capability." intro="While protecting individual rights and societal interests." />
          </div>
          <div className="lg:col-span-7">
            <CheckList items={esg.responsibleAI} columns={2} tone="dark" />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Cybersecurity for society" title="Building a safer digital ecosystem." titleClassName="!text-4xl" intro="As cyber threats evolve, cybersecurity has become a public interest issue. We contribute through awareness programmes, capacity development, public sector advisory, research and collaboration with national and international stakeholders." />
          </div>
          <div>
            <SectionHeading eyebrow="Building digital talent" title="Africa's digital future depends on skills." titleClassName="!text-4xl" />
            <div className="mt-8">
              <TagList items={["Professional certifications", "Executive education", "Graduate programmes", "Internships", "AI academies", "Cybersecurity boot camps", "Innovation laboratories", "Leadership development"]} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="tint">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-5">Measuring our impact</p>
            <h2 className="text-4xl">Indicators we intend to track</h2>
            <p className="mt-4 text-muted">As our sustainability programme evolves, these indicators will help us evaluate outcomes, improve performance and demonstrate accountability.</p>
            <div className="mt-8">
              <TagList items={esg.indicators} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-5">Priorities 2026 to 2030</p>
            <ol className="space-y-3">
              {esg.priorities.map((p, i) => (
                <li key={p} className="flex gap-4 rounded-2xl bg-white px-5 py-4">
                  <span className="font-serif font-bold text-navy">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-semibold">{p}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      <CtaBand eyebrow="Community partnerships" title="Collaboration amplifies impact." body="We partner with educational institutions, government agencies, professional bodies, community organizations and development partners to expand access to knowledge and inclusive innovation." primary={{ label: "Partner with us", href: "/partnerships#partner" }} />
    </>
  );
}
