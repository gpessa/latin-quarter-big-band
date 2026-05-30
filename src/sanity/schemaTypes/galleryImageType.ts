import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { defineField, defineType } from "sanity";
import { previewString } from "../previewHelpers";

export const galleryImageType = defineType({
  name: "galleryImage",
  title: "Gallery",
  type: "document",
  icon: PhotoCameraIcon,
  fields: [
    defineField({
      name: "title",
      title: "Gallery Title",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Introduction",
      type: "internationalizedArrayBlockContent",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineField({
          name: "galleryImageItem",
          type: "object",
          title: "Gallery Image",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              validation: (Rule) => Rule.required(),
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "title",
              title: "Image Title",
              type: "internationalizedArrayString",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "image",
            },
            prepare({ title, media }) {
              return {
                title: previewString(title, "Image"),
                media,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: previewString(title, "Gallery") };
    },
  },
});
