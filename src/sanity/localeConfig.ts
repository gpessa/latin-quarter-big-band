export const studioLanguages = [
  { id: "nl", title: "Nederlands" },
  { id: "en", title: "English" },
];

export type SiteLocale = "nl" | "en";
export const defaultLocale: SiteLocale = "nl";
export const locales: SiteLocale[] = ["nl", "en"];

export function isValidLocale(locale: string): locale is SiteLocale {
  return locales.includes(locale as SiteLocale);
}
