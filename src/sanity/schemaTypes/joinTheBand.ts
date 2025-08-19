// /schemas/settings.ts
import { defineType, defineField } from "sanity";

export const joinTheBand = defineType({
  name: "joinTheBand",
  title: "Vacant Seat",
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
      name: "instruments",
      title: "Instruments",
      type: "array",
      of: [
        defineField({
          name: "member",
          title: "Musician",
          type: "object",
          fields: [
            defineField({
              name: "instrumentName",
              title: "Instrument Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "emoticon",
              title: "Emoticon",
              type: "string",
            }),
            defineField({
              name: "notes",
              title: "Notes",
              type: "text",
              rows: 3,
            }),
          ],
        }),
      ],
    }),
  ],
});
