import Image from "next/image";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { challenges, commitments, company, philosophy, timeline, values } from "@/content/company";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Us",
  description: "From a social enterprise in 2016 to an innovation and technology company with regional ambition. Our story, vision, mission, promise and PLIS values.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About" }]}
        eyebrow="Our story"
        title="Transforming challenges into opportunities through innovation"
        intro="From a social enterprise in 2016 to an innovation and technology company with regional ambitions, CEDELA exists to help organizations harness technology as a catalyst for sustainable growth, resilience and innovation."
        image={{ src: "/images/lagos-aerial.jpg", alt: "Aerial view of Lagos" }}
      />

      {/* Beginning */}
      <Section>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-6">The beginning</p>
              <h2 className="text-4xl leading-tight sm:text-5xl">Founded on a simple, powerful belief.</h2>
              <blockquote className="mt-8 border-l-2 border-sky pl-6 font-serif text-2xl italic leading-snug text-navy">
                Technology should improve lives, strengthen institutions and unlock economic opportunity.
              </blockquote>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                In 2016, CEDELA began as a social enterprise with a mission to bridge the gap between technology, innovation and societal development. At a
                time when many organizations saw technology primarily as an operational tool, we recognised its potential to address some of society&apos;s most
                pressing challenges.
              </p>
              <p>
                Working closely with communities, educational institutions, businesses and public sector organizations gave us invaluable insight into the
                challenges facing organizations across Nigeria and Africa: limited digital capacity, fragmented technology investment, rising cyber threats,
                regulatory complexity and a shortage of skilled professionals.
              </p>
            </Reveal>
          </div>
          <div className="relative lg:col-span-6">
            <Reveal>
              <ParallaxImage src="/images/women-workshop.jpg" alt="Professionals collaborating in a workshop" className="aspect-[5/6] rounded-[2rem]" />
            </Reveal>
            <Reveal delay={0.2} className="absolute -bottom-8 right-6 max-w-xs rounded-3xl bg-navy p-7 text-white shadow-2xl sm:-right-4">
              <p className="font-serif text-lg leading-snug">
                Lasting digital transformation requires more than technology. It requires strategy, governance, innovation, skilled people and trusted partnerships.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Evolving */}
      <Section tone="mist">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-6">Evolving with purpose</p>
            <h2 className="text-4xl leading-tight">From mission-driven initiative to multidisciplinary company.</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-7">
            <p>
              As AI, cloud, data analytics, automation and IoT created unprecedented opportunity, and cyber threats and regulation raised the stakes, we expanded
              beyond technology consulting into integrated advisory spanning strategy, cybersecurity, innovation, implementation and professional development.
            </p>
            <p>
              In 2023, that evolution culminated in the incorporation of CEDELA Tech Park Solutions Ltd. It was more than a change in legal status. It was a
              commitment to scaling impact, investing in innovation and building a sustainable technology company able to serve organizations across Africa and
              beyond.
            </p>
            <p className="font-semibold text-ink">
              Today, CEDELA combines the purpose-driven values of its social enterprise roots with the agility, governance and commercial focus required to deliver
              enterprise-grade consulting and technology solutions.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Timeline */}
      <Section tone="midnight" className="grain">
        <SectionHeading eyebrow="Our journey" title="Building Africa's digital future" />
        <ol className="mt-16">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.year} delay={i * 0.04} className="grid lg:grid-cols-12">
              <p className="pb-3 font-serif text-4xl font-bold text-sky sm:text-5xl lg:col-span-4 lg:pb-0 lg:pr-12 lg:text-right">{t.year}</p>
              <div className="relative border-l border-white/15 pb-14 pl-8 sm:pl-12 lg:col-span-8">
                <span className={`absolute -left-[7px] top-3 h-3.5 w-3.5 rounded-full ring-4 ring-midnight ${t.year === "2030" ? "bg-white" : "bg-sky"}`} />
                <h3 className="text-2xl">{t.title}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-white/65">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Vision mission promise */}
      <Section>
        <Stagger className="grid gap-5 lg:grid-cols-3">
          {[
            { label: "Vision", text: company.vision, icon: "eye" as const },
            { label: "Mission", text: company.mission, icon: "target" as const },
            { label: "Promise", text: company.promise, icon: "handshake" as const },
          ].map((c, i) => (
            <StaggerItem key={c.label} className={`flex flex-col rounded-[2rem] p-9 ${i === 1 ? "bg-navy text-white" : "bg-tint"}`}>
              <Icon name={c.icon} className={`h-8 w-8 ${i === 1 ? "text-sky" : "text-navy"}`} />
              <p className={`mt-8 text-xs font-bold uppercase tracking-[0.2em] ${i === 1 ? "text-sky" : "text-navy"}`}>Our {c.label}</p>
              <p className={`mt-3 font-serif text-2xl leading-snug ${i === 1 ? "text-white" : "text-ink"}`}>{c.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Values */}
      <Section tone="mist">
        <SectionHeading align="split" eyebrow="Our core values" title="PLIS: how we think, work and serve." intro="Our values are embedded in our culture and reflected in every client engagement." />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <StaggerItem key={v.title} className="group relative overflow-hidden rounded-[2rem] bg-white p-8 ring-1 ring-line">
              <span className="pointer-events-none absolute -right-4 -top-10 font-serif text-[10rem] font-bold leading-none text-tint transition-colors duration-500 group-hover:text-sky/30">{v.letter}</span>
              <div className="relative">
                <Icon name={v.icon} className="h-7 w-7 text-navy" />
                <h3 className="mt-16 text-2xl">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{v.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Why we exist */}
      <Section>
        <SectionHeading
          align="split"
          eyebrow="Why CEDELA exists"
          title="Bridging the gap between ambition and execution."
          intro="Technology projects often fail not because the technology is inadequate, but because organizations lack an integrated approach that aligns strategy, governance, people, processes and technology."
        />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((c) => (
            <StaggerItem key={c.title} className="rounded-3xl border border-line p-8">
              <Icon name={c.icon} className="h-7 w-7 text-navy" />
              <h3 className="mt-6 text-xl">{c.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{c.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Commitments + philosophy */}
      <Section tone="tint">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our commitment" title="Five enduring commitments" titleClassName="!text-4xl" />
            <ol className="mt-10 space-y-6">
              {commitments.map((c, i) => (
                <Reveal as="li" key={c.title} delay={i * 0.05} className="flex gap-5">
                  <span className="font-serif text-lg font-bold text-navy">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-xl">{c.title}</h3>
                    <p className="mt-1 text-muted">{c.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading eyebrow="Our corporate philosophy" title="Technology should be" titleClassName="!text-4xl" />
            <Stagger className="mt-10 grid gap-3 sm:grid-cols-2">
              {philosophy.map((p) => (
                <StaggerItem key={p.title} className="rounded-2xl bg-white p-6">
                  <p className="font-serif text-xl font-bold text-navy">{p.title}</p>
                  <p className="mt-1 text-[0.97rem] text-muted">{p.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* Aspiration */}
      <section className="on-dark relative isolate overflow-hidden bg-midnight py-28 text-white sm:py-36">
        <Image src="/images/lagos-sunset.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/40" />
        <div className="container-x">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow mb-6 justify-center">Our aspiration</p>
            <p className="font-serif text-3xl leading-snug sm:text-5xl sm:leading-[1.15]">
              To build one of Africa&apos;s most respected innovation ecosystems, contributing to a more secure, digitally empowered and globally competitive Africa.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/about/leadership" variant="sky">
                Leadership & governance
              </ButtonLink>
              <ButtonLink href="/investors" variant="outline-light">
                Vision 2030
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Section spacing="tight">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-2xl font-serif text-2xl">Discover the methodology behind every CEDELA engagement.</p>
          <TextLink href="/approach">The CEDELA Transformation Framework</TextLink>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
