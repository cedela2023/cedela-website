/**
 * Seeds Sanity with the website's built-in content so every page is editable
 * in the Studio from day one.
 *
 *   npm run seed
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and
 * SANITY_API_WRITE_TOKEN (an Editor token) in .env.local.
 * Safe to re-run: documents use stable IDs and are created or replaced.
 */
import { createClient, type SanityClient } from "@sanity/client";
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { siteSettings } from "../content/company";
import { industries } from "../content/industries";
import { seedInsights } from "../content/insights";
import { legalDefaults } from "../content/legal";
import { services } from "../content/services";
import type { SimpleBlock } from "../content/types";

process.loadEnvFile?.(".env.local");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client: SanityClient = createClient({ projectId, dataset, token, apiVersion: "2025-10-01", useCdn: false });

const key = () => Math.random().toString(36).slice(2, 12);
const assetCache = new Map<string, string>();

async function image(src: string | undefined, alt: string) {
  if (!src || !src.startsWith("/")) return undefined;
  const file = path.join(process.cwd(), "public", src);
  if (!existsSync(file)) return undefined;
  let id = assetCache.get(file);
  if (!id) {
    const asset = await client.assets.upload("image", createReadStream(file), { filename: path.basename(file) });
    id = asset._id;
    assetCache.set(file, id);
  }
  return { _type: "imageWithAlt", asset: { _type: "reference", _ref: id }, alt };
}

function span(text: string) {
  return { _type: "span", _key: key(), text, marks: [] };
}

function toPortable(blocks: SimpleBlock[]) {
  return blocks.flatMap((b) => {
    switch (b._type) {
      case "h2":
      case "h3":
        return [{ _type: "block", _key: key(), style: b._type, markDefs: [], children: [span(b.text)] }];
      case "quote":
        return [{ _type: "block", _key: key(), style: "blockquote", markDefs: [], children: [span(b.text)] }];
      case "ul":
        return b.items.map((it) => ({ _type: "block", _key: key(), style: "normal", listItem: "bullet", level: 1, markDefs: [], children: [span(it)] }));
      default:
        return [{ _type: "block", _key: key(), style: "normal", markDefs: [], children: [span(b.text)] }];
    }
  });
}

const withKeys = <T extends object>(items: T[]) => items.map((i) => ({ _key: key(), ...i }));

async function main() {
  const tx = client.transaction();

  console.log("Site settings and home page");
  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    email: siteSettings.email,
    phones: siteSettings.phones,
    iresHotlines: siteSettings.iresHotlines,
    offices: await Promise.all(
      siteSettings.offices.map(async (o) => ({
        _key: key(),
        _type: "office",
        name: o.name,
        label: o.label,
        lines: o.lines,
        mapQuery: o.mapQuery,
        image: await image(o.image.src, o.image.alt),
      })),
    ),
    socials: withKeys(siteSettings.socials.map((s) => ({ _type: "social", ...s }))),
    announcement: siteSettings.announcement ? { enabled: true, ...siteSettings.announcement } : { enabled: false },
  });
  tx.createIfNotExists({
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: "Innovation. Technology. Digital Trust.",
    heroTitle: "Building Africa's Future Through Innovation, Technology & Digital Trust",
    heroSubtitle:
      "CEDELA helps governments, businesses and institutions accelerate digital transformation, strengthen cybersecurity, harness artificial intelligence and build resilient digital ecosystems.",
    heroImage: await image("/images/lagos-aerial.jpg", "Aerial view of Lagos, Nigeria"),
    ctaTitle: "Ready to transform your organization?",
  });

  console.log(`${services.length} services`);
  for (const s of services) {
    tx.createOrReplace({
      _id: `service-${s.slug}`,
      _type: "service",
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      pillar: s.pillar,
      icon: s.icon,
      summary: s.summary,
      challenge: s.challenge,
      approach: withKeys(s.approach.map((a) => ({ _type: "step", ...a }))),
      deliverables: s.deliverables,
      benefits: s.benefits,
      frameworks: s.frameworks,
    });
  }

  console.log(`${industries.length} industries`);
  for (const i of industries) {
    tx.createOrReplace({
      _id: `industry-${i.slug}`,
      _type: "industry",
      title: i.title,
      slug: { _type: "slug", current: i.slug },
      icon: i.icon,
      tagline: i.tagline,
      summary: i.summary,
      image: await image(i.image.src, i.image.alt),
      challenges: withKeys(i.challenges.map((c) => ({ _type: "challenge", ...c }))),
      solutions: i.solutions,
      outcomes: i.outcomes,
      services: i.services,
    });
  }

  console.log(`${seedInsights.length} insights`);
  const authors = new Map<string, string>();
  for (const ins of seedInsights) {
    const authorId = `author-${ins.author.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    if (!authors.has(authorId)) {
      authors.set(authorId, ins.author.name);
      tx.createOrReplace({ _id: authorId, _type: "author", name: ins.author.name });
    }
    tx.createOrReplace({
      _id: `insight-${ins.slug}`,
      _type: "insight",
      title: ins.title,
      slug: { _type: "slug", current: ins.slug },
      category: ins.category,
      excerpt: ins.excerpt,
      publishedAt: new Date(ins.publishedAt).toISOString(),
      featured: !!ins.featured,
      tags: ins.tags ?? [],
      author: { _type: "reference", _ref: authorId },
      mainImage: await image(ins.image?.src, ins.image?.alt ?? ""),
      body: toPortable(ins.body as SimpleBlock[]),
    });
  }

  console.log("Legal pages");
  for (const slug of ["privacy", "terms"] as const) {
    const l = legalDefaults[slug];
    tx.createIfNotExists({ _id: `legal-${slug}`, _type: "legalPage", title: l.title, slug: { _type: "slug", current: slug }, updatedAt: l.updatedAt, body: toPortable(l.body) });
  }

  await tx.commit();
  console.log("Done. Open /studio to edit your content.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
