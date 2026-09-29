import { LayoutGrid as BlockElementIcon, Globe as EarthGlobeIcon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";
import { iconField, stringList } from "./shared";

export const pillarOptions = [
  { title: "Strategy & Advisory", value: "strategy-advisory" },
  { title: "Technology Solutions", value: "technology-solutions" },
  { title: "Cybersecurity & Digital Trust", value: "cybersecurity-digital-trust" },
  { title: "Learning, Innovation & Research", value: "learning-innovation-research" },
];

/**
 * Services ship with complete seed content. Publishing a document with the
 * same slug replaces the seed version; a new slug adds a new service page.
 */
export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: BlockElementIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "pillar", title: "Practice area", type: "string", options: { list: pillarOptions }, validation: (r) => r.required() }),
    iconField,
    defineField({ name: "summary", type: "text", rows: 2, validation: (r) => r.required() }),
    defineField({ name: "challenge", title: "Business challenge", type: "text", rows: 4 }),
    defineField({
      name: "approach",
      title: "CEDELA approach",
      type: "array",
      of: [defineArrayMember({ type: "object", name: "step", fields: [{ name: "title", type: "string" }, { name: "body", type: "text", rows: 2 }], preview: { select: { title: "title", subtitle: "body" } } })],
    }),
    stringList("deliverables", "Deliverables"),
    stringList("benefits", "Benefits"),
    stringList("frameworks", "Relevant frameworks"),
    defineField({ name: "image", type: "imageWithAlt" }),
  ],
  preview: { select: { title: "title", subtitle: "pillar" } },
});

export const industry = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    iconField,
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "image", type: "imageWithAlt" }),
    defineField({
      name: "challenges",
      title: "Sector challenges",
      type: "array",
      of: [defineArrayMember({ type: "object", name: "challenge", fields: [{ name: "title", type: "string" }, { name: "body", type: "text", rows: 2 }], preview: { select: { title: "title" } } })],
    }),
    stringList("solutions", "CEDELA solutions"),
    stringList("outcomes", "Business outcomes"),
    stringList("services", "Relevant service slugs", "For example: ciso-as-a-service"),
  ],
  preview: { select: { title: "title", subtitle: "tagline", media: "image" } },
});
