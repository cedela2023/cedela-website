import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ImageCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { CheckList } from "@/components/sections/lists";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { getIndustries } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Industries",
  description: "Sector-specific strategy, technology and cybersecurity for government, financial services, healthcare, energy, oil and gas, telecoms, education, SMEs and more.",
  path: "/industries",
});

const crossIndustry = [
  "Digital Transformation Strategy",
  "Artificial Intelligence",
  "Cybersecurity & Digital Trust",
  "Cloud Computing",
  "Enterprise Architecture",
  "Governance, Risk & Compliance",
  "Data & Analytics",
  "Business Continuity & Disaster Recovery",
  "Executive Leadership Advisory",
  "Change Management",
  "Capacity Development",
  "Managed Services",
];

export default async function IndustriesPage() {
  const industries = await getIndustries();
  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries" }]}
        eyebrow="Industry solutions"
        title="Sector-specific innovation across Africa"
        intro="Every industry faces unique challenges. We combine deep sector knowledge with technology, cybersecurity and strategic advisory to deliver measurable business outcomes."
        image={{ src: "/images/telecom-towers.jpg", alt: "Telecommunication towers at dusk" }}
      />
      <Section>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
          {industries.map((i) => (
            <StaggerItem key={i.slug}>
              <ImageCard href={`/industries/${i.slug}`} image={i.image} title={i.title} body={i.summary} kicker={i.tagline} aspect="aspect-[4/3]" />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Cross-industry expertise" title="Themes that cut across every sector." intro="Industry specialisation combined with proven practices from multiple domains." />
          </div>
          <div className="lg:col-span-7">
            <CheckList items={crossIndustry} columns={2} />
          </div>
        </div>
      </Section>
      <CtaBand title="Let us talk about your sector." />
    </>
  );
}
