export const NAME = "Latin Quarter Big Band";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://latinquarterbigband.com";
export const IS_PRODUCTION = !!process && process.env.NODE_ENV === "production";
export const GOOGLE_ANALYTICS = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!;
export const STANDARD_SPACING = 6;
export const STANDARD_MARGIN_BOTTOM = 5;

export const SECTIONS = {
  aboutUs: "aboutUs",
  agenda: "agenda",
  joinTheBand: "joinTheBand",
  gallery: "gallery",
  bookUs: "bookUs",
};

export const pageCopy = {
  en: {
    agendaTitle: "Come share the groove",
    bookTitle: "Let's make your event unforgettable",
    galleryTitle: "The band, in full swing",
    moreInfo: "More info",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    navLabel: "Primary",
    placeholders: {
      name: "Your name",
      email: "Your email address",
      phone: "Your phone number",
      message: "Tell us about your event…",
    },
  },
  nl: {
    agendaTitle: "Kom de groove delen",
    bookTitle: "Maak je evenement onvergetelijk",
    galleryTitle: "De band, in volle swing",
    moreInfo: "Meer info",
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
    navLabel: "Hoofdnavigatie",
    placeholders: {
      name: "Je naam",
      email: "Je e-mailadres",
      phone: "Je telefoonnummer",
      message: "Vertel ons over je evenement…",
    },
  },
} as const;

export function copyFor(locale: string) {
  return locale === "nl" ? pageCopy.nl : pageCopy.en;
}
