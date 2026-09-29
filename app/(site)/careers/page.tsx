import Link from "next/link";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import { ApplicationForm } from "@/components/forms/forms";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CheckList, TagList } from "@/components/sections/lists";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { programmes } from "@/content/careers";
import { careers, values } from "@/content/company";
import { getVacancies } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Careers",
  description: "Build your career at CEDELA. Current vacancies, graduate programme, internships, professional development and our commitment to diversity and inclusion.",
  path: "/careers",
});

export default async function CareersPage() {
  const vacancies = await getVacancies();
  const positions = [...vacancies.map((v) => v.title), "Graduate Programme", "Internship", "General application"];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Careers" }]}
        eyebrow="Careers at CEDELA"
        title="Do work that shapes Africa's digital future"
        intro="Join consultants, technologists, researchers and trainers who combine technical excellence with deep business understanding. We grow when our people grow."
        image={{ src: "/images/developer.jpg", alt: "Smiling developer working at a laptop" }}
        actions={
          <>
            <ButtonLink href="#vacancies" variant="sky">
              View vacancies
            </ButtonLink>
            <ButtonLink href="#apply" variant="outline-light">
              Apply now
            </ButtonLink>
          </>
        }
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Life at CEDELA" title="People are our greatest competitive advantage." titleClassName="!text-4xl" intro="Our culture reflects our core values of Professionalism, Leadership, Innovation and Service. We encourage our people to think strategically, innovate responsibly, collaborate openly and act with integrity." />
            <div className="mt-8">
              <TagList items={careers.culture} />
            </div>
          </div>
          <Reveal delay={0.1} className="relative">
            <ParallaxImage src="/images/team-boardroom.jpg" alt="Team collaborating in a meeting room" className="aspect-[4/3] rounded-[2rem]" />
            <div className="absolute -bottom-6 left-6 flex gap-2">
              {values.map((v) => (
                <span key={v.letter} title={v.title} className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy font-serif text-2xl font-bold text-white shadow-xl">
                  {v.letter}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="mist" id="vacancies">
        <SectionHeading align="split" eyebrow="Current vacancies" title={vacancies.length ? `${vacancies.length} open ${vacancies.length === 1 ? "role" : "roles"}` : "Open roles"} intro="Roles are published here as soon as they open." />
        {vacancies.length ? (
          <div className="mt-12 divide-y divide-line overflow-hidden rounded-3xl bg-white ring-1 ring-line">
            {vacancies.map((v) => (
              <Link key={v.slug} href={`/careers/${v.slug}`} className="group flex flex-col gap-4 p-7 transition hover:bg-tint sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-2xl group-hover:text-navy">{v.title}</h3>
                  <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem] text-muted">
                    <span className="inline-flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {v.department}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {v.location}</span>
                    <span>{v.type}</span>
                  </p>
                </div>
                <ArrowUpRight className="h-6 w-6 text-navy" />
              </Link>
            ))}
          </div>
        ) : (
          <Reveal className="mt-12 rounded-3xl bg-white p-10 text-center ring-1 ring-line">
            <p className="font-serif text-2xl font-bold">There are no open roles right now.</p>
            <p className="mx-auto mt-3 max-w-xl text-muted">We are always glad to hear from talented people. Send a general application and we will be in touch when a suitable role opens.</p>
            <div className="mt-6">
              <ButtonLink href="#apply" variant="secondary">
                Send a general application
              </ButtonLink>
            </div>
          </Reveal>
        )}
      </Section>

      <Section>
        <SectionHeading eyebrow="Early careers" title="Building the future workforce" intro="Through graduate programmes, internships and mentorship, we equip emerging professionals to thrive in the digital economy." />
        <Stagger className="mt-12 grid gap-5 lg:grid-cols-2">
          {programmes.map((p, i) => (
            <StaggerItem key={p.title} className={`rounded-[2rem] p-9 ${i === 0 ? "bg-navy text-white" : "bg-tint"}`}>
              <h3 className={`text-3xl ${i === 0 ? "text-white" : ""}`}>{p.title}</h3>
              <p className={`mt-3 text-lg ${i === 0 ? "text-white/75" : "text-muted"}`}>{p.body}</p>
              <div className="mt-8">
                <CheckList items={p.points} tone={i === 0 ? "dark" : "light"} />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="mist">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Professional development" title="Continuous learning is our culture." titleClassName="!text-4xl" />
            <div className="mt-8">
              <CheckList items={careers.development} columns={2} />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Diversity, equity & inclusion" title="Innovation thrives on diverse perspectives." titleClassName="!text-4xl" intro="We are committed to an inclusive workplace where people are valued for their skills, experiences and ideas." />
            <div className="mt-8">
              <TagList items={careers.inclusion} />
            </div>
          </div>
        </div>
      </Section>

      <Section id="apply">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5">Apply</p>
            <h2 className="text-4xl sm:text-5xl">Tell us about yourself.</h2>
            <p className="mt-6 text-lg text-muted">Every application is reviewed by our talent team. Shortlisted candidates are contacted for a conversation with the hiring team.</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[2rem] bg-mist p-8 ring-1 ring-line sm:p-10 lg:col-span-7">
            <ApplicationForm positions={positions} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
