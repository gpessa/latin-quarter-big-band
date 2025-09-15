"use client";

import { urlFor } from "@/sanity/lib/image";
import { useEffect, useState } from "react";
import { QUERYResult } from "../../../../../sanity.types";

import { styled } from "@mui/material/styles";
import React from "react";

const Image = styled("img")(({}) => ({
  height: "85vh",
  width: "100%",
  objectFit: "cover",
  lineHeight: 0,
  display: "block",
  filter: "blur(3px)",
}));

const Gallery: React.FC<Pick<QUERYResult, "intro">> = ({ intro }) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % intro.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Image
      src={urlFor(intro[index].image).width(1000).url()}
      alt="Description"
    />
  );
};

export default Gallery;
