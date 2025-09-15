import { defineField, defineType } from "sanity";

export const bookUsType = defineType({
  name: "bookUs",
  title: "Book Us",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
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
          type: "string",
        }),
        defineField({
          name: "email",
          title: "Email Field Label",
          type: "string",
        }),
        defineField({
          name: "phone",
          title: "Phone Field Label",
          type: "string",
        }),
        defineField({
          name: "message",
          title: "Message Field Label",
          type: "string",
        }),
        defineField({
          name: "button",
          title: "Button Text",
          type: "string",
        }),
        defineField({
          name: "confirmationMessage",
          title: "Confirmation Message",
          type: "string",
        }),
        defineField({
          name: "errorMessage",
          title: "Error Message",
          type: "string",
        }),
      ],
    }),
  ],
});
