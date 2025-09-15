import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { defineField, defineType } from "sanity";

export const introType = defineType({
  name: "intro",
  title: "Intro",
  type: "document",
  icon: PhotoCameraIcon,
  fields: [
    defineField({
      name: "image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Image",
      };
    },
  },
});
