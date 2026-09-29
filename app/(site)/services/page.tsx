import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { NumberedList } from "@/components/sections/lists";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { pillars } from "@/content/pillars";
import { serviceHref } from "@/content/services";
import { getServices } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Services",
  description: "Strategy & Advisory, Technology Solutions, Cybersecurity & Digital Trust, and Learning, Innovation & Research. Four integrated practices from one trusted partner.",
  path: "/services",
});

const valueSteps = [
  { title: "Discover", body: "Understand objectives, operating environment, risks and opportunities." },
  { title: "Design", body: "Develop practical strategies and solution architectures aligned with business priorities." },
  { title: "Deliver", body: "Implement solutions using proven methodologies and global best practice." },
  { title: "Defend", body: "Protect technology investments through cybersecurity, governance and resilience." },
  { title: "Develop", body: "Build organizational capability through training, mentoring and knowledge transfer." },
  { title: "Drive", body: "Measure performance, optimise outcomes and support continuous improvement." },
];

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services" }]}
        eyebrow="What we do"
        title="Integrated solutions for a digital world"
        intro="Our business is organised around four complementary practices. Each reinforces the others, so you can move from strategy to execution, and from execution to lasting capability, with one accountable partner."
        image={{ src: "/images/lagos-bridge.jpg", alt: "Lagos waterfront and bridge from above" }}
        actions={
          <>
            <ButtonLink href="/consultation" variant="sky">
              Book a consultation
            </ButtonLink>
            <ButtonLink href="/solutions" variant="outline-light">
              Featured solutions
            </ButtonLink>
          </>
        }
      />

      <Section>
        <div className="space-y-6">
          {pillars.map((p, i) => {
            const list = services.filter((s) => s.pillar === p.slug);
            return (
              <Reveal key={p.slug}>
                <article className="group grid overflow-hidden rounded-[2rem] bg-mist ring-1 ring-line lg:grid-cols-12">
                  <div className={`relative min-h-72 lg:col-span-5 ${i % 2 ? "lg:order-2" : ""}`}>
                    <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 to-transparent" />
                    <span className="absolute bottom-6 left-6 font-serif text-7xl font-bold text-white/90">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="p-8 sm:p-12 lg:col-span-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white">
                      <Icon name={p.icon} className="h-6 w-6" />
                    </span>
                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-navy">{p.tagline}</p>
                    <h2 className="mt-2 text-3xl sm:text-4xl">
                      <Link href={`/services/${p.slug}`} className="hover:text-navy">
                        {p.title}
                      </Link>
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{p.summary}</p>
                    <ul className="mt-8 grid gap-x-6 gap-y-1 sm:grid-cols-2">
                      {list.map((s) => (
                        <li key={s.slug}>
                          <Link href={serviceHref(s)} className="group/l flex items-center justify-between gap-3 border-b border-line py-3 text-[1rem] font-semibold text-ink hover:text-navy">
                            {s.title}
                            <ArrowUpRight className="h-4 w-4 shrink-0 opacity-30 transition-all group-hover/l:opacity-100" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <ButtonLink href={`/services/${p.slug}`} variant="secondary" size="sm">
                        Explore {p.shortTitle}
                      </ButtonLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading align="split" eyebrow="How we deliver value" title="Six disciplines in every engagement." intro="A structured methodology designed to ensure measurable outcomes, whether the engagement lasts a week or several years." />
        <div className="mt-14">
          <NumberedList items={valueSteps} />
        </div>
      </Section>

      <Section>
        <Stagger className="grid gap-5 md:grid-cols-3">
          {[
            { title: "Reduce complexity", body: "One partner for strategy, implementation, cybersecurity, innovation and capability development." },
            { title: "Accelerate transformation", body: "Integrated teams and reusable methods move you from decision to delivery faster." },
            { title: "Strengthen governance", body: "Consistent oversight, reporting and security across every workstream." },
          ].map((v) => (
            <StaggerItem key={v.title} className="rounded-3xl border border-line p-8">
              <h3 className="text-2xl">{v.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{v.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CtaBand title="Let us shape the right engagement together." />
    </>
  );
}
