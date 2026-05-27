import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { defineField, defineType } from "sanity";

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
              const defaultTitle = title?.find(
                (t: { language?: string; value?: string }) => t.language === "nl"
              );
              return {
                title: defaultTitle?.value || "Image",
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
      const defaultTitle = title?.find(
        (t: { language?: string; value?: string }) => t.language === "nl"
      );
      return { title: defaultTitle?.value || "Gallery" };
    },
  },
});
