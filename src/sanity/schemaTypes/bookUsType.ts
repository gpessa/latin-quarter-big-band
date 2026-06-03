import { defineField, defineType } from "sanity";
import { previewString } from "../previewHelpers";

export const bookUsType = defineType({
  name: "bookUs",
  title: "Book Us",
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
    defineField({
      name: "form",
      title: "Form",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Name Field Label",
          type: "internationalizedArrayString",
        }),
        defineField({
          name: "email",
          title: "Email Field Label",
          type: "internationalizedArrayString",
        }),
        defineField({
          name: "phone",
          title: "Phone Field Label",
          type: "internationalizedArrayString",
        }),
        defineField({
          name: "message",
          title: "Message Field Label",
          type: "internationalizedArrayString",
        }),
        defineField({
          name: "button",
          title: "Button Text",
          type: "internationalizedArrayString",
        }),
        defineField({
          name: "confirmationMessage",
          title: "Confirmation Message",
          type: "internationalizedArrayString",
        }),
        defineField({
          name: "errorMessage",
          title: "Error Message",
          type: "internationalizedArrayString",
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: previewString(title, "Book Us") };
    },
  },
});
