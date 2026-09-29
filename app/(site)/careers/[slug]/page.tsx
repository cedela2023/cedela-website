import { notFound } from "next/navigation";
import { ApplicationForm } from "@/components/forms/forms";
import { Reveal } from "@/components/motion/reveal";
import { CheckList } from "@/components/sections/lists";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { getVacancies, getVacancy } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getVacancies()).map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]">) {
  const { slug } = await params;
  const v = await getVacancy(slug);
  return v ? pageMetadata({ title: `${v.title} | Careers`, description: v.summary, path: `/careers/${v.slug}` }) : {};
}

export default async function VacancyPage({ params }: PageProps<"/careers/[slug]">) {
  const { slug } = await params;
  const v = await getVacancy(slug);
  if (!v) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: v.title,
    description: v.summary,
    employmentType: v.type,
    hiringOrganization: { "@type": "Organization", name: "CEDELA Tech Park Solutions Ltd." },
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: v.location, addressCountry: "NG" } },
    ...(v.closingDate ? { validThrough: v.closingDate } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero
        compact
        crumbs={[{ label: "Careers", href: "/careers" }, { label: v.title }]}
        eyebrow={v.department}
        title={v.title}
        intro={[v.location, v.type, v.closingDate ? `Closes ${formatDate(v.closingDate)}` : null].filter(Boolean).join(" · ")}
      />
      <Section>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-7">
            {v.summary && <p className="font-serif text-2xl leading-snug">{v.summary}</p>}
            {v.responsibilities.length > 0 && (
              <Reveal>
                <h2 className="mb-6 text-3xl">Responsibilities</h2>
                <CheckList items={v.responsibilities} />
              </Reveal>
            )}
            {v.requirements.length > 0 && (
              <Reveal>
                <h2 className="mb-6 text-3xl">What you bring</h2>
                <CheckList items={v.requirements} />
              </Reveal>
            )}
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-[2rem] bg-mist p-8 ring-1 ring-line lg:sticky lg:top-28">
              <h2 className="mb-6 text-2xl">Apply for this role</h2>
              <ApplicationForm positions={[v.title]} defaultPosition={v.title} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
