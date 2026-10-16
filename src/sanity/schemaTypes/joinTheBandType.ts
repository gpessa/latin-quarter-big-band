import { defineType, defineField } from "sanity";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { previewString } from "../previewHelpers";

export const joinTheBandType = defineType({
  name: "joinTheBand",
  title: "Vacant Seat",
  type: "document",
  icon: EmojiPeopleIcon,
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
      name: "instruments",
      title: "Instruments",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        defineField({
          name: "member",
          title: "Musician",
          type: "object",
          fields: [
            defineField({
              name: "instrumentName",
              title: "Instrument Name",
              type: "internationalizedArrayString",
              validation: (Rule) =>
                Rule.required().custom((items) => {
                  const hasName = Array.isArray(items)
                    ? items.some(
                        (item) =>
                          typeof item?.value === "string" &&
                          item.value.trim().length > 0
                      )
                    : false;
                  return hasName || "Instrument name is required";
                }),
            }),
            defineField({
              name: "emoticon",
              title: "Emoticon",
              type: "string",
            }),
            defineField({
              name: "notes",
              title: "Notes",
              type: "internationalizedArrayString",
            }),
          ],
          preview: {
            select: {
              instrumentName: "instrumentName",
            },
            prepare({ instrumentName }) {
              return {
                title: previewString(instrumentName, "Instrument"),
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "form",
      title: "Form",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "name",
          title: "Name Field Label",
          type: "internationalizedArrayString",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "email",
          title: "Email Field Label",
          type: "internationalizedArrayString",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "phone",
          title: "Phone Field Label",
          type: "internationalizedArrayString",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "position",
          title: "Position Field Label",
          type: "internationalizedArrayString",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "message",
          title: "Message Field Label",
          type: "internationalizedArrayString",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "button",
          title: "Button Text",
          type: "internationalizedArrayString",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "confirmationMessage",
          title: "Confirmation Message",
          type: "internationalizedArrayString",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "errorMessage",
          title: "Error Message",
          type: "internationalizedArrayString",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: previewString(title, "Vacant Seat") };
    },
  },
});
