import "server-only";
import { defineQuery, stegaClean } from "next-sanity";
import { siteSettings as seedSettings } from "@/content/company";
import { industries as seedIndustries } from "@/content/industries";
import { seedInsights } from "@/content/insights";
import { services as seedServices } from "@/content/services";
import { seedVacancies } from "@/content/careers";
import type {
  ImageRef,
  Industry,
  Insight,
  Partner,
  Service,
  SiteSettings,
  TeamMember,
  Vacancy,
} from "@/content/types";
import { isSanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/live";

/* ------------------------------------------------------------------ */
/* Fetch helper                                                        */
/* ------------------------------------------------------------------ */

async function fetchSanity<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    const { data } = await sanityFetch({ query, params });
    return (data ?? null) as T | null;
  } catch (error) {
    console.error("[sanity] query failed, falling back to seed content:", (error as Error).message);
    return null;
  }
}

const img = (field: string) => `"${field}": select(defined(${field}.asset) => {"src": ${field}.asset->url, "alt": coalesce(${field}.alt, "")}, null)`;

const clean = <T,>(v: T): T => stegaClean(v) as T;

function cleanImage(i?: ImageRef | null): ImageRef | undefined {
  if (!i?.src) return undefined;
  return { src: clean(i.src), alt: i.alt ?? "" };
}

/* ------------------------------------------------------------------ */
/* Site settings and home                                              */
/* ------------------------------------------------------------------ */

const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  email, phones,
  offices[]{ name, label, lines, mapQuery, ${img("image")} },
  socials[]{ label, href },
  "corporateProfileUrl": corporateProfile.asset->url,
  "investorMemorandumUrl": investorMemorandum.asset->url,
  announcement,
  seo
}`);

type SettingsDoc = Partial<SiteSettings> & {
  announcement?: { enabled?: boolean; text?: string; href?: string } | null;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const doc = await fetchSanity<SettingsDoc>(SETTINGS_QUERY);
  if (!doc) return seedSettings;

  const announcement =
    doc.announcement === undefined || doc.announcement === null
      ? seedSettings.announcement
      : doc.announcement.enabled === false || !doc.announcement.text
        ? null
        : { text: doc.announcement.text, href: doc.announcement.href ? clean(doc.announcement.href) : undefined };

  return {
    email: doc.email || seedSettings.email,
    phones: doc.phones?.length ? doc.phones : seedSettings.phones,
    offices: doc.offices?.length
      ? doc.offices.map((o, i) => ({
          ...seedSettings.offices[i],
          ...o,
          lines: o.lines ?? seedSettings.offices[i]?.lines ?? [],
          mapQuery: clean(o.mapQuery || seedSettings.offices[i]?.mapQuery || o.name),
          image: cleanImage(o.image) ?? seedSettings.offices[i]?.image ?? { src: "/images/lagos-aerial.jpg", alt: o.name },
        }))
      : seedSettings.offices,
    socials: doc.socials?.filter((s) => s.href).map((s) => ({ label: s.label, href: clean(s.href) })) || seedSettings.socials,
    corporateProfileUrl: doc.corporateProfileUrl || seedSettings.corporateProfileUrl,
    investorMemorandumUrl: doc.investorMemorandumUrl || seedSettings.investorMemorandumUrl,
    announcement,
  };
}

const HOME_QUERY = defineQuery(`*[_id == "homePage"][0]{
  heroEyebrow, heroTitle, heroSubtitle, ctaTitle, ${img("heroImage")},
  "featuredSlugs": featuredInsights[]->slug.current
}`);

export type HomeContent = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: ImageRef;
  ctaTitle?: string;
  featuredSlugs?: string[];
};

export async function getHomeContent(): Promise<HomeContent> {
  const doc = await fetchSanity<HomeContent>(HOME_QUERY);
  return doc ? { ...doc, heroImage: cleanImage(doc.heroImage), featuredSlugs: doc.featuredSlugs?.map(clean) } : {};
}

/* ------------------------------------------------------------------ */
/* Insights                                                            */
/* ------------------------------------------------------------------ */

const INSIGHT_FIELDS = `
  "slug": slug.current, title, excerpt, category, publishedAt, featured, tags, videoUrl,
  "attachmentUrl": attachment.asset->url,
  ${img("mainImage")},
  "author": select(defined(author) => author->{ name, role, ${img("image")} }, { "name": "CEDELA" })
`;

const INSIGHTS_QUERY = defineQuery(`*[_type == "insight" && defined(slug.current)] | order(publishedAt desc){ ${INSIGHT_FIELDS} }`);
const INSIGHT_QUERY = defineQuery(`*[_type == "insight" && slug.current == $slug][0]{ ${INSIGHT_FIELDS}, body[]{ ..., _type == "imageWithAlt" => { ..., "src": asset->url } } }`);

type InsightDoc = Omit<Insight, "image" | "body"> & { mainImage?: ImageRef | null; body?: Insight["body"] };

function mapInsight(d: InsightDoc): Insight {
  return {
    ...d,
    slug: clean(d.slug),
    category: clean(d.category),
    image: cleanImage(d.mainImage),
    author: { name: d.author?.name || "CEDELA", role: d.author?.role, image: cleanImage(d.author?.image) },
    body: d.body ?? [],
  };
}

export async function getInsights(): Promise<Insight[]> {
  const docs = await fetchSanity<InsightDoc[]>(INSIGHTS_QUERY);
  if (docs && docs.length) return docs.map(mapInsight);
  return [...seedInsights].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getInsight(slug: string): Promise<Insight | null> {
  const doc = await fetchSanity<InsightDoc>(INSIGHT_QUERY, { slug });
  if (doc) return mapInsight(doc);
  return seedInsights.find((i) => i.slug === slug) ?? null;
}

/* ------------------------------------------------------------------ */
/* Services and industries (Sanity overrides seed by slug)            */
/* ------------------------------------------------------------------ */

const SERVICES_QUERY = defineQuery(`*[_type == "service" && defined(slug.current)]{
  "slug": slug.current, pillar, title, icon, summary, challenge, approach[]{ title, body },
  deliverables, benefits, frameworks, ${img("image")}
}`);

function mergeBySlug<T extends { slug: string }>(seed: T[], docs: Partial<T>[] | null, normalise: (d: Partial<T>, base?: T) => T): T[] {
  if (!docs?.length) return seed;
  const map = new Map(seed.map((s) => [s.slug, s]));
  for (const d of docs) {
    const slug = clean(d.slug as string);
    map.set(slug, normalise({ ...d, slug } as Partial<T>, map.get(slug)));
  }
  return [...map.values()];
}

export async function getServices(): Promise<Service[]> {
  const docs = await fetchSanity<Partial<Service>[]>(SERVICES_QUERY);
  return mergeBySlug(seedServices, docs, (d, base) => ({
    ...(base as Service),
    ...Object.fromEntries(Object.entries(d).filter(([, v]) => v !== null && v !== undefined)),
    pillar: clean((d.pillar ?? base?.pillar) as Service["pillar"]),
    icon: clean((d.icon ?? base?.icon ?? "sparkles") as Service["icon"]),
    approach: d.approach?.length ? d.approach : base?.approach ?? [],
    deliverables: d.deliverables?.length ? d.deliverables : base?.deliverables ?? [],
    benefits: d.benefits?.length ? d.benefits : base?.benefits ?? [],
    frameworks: d.frameworks?.length ? d.frameworks : base?.frameworks ?? [],
    challenge: d.challenge ?? base?.challenge ?? "",
    image: cleanImage(d.image) ?? base?.image,
  }) as Service);
}

const INDUSTRIES_QUERY = defineQuery(`*[_type == "industry" && defined(slug.current)]{
  "slug": slug.current, title, icon, tagline, summary, ${img("image")},
  challenges[]{ title, body }, solutions, outcomes, services
}`);

export async function getIndustries(): Promise<Industry[]> {
  const docs = await fetchSanity<Partial<Industry>[]>(INDUSTRIES_QUERY);
  return mergeBySlug(seedIndustries, docs, (d, base) => ({
    ...(base as Industry),
    ...Object.fromEntries(Object.entries(d).filter(([, v]) => v !== null && v !== undefined)),
    icon: clean((d.icon ?? base?.icon ?? "globe") as Industry["icon"]),
    image: cleanImage(d.image) ?? base?.image ?? { src: "/images/lagos-aerial.jpg", alt: d.title ?? "" },
    challenges: d.challenges?.length ? d.challenges : base?.challenges ?? [],
    solutions: d.solutions?.length ? d.solutions : base?.solutions ?? [],
    outcomes: d.outcomes?.length ? d.outcomes : base?.outcomes ?? [],
    services: (d.services?.length ? d.services : base?.services ?? []).map(clean),
  }) as Industry);
}

/* ------------------------------------------------------------------ */
/* People, careers, partners, testimonials, legal                     */
/* ------------------------------------------------------------------ */

const TEAM_QUERY = defineQuery(`*[_type == "teamMember"] | order(coalesce(order, 999) asc, name asc){ name, role, group, bio, linkedin, ${img("image")} }`);

export async function getTeam(): Promise<TeamMember[]> {
  const docs = await fetchSanity<TeamMember[]>(TEAM_QUERY);
  return (docs ?? []).map((m) => ({ ...m, group: clean(m.group), image: cleanImage(m.image) }));
}

const VACANCIES_QUERY = defineQuery(`*[_type == "vacancy" && isOpen != false && defined(slug.current)] | order(_createdAt desc){
  "slug": slug.current, title, department, location, type, summary, responsibilities, requirements, closingDate
}`);

export async function getVacancies(): Promise<Vacancy[]> {
  const docs = await fetchSanity<Vacancy[]>(VACANCIES_QUERY);
  const list = docs ?? seedVacancies;
  return list.map((v) => ({ ...v, slug: clean(v.slug), responsibilities: v.responsibilities ?? [], requirements: v.requirements ?? [] }));
}

export async function getVacancy(slug: string) {
  return (await getVacancies()).find((v) => v.slug === slug) ?? null;
}

const PARTNERS_QUERY = defineQuery(`*[_type == "partner"] | order(coalesce(order, 999) asc, name asc){ name, category, url, ${img("logo")} }`);

export async function getPartners(): Promise<Partner[]> {
  const docs = await fetchSanity<Partner[]>(PARTNERS_QUERY);
  return (docs ?? []).map((p) => ({ ...p, category: clean(p.category), logo: cleanImage(p.logo) }));
}

export type Testimonial = { quote: string; name: string; role?: string; organization?: string; image?: ImageRef };

const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonial"] | order(coalesce(order, 999) asc){ quote, name, role, organization, ${img("image")} }`);

export async function getTestimonials(): Promise<Testimonial[]> {
  const docs = await fetchSanity<Testimonial[]>(TESTIMONIALS_QUERY);
  return (docs ?? []).map((t) => ({ ...t, image: cleanImage(t.image) }));
}

export type LegalDoc = { title: string; updatedAt?: string; body: Insight["body"] };

const LEGAL_QUERY = defineQuery(`*[_type == "legalPage" && slug.current == $slug][0]{ title, updatedAt, body }`);

export async function getLegalPage(slug: string): Promise<LegalDoc | null> {
  return fetchSanity<LegalDoc>(LEGAL_QUERY, { slug });
}
