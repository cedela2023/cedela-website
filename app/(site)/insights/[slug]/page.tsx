import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, PlayCircle } from "lucide-react";
import { bodyToText, RichBody } from "@/components/insights/rich-body";
import { Reveal } from "@/components/motion/reveal";
import { InsightCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SocialIcon } from "@/components/ui/social-icons";
import { Section } from "@/components/ui/section";
import { categoryLabel } from "@/content/insights";
import { getInsight, getInsights } from "@/lib/data";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, formatDate, readingTime } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getInsights()).map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const i = await getInsight(slug);
  return i ? pageMetadata({ title: i.title, description: i.excerpt, path: `/insights/${i.slug}`, image: i.image?.src }) : {};
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const [insight, all] = await Promise.all([getInsight(slug), getInsights()]);
  if (!insight) notFound();

  const minutes = insight.readingMinutes ?? readingTime(bodyToText(insight.body) || insight.excerpt);
  const related = all.filter((i) => i.slug !== insight.slug && (i.category === insight.category || i.tags?.some((t) => insight.tags?.includes(t)))).slice(0, 3);
  const more = related.length ? related : all.filter((i) => i.slug !== insight.slug).slice(0, 3);
  const url = absoluteUrl(`/insights/${insight.slug}`);
  const share = [
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name: "X", href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(insight.title)}` },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.excerpt,
    datePublished: insight.publishedAt,
    author: { "@type": "Organization", name: insight.author.name },
    publisher: { "@type": "Organization", name: "CEDELA Tech Park Solutions Ltd." },
    ...(insight.image ? { image: absoluteUrl(insight.image.src) } : {}),
    mainEntityOfPage: url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="on-dark grain relative isolate overflow-hidden bg-midnight pb-40 pt-36 text-white sm:pt-44">
        <div className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]" />
        <div className="container-x max-w-4xl">
          <Breadcrumbs tone="dark" items={[{ label: "Insights", href: "/insights" }, { label: categoryLabel(insight.category) }]} />
          <Reveal>
            <p className="eyebrow mb-6 mt-10">{categoryLabel(insight.category)}</p>
            <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">{insight.title}</h1>
            <p className="mt-6 text-xl leading-relaxed text-white/75">{insight.excerpt}</p>
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-white/60">
              <span className="font-semibold text-white">{insight.author.name}</span>
              <span>·</span>
              <time dateTime={insight.publishedAt}>{formatDate(insight.publishedAt)}</time>
              <span>·</span>
              <span>{minutes} min read</span>
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container-x -mt-28 max-w-5xl">
        {insight.image && (
          <Reveal y={40} className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-2xl">
            <Image src={insight.image.src} alt={insight.image.alt} fill priority sizes="(min-width: 1024px) 1000px, 100vw" className="object-cover" />
          </Reveal>
        )}
      </div>

      <Section spacing="tight">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-12">
          <aside className="order-2 lg:order-1 lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Share</p>
              <div className="mt-3 flex gap-2">
                {share.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={`Share on ${s.name}`} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mist text-ink ring-1 ring-line transition hover:bg-navy hover:text-white">
                    <SocialIcon name={s.name} className="h-4 w-4" />
                  </a>
                ))}
              </div>
              {insight.tags && insight.tags.length > 0 && (
                <>
                  <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-muted">Topics</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {insight.tags.map((t) => (
                      <li key={t} className="rounded-full bg-tint px-3 py-1 text-sm font-semibold text-navy">
                        {t}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </aside>
          <article className="order-1 lg:order-2 lg:col-span-9">
            {(insight.attachmentUrl || insight.videoUrl) && (
              <div className="mb-10 flex flex-wrap gap-3">
                {insight.attachmentUrl && (
                  <a href={insight.attachmentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 font-semibold text-white">
                    <Download className="h-4 w-4" /> Download the full report
                  </a>
                )}
                {insight.videoUrl && (
                  <a href={insight.videoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-tint px-5 py-3 font-semibold text-navy">
                    <PlayCircle className="h-4 w-4" /> Watch the recording
                  </a>
                )}
              </div>
            )}
            <RichBody body={insight.body} />
            <div className="mt-14 rounded-3xl bg-mist p-8 ring-1 ring-line">
              <p className="font-serif text-xl font-bold">Want to discuss this with our team?</p>
              <p className="mt-2 text-muted">Our practitioners are happy to talk through what it means for your organization.</p>
              <Link href="/consultation" className="mt-4 inline-flex font-semibold text-navy underline decoration-sky decoration-2 underline-offset-4">
                Book a conversation
              </Link>
            </div>
          </article>
        </div>
      </Section>

      {more.length > 0 && (
        <Section tone="mist">
          <p className="eyebrow mb-10">Keep reading</p>
          <div className="grid gap-10 md:grid-cols-3">
            {more.map((i) => (
              <InsightCard key={i.slug} insight={i} />
            ))}
          </div>
        </Section>
      )}
      <CtaBand />
    </>
  );
}
