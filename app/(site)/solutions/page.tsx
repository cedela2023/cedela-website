import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { LinkCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { solutions } from "@/content/solutions";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Solutions",
  description: "Digital, cyber and AI readiness assessments, CISO and SOC as a Service, iRES incident response, the Digital Transformation Office and executive strategy retreats.",
  path: "/solutions",
});

const groups = [
  { title: "Assess", intro: "Clear, evidence-based baselines that tell leadership where to focus first.", slugs: ["digital-readiness-assessment", "cyber-maturity-assessment", "ai-readiness-assessment"] },
  { title: "Secure and lead", intro: "Managed capability that gives you expert protection and leadership without building it all in-house.", slugs: ["ciso-as-a-service", "soc-as-a-service", "ires"] },
  { title: "Transform", intro: "Governance and alignment that keep transformation on course.", slugs: ["digital-transformation-office", "executive-strategy-retreat"] },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Solutions" }]}
        eyebrow="Signature solutions"
        title="Focused offerings that create momentum"
        intro="Our signature solutions package deep expertise into clear, outcome-driven engagements, so leaders can assess, secure and accelerate with confidence."
        image={{ src: "/images/strategy-session.jpg", alt: "Leaders in a strategy session" }}
        actions={
          <ButtonLink href="/consultation" variant="sky">
            Find the right starting point
          </ButtonLink>
        }
      />
      {groups.map((g, i) => (
        <Section key={g.title} tone={i % 2 ? "mist" : "white"}>
          <SectionHeading align="split" eyebrow={`0${i + 1}`} title={g.title} intro={g.intro} />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {solutions
              .filter((s) => g.slugs.includes(s.slug))
              .map((s) => (
                <StaggerItem key={s.slug}>
                  <LinkCard href={s.href} icon={s.icon} kicker={s.kicker} title={s.title} body={s.summary} />
                </StaggerItem>
              ))}
          </Stagger>
        </Section>
      ))}
      <CtaBand title="Not sure which solution fits?" body="Tell us about your priorities and we will recommend the engagement that creates the most value, fastest." />
    </>
  );
}
