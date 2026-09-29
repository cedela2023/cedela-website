import { House as HomeIcon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string" }),
    defineField({ name: "heroTitle", title: "Hero headline", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero subheading", type: "text", rows: 3 }),
    defineField({ name: "heroImage", title: "Hero image", type: "imageWithAlt" }),
    defineField({
      name: "featuredInsights",
      title: "Featured insights",
      description: "Pick up to three. Leave empty to show the latest.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "insight" }] })],
      validation: (r) => r.max(3),
    }),
    defineField({ name: "ctaTitle", title: "Closing call to action headline", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
