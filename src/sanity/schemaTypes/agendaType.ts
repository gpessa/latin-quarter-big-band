import { GooglePlacesAddressInput } from "@/sanity/components/GooglePlacesAddressInput";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { defineField, defineType } from "sanity";

export const agendaType = defineType({
  name: "agenda",
  type: "document",
  title: "Concerts",
  icon: CalendarMonthIcon,
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
        }),
      ],
    }),
  ],
});
