"use client";

import { urlFor } from "@/sanity/lib/image";
import { useEffect, useState } from "react";
import { QUERYResult } from "../../../../../sanity.types";
import { styled } from "@mui/material/styles";
import React from "react";

const Wrapper = styled("div")(() => ({
  position: "relative",
  height: "85vh",
  width: "100%",
  overflow: "hidden",
}));

const Slide = styled("img")(({ theme }) => ({
  position: "absolute",
  top: -4,
  left: -4,
  width: "calc(100% + 8px)",
  height: "calc(100% + 8px)",
  objectFit: "cover",
  filter: "blur(3px)",
  opacity: 0,
  transition: "opacity 1s ease-in-out", // smooth fade
}));

const Gallery: React.FC<Pick<QUERYResult, "intro">> = ({ intro }) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % intro.length);
    }, 3000); // slower, feels nicer than 2000ms
    return () => clearInterval(interval);
  }, [intro.length]);

  return (
    <Wrapper>
      {intro.map((item, i) => (
        <Slide
          key={i}
          src={urlFor(item.image).width(1600).url()}
          alt={`Slide ${i}`}
          sx={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
    </Wrapper>
  );
};

export default Gallery;
