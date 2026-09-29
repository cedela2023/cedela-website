import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { CheckList, NumberedList, TagList } from "@/components/sections/lists";
import { PageHero } from "@/components/sections/page-hero";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { deliveryPrinciples, frameworksCatalogue, transformationFramework } from "@/content/company";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our Approach",
  description: "The CEDELA Transformation Framework: Discover, Assess, Design, Deliver, Secure, Enable and Sustain. A proprietary methodology from strategy to measurable results.",
  path: "/approach",
});

export default function ApproachPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Our approach" }]}
        eyebrow="Our delivery methodology"
        title="Transforming strategy into measurable results"
        intro="Successful transformation is not defined by the technology deployed, but by the business outcomes achieved. Every engagement begins with understanding your business before recommending technology."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading eyebrow="The CEDELA Transformation Framework" title="Seven phases. One ecosystem." titleClassName="!text-4xl" intro="A structured yet flexible approach that supports organizations of every size, sector and level of digital maturity." />
              <div className="mt-10 rounded-3xl bg-midnight p-7 text-white">
                <p className="font-serif text-xl font-bold">TRANSFORM</p>
                <ol className="mt-4 space-y-2 text-[0.95rem] text-white/75">
                  {["Understand the vision", "Assess current state", "Design the future", "Build and implement", "Secure and govern", "Enable people and change", "Measure, improve, sustain"].map((s, i) => (
                    <li key={s} className="flex gap-3">
                      <span className="font-mono text-sky">{i + 1}</span> {s}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <div className="space-y-5 lg:col-span-8">
            {transformationFramework.map((p) => (
              <Reveal key={p.title} className="rounded-[2rem] bg-mist p-8 ring-1 ring-line sm:p-10">
                <div className="flex items-start gap-6">
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-white">
                    <Icon name={p.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-mono text-sm text-navy">Phase {p.phase}</p>
                    <h2 className="mt-1 text-3xl">{p.title}</h2>
                    <p className="mt-1 font-serif text-lg italic text-muted">{p.summary}</p>
                  </div>
                </div>
                <p className="mt-6 text-lg leading-relaxed text-ink-soft">{p.body}</p>
                <div className="mt-6">
                  <TagList items={p.items} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="midnight" className="grain">
        <SectionHeading align="split" eyebrow="Delivery principles" title="What guides every engagement." />
        <div className="mt-14">
          <NumberedList items={deliveryPrinciples} tone="dark" />
        </div>
      </Section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Project governance" title="Accountability built in" titleClassName="!text-4xl" intro="Regular governance meetings, milestone reviews and executive reporting maintain alignment throughout the lifecycle." />
            <Stagger className="mt-10 grid grid-cols-2 gap-3">
              {["Executive sponsor", "Steering committee", "Programme management office", "CEDELA engagement manager", "Technical leads", "Client project team", "Risk and quality assurance"].map((r) => (
                <StaggerItem key={r} className="rounded-2xl bg-tint px-5 py-4 font-semibold text-ink">
                  {r}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div>
            <SectionHeading eyebrow="Quality assurance" title="Reliable, scalable, aligned" titleClassName="!text-4xl" />
            <div className="mt-10">
              <CheckList
                items={[
                  "Following internationally recognised standards and best practice",
                  "Peer reviews and technical quality checks",
                  "Risk and compliance reviews",
                  "Tracking performance against agreed KPIs",
                  "Capturing lessons learned for continuous improvement",
                ]}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading align="center" eyebrow="Measuring success" title="Tangible outcomes, not just completed projects." className="mx-auto" />
        <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {["Increased operational efficiency", "Reduced cybersecurity risk", "Improved regulatory compliance", "Enhanced customer experience", "Greater digital maturity", "Faster decisions through data", "Stronger organizational resilience", "Sustainable capability development"].map((o) => (
            <StaggerItem key={o} className="rounded-2xl bg-white p-6 text-center font-serif text-lg font-bold text-navy ring-1 ring-line">
              {o}
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section spacing="tight">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-3">Standards and frameworks</p>
            <p className="text-muted">Our methods draw on internationally recognised frameworks, adapted to local regulatory, cultural and operational realities.</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <TagList items={frameworksCatalogue} />
          </Reveal>
        </div>
      </Section>

      <CtaBand title="Start with a conversation about your vision." />
    </>
  );
}
