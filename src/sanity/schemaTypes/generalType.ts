import { defineType, defineField } from "sanity";

export const generalType = defineType({
  name: "general",
  title: "Generals",
  type: "document",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Page title (SEO)",
      description: "Used in the browser tab and search results",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      description: "This description will be used in the meta tag for SEO",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "footer",
      title: "Footer text",
      description: "Copyright line shown at the bottom of the page",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "introSlideAlt",
      title: "Intro slideshow alt text",
      description: "Base text for homepage slideshow image accessibility labels",
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
