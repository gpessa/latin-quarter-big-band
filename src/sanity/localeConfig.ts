export const languages = [
  { id: "nl", title: "Nederlands" },
  { id: "en", title: "English" },
];

export type SiteLocale = "nl" | "en";
export const defaultLocale: SiteLocale = "en";
export const locales: SiteLocale[] = ["nl", "en"];

// Used by `sanity-plugin-internationalized-array` to seed new documents.
export const defaultLanguages: SiteLocale[] = [defaultLocale];

export function isValidLocale(locale: string): locale is SiteLocale {
  return locales.includes(locale as SiteLocale);
}

export function resolveLocale(value: string | null | undefined): SiteLocale {
  return value && isValidLocale(value) ? value : defaultLocale;
}
