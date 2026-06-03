import { defineField, defineType } from "sanity";
import { previewString } from "../previewHelpers";

export const aboutUsType = defineType({
  name: "aboutUs",
  title: "About Us",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "internationalizedArrayBlockContent",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: previewString(title, "About Us") };
    },
  },
});
