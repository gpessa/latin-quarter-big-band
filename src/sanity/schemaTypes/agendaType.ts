import { GooglePlacesAddressInput } from "@/sanity/components/GooglePlacesAddressInput";
import { SortedConcertsInput } from "@/sanity/components/SortedConcertsInput";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { defineField, defineType } from "sanity";
import { previewString } from "../previewHelpers";


export const agendaType = defineType({
  name: "agenda",
  type: "document",
  title: "Concerts",
  icon: CalendarMonthIcon,
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
      name: "concerts",
      title: "Concerts",
      type: "array",
      components: {
        input: SortedConcertsInput,
      },
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
            defineField({
              name: "address",
              type: "object",
              title: "Venue & address",
              description:
                "Search with Google Maps, then adjust venue name or street if needed.",
              components: {
                input: GooglePlacesAddressInput,
              },
              fields: [
                defineField({ name: "name", type: "string", title: "Venue name", validation: (Rule) => Rule.required() }),
                defineField({ name: "formattedAddress", type: "text", title: "Full address", hidden: true }),
                defineField({ name: "street", type: "string", title: "Street" }),
                defineField({ name: "city", type: "string", title: "City" }),
                defineField({ name: "postalCode", type: "string", title: "Postal Code" }),
                defineField({ name: "googlePlaceId", type: "string", title: "Google Place ID", hidden: true }),
                defineField({ name: "location", type: "geopoint", title: "Coordinates", hidden: true }),
              ],
            }),
            {
              name: "url",
              type: "url",
              title: "Event URL",
            },
          ],
          preview: {
            select: {
              title: "name",
              date: "date",
              venue: "address.name",
            },
            prepare({ title, date, venue }) {
              const dateStr = date
                ? new Date(date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "";
              return {
                title: title || "Concert",
                subtitle: [dateStr, venue].filter(Boolean).join(" \u00b7 "),
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "tableHeaders",
      title: "Table column labels",
      description: "Headers shown above the concerts table (NL and EN).",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "date",
          title: "Date",
          type: "internationalizedArrayString",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "time",
          title: "Time",
          type: "internationalizedArrayString",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "location",
          title: "Location",
          type: "internationalizedArrayString",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "internationalizedArrayString",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: previewString(title, "Concerts") };
    },
  },
});
