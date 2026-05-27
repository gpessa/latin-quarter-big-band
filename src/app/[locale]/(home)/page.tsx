import { JsonLd } from "@/components";
import { NAME, SITE_URL } from "@/contants";
import { defaultLocale, locales } from "@/sanity/localeConfig";
import { sanityFetch } from "@/sanity/lib/live";
import { DESCRIPTION_QUERY, QUERY as query } from "@/sanity/lib/queries";
import { Metadata } from "next";
import AboutUs from "./components/AboutUs";
import Agenda from "./components/Agenda";
import BookUs from "./components/BookUs";
import Gallery from "./components/Gallery";
import JoinTheBand from "./components/JoinTheBand";
import Intro from "./components/Intro";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await sanityFetch({
    query: DESCRIPTION_QUERY,
    params: { locale, defaultLocale },
  });
  const description = data?.description || "";
  const title = NAME;
  const localeUrl = `${SITE_URL}/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical: localeUrl,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}`])
      ),
    },
    openGraph: {
      title,
      description,
      url: localeUrl,
      siteName: NAME,
      type: "website",
      locale: locale === "nl" ? "nl_NL" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    keywords: [
      "Latin Quarter Big Band",
      "big band",
      "jazz",
      "swing",
      "live music",
      "concerts",
      "events",
      "book a band",
      "live band",
    ],
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  const {
    data: { intro, joinTheBand, gallery, bookUs, agenda, aboutUs },
  } = await sanityFetch({
    query,
    params: { locale, defaultLocale },
  });

  const { data } = await sanityFetch({
    query: DESCRIPTION_QUERY,
    params: { locale, defaultLocale },
  });

  return (
    <>
      <JsonLd description={data?.description || ""} concerts={agenda?.concerts} locale={locale} />
      {intro && <Intro intro={intro} />}
      {aboutUs && <AboutUs {...aboutUs} />}
      {agenda && <Agenda {...agenda} />}
      {bookUs && <BookUs {...bookUs} />}
      {gallery && <Gallery {...gallery} />}
      {joinTheBand && <JoinTheBand {...joinTheBand} />}
    </>
  );
}
