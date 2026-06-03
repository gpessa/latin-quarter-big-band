import { defaultLocale } from "./localeConfig";

type I18nEntry = { language?: string; value?: string };

export function previewString(entries?: I18nEntry[], fallback = ""): string {
  return (
    entries?.find((entry) => entry.language === defaultLocale)?.value ??
    entries?.[0]?.value ??
    fallback
  );
}
