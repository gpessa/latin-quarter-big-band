// /schemas/settings.ts
import { defineType, defineField } from "sanity";

export const generalType = defineType({
  name: "general",
  title: "Generals",
  type: "document",
  fields: [
    defineField({
      name: "description",
      title: "Description",
      description: "This description will be used in the meta tag for SEO",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "General Settings",
      };
    },
  },
});
