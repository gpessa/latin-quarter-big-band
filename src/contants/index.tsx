export const NAME = "Latin Quarter Big Band";
export const LANG = "en";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://latinquarterbigband.com"
).replace(/\/$/, "");
export const INSTAGRAM_URL = "https://www.instagram.com/latinquarterbigband/";
export const SEO_TITLE = "Latin Quarter Big Band | Latin Jazz in Amsterdam";
export const SEO_DESCRIPTION =
  "Latin Quarter Big Band is a 20-piece Latin jazz ensemble based in Amsterdam. See upcoming concerts or book the band for festivals, parties, and events.";
export const IS_PRODUCTION = !!process && process.env.NODE_ENV === "production";
export const GOOGLE_ANALYTICS = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!;
export const STANDARD_SPACING = 6;
export const STANDARD_MARGIN_BOTTOM = 3;

export const SECTIONS = {
  aboutUs: "aboutUs",
  agenda: "agenda",
  joinTheBand: "joinTheBand",
  gallery: "gallery",
  bookUs: "bookUs",
};
