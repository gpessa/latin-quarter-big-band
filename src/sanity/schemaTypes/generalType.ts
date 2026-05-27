import { defineType, defineField } from "sanity";

export const generalType = defineType({
  name: "general",
  title: "Generals",
  type: "document",
  fields: [
    defineField({
      name: "description",
      title: "Description",
      description: "This description will be used in the meta tag for SEO",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "whatsApp",
      title: "WhatsApp Settings",
      type: "object",
      fields: [
        defineField({
          name: "phoneNumber",
          title: "Phone Number",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "statusMessage",
          title: "Status Message",
          type: "internationalizedArrayString",
        }),
        defineField({
          name: "chatMessage",
          title: "Default Chat Message",
          type: "internationalizedArrayString",
        }),
      ],
    }),

    defineField({
      name: "keywords",
      title: "SEO Keywords",
      description: "Comma-separated keywords for search engines",
      type: "internationalizedArrayString",
    }),

    defineField({
      name: "emails",
      title: "Contact Emails",
      description: "List of emails to receive contact form submissions",
      type: "array",
      of: [
        {
          type: "string",
          validation: (Rule) =>
            Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
              name: "email",
              invert: false,
            }).error("Must be a valid email address"),
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "General Settings",
      };
    },
  },
});
