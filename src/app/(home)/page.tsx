import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { QUERY as query } from "@/sanity/lib/queries";
import { Metadata } from "next";
import Agenda from "./components/Agenda";
import BookUs from "./components/BookUs";
import Gallery from "./components/Gallery";
import JoinTheBand from "./components/JoinTheBand";
import { NAME } from "@/contants";

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
    openGraph: {
      title,
      description,
    },
  };
}

export default async function Home() {
  const {
    data: { joinTheBand, gallery, bookUs, agenda },
  } = await sanityFetch({
    query,
  });

  return (
    <>
      {/* 
      <AboutUs />
      <Video videoid="O0GGfZ6jOjE" />
      **/}
      {agenda && <Agenda {...agenda} />}
      {bookUs && <BookUs {...bookUs} />}
      <Gallery {...gallery} />
      {joinTheBand && <JoinTheBand {...joinTheBand} />}
    </>
  );
}
