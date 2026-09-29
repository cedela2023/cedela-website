import { FileText as DocumentTextIcon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const insightCategoryOptions = [
  { title: "Article", value: "article" },
  { title: "White paper", value: "white-paper" },
  { title: "Research report", value: "research" },
  { title: "Case study", value: "case-study" },
  { title: "Webinar", value: "webinar" },
  { title: "Video", value: "video" },
  { title: "Regulatory update", value: "regulatory-update" },
  { title: "Cyber threat advisory", value: "cyber-advisory" },
  { title: "AI update", value: "ai-update" },
];

export const insight = defineType({
  name: "insight",
  title: "Insight",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Details" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "category", type: "string", group: "meta", options: { list: insightCategoryOptions, layout: "dropdown" }, initialValue: "article", validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3, group: "content", validation: (r) => r.required().max(260) }),
    defineField({ name: "mainImage", title: "Cover image", type: "imageWithAlt", group: "content" }),
    defineField({ name: "body", type: "richText", group: "content" }),
    defineField({ name: "publishedAt", type: "datetime", group: "meta", initialValue: () => new Date().toISOString(), validation: (r) => r.required() }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }], group: "meta" }),
    defineField({ name: "featured", type: "boolean", group: "meta", initialValue: false }),
    defineField({ name: "tags", type: "array", group: "meta", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
    defineField({ name: "attachment", title: "Downloadable file", description: "For white papers and research reports", type: "file", group: "meta" }),
    defineField({ name: "videoUrl", title: "Video URL", description: "YouTube or Vimeo link for videos and webinars", type: "url", group: "meta" }),
    defineField({ name: "eventDate", title: "Event date", description: "For upcoming webinars", type: "datetime", group: "meta" }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Newest first", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", category: "category", media: "mainImage", date: "publishedAt" },
    prepare: ({ title, category, media, date }) => ({
      title,
      media,
      subtitle: [insightCategoryOptions.find((c) => c.value === category)?.title, date?.slice(0, 10)].filter(Boolean).join(" · "),
    }),
  },
});
