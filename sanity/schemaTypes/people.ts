import { User as UserIcon, Users as UsersIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "image", type: "imageWithAlt" }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "group",
      type: "string",
      options: { list: [{ title: "Executive leadership", value: "executive" }, { title: "Board of directors", value: "board" }, { title: "Advisory board", value: "advisory" }], layout: "radio" },
      initialValue: "executive",
      validation: (r) => r.required(),
    }),
    defineField({ name: "image", title: "Portrait", type: "imageWithAlt" }),
    defineField({ name: "bio", type: "text", rows: 6 }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "order", type: "number", description: "Lower numbers appear first" }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
});
