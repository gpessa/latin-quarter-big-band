import { cache } from "react";
import { defaultLocale } from "../localeConfig";
import { sanityFetch } from "./live";
import { GENERAL_QUERY } from "./queries";

export const fetchGeneral = cache(async (locale: string) => {
  const { data } = await sanityFetch({
    query: GENERAL_QUERY,
    params: { locale, defaultLocale },
  });
  return data;
});
