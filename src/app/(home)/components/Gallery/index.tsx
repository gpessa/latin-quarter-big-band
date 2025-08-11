"use client";
import { Section } from "@/app/components";
/* eslint-disable @typescript-eslint/no-require-imports */
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import { styled } from "@mui/material/styles";
import Image from "next/image";

const ImageStyled = styled("div")({
  width: "100%",
  paddingBottom: "100%", // 1:1 aspect ratio
  position: "relative",
});

export default function Gallery() {
  const images = [
    require("../../../../assets/image_00001.jpeg").default,
    require("../../../../assets/image_00002.jpeg").default,
    require("../../../../assets/image_00003.jpeg").default,
    require("../../../../assets/image_00004.jpeg").default,
    require("../../../../assets/image_00005.jpeg").default,
    require("../../../../assets/image_00006.jpeg").default,
  ];

  return (
    <Section>
      <Typography variant="h2" component="h2" gutterBottom>
        Photo Gallery
      </Typography>
      <Grid container spacing={4}>
        {images.map((src, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <ImageStyled>
              <Image
                src={src}
                alt={`Description ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </ImageStyled>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
