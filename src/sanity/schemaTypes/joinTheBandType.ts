// /schemas/settings.ts
import { defineType, defineField } from "sanity";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

export const joinTheBandType = defineType({
  name: "joinTheBand",
  title: "Vacant Seat",
  type: "document",
  icon: EmojiPeopleIcon,
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
          name: "position",
          title: "Position Field Label",
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
