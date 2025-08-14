import { sanityFetch } from "@/sanity/lib/live";
import { Video } from "../../components";
import AboutUs from "./components/AboutUs";
import Agenda from "./components/Agenda";
import BookUs from "./components/BookUs";
import Gallery from "./components/Gallery";
import JoinTheBand from "./components/JoinTheBand";
import { QUERY as query } from "@/sanity/lib/queries";

export default async function Home() {
  const {
    data: { concerts, gallery },
  } = await sanityFetch({
    query,
  });

  return (
    <>
      <AboutUs />
      <Agenda concerts={concerts.concerts} />
      <BookUs />
      <JoinTheBand />
      <Video videoid="O0GGfZ6jOjE" />
      <Gallery images={gallery.images} />
    </>
  );
}
