import { defineField, defineType } from "sanity";
import RoomIcon from "@mui/icons-material/Room";

export const agendaType = defineType({
  name: "agenda",
  type: "document",
  title: "Agenda",
  icon: RoomIcon,
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
      name: "concerts",
      title: "Concerts",
      type: "array",
      of: [
        defineField({
          name: "concert",
          type: "object",
          title: "Concert",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Name",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "date",
              type: "datetime",
              title: "Date and Time",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "address",
              type: "object",
              title: "Address",
              fields: [
                {
                  name: "name",
                  type: "string",
                  title: "Name",
                },
                {
                  name: "street",
                  type: "string",
                  title: "Street",
                },
                {
                  name: "city",
                  type: "string",
                  title: "City",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "postalCode",
                  type: "string",
                  title: "Postal Code",
                },
              ],
            },
            {
              name: "url",
              type: "url",
              title: "Event URL",
            },
          ],
        }),
      ],
    }),
  ],
});
