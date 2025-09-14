// import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { defineField, defineType } from "sanity";

export const aboutUsType = defineType({
  name: "aboutUs",
  title: "About Us",
  type: "document",
  // icon: PhotoCameraIcon,
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
  ],
});
