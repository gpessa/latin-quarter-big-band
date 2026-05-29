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
    select: {
      title: "title",
      content: "content",
    },
    prepare({ title, content }) {
      const defaultTitle = title?.find(
        (t: { language?: string; value?: string }) => t.language === "nl"
      );
      const nlBlocks = content?.find(
        (entry: { language?: string; value?: unknown }) =>
          entry.language === "nl"
      )?.value ?? content?.[0]?.value;

      const introduction = Array.isArray(nlBlocks)
        ? nlBlocks
            .flatMap((block: { children?: Array<{ text?: string }> }) =>
              block.children?.map((child) => child.text ?? "") ?? []
            )
            .join("")
            .trim()
        : "";

      return {
        title: defaultTitle?.value || "Gallery",
        subtitle: introduction
          ? introduction.length > 96
            ? `${introduction.slice(0, 93)}...`
            : introduction
          : undefined,
      };
    },
  },
});
