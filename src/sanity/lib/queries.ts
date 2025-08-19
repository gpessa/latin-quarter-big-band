import { defineQuery } from "next-sanity";

export const QUERY = defineQuery(`{
  "gallery": {
    "images": *[_type == "galleryImage"],
  },
  "agenda": *[_type == "agenda"][0]{
    title, 
    content,
    concerts[] | order(date desc){
      name,
      date,
      url,
      address {
        name,
        street,
        city,
        postalCode
      }
    }
  },
  "bookUs": *[_type == "bookUs"][0]{
    title, 
    content
  },
  "joinTheBand": *[_type == "joinTheBand"][0]{
    title, 
    content,
    instruments[]{
      instrumentName,
      emoticon,
      notes
    }
  }
}`);
