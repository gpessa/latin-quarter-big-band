import { cache } from "react";
import { defaultLocale } from "../localeConfig";
import { sanityFetch } from "./live";
import { QUERY } from "./queries";

export const fetchSiteData = cache(async (locale: string) => {
  const { data } = await sanityFetch({
    query: QUERY,
    params: { locale, defaultLocale },
  });
  return data;
});
