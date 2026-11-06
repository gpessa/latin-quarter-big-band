import { JsonLd } from "@/components";
import { NAME, SEO_DESCRIPTION, SEO_TITLE, SITE_URL } from "@/contants";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { QUERY as query } from "@/sanity/lib/queries";
import { Metadata } from "next";
import AboutUs from "./components/AboutUs";
import Agenda from "./components/Agenda";
import BookUs from "./components/BookUs";
import Gallery from "./components/Gallery";
import JoinTheBand from "./components/JoinTheBand";
import Intro from "./components/Intro";

async function getPage() {
  return client.fetch(
    `*[_type == "general"][0]{
      description
    }`
  );
}

function metaDescription(fromCms?: string | null) {
  const text = fromCms?.replace(/\s+/g, " ").trim();
  if (!text) return SEO_DESCRIPTION;
  if (/amsterdam/i.test(text)) return text;
  return `${text} Based in Amsterdam. See upcoming concerts or book the band.`;
}

export async function generateMetadata(): Promise<Metadata> {
  const { description: fromCms } = await getPage();
  const description = metaDescription(fromCms);

  return {
    title: { absolute: SEO_TITLE },
    description,
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      title: SEO_TITLE,
      description,
      url: SITE_URL,
      siteName: NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Latin Quarter Big Band — Latin jazz in Amsterdam",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SEO_TITLE,
      description,
      images: ["/twitter-image"],
    },
    keywords: [
      "Latin Quarter Big Band",
      "Latin jazz Amsterdam",
      "big band Amsterdam",
      "salsa big band",
      "Latin jazz Netherlands",
      "book a Latin band",
    ],
  };
}

export default async function Home() {
  const {
    data: { intro, joinTheBand, gallery, bookUs, agenda, aboutUs },
  } = await sanityFetch({
    query,
  });

  const { description: fromCms } = await getPage();
  const description = metaDescription(fromCms);

  return (
    <>
      <JsonLd description={description} concerts={agenda?.concerts} />
      {intro && <Intro intro={intro} />}
      {aboutUs && <AboutUs {...aboutUs} />}
      {agenda && <Agenda {...agenda} />}
      {bookUs && <BookUs {...bookUs} />}
      {gallery && <Gallery {...gallery} />}
      {joinTheBand && <JoinTheBand {...joinTheBand} />}
    </>
  );
}
