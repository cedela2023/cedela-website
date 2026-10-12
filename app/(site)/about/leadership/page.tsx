import { Fragment } from "react";
import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { BioDialog } from "@/components/sections/bio-dialog";
import { CtaBand } from "@/components/sections/cta-band";
import { CheckList, TagList } from "@/components/sections/lists";
import { PageHero } from "@/components/sections/page-hero";
import { SocialIcon } from "@/components/ui/social-icons";
import { Section, SectionHeading } from "@/components/ui/section";
import { governanceCommittees, governanceFocus, leadershipExpertise, leadershipPrinciples } from "@/content/company";
import type { TeamMember } from "@/content/types";
import { getTeam } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Leadership & Governance",
  description: "CEDELA's leadership philosophy, governance structure, board committees and the executive team guiding our growth.",
  path: "/about/leadership",
});

const groups: { key: TeamMember["group"]; title: string }[] = [
  { key: "executive", title: "Executive leadership" },
  { key: "board", title: "Board of directors" },
  { key: "advisory", title: "Advisory board" },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

export default async function LeadershipPage() {
  const team = await getTeam();

  const expertise = (
    <Section tone="mist">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-6">Our leadership team</p>
          <h2 className="text-4xl leading-tight">Multidisciplinary experience across Africa&apos;s key sectors.</h2>
          <p className="mt-5 text-lg text-muted">
            Our leaders bring experience across government, financial services, telecommunications, healthcare, manufacturing, education and international
            development. Full executive biographies will be published here shortly.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <TagList items={leadershipExpertise} />
        </Reveal>
      </div>
    </Section>
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Leadership & governance" }]}
        eyebrow="Leadership, governance & people"
        title="Building trust through leadership, integrity and excellence"
        intro="Technology drives transformation, but people provide the vision, leadership and integrity that make it sustainable."
        image={{ src: "/images/executive-blue.jpg", alt: "Executive in a blue suit" }}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-6">Our leadership philosophy</p>
            <h2 className="text-4xl leading-tight">Exceptional organizations are built on exceptional leadership.</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-7">
            <p>
              Our leadership is founded on integrity, accountability, innovation, collaboration and service. Sustainable growth requires more than technical
              expertise. It demands ethical leadership, sound governance and a culture that empowers people to achieve their full potential.
            </p>
            <p>We lead by example, fostering an environment where innovation flourishes, decisions are guided by evidence and every team member is committed to lasting value.</p>
          </Reveal>
        </div>
      </Section>

      {/* Team. Until executive profiles are published, a summary of the team's expertise stands in for them. */}
      {groups.map((g) => {
        const members = team.filter((m) => m.group === g.key);
        if (!members.length) return g.key === "executive" ? <Fragment key={g.key}>{expertise}</Fragment> : null;
        return (
          <Section key={g.key} tone={g.key === "executive" ? "mist" : "white"}>
            <SectionHeading eyebrow="Our people" title={g.title} />
            <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {members.map((m) => (
                <StaggerItem key={m.name} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-tint">
                    {m.image ? (
                      <Image src={m.image.src} alt={m.image.alt || m.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center font-serif text-6xl font-bold text-navy/30">{initials(m.name)}</span>
                    )}
                    {m.linkedin && (
                      <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label={`${m.name} on LinkedIn`} className="absolute bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow">
                        <SocialIcon name="LinkedIn" className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <h3 className="mt-5 text-xl">{m.name}</h3>
                  <p className="text-[0.97rem] font-semibold text-navy">{m.role}</p>
                  {m.bio && <p className="mt-3 line-clamp-4 text-[0.95rem] leading-relaxed text-muted">{m.bio.split(/\n\s*\n/)[0]}</p>}
                  {m.bio && <BioDialog name={m.name} role={m.role} bio={m.bio} />}
                </StaggerItem>
              ))}
            </Stagger>
          </Section>
        );
      })}

      {/* Governance structure */}
      <Section tone="midnight" className="grain">
        <SectionHeading align="split" eyebrow="Corporate governance" title="Structures that promote transparency and accountability." intro="As CEDELA grows, governance committees are established progressively to strengthen oversight and strategic direction." />
        <Reveal className="mt-16">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <Node label="Shareholders" />
            <Line />
            <Node label="Board of Directors" strong />
            <Line />
            <div className="grid w-full gap-3 sm:grid-cols-3">
              {governanceCommittees.map((c) => (
                <div key={c.title} className="rounded-2xl bg-white/[0.05] p-5 text-left ring-1 ring-white/10">
                  <p className="font-serif text-lg font-bold">{c.title}</p>
                  <p className="mt-1 text-sm leading-snug text-white/60">{c.body}</p>
                </div>
              ))}
            </div>
            <Line />
            <Node label="Chief Executive Officer" strong />
            <Line />
            <div className="grid w-full grid-cols-2 gap-3 lg:grid-cols-4">
              {["Strategy & Advisory", "Technology Solutions", "Cybersecurity & Digital Trust", "Learning, Innovation & Research"].map((d) => (
                <div key={d} className="rounded-2xl bg-sky/10 px-4 py-4 text-[0.95rem] font-semibold text-sky ring-1 ring-sky/25">
                  {d}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Governance framework" title="What our governance supports" titleClassName="!text-4xl" />
            <div className="mt-10">
              <CheckList items={governanceFocus} columns={2} />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Leadership principles" title="What we expect of our leaders" titleClassName="!text-4xl" />
            <Stagger className="mt-10 space-y-3">
              {leadershipPrinciples.map((p) => (
                <StaggerItem key={p.title} className="rounded-2xl bg-tint px-6 py-5">
                  <p className="font-serif text-xl font-bold text-navy">{p.title}</p>
                  <p className="mt-1 text-muted">{p.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading align="split" eyebrow="Ethics & business conduct" title="Integrity underpins everything we do." intro="All employees, consultants and partners are expected to uphold the highest standards of professional conduct." />
        <div className="mt-12">
          <TagList
            items={["Honesty and transparency", "Confidentiality", "Respect for client information", "Compliance with laws and regulations", "Conflict-of-interest management", "Anti-corruption and anti-bribery", "Responsible use of technology", "Respect for human rights"]}
          />
        </div>
      </Section>

      <CtaBand eyebrow="Join us" title="Build the future of digital Africa with us." primary={{ label: "Explore careers", href: "/careers" }} secondary={{ label: "Contact us", href: "/contact" }} />
    </>
  );
}

function Node({ label, strong }: { label: string; strong?: boolean }) {
  return <div className={strong ? "rounded-full bg-sky px-7 py-3 font-semibold text-midnight" : "rounded-full px-7 py-3 font-semibold text-white ring-1 ring-white/25"}>{label}</div>;
}

function Line() {
  return <span className="h-8 w-px bg-white/25" aria-hidden />;
}
