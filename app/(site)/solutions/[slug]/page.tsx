import { notFound } from "next/navigation";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { LinkCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { CheckList } from "@/components/sections/lists";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { getSolution, solutionPages, solutions } from "@/content/solutions";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutionPages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const s = getSolution(slug);
  return s ? pageMetadata({ title: s.title, description: s.summary, path: s.href }) : {};
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s || !s.href.startsWith("/solutions/")) notFound();
  const consult = `/consultation?interest=${encodeURIComponent(s.title)}`;
  const others = solutions.filter((o) => o.slug !== s.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Solutions", href: "/solutions" }, { label: s.title }]}
        eyebrow={s.kicker}
        title={s.title}
        intro={s.summary}
        actions={
          <ButtonLink href={consult} variant="sky">
            Request this {s.kicker === "Assessment" ? "assessment" : "solution"}
          </ButtonLink>
        }
        aside={
          s.format && (
            <dl className="divide-y divide-white/10 rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10">
              {s.format.map((f) => (
                <div key={f.label} className="py-4 first:pt-0 last:pb-0">
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-sky">{f.label}</dt>
                  <dd className="mt-1.5 text-[1.02rem] text-white/85">{f.value}</dd>
                </div>
              ))}
            </dl>
          )
        }
      />

      {s.body && (
        <Section>
          <Reveal className="max-w-4xl">
            <p className="font-serif text-2xl leading-snug text-ink sm:text-[2.1rem] sm:leading-[1.3]">{s.body}</p>
          </Reveal>
        </Section>
      )}

      <Section tone="mist">
        <div className="grid gap-14 lg:grid-cols-2">
          {s.areas && (
            <div>
              <SectionHeading eyebrow={s.kicker === "Assessment" ? "What we assess" : "What it covers"} title="Scope" titleClassName="!text-4xl" />
              <Stagger className="mt-10 grid gap-3 sm:grid-cols-2">
                {s.areas.map((a, i) => (
                  <StaggerItem key={a} className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 ring-1 ring-line">
                    <span className="font-serif text-sm font-bold text-navy">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-semibold">{a}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          )}
          {s.deliverables && (
            <div>
              <SectionHeading eyebrow="Deliverables" title="What you receive" titleClassName="!text-4xl" />
              <div className="mt-10">
                <CheckList items={s.deliverables} />
              </div>
            </div>
          )}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Explore more" title="Other signature solutions" />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {others.map((o) => (
            <StaggerItem key={o.slug}>
              <LinkCard href={o.href} icon={o.icon} kicker={o.kicker} title={o.title} body={o.summary} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CtaBand title={`Start your ${s.title}.`} primary={{ label: "Book a consultation", href: consult }} />
    </>
  );
}
