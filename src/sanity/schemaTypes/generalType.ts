// /schemas/settings.ts
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
      type: "text",
      validation: (Rule) => Rule.required(),
    }),

    // Grouped WhatsApp settings
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
          type: "string",
        }),
        defineField({
          name: "chatMessage",
          title: "Default Chat Message",
          type: "text",
        }),
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
