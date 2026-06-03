import type { SiteLocale } from "./localeConfig";

const validationMessages = {
  en: {
    invalidEmail: "Invalid email",
    emailRequired: "Email is required",
    nameTooShort: "Name too short",
    nameRequired: "Name is required",
    phoneTooShort: "Phone too short",
    messageTooShort: "Message too short",
    messageRequired: "Message is required",
    positionRequired: "Position is required",
  },
  nl: {
    invalidEmail: "Ongeldig e-mailadres",
    emailRequired: "E-mailadres is verplicht",
    nameTooShort: "Naam is te kort",
    nameRequired: "Naam is verplicht",
    phoneTooShort: "Telefoonnummer is te kort",
    messageTooShort: "Bericht is te kort",
    messageRequired: "Bericht is verplicht",
    positionRequired: "Positie is verplicht",
  },
} as const;

export type ValidationMessages = (typeof validationMessages)[SiteLocale];

export function getValidationMessages(locale: SiteLocale): ValidationMessages {
  return validationMessages[locale];
}
