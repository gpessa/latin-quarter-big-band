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
      type: "string",
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
