export const studioLanguages = [
  { id: "nl", title: "Nederlands" },
  { id: "en", title: "English" },
];

export type SiteLocale = "nl" | "en";
export const defaultLocale: SiteLocale = "en";
export const locales: SiteLocale[] = ["nl", "en"];

// Used by `sanity-plugin-internationalized-array` to seed new documents.
export const defaultStudioLanguages: SiteLocale[] = [defaultLocale];

export function isValidLocale(locale: string): locale is SiteLocale {
  return locales.includes(locale as SiteLocale);
}
