import { FeaturedVideo } from "@mui/icons-material";
import { defineField, defineType } from "sanity";

export const videoType = defineType({
  name: "video",
  title: "Video",
  type: "document",
  icon: FeaturedVideo,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "youtubeLink",
      type: "string",
    }),
  ],
});
