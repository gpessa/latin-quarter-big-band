import { NAME, SEO_DESCRIPTION, SEO_TITLE } from "@/contants";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SEO_TITLE,
    short_name: NAME,
    description: SEO_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#F4F0E6",
    theme_color: "#1B5164",
    lang: "en",
  };
}
