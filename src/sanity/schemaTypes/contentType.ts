import { defineType } from "sanity";

export const contentType = defineType({
  name: "content",
  title: "Site Settings",
  type: "document",
  fields: [
    {
      name: "aboutUs",
      type: "object",
      title: "About Us",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "repertoire",
      type: "object",
      title: "Repertoire",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "contactUs",
      type: "object",
      title: "Contact Us",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "gallery",
      type: "object",
      title: "Gallery",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "videos",
      type: "object",
      title: "Videos",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "concerts",
      type: "object",
      title: "Concerts",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "footer",
      type: "object",
      title: "Footer",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "text",
          title: "Text",
          type: "array",
          of: [{ type: "block" }],
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Content",
      };
    },
  },
});
