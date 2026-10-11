"use client";

import { NAME } from "@/contants";
import { urlFor } from "@/sanity/lib/image";
import { QUERYResult } from "@/types/query";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

const Intro: React.FC<
  Pick<QUERYResult, "intro"> & { slideAlt: string }
> = ({ intro, slideAlt }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (intro.length < 2) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % intro.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [intro.length]);

  return (
    <Box component="section">
      <Typography
        component="h1"
        sx={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {NAME}
      </Typography>

      {intro.length > 0 && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            aspectRatio: { xs: "16 / 10", md: "16 / 7" },
            bgcolor: "rgba(16, 32, 44, 0.08)",
          }}
        >
          {intro.map((item, i) => (
            <Box
              key={item._id || i}
              component="img"
              src={urlFor(item.image).width(2400).height(1100).fit("crop").auto("format").url()}
              alt={i === index ? `${slideAlt} (${i + 1})` : ""}
              aria-hidden={i === index ? undefined : true}
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "blur(3px)",
                transform: "scale(1.08)",
                opacity: i === index ? 1 : 0,
                transition: "opacity 1s ease",
              }}
            />
          ))}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <Image
              src={require("@/assets/logo.svg").default}
              alt=""
              width={360}
              height={353}
              priority
              style={{ width: "min(46vw, 360px)", height: "auto" }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Intro;
