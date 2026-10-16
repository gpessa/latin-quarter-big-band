import { defineQuery } from "next-sanity";

// "en" matches defaultLocale in localeConfig. The path stays a string literal so
// typegen can expand it, and the final fallback keeps the result non-null.
const i18n = <const Path extends string>(
  path: Path,
): `coalesce(${Path}[language == $locale][0].value, ${Path}[language == "en"][0].value, ${Path}[0].value, "")` =>
  `coalesce(${path}[language == $locale][0].value, ${path}[language == "en"][0].value, ${path}[0].value, "")`;

const i18nBlocks = <const Path extends string>(
  path: Path,
): `coalesce(${Path}[language == $locale][0].value, ${Path}[language == "en"][0].value, ${Path}[0].value, [])` =>
  `coalesce(${path}[language == $locale][0].value, ${path}[language == "en"][0].value, ${path}[0].value, [])`;

export const QUERY = defineQuery(`{
  "intro": *[_type == "intro"],
  "agenda": *[_type == "agenda"][0]{
    "title": ${i18n("title")},
    "content": ${i18nBlocks("content")},
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
    "tableHeaders": {
      "date": ${i18n("tableHeaders.date")},
      "time": ${i18n("tableHeaders.time")},
      "location": ${i18n("tableHeaders.location")},
      "link": ${i18n("tableHeaders.link")}
    }
  },
  "bookUs": *[_type == "bookUs"][0]{
    "title": ${i18n("title")},
    "content": ${i18nBlocks("content")},
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
    "content": ${i18nBlocks("content")}
  },
  "joinTheBand": *[_type == "joinTheBand"][0]{
    "title": ${i18n("title")},
    "content": ${i18nBlocks("content")},
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
    "content": ${i18nBlocks("content")},
    images[]{
      image,
      "title": ${i18n("title")}
    }
  },
  "general": *[_type == "general"][0]{
    "metaTitle": ${i18n("metaTitle")},
    "description": ${i18n("description")},
    "keywords": ${i18n("keywords")},
    "footer": ${i18n("footer")},
    "introSlideAlt": ${i18n("introSlideAlt")},
    "whatsApp": whatsApp{
      phoneNumber,
      "statusMessage": ${i18n("statusMessage")},
      "chatMessage": ${i18n("chatMessage")}
    }
  },
  "menu": {
    "aboutUs": ${i18n('*[_type == "aboutUs"][0].title')},
    "agenda": ${i18n('*[_type == "agenda"][0].title')},
    "bookUs": ${i18n('*[_type == "bookUs"][0].title')},
    "gallery": ${i18n('*[_type == "galleryImage"][0].title')},
    "joinTheBand": ${i18n('*[_type == "joinTheBand"][0].title')}
  }
}`);
