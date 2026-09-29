import { Briefcase as CaseIcon, MessageSquareQuote as CommentIcon, Link2 as LinkIcon, Scale as DocumentIcon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const vacancy = defineType({
  name: "vacancy",
  title: "Vacancy",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "isOpen", title: "Accepting applications", type: "boolean", initialValue: true }),
    defineField({ name: "department", type: "string", options: { list: ["Strategy & Advisory", "Technology Solutions", "Cybersecurity & Digital Trust", "Learning, Innovation & Research", "Corporate"] } }),
    defineField({ name: "location", type: "string", options: { list: ["Abuja", "Lagos", "Hybrid", "Remote"] } }),
    defineField({ name: "type", title: "Employment type", type: "string", options: { list: ["Full-time", "Contract", "Internship", "Graduate programme"] } }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "responsibilities", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "requirements", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "closingDate", type: "date" }),
  ],
  preview: { select: { title: "title", subtitle: "department" } },
});

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: { list: [
        { title: "Technology alliance", value: "technology" },
        { title: "Academic collaboration", value: "academic" },
        { title: "Professional membership", value: "professional" },
        { title: "Government engagement", value: "government" },
        { title: "Industry association", value: "industry" },
        { title: "Development partner", value: "development" },
      ] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "logo", type: "imageWithAlt" }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "category", media: "logo" } },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({ name: "quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "organization", type: "string" }),
    defineField({ name: "image", type: "imageWithAlt" }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "organization", media: "image" } },
});

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", description: "Use privacy or terms", validation: (r) => r.required() }),
    defineField({ name: "updatedAt", title: "Last updated", type: "date" }),
    defineField({ name: "body", type: "richText" }),
  ],
});
