import { defineQuery } from "next-sanity";

/**
const ABOUT_US = "aboutUs";
const CONTACT_US = "contactUs";
const VIDEOS = "videos";

export const QUERY = defineQuery(`{
  "${ABOUT_US}": {
    "id": "${ABOUT_US}",
    "title": *[_type == "content"][0].aboutUs.title,
    "content": *[_type == "content"][0].aboutUs.content,
  },
  "${CONTACT_US}": {
    "id": "${CONTACT_US}",
    "title": *[_type == "content"][0].contactUs.title,
    "content": *[_type == "content"][0].contactUs.content,
  },
  "${GALLERY}": {
    "id": "${GALLERY}",
    "title": *[_type == "content"][0].gallery.title,
    "images": *[_type == "galleryImage"],
  },
  "${VIDEOS}": {
    "id": "${VIDEOS}",
    "title": *[_type == "content"][0].videos.title,
    "videos": *[_type == "video"],
  }, 
  "${CONCERTS}": {
    "id": "${CONCERTS}",
    "title": *[_type == "content"][0].concerts.title,
    "concerts": *[_type == "concert"] | order(date desc)
  },
  "header": [
    { "id": "${ABOUT_US}", "title": *[_type == "content"][0].aboutUs.title },
    { "id": "${CONCERTS}", "title": *[_type == "content"][0].concerts.title },
    { "id": "${CONTACT_US}", "title": *[_type == "content"][0].contactUs.title },
    { "id": "${GALLERY}", "title": *[_type == "content"][0].gallery.title },
    { "id": "${VIDEOS}", "title": *[_type == "content"][0].videos.title }
  ],
  "footer": {
    "text": *[_type == "content"][0].footer.text,
  }
}`);
 */

const CONCERTS = "concerts";
const GALLERY = "gallery";

export const QUERY = defineQuery(`{
  "${CONCERTS}": {
    "id": "${CONCERTS}",
    "concerts": *[_type == "concert"] | order(date desc)
  },
  "${GALLERY}": {
    "id": "${GALLERY}",
    "images": *[_type == "galleryImage"],
  },
}`);
