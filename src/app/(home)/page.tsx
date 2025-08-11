import { Video } from "../components";
import AboutUs from "./components/AboutUs";
import Agenda from "./components/Agenda";
import BookUs from "./components/BookUs";
import Gallery from "./components/Gallery";
import JoinTheBand from "./components/JoinTheBand";

export default function Home() {
  return (
    <>
      <AboutUs />
      <Agenda />
      <BookUs />
      <JoinTheBand />
      <Video videoid="O0GGfZ6jOjE" />
      <Gallery />
    </>
  );
}
