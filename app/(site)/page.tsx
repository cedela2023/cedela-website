import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { FrameworkSteps } from "@/components/home/framework-steps";
import { HomeHero } from "@/components/home/home-hero";
import { PillarExplorer } from "@/components/home/pillar-explorer";
import { CountUp } from "@/components/motion/count-up";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { InsightCard, LinkCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { IresConsole } from "@/components/sections/ires-console";
import { Marquee } from "@/components/sections/marquee";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { company, differentiators, transformationFramework } from "@/content/company";
import { pillars } from "@/content/pillars";
import { serviceHref } from "@/content/services";
import { solutions } from "@/content/solutions";
import { getHomeContent, getIndustries, getInsights, getServices, getSiteSettings, getTestimonials } from "@/lib/data";

export default async function HomePage() {
  const [home, settings, services, industries, insights, testimonials] = await Promise.all([
    getHomeContent(),
    getSiteSettings(),
    getServices(),
    getIndustries(),
    getInsights(),
    getTestimonials(),
  ]);

  const pillarItems = pillars.map((p) => {
    const list = services.filter((s) => s.pillar === p.slug);
    return { ...p, count: list.length, services: list.slice(0, 5).map((s) => ({ title: s.title, href: serviceHref(s) })) };
  });

  const featured = home.featuredSlugs?.length
    ? home.featuredSlugs.map((slug) => insights.find((i) => i.slug === slug)).filter((i): i is NonNullable<typeof i> => !!i)
    : insights.slice(0, 3);

  return (
    <>
      <HomeHero
        eyebrow={home.heroEyebrow || "Innovation. Technology. Digital Trust."}
        title={home.heroTitle || "Building Africa's Future Through Innovation, Technology & Digital Trust"}
        subtitle={
          home.heroSubtitle ||
          "CEDELA helps governments, businesses and institutions accelerate digital transformation, strengthen cybersecurity, harness artificial intelligence and build resilient digital ecosystems."
        }
        image={home.heroImage || { src: "/images/lagos-aerial.jpg", alt: "Aerial view of Lagos, Nigeria" }}
        profileUrl={settings.corporateProfileUrl}
      />

      {/* About */}
      <Section id="intro">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6">About CEDELA</p>
              <h2 className="text-4xl leading-[1.1] sm:text-5xl lg:text-[3.4rem]">
                We turn strategy into <em className="text-navy">secure, intelligent</em> and resilient institutions.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
              <p>
                CEDELA Tech Park Solutions Ltd. is an innovation, technology and consulting company that helps organizations achieve sustainable growth through
                strategic advisory, digital transformation, cybersecurity, artificial intelligence, technology solutions and executive education.
              </p>
              <p>
                Established as a social enterprise in 2016 and incorporated as a private company in 2023, we combine local insight with global best practice to
                strengthen resilience, enhance performance and build digital trust across Africa.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-6">
              <ButtonLink href="/about">Learn more about us</ButtonLink>
              <TextLink href="/approach">How we work</TextLink>
            </Reveal>

            <Stagger className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-line sm:grid-cols-4">
              {[
                { value: 2016, label: "Founded as a social enterprise", plain: true },
                { value: 4, label: "Integrated practices" },
                { value: services.length, label: "Specialist services", suffix: "+" },
                { value: industries.length, label: "Industries served" },
              ].map((s) => (
                <StaggerItem key={s.label} className="bg-white p-6">
                  <p className="font-serif text-4xl font-bold text-navy sm:text-5xl">{s.plain ? s.value : <CountUp to={s.value} suffix={s.suffix} />}</p>
                  <p className="mt-2 text-sm leading-snug text-muted">{s.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="relative lg:col-span-5">
            <Reveal y={40}>
              <ParallaxImage src="/images/team-boardroom.jpg" alt="CEDELA consultants in a client workshop" className="aspect-[4/5] rounded-[2rem]" strength={40} />
            </Reveal>
            <Reveal delay={0.25} className="absolute -bottom-10 -left-6 w-[62%] sm:-left-12">
              <div className="overflow-hidden rounded-3xl border-[6px] border-white shadow-2xl">
                <Image src="/images/engineers-monitor.jpg" alt="Engineers reviewing code together" width={600} height={420} className="aspect-[4/3] object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.35} className="absolute -right-3 top-10 hidden rounded-2xl bg-navy px-6 py-5 text-white shadow-xl sm:block">
              <p className="font-serif text-3xl font-bold">PLIS</p>
              <p className="mt-1 max-w-[11rem] text-xs leading-snug text-white/75">Professionalism, Leadership, Innovation, Service</p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Marquee */}
      <div className="border-y border-line bg-mist py-8">
        <Marquee items={["Digital Transformation", "Cybersecurity", "Artificial Intelligence", "Cloud", "Governance, Risk & Compliance", "Data & Analytics", "Executive Education", "Innovation"]} />
      </div>

      {/* Pillars */}
      <Section>
        <SectionHeading
          align="split"
          eyebrow="Our four business pillars"
          title="Integrated capabilities, from boardroom strategy to the security operations centre."
          intro="Each practice is strong on its own. Together, they let us support clients across the entire transformation lifecycle through one accountable partner."
        />
        <div className="mt-16">
          <PillarExplorer items={pillarItems} />
        </div>
      </Section>

      {/* Featured solutions */}
      <Section tone="mist">
        <SectionHeading align="split" eyebrow="Featured solutions" title="Signature offerings that create momentum." intro="Focused engagements designed to give leaders clarity quickly and to protect what matters most.">
          <TextLink href="/solutions">View all solutions</TextLink>
        </SectionHeading>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s) => (
            <StaggerItem key={s.slug} className={s.slug === "ires" ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}>
              {s.slug === "ires" ? (
                <Link
                  href={s.href}
                  className="on-dark group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-3xl bg-midnight p-8 text-white sm:p-10"
                >
                  <Image src="/images/soc-operations.jpg" alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-30 transition-transform duration-[1.2s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/20" />
                  <div className="relative flex items-center justify-between">
                    <span className="rounded-full bg-sky px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-midnight">{s.kicker}</span>
                    <ArrowUpRight className="h-6 w-6 text-sky transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  <div className="relative">
                    <p className="font-serif text-6xl font-bold sm:text-7xl">iRES</p>
                    <p className="mt-2 text-lg text-sky">Intelligent Response & Emergency Service</p>
                    <p className="mt-4 max-w-md text-white/70">A 24/7 Cyber Incident Response Centre giving organizations immediate access to trusted expertise when every second matters.</p>
                  </div>
                </Link>
              ) : (
                <LinkCard href={s.href} icon={s.icon} kicker={s.kicker} title={s.title} body={s.summary} />
              )}
            </StaggerItem>
          ))}
          <StaggerItem>
            <Link
              href="/consultation"
              className="group flex h-full min-h-[15rem] flex-col justify-between rounded-3xl bg-navy p-7 text-white transition-colors duration-500 hover:bg-navy-700 sm:p-8"
            >
              <span className="font-serif text-sm font-bold text-sky">Not sure where to start?</span>
              <div>
                <h3 className="text-[1.45rem] leading-snug text-white">Talk to an expert about your priorities.</h3>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-sky">
                  Book a conversation <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </StaggerItem>
        </Stagger>
      </Section>

      {/* iRES spotlight */}
      <Section tone="midnight" className="grain overflow-hidden">
        <div className="absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-navy/40 blur-[140px]" />
        <div className="relative grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-6">Flagship platform</p>
              <h2 className="text-4xl leading-[1.08] sm:text-5xl">When every second matters, iRES is already awake.</h2>
              <p className="mt-6 text-lg leading-relaxed text-white/70">
                Our 24/7 Cyber Incident Response Centre combines an emergency hotline, a secure reporting portal and AI-assisted workflows with experienced
                responders who contain threats, coordinate forensics and guide recovery.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/products/ires/report" variant="sky">
                Report an incident
              </ButtonLink>
              <ButtonLink href="/products/ires#demo" variant="outline-light">
                Request a demonstration
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <IresConsole />
          </Reveal>
        </div>
      </Section>

      {/* Why CEDELA */}
      <Section>
        <SectionHeading align="center" eyebrow="Why choose CEDELA" title="A partner built for the realities of African organizations." className="mx-auto" />
        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-line sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d, i) => (
            <StaggerItem key={d.title} className="group relative bg-white p-8 transition-colors duration-500 hover:bg-tint sm:p-10">
              <span className="font-serif text-sm font-bold text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-tint text-navy transition-colors duration-500 group-hover:bg-navy group-hover:text-white">
                <Icon name={d.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-2xl">{d.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{d.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Framework */}
      <Section tone="midnight" className="grain">
        <SectionHeading
          align="split"
          eyebrow="The CEDELA Transformation Framework"
          title="Seven phases from vision to measurable, lasting results."
          intro="A proprietary methodology that keeps strategy, security and people moving together, so transformation delivers what it promised."
        >
          <TextLink href="/approach" tone="sky">
            Explore our approach
          </TextLink>
        </SectionHeading>
        <div className="mt-16">
          <FrameworkSteps phases={transformationFramework} />
        </div>
      </Section>

      {/* Industries */}
      <Section>
        <SectionHeading align="split" eyebrow="Industries we serve" title="Sector depth where it counts." intro="Every sector has its own regulation, risks and realities. We bring that understanding to every engagement.">
          <TextLink href="/industries">All industries</TextLink>
        </SectionHeading>
        <Stagger className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" gap={0.05}>
          {industries.slice(0, 12).map((ind) => (
            <StaggerItem key={ind.slug}>
              <Link
                href={`/industries/${ind.slug}`}
                className="group relative isolate flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-3xl bg-mist p-5 ring-1 ring-line transition-colors sm:p-6"
              >
                <Image
                  src={ind.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="-z-20 object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight/90 to-midnight/30 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <Icon name={ind.icon} className="h-7 w-7 text-navy transition-colors duration-500 group-hover:text-sky" />
                <div className="flex items-end justify-between gap-3">
                  <h3 className="hyphens-auto text-[0.98rem] leading-tight transition-colors duration-500 [overflow-wrap:anywhere] group-hover:text-white sm:text-xl">{ind.title}</h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-navy opacity-0 transition-all duration-500 group-hover:text-sky group-hover:opacity-100" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Testimonials (only when published in Sanity) */}
      {testimonials.length > 0 && (
        <Section tone="tint">
          <div className="grid gap-8 lg:grid-cols-2">
            {testimonials.slice(0, 2).map((t) => (
              <Reveal key={t.name} className="rounded-[2rem] bg-white p-10 ring-1 ring-line">
                <Quote className="h-8 w-8 text-sky" />
                <blockquote className="mt-6 font-serif text-2xl leading-snug">{t.quote}</blockquote>
                <p className="mt-8 font-semibold">{t.name}</p>
                <p className="text-sm text-muted">{[t.role, t.organization].filter(Boolean).join(", ")}</p>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Insights */}
      <Section tone="mist">
        <SectionHeading align="split" eyebrow="Latest insights" title="Perspectives on technology, risk and transformation." intro="Articles, research, cyber advisories and regulatory updates from our practitioners.">
          <TextLink href="/insights">Visit the knowledge hub</TextLink>
        </SectionHeading>
        <Stagger className="mt-14 grid gap-10 md:grid-cols-3">
          {featured.map((insight) => (
            <StaggerItem key={insight.slug}>
              <InsightCard insight={insight} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <CtaBand
        title={home.ctaTitle || "Ready to transform your organization?"}
        body={`${company.promise} Let us start with a conversation about where you want to go.`}
      />
    </>
  );
}
