import { defineType } from "sanity";
import RoomIcon from "@mui/icons-material/Room";

export const concertType = defineType({
  name: "concert",
  type: "document",
  title: "Concert",
  icon: RoomIcon,
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
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "name",
          type: "string",
          title: "Name",
          // validation: (Rule) => Rule.required(),
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
      type: "string",
      title: "Event URL",
    },
  ],
  preview: {
    select: {
      title: "name", // Imposta il titolo principale
      date: "date", // Sottotitolo (può essere data, location, ecc.)
    },
    prepare({ title, date }) {
      return {
        title,
        subtitle: date
          ? `📅 ${new Date(date).toLocaleDateString()}`
          : "No Date", // Formatta la data
      };
    },
  },
});
