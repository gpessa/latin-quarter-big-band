import { JsonLd } from "@/components";
import { NAME, SITE_URL } from "@/contants";
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

export async function generateMetadata(): Promise<Metadata> {
  const { description } = await getPage();
  const title = NAME;

  return {
    title,
    description,
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: NAME,
      type: "website",
      locale: "en_US",
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

export default async function Home() {
  const {
    data: { intro, joinTheBand, gallery, bookUs, agenda, aboutUs },
  } = await sanityFetch({
    query,
  });

  const { description } = await getPage();

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
