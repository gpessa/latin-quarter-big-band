import { defineQuery } from "next-sanity";

export const QUERY = defineQuery(`{
  "intro": *[_type == "intro"],
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
  "aboutUs": *[_type == "aboutUs"][0]{
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
  },
  "gallery": *[_type == "galleryImage"][0]{
    title, 
    images[]{
      image,
      title
    }
  },
  "whatsApp": *[_type == "general"][0].whatsApp{
    phoneNumber,
    statusMessage,
    chatMessage,
  },
  "menu": {
    "joinTheBand": *[_type == "joinTheBand"][0].title,
    "gallery": *[_type == "galleryImage"][0].title,
    "bookUs": *[_type == "bookUs"][0].title,
    "agenda": *[_type == "agenda"][0].title
  }
}`);
