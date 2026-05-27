import { defineQuery } from "next-sanity";
import { defaultLocale } from "../localeConfig";

const i18n = (path: string) =>
  `coalesce(${path}[language == $locale][0].value, ${path}[language == "${defaultLocale}"][0].value, ${path}[0].value)`;

export const QUERY = defineQuery(`{
  "intro": *[_type == "intro"],
  "agenda": *[_type == "agenda"][0]{
    "title": ${i18n("title")},
    "content": ${i18n("content")},
    concerts[] | order(date desc){
      name,
      date,
      url,
      address {
        name,
        formattedAddress,
        street,
        city,
        postalCode
      }
    },
    tableHeaders {
      "date": ${i18n("date")},
      "time": ${i18n("time")},
      "location": ${i18n("location")},
      "link": ${i18n("link")}
    }
  },
  "bookUs": *[_type == "bookUs"][0]{
    "title": ${i18n("title")},
    "content": ${i18n("content")},
    form {
      "name": ${i18n("name")},
      "email": ${i18n("email")},
      "phone": ${i18n("phone")},
      "message": ${i18n("message")},
      "button": ${i18n("button")},
      "confirmationMessage": ${i18n("confirmationMessage")},
      "errorMessage": ${i18n("errorMessage")}
    }
  },
  "aboutUs": *[_type == "aboutUs"][0]{
    "title": ${i18n("title")},
    "content": ${i18n("content")}
  },
  "joinTheBand": *[_type == "joinTheBand"][0]{
    "title": ${i18n("title")},
    "content": ${i18n("content")},
    instruments[]{
      "instrumentName": ${i18n("instrumentName")},
      emoticon,
      "notes": ${i18n("notes")}
    },
    form {
      "name": ${i18n("name")},
      "email": ${i18n("email")},
      "phone": ${i18n("phone")},
      "message": ${i18n("message")},
      "position": ${i18n("position")},
      "button": ${i18n("button")},
      "confirmationMessage": ${i18n("confirmationMessage")},
      "errorMessage": ${i18n("errorMessage")}
    }
  },
  "gallery": *[_type == "galleryImage"][0]{
    "title": ${i18n("title")},
    images[]{
      image,
      "title": ${i18n("title")}
    }
  },
  "whatsApp": *[_type == "general"][0].whatsApp{
    phoneNumber,
    "statusMessage": ${i18n("statusMessage")},
    "chatMessage": ${i18n("chatMessage")}
  },
  "menu": {
    "aboutUs": ${i18n('*[_type == "aboutUs"][0].title')},
    "agenda": ${i18n('*[_type == "agenda"][0].title')},
    "bookUs": ${i18n('*[_type == "bookUs"][0].title')},
    "gallery": ${i18n('*[_type == "galleryImage"][0].title')},
    "joinTheBand": ${i18n('*[_type == "joinTheBand"][0].title')}
  }
}`);

export const DESCRIPTION_QUERY = defineQuery(
  `*[_type == "general"][0]{ "description": ${i18n("description")}, "keywords": ${i18n("keywords")} }`
);
