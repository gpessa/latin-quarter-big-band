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
