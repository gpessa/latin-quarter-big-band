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
              type: "internationalizedArrayString",
            }),
          ],
          preview: {
            select: {
              instrumentName: "instrumentName",
            },
            prepare({ instrumentName }) {
              const pickNl = (
                entries?: Array<{ language?: string; value?: string }>
              ) =>
                entries?.find((t) => t.language === "nl")?.value ??
                entries?.[0]?.value;

              const name = pickNl(instrumentName) || "Instrument";

              return {
                title: name,
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
          name: "position",
          title: "Position Field Label",
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
      const defaultTitle = title?.find(
        (t: { language?: string; value?: string }) => t.language === "nl"
      );
      return { title: defaultTitle?.value || "Vacant Seat" };
    },
  },
});
