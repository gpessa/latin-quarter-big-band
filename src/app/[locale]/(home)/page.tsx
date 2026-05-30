import { JsonLd } from "@/components";
import { NAME, SITE_URL } from "@/contants";
import { defaultLocale, locales } from "@/sanity/localeConfig";
import { fetchGeneral } from "@/sanity/lib/fetchGeneral";
import { sanityFetch } from "@/sanity/lib/live";
import { QUERY as query } from "@/sanity/lib/queries";
import { Metadata } from "next";
import AboutUs from "./components/AboutUs";
import Agenda from "./components/Agenda";
import BookUs from "./components/BookUs";
import Gallery from "./components/Gallery";
import JoinTheBand from "./components/JoinTheBand";
import Intro from "./components/Intro";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const data = await fetchGeneral(locale);
  const description = data?.description || "";
  const keywords = data?.keywords || "";
  const title = data?.metaTitle || NAME;
  const localeUrl = `${SITE_URL}/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical: localeUrl,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}`])),
        "x-default": `${SITE_URL}/${defaultLocale}`,
      },
    },
    openGraph: {
      title,
      description,
      url: localeUrl,
      siteName: NAME,
      type: "website",
      locale: locale === "nl" ? "nl_NL" : "en_US",
      alternateLocale: locale === "nl" ? ["en_US"] : ["nl_NL"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    keywords: keywords
      .split(",")
      .map((k: string) => k.trim())
      .filter(Boolean),
  };
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  const {
    data: { intro, joinTheBand, gallery, bookUs, agenda, aboutUs },
  } = await sanityFetch({
    query,
    params: { locale, defaultLocale },
  });

  const general = await fetchGeneral(locale);

  return (
    <>
      <JsonLd
        description={general?.description || ""}
        concerts={agenda?.concerts}
        locale={locale}
      />
      {intro && (
        <Intro intro={intro} slideAlt={general?.introSlideAlt || NAME} />
      )}
      {aboutUs && <AboutUs {...aboutUs} />}
      {agenda && <Agenda {...agenda} locale={locale} />}
      {bookUs && <BookUs {...bookUs} />}
      {gallery && <Gallery {...gallery} />}
      {joinTheBand && <JoinTheBand {...joinTheBand} />}
    </>
  );
}
